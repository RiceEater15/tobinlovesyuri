/* ☰ Dropdown Menu */
const menuBtn = document.getElementById("menuBtn");
const dropdown = document.getElementById("dropdown");

menuBtn.onclick = () => {
  dropdown.style.display =
    dropdown.style.display === "block" ? "none" : "block";
};

/* ⭐ Stars + Shooting Stars */
const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

const stars = [];
for (let i = 0; i < 160; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 1.8 + 0.4,
    s: Math.random() * 1.2 + 0.3
  });
}

let shootingStar = null;

function createShootingStar() {
  shootingStar = {
    x: Math.random() * canvas.width,
    y: -20,
    vx: Math.random() * 10 + 10,
    vy: Math.random() * 10 + 10,
    life: 0
  };
}

function animateStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Regular stars
  ctx.fillStyle = "white";
  stars.forEach(star => {
    star.y += star.s;
    star.x -= star.s * 0.4;

    if (star.y > canvas.height) {
      star.y = 0;
      star.x = Math.random() * canvas.width;
    }

    ctx.beginPath();
    ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
    ctx.fill();
  });

  // Shooting star
  if (!shootingStar && Math.random() < 0.01) {
    createShootingStar();
  }

  if (shootingStar) {
    shootingStar.x += shootingStar.vx;
    shootingStar.y += shootingStar.vy;
    shootingStar.life++;

    ctx.strokeStyle = "rgba(255,255,255,0.9)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(shootingStar.x, shootingStar.y);
    ctx.lineTo(
      shootingStar.x - shootingStar.vx * 4,
      shootingStar.y - shootingStar.vy * 4
    );
    ctx.stroke();

    if (shootingStar.life > 25) shootingStar = null;
  }

  requestAnimationFrame(animateStars);
}

animateStars();
