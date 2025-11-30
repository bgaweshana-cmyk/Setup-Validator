// waves.js — lightweight parallax + subtle path morphs
(function(){
  const waves = document.querySelectorAll('.wave');
  const orb = document.querySelector('.layer-orb');
  let lastScroll = 0;

  // Parallax on scroll: translateY by fraction
  function onScroll(){
    const s = window.scrollY || window.pageYOffset;
    // make it smooth on scroll
    waves.forEach((w, i) => {
      const depth = 0.08 + i * 0.03;
      const y = Math.round(s * depth);
      w.style.transform = `translate3d(${(i%2?1:-1) * (s * 0.01)}px, ${y}px, 0)`;
    });
    if (orb) {
      const orbY = Math.round(s * 0.05);
      orb.style.transform = `translate3d(${Math.sin(s/600)*36}px, ${-orbY}px, 0)`;
    }
    lastScroll = s;
  }

  // Simple responsive path swap for different widths (keeps waves feeling alive)
  function updatePaths(){
    const w = Math.max(320, window.innerWidth);
    document.querySelectorAll('.wave path').forEach((p, idx) => {
      // slightly change amplitude by viewport width to keep variation
      if(idx===0) p.setAttribute('d', 'M0,160L80,149.3C160,139,320,117,480,112C640,107,800,117,960,149.3C1120,181,1280,235,1360,261.3L1440,288V0H0Z');
      if(idx===1) p.setAttribute('d', 'M0,120L80,138.7C160,157,320,195,480,186.7C640,179,800,125,960,106.7C1120,89,1280,107,1360,117.3L1440,128V0H0Z');
      if(idx===2) p.setAttribute('d', 'M0,64L80,74.7C160,85,320,107,480,133.3C640,160,800,192,960,176C1120,160,1280,96,1360,64L1440,32V0H0Z');
    });
  }

  // init
  window.addEventListener('scroll', onScroll, { passive:true });
  window.addEventListener('resize', () => {
    updatePaths();
    onScroll();
  });

  // run initially
  updatePaths();
  onScroll();
})();
