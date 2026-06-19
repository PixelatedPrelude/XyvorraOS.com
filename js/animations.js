/* =====================================================
   XyvorraOS — animations.js
   Handles: star-field canvas, scroll-reveal observer,
            typing headline effect, terminal typewriter
   ===================================================== */

// ── Star Field ──────────────────────────────────────────
(function initStars() {
  const canvas = document.getElementById('star-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let stars = [];
  let W, H;

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function createStars(count) {
    stars = [];
    for (let i = 0; i < count; i++) {
      stars.push({
        x:     Math.random() * W,
        y:     Math.random() * H,
        r:     Math.random() * 1.4 + 0.2,
        alpha: Math.random() * 0.7 + 0.1,
        speed: Math.random() * 0.018 + 0.004,
        dir:   Math.random() > 0.5 ? 1 : -1,
        drift: (Math.random() - 0.5) * 0.08,
      });
    }
  }

  function drawStars() {
    ctx.clearRect(0, 0, W, H);
    for (const s of stars) {
      // Subtle twinkle
      s.alpha += s.speed * s.dir;
      if (s.alpha >= 0.85 || s.alpha <= 0.05) s.dir *= -1;

      // Very slow drift
      s.x += s.drift;
      if (s.x < 0) s.x = W;
      if (s.x > W) s.x = 0;

      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(180, 210, 230, ${s.alpha})`;
      ctx.fill();
    }
  }

  // Occasional shooting star
  let shootTimer = 0;
  function shootingStar() {
    shootTimer++;
    if (shootTimer < 300) return;
    shootTimer = 0;

    const sx = Math.random() * W * 0.6;
    const sy = Math.random() * H * 0.4;
    const len = 80 + Math.random() * 120;
    const angle = Math.PI / 5;

    let progress = 0;
    const dur = 40;

    function drawShoot() {
      if (progress > dur) return;
      const frac = progress / dur;
      const ex = sx + Math.cos(angle) * len * frac;
      const ey = sy + Math.sin(angle) * len * frac;
      const tailx = sx + Math.cos(angle) * len * Math.max(0, frac - 0.35);
      const taily = sy + Math.sin(angle) * len * Math.max(0, frac - 0.35);

      const grad = ctx.createLinearGradient(tailx, taily, ex, ey);
      grad.addColorStop(0, 'rgba(180,230,255,0)');
      grad.addColorStop(1, `rgba(180,230,255,${0.9 * (1 - frac)})`);

      ctx.beginPath();
      ctx.moveTo(tailx, taily);
      ctx.lineTo(ex, ey);
      ctx.strokeStyle = grad;
      ctx.lineWidth = 1.5;
      ctx.stroke();
      progress++;
      requestAnimationFrame(drawShoot);
    }
    requestAnimationFrame(drawShoot);
  }

  function loop() {
    drawStars();
    shootingStar();
    requestAnimationFrame(loop);
  }

  window.addEventListener('resize', () => { resize(); createStars(220); });
  resize();
  createStars(220);
  loop();
})();


// ── Scroll Reveal ───────────────────────────────────────
(function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  els.forEach(el => observer.observe(el));
})();


// ── Typing Effect ───────────────────────────────────────
// Add data-typing="Your text here" and class="typing-target" to any element
(function initTyping() {
  const targets = document.querySelectorAll('.typing-target');
  targets.forEach(el => {
    const text = el.dataset.typing;
    if (!text) return;
    el.textContent = '';
    el.classList.add('cursor-blink');
    let i = 0;
    const speed = parseInt(el.dataset.typingSpeed) || 42;
    const delay = parseInt(el.dataset.typingDelay) || 0;

    setTimeout(() => {
      const t = setInterval(() => {
        el.textContent += text[i];
        i++;
        if (i >= text.length) {
          clearInterval(t);
          setTimeout(() => el.classList.remove('cursor-blink'), 1200);
        }
      }, speed);
    }, delay);
  });
})();


// ── Terminal Typewriter ─────────────────────────────────
// Looks for elements with class "terminal-type" and types their lines in order
(function initTerminalType() {
  const terms = document.querySelectorAll('.terminal-auto');
  terms.forEach(term => {
    const lines = term.querySelectorAll('.terminal-line');
    lines.forEach(l => { l.style.opacity = '0'; });

    let delay = 400;
    lines.forEach((line, idx) => {
      setTimeout(() => {
        line.style.opacity = '1';
        line.style.animation = 'fade-up 0.3s ease forwards';
      }, delay);
      delay += 500 + (line.textContent.length * 14);
    });
  });
})();


// ── Smooth counter animation ────────────────────────────
// Add data-count="1234" to a .count-up element
(function initCountUp() {
  const counters = document.querySelectorAll('.count-up');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.count, 10);
      const duration = 1400;
      const step = 16;
      const increment = target / (duration / step);
      let current = 0;

      const timer = setInterval(() => {
        current = Math.min(current + increment, target);
        el.textContent = Math.round(current).toLocaleString();
        if (current >= target) clearInterval(timer);
      }, step);

      observer.unobserve(el);
    });
  }, { threshold: 0.5 });

  counters.forEach(el => observer.observe(el));
})();
