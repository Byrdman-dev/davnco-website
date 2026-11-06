// ===================== Hero word rotator =====================
const rotatorWords = ['your workflows.', 'your customer calls.', 'your paperwork.', 'your knowledge base.', 'your existing tools.'];
const rotatorEl = document.getElementById('rotator');
let rotatorIndex = 0;

function cycleRotator(){
  rotatorIndex = (rotatorIndex + 1) % rotatorWords.length;
  rotatorEl.style.opacity = '0';
}

rotatorEl.addEventListener('transitionend', (e) => {
  if (e.propertyName !== 'opacity' || rotatorEl.style.opacity !== '0') return;
  rotatorEl.textContent = rotatorWords[rotatorIndex];
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      rotatorEl.style.opacity = '1';
    });
  });
});

rotatorEl.style.transition = 'opacity .28s ease';
setInterval(cycleRotator, 2800);

// ===================== Stat counters =====================
const statNums = document.querySelectorAll('.stat-num');
const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = parseInt(el.dataset.count, 10);
    const duration = 1200;
    const start = performance.now();
    function tick(now){
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target);
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
    statObserver.unobserve(el);
  });
}, { threshold: 0.6 });

statNums.forEach(el => statObserver.observe(el));
