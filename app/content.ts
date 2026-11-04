// Event and banner content for take2.social.
// Content is read from the "Take2 Website" page in Notion (Events + Site Settings tables).
// If Notion is unreachable or NOTION_TOKEN is missing, the fallback content below is used.

export type EventStatus = "Coming soon" | "On sale" | "Sold out" | "Waitlist full" | "Hidden";

export type SiteEvent = {
  name: string;
  date: string; // YYYY-MM-DD
  status: EventStatus;
  ticketsRelease?: string; // YYYY-MM-DD
  description: string;
  location?: string;
  link: string;
  buttonText?: string;
  featured: boolean;
};

export type SiteSettings = {
  banner?: { text: string; link: string; button?: string };
  ticketNote?: string;
};

export const LUMA_URL = "https://luma.com/take2";

const EVENTS_DB = process.env.NOTION_EVENTS_DB_ID || "02f73b487b7f4cab88f3e688838e7c0f";
const SETTINGS_DB = process.env.NOTION_SETTINGS_DB_ID || "e96c676839cf46759428f46ac0dfd395";

// How often (in seconds) the site re-checks Notion for changes.
export const REVALIDATE_SECONDS = 60;

const MIX =
  "Like a night out at the bar with your friends, but the room is full of singles. Come single, or come as a single friend's +1.";

const FALLBACK_EVENTS: SiteEvent[] = [
  { name: "Mix and Repeat", date: "2026-10-15", status: "Sold out", description: "", location: "Williamsburg", link: LUMA_URL, featured: false },
  { name: "Singles and Friends Mixer", date: "2026-11-05", status: "On sale", ticketsRelease: "2026-10-22", description: MIX, link: LUMA_URL, featured: false },
  { name: "Singles and Friends Mixer", date: "2026-11-12", status: "On sale", ticketsRelease: "2026-10-29", description: MIX, link: LUMA_URL, featured: false },
  { name: "Singles and Friends Mixer", date: "2026-11-13", status: "On sale", ticketsRelease: "2026-10-30", description: MIX, link: LUMA_URL, featured: false },
  { name: "Singles Only Speed Dating", date: "2026-11-19", status: "Coming soon", ticketsRelease: "2026-11-05", description: "Singles only. A night of short one-on-one dates, scheduled for you, so you meet everyone in the room.", link: LUMA_URL, featured: false },
];

const FALLBACK_SETTINGS: SiteSettings = {
  banner: { text: "Next up: Thursday, November 5. Tickets on sale now.", link: LUMA_URL, button: "Get tickets" },
  ticketNote: "Tickets are released 2 weeks before each event. Subscribers get early bird pricing.",
};

/* ---------- Notion helpers ---------- */

type NotionProp = any;

async function queryNotion(dbId: string, body: object = {}): Promise<any[] | null> {
  const token = process.env.NOTION_TOKEN;
  if (!token) return null;
  try {
    const res = await fetch(`https://api.notion.com/v1/databases/${dbId}/query`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Notion-Version": "2022-06-28",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ page_size: 100, ...body }),
      next: { revalidate: REVALIDATE_SECONDS },
    });
    if (!res.ok) {
      console.error("Notion query failed", dbId, res.status, await res.text());
      return null;
    }
    const json = await res.json();
    return json.results ?? [];
  } catch (err) {
    console.error("Notion query error", err);
    return null;
  }
}

const plain = (p: NotionProp): string => {
  if (!p) return "";
  const arr = p.title ?? p.rich_text ?? [];
  return arr.map((t: any) => t.plain_text).join("").trim();
};
const dateStart = (p: NotionProp): string | undefined => p?.date?.start?.slice(0, 10) || undefined;

export async function getEvents(): Promise<SiteEvent[]> {
  const rows = await queryNotion(EVENTS_DB, { sorts: [{ property: "Date", direction: "ascending" }] });
  if (!rows) return FALLBACK_EVENTS;
  return rows
    .map((r): SiteEvent | null => {
      const p = r.properties;
      const date = dateStart(p["Date"]);
      const name = plain(p["Event"]);
      if (!date || !name) return null;
      return {
        name,
        date,
        status: (p["Status"]?.select?.name as EventStatus) || "Coming soon",
        ticketsRelease: dateStart(p["Tickets release"]),
        description: plain(p["Description"]),
        location: plain(p["Location"]) || undefined,
        link: p["Ticket link"]?.url || LUMA_URL,
        buttonText: plain(p["Button text"]) || undefined,
        featured: !!p["Featured"]?.checkbox,
      };
    })
    .filter((e): e is SiteEvent => !!e && e.status !== "Hidden");
}

export async function getSettings(): Promise<SiteSettings> {
  const rows = await queryNotion(SETTINGS_DB);
  if (!rows) return FALLBACK_SETTINGS;
  const map = new Map<string, { value: string; link?: string }>();
  for (const r of rows) {
    const key = plain(r.properties["Setting"]).toLowerCase();
    map.set(key, { value: plain(r.properties["Value"]), link: r.properties["Link"]?.url || undefined });
  }
  const banner = map.get("banner");
  const button = map.get("banner button");
  const note = map.get("ticket note");
  return {
    banner: banner?.value ? { text: banner.value, link: banner.link || LUMA_URL, button: button?.value || undefined } : undefined,
    ticketNote: note?.value || undefined,
  };
}

/* ---------- Date formatting (New York time) ---------- */

export function todayNY(): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "America/New_York" }).format(new Date());
}

const asDate = (d: string) => new Date(`${d}T12:00:00Z`);
export const fmtMonthDay = (d: string) =>
  asDate(d).toLocaleDateString("en-US", { month: "long", day: "numeric", timeZone: "UTC" });
export const fmtWeekdayMonthDay = (d: string) =>
  asDate(d).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", timeZone: "UTC" });
export const fmtFull = (d: string) =>
  asDate(d).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric", timeZone: "UTC" });
export const fmtShort = (d: string) =>
  asDate(d).toLocaleDateString("en-US", { month: "short", day: "numeric", timeZone: "UTC" });
