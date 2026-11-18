// Every piece of copy on take2.social.
// The text below is the default. Each entry can be overridden from the "Site Copy"
// table in Notion (matched by Key). An empty Text cell in Notion falls back to the default.

export type CopyEntry = { section: string; label: string; text: string; link?: string };

const LUMA = "https://luma.com/take2";

export const COPY_DEFAULTS: Record<string, CopyEntry> = {
  // Navigation
  "nav.events": { section: "Navigation", label: "Menu: Events", text: "Events" },
  "nav.philosophy": { section: "Navigation", label: "Menu: Philosophy", text: "Philosophy" },
  "nav.how": { section: "Navigation", label: "Menu: How it works", text: "How it works" },
  "nav.join": { section: "Navigation", label: "Menu: Join the list", text: "Join the list", link: LUMA },

  // Hero
  "hero.title": { section: "Hero", label: "Headline", text: "Dating experiences you don't want to miss." },
  "hero.text": { section: "Hero", label: "Subheadline", text: "Curated in-person events for NYC singles who still believe in the meet-cute. No swiping, and no pressure to get the first impression right." },
  "hero.button": { section: "Hero", label: "Main button", text: "Find an Event", link: LUMA },
  "hero.link": { section: "Hero", label: "Link under button", text: "Join the list for first access", link: LUMA },

  // Philosophy
  "phil.eyebrow": { section: "Philosophy", label: "Small label", text: "The Take2 philosophy" },
  "phil.title": { section: "Philosophy", label: "Headline", text: "Love deserves a second take." },
  "phil.p1": { section: "Philosophy", label: "Paragraph 1", text: "Modern dating expects you to get everything right from the start. We judge the first impression, the follow-up text and everything in between. We think that's backwards." },
  "phil.p2": { section: "Philosophy", label: "Paragraph 2", text: "So we design every experience around the second meeting. That's where the nerves settle, people loosen up and real chemistry has room to happen." },
  "phil.button": { section: "Philosophy", label: "Button", text: "Find an event", link: LUMA },
  "ring.1": { section: "Philosophy", label: "Photo circle label 1", text: "Show up as yourself" },
  "ring.2": { section: "Philosophy", label: "Photo circle label 2", text: "A 50:50 room" },
  "ring.3": { section: "Philosophy", label: "Photo circle label 3", text: "Phones away" },
  "ring.4": { section: "Philosophy", label: "Photo circle label 4", text: "Meet once, meet again" },
  "ring.5": { section: "Philosophy", label: "Photo circle label 5", text: "We make the match" },

  // What we design for
  "beliefs.eyebrow": { section: "What we design for", label: "Small label", text: "What we design for" },
  "beliefs.title": { section: "What we design for", label: "Headline", text: "Less performing. More meeting." },
  "beliefs.1.title": { section: "What we design for", label: "Point 1 title", text: "Showing up as yourself" },
  "beliefs.1.text": { section: "What we design for", label: "Point 1 text", text: "No performing, no judging, no pressure." },
  "beliefs.2.title": { section: "What we design for", label: "Point 2 title", text: "Meeting people in real life" },
  "beliefs.2.text": { section: "What we design for", label: "Point 2 text", text: "Getting to know someone the way it used to happen, in a room full of people." },
  "beliefs.3.title": { section: "What we design for", label: "Point 3 title", text: "Giving it a second chance" },
  "beliefs.3.text": { section: "What we design for", label: "Point 3 text", text: "The spark doesn't always show up the first time." },

  // Events
  "events.eyebrow": { section: "Events", label: "Small label", text: "Upcoming events" },
  "events.title": { section: "Events", label: "Headline", text: "This season at Take2" },
  "events.subscribe": { section: "Events", label: "Subscribe link (next to ticket note)", text: "Subscribe to the calendar", link: LUMA },
  "events.empty": { section: "Events", label: "Message when no upcoming events", text: "New dates are coming soon." },
  "events.tag.next": { section: "Events", label: "Tag on featured event", text: "Next up" },
  "events.tag.onsale": { section: "Events", label: "Tag: On sale", text: "On sale" },
  "events.tag.soldout": { section: "Events", label: "Tag: Sold out (also used on past events)", text: "Sold out" },
  "events.tag.comingsoon": { section: "Events", label: "Tag: Coming soon (no release date)", text: "Coming soon" },
  "events.tag.ticketsout": { section: "Events", label: "Tag: Coming soon with release date. {date} becomes e.g. Nov 5", text: "Tickets out {date}" },
  "events.btn.onsale": { section: "Events", label: "Featured button: On sale", text: "Get tickets" },
  "events.btn.soldout": { section: "Events", label: "Featured button: Sold out", text: "Join the waitlist" },
  "events.btn.comingsoon": { section: "Events", label: "Featured button: Coming soon", text: "Get early access" },
  "events.btn.waitlistfull": { section: "Events", label: "Featured message: Waitlist full", text: "Sold out. The waitlist is full." },
  "events.card.onsale": { section: "Events", label: "Card link: On sale", text: "On sale · Get tickets" },
  "events.card.soldout": { section: "Events", label: "Card link: Sold out", text: "Sold out · Join the waitlist" },
  "events.card.waitlistfull": { section: "Events", label: "Card text: Waitlist full", text: "Sold out · Waitlist full" },
  "events.card.ticketsout": { section: "Events", label: "Card link: Coming soon with release date. {date} becomes e.g. Nov 5", text: "Tickets out {date} · Get notified" },
  "events.card.comingsoon": { section: "Events", label: "Card link: Coming soon (no release date)", text: "Coming soon · Get notified" },

  // How it works
  "how.eyebrow": { section: "How it works", label: "Small label", text: "How it works" },
  "how.title": { section: "How it works", label: "Headline", text: "We handle the awkward parts." },
  "how.1.title": { section: "How it works", label: "Step 1 title", text: "A curated room." },
  "how.1.text": { section: "How it works", label: "Step 1 text", text: "Every event is balanced 50:50. We believe in the power of the ratio." },
  "how.2.title": { section: "How it works", label: "Step 2 title", text: "Show up and mingle." },
  "how.2.text": { section: "How it works", label: "Step 2 text", text: "Some nights are speed dating, some have curated activities, and some are free-flowing mixers. We handle the icebreakers and the awkward parts." },
  "how.3.title": { section: "How it works", label: "Step 3 title", text: "Phones away." },
  "how.3.text": { section: "How it works", label: "Step 3 text", text: "We ask guests not to swap numbers or socials during the event, so the night stays about meeting people, not locking down a second date." },
  "how.4.title": { section: "How it works", label: "Step 4 title", text: "We make the match." },
  "how.4.text": { section: "How it works", label: "Step 4 text", text: "If the interest is mutual, we'll connect you after the event. We'll even handle the asking out." },

  // Gallery
  "gallery.eyebrow": { section: "Gallery", label: "Small label", text: "From our last event" },
  "gallery.title": { section: "Gallery", label: "Headline", text: "Real people, real rooms, real meet-cutes." },
  "gallery.link": { section: "Gallery", label: "Link", text: "See you at the next one", link: LUMA },

  // Signup
  "signup.title": { section: "Signup", label: "Headline", text: "Be the first to know." },
  "signup.text": { section: "Signup", label: "Text", text: "Our events sell out. Follow Take2 on Luma for early access to tickets and new event drops." },
  "signup.button": { section: "Signup", label: "Button", text: "Find us on Luma", link: LUMA },

  // Footer
  "footer.tagline": { section: "Footer", label: "Tagline", text: "Curated dating experiences in New York City" },
  "footer.instagram": { section: "Footer", label: "Instagram link", text: "Instagram", link: "http://instagram.com/take2.social" },
  "footer.contact": { section: "Footer", label: "Contact link", text: "Contact us", link: "mailto:hello@take2.social" },
  "footer.luma": { section: "Footer", label: "Luma link", text: "Luma", link: LUMA },

  // Search and sharing
  "seo.title": { section: "Search and sharing", label: "Browser tab and Google title", text: "Take2 | Curated dating experiences in NYC" },
  "seo.description": { section: "Search and sharing", label: "Google description", text: "Curated in-person dating events for NYC singles who still believe in the meet-cute. No swiping, and no pressure to get the first impression right." },
  "seo.share": { section: "Search and sharing", label: "Description when shared on social/texts", text: "Dating experiences you don't want to miss." },
};

export type CopyKey = keyof typeof COPY_DEFAULTS;
