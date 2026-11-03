const $ = (seletor) => document.querySelector(seletor);
const movimentoReduzido = matchMedia("(prefers-reduced-motion: reduce)").matches;

const CONTORNO = "#170c3a";

const CHAVE_TEMA = "horario-do-fundo";
const ORDEM_TEMAS = ["manha", "por-do-sol", "noite"];
const NOMES_TEMAS = { manha: "manhã", "por-do-sol": "pôr do sol", noite: "noite" };
let temaAtual = lerTema();
document.documentElement.dataset.tema = temaAtual;

function lerTema() {
  try {
    const guardado = localStorage.getItem(CHAVE_TEMA);
    return ORDEM_TEMAS.includes(guardado) ? guardado : "por-do-sol";
  } catch {
    return "por-do-sol";
  }
}

function pixels(c, cor, x, y, l = 1, a = 1) {
  c.fillStyle = cor;
  c.fillRect(x, y, l, a);
}

function circulo(c, cor, cx, cy, raio) {
  for (let y = -raio; y <= raio; y++) {
    for (let x = -raio; x <= raio; x++) {
      if (x * x + y * y <= raio * raio + 1) pixels(c, cor, cx + x, cy + y);
    }
  }
}

function coracao(c, cor, x, y) {
  pixels(c, cor, x, y, 2);
  pixels(c, cor, x + 3, y, 2);
  pixels(c, cor, x, y + 1, 5, 2);
  pixels(c, cor, x + 1, y + 3, 3);
  pixels(c, cor, x + 2, y + 4);
}

/* Sprites */

function desenharVitrola(c, quadro = 0, tocando = false) {
  c.clearRect(0, 0, 32, 32);

  pixels(c, CONTORNO, 5, 27, 4, 3);
  pixels(c, CONTORNO, 23, 27, 4, 3);
  pixels(c, CONTORNO, 2, 7, 28, 21);
  pixels(c, "#e0527f", 3, 8, 26, 19);
  pixels(c, "#f28da0", 3, 8, 26, 2);
  pixels(c, "#a83a8c", 3, 24, 26, 3);

  circulo(c, CONTORNO, 13, 16, 7);
  circulo(c, "#3a1a6e", 13, 16, 5);
  circulo(c, CONTORNO, 13, 16, 4);
  circulo(c, "#f7845f", 13, 16, 2);
  pixels(c, "#fff3d6", 13, 16);

  const brilhos = [[0, -6], [4, -4], [6, 0], [4, 4], [0, 6], [-4, 4], [-6, 0], [-4, -4]];
  const [bx, by] = brilhos[quadro % brilhos.length];
  pixels(c, "#f28da0", 13 + bx, 16 + by);
  pixels(c, "#f28da0", 13 - bx, 16 - by);

  pixels(c, "#fff3d6", 25, 10, 3, 3);
  pixels(c, "#fff3d6", 26, 13, 1, 5);
  pixels(c, "#fff3d6", 25, 18);
  pixels(c, "#fff3d6", 24, 19);
  pixels(c, "#fff3d6", 23, 20);
  pixels(c, "#fff3d6", 21, 21, 2, 2);

  pixels(c, "#fdb35c", 25, 23, 2, 2);

  if (tocando) {
    const x = 6 + (quadro % 4 < 2 ? 0 : 2);
    pixels(c, "#fff3d6", x + 2, 0, 1, 5);
    pixels(c, "#fff3d6", x + 2, 0, 3, 1);
    pixels(c, "#fff3d6", x, 4, 3, 2);
  }
}

function desenharFotos(c) {
  c.clearRect(0, 0, 32, 32);

  pixels(c, CONTORNO, 10, 3, 20, 22);
  pixels(c, "#fdb35c", 11, 4, 18, 20);

  pixels(c, CONTORNO, 3, 8, 22, 22);
  pixels(c, "#fff3d6", 4, 9, 20, 20);

  pixels(c, "#3a1a6e", 6, 11, 16, 3);
  pixels(c, "#a83a8c", 6, 14, 16, 3);
  pixels(c, "#f7845f", 6, 17, 16, 3);
  circulo(c, "#fdb35c", 14, 19, 3);
  pixels(c, "#2b1459", 6, 20, 16, 3);
  pixels(c, "#f28da0", 11, 21, 6, 1);

  coracao(c, "#e0527f", 12, 24);
}

const FORMA_CORACAO = [
  "..XX...XX..",
  ".XXXX.XXXX.",
  "XXXXXXXXXXX",
  "XXXXXXXXXXX",
  "XXXXXXXXXXX",
  ".XXXXXXXXX.",
  "..XXXXXXX..",
  "...XXXXX...",
  "....XXX....",
  ".....X.....",
];

function desenharIconeCarta(c) {
  c.clearRect(0, 0, 32, 32);

  pixels(c, CONTORNO, 1, 7, 30, 20);
  pixels(c, "#fff1d6", 2, 8, 28, 18);
  pixels(c, "#f5dcb4", 2, 23, 28, 3);
  for (let i = 0; i < 9; i++) {
    pixels(c, "#e8c89a", 2 + i, 25 - i, 2, 1);
    pixels(c, "#e8c89a", 28 - i, 25 - i, 2, 1);
  }
  for (let i = 0; i < 11; i++) {
    const meia = 14 - Math.round(i * 1.25);
    pixels(c, "#ffc9d6", 16 - meia, 8 + i, meia * 2, 1);
    pixels(c, CONTORNO, 15 - meia, 8 + i, 1, 1);
    pixels(c, CONTORNO, 16 + meia, 8 + i, 1, 1);
  }
  pixels(c, "#ffe3ea", 3, 8, 26, 1);
  const lacre = [".XX.XX.", "XXXXXXX", "XXXXXXX", ".XXXXX.", "..XXX..", "...X..."];
  lacre.forEach((linha, y) => {
    [...linha].forEach((marca, x) => {
      if (marca === "X") pixels(c, CONTORNO, 12 + x, 14 + y, 3, 3);
    });
  });
  lacre.forEach((linha, y) => {
    [...linha].forEach((marca, x) => {
      if (marca === "X") pixels(c, "#e0527f", 13 + x, 15 + y);
    });
  });
  pixels(c, "#f7b5c0", 14, 15, 2, 1);
}

function desenharIconeAmizade(c) {
  c.clearRect(0, 0, 32, 32);

  // Despertador: dois sininhos, corpo redondo e pezinhos.
  for (const x of [7, 25]) {
    circulo(c, CONTORNO, x, 7, 5);
    circulo(c, "#ffd873", x, 7, 4);
  }
  pixels(c, "#fff3b0", 5, 4, 2, 2);
  pixels(c, "#fff3b0", 23, 4, 2, 2);
  pixels(c, CONTORNO, 7, 27, 4, 5);
  pixels(c, CONTORNO, 21, 27, 4, 5);

  circulo(c, CONTORNO, 16, 17, 13);
  circulo(c, "#e0527f", 16, 17, 12);
  circulo(c, CONTORNO, 16, 17, 9);
  circulo(c, "#fff3d6", 16, 17, 8);
  pixels(c, "#f28da0", 8, 8, 3, 2);

  for (const [x, y] of [[16, 10], [16, 24], [9, 17], [23, 17]]) pixels(c, "#e0527f", x, y, 1, 1);
  pixels(c, CONTORNO, 16, 12, 1, 5);
  pixels(c, CONTORNO, 16, 17, 5, 1);
  pixels(c, "#e0527f", 15, 16, 3, 3);
}

function desenharHorario(c) {
  c.clearRect(0, 0, 32, 32);

  if (temaAtual === "manha") {
    for (const [x, y, l, a] of [[14, 0, 4, 5], [14, 27, 4, 5], [0, 14, 5, 4], [27, 14, 5, 4], [4, 4, 4, 4], [24, 4, 4, 4], [4, 24, 4, 4], [24, 24, 4, 4]]) {
      pixels(c, CONTORNO, x, y, l, a);
      pixels(c, "#ff9f43", x + 1, y + 1, l - 2, a - 2);
    }
    circulo(c, CONTORNO, 16, 16, 10);
    circulo(c, "#ffd35c", 16, 16, 9);
    circulo(c, "#fff3b0", 13, 13, 3);
  } else if (temaAtual === "por-do-sol") {
    for (const [x, y] of [[14, 1], [3, 7], [25, 7]]) {
      pixels(c, CONTORNO, x, y, 4, 5);
      pixels(c, "#ff9f43", x + 1, y + 1, 2, 3);
    }
    circulo(c, CONTORNO, 16, 22, 11);
    circulo(c, "#fdb35c", 16, 22, 10);
    circulo(c, "#ffe08a", 13, 17, 3);
    pixels(c, CONTORNO, 1, 22, 30, 9);
    pixels(c, "#3a1a6e", 2, 23, 28, 7);
    pixels(c, "#f7845f", 9, 24, 14, 1);
    pixels(c, "#f7845f", 11, 26, 10, 1);
    pixels(c, "#a83a8c", 13, 28, 6, 1);
  } else {
    for (let y = 0; y < 32; y++) {
      for (let x = 0; x < 32; x++) {
        const lua = Math.hypot(x - 14, y - 16);
        const sombra = Math.hypot(x - 20, y - 12);
        if (lua > 12 || sombra <= 9) continue;
        pixels(c, lua > 11 || sombra <= 10 ? CONTORNO : "#fff3b0", x, y);
      }
    }
    pixels(c, "#e8d48a", 7, 16, 2, 2);
    pixels(c, "#e8d48a", 12, 22, 3, 2);
    for (const [x, y] of [[21, 7], [26, 15]]) {
      pixels(c, CONTORNO, x - 2, y - 1, 5, 3);
      pixels(c, CONTORNO, x - 1, y - 2, 3, 5);
      pixels(c, "#fff3b0", x - 1, y, 3, 1);
      pixels(c, "#fff3b0", x, y - 1, 1, 3);
    }
  }
}

function desenharIconeBolo(c) {
  c.clearRect(0, 0, 32, 32);

  for (const x of [10, 15, 20]) {
    pixels(c, "#ff7a3c", x, 1, 2, 4);
    pixels(c, "#ffd35c", x, 3, 2, 2);
    pixels(c, CONTORNO, x - 1, 5, 4, 7);
    pixels(c, "#fff3d6", x, 6, 2, 5);
  }

  pixels(c, CONTORNO, 8, 11, 16, 8);
  pixels(c, "#f7845f", 9, 12, 14, 6);
  pixels(c, "#fff3d6", 9, 12, 14, 2);
  pixels(c, "#fff3d6", 11, 14, 2, 2);
  pixels(c, "#fff3d6", 18, 14, 2, 2);

  pixels(c, CONTORNO, 4, 18, 24, 10);
  pixels(c, "#e0527f", 5, 19, 22, 8);
  pixels(c, "#fff3d6", 5, 19, 22, 2);
  for (const [x, a] of [[7, 2], [12, 3], [18, 2], [23, 3]]) pixels(c, "#fff3d6", x, 21, 2, a);

  pixels(c, CONTORNO, 2, 27, 28, 4);
  pixels(c, "#ffd873", 3, 28, 26, 2);
}

const SPRITES = {
  bolo: desenharIconeBolo,
  vitrola: desenharVitrola,
  fotos: desenharFotos,
  amizade: desenharIconeAmizade,
  carta: desenharIconeCarta,
  horario: desenharHorario,
};
const contextos = {};

document.querySelectorAll("canvas[data-sprite]").forEach((canvas) => {
  const nome = canvas.dataset.sprite;
  const c = canvas.getContext("2d");
  SPRITES[nome](c);
  (contextos[nome] ||= []).push(c);
});

const SVG = {
  play: "M2 1h2v1h1v1h1v2h-1v1h-1v1h-2z",
  pause: "M1 1h2v6h-2zM5 1h2v6h-2z",
  anterior: "M1 1h1v6h-1zM6 1h1v6h-1v-1h-1v-1h-1v-2h1v-1h1z",
  proxima: "M6 1h1v6h-1zM1 1h1v1h1v1h1v2h-1v1h-1v1h-1z",
};

function colocarIcone(botao, nome) {
  botao.innerHTML = `<svg viewBox="0 0 8 8" aria-hidden="true"><path d="${SVG[nome]}"/></svg>`;
}

/* Título em letras grossas de pixel art, com lateral 3D */

const LETRAS_DO_TITULO = {
  F: ["1111", "1000", "1000", "1110", "1000", "1000", "1000"],
  E: ["1111", "1000", "1000", "1110", "1000", "1000", "1111"],
  L: ["1000", "1000", "1000", "1000", "1000", "1000", "1111"],
  I: ["1", "1", "1", "1", "1", "1", "1"],
  Z: ["1111", "0001", "0010", "0100", "0100", "1000", "1111"],
  A: ["0110", "1001", "1001", "1111", "1001", "1001", "1001"],
  Á: ["0110", "1001", "1001", "1111", "1001", "1001", "1001"],
  N: ["10001", "11001", "10101", "10101", "10011", "10001", "10001"],
  V: ["1001", "1001", "1001", "1001", "1001", "0110", "0110"],
  R: ["1110", "1001", "1001", "1110", "1010", "1001", "1001"],
  S: ["0111", "1000", "1000", "0110", "0001", "0001", "1110"],
  O: ["0110", "1001", "1001", "1001", "1001", "1001", "0110"],
  "!": ["1", "1", "1", "1", "1", "0", "1"],
};
const LINHAS_DO_TITULO = ["FELIZ", "ANIVERSÁRIO!"];
const CELULA_DA_LETRA = 3;
const ALTURA_DA_LETRA = 7 * CELULA_DA_LETRA;
const VAO_ENTRE_LETRAS = 3;
const VAO_ENTRE_LINHAS = 11;
const FUNDO_DA_LETRA = 2;
const MARGEM_DO_TITULO = 2;
const ESPACO_DOS_ENFEITES = 13;
const CORES_DO_TITULO = {
  manha: {
    realce: "#ffffff", frente: "#fff9e0", faixa: "#ffe98a", baixo: "#ffd873",
    lateral: "#ff5f87", fundo: "#d63f6b", contorno: "#12386b",
    estrela: "#ffd35c", miolo: "#fff9c9", losango: "#ff7f8f", quadrado: "#ffffff", faisca: "#fff9c9",
  },
  "por-do-sol": {
    realce: "#ffffff", frente: "#ffe9c9", faixa: "#fff6e0", baixo: "#ffc9a3",
    lateral: "#e0527f", fundo: "#a83a8c", contorno: "#170c3a",
    estrela: "#ffd873", miolo: "#fff6e0", losango: "#f7845f", quadrado: "#ffb8c4", faisca: "#fff0c4",
  },
  noite: {
    realce: "#ffffff", frente: "#e6e3ff", faixa: "#ffe9a8", baixo: "#c8c4ff",
    lateral: "#7a5ce0", fundo: "#4b35a0", contorno: "#060720",
    estrela: "#fffbe0", miolo: "#ffe9a8", losango: "#a890f0", quadrado: "#7a5ce0", faisca: "#fffbe0",
  },
};

function larguraDaLinhaDoTitulo(texto) {
  return [...texto].reduce((soma, letra) => soma + LETRAS_DO_TITULO[letra][0].length * CELULA_DA_LETRA, 0) + VAO_ENTRE_LETRAS * (texto.length - 1);
}

const LARGURA_DO_TITULO = larguraDaLinhaDoTitulo(LINHAS_DO_TITULO[1]) + 2 * MARGEM_DO_TITULO + FUNDO_DA_LETRA + 1;
const ALTURA_DO_TITULO = MARGEM_DO_TITULO + 2 * ALTURA_DA_LETRA + VAO_ENTRE_LINHAS + FUNDO_DA_LETRA + 1 + ESPACO_DOS_ENFEITES;

function corDaFrenteDaLetra(cores, linha) {
  if (linha <= 0) return cores.realce;
  if (linha >= 13 && linha <= 14) return cores.faixa;
  if (linha >= 18) return cores.baixo;
  return cores.frente;
}

// Cada letra tem frente, lateral e contorno próprios, para nenhuma se misturar com a vizinha.
function desenharLetraDoTitulo(c, letra, x, topo) {
  const cores = CORES_DO_TITULO[temaAtual];
  const frente = new Map();
  const chave = (px, py) => `${px},${py}`;
  const marcar = (px, py, altura) => frente.set(chave(px, py), altura);

  LETRAS_DO_TITULO[letra].forEach((linha, ly) => {
    [...linha].forEach((marca, lx) => {
      if (marca !== "1") return;
      for (let py = 0; py < CELULA_DA_LETRA; py++) {
        for (let px = 0; px < CELULA_DA_LETRA; px++) {
          marcar(x + lx * CELULA_DA_LETRA + px, topo + ly * CELULA_DA_LETRA + py, ly * CELULA_DA_LETRA + py);
        }
      }
    });
  });

  const lateral = new Map();
  for (const ponto of frente.keys()) {
    const [px, py] = ponto.split(",").map(Number);
    for (let d = 1; d <= FUNDO_DA_LETRA; d++) {
      const k = chave(px + d, py + d);
      if (!frente.has(k)) lateral.set(k, Math.max(lateral.get(k) || 0, d));
    }
  }

  for (const k of [...frente.keys(), ...lateral.keys()]) {
    const [px, py] = k.split(",").map(Number);
    for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
      pixels(c, cores.contorno, px + dx, py + dy);
    }
  }
  for (const [k, d] of lateral) {
    const [px, py] = k.split(",").map(Number);
    pixels(c, d === FUNDO_DA_LETRA ? cores.fundo : cores.lateral, px, py);
  }
  for (const [k, altura] of frente) {
    const [px, py] = k.split(",").map(Number);
    pixels(c, corDaFrenteDaLetra(cores, altura), px, py);
  }

  // O acento é um risquinho sem lateral, para continuar legível.
  if (letra === "Á") {
    pixels(c, cores.contorno, x + 3, topo - 6, 6, 4);
    pixels(c, cores.contorno, x + 5, topo - 8, 6, 4);
    pixels(c, cores.realce, x + 4, topo - 5, 4, 2);
    pixels(c, cores.realce, x + 6, topo - 7, 4, 2);
  }
}

function desenharLetrasDoTitulo(c) {
  LINHAS_DO_TITULO.forEach((texto, n) => {
    const topo = MARGEM_DO_TITULO + n * (ALTURA_DA_LETRA + VAO_ENTRE_LINHAS);
    let x = Math.floor((LARGURA_DO_TITULO - FUNDO_DA_LETRA - larguraDaLinhaDoTitulo(texto)) / 2);
    const posicoes = [...texto].map((letra) => {
      const posicao = [letra, x];
      x += LETRAS_DO_TITULO[letra][0].length * CELULA_DA_LETRA + VAO_ENTRE_LETRAS;
      return posicao;
    });
    // Da direita para a esquerda, para a lateral de cada letra ficar por cima da seguinte.
    posicoes.reverse().forEach(([letra, px]) => desenharLetraDoTitulo(c, letra, px, topo));
  });
}

function desenharEstrelinha(c, cores, cx, cy) {
  for (const [x, y, l, a] of [[-1, -4, 3, 2], [-5, -2, 11, 2], [-3, 0, 7, 2], [-4, 2, 3, 2], [2, 2, 3, 2]]) {
    pixels(c, cores.estrela, cx + x, cy + y, l, a);
  }
  pixels(c, cores.miolo, cx - 1, cy - 2, 3, 3);
}

function desenharLosango(c, cores, cx, cy) {
  pixels(c, cores.losango, cx - 1, cy - 3, 3, 7);
  pixels(c, cores.losango, cx - 3, cy - 1, 7, 3);
  pixels(c, cores.losango, cx - 2, cy - 2, 5, 5);
}

function desenharFaisca(c, cores, cx, cy, grande) {
  const raio = grande ? 4 : 2;
  pixels(c, cores.estrela, cx, cy - raio, 1, raio * 2 + 1);
  pixels(c, cores.estrela, cx - raio, cy, raio * 2 + 1, 1);
  pixels(c, cores.faisca, cx - 1, cy - 1, 3, 3);
}

// Os enfeites ocupam as laterais de "FELIZ" e a faixa embaixo de "ANIVERSÁRIO!", como no modelo.
function desenharTitulo(c, quadro) {
  const l = LARGURA_DO_TITULO;
  const a = ALTURA_DO_TITULO;
  c.clearRect(0, 0, l, a);
  c.drawImage(baseDoTitulo, 0, 0);

  const cores = CORES_DO_TITULO[temaAtual];
  const direita = l - 1;
  const base = a - 6;
  desenharEstrelinha(c, cores, 10, 8);
  desenharLosango(c, cores, 24, 6);
  pixels(c, cores.quadrado, 30, 12, 4, 4);
  desenharFaisca(c, cores, 40, 8, quadro % 2 === 0);
  desenharEstrelinha(c, cores, direita - 10, 8);
  desenharLosango(c, cores, direita - 24, 6);
  pixels(c, cores.quadrado, direita - 33, 12, 4, 4);
  desenharFaisca(c, cores, direita - 40, 8, quadro % 2 === 1);

  pixels(c, cores.quadrado, 8, base - 2, 4, 4);
  desenharFaisca(c, cores, 20, base, quadro % 2 === 1);
  desenharLosango(c, cores, 32, base);
  desenharLosango(c, cores, direita - 32, base);
  desenharFaisca(c, cores, direita - 20, base, quadro % 2 === 0);
  desenharEstrelinha(c, cores, direita - 8, base);
}

const baseDoTitulo = document.createElement("canvas");
baseDoTitulo.width = LARGURA_DO_TITULO;
baseDoTitulo.height = ALTURA_DO_TITULO;
let quadroDoTitulo = 0;

const canvasDoTitulo = document.createElement("canvas");
canvasDoTitulo.className = "linha";
canvasDoTitulo.width = LARGURA_DO_TITULO;
canvasDoTitulo.height = ALTURA_DO_TITULO;
$("#titulo").append(canvasDoTitulo);

// Refaz as letras com as cores do horário atual.
function pintarTitulo() {
  const base = baseDoTitulo.getContext("2d");
  base.clearRect(0, 0, LARGURA_DO_TITULO, ALTURA_DO_TITULO);
  desenharLetrasDoTitulo(base);
  desenharTitulo(canvasDoTitulo.getContext("2d"), quadroDoTitulo);
}

pintarTitulo();

// O tamanho do pixel é múltiplo do pixel físico da tela, para as letras ficarem nítidas.
function ajustarTitulo() {
  const l = innerWidth;
  const a = innerHeight;
  const deitado = l > a && a <= 520;
  const emPe = a >= l && l <= 600;
  let largura = Math.min(l - 32, 1100);
  if (deitado) largura = l - 2 * (l <= 700 ? 100 : 124);
  if (emPe) largura = l - 12;
  // Deitado, sobra espaço embaixo do título para o mini player.
  const alturaMaxima = deitado ? a * 0.97 - 144 : a * 0.42;

  const passo = 1 / (devicePixelRatio || 1);
  const ideal = Math.min(largura / LARGURA_DO_TITULO, alturaMaxima / ALTURA_DO_TITULO);
  const pixel = Math.max(passo, Math.floor(ideal / passo) * passo);
  canvasDoTitulo.style.width = `${LARGURA_DO_TITULO * pixel}px`;
  canvasDoTitulo.style.height = `${ALTURA_DO_TITULO * pixel}px`;
  canvasDoTitulo.dataset.pixel = pixel;
}

ajustarTitulo();
addEventListener("resize", ajustarTitulo);

if (!movimentoReduzido) {
  setInterval(() => {
    if (document.hidden) return;
    quadroDoTitulo++;
    desenharTitulo(canvasDoTitulo.getContext("2d"), quadroDoTitulo);
  }, 450);
}

/* Céu */

function hexParaRgb(hex) {
  const n = parseInt(hex.slice(1), 16);
  return [n >> 16, (n >> 8) & 255, n & 255];
}

const TEMAS = {
  manha: {
    barra: "#1f6fd0",
    ceu: ["#1f6fd0", "#2f86dc", "#3f9be4", "#56ade8", "#7fc2ea", "#ffd9b0"],
    mar: ["#3fb4cf", "#2a9bc4", "#1f7fae", "#17639a"],
    astro: { x: 0.8, y: 0.22, tamanho: 0.62, cores: ["#fff9c9", "#ffeb8a", "#ffd35c"] },
    morros: ["#3fa88f", "#1f7f78"],
    coqueiro: ["#0f5a58", "#1e7d6b", "#7a4a2a"],
    nuvens: ["#ffffff", "#d3ecf8"],
    reflexo: ["#fff4b8", "#c9f0f2", "#8fd8e6"],
    sala: {
      parede: "#7fc8e8",
      halo: ["#a6dcee", "#cdeef2"],
      piso: "#e0b183",
      pisoEscuro: "#c89763",
      madeira: ["#c98f5a", "#b57a47", "#8f5c33"],
      cortica: ["#e2b27a", "#d09c63", "#b9854e"],
      fofo: ["#d8f1fb", "#ffb3c9"],
      cartao: { claro: "#ff8fa3", escuro: "#ff7f96", sombra: "#d9587a", numero: "#ffffff", brilho: "#ffb8c4", pino: "#ffd873" },
    },
    estrelas: 0,
  },
  "por-do-sol": {
    barra: "#1d1147",
    ceu: ["#1d1147", "#3a1a6e", "#6b2a8c", "#a83a8c", "#e0527f", "#f7845f"],
    mar: ["#7a2f86", "#4b1f73", "#2b1459", "#170c3a"],
    astro: { x: 0.5, tamanho: 1, listras: true, cores: ["#ffe9a0", "#fdc25c", "#f9915c"] },
    morros: ["#5a2380", "#2f1560"],
    coqueiro: ["#1d0d45", "#3a1a6e", "#f7845f"],
    nuvens: ["#c04a8c", "#8e3488"],
    reflexo: ["#fdb35c", "#f7845f", "#a83a8c"],
    sala: {
      parede: "#3a1a6e",
      halo: ["#6b2a8c", "#a83a8c"],
      piso: "#2b1459",
      pisoEscuro: "#1d1147",
      madeira: ["#a8604f", "#8a4a48", "#5f2f40"],
      cortica: ["#d49a72", "#bd8260", "#9c684f"],
      fofo: ["#ffdfe9", "#ffa9c6"],
      cartao: { claro: "#f0668f", escuro: "#e0527f", sombra: "#a83a6e", numero: "#fff6e0", brilho: "#ff8fb0", pino: "#ffd873" },
    },
    estrelas: 1500,
  },
  noite: {
    barra: "#070a2a",
    ceu: ["#070a2a", "#0e1040", "#1a1658", "#2a1c6e", "#3f2480", "#5a2f8c"],
    mar: ["#2a1c6e", "#1a1658", "#0e1040", "#060720"],
    astro: { x: 0.2, y: 0.22, tamanho: 0.6, lua: true, cores: ["#fffbe0", "#f3edc4", "#ddd6b0"] },
    morros: ["#1c1650", "#100c36"],
    coqueiro: ["#080622", "#1a1650", "#3f2480"],
    nuvens: ["#3a2a78", "#2a2060"],
    reflexo: ["#d9d6f0", "#8f88c9", "#4a3f8f"],
    sala: {
      parede: "#0e1040",
      halo: ["#1a1658", "#2f2480"],
      piso: "#070a2a",
      pisoEscuro: "#050620",
      madeira: ["#4a3d80", "#3a2f6a", "#27204e"],
      cortica: ["#655590", "#544680", "#42376a"],
      fofo: ["#1f1a5c", "#5a4cc0"],
      cartao: { claro: "#5f49c8", escuro: "#5340b5", sombra: "#342680", numero: "#ffe9a8", brilho: "#7d68e0", pino: "#ffe9a8" },
    },
    estrelas: 320,
  },
};

const BAYER = [[0, 8, 2, 10], [12, 4, 14, 6], [3, 11, 1, 9], [15, 7, 13, 5]];

function corComPontilhado(cores, t, x, y) {
  const pos = Math.min(Math.max(t, 0), 0.9999) * cores.length;
  const base = Math.floor(pos);
  const limite = (BAYER[y & 3][x & 3] + 0.5) / 16;
  // Só pontilha o finalzinho de cada faixa de cor, para o fundo ficar limpo.
  const transicao = (pos - base - 0.8) / 0.2;
  return transicao > limite && base + 1 < cores.length ? cores[base + 1] : cores[base];
}

function criarAleatorio(semente) {
  return () => {
    semente = (semente * 1664525 + 1013904223) >>> 0;
    return semente / 4294967296;
  };
}

function desenharCoqueiro(f, x, base, altura, inclinacao, [cor, corClara, corCoco]) {
  const escala = altura / 60;

  for (let i = 0; i <= altura; i++) {
    const t = i / altura;
    const largura = Math.max(2, Math.round((5 - 2.5 * t) * escala));
    const tx = Math.round(x + inclinacao * t * t) - Math.floor(largura / 2);
    pixels(f, i % 5 === 0 ? corClara : cor, tx, base - i, largura, 1);
  }

  const cx = Math.round(x + inclinacao);
  const cy = base - altura;
  // Cada folha é [direção, comprimento, quanto sobe antes de cair].
  const folhas = [
    [-1, 0.62, 1.15], [-1, 0.6, 0.65], [-1, 0.42, 0.2],
    [1, 0.62, 1.15], [1, 0.6, 0.65], [1, 0.42, 0.2],
    [-0.45, 0.34, 1.5], [0.45, 0.34, 1.5],
  ];

  for (const [direcao, comprimento, subida] of folhas) {
    const total = Math.round(altura * comprimento);
    for (let s = 0; s <= total; s++) {
      const fx = Math.round(cx + direcao * s);
      const fy = Math.round(cy - subida * s + (s * s) / total);
      const resta = 1 - s / total;
      pixels(f, cor, fx, fy, 1, Math.max(2, Math.round((1.5 + 2 * resta) * escala)));
      if (s % 2 === 0 && s > 1) pixels(f, cor, fx, fy, 1, 2 + Math.round(resta * 6 * escala));
      if (resta > 0.15) pixels(f, corClara, fx, fy, 1, 1);
    }
  }

  const coco = Math.max(1, Math.round(1.6 * escala));
  circulo(f, corCoco, cx - coco, cy + coco + 1, coco);
  circulo(f, corCoco, cx + coco, cy + coco, coco);
}

function iniciarCeu() {
  const canvas = $("#ceu");
  const c = canvas.getContext("2d");
  const fundo = document.createElement("canvas");
  let tema = TEMAS[temaAtual];
  let l, a, tam, horizonte, raio, astroX, astroY, estrelas, nuvens;
  let larguraTela = 0;
  let alturaTela = 0;
  let tempo = 0;

  function montar() {
    if (innerWidth === larguraTela && innerHeight <= alturaTela) return;
    alturaTela = innerWidth === larguraTela ? innerHeight : Math.max(innerHeight, 1);
    larguraTela = innerWidth;

    tam = larguraTela < 700 ? 3 : larguraTela < 1500 ? 4 : 5;
    l = Math.ceil(larguraTela / tam);
    a = Math.ceil(alturaTela / tam);
    canvas.width = fundo.width = l;
    canvas.height = fundo.height = a;
    canvas.style.width = `${l * tam}px`;
    canvas.style.height = `${a * tam}px`;

    horizonte = Math.floor(a * 0.66);
    montarCena();
  }

  function montarCena() {
    const { astro } = tema;
    raio = Math.floor(Math.min(l * 0.3, a * 0.24) * astro.tamanho);
    astroX = Math.floor(l * astro.x);
    astroY = astro.listras ? horizonte - Math.floor(raio * 0.7) : Math.floor(horizonte * astro.y);

    desenharFundo();

    const sorte = criarAleatorio(7);
    nuvens = Array.from({ length: 4 }, () => ({
      x: sorte() * l,
      y: Math.floor(horizonte * (0.28 + sorte() * 0.5)),
      tamanho: 14 + Math.floor(sorte() * 22),
    }));
    const totalEstrelas = tema.estrelas ? Math.floor((l * horizonte) / tema.estrelas) : 0;
    estrelas = Array.from({ length: totalEstrelas }, () => ({
      x: Math.floor(sorte() * l),
      y: Math.floor(sorte() * sorte() * horizonte * 0.6),
      fase: sorte() * 6.28,
    })).filter((e) => Math.hypot(e.x - astroX, e.y - astroY) > raio + 1);
    quadro();
  }

  function mudarTema() {
    tema = TEMAS[temaAtual];
    montarCena();
  }

  function desenharFundo() {
    const f = fundo.getContext("2d");
    const imagem = f.createImageData(l, a);
    const periodo = Math.max(5, Math.floor(raio / 4));
    const coresCeu = tema.ceu.map(hexParaRgb);
    const coresMar = tema.mar.map(hexParaRgb);
    const coresAstro = tema.astro.cores.map(hexParaRgb);

    for (let y = 0; y < a; y++) {
      for (let x = 0; x < l; x++) {
        let cor;
        if (y >= horizonte) {
          cor = corComPontilhado(coresMar, (y - horizonte) / (a - horizonte), x, y);
        } else {
          cor = corComPontilhado(coresCeu, y / horizonte, x, y);
          const dx = x - astroX;
          const dy = y - astroY;
          if (dx * dx + dy * dy <= raio * raio) {
            let vaga = false;
            if (tema.astro.listras) {
              const abaixo = dy + raio * 0.15;
              const faixa = Math.min(periodo - 1, 2 + Math.floor(abaixo / periodo));
              vaga = abaixo >= 0 && abaixo % periodo < faixa;
            }
            if (tema.astro.lua) {
              vaga = Math.hypot(dx - raio * 0.45, dy + raio * 0.2) < raio * 0.85;
            }
            if (!vaga) cor = corComPontilhado(coresAstro, (dy + raio) / (raio * 2), x, y);
          }
        }
        const i = (y * l + x) * 4;
        imagem.data[i] = cor[0];
        imagem.data[i + 1] = cor[1];
        imagem.data[i + 2] = cor[2];
        imagem.data[i + 3] = 255;
      }
    }
    f.putImageData(imagem, 0, 0);

    const alturaMorro = (x, escala, fase) => {
      const borda = Math.abs(x - l / 2) / (l / 2);
      const onda = 0.62 + 0.26 * Math.sin(x * 0.035 + fase) + 0.12 * Math.sin(x * 0.11 + fase * 2);
      return Math.floor(borda ** 1.5 * a * escala * onda);
    };

    for (let x = 0; x < l; x++) {
      const fundoMorro = alturaMorro(x, 0.2, 1);
      pixels(f, tema.morros[0], x, horizonte - fundoMorro, 1, fundoMorro);
    }
    for (let x = 0; x < l; x++) {
      const frenteMorro = alturaMorro(x, 0.12, 4);
      pixels(f, tema.morros[1], x, horizonte - frenteMorro, 1, frenteMorro);
    }

    // Na tela em pé os coqueiros ficam menores e na beira da água, para não baterem no título.
    const emPe = a > l;
    const alturaCoqueiro = Math.round(emPe ? l * 0.22 : Math.min(a * 0.34, l * 0.38));
    const baseCoqueiro = (x) => (emPe ? horizonte + 1 : horizonte - alturaMorro(x, 0.12, 4) + 1);
    const xEsquerda = Math.floor(l * 0.1);
    const xDireita = Math.floor(l * 0.9);
    desenharCoqueiro(f, xEsquerda, baseCoqueiro(xEsquerda), alturaCoqueiro, alturaCoqueiro * 0.22, tema.coqueiro);
    desenharCoqueiro(f, xDireita, baseCoqueiro(xDireita), Math.round(alturaCoqueiro * 0.76), -alturaCoqueiro * 0.16, tema.coqueiro);
  }

  function quadro() {
    c.drawImage(fundo, 0, 0);

    for (const e of estrelas) {
      const brilho = Math.sin(tempo * 0.5 + e.fase);
      if (brilho > -0.4) pixels(c, brilho > 0.5 ? "#fff3d6" : "#b58ad0", e.x, e.y);
    }

    for (const n of nuvens) {
      const x = Math.floor(((n.x + tempo * 0.25) % (l + n.tamanho * 2)) - n.tamanho);
      pixels(c, tema.nuvens[0], x + 3, n.y - 2, n.tamanho - 8, 1);
      pixels(c, tema.nuvens[0], x, n.y - 1, n.tamanho, 2);
      pixels(c, tema.nuvens[1], x + 5, n.y + 1, n.tamanho - 3, 1);
    }

    for (let y = horizonte + 2; y < a; y += 3) {
      const fundura = (y - horizonte) / (a - horizonte);
      const onda = 0.72 + 0.28 * Math.sin(y * 0.6 + tempo * 0.7);
      const largura = Math.floor(raio * (1 - fundura * 0.7) * onda * 1.4);
      const desvio = Math.round(Math.sin(y * 0.3 + tempo * 0.4) * 2);
      c.fillStyle = tema.reflexo[fundura < 0.3 ? 0 : fundura < 0.65 ? 1 : 2];
      c.fillRect(Math.floor(astroX - largura / 2) + desvio, y, largura, 1);
    }
  }

  montar();
  addEventListener("resize", montar);

  if (!movimentoReduzido) {
    setInterval(() => {
      if (document.hidden) return;
      tempo++;
      quadro();
    }, 125);
  }

  return { mudarTema };
}

const ceu = iniciarCeu();

/* Fundos das janelas */

function gerarImagem(l, a, desenho) {
  const canvas = document.createElement("canvas");
  canvas.width = l;
  canvas.height = a;
  desenho(canvas.getContext("2d"));
  return `url("${canvas.toDataURL()}")`;
}

function atualizarFundos() {
  const { madeira, cortica, fofo } = TEMAS[temaAtual].sala;
  const raiz = document.documentElement.style;

  raiz.setProperty("--madeira", madeira[0]);

  raiz.setProperty("--fundo-cortica", gerarImagem(32, 32, (c) => {
    const sorte = criarAleatorio(11);
    pixels(c, cortica[1], 0, 0, 32, 32);
    for (let i = 0; i < 70; i++) {
      pixels(c, sorte() < 0.5 ? cortica[0] : cortica[2], Math.floor(sorte() * 32), Math.floor(sorte() * 32), 1 + Math.floor(sorte() * 2), 1);
    }
  }));

  raiz.setProperty("--fofo-fundo", fofo[0]);
  raiz.setProperty("--sprite-coracao", gerarImagem(11, 10, (c) => {
    FORMA_CORACAO.forEach((linha, y) => {
      [...linha].forEach((marca, x) => {
        if (marca === "X") pixels(c, fofo[1], x, y);
      });
    });
  }));

  raiz.setProperty("--fundo-luzes", gerarImagem(72, 12, (c) => {
    for (let x = 0; x < 72; x++) {
      pixels(c, CONTORNO, x, 2 + Math.round(2 * Math.abs(Math.sin((Math.PI * x) / 24))), 1, 1);
    }
    [["#ffd873", 12], ["#f28da0", 36], ["#a8e0ff", 60]].forEach(([cor, x]) => {
      pixels(c, CONTORNO, x - 1, 3, 3, 2);
      pixels(c, CONTORNO, x - 2, 5, 5, 6);
      pixels(c, cor, x - 1, 5, 3, 5);
      pixels(c, "#ffffff", x - 1, 6, 1, 1);
    });
  }));
}

/* Capa do player */

function desenharCapa(quadro, tocando) {
  const c = $("#capa-disco").getContext("2d");
  const { ceu } = TEMAS[temaAtual];

  ceu.forEach((cor, i) => pixels(c, cor, 0, Math.floor((i * 64) / ceu.length), 64, 12));

  circulo(c, CONTORNO, 32, 32, 26);
  circulo(c, "#3a1a6e", 32, 32, 23);
  circulo(c, CONTORNO, 32, 32, 20);
  circulo(c, "#3a1a6e", 32, 32, 17);
  circulo(c, CONTORNO, 32, 32, 14);
  circulo(c, "#f7845f", 32, 32, 9);
  circulo(c, "#fdb35c", 32, 32, 5);
  circulo(c, CONTORNO, 32, 32, 2);

  const giros = [[0, -18], [13, -13], [18, 0], [13, 13], [0, 18], [-13, 13], [-18, 0], [-13, -13]];
  const [gx, gy] = giros[(tocando ? quadro : 1) % giros.length];
  pixels(c, "#f28da0", 31 + gx, 31 + gy, 3, 3);
  pixels(c, "#f28da0", 31 - gx, 31 - gy, 3, 3);
}

/* Horário do fundo */

function atualizarHorario() {
  document.documentElement.dataset.tema = temaAtual;
  $('meta[name="theme-color"]').content = TEMAS[temaAtual].barra;
  contextos.horario.forEach(desenharHorario);
  atualizarFundos();
  const rotulo = `Mudar o horário do fundo (agora: ${NOMES_TEMAS[temaAtual]})`;
  $("#horario").setAttribute("aria-label", rotulo);
  $("#horario").title = rotulo;
}

$("#horario").addEventListener("click", () => {
  temaAtual = ORDEM_TEMAS[(ORDEM_TEMAS.indexOf(temaAtual) + 1) % ORDEM_TEMAS.length];
  try {
    localStorage.setItem(CHAVE_TEMA, temaAtual);
  } catch {
    // Sem armazenamento, o horário só não fica guardado para a próxima visita.
  }
  ceu.mudarTema();
  pintarTitulo();
  atualizarHorario();
  atualizarFurosDaFolha();
  desenharEnvelopeDaCarta(0, null);
  desenharBolo();
  redesenharVitrolas();
});

atualizarHorario();

/* Janelas */

document.querySelectorAll("[data-abre]").forEach((botao) => {
  botao.addEventListener("click", () => $(`#${botao.dataset.abre}`).showModal());
});

document.querySelectorAll("dialog").forEach((janela) => {
  janela.querySelector(".fechar").addEventListener("click", () => janela.close());
  janela.addEventListener("click", (e) => {
    if (e.target === janela && janela.classList.contains("janela")) janela.close();
  });
});

/* Toca-discos: o áudio fica fora das janelas, então fechar uma janela não para a música. */

const audio = $("#audio");
const musicas = CONTEUDO.musicas;
const progresso = $("#progresso");
let faixaAtual = -1;
let arrastando = false;
let quadroVitrola = 0;
let giro = null;

function formatarTempo(segundos) {
  if (!Number.isFinite(segundos)) return "0:00";
  const s = Math.floor(segundos);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}

function atualizarBarra() {
  const total = Number(progresso.max) || 1;
  progresso.style.setProperty("--andamento", `${(Number(progresso.value) / total) * 100}%`);
}

function redesenharVitrolas() {
  const tocando = !audio.paused;
  contextos.vitrola.forEach((c) => desenharVitrola(c, quadroVitrola, tocando));
  desenharCapa(quadroVitrola, tocando);
}

function atualizarBotoes() {
  const tocando = !audio.paused;
  for (const botao of [$("#play"), $("#mini-play")]) {
    colocarIcone(botao, tocando ? "pause" : "play");
    botao.setAttribute("aria-label", tocando ? "Pausar" : "Tocar");
  }
  clearInterval(giro);
  giro = null;
  if (tocando && !movimentoReduzido) {
    giro = setInterval(() => {
      quadroVitrola++;
      redesenharVitrolas();
    }, 160);
  }
  redesenharVitrolas();
  if ("mediaSession" in navigator) navigator.mediaSession.playbackState = tocando ? "playing" : "paused";
}

function atualizarFaixa() {
  const musica = musicas[faixaAtual];
  $("#faixa-nome").textContent = musica.titulo;
  $("#faixa-artista").textContent = musica.artista || "";
  $("#mini-abrir").textContent = musica.artista ? `${musica.titulo} - ${musica.artista}` : musica.titulo;
  $("#mini").hidden = false;
  document.body.classList.add("com-mini");
  progresso.disabled = false;
  document.querySelectorAll(".faixa").forEach((botao, i) => {
    botao.setAttribute("aria-current", i === faixaAtual ? "true" : "false");
  });
  if ("mediaSession" in navigator) {
    navigator.mediaSession.metadata = new MediaMetadata({
      title: musica.titulo,
      artist: musica.artista || "",
    });
  }
}

function tocarFaixa(indice) {
  if (!musicas.length) return;
  faixaAtual = (indice + musicas.length) % musicas.length;
  $("#aviso-musica").textContent = "";
  audio.src = musicas[faixaAtual].arquivo;
  atualizarFaixa();
  audio.play().catch(() => {});
}

function alternarPlay() {
  if (faixaAtual < 0) tocarFaixa(0);
  else if (audio.paused) audio.play().catch(() => {});
  else audio.pause();
}

musicas.forEach((musica, i) => {
  const item = document.createElement("li");
  const botao = document.createElement("button");
  const nome = document.createElement("span");
  botao.className = "faixa";
  nome.className = "faixa-titulo";
  nome.textContent = musica.titulo;
  const numero = document.createElement("span");
  numero.className = "faixa-numero";
  numero.textContent = i + 1;
  botao.append(numero, nome);
  if (musica.artista) {
    const artista = document.createElement("small");
    artista.textContent = musica.artista;
    botao.append(artista);
  }
  botao.addEventListener("click", () => tocarFaixa(i));
  item.append(botao);
  $("#faixas").append(item);
});

if (!musicas.length) $("#aviso-musica").textContent = "Ainda não tem nenhuma música aqui.";

colocarIcone($("#anterior"), "anterior");
colocarIcone($("#proxima"), "proxima");
atualizarBotoes();

$("#play").addEventListener("click", alternarPlay);
$("#mini-play").addEventListener("click", alternarPlay);
$("#anterior").addEventListener("click", () => tocarFaixa(faixaAtual - 1));
$("#proxima").addEventListener("click", () => tocarFaixa(faixaAtual + 1));
$("#mini-abrir").addEventListener("click", () => $("#toca-discos").showModal());

audio.addEventListener("play", atualizarBotoes);
audio.addEventListener("pause", atualizarBotoes);
audio.addEventListener("ended", () => tocarFaixa(faixaAtual + 1));
audio.addEventListener("error", () => {
  if (faixaAtual < 0) return;
  $("#aviso-musica").textContent = `Não consegui abrir "${musicas[faixaAtual].arquivo}".`;
  atualizarBotoes();
});
audio.addEventListener("loadedmetadata", () => {
  progresso.max = Math.floor(audio.duration) || 0;
  atualizarBarra();
  $("#tempo-total").textContent = formatarTempo(audio.duration);
});
audio.addEventListener("timeupdate", () => {
  if (!arrastando) progresso.value = Math.floor(audio.currentTime);
  atualizarBarra();
  $("#tempo-atual").textContent = formatarTempo(audio.currentTime);
});

progresso.addEventListener("input", () => {
  arrastando = true;
  $("#tempo-atual").textContent = formatarTempo(Number(progresso.value));
  atualizarBarra();
});
progresso.addEventListener("change", () => {
  audio.currentTime = Number(progresso.value);
  arrastando = false;
});

if ("mediaSession" in navigator) {
  navigator.mediaSession.setActionHandler("play", () => audio.play());
  navigator.mediaSession.setActionHandler("pause", () => audio.pause());
  navigator.mediaSession.setActionHandler("previoustrack", () => tocarFaixa(faixaAtual - 1));
  navigator.mediaSession.setActionHandler("nexttrack", () => tocarFaixa(faixaAtual + 1));
}

/* Galeria */

const fotos = CONTEUDO.fotos;
let fotoAtual = 0;

function avisoDeFoto(foto, classe) {
  const aviso = document.createElement("div");
  aviso.className = `foto-faltando ${classe}`;
  aviso.textContent = `Falta a foto: ${foto.arquivo}`;
  return aviso;
}

function criarImagem(foto, classe) {
  const img = document.createElement("img");
  img.src = foto.arquivo;
  img.alt = foto.legenda || "Foto";
  img.className = classe;
  img.addEventListener("error", () => img.replaceWith(avisoDeFoto(foto, classe)));
  return img;
}

function mostrarFoto(indice) {
  fotoAtual = (indice + fotos.length) % fotos.length;
  const foto = fotos[fotoAtual];
  $("#foto-palco").replaceChildren(criarImagem(foto, ""));
  $("#foto-legenda").textContent = foto.legenda || "";
}

fotos.forEach((foto, i) => {
  const botao = document.createElement("button");
  botao.className = foto.deitada ? "polaroide polaroide-deitada" : "polaroide";
  const img = criarImagem(foto, "polaroide-img");
  img.loading = "lazy";
  botao.append(img);
  if (foto.legenda) {
    const legenda = document.createElement("p");
    legenda.textContent = foto.legenda;
    botao.append(legenda);
  }
  botao.addEventListener("click", () => {
    mostrarFoto(i);
    $("#foto-cheia").showModal();
  });
  $("#grade-fotos").append(botao);
});

if (!fotos.length) $("#grade-fotos").textContent = "Ainda não tem nenhuma foto aqui.";

// A foto deitada ocupa a fileira inteira na grade, então calcula o tamanho a partir de uma polaroide comum.
const polaroideComum = $(".polaroide:not(.polaroide-deitada)");
if (polaroideComum) {
  new ResizeObserver(() => {
    $("#grade-fotos").style.setProperty("--largura-polaroide", `${polaroideComum.offsetWidth}px`);
  }).observe(polaroideComum);
}

colocarIcone($("#foto-anterior"), "anterior");
colocarIcone($("#foto-proxima"), "proxima");
$("#foto-anterior").addEventListener("click", () => mostrarFoto(fotoAtual - 1));
$("#foto-proxima").addEventListener("click", () => mostrarFoto(fotoAtual + 1));

$("#foto-cheia").addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") mostrarFoto(fotoAtual - 1);
  if (e.key === "ArrowRight") mostrarFoto(fotoAtual + 1);
});

let inicioToque = null;
$("#foto-palco").addEventListener("touchstart", (e) => {
  inicioToque = e.changedTouches[0].clientX;
}, { passive: true });
$("#foto-palco").addEventListener("touchend", (e) => {
  if (inicioToque === null) return;
  const distancia = e.changedTouches[0].clientX - inicioToque;
  inicioToque = null;
  if (Math.abs(distancia) > 40) mostrarFoto(fotoAtual + (distancia < 0 ? 1 : -1));
});

/* Tempo de amizade */

const configAmizade = CONTEUDO.amizade || {};
const inicioAmizade = new Date(`${configAmizade.inicio}T00:00:00`);

/* Cartões de virar, desenhados pixel por pixel */

const TAMANHO_DO_PIXEL = 3;
const QUADROS_DA_VIRADA = 6;
const DIGITOS = [
  ["01110", "10001", "10001", "10001", "10001", "10001", "01110"],
  ["00100", "01100", "00100", "00100", "00100", "00100", "01110"],
  ["01110", "10001", "00001", "00110", "01000", "10000", "11111"],
  ["11111", "00010", "00100", "00010", "00001", "10001", "01110"],
  ["00010", "00110", "01010", "10010", "11111", "00010", "00010"],
  ["11111", "10000", "11110", "00001", "00001", "10001", "01110"],
  ["00110", "01000", "10000", "11110", "10001", "10001", "01110"],
  ["11111", "00001", "00010", "00100", "01000", "01000", "01000"],
  ["01110", "10001", "10001", "01110", "10001", "10001", "01110"],
  ["01110", "10001", "10001", "01111", "00001", "00010", "01100"],
];

function retanguloDegrau(c, cor, x, y, l, a) {
  pixels(c, cor, x + 2, y, l - 4, 1);
  pixels(c, cor, x + 1, y + 1, l - 2, 1);
  pixels(c, cor, x, y + 2, l, a - 4);
  pixels(c, cor, x + 1, y + a - 2, l - 2, 1);
  pixels(c, cor, x + 2, y + a - 1, l - 4, 1);
}

function desenharTexto(c, texto, cor, x, y, tamanho) {
  [...texto].forEach((digito, i) => {
    DIGITOS[digito].forEach((linha, l) => {
      [...linha].forEach((marca, k) => {
        if (marca === "1") pixels(c, cor, x + i * 6 * tamanho + k * tamanho, y + l * tamanho, tamanho, tamanho);
      });
    });
  });
}

function imagemDoCartao(l, a, texto) {
  const { cartao: cores } = TEMAS[temaAtual].sala;
  const imagem = document.createElement("canvas");
  imagem.width = l;
  imagem.height = a;
  const c = imagem.getContext("2d");
  const meio = Math.floor((a - 2) / 2);

  retanguloDegrau(c, CONTORNO, 1, 0, l - 2, a);
  retanguloDegrau(c, cores.sombra, 2, 1, l - 4, a - 2);
  retanguloDegrau(c, cores.escuro, 2, 1, l - 4, a - 4);
  pixels(c, cores.claro, 3, 1, l - 6, 1);
  pixels(c, cores.claro, 2, 2, l - 4, meio - 2);
  pixels(c, cores.brilho, 4, 2, l - 8, 1);

  // A linha fica atrás do número, para não esconder o traço do meio dele.
  pixels(c, CONTORNO, 2, meio, l - 4, 1);
  for (const [px, pino] of [[0, 1], [l - 2, l - 2]]) {
    pixels(c, CONTORNO, px, meio - 2, 2, 5);
    pixels(c, cores.pino, pino, meio - 1, 1, 3);
  }

  // O maior tamanho de número que cabe no cartão.
  let tamanho = 1;
  while (6 * (tamanho + 1) * texto.length - (tamanho + 1) <= l - 4 && 7 * (tamanho + 1) <= a - 8) tamanho++;
  const largura = 6 * tamanho * texto.length - tamanho;
  const altura = 7 * tamanho;
  const x = Math.floor((l - largura) / 2);
  const y = Math.floor((a - 2 - altura) / 2);
  desenharTexto(c, texto, cores.sombra, x, y + 1, tamanho);
  desenharTexto(c, texto, cores.numero, x, y, tamanho);
  return imagem;
}

function pintarCartao(cartao) {
  clearTimeout(cartao.temporizador);
  cartao.classList.remove("virando");
  const canvas = cartao.firstElementChild;
  const l = Math.floor(cartao.clientWidth / TAMANHO_DO_PIXEL);
  const a = Math.floor(cartao.clientHeight / TAMANHO_DO_PIXEL);
  if (!l || !a || !cartao.dataset.valor) return;

  canvas.width = l;
  canvas.height = a;
  canvas.style.width = `${l * TAMANHO_DO_PIXEL}px`;
  canvas.style.height = `${a * TAMANHO_DO_PIXEL}px`;
  canvas.getContext("2d").drawImage(imagemDoCartao(l, a, cartao.dataset.valor), 0, 0);
}

// A folha de cima do número antigo vai achatando e, depois, a de baixo do novo vai abrindo.
function animarVirada(cartao, anterior, texto) {
  const canvas = cartao.firstElementChild;
  const { width: l, height: a } = canvas;
  const c = canvas.getContext("2d");
  c.imageSmoothingEnabled = false;
  const antigo = imagemDoCartao(l, a, anterior);
  const novo = imagemDoCartao(l, a, texto);
  const meio = Math.floor((a - 2) / 2);
  const baixo = a - meio;
  const metade = QUADROS_DA_VIRADA / 2;
  let quadro = 0;

  cartao.classList.add("virando");
  function passo() {
    if (quadro === QUADROS_DA_VIRADA) {
      pintarCartao(cartao);
      return;
    }
    c.clearRect(0, 0, l, a);
    c.drawImage(novo, 0, 0, l, meio, 0, 0, l, meio);
    c.drawImage(antigo, 0, meio, l, baixo, 0, meio, l, baixo);
    if (quadro < metade) {
      const altura = Math.ceil((meio * (metade - quadro)) / metade);
      c.drawImage(antigo, 0, 0, l, meio, 0, meio - altura, l, altura);
    } else {
      const altura = Math.ceil((baixo * (quadro - metade + 1)) / metade);
      c.drawImage(novo, 0, meio, l, baixo, 0, meio, l, altura);
    }
    quadro++;
    cartao.temporizador = setTimeout(passo, 55);
  }
  passo();
}

function virarCartao(cartao, texto) {
  const anterior = cartao.dataset.valor;
  if (anterior === texto) return;
  cartao.dataset.valor = texto;

  if (anterior === undefined || movimentoReduzido || !$("#amizade").open) pintarCartao(cartao);
  else {
    clearTimeout(cartao.temporizador);
    animarVirada(cartao, anterior, texto);
  }
}

// Com a janela fechada os cartões não têm tamanho: eles são desenhados quando ela abre.
const observadorDeCartoes = new ResizeObserver((mudancas) => {
  mudancas.forEach((mudanca) => pintarCartao(mudanca.target));
});

document.querySelectorAll(".flip").forEach((cartao) => {
  cartao.append(document.createElement("canvas"));
  observadorDeCartoes.observe(cartao);
});

function mostrarContagem(cartao, rotulo, valor, singular, plural) {
  const nome = valor === 1 ? singular : plural;
  virarCartao($(cartao), String(valor).padStart(2, "0"));
  $(rotulo).textContent = nome;
  return `${valor} ${nome}`;
}

function atualizarAmizade() {
  const segundos = Math.floor(Math.max(0, Date.now() - inicioAmizade) / 1000);
  $("#contador").setAttribute("aria-label", [
    mostrarContagem("#conta-dias", "#rotulo-dias", Math.floor(segundos / 86400), "dia", "dias"),
    mostrarContagem("#conta-horas", "#rotulo-horas", Math.floor(segundos / 3600) % 24, "hora", "horas"),
    mostrarContagem("#conta-minutos", "#rotulo-minutos", Math.floor(segundos / 60) % 60, "minuto", "minutos"),
    mostrarContagem("#conta-segundos", "#rotulo-segundos", segundos % 60, "segundo", "segundos"),
  ].join(", "));
}

// Cada coração é [posição na largura em %, tamanho, atraso em segundos, duração em segundos].
[[6, 33, 0, 10], [20, 22, 2.5, 12], [34, 33, 5, 11], [50, 22, 1, 12], [64, 33, 3.5, 10], [78, 22, 6, 12], [90, 33, 1.8, 11]].forEach(([x, tamanho, atraso, duracao]) => {
  const coracao = document.createElement("i");
  coracao.style.left = `${x}%`;
  coracao.style.width = `${tamanho}px`;
  coracao.style.height = `${(tamanho * 10) / 11}px`;
  coracao.style.animationDelay = `${atraso}s`;
  coracao.style.animationDuration = `${duracao}s`;
  document.querySelectorAll(".coracoes-fundo").forEach((fundo) => fundo.append(coracao.cloneNode()));
});

$("#amizade-frase").textContent = configAmizade.frase || "";
atualizarAmizade();
setInterval(atualizarAmizade, 1000);

/* Carta */

const TAMANHO_MINIMO_DA_MESA = [128, 104];
const ENVELOPE_MEIA_LARGURA = 36;
const ENVELOPE_MEIA_ALTURA = 23;
const ENVELOPE_INCLINACAO = -13;
const COR_DA_LINHA_DA_CARTA = "#a8703f";
// A ponta da aba, medida a partir da borda de cima do envelope: positiva fechada, negativa aberta.
const PONTAS_DA_ABA = [27, 21, 15, 9, 3, -6, -14, -22];
// Onde fica o topo do papel enquanto ele sobe, medido a partir do centro do envelope.
const SUBIDA_DA_CARTA = [-14, -18, -22, -26, -30, -34, -38, -42, -45, -48, -50, -52];
// Os brilhos e os corações são medidos a partir do centro do envelope.
const BRILHOS_DA_CARTA = [[-46, -16, 0], [48, -22, 2], [-40, 28, 4], [42, 26, 5], [-54, 6, 1], [54, 4, 3]];
// Cada coração da abertura: [x inicial, velocidade para o lado, atraso em quadros, cor].
const CORACOES_DA_ABERTURA = [[-14, -1, 0, "#f0668f"], [14, 1, 1, "#ffd873"], [-4, -0.5, 3, "#ffd873"], [6, 0.5, 4, "#f0668f"], [-22, -1, 6, "#ffffff"], [22, 1, 7, "#f0668f"]];
const contextoCarta = $("#carta-canvas").getContext("2d");
const textoDaCarta = (CONTEUDO.carta || {}).texto || "";
const cenarioDaCarta = document.createElement("canvas");
let larguraDaMesa = TAMANHO_MINIMO_DA_MESA[0];
let alturaDaMesa = TAMANHO_MINIMO_DA_MESA[1];
let bordaDaMesa = 40;
let centroDoEnvelope = [64, 66];
let ultimoDesenhoDaCarta = [0, null];
let topoIdealDaCarta = 22;
let temaDaMesa = null;
let temporizadorCarta = null;
let cartaAbrindo = false;
let quadroCarta = 0;

/* A escrivaninha */

function desenharJanelaDaMesa(c, tema) {
  pixels(c, COR_DA_LINHA_DA_CARTA, 44, 2, 40, 28);
  pixels(c, "#fff3d6", 45, 3, 38, 26);
  c.save();
  c.beginPath();
  c.rect(47, 5, 34, 22);
  c.clip();
  tema.ceu.forEach((cor, i) => pixels(c, cor, 47, 5 + i * 3, 34, 3));
  pixels(c, tema.ceu[tema.ceu.length - 1], 47, 23, 34, 4);
  if (tema.astro.lua) {
    circulo(c, tema.astro.cores[0], 74, 11, 3);
    circulo(c, tema.ceu[1], 76, 10, 2);
    for (const [x, y] of [[52, 9], [60, 13], [68, 7], [56, 18]]) pixels(c, "#fff3d6", x, y);
  } else if (tema.astro.listras) {
    circulo(c, tema.astro.cores[1], 64, 24, 6);
    circulo(c, tema.astro.cores[0], 64, 23, 3);
  } else {
    circulo(c, tema.astro.cores[1], 73, 11, 3);
    pixels(c, "#ffffff", 52, 13, 9, 2);
    pixels(c, "#ffffff", 54, 12, 5, 1);
  }
  c.restore();
  pixels(c, "#fff3d6", 63, 5, 2, 22);
}

function desenharObjetosDaMesa(c) {
  // Porta-lápis
  for (const [x, a, cor] of [[11, 15, "#e0527f"], [14, 19, "#ffd873"], [17, 14, "#5aa9e6"], [20, 17, "#4fae5c"]]) {
    pixels(c, COR_DA_LINHA_DA_CARTA, x - 1, 40 - a - 1, 4, a);
    pixels(c, cor, x, 40 - a, 2, a);
    pixels(c, "#fff3d6", x, 40 - a, 2, 2);
  }
  pixels(c, COR_DA_LINHA_DA_CARTA, 8, 28, 17, 16);
  pixels(c, "#ffc9d6", 9, 29, 15, 14);
  pixels(c, "#ffe3ea", 9, 29, 4, 14);
  pixels(c, "#f7a8bd", 21, 29, 3, 14);
  coracao(c, "#e0527f", 14, 33);

  // Livrinhos
  for (const [x, y, l, cor, faixa] of [[28, 39, 15, "#5aa9e6", "#fff3d6"], [29, 35, 13, "#ffd873", "#e0527f"]]) {
    pixels(c, COR_DA_LINHA_DA_CARTA, x, y, l, 5);
    pixels(c, cor, x + 1, y + 1, l - 2, 3);
    pixels(c, faixa, x + 3, y + 1, 2, 3);
  }

  // Abajur
  pixels(c, COR_DA_LINHA_DA_CARTA, 100, 40, 19, 4);
  pixels(c, "#e0527f", 101, 41, 17, 2);
  pixels(c, COR_DA_LINHA_DA_CARTA, 108, 20, 3, 21);
  for (let i = 0; i < 12; i++) {
    const meia = 5 + Math.floor(i / 2);
    pixels(c, COR_DA_LINHA_DA_CARTA, 109 - meia - 1, 8 + i, meia * 2 + 3, 1);
    pixels(c, i < 3 ? "#fff3b0" : "#ffd873", 109 - meia, 8 + i, meia * 2 + 1, 1);
  }
  pixels(c, COR_DA_LINHA_DA_CARTA, 98, 20, 23, 1);

  // Lápis solto em cima da mesa
  for (let i = 0; i < 18; i++) {
    const x = 94 + i;
    const y = 98 - Math.floor(i / 2);
    pixels(c, COR_DA_LINHA_DA_CARTA, x, y - 1, 1, 4);
    pixels(c, i < 3 ? "#ffe3ea" : i > 15 ? "#a8703f" : "#ffd873", x, y, 1, 2);
  }
}

function montarCenarioDaMesa() {
  if (temaDaMesa === temaAtual) return;
  temaDaMesa = temaAtual;
  const c = cenarioDaCarta.getContext("2d");
  const tema = TEMAS[temaAtual];
  const { sala } = tema;
  const [clara, media, escura] = sala.madeira;
  const l = larguraDaMesa;
  const a = alturaDaMesa;

  // Os objetos foram desenhados para uma mesa de 128 por 104: aqui eles acompanham o tamanho real.
  const dx = Math.floor((l - 128) / 2);
  const dy = bordaDaMesa - 40;

  pixels(c, sala.parede, 0, 0, l, bordaDaMesa);
  circulo(c, sala.halo[0], dx + 64, dy + 34, 34);

  // Tampo, em tábuas, com a borda da frente mais escura.
  pixels(c, media, 0, bordaDaMesa, l, a - bordaDaMesa);
  const sorte = criarAleatorio(5);
  for (let y = bordaDaMesa; y < a - 4; y += 12) {
    pixels(c, escura, 0, y, l, 1);
    for (let i = 0; i < Math.ceil(l / 16); i++) {
      pixels(c, sorte() < 0.5 ? clara : escura, Math.floor(sorte() * (l - 10)), y + 2 + Math.floor(sorte() * 9), 3 + Math.floor(sorte() * 8), 1);
    }
  }
  pixels(c, clara, 0, bordaDaMesa, l, 1);
  pixels(c, escura, 0, a - 4, l, 4);
  pixels(c, clara, 0, a - 4, l, 1);

  c.save();
  c.translate(dx, dy);
  desenharJanelaDaMesa(c, tema);
  desenharObjetosDaMesa(c);
  c.restore();
}

// A cena ocupa a janela inteira, então o tamanho dela depende da tela.
function ajustarMesa() {
  const miolo = $("#carta-miolo");
  const larguraTela = miolo.clientWidth;
  const alturaTela = miolo.clientHeight;
  if (!larguraTela || !alturaTela) return;

  const passo = 1 / (devicePixelRatio || 1);
  const ideal = Math.min(larguraTela / TAMANHO_MINIMO_DA_MESA[0], alturaTela / TAMANHO_MINIMO_DA_MESA[1]);
  const pixel = Math.max(passo, Math.floor(ideal / passo) * passo);
  larguraDaMesa = Math.ceil(larguraTela / pixel);
  alturaDaMesa = Math.ceil(alturaTela / pixel);
  bordaDaMesa = Math.max(40, Math.round(alturaDaMesa * 0.26));
  const fundoDaMesa = alturaDaMesa - 4;
  centroDoEnvelope = [Math.floor(larguraDaMesa / 2), Math.round(bordaDaMesa + (fundoDaMesa - bordaDaMesa) * 0.6)];

  topoIdealDaCarta = (bordaDaMesa - 12) * pixel;

  const canvas = $("#carta-canvas");
  canvas.width = cenarioDaCarta.width = larguraDaMesa;
  canvas.height = cenarioDaCarta.height = alturaDaMesa;
  canvas.style.width = `${larguraDaMesa * pixel}px`;
  canvas.style.height = `${alturaDaMesa * pixel}px`;
  temaDaMesa = null;

  // A área de toque acompanha o envelope.
  const botao = $("#carta-envelope");
  botao.style.left = `${(centroDoEnvelope[0] - 42) * pixel}px`;
  botao.style.top = `${(centroDoEnvelope[1] - 36) * pixel}px`;
  botao.style.width = `${84 * pixel}px`;
  botao.style.height = `${Math.min(72, alturaDaMesa - centroDoEnvelope[1] + 35) * pixel}px`;

  desenharEnvelopeDaCarta(...ultimoDesenhoDaCarta);
  ajustarFolha();
}

// O papel cresce até caber o texto inteiro. Só quando não cabe na janela ele passa a rolar.
function ajustarFolha() {
  const aberta = $("#carta-aberta");
  const papel = $("#carta-papel");
  if (aberta.hidden) return;

  const estilo = getComputedStyle(aberta);
  const botao = $("#carta-guardar").offsetHeight;
  const espaco = aberta.clientHeight - botao - parseFloat(estilo.rowGap) - parseFloat(estilo.paddingBottom) - 6;
  const topo = Math.min(topoIdealDaCarta, Math.max(18, espaco - papel.scrollHeight));
  aberta.style.setProperty("--topo-da-carta", `${topo}px`);
  aberta.style.setProperty("--altura-da-carta", `${Math.max(120, espaco - topo)}px`);
  atualizarSetaDaCarta();
}

// A setinha mostra que tem mais texto para baixo e some quando chega ao fim.
function atualizarSetaDaCarta() {
  const papel = $("#carta-papel");
  const temMais = papel.scrollHeight - papel.clientHeight - papel.scrollTop > 4;
  $(".carta-folha").classList.toggle("tem-mais", temMais);
}

/* O envelope é desenhado inclinado: cada forma é girada e só depois vira pixels. */

function criarGiro(angulo) {
  const cosseno = Math.cos((angulo * Math.PI) / 180);
  const seno = Math.sin((angulo * Math.PI) / 180);
  return ([u, v]) => [centroDoEnvelope[0] + u * cosseno - v * seno, centroDoEnvelope[1] + u * seno + v * cosseno];
}

function pintarForma(c, pontos, cor) {
  const ys = pontos.map((p) => p[1]);
  const xs = pontos.map((p) => p[0]);
  for (let y = Math.floor(Math.min(...ys)); y <= Math.ceil(Math.max(...ys)); y++) {
    for (let x = Math.floor(Math.min(...xs)); x <= Math.ceil(Math.max(...xs)); x++) {
      let dentro = false;
      pontos.forEach(([x1, y1], i) => {
        const [x2, y2] = pontos[(i + 1) % pontos.length];
        if (y1 > y + 0.5 !== y2 > y + 0.5 && x + 0.5 < ((x2 - x1) * (y + 0.5 - y1)) / (y2 - y1) + x1) dentro = !dentro;
      });
      if (dentro) pixels(c, cor, x, y);
    }
  }
}

function pintarLinha(c, [x1, y1], [x2, y2], cor) {
  const passos = Math.ceil(Math.max(Math.abs(x2 - x1), Math.abs(y2 - y1))) || 1;
  for (let i = 0; i <= passos; i++) {
    pixels(c, cor, Math.floor(x1 + ((x2 - x1) * i) / passos), Math.floor(y1 + ((y2 - y1) * i) / passos));
  }
}

function contornarForma(c, pontos, cor) {
  pontos.forEach((ponto, i) => pintarLinha(c, ponto, pontos[(i + 1) % pontos.length], cor));
}

function desenharAdesivoDeCoracao(c, cx, cy) {
  const x = Math.round(cx) - 5;
  const y = Math.round(cy) - 5;
  const celulas = [];
  FORMA_CORACAO.forEach((linha, l) => {
    [...linha].forEach((marca, k) => {
      if (marca === "X") celulas.push([x + k, y + l]);
    });
  });
  for (const [px, py] of celulas) pixels(c, COR_DA_LINHA_DA_CARTA, px - 2, py - 2, 5, 5);
  for (const [px, py] of celulas) pixels(c, "#ffffff", px - 1, py - 1, 3, 3);
  for (const [px, py] of celulas) pixels(c, "#f0668f", px, py);
  pixels(c, "#ffd6e0", x + 2, y + 1, 2, 2);
  pixels(c, "#d9446f", x + 5, y + 7, 2, 1);
}

function desenharBrilhinho(c, x, y, fase) {
  const momento = (quadroCarta + fase) % 8;
  if (momento > 4) return;
  const raio = momento === 2 ? 2 : momento === 4 || momento === 0 ? 0 : 1;
  pixels(c, "#ffd873", x - raio, y, raio * 2 + 1, 1);
  pixels(c, "#ffd873", x, y - raio, 1, raio * 2 + 1);
  if (raio === 2) pixels(c, "#fff6e0", x, y);
}

// As camadas vão de trás para a frente: aba aberta, fundo, papel, bolso e aba fechada.
function desenharEnvelopeDaCarta(abertura, topoDoPapel, tempoDosCoracoes = -1) {
  ultimoDesenhoDaCarta = [abertura, topoDoPapel];
  montarCenarioDaMesa();
  const c = contextoCarta;
  c.drawImage(cenarioDaCarta, 0, 0);

  // De vez em quando, fechado, ele dá uma balançadinha para chamar atenção.
  const balanco = abertura === 0 && !movimentoReduzido ? [0, 2, -2, 2, -1, 0][quadroCarta % 28] || 0 : 0;
  const giro = criarGiro(ENVELOPE_INCLINACAO + balanco);
  const w = ENVELOPE_MEIA_LARGURA;
  const h = ENVELOPE_MEIA_ALTURA;
  const em = (...pontos) => pontos.map(giro);
  const ponta = PONTAS_DA_ABA[abertura];
  const fechada = ponta > 0;
  const topoEsq = [-w, -h];
  const topoDir = [w, -h];
  const baixoDir = [w, h];
  const baixoEsq = [-w, h];
  const meio = [0, 3];

  // Sombra em cima da mesa
  pintarForma(c, em(topoEsq, topoDir, baixoDir, baixoEsq).map(([x, y]) => [x + 2, y + 3]), "rgba(40, 15, 40, 0.3)");

  if (!fechada) {
    const pico = [0, -h + ponta];
    pintarForma(c, em(topoEsq, topoDir, pico), "#ffb3c6");
    pintarForma(c, em([-w + 9, -h], [w - 9, -h], [0, -h + ponta * 0.72]), "#ff9db5");
    contornarForma(c, em(topoEsq, pico, topoDir), COR_DA_LINHA_DA_CARTA);
  }

  pintarForma(c, em(topoEsq, topoDir, baixoDir, baixoEsq), "#ff9db5");

  if (topoDoPapel !== null) {
    const pe = h - 4;
    const borda = w - 7;
    pintarForma(c, em([-borda, topoDoPapel], [borda, topoDoPapel], [borda, pe], [-borda, pe]), "#ffffff");
    contornarForma(c, em([-borda, topoDoPapel], [borda, topoDoPapel], [borda, pe], [-borda, pe]), COR_DA_LINHA_DA_CARTA);
    for (let v = topoDoPapel + 11; v < pe; v += 5) {
      pintarLinha(c, ...em([-borda + 5, v], [borda - 5, v]), "#ffd6e0");
    }
    const [hx, hy] = giro([-2, topoDoPapel + 4]);
    coracao(c, "#f0668f", Math.round(hx), Math.round(hy));
  }

  // Bolso da frente: dois triângulos dos lados e um embaixo, com as emendas rosadas.
  pintarForma(c, em(topoEsq, meio, baixoEsq), "#fffdf8");
  pintarForma(c, em(topoDir, meio, baixoDir), "#fffdf8");
  pintarForma(c, em(baixoEsq, meio, baixoDir), "#ffffff");
  pintarLinha(c, ...em(baixoEsq, meio), "#ffd6e0");
  pintarLinha(c, ...em(baixoDir, meio), "#ffd6e0");
  pintarLinha(c, ...em([-w, -h + 1], [0, 4]), "#c9c4d0");
  pintarLinha(c, ...em([w, -h + 1], [0, 4]), "#c9c4d0");
  pintarLinha(c, ...em(topoEsq, meio), COR_DA_LINHA_DA_CARTA);
  pintarLinha(c, ...em(topoDir, meio), COR_DA_LINHA_DA_CARTA);
  pintarLinha(c, ...em([-w + 1, h - 1], [w - 1, h - 1]), "#c9c4d0");
  pintarLinha(c, ...em(topoDir, baixoDir), COR_DA_LINHA_DA_CARTA);
  pintarLinha(c, ...em(baixoDir, baixoEsq), COR_DA_LINHA_DA_CARTA);
  pintarLinha(c, ...em(baixoEsq, topoEsq), COR_DA_LINHA_DA_CARTA);

  if (fechada) {
    const pico = [0, -h + ponta];
    pintarForma(c, em(topoEsq, topoDir, [0, -h + ponta + 2]).map(([x, y]) => [x, y + 1]), "#c9c4d0");
    pintarForma(c, em(topoEsq, topoDir, pico), "#ffffff");
    contornarForma(c, em(topoEsq, pico, topoDir), COR_DA_LINHA_DA_CARTA);
    if (ponta >= 15) {
      const [ax, ay] = giro(pico);
      desenharAdesivoDeCoracao(c, ax, ay - 1);
    }
  }

  const [cx, cy] = centroDoEnvelope;
  if (abertura === 0) BRILHOS_DA_CARTA.forEach(([x, y, fase]) => desenharBrilhinho(c, cx + x, cy + y, fase));

  CORACOES_DA_ABERTURA.forEach(([x, lado, atraso, cor]) => {
    const t = tempoDosCoracoes - atraso;
    if (t < 0) return;
    coracao(c, cor, Math.round(cx + x + lado * t), cy - 26 - t * 3);
  });
}

// Os furinhos da folha: mostram a madeira da mesa por baixo, como um furo de verdade.
function atualizarFurosDaFolha() {
  const [clara, media, escura] = TEMAS[temaAtual].sala.madeira;
  document.documentElement.style.setProperty("--sprite-furo", gerarImagem(8, 42, (c) => {
    circulo(c, escura, 4, 21, 3);
    circulo(c, media, 4, 22, 2);
    pixels(c, clara, 3, 24, 2, 1);
  }));
}

// O coraçãozinho rabiscado no cabeçalho da folha.
document.documentElement.style.setProperty("--sprite-coracao-rosa", gerarImagem(11, 10, (c) => {
  FORMA_CORACAO.forEach((linha, y) => {
    [...linha].forEach((marca, x) => {
      if (marca === "X") pixels(c, "#f0668f", x, y);
    });
  });
  pixels(c, "#ffd6e0", 2, 1, 2, 2);
}));

// O coração branco com contorno marrom, que fecha a carta.
document.documentElement.style.setProperty("--sprite-coracao-branco", gerarImagem(13, 12, (c) => {
  FORMA_CORACAO.forEach((linha, y) => {
    [...linha].forEach((marca, x) => {
      if (marca === "X") pixels(c, COR_DA_LINHA_DA_CARTA, x, y, 3, 3);
    });
  });
  FORMA_CORACAO.forEach((linha, y) => {
    [...linha].forEach((marca, x) => {
      if (marca === "X") pixels(c, "#ffffff", x + 1, y + 1);
    });
  });
}));

function mostrarCartaAberta() {
  cartaAbrindo = false;
  // O envelope fica aberto, sobre a mesa, atrás da carta.
  desenharEnvelopeDaCarta(PONTAS_DA_ABA.length - 1, null);
  $("#carta-fechada").hidden = true;
  $("#carta-aberta").hidden = false;
  $("#carta-papel").scrollTop = 0;
  ajustarFolha();
  $("#carta-guardar").focus({ preventScroll: true });
}

function abrirEnvelope() {
  if (cartaAbrindo) return;
  if (movimentoReduzido) {
    mostrarCartaAberta();
    return;
  }

  cartaAbrindo = true;
  $("#carta-envelope").classList.add("abrindo");
  $("#carta-dica").textContent = "";
  let abertura = 0;
  let subida = 0;

  function abrirAba() {
    abertura++;
    desenharEnvelopeDaCarta(abertura, abertura >= 4 ? SUBIDA_DA_CARTA[0] : null);
    temporizadorCarta = setTimeout(abertura < PONTAS_DA_ABA.length - 1 ? abrirAba : subirPapel, 70);
  }

  function subirPapel() {
    desenharEnvelopeDaCarta(abertura, SUBIDA_DA_CARTA[subida], subida);
    subida++;
    temporizadorCarta = setTimeout(subida < SUBIDA_DA_CARTA.length ? subirPapel : mostrarCartaAberta, 70);
  }

  abrirAba();
}

function fecharEnvelope() {
  clearTimeout(temporizadorCarta);
  cartaAbrindo = false;
  $("#carta-aberta").hidden = true;
  $("#carta-fechada").hidden = false;
  $("#carta-envelope").classList.remove("abrindo");
  $("#carta-dica").textContent = "Toque no envelope";
  desenharEnvelopeDaCarta(0, null);
}

atualizarFurosDaFolha();
$("#carta-texto").textContent = textoDaCarta;
$("#carta-fecho").textContent = (CONTEUDO.carta || {}).fecho || "";
new ResizeObserver(ajustarMesa).observe($("#carta-miolo"));
$("#carta-papel").addEventListener("scroll", atualizarSetaDaCarta);
$("#carta-envelope").addEventListener("click", abrirEnvelope);
$("#carta-guardar").addEventListener("click", () => {
  fecharEnvelope();
  $("#carta-envelope").focus({ preventScroll: true });
});
$("#carta").addEventListener("close", fecharEnvelope);
fecharEnvelope();

if (!movimentoReduzido) {
  setInterval(() => {
    if (!$("#carta").open || cartaAbrindo || $("#carta-fechada").hidden) return;
    quadroCarta++;
    desenharEnvelopeDaCarta(0, null);
  }, 180);
}

/* Bolo */

const configBolo = CONTEUDO.bolo || {};
const totalVelas = Math.min(Math.max(Math.round(configBolo.velas) || 1, 1), 30);
const CORES_VELAS = ["#a8e0ff", "#fff3d6", "#ffd873", "#f28da0"];
const contextoBolo = $("#bolo-canvas").getContext("2d");
const LARGURA_BOLO = 128;
const ALTURA_BOLO = 104;
const VELAS_X = 45;
const VELAS_LARGURA = 38;
// Até que distância da vela (em pixels da cena) um toque ainda conta para ela.
const ALCANCE_DA_VELA = 7;
const fileirasVelas = totalVelas > 10 ? 2 : 1;
const velasPorFileira = Math.ceil(totalVelas / fileirasVelas);
const cenarioBolo = document.createElement("canvas");
cenarioBolo.width = LARGURA_BOLO;
cenarioBolo.height = ALTURA_BOLO;
let temaDoCenario = null;
let quadroBolo = 0;
let animacaoConfete = null;

// Com duas fileiras, as velas de trás ficam mais altas para as chamas não se misturarem.
const velas = Array.from({ length: totalVelas }, (_, i) => {
  const fileira = Math.floor(i / velasPorFileira);
  const coluna = i % velasPorFileira;
  const largura = VELAS_LARGURA / velasPorFileira;
  const desvio = fileirasVelas === 1 ? 0 : fileira === 0 ? -largura / 4 : largura / 4;
  return {
    x: Math.round(VELAS_X + (coluna + 0.5) * largura + desvio - 1),
    base: fileirasVelas === 2 && fileira === 1 ? 34 : 30,
    altura: fileirasVelas === 1 ? 10 : fileira === 0 ? 15 : 6,
    fileira,
    coluna,
    cor: CORES_VELAS[i % CORES_VELAS.length],
    acesa: true,
    apagadaEm: 0,
  };
});

function desenharVelaCorpo(c, vela) {
  const topo = vela.base - vela.altura;
  if (fileirasVelas === 1) pixels(c, CONTORNO, vela.x - 1, topo - 1, 4, vela.altura + 1);
  pixels(c, vela.cor, vela.x, topo, 2, vela.altura);
  pixels(c, "#ffffff", vela.x, topo + 2, 1, 1);
  if (vela.altura > 6) pixels(c, "#ffffff", vela.x + 1, topo + 6, 1, 1);
}

function desenharVelaChama(c, vela) {
  const topo = vela.base - vela.altura;

  if (vela.acesa) {
    const pisca = fileirasVelas === 2 || (!movimentoReduzido && (quadroBolo + vela.x) % 2 === 0);
    pixels(c, "#ff7a3c", vela.x, topo - 5, 2, 4);
    pixels(c, "#ff7a3c", vela.x - (pisca ? 0 : 1), topo - 3, pisca ? 2 : 4, 2);
    pixels(c, "#ffd35c", vela.x, topo - 3, 2, 2);
    pixels(c, "#ff7a3c", vela.x + (pisca ? 1 : 0), topo - 6, 1, 1);
    return;
  }

  const idade = quadroBolo - vela.apagadaEm;
  if (!movimentoReduzido && idade < 10) {
    const lado = idade % 4 < 2 ? 0 : 1;
    pixels(c, "#d8d4e4", vela.x + lado, topo - 2 - idade, 1, 2);
    if (idade > 2) pixels(c, "#a9a4bd", vela.x + 1 - lado, topo - idade + 1, 1, 1);
  }
}

function desenharJanelaDaSala(c) {
  const tema = TEMAS[temaAtual];

  pixels(c, CONTORNO, 4, 20, 24, 34);
  pixels(c, "#fff3d6", 5, 21, 22, 32);
  c.save();
  c.beginPath();
  c.rect(7, 23, 18, 28);
  c.clip();

  tema.ceu.forEach((cor, i) => pixels(c, cor, 7, 23 + i * 4, 18, 4));
  if (tema.astro.listras) {
    circulo(c, tema.astro.cores[1], 16, 42, 6);
    circulo(c, tema.astro.cores[0], 16, 40, 3);
  } else if (tema.astro.lua) {
    circulo(c, tema.astro.cores[0], 18, 29, 3);
    circulo(c, tema.ceu[1], 20, 28, 2);
    for (const [x, y] of [[10, 26], [13, 33], [22, 36]]) pixels(c, "#fff3d6", x, y);
  } else {
    circulo(c, tema.astro.cores[1], 18, 29, 3);
    circulo(c, tema.astro.cores[0], 17, 28, 1);
  }
  pixels(c, tema.mar[1], 7, 45, 18, 6);
  pixels(c, tema.reflexo[0], 12, 47, 8, 1);
  c.restore();

  pixels(c, "#fff3d6", 15, 23, 2, 28);
}

function desenharBandeirinhas(c) {
  const cores = ["#ffd873", "#e0527f", "#a8e0ff", "#f7845f"];
  for (const lado of [0, 1]) {
    for (let i = 0; i < 4; i++) {
      const base = 2 + i * 9;
      const x = lado ? LARGURA_BOLO - base - 7 : base;
      const y = 7 - i;
      for (let linha = 0; linha < 6; linha++) {
        const meia = Math.ceil((6 - linha) / 2);
        pixels(c, CONTORNO, x + 3 - meia - 1, y + linha, meia * 2 + 2, 1);
        pixels(c, cores[i], x + 3 - meia, y + linha, meia * 2, 1);
      }
    }
    for (let i = 0; i < 38; i++) {
      pixels(c, CONTORNO, lado ? LARGURA_BOLO - 1 - i : i, 7 - Math.floor(i / 9), 1, 1);
    }
  }
}

function desenharPresente(c, x, y, l, a, cor, sombra, fita) {
  pixels(c, CONTORNO, x, y, l, a);
  pixels(c, cor, x + 1, y + 1, l - 2, a - 1);
  pixels(c, sombra, x + l - 4, y + 1, 3, a - 1);
  pixels(c, fita, x + Math.floor(l / 2) - 1, y + 1, 2, a - 1);
  pixels(c, fita, x + 1, y + Math.floor(a / 2), l - 2, 2);
  pixels(c, fita, x + Math.floor(l / 2) - 3, y - 2, 2, 2);
  pixels(c, fita, x + Math.floor(l / 2) + 1, y - 2, 2, 2);
}

function desenharMesa(c) {
  for (const x of [15, 107]) {
    pixels(c, CONTORNO, x, 98, 6, 6);
    pixels(c, "#8a5a3c", x + 1, 98, 4, 6);
  }
  pixels(c, CONTORNO, 3, 85, 122, 14);
  pixels(c, "#fff3d6", 4, 86, 120, 3);
  pixels(c, "#fdeccb", 4, 89, 120, 9);
  pixels(c, "#ffd873", 4, 93, 120, 2);
}

function desenharMorango(c, x, y) {
  pixels(c, CONTORNO, x - 1, y, 7, 6);
  pixels(c, "#e02f4a", x, y + 1, 5, 4);
  pixels(c, "#ffd873", x + 1, y + 2);
  pixels(c, "#ffd873", x + 3, y + 3);
  pixels(c, "#4fae5c", x, y, 5, 1);
  pixels(c, "#4fae5c", x + 2, y - 1, 1, 1);
}

function desenharAndar(c, { x, y, l, a, cor, clara, escura, cobertura, coberturaEscura, gotas }) {
  pixels(c, CONTORNO, x, y, l, a);
  pixels(c, cor, x + 1, y + 1, l - 2, a - 2);
  pixels(c, clara, x + 1, y + 1, 3, a - 2);
  pixels(c, escura, x + l - 6, y + 1, 5, a - 2);
  pixels(c, escura, x + 1, y + a - 3, l - 2, 2);
  pixels(c, cobertura, x + 1, y + 1, l - 2, 3);
  for (const [dx, tamanho] of gotas) {
    pixels(c, cobertura, x + dx, y + 4, 3, tamanho);
    pixels(c, coberturaEscura, x + dx + 2, y + 4, 1, tamanho);
  }
}

function desenharBoloDaMesa(c) {
  pixels(c, CONTORNO, 52, 82, 24, 3);
  pixels(c, "#d9a03c", 53, 83, 22, 2);
  pixels(c, CONTORNO, 22, 78, 84, 5);
  pixels(c, "#ffd873", 23, 79, 82, 3);
  pixels(c, "#fff3b0", 23, 79, 82, 1);

  desenharAndar(c, {
    x: 26, y: 60, l: 76, a: 19,
    cor: "#e0527f", clara: "#f28da0", escura: "#b83a75", cobertura: "#fff3d6", coberturaEscura: "#e4c69a",
    gotas: [[6, 3], [18, 5], [34, 2], [48, 4], [62, 3]],
  });
  for (const x of [34, 48, 62, 76, 88]) coracao(c, "#fff3d6", x - 2, 70);

  desenharAndar(c, {
    x: 35, y: 45, l: 58, a: 16,
    cor: "#fff0d0", clara: "#ffffff", escura: "#f0cf9e", cobertura: "#f28da0", coberturaEscura: "#d9628a",
    gotas: [[6, 3], [18, 2], [30, 4], [44, 2]],
  });
  for (let x = 42; x < 88; x += 8) pixels(c, "#e0527f", x, 55, 2, 2);

  desenharAndar(c, {
    x: 44, y: 30, l: 40, a: 16,
    cor: "#f7845f", clara: "#ffb08f", escura: "#d9633f", cobertura: "#fff3d6", coberturaEscura: "#e4c69a",
    gotas: [[5, 2], [17, 3], [29, 2]],
  });
  for (const [x, y, cor] of [[52, 40, "#ffd873"], [60, 42, "#a8e0ff"], [68, 40, "#ffd873"], [75, 42, "#a8e0ff"]]) {
    pixels(c, cor, x, y, 2, 1);
  }

  desenharMorango(c, 28, 54);
  desenharMorango(c, 95, 54);
}

function montarCenarioBolo() {
  if (temaDoCenario === temaAtual) return;
  temaDoCenario = temaAtual;
  const c = cenarioBolo.getContext("2d");
  const { sala } = TEMAS[temaAtual];

  pixels(c, sala.parede, 0, 0, LARGURA_BOLO, 76);
  circulo(c, sala.halo[0], 64, 50, 48);
  circulo(c, sala.halo[1], 64, 50, 38);
  pixels(c, sala.piso, 0, 76, LARGURA_BOLO, 28);
  pixels(c, sala.pisoEscuro, 0, 76, LARGURA_BOLO, 2);

  desenharJanelaDaSala(c);
  desenharBandeirinhas(c);
  desenharMesa(c);
  desenharPresente(c, 7, 71, 14, 14, "#5aa9e6", "#3f83c4", "#ffd873");
  desenharPresente(c, 107, 74, 13, 11, "#a890f0", "#7f66d0", "#fff3d6");
  desenharBoloDaMesa(c);
}

function desenharBaloes(c) {
  const baloes = [[107, 32, "#e0527f", "#f28da0"], [119, 24, "#ffd873", "#fff3b0"]];
  baloes.forEach(([x, y, cor, brilho], i) => {
    const bobina = movimentoReduzido ? 0 : Math.round(Math.sin(quadroBolo * 0.25 + i * 2) * 1.5);
    const topo = y + bobina;
    for (let f = topo + 7; f < 72; f++) {
      const t = (f - topo - 7) / (72 - topo - 7);
      pixels(c, CONTORNO, Math.round(x + (113 - x) * t), f, 1, 1);
    }
    circulo(c, CONTORNO, x, topo, 7);
    circulo(c, cor, x, topo, 6);
    pixels(c, brilho, x - 3, topo - 4, 2, 3);
    pixels(c, CONTORNO, x - 1, topo + 7, 3, 1);
  });
}

function desenharBolo() {
  montarCenarioBolo();
  const c = contextoBolo;
  c.drawImage(cenarioBolo, 0, 0);
  desenharBaloes(c);
  velas.forEach((vela) => desenharVelaCorpo(c, vela));
  velas.forEach((vela) => desenharVelaChama(c, vela));
}

function atualizarBolo() {
  const todasApagadas = velas.every((vela) => !vela.acesa);
  $("#bolo-mensagem").textContent = todasApagadas ? configBolo.parabens || "Parabéns!" : configBolo.pedido || "Faça um pedido!";
  $("#soprar").textContent = todasApagadas ? "Acender de novo" : "Soprar todas";
  desenharBolo();
}

function apagarVela(indice) {
  const vela = velas[indice];
  if (!vela.acesa) return;
  vela.acesa = false;
  vela.apagadaEm = quadroBolo;
  $("#velas").children[indice].setAttribute("aria-label", `Vela ${indice + 1} apagada`);
  const ultima = velas.every((v) => !v.acesa);
  atualizarBolo();
  if (ultima) soltarConfete();
}

function acenderVelas() {
  pararConfete();
  velas.forEach((vela, i) => {
    vela.acesa = true;
    $("#velas").children[i].setAttribute("aria-label", `Apagar a vela ${i + 1}`);
  });
  atualizarBolo();
}

function soltarConfete() {
  if (movimentoReduzido) return;
  pararConfete();
  const canvas = $("#confete");
  canvas.width = Math.ceil(innerWidth / 4);
  canvas.height = Math.ceil(innerHeight / 4);
  const c = canvas.getContext("2d");
  const cores = ["#fff3d6", "#ffd873", "#f7845f", "#e0527f", "#a8e0ff", "#a890f0"];
  const pecas = Array.from({ length: 150 }, () => ({
    x: Math.random() * canvas.width,
    y: -Math.random() * canvas.height,
    vy: 0.5 + Math.random() * 0.7,
    vx: (Math.random() - 0.5) * 0.4,
    fase: Math.random() * 6.28,
    cor: cores[Math.floor(Math.random() * cores.length)],
  }));

  function passo() {
    c.clearRect(0, 0, canvas.width, canvas.height);
    let restam = false;
    for (const p of pecas) {
      p.y += p.vy;
      p.x += p.vx;
      p.fase += 0.15;
      if (p.y < canvas.height) restam = true;
      pixels(c, p.cor, Math.round(p.x), Math.round(p.y), Math.sin(p.fase) > 0 ? 2 : 1, 2);
    }
    animacaoConfete = restam ? requestAnimationFrame(passo) : null;
  }
  passo();
}

function pararConfete() {
  cancelAnimationFrame(animacaoConfete);
  animacaoConfete = null;
  const canvas = $("#confete");
  canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
}

velas.forEach((vela, i) => {
  const botao = document.createElement("button");
  const largura = VELAS_LARGURA / velasPorFileira;
  const topo = vela.base - vela.altura - 7;
  botao.className = "vela";
  botao.setAttribute("aria-label", `Apagar a vela ${i + 1}`);
  botao.style.left = `${((vela.x + 1 - largura / 2) / LARGURA_BOLO) * 100}%`;
  botao.style.width = `${(largura / LARGURA_BOLO) * 100}%`;
  botao.style.top = `${(topo / ALTURA_BOLO) * 100}%`;
  botao.style.height = `${((vela.base - topo) / ALTURA_BOLO) * 100}%`;
  botao.addEventListener("click", () => apagarVela(i));
  $("#velas").append(botao);
});

// O toque vale para a vela mais próxima, então não importa exatamente onde o dedo cai.
// Passar o dedo ou o mouse apertado por cima também apaga as velas.
function apagarNoPonteiro(e) {
  const area = $("#velas").getBoundingClientRect();
  const x = ((e.clientX - area.left) / area.width) * LARGURA_BOLO;
  const y = ((e.clientY - area.top) / area.height) * ALTURA_BOLO;
  let maisProxima = -1;
  let menorDistancia = ALCANCE_DA_VELA;

  velas.forEach((vela, i) => {
    const topo = vela.base - vela.altura - 5;
    const foraNaAltura = y < topo ? topo - y : y > vela.base ? y - vela.base : 0;
    const distancia = Math.hypot(x - (vela.x + 1), foraNaAltura);
    if (distancia <= menorDistancia) {
      menorDistancia = distancia;
      maisProxima = i;
    }
  });

  if (maisProxima >= 0) apagarVela(maisProxima);
}

$("#velas").addEventListener("pointerdown", apagarNoPonteiro);
$("#velas").addEventListener("pointermove", (e) => {
  if (e.buttons) apagarNoPonteiro(e);
});

$("#soprar").addEventListener("click", () => {
  if (velas.every((vela) => !vela.acesa)) acenderVelas();
  else velas.forEach((_, i) => apagarVela(i));
});

$("#bolo").addEventListener("close", pararConfete);

atualizarBolo();

if (!movimentoReduzido) {
  setInterval(() => {
    if (!$("#bolo").open) return;
    quadroBolo++;
    desenharBolo();
  }, 160);
}
