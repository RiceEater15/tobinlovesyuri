/* ☰ Menu Toggle */
const menuBtn = document.getElementById("menuBtn");
const dropdown = document.getElementById("dropdown");

menuBtn.onclick = () => {
  dropdown.style.display =
    dropdown.style.display === "block" ? "none" : "block";
};

/* 🎵 Autoplay Fix */
document.body.addEventListener("click", () => {
  document.getElementById("bgMusic").play();
}, { once: true });

/* ⭐ Falling + Shooting Stars */
const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

const stars = [];
for (let i = 0; i < 140; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 1.5 + 0.5,
    s: Math.random() * 1 + 0.5
  });
}

let shootingStar = null;

function createShootingStar() {
  shootingStar = {
    x: Math.random() * canvas.width,
    y: -50,
    vx: Math.random() * 6 + 8,
    vy: Math.random() * 6 + 8,
    life: 0
  };
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "white";
  stars.forEach(star => {
    star.y += star.s;
    star.x -= star.s * 0.3;

    if (star.y > canvas.height) {
      star.y = 0;
      star.x = Math.random() * canvas.width;
    }

    ctx.beginPath();
    ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
    ctx.fill();
  });

  if (!shootingStar && Math.random() < 0.005) {
    createShootingStar();
  }

  if (shootingStar) {
    shootingStar.x += shootingStar.vx;
    shootingStar.y += shootingStar.vy;
    shootingStar.life++;

    ctx.strokeStyle = "rgba(255,255,255,0.8)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(shootingStar.x, shootingStar.y);
    ctx.lineTo(
      shootingStar.x - shootingStar.vx * 4,
      shootingStar.y - shootingStar.vy * 4
    );
    ctx.stroke();

    if (shootingStar.life > 30) shootingStar = null;
  }

  requestAnimationFrame(animate);
}

animate();
