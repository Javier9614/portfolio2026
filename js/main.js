/* ============================================================
   main.js — Portfolio Javier Aranda
   ============================================================ */

// ── Nav scroll state ─────────────────────────────────────────
const nav = document.getElementById('nav');
const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 12);
document.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// ── Reveal on scroll ─────────────────────────────────────────
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

// ── Active nav link on scroll ────────────────────────────────
// Highlights the nav link corresponding to the visible section
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      navLinks.forEach((link) => {
        link.classList.toggle(
          'active',
          link.getAttribute('href') === `#${entry.target.id}`
        );
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach((s) => sectionObserver.observe(s));

// ── Subtle tilt on project & email cards ─────────────────────
// Gives a slight 3D tilt following the mouse within each card
const tiltCards = document.querySelectorAll('.project, .email-card');

tiltCards.forEach((card) => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    card.style.transform = `translateY(-6px) rotateX(${-dy * 3}deg) rotateY(${dx * 3}deg)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// ── Marquee pause on hover ───────────────────────────────────
const marqueeTrack = document.querySelector('.marquee-track');
if (marqueeTrack) {
  const marquee = marqueeTrack.closest('.marquee');
  marquee.addEventListener('mouseenter', () => {
    marqueeTrack.style.animationPlayState = 'paused';
  });
  marquee.addEventListener('mouseleave', () => {
    marqueeTrack.style.animationPlayState = 'running';
  });
}

// ── Skill pills: stagger animate on first hover of section ───
// When the skills section enters view, pills animate in with
// a subtle scale bounce one by one (only once)
const skillsSection = document.getElementById('skills');
if (skillsSection) {
  const skillPills = skillsSection.querySelectorAll('.skill');
  let skillsAnimated = false;

  const skillsObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !skillsAnimated) {
      skillsAnimated = true;
      skillPills.forEach((pill, i) => {
        setTimeout(() => {
          pill.style.transition = 'transform .4s cubic-bezier(.34,1.56,.64,1), background .25s, color .25s, border-color .25s';
          pill.style.transform = 'scale(1.04)';
          setTimeout(() => { pill.style.transform = ''; }, 220);
        }, i * 55);
      });
      skillsObserver.disconnect();
    }
  }, { threshold: 0.3 });

  skillsObserver.observe(skillsSection);
}
