// GM Tech Solution — interactions + scroll choreography.
// Every element's resting HTML/CSS state is its final state, so with reduced motion
// (or if the CDN scripts fail) the page is simply static and fully readable.

const nav = document.getElementById('nav');
const menu = document.getElementById('menu');
const menuBtn = document.querySelector('.menu-btn');
const main = document.getElementById('main');
const footer = document.getElementById('contact');

function setMenu(open) {
  menu.hidden = !open;
  menuBtn.setAttribute('aria-expanded', open);
  // Full-screen sheet: lock the page behind it, keep Tab inside it (nav + sheet), keep the X on screen.
  document.documentElement.classList.toggle('menu-open', open);
  main.inert = footer.inert = open;
  if (open) nav.classList.remove('nav--hidden');
}
menuBtn.addEventListener('click', () => setMenu(menu.hidden));
menu.addEventListener('click', (e) => { if (e.target.closest('a')) setMenu(false); });
// Services dropdown opens on hover/focus; drop focus after a pick so it closes.
document.querySelector('.drop').addEventListener('click', () => document.activeElement.blur());
document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !menu.hidden) { setMenu(false); menuBtn.focus(); } });
// The sheet is phone-only; rotating into the wider layout (where its button is hidden) closes it.
matchMedia('(max-width: 760px)').addEventListener('change', () => setMenu(false));
// Skip link: smooth scroll may intercept the jump, so move focus to the content explicitly.
document.querySelector('.skip').addEventListener('click', () => main.focus({ preventScroll: true }));

// Phone Book a Call bar: CSS shows it while the nav is tucked away; it steps aside once the footer,
// which has its own booking links, is on screen.
const callbar = document.querySelector('.callbar');
new IntersectionObserver(([e]) => callbar.classList.toggle('is-off', e.isIntersecting)).observe(footer);

// Wrap each word of .split paragraphs in a span so it can be "filled" on scroll.
document.querySelectorAll('.split').forEach((el) => {
  const words = el.textContent.trim().split(/\s+/);
  el.textContent = '';
  words.forEach((w, i) => {
    const span = document.createElement('span');
    span.className = 'w';
    span.textContent = w;
    el.append(span, i < words.length - 1 ? ' ' : '');
  });
});

if (window.gsap && window.ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);

  // Nav: turns white over dark sections, and tucks away while scrolling down (back on scroll up).
  // Both classes are derived from scroll position on every update (not toggleClass), so zones
  // can't fight each other and a mid-page reload can't leave them stuck.
  const watchNav = (zoneConfigs) => {
    let zones = [];
    const sync = () => { const y = scrollY; nav.classList.toggle('nav--dark', zones.some((z) => y >= z.start && y <= z.end)); };
    zones = zoneConfigs.map((z) => ScrollTrigger.create({ ...z, onToggle: sync, onRefresh: sync }));
    sync();
    ScrollTrigger.create({
      start: 0, end: () => ScrollTrigger.maxScroll(window),
      onUpdate: (self) => nav.classList.toggle('nav--hidden', self.direction === 1 && self.scroll() > innerHeight * 0.6 && menu.hidden),
    });
  };
  const laterZones = [
    { trigger: '.stack', start: 'top 40px', end: 'bottom 40px' },
    // footer is last on the page, so its bottom meets the viewport bottom at max scroll
    { trigger: '.footer', start: 'top 40px', end: 'bottom bottom' },
  ];
  // No pins (phones, reduced motion): the video section is just its own box.
  const staticZones = [{ trigger: '.dark', start: 'top 40px', end: 'bottom 40px' }, ...laterZones];

  const human = document.querySelector('.hand--human');
  const robot = document.querySelector('.hand--robot');
  // Load intro shared by both motion branches. Each branch calls it, so matchMedia reverts it with that branch.
  const intro = () => gsap.timeline({ defaults: { ease: 'power3.out' } })
    .from('.hero-title .line', { opacity: 0, filter: 'blur(10px)', y: 20, duration: 1, stagger: 0.12 })
    .from('.orb', { opacity: 0, scale: 0.7, duration: 1.2 }, 0)
    .from('.hero-copy, .hero-foot .chips, .hero-cta, .nav > *', { opacity: 0, y: 12, duration: 0.7, stagger: 0.04 }, 0.3);

  // Cursor spark: the spark from where the hands meet, trailing the native cursor (which stays
  // visible). It opens into a ring over anything clickable. Fine pointers only; off under reduced motion.
  gsap.matchMedia().add('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)', () => {
    const make = (cls) => {
      const el = document.createElement('div');
      el.className = cls;
      el.setAttribute('aria-hidden', 'true');
      document.body.append(el);
      return el;
    };
    const spark = make('spark');
    const glow = make('spark-glow'); // trails a little further behind than the spark
    const follow = (el, duration) => ['x', 'y'].map((p) => gsap.quickTo(el, p, { duration, ease: 'power3' }));
    const [sx, sy] = follow(spark, 0.2);
    const [gx, gy] = follow(glow, 0.6);
    let px = 0, py = 0, shown = false;
    const setHot = (el) => {
      const hot = !!el?.closest('a, button');
      spark.classList.toggle('is-hot', hot);
      glow.classList.toggle('is-hot', hot);
    };
    const move = (e) => {
      px = e.clientX; py = e.clientY;
      if (!shown) { gsap.set([spark, glow], { x: px, y: py }); shown = true; } // appear at the pointer, not fly in from 0,0
      sx(px); sy(py); gx(px); gy(py);
      spark.classList.add('is-on'); glow.classList.add('is-on');
      setHot(e.target);
    };
    const leave = () => { spark.classList.remove('is-on'); glow.classList.remove('is-on'); shown = false; };
    addEventListener('pointermove', move, { passive: true });
    document.documentElement.addEventListener('pointerleave', leave);
    // scrolling slides new targets under a still pointer
    ScrollTrigger.create({ start: 0, end: () => ScrollTrigger.maxScroll(window), onUpdate: () => shown && setHot(document.elementFromPoint(px, py)) });
    return () => {
      removeEventListener('pointermove', move);
      document.documentElement.removeEventListener('pointerleave', leave);
      spark.remove(); glow.remove();
    };
  });

  gsap.matchMedia().add('(prefers-reduced-motion: reduce)', () => watchNav(staticZones));

  // Desktop: pinned, scroll-scrubbed choreography with smooth scroll.
  gsap.matchMedia().add('(min-width: 761px) and (prefers-reduced-motion: no-preference)', () => {

    // Smooth scroll (anchors: true makes the nav/menu links glide).
    let lenis, tick;
    if (window.Lenis) {
      lenis = new Lenis({ anchors: { offset: -nav.offsetHeight } }); // land sections below the fixed bar
      lenis.on('scroll', ScrollTrigger.update);
      tick = (t) => lenis.raf(t * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
    }

    // 1. Hero — intro, then the two hands reach for each other as you scroll.
    // The "apart" pose is set outside the scroll timeline: ScrollTrigger's refresh reverts
    // its own timelines and wouldn't re-render a from-state at progress 0.
    const reach = 0.38; // how far apart (share of viewport width) each hand starts
    gsap.set(human, { xPercent: (-innerWidth * reach / human.offsetWidth) * 100 });
    gsap.set(robot, { xPercent: (innerWidth * reach / robot.offsetWidth) * 100 });

    intro()
      .from(human, { x: -160, opacity: 0, duration: 1.1 }, 0.15)
      .from(robot, { x: 160, opacity: 0, duration: 1.1 }, 0.15);

    gsap.timeline({ scrollTrigger: { trigger: '.hero', start: 'top top', end: '+=120%', pin: true, scrub: 1 } })
      .to([human, robot], { xPercent: 0, ease: 'power1.inOut', duration: 0.8 }, 0)
      .to('.orb', { scale: 1.15, opacity: 1, duration: 0.2 }, 0.8);

    // 2. Dark video — grows from a rounded card to full screen, then the words cycle.
    gsap.fromTo('.dark-inner',
      { clipPath: 'inset(8% 4% 0% 4% round 28px)' },
      { clipPath: 'inset(0% 0% 0% 0% round 0px)', ease: 'none', scrollTrigger: { trigger: '.dark', start: 'top bottom', end: 'top top', scrub: true } });

    const words = gsap.utils.toArray('.dark-words span');
    const darkPin = gsap.timeline({ scrollTrigger: { trigger: '.dark', start: 'top top', end: '+=200%', pin: true, scrub: 1 } })
      .fromTo(words[0], { letterSpacing: '.2em' }, { letterSpacing: '.38em', duration: 1 })
      .to(words[0], { opacity: 0, filter: 'blur(8px)', duration: 0.5 })
      .fromTo(words[1], { opacity: 0, filter: 'blur(8px)' }, { opacity: 1, filter: 'blur(0px)', duration: 0.5 }, '<0.2')
      .to(words[1], { opacity: 0, filter: 'blur(8px)', duration: 0.5 }, '+=0.6')
      .fromTo(words[2], { opacity: 0, filter: 'blur(8px)' }, { opacity: 1, filter: 'blur(0px)', duration: 0.5 }, '<0.2')
      .to({}, { duration: 0.6 })
      .fromTo('.dark-copy .w', { color: 'rgba(255,255,255,.3)' }, { color: '#fff', stagger: 0.1, duration: 0.4 }, 0);

    // Engagement rows fade up as they enter.
    gsap.utils.toArray('.row').forEach((row) => {
      gsap.from(row, { opacity: 0, y: 40, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: row, start: 'top 90%' } });
    });

    // 4. Service cards — a flat stack of cards twists up and spreads into their CSS grid.
    // No invalidateOnRefresh: it would re-record the end state of this .from() as the stacked pose.
    const fan = document.querySelector('.fan');
    gsap.timeline({ scrollTrigger: { trigger: '.fan-sec', start: 'top top', end: '+=130%', pin: true, scrub: 1 } })
      .from('.card', {
        x: (i, el) => fan.clientWidth / 2 - (el.offsetLeft + el.offsetWidth / 2),
        y: (i, el, all) => fan.clientHeight / 2 - (el.offsetTop + el.offsetHeight / 2) + (i - (all.length - 1) / 2) * -22,
        rotationX: 68, rotationZ: -28, scale: 0.92,
        ease: 'power2.inOut', stagger: { each: 0.04, from: 'center' },
      });

    // 5. Section reveals.
    gsap.utils.toArray('.sec-head, .ring-wrap').forEach((el) => {
      gsap.from(el, { opacity: 0, y: 40, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 88%' } });
    });
    gsap.from('.review', { opacity: 0, y: 40, duration: 1, stagger: 0.12, ease: 'power3.out', scrollTrigger: { trigger: '.review-grid', start: 'top 85%' } });

    // 5c. How we work — the line draws across as the three steps rise in.
    gsap.fromTo('.journey-line', { scaleX: 0 }, {
      scaleX: 1, ease: 'none',
      scrollTrigger: { trigger: '.journey-track', start: 'top 80%', end: 'bottom 55%', scrub: true },
    });
    gsap.from('.step', { opacity: 0, y: 40, duration: 1, stagger: 0.15, ease: 'power3.out', scrollTrigger: { trigger: '.journey-track', start: 'top 85%' } });

    // Created after every pin so the zones include pin spacing. Video section: from its top reaching
    // the nav until, after its pin, its bottom scrolls past.
    const pinST = darkPin.scrollTrigger;
    watchNav([{ start: () => pinST.start - 40, end: () => pinST.end + innerHeight - 40 }, ...laterZones]);

    return () => {
      if (lenis) { gsap.ticker.remove(tick); lenis.destroy(); }
    };
  });

  // Phones: native scroll, no pins, no Lenis. The hands meet on their own at load; sections rise in as they enter.
  gsap.matchMedia().add('(max-width: 760px) and (prefers-reduced-motion: no-preference)', () => {
    const apart = (el, dir) => dir * innerWidth * 0.24 / el.offsetWidth * 100; // start gap, as a share of the viewport
    // slide only, no fade: the hands are the phone's LCP element, and opacity 0 would delay it
    intro()
      .from(human, { xPercent: apart(human, -1), duration: 1.8, ease: 'power3.inOut' }, 0.2)
      .from(robot, { xPercent: apart(robot, 1), duration: 1.8, ease: 'power3.inOut' }, 0.2)
      .to('.orb', { scale: 1.15, duration: 0.8 }, '-=0.4'); // blooms as the fingertips touch
    // In page order; each element is its own trigger, so the stacked dark words arrive one by one.
    gsap.utils.toArray('.sec-head, .dark-words span, .dark-copy, .fan, .step, .ring-wrap, .review-grid, .row').forEach((el) => {
      gsap.from(el, { opacity: 0, y: 32, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 90%' } });
    });
    watchNav(staticZones);
  });
}
