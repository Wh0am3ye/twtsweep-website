export function initSmoke() {
  const canvas = document.getElementById("smoke");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let particles = [];

  // 🔥 Load smoke texture
  const smokeImg = new Image();
  smokeImg.src = "/images/smoke.png";

  class SmokeParticle {
    constructor(x, y) {
      this.x = x;
      this.y = y;

      this.baseSize = Math.random() * 140 + 100;

      this.speedX = (Math.random() - 0.5) * 0.8;
      this.speedY = Math.random() * -0.6 - 0.2;

      this.rotation = Math.random() * Math.PI * 2;
      this.rotationSpeed = (Math.random() - 0.5) * 0.01;

      this.opacity = 0;
      this.buoyancy = 0.01;
      
      this.life = 0;
      this.maxLife = 300 + Math.random() * 200; // ~5–8 seconds at 60fps
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      this.speedX += (Math.random() - 0.5) * 0.01;
      this.speedX *= 0.99; // air resistance
      this.speedY *= 0.995;
      this.speedY -= this.buoyancy;

      this.rotation += this.rotationSpeed;

      this.life++;

      // ⬇️ Opacity lifecycle
      const lifeRatio = this.life / this.maxLife;   
      this.size = this.baseSize * (1 + lifeRatio * 4);
      const t = this.life / this.maxLife;

this.opacity =
  0.5 * (1 - (t * t * (3 - 2 * t)));
    }

    draw() {
      ctx.save();

      ctx.globalAlpha = this.opacity;

      ctx.translate(this.x, this.y);
      ctx.rotate(this.rotation);

      ctx.drawImage(
        smokeImg,
        -this.size / 2,
        -this.size / 2,
        this.size,
        this.size
      );

      ctx.restore();
    }
  }

  function createPuff(x, y) {
    for (let i = 0; i < 80; i++) {
      const p = new SmokeParticle(x, y);

      // tighter burst center
      p.x += (Math.random() - 0.5) * 60;
      p.y += (Math.random() - 0.5) * 40;

      particles.push(p);
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = particles.length - 1; i >= 0; i--) {
  const p = particles[i];
  p.update();
  p.draw();

  if (p.life >= p.maxLife || p.opacity <= 0) {
    particles.splice(i, 1);
  }
}

    requestAnimationFrame(animate);
  }

  // Wait for image to load before starting
  smokeImg.onload = () => {
    createPuff(canvas.width / 2, canvas.height * 0.5);
    animate();
  };
}