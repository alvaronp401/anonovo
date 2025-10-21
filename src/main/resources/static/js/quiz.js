document.addEventListener("DOMContentLoaded", () => {
  const quiz = document.getElementById("quiz");
  const final = document.getElementById("final");
  const nomeInput = document.getElementById("nome");
  const iniciarBtn = document.getElementById("iniciar");

  const perguntas = [
    {
      texto: "🌴 Onde vamos comemorar o Ano Novo?",
      opcoes: ["Na praia", "Em casa", "Na montanha", "Na cidade"],
    },
    {
      texto: "🎭 Qual será o tema da festa?",
      opcoes: ["Branco e dourado", "Fantasia", "Anos 2000", "Neon"],
    },
    {
      texto: "✈️ Vai ter viagem em 2025?",
      opcoes: ["Sim, bora viajar!", "Talvez 😅", "Não, foco total!"],
    },
  ];

  let indice = 0;
  let nome = "";
  let respostas = [];

  iniciarBtn.addEventListener("click", () => {
    nome = nomeInput.value.trim();
    if (nome === "") {
      alert("Digite seu nome antes de começar 😄");
      return;
    }
    iniciarQuiz();
  });

  function iniciarQuiz() {
    mostrarPergunta();
  }

  function mostrarPergunta() {
    if (indice >= perguntas.length) {
      mostrarFinal();
      return;
    }

    const p = perguntas[indice];
    quiz.innerHTML = `
      <div class="question">${p.texto}</div>
      <div class="options">
        ${p.opcoes.map(o => `<button>${o}</button>`).join("")}
      </div>
    `;

    document.querySelectorAll(".options button").forEach(btn => {
      btn.addEventListener("click", () => {
        respostas.push(btn.textContent);
        indice++;
        mostrarPergunta();
      });
    });
  }

  function mostrarFinal() {
    quiz.style.display = "none";
    final.style.display = "block";

    const dados = { nome, respostas };

    fetch("/salvar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dados)
    })
      .then(response => response.text())
      .then(msg => console.log(msg))
      .catch(err => console.error("Erro ao salvar:", err));

    final.innerHTML = `
      <div style="text-align:center;">
        <h2>🎆 <strong>Feliz 2025, ${nome}!</strong> 🎆</h2>
        <p>Suas respostas foram salvas com sucesso! 💾</p>
        <br>
        <a href="/respostas" style="color: gold; text-decoration: none; font-weight: bold;">Ver respostas</a> |
        <a href="/" style="color: gold; text-decoration: none; font-weight: bold;">Voltar à contagem</a>
      </div>
    `;
  }
});
