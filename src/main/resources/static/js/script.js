// --- BRILHO NO TÍTULO + CONTAGEM ---
document.addEventListener("DOMContentLoaded", () => {
  const titulo = document.querySelector("h1");
  if (titulo) {
    setInterval(() => {
      titulo.style.textShadow = `0 0 20px ${randomColor()}, 0 0 40px ${randomColor()}`;
    }, 700);
  }
  iniciarContagemRegressiva();
  iniciarFogos();
});

function randomColor() {
  const colors = ["#ff6600", "#ffcc00", "#ffffff", "#ffd700"];
  return colors[Math.floor(Math.random() * colors.length)];
}

// --- CONTAGEM REGRESSIVA ---
function iniciarContagemRegressiva() {
  const destino = new Date("January 1, 2026 00:00:00").getTime();

  const atualizar = () => {
    const agora = new Date().getTime();
    const distancia = destino - agora;

    if (distancia <= 0) {
      clearInterval(timer);
      document.getElementById("contador").innerHTML =
        "<h2>🎇 Feliz Ano Novo 2026!!! 🎆</h2>";
      return;
    }

    const dias = Math.floor(distancia / (1000 * 60 * 60 * 24));
    const horas = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((distancia % (1000 * 60)) / 1000);

    document.getElementById("dias").textContent = dias.toString().padStart(2, "0");
    document.getElementById("horas").textContent = horas.toString().padStart(2, "0");
    document.getElementById("minutos").textContent = minutos.toString().padStart(2, "0");
    document.getElementById("segundos").textContent = segundos.toString().padStart(2, "0");
  };

  atualizar();
  const timer = setInterval(atualizar, 1000);
}

// --- ANIMAÇÃO: ESTRELAS E FOGOS ---
function iniciarFogos() {
  const canvas = document.getElementById("fundo");
  const ctx = canvas.getContext("2d");

  let estrelas = [];
  let fogos = [];
  let explosoes = [];

  function redimensionar() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener("resize", redimensionar);
  redimensionar();

  // Cria estrelas fixas
  for (let i = 0; i < 200; i++) {
    estrelas.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      brilho: Math.random(),
    });
  }

  function desenharEstrelas() {
    for (const e of estrelas) {
      ctx.beginPath();
      ctx.arc(e.x, e.y, 1, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${0.3 + e.brilho})`;
      ctx.fill();
    }
  }

  function criarFogo() {
    fogos.push({
      x: Math.random() * canvas.width,
      y: canvas.height,
      vx: (Math.random() - 0.5) * 2,
      vy: -Math.random() * 8 - 6,
      cor: randomColor(),
    });
  }

  function atualizarFogos() {
    for (let i = fogos.length - 1; i >= 0; i--) {
      const f = fogos[i];
      f.x += f.vx;
      f.y += f.vy;
      f.vy += 0.15; // gravidade
      if (f.vy >= 0) {
        fogos.splice(i, 1);
        criarExplosao(f.x, f.y, f.cor);
      }
    }
  }

  function desenharFogos() {
    for (const f of fogos) {
      ctx.beginPath();
      ctx.arc(f.x, f.y, 3, 0, Math.PI * 2);
      ctx.fillStyle = f.cor;
      ctx.fill();
    }
  }

  function criarExplosao(x, y, cor) {
    for (let i = 0; i < 40; i++) {
      explosoes.push({
        x,
        y,
        vx: Math.cos((i * Math.PI * 2) / 40) * (Math.random() * 3 + 1),
        vy: Math.sin((i * Math.PI * 2) / 40) * (Math.random() * 3 + 1),
        cor,
        vida: 100,
      });
    }
  }

  function atualizarExplosoes() {
    for (let i = explosoes.length - 1; i >= 0; i--) {
      const e = explosoes[i];
      e.x += e.vx;
      e.y += e.vy;
      e.vy += 0.05;
      e.vida -= 2;
      if (e.vida <= 0) explosoes.splice(i, 1);
    }
  }

  function desenharExplosoes() {
    for (const e of explosoes) {
      ctx.beginPath();
      ctx.arc(e.x, e.y, 2, 0, Math.PI * 2);
      ctx.fillStyle = `${e.cor}${Math.floor((e.vida / 100) * 255).toString(16)}`;
      ctx.fill();
    }
  }

  // Loop principal
  function loop() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    desenharEstrelas();
    atualizarFogos();
    desenharFogos();
    atualizarExplosoes();
    desenharExplosoes();

    if (Math.random() < 0.05) criarFogo();
    requestAnimationFrame(loop);
  }
  loop();
}
