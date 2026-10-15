// Take2 landing page
// To change event photos, replace the files in /public/assets/photos and update the list below.
const PHOTOS = [
  { src: "/assets/photos/speed-dating.jpg", alt: "Guests speed dating at numbered tables" },
  { src: "/assets/photos/bar-overhead.jpg", alt: "A packed Take2 mixer seen from above the bar" },
  { src: "/assets/photos/table-16.jpg", alt: "A guest at table 16 during a Take2 event" },
  { src: "/assets/photos/group-table.jpg", alt: "A group of guests chatting around a long table" },
  { src: "/assets/photos/gallery-room.jpg", alt: "A bright room full of Take2 guests at tables" },
];

export default function Home() {
  return (
    <>
<a className="banner" href="https://luma.com/take2" target="_blank" rel="noopener">
  <span>October 15 is sold out. Next up: November 5.</span>
  <span className="banner-cta">Get notified <span aria-hidden="true">→</span></span>
</a>

<header className="hero" id="top">
  <img className="hero-bg" src="/assets/hero.jpg" alt="" width="2400" height="1600" />
  <div className="hero-shade" aria-hidden="true"></div>

  <nav className="nav" aria-label="Main">
    <div className="nav-side">
      <a href="#events">Events</a>
      <a href="#philosophy">Philosophy</a>
    </div>
    <a href="#top" className="nav-mark" aria-label="Take2 home"><img src="/assets/take2-wordmark-green.png" alt="Take2" width="641" height="275" /></a>
    <div className="nav-side nav-right">
      <a href="#how">How it works</a>
      <a href="https://luma.com/take2" target="_blank" rel="noopener">Join the list</a>
    </div>
  </nav>

  <div className="hero-copy">
    <h1>Dating experiences you don't want to miss.</h1>
    <p>Curated in-person events for NYC singles who still believe in the meet-cute. No swiping, and no pressure to get the first impression right.</p>
    <a className="btn btn-green" href="https://luma.com/take2" target="_blank" rel="noopener">Find an Event <span aria-hidden="true">→</span></a>
    <a className="hero-link" href="https://luma.com/take2" target="_blank" rel="noopener">Join the list for first access</a>
  </div>
</header>

<main>

  
  <section id="philosophy" className="split">
    <div className="split-copy">
      <p className="eyebrow">The Take2 philosophy</p>
      <h2 className="serif-xl">Love deserves a second take.</h2>
      <img className="split-badge" src="/assets/take2-badge.png" alt="" width="600" height="600" aria-hidden="true" />
      <p>Modern dating expects you to get everything right from the start. We judge the first impression, the follow-up text and everything in between. We think that's backwards.</p>
      <p>So we design every experience around the second meeting. That's where the nerves settle, people loosen up and real chemistry has room to happen.</p>
      <a className="btn" href="https://luma.com/take2" target="_blank" rel="noopener">Find an event</a>
    </div>

    <figure className="split-photo">
      <img src="/assets/portrait.jpg" alt="Two Take2 guests laughing and talking across a table" width="1100" height="1467" />
      <div className="ring" aria-hidden="true">
        <span className="ring-circle"></span>
        <span className="ring-label l1">Show up as yourself</span>
        <span className="ring-label l2">A 50:50 room</span>
        <span className="ring-label l3">Phones away</span>
        <span className="ring-label l4">Meet once, meet again</span>
        <span className="ring-label l5">We make the match</span>
      </div>
    </figure>
  </section>

  
  <section className="beliefs-block">
    <div className="wrap beliefs-inner">
      <div>
        <p className="eyebrow">What we design for</p>
        <h2 className="serif-lg">Less performing. More meeting.</h2>
      </div>
      <ul className="icon-list">
        <li>
          <svg viewBox="0 0 32 32" aria-hidden="true"><circle cx="16" cy="11" r="5"/><path d="M6 27c1.5-5.5 5.5-8 10-8s8.5 2.5 10 8"/></svg>
          <div><h3>Showing up as yourself</h3><p>No performing, no judging, no pressure.</p></div>
        </li>
        <li>
          <svg viewBox="0 0 32 32" aria-hidden="true"><circle cx="11" cy="12" r="4"/><circle cx="21" cy="12" r="4"/><path d="M3 26c1-4 4-6 8-6s7 2 8 6M13 26c1-4 4-6 8-6s7 2 8 6"/></svg>
          <div><h3>Meeting people in real life</h3><p>Getting to know someone the way it used to happen, in a room full of people.</p></div>
        </li>
        <li>
          <svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16 27s-10-6-10-13a5.5 5.5 0 0 1 10-3 5.5 5.5 0 0 1 10 3c0 7-10 13-10 13z"/><path d="M12.5 15.5h7M16 12v7"/></svg>
          <div><h3>Giving it a second chance</h3><p>The spark doesn't always show up the first time.</p></div>
        </li>
      </ul>
    </div>
  </section>

  
  <section id="events" className="events">
    <div className="wrap">
      <div className="events-head">
        <p className="eyebrow eyebrow-light">Upcoming events</p>
        <h2 className="serif-xl">This season at Take2</h2>
      </div>

      <div className="events-note">
        <p>Tickets are released 2 weeks before each event. Newsletter subscribers get early bird pricing.</p>
        <a href="https://luma.com/take2" target="_blank" rel="noopener">Subscribe to the calendar <span aria-hidden="true">→</span></a>
      </div>

      <article className="feature">
        <img src="/assets/cheers.jpg" alt="Guests talking at tables during a Take2 event" width="1400" height="933" />
        <div className="feature-body">
          <div className="tags"><span className="tag tag-live">Next up</span><span className="tag">Tickets out Oct 22</span></div>
          <p className="feature-month">November 5</p>
          <h3>Singles and Friends Mixer</h3>
          <p>Like a night out at the bar with your friends, but the room is full of singles. Come single, or come as a single friend's +1.</p>
          <p className="feature-meta">Thursday, November 5, 2026</p>
          <a className="btn" href="https://luma.com/take2" target="_blank" rel="noopener">Get early access <span aria-hidden="true">→</span></a>
        </div>
      </article>

      <div className="cards cards-3">
        <article className="card">
          <p className="card-month">Thursday, November 12</p>
          <h3>Singles and Friends Mixer</h3>
          <p>Like a night out at the bar with your friends, but the room is full of singles. Come single, or come as a single friend's +1.</p>
          <a href="https://luma.com/take2" target="_blank" rel="noopener">Tickets out Oct 29 · Get notified →</a>
        </article>
        <article className="card">
          <p className="card-month">Friday, November 13</p>
          <h3>Singles and Friends Mixer</h3>
          <p>Like a night out at the bar with your friends, but the room is full of singles. Come single, or come as a single friend's +1.</p>
          <a href="https://luma.com/take2" target="_blank" rel="noopener">Tickets out Oct 30 · Get notified →</a>
        </article>
        <article className="card">
          <p className="card-month">Thursday, November 19</p>
          <h3>Singles Only Speed Dating</h3>
          <p>Singles only. A night of short one-on-one dates, scheduled for you, so you meet everyone in the room.</p>
          <a href="https://luma.com/take2" target="_blank" rel="noopener">Tickets out Nov 5 · Get notified →</a>
        </article>
      </div>

      <div className="past-event">
        <span className="past-date">October 15</span>
        <span className="past-name">Mix and Repeat · Williamsburg</span>
        <span className="tag tag-soldout">Sold out</span>
      </div>
    </div>
  </section>

  
  <section id="how" className="how">
    <div className="wrap how-inner">
      <div className="how-head">
        <p className="eyebrow">How it works</p>
        <h2 className="serif-lg">We handle the awkward parts.</h2>
      </div>
      <ol className="steps">
        <li><span className="num">01</span><div><h3>A curated room.</h3><p>Every event is balanced 50:50. We believe in the power of the ratio.</p></div></li>
        <li><span className="num">02</span><div><h3>Show up and mingle.</h3><p>Some nights are speed dating, some have curated activities, and some are free-flowing mixers. We handle the icebreakers and the awkward parts.</p></div></li>
        <li><span className="num">03</span><div><h3>Phones away.</h3><p>We ask guests not to swap numbers or socials during the event, so the night stays about meeting people, not locking down a second date.</p></div></li>
        <li><span className="num">04</span><div><h3>We make the match.</h3><p>If the interest is mutual, we'll connect you after the event. We'll even handle the asking out.</p></div></li>
      </ol>
    </div>
  </section>

  
  <section id="gallery" className="gallery-sec">
    <div className="wrap">
      <div className="gallery-head">
        <div>
          <p className="eyebrow">From our last event</p>
          <h2 className="serif-lg">Real people, real rooms, real meet-cutes.</h2>
        </div>
        <a className="link" href="https://luma.com/take2" target="_blank" rel="noopener">See you at the next one →</a>
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
        <h2 className="serif-xl">Be the first to know.</h2>
        <p>Our events sell out. Follow Take2 on Luma for early access to tickets and new event drops.</p>
      </div>
      <div className="signup-cta">
        <a className="btn btn-lg" href="https://luma.com/take2" target="_blank" rel="noopener">Find us on Luma <span aria-hidden="true">→</span></a>
      </div>
    </div>
  </section>

</main>

<footer className="footer">
  <div className="wrap footer-top">
    <p>Curated dating experiences in New York City</p>
    <div className="footer-links">
      <a href="http://instagram.com/take2.social" target="_blank" rel="noopener">Instagram</a>
      <a href="mailto:hello@take2.social">Contact us</a>
      <a href="https://luma.com/take2" target="_blank" rel="noopener">Luma</a>
    </div>
  </div>
  <div className="footer-mark" aria-hidden="true"><img src="/assets/take2-wordmark-green.png" alt="" width="641" height="275" /></div>
</footer>
    </>
  );
}
