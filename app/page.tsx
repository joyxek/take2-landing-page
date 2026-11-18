// Take2 landing page
// Events, banner and ticket note come from Notion (see app/content.ts).
import { getEvents, getSettings, getCopy, type Copy, todayNY, fmtMonthDay, fmtWeekdayMonthDay, fmtFull, fmtShort, LUMA_URL, type SiteEvent } from "./content";
// To change event photos, replace the files in /public/assets/photos and update the list below.
const PHOTOS = [
  { src: "/assets/photos/speed-dating.jpg", alt: "Guests speed dating at numbered tables" },
  { src: "/assets/photos/bar-overhead.jpg", alt: "A packed Take2 mixer seen from above the bar" },
  { src: "/assets/photos/table-16.jpg", alt: "A guest at table 16 during a Take2 event" },
  { src: "/assets/photos/group-table.jpg", alt: "A group of guests chatting around a long table" },
  { src: "/assets/photos/gallery-room.jpg", alt: "A bright room full of Take2 guests at tables" },
];

export const revalidate = 60;

const isSoldOut = (e: SiteEvent) => e.status === "Sold out" || e.status === "Waitlist full";

const featureTag = (e: SiteEvent, c: Copy) =>
  isSoldOut(e) ? c.t("events.tag.soldout")
  : e.status === "On sale" ? c.t("events.tag.onsale")
  : e.ticketsRelease ? c.t("events.tag.ticketsout", { date: fmtShort(e.ticketsRelease) })
  : c.t("events.tag.comingsoon");

const featureButton = (e: SiteEvent, c: Copy) =>
  e.buttonText || (e.status === "On sale" ? c.t("events.btn.onsale") : e.status === "Sold out" ? c.t("events.btn.soldout") : c.t("events.btn.comingsoon"));

const cardLink = (e: SiteEvent, c: Copy) => {
  if (e.buttonText) return `${e.buttonText} →`;
  if (e.status === "On sale") return `${c.t("events.card.onsale")} →`;
  if (e.status === "Sold out") return `${c.t("events.card.soldout")} →`;
  if (e.status === "Waitlist full") return c.t("events.card.waitlistfull");
  return e.ticketsRelease ? `${c.t("events.card.ticketsout", { date: fmtShort(e.ticketsRelease) })} →` : `${c.t("events.card.comingsoon")} →`;
};

export default async function Home() {
  const [events, settings, c] = await Promise.all([getEvents(), getSettings(), getCopy()]);
  const today = todayNY();
  const upcoming = events.filter((e) => e.date >= today);
  const past = events.filter((e) => e.date < today).reverse().slice(0, 3);
  const feature = upcoming.find((e) => e.featured) ?? upcoming[0];
  const rest = upcoming.filter((e) => e !== feature);

  return (
    <>
{settings.banner && (
<a className="banner" href={settings.banner.link} target="_blank" rel="noopener">
  <span>{settings.banner.text}</span>
  {settings.banner.button && <span className="banner-cta">{settings.banner.button} <span aria-hidden="true">→</span></span>}
</a>
)}

<header className="hero" id="top">
  <img className="hero-bg" src="/assets/hero.jpg" alt="" width="2400" height="1600" />
  <div className="hero-shade" aria-hidden="true"></div>

  <nav className="nav" aria-label="Main">
    <div className="nav-side">
      <a href="#events">{c.t("nav.events")}</a>
      <a href="#philosophy">{c.t("nav.philosophy")}</a>
    </div>
    <a href="#top" className="nav-mark" aria-label="Take2 home"><img src="/assets/take2-wordmark-green.png" alt="Take2" width="641" height="275" /></a>
    <div className="nav-side nav-right">
      <a href="#how">{c.t("nav.how")}</a>
      <a href={c.href("nav.join")} target="_blank" rel="noopener">{c.t("nav.join")}</a>
    </div>
  </nav>

  <div className="hero-copy">
    <h1>{c.t("hero.title")}</h1>
    <p>{c.t("hero.text")}</p>
    <a className="btn btn-green" href={c.href("hero.button")} target="_blank" rel="noopener">{c.t("hero.button")} <span aria-hidden="true">→</span></a>
    <a className="hero-link" href={c.href("hero.link")} target="_blank" rel="noopener">{c.t("hero.link")}</a>
  </div>
</header>

<main>

  
  <section id="philosophy" className="split">
    <div className="split-copy">
      <p className="eyebrow">{c.t("phil.eyebrow")}</p>
      <h2 className="serif-xl">{c.t("phil.title")}</h2>
      <img className="split-badge" src="/assets/take2-badge.png" alt="" width="600" height="600" aria-hidden="true" />
      <p>{c.t("phil.p1")}</p>
      <p>{c.t("phil.p2")}</p>
      <a className="btn" href={c.href("phil.button")} target="_blank" rel="noopener">{c.t("phil.button")}</a>
    </div>

    <figure className="split-photo">
      <img src="/assets/portrait.jpg" alt="Two Take2 guests laughing and talking across a table" width="1100" height="1467" />
      <div className="ring" aria-hidden="true">
        <span className="ring-circle"></span>
        <span className="ring-label l1">{c.t("ring.1")}</span>
        <span className="ring-label l2">{c.t("ring.2")}</span>
        <span className="ring-label l3">{c.t("ring.3")}</span>
        <span className="ring-label l4">{c.t("ring.4")}</span>
        <span className="ring-label l5">{c.t("ring.5")}</span>
      </div>
    </figure>
  </section>

  
  <section className="beliefs-block">
    <div className="wrap beliefs-inner">
      <div>
        <p className="eyebrow">{c.t("beliefs.eyebrow")}</p>
        <h2 className="serif-lg">{c.t("beliefs.title")}</h2>
      </div>
      <ul className="icon-list">
        <li>
          <svg viewBox="0 0 32 32" aria-hidden="true"><circle cx="16" cy="11" r="5"/><path d="M6 27c1.5-5.5 5.5-8 10-8s8.5 2.5 10 8"/></svg>
          <div><h3>{c.t("beliefs.1.title")}</h3><p>{c.t("beliefs.1.text")}</p></div>
        </li>
        <li>
          <svg viewBox="0 0 32 32" aria-hidden="true"><circle cx="11" cy="12" r="4"/><circle cx="21" cy="12" r="4"/><path d="M3 26c1-4 4-6 8-6s7 2 8 6M13 26c1-4 4-6 8-6s7 2 8 6"/></svg>
          <div><h3>{c.t("beliefs.2.title")}</h3><p>{c.t("beliefs.2.text")}</p></div>
        </li>
        <li>
          <svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16 27s-10-6-10-13a5.5 5.5 0 0 1 10-3 5.5 5.5 0 0 1 10 3c0 7-10 13-10 13z"/><path d="M12.5 15.5h7M16 12v7"/></svg>
          <div><h3>{c.t("beliefs.3.title")}</h3><p>{c.t("beliefs.3.text")}</p></div>
        </li>
      </ul>
    </div>
  </section>

  
  <section id="events" className="events">
    <div className="wrap">
      <div className="events-head">
        <p className="eyebrow eyebrow-light">{c.t("events.eyebrow")}</p>
        <h2 className="serif-xl">{c.t("events.title")}</h2>
      </div>

      {settings.ticketNote && (
      <div className="events-note">
        <p>{settings.ticketNote}</p>
        <a href={c.href("events.subscribe")} target="_blank" rel="noopener">{c.t("events.subscribe")} <span aria-hidden="true">→</span></a>
      </div>
      )}

      {feature ? (
      <article className="feature">
        <img src="/assets/cheers.jpg" alt="Guests talking at tables during a Take2 event" width="1400" height="933" />
        <div className="feature-body">
          <div className="tags"><span className="tag tag-live">{c.t("events.tag.next")}</span><span className="tag">{featureTag(feature, c)}</span></div>
          <p className="feature-month">{fmtMonthDay(feature.date)}</p>
          <h3>{feature.name}</h3>
          {feature.description && <p>{feature.description}</p>}
          <p className="feature-meta">{fmtFull(feature.date)}</p>
          {feature.status === "Waitlist full" && !feature.buttonText ? (
          <p className="feature-full">{c.t("events.btn.waitlistfull")}</p>
          ) : (
          <a className="btn" href={feature.link} target="_blank" rel="noopener">{featureButton(feature, c)} <span aria-hidden="true">→</span></a>
          )}
        </div>
      </article>
      ) : (
      <div className="events-note">
        <p>{c.t("events.empty")}</p>
        <a href={c.href("events.subscribe")} target="_blank" rel="noopener">{c.t("events.subscribe")} <span aria-hidden="true">→</span></a>
      </div>
      )}

      {rest.length > 0 && (
      <div className="cards cards-3">
        {rest.map((e) => (
        <article className="card" key={`${e.date}-${e.name}`}>
          <p className="card-month">{fmtWeekdayMonthDay(e.date)}</p>
          <h3>{e.name}</h3>
          {e.description && <p>{e.description}</p>}
          {e.status === "Waitlist full" && !e.buttonText ? (
          <span className="card-full">{cardLink(e, c)}</span>
          ) : (
          <a href={e.link} target="_blank" rel="noopener">{cardLink(e, c)}</a>
          )}
        </article>
        ))}
      </div>
      )}

      {past.map((e) => (
      <div className="past-event" key={`${e.date}-${e.name}`}>
        <span className="past-date">{fmtMonthDay(e.date)}</span>
        <span className="past-name">{e.name}{e.location ? ` · ${e.location}` : ""}</span>
        {isSoldOut(e) && <span className="tag tag-soldout">{c.t("events.tag.soldout")}</span>}
      </div>
      ))}
    </div>
  </section>

  
  <section id="how" className="how">
    <div className="wrap how-inner">
      <div className="how-head">
        <p className="eyebrow">{c.t("how.eyebrow")}</p>
        <h2 className="serif-lg">{c.t("how.title")}</h2>
      </div>
      <ol className="steps">
        <li><span className="num">01</span><div><h3>{c.t("how.1.title")}</h3><p>{c.t("how.1.text")}</p></div></li>
        <li><span className="num">02</span><div><h3>{c.t("how.2.title")}</h3><p>{c.t("how.2.text")}</p></div></li>
        <li><span className="num">03</span><div><h3>{c.t("how.3.title")}</h3><p>{c.t("how.3.text")}</p></div></li>
        <li><span className="num">04</span><div><h3>{c.t("how.4.title")}</h3><p>{c.t("how.4.text")}</p></div></li>
      </ol>
    </div>
  </section>

  
  <section id="gallery" className="gallery-sec">
    <div className="wrap">
      <div className="gallery-head">
        <div>
          <p className="eyebrow">{c.t("gallery.eyebrow")}</p>
          <h2 className="serif-lg">{c.t("gallery.title")}</h2>
        </div>
        <a className="link" href={c.href("gallery.link")} target="_blank" rel="noopener">{c.t("gallery.link")} →</a>
      </div>
      <div className="gallery">
        {PHOTOS.map((p, i) => (
          <figure key={p.src} className={`g-item g${i}`}>
            <img src={p.src} alt={p.alt} />
          </figure>
        ))}
      </div>
    </div>
  </section>

  
  <section id="signup" className="signup">
    <div className="wrap signup-inner">
      <div>
        <h2 className="serif-xl">{c.t("signup.title")}</h2>
        <p>{c.t("signup.text")}</p>
      </div>
      <div className="signup-cta">
        <a className="btn btn-lg" href={c.href("signup.button")} target="_blank" rel="noopener">{c.t("signup.button")} <span aria-hidden="true">→</span></a>
      </div>
    </div>
  </section>

</main>

<footer className="footer">
  <div className="wrap footer-top">
    <p>{c.t("footer.tagline")}</p>
    <div className="footer-links">
      <a href={c.href("footer.instagram")} target="_blank" rel="noopener">{c.t("footer.instagram")}</a>
      <a href={c.href("footer.contact")}>{c.t("footer.contact")}</a>
      <a href={c.href("footer.luma")} target="_blank" rel="noopener">{c.t("footer.luma")}</a>
    </div>
  </div>
  <div className="footer-mark" aria-hidden="true"><img src="/assets/take2-wordmark-green.png" alt="" width="641" height="275" /></div>
</footer>
    </>
  );
}
