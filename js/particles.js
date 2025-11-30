// particles.js — lightweight background particles (no external deps)
(function(){
  const canvas = document.getElementById('particles');
  if(!canvas) return;
  const ctx = canvas.getContext('2d');
  let W = canvas.width = innerWidth;
  let H = canvas.height = innerHeight;

  // resize
  function resize(){
    W = canvas.width = innerWidth;
    H = canvas.height = innerHeight;
  }
  addEventListener('resize', resize, { passive:true });

  const PARTICLE_COUNT = Math.max(20, Math.floor((W*H)/140000));
  const particles = [];

  function rand(min,max){ return Math.random()*(max-min)+min; }

  for(let i=0;i<PARTICLE_COUNT;i++){
    particles.push({
      x: rand(0,W),
      y: rand(0,H),
      r: rand(0.6,2.2),
      vx: rand(-0.15,0.15),
      vy: rand(-0.05,0.05),
      a: rand(0.08,0.35)
    });
  }

  function draw(){
    ctx.clearRect(0,0,W,H);
    for(const p of particles){
      p.x += p.vx;
      p.y += p.vy;
      // wrap
      if(p.x < -20) p.x = W + 20;
      if(p.x > W + 20) p.x = -20;
      if(p.y < -20) p.y = H + 20;
      if(p.y > H + 20) p.y = -20;

      ctx.beginPath();
      ctx.fillStyle = `rgba(255,255,255,${p.a})`;
      ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
      ctx.fill();
    }
    requestAnimationFrame(draw);
  }
  draw();
})();
