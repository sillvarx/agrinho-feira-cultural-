let gameState = "intro";
let miniGames = [];
let currentGame = 0;
let timer = 0;
let score = 0;
let tempoMaximo = 10;

function setup() {
  createCanvas(800, 400);
  textAlign(CENTER, CENTER);
  textSize(24);
  timer = millis();

  // Lista de minijogos
  miniGames = [
    { nome: "ordenha", texto: "🐄 Ordenhe a vaca!", tecla: "O" },
    { nome: "onibus", texto: "🚌 Pegue o ônibus!", tecla: "P" },
    { nome: "quadrilha", texto: "💃 Dance a quadrilha!", tecla: "Q" },
    { nome: "milho", texto: "🌽 Colha o milho!", tecla: "M" },
    { nome: "bolo", texto: "🍰 Sirva o bolo!", tecla: "B" },
    { nome: "balao", texto: "🎈 Estoure o balão!", tecla: "E" }
  ];
}

function draw() {
  background(255, 240, 200);

  if (gameState === "intro") {
    fill(0);
    text("🎪 Feira Cultural: Campo e Cidade 🎪", width / 2, height / 2 - 20);
    textSize(18);
    text("Pressione ENTER para começar!", width / 2, height / 2 + 20);
  }

  else if (gameState === "jogando") {
    let tempoRestante = tempoMaximo - int((millis() - timer) / 1000);
    if (tempoRestante <= 0) {
      proximoMiniJogo();
    } else {
      mostrarMiniJogo(miniGames[currentGame], tempoRestante);
    }
  }

  else if (gameState === "fim") {
    fill(0);
    text("Fim da Feira! 🎉", width / 2, height / 2 - 20);
    text("Sua pontuação: " + score, width / 2, height / 2 + 20);
    text("Aperte ENTER para jogar novamente!", width / 2, height / 2 + 60);
  }
}

function keyPressed() {
  if (gameState === "intro" && keyCode === ENTER) {
    iniciarJogo();
  }

  if (gameState === "fim" && keyCode === ENTER) {
    iniciarJogo();
  }

  if (gameState === "jogando") {
    let esperado = miniGames[currentGame].tecla.toUpperCase();
    if (key.toUpperCase() === esperado) {
      score++;
      proximoMiniJogo();
    }
  }
}

function mostrarMiniJogo(jogo, tempo) {
  fill(0);
  textSize(20);
  text("Tempo: " + tempo + "s", width - 100, 30);
  text("Fase: " + (currentGame + 1), 100, 30);

  textSize(24);
  text(jogo.texto + " Pressione '" + jogo.tecla + "'", width / 2, height / 2);
}

function proximoMiniJogo() {
  currentGame++;
  if (currentGame >= miniGames.length) {
    gameState = "fim";
  } else {
    tempoMaximo = max(3, tempoMaximo - 1); // dificuldade crescente
    timer = millis();
  }
}

function iniciarJogo() {
  currentGame = 0;
  score = 0;
  tempoMaximo = 10;
  timer = millis();
  gameState = "jogando";
}
