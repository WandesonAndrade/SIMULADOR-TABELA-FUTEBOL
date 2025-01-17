document.addEventListener("DOMContentLoaded", () => {
  // Dados das rodadas
  let gol = null;
  const rounds = [
    // Rodada 1
    [
      {
        teamA: "Tuntum",
        golsA: gol,
        teamB: "Imperatriz",
        golsB: null,
        time: "15:30",
      },
      { teamA: "Pinheiro-MA", teamB: "Maranhão", time: "19:30" },
      { teamA: "IAPE", teamB: "Sampaio", time: "19:30" },
      { teamA: "Moto Club", teamB: "Viana", time: "20:30" },
    ],
    // Rodada 2
    [
      { teamA: "Maranhão", teamB: "Tuntum", time: "15:30" },
      { teamA: "Imperatriz", teamB: "Moto Club", time: "19:30" },
      { teamA: "Pinheiro-MA", teamB: "IAPE", time: "19:30" },
      { teamA: "Viana", teamB: "Sampaio", time: "20:30" },
    ],
    // Rodada 3
    [
      { teamA: "Sampaio", teamB: "Tuntum", time: "15:30" },
      { teamA: "Maranhão", teamB: "Moto Club", time: "19:30" },
      { teamA: "IAPE", teamB: "Imperatriz", time: "19:30" },
      { teamA: "Viana", teamB: "Pinheiro-MA", time: "20:30" },
    ],
    // Rodada 4
    [
      { teamA: "Tuntum", teamB: "Moto Club", time: "15:30" },
      { teamA: "Sampaio", teamB: "Maranhão", time: "19:30" },
      { teamA: "Pinheiro-MA", teamB: "Imperatriz", time: "19:30" },
      { teamA: "IAPE", teamB: "Viana", time: "20:30" },
    ],
    // Rodada 5
    [
      { teamA: "Imperatriz", teamB: "Sampaio", time: "15:30" },
      { teamA: "Moto Club", teamB: "IAPE", time: "19:30" },
      { teamA: "Tuntum", teamB: "Viana", time: "19:30" },
      { teamA: "Maranhão", teamB: "Pinheiro-MA", time: "20:30" },
    ],
    // Rodada 6
    [
      { teamA: "Tuntum", teamB: "Pinheiro-MA", time: "15:30" },
      { teamA: "IAPE", teamB: "Maranhão", time: "19:30" },
      { teamA: "Imperatriz", teamB: "Viana", time: "19:30" },
      { teamA: "Moto Club", teamB: "Sampaio", time: "20:30" },
    ],
    // Rodada 7
    [
      { teamA: "Tuntum", teamB: "IAPE", time: "15:30" },
      { teamA: "Pinheiro-MA", teamB: "Moto Club", time: "19:30" },
      { teamA: "Maranhão", teamB: "Imperatriz", time: "19:30" },
      { teamA: "Viana", teamB: "Sampaio", time: "20:30" },
    ],
  ];

  let currentRound = 0;

  const cardsContainer = document.getElementById("cards-container");
  const tableBody = document.querySelector("tbody");
  const rodadaTitle = document.getElementById("rodada-title");

  const teamsData = {
    Tuntum: { points: 0, games: 0, wins: 0, draws: 0, losses: 0, gf: 0, ga: 0 },
    Imperatriz: {
      points: 0,
      games: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      gf: 0,
      ga: 0,
    },
    "Pinheiro-MA": {
      points: 0,
      games: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      gf: 0,
      ga: 0,
    },
    Maranhão: {
      points: 0,
      games: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      gf: 0,
      ga: 0,
    },
    IAPE: { points: 0, games: 0, wins: 0, draws: 0, losses: 0, gf: 0, ga: 0 },
    Sampaio: {
      points: 0,
      games: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      gf: 0,
      ga: 0,
    },
    "Moto Club": {
      points: 0,
      games: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      gf: 0,
      ga: 0,
    },
    Viana: { points: 0, games: 0, wins: 0, draws: 0, losses: 0, gf: 0, ga: 0 },
  };

  function updateTable() {
    tableBody.innerHTML = "";
    const sortedTeams = Object.entries(teamsData).sort((a, b) => {
      const [nameA, dataA] = a;
      const [nameB, dataB] = b;
      if (dataB.points !== dataA.points) return dataB.points - dataA.points;
      const gdA = dataA.gf - dataA.ga;
      const gdB = dataB.gf - dataB.ga;
      if (gdB !== gdA) return gdB - gdA;
      return dataB.gf - dataA.gf;
    });

    sortedTeams.forEach(([team, data], index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${index + 1}. ${team}</td>
        <td>${data.points}</td>
        <td>${data.games}</td>
        <td>${data.wins}</td>
        <td>${data.draws}</td>
        <td>${data.losses}</td>
        <td>${data.gf}</td>
        <td>${data.ga}</td>
        <td>${data.gf - data.ga}</td>
        <td>${((data.points / (data.games * 3)) * 100 || 0).toFixed(2)}%</td>
        <td>-</td>
      `;
      tableBody.appendChild(row);
    });
  }

  function renderRound() {
    cardsContainer.innerHTML = "";
    rodadaTitle.textContent = `${currentRound + 1}ª RODADA`;
    rounds[currentRound].forEach((game) => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <h3>Estádio</h3>
        <p>Hoje • ${game.time}</p>
        <div class="teams">
          <span>${game.teamA}</span>
          <input type="number" class="score-input" placeholder="0" value="${game.golsA}" />
          <span>×</span>
          <input type="number" class="score-input" placeholder="0" value="${game.golsB}" />
          <span>${game.teamB}</span>
        </div>
      `;
      cardsContainer.appendChild(card);
    });
  }

  function calculateResults() {
    Object.keys(teamsData).forEach((team) => {
      if (!teamsData[team]) {
        teamsData[team] = {
          points: 0,
          games: 0,
          wins: 0,
          draws: 0,
          losses: 0,
          gf: 0,
          ga: 0,
        };
      }
    });
    //console.log(teamsData);
    //console.log(currentRound + 1);
    const cards = cardsContainer.querySelectorAll(".card");

    cards.forEach((card) => {
      const teams = card.querySelectorAll(".teams span");
      const scores = card.querySelectorAll(".score-input");

      const teamA = teams[0].textContent.trim();
      const teamB = teams[2].textContent.trim();

      const scoreA = parseInt(scores[0].value);
      const scoreB = parseInt(scores[1].value);

      //console.log(`${teamA} ${scoreA} x ${scoreB} ${teamB}`);

      const x = currentRound;
      if (!isNaN(scoreA) || !isNaN(scoreB)) {
        if (x >= teamsData[teamA].games || x >= teamsData[teamB].games) {
          teamsData[teamA].games++;
          teamsData[teamB].games++;

          rounds[currentRound].forEach((game, index) => {
            if (game.teamA === teamA && game.teamB === teamB) {
              //console.log(index);
              teamsData[teamA].gf = scoreA || 0;
              teamsData[teamB].gf = scoreB || 0;
              //console.log(rounds[currentRound]);
              console.log(index);
              rounds[currentRound][index].golsA = scoreA || 0;
              rounds[currentRound][index].golsB = scoreB || 0;
              teamsData[teamA].ga = scoreB || 0;
              teamsData[teamB].ga = scoreA || 0;
              //console.log(rounds[currentRound][0]);
            }
          });
        }
      }

      if (scoreA > scoreB) {
        teamsData[teamA].points += 3;
        if (teamsData[teamA].games > teamsData[teamA].wins) {
          teamsData[teamA].wins++;
          teamsData[teamB].losses++;
        }
      } else if (scoreA < scoreB) {
        teamsData[teamB].points += 3;
        if (teamsData[teamB].games > teamsData[teamB].wins) {
          teamsData[teamB].wins++;
          teamsData[teamA].losses++;
        }
      } else if (!isNaN(scoreA) && !isNaN(scoreB)) {
        teamsData[teamA].points++;
        teamsData[teamB].points++;
        teamsData[teamA].draws++;
        teamsData[teamB].draws++;
      }
    });

    updateTable();
  }
  //botao prev rodada
  document.querySelector(".prev-btn").addEventListener("click", () => {
    if (currentRound > 0) {
      currentRound--;
      renderRound();
    }
  });
  //botao next rodada
  document.querySelector(".next-btn").addEventListener("click", () => {
    if (currentRound < rounds.length - 1) {
      currentRound++;
      renderRound();
    }
  });

  cardsContainer.addEventListener("input", (event) => {
    if (event.target.classList.contains("score-input")) {
      calculateResults();
    }
  });

  const scores = document.querySelectorAll(".score-input");

  renderRound();
  updateTable();
});
