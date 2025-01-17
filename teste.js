// Dados iniciais das rodadas
const rodadas = [
  {
    rodada: "1ª RODADA",
    jogos: [
      { time1: "Time A", time2: "Time B", gols1: null, gols2: null },
      { time1: "Time C", time2: "Time D", gols1: null, gols2: null },
    ],
  },
  {
    rodada: "2ª RODADA",
    jogos: [
      { time1: "Time A", time2: "Time C", gols1: null, gols2: null },
      { time1: "Time B", time2: "Time D", gols1: null, gols2: null },
    ],
  },
];

let rodadaAtual = 0;

// Dados iniciais da classificação
const times = ["Time A", "Time B", "Time C", "Time D"];
const classificacao = {};

// Inicializa os dados da classificação com base nos times
times.forEach((time) => {
  classificacao[time] = {
    pontos: 0,
    vitorias: 0,
    empates: 0,
    derrotas: 0,
    golsPro: 0,
    golsContra: 0,
    saldo: 0,
  };
});

// Função para renderizar os jogos da rodada atual
function renderizarJogos() {
  const jogosContainer = document.getElementById("jogos-container");
  const tituloRodada = document.getElementById("titulo-rodada");

  // Atualiza o título da rodada
  tituloRodada.textContent = rodadas[rodadaAtual].rodada;

  // Limpa os jogos existentes
  jogosContainer.innerHTML = "";

  // Renderiza os jogos
  rodadas[rodadaAtual].jogos.forEach((jogo, index) => {
    const jogoDiv = document.createElement("div");
    jogoDiv.classList.add("jogo");

    jogoDiv.innerHTML = `
        <span>${jogo.time1}</span>
        <input type="number" id="gols1-${index}" placeholder="0" min="0">
        <span>x</span>
        <input type="number" id="gols2-${index}" placeholder="0" min="0">
        <span>${jogo.time2}</span>
        <button onclick="salvarResultado(${index})">Salvar</button>
      `;

    jogosContainer.appendChild(jogoDiv);
  });
}

// Função para salvar os resultados e atualizar a tabela
function salvarResultado(index) {
  const jogo = rodadas[rodadaAtual].jogos[index];
  const gols1 = parseInt(document.getElementById(`gols1-${index}`).value) || 0;
  const gols2 = parseInt(document.getElementById(`gols2-${index}`).value) || 0;

  // Atualiza os resultados do jogo
  jogo.gols1 = gols1;
  jogo.gols2 = gols2;

  // Atualiza a classificação
  atualizarClassificacao(jogo.time1, jogo.time2, gols1, gols2);
  atualizarTabela();
}

// Função para atualizar a classificação
function atualizarClassificacao(time1, time2, gols1, gols2) {
  classificacao[time1].golsPro += gols1;
  classificacao[time1].golsContra += gols2;
  classificacao[time2].golsPro += gols2;
  classificacao[time2].golsContra += gols1;

  classificacao[time1].saldo =
    classificacao[time1].golsPro - classificacao[time1].golsContra;
  classificacao[time2].saldo =
    classificacao[time2].golsPro - classificacao[time2].golsContra;

  if (gols1 > gols2) {
    classificacao[time1].pontos += 3;
    classificacao[time1].vitorias++;
    classificacao[time2].derrotas++;
  } else if (gols1 < gols2) {
    classificacao[time2].pontos += 3;
    classificacao[time2].vitorias++;
    classificacao[time1].derrotas++;
  } else {
    classificacao[time1].pontos++;
    classificacao[time2].pontos++;
    classificacao[time1].empates++;
    classificacao[time2].empates++;
  }
}

// Função para atualizar a tabela de classificação
function atualizarTabela() {
  const tabelaBody = document.querySelector("#tabela-classificacao tbody");
  tabelaBody.innerHTML = "";

  // Ordena os times pela pontuação
  const timesOrdenados = Object.keys(classificacao).sort(
    (a, b) => classificacao[b].pontos - classificacao[a].pontos
  );

  timesOrdenados.forEach((time) => {
    const stats = classificacao[time];
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${time}</td>
        <td>${stats.pontos}</td>
        <td>${stats.vitorias}</td>
        <td>${stats.empates}</td>
        <td>${stats.derrotas}</td>
        <td>${stats.golsPro}</td>
        <td>${stats.golsContra}</td>
        <td>${stats.saldo}</td>
      `;
    tabelaBody.appendChild(row);
  });
}

// Navegar entre rodadas
document.getElementById("btn-anterior").addEventListener("click", () => {
  if (rodadaAtual > 0) {
    rodadaAtual--;
    renderizarJogos();
  }
});

document.getElementById("btn-proxima").addEventListener("click", () => {
  if (rodadaAtual < rodadas.length - 1) {
    rodadaAtual++;
    renderizarJogos();
  }
});

// Inicializa a página com a primeira rodada
renderizarJogos();
atualizarTabela();
