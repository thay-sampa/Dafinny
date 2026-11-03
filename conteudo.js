// É AQUI QUE VOCÊ COLOCA AS SUAS COISAS. Não precisa mexer nos outros arquivos.
//
// Dicas:
// - Coloque as músicas na pasta "musicas" e as fotos na pasta "fotos".
// - O nome do arquivo tem que ser igualzinho ao daqui, incluindo maiúsculas e minúsculas.
// - Use músicas em .mp3 e fotos em .jpg ou .png. Foto .heic de iPhone não abre em todo navegador.
// - Para adicionar mais um item, copie um bloco { ... }, inclusive a vírgula do final.

const CONTEUDO = {
  // "velas" é o número de velinhas do bolo (de 1 a 30). Coloque a idade dela!
  bolo: {
    velas: 5,
    pedido: "Faça um pedido e apague as velinhas!",
    parabens: "Parabéns! Que o seu pedido se realize!",
  },

  // A data é escrita como ano-mês-dia.
  amizade: {
    inicio: "2021-02-08",
    frase: "Somos amigas há exatamente",
  },

  // Escreva a carta entre as aspas. Use \n para pular uma linha e \n\n para começar outro parágrafo. O "fecho" aparece em destaque no final, com um coraçãozinho.
  carta: {
    texto: "Dafinny, acho que nunca vou cansar de dizer o quanto você é especial pra mim. Acredito que tudo na vida tem um propósito, e tenho certeza que você entrou na minha pra me salvar. Todo mundo precisa de alguém pra poder conversar sobre qualquer coisa sem medo de julgamentos, pra rir das maiores besteiras do mundo, pra desabafar quando nada mais faz sentido e, principalmente, alguém que fique em todos os momentos, sejam eles bons ou ruins, e eu encontro tudo isso em você todo dia há quase 6 anos. Você sabe muito bem que pode contar comigo pra absolutamente qualquer coisa, eu sempre vou estar do seu lado pra te ouvir, te apoiar, te aconselhar e te fazer sorrir. Agradeço a Deus por ter te colocado na minha vida e agradeço a ti por ficar ao meu lado durante todo esse tempo. Você é a única pessoa que eu não posso perder.",
    fecho: "Eu te amo infinitamente!",
  },

  musicas: [
    { titulo: "Congratulations", artista: "Mac Miller", arquivo: "musicas/Mac Miller - Congratulations.mp3" },
    { titulo: "Água-viva", artista: "ANAVITORIA", arquivo: "musicas/ANAVITORIA - Água-viva.mp3" },
    { titulo: "Como Tudo Deve Ser", artista: "Charlie Brown Jr", arquivo: "musicas/Charlie Brown Jr - como tudo deve ser.mp3" },
    { titulo: "BB (Garupa de Moto Amarela)", artista: "Tim Bernardes", arquivo: "musicas/Tim Bernardes - BB (Garupa de Moto Amarela).mp3" },
    { titulo: "Just The Way You Are", artista: "Bruno Mars", arquivo: "musicas/Bruno Mars - Just The Way You Are.mp3" },
  ],

  // As fotos ficam em 3x4 na pasta fotos/mural. A legenda é opcional. "deitada" é para foto horizontal.
  fotos: [
    { arquivo: "fotos/mural/foto-01.jpg", legenda: "" },
    { arquivo: "fotos/mural/foto-02.jpg", legenda: "" },
    { arquivo: "fotos/mural/foto-03.jpg", legenda: "" },
    { arquivo: "fotos/mural/foto-04.jpg", legenda: "" },
    { arquivo: "fotos/mural/foto-05.jpg", legenda: "" },
    { arquivo: "fotos/mural/foto-06.jpg", legenda: "" },
    { arquivo: "fotos/mural/foto-07.jpg", legenda: "" },
    { arquivo: "fotos/mural/foto-08.jpg", legenda: "" },
    { arquivo: "fotos/mural/foto-09.jpg", legenda: "" },
    { arquivo: "fotos/mural/foto-10.jpg", legenda: "" },
    { arquivo: "fotos/mural/foto-11.jpg", legenda: "" },
    { arquivo: "fotos/mural/foto-12.jpg", legenda: "" },
    { arquivo: "fotos/mural/foto-13.jpg", legenda: "", deitada: true },
  ],
};
