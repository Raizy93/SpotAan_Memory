"use strict";

/* =========================
   EENVOUDIG AAN TE PASSEN
   ========================= */
const gameConfig = {
  defaultPairs: 12,
  defaultMode: "solo",
  mismatchDelay: 900,
  showFacts: true,
  useSound: true,
  showTimer: true,
  showMoves: true,
  showBestScore: true
};

const audioFiles = {
  flip: "assets/audio/flip.mp3",
  match: "assets/audio/match.mp3",
  mismatch: "assets/audio/mismatch.mp3",
  finish: "assets/audio/finish.mp3"
};

const brandLogo = "assets/Logo - Memory.png";

const gameData = [
  { id: "gozert", author: "Pieter Koolwijk", book: "Gozert", bookImage: "assets/books/Gozert.png", authorImage: "assets/authors/Pieter_Koolwijk.png", fact: "Pieter Koolwijk schrijft fantasierijke verhalen waarin gewone en bijzondere werelden door elkaar lopen." },
  { id: "ministerie-oplossingen", author: "Sanne Rooseboom", book: "Het Ministerie van Oplossingen", bookImage: "assets/books/het-ministerie-van-oplossingen.jpg", authorImage: "assets/authors/Sanne_Rooseboom.png", fact: "Sanne Rooseboom bedenkt geheime organisaties waarin kinderen slimme oplossingen voor anderen verzinnen." },
  { id: "films-nergens-draaien", author: "Yorick Goldewijk", book: "Films die nergens draaien", bookImage: "assets/books/films-die-nergens-draaien.jpg", authorImage: "assets/authors/Yorick_Goldewijk.png", fact: "Yorick Goldewijk schrijft ontroerende avonturen waarin fantasie, herinneringen en muziek samenkomen." },
  { id: "mus-kapitein", author: "Kevin Hassing", book: "Mus & Kapitein Kwaadbaard", bookImage: "assets/books/mus-en-kapitein-kwaadbaard.jpg", authorImage: "assets/authors/Kevin Hassing.png", fact: "Kevin Hassing is schrijver én stemacteur en maakt avontuurlijke verhalen vol vaart en humor." },
  { id: "danse-macabre", author: "Paul van Loon", book: "Danse Macabre", bookImage: "assets/books/danse-macabre.jpg", authorImage: "assets/authors/Paul_van_Loon.png", fact: "Paul van Loon is bekend om griezelverhalen waarin spanning en humor nooit ver uit elkaar liggen." },
  { id: "juf-braaksel", author: "Carry Slee", book: "Juf Braaksel", bookImage: "assets/books/juf-braaksel.jpg", authorImage: "assets/authors/Carry_Slee.png", fact: "Carry Slee schrijft herkenbare verhalen over school, vriendschap en opkomen voor jezelf." },
  { id: "leven-loser", author: "Jeff Kinney", book: "Het leven van een loser", bookImage: "assets/books/het-leven-van-een-loser.jpg", authorImage: "assets/authors/Jeff_Kinney.png", fact: "Jeff Kinney combineert tekst en cartoons in de dagboeken van brugklasser Bram Botermans." },
  { id: "dog-man", author: "Dav Pilkey", book: "Dog Man", bookImage: "assets/books/dog-man.jpg", authorImage: "assets/authors/Dav_Pilkey.png", fact: "Dav Pilkey maakt stripverhalen met knotsgekke humor en helden die fouten durven maken." },
  { id: "boomhut", author: "Andy Griffiths", book: "De waanzinnige boomhut", bookImage: "assets/books/de-waanzinnige-boomhut.jpg", authorImage: "assets/authors/Andy_Griffiths.png", fact: "Andy Griffiths vult zijn boomhutboeken samen met tekenaar Terry Denton met absurde uitvindingen." },
  { id: "zoete-zusjes", author: "Hanneke de Zoete", book: "De Zoete Zusjes", bookImage: "assets/books/de-zoete-zusjes.jpg", authorImage: "assets/authors/Hanneke_de_Zoete.png", fact: "Hanneke de Zoete schrijft vrolijke verhalen over zussen, familie en alledaagse avonturen." },
  { id: "lampje", author: "Annet Schaap", book: "Lampje", bookImage: "assets/books/lampje.jpg", authorImage: "assets/authors/Annet_Schaap.png", fact: "Annet Schaap is schrijver en illustrator en bouwt sprookjesachtige werelden vol eigenzinnige personages." },
  { id: "meester-jaap", author: "Jacques Vriens", book: "Meester Jaap", bookImage: "assets/books/meester-jaap.jpg", authorImage: "assets/authors/Jacques_Vriens.png", fact: "Jacques Vriens stond zelf voor de klas en verwerkt herkenbare schoolmomenten in zijn verhalen." },
  { id: "dummie-mummie", author: "Tosca Menten", book: "Dummie de Mummie", bookImage: "assets/books/dummie-de-mummie.jpg", authorImage: "assets/authors/Tosca_Menten.png", fact: "Tosca Menten schrijft humoristische avonturen waarin vreemde gebeurtenissen heel gewoon lijken." },
  { id: "badmeester", author: "Jozua Douglas", book: "De verschrikkelijke badmeester", bookImage: "assets/books/de-verschrikkelijke-badmeester.jpg", authorImage: "assets/authors/Jozua_Douglas.png", fact: "Jozua Douglas schrijft spannende en grappige boeken waarin kinderen het opnemen tegen bizarre volwassenen." },
  { id: "izzylove", author: "Manon Sikkel", book: "IzzyLove", bookImage: "assets/books/izzylove.jpg", authorImage: "assets/authors/Manon_Sikkel.png", fact: "Manon Sikkel schrijft met veel humor over verliefdheid, vriendschap en de chaos van opgroeien." },
  { id: "alaska", author: "Anna Woltz", book: "Alaska", bookImage: "assets/books/alaska.jpg", authorImage: "assets/authors/Anna_Woltz.png", fact: "Anna Woltz schrijft gelaagde verhalen over kinderen die sterker blijken dan ze zelf dachten." },
  { id: "spinder", author: "Simon van der Geest", book: "Spinder", bookImage: "assets/books/spinder.jpg", authorImage: "assets/authors/Simon_van_der_Geest.png", fact: "Simon van der Geest gebruikt bijzondere vertelvormen om gevoelens en familiegeheimen dichtbij te brengen." },
  { id: "superjuffie", author: "Janneke Schotveld", book: "Superjuffie", bookImage: "assets/books/superjuffie.jpg", authorImage: "assets/authors/Janneke_Schotveld.png", fact: "Janneke Schotveld bedenkt heldhaftige, grappige verhalen waarin gewone mensen iets bijzonders kunnen." }
];

const state = {
  pairCount: gameConfig.defaultPairs,
  mode: gameConfig.defaultMode,
  currentPlayer: 0,
  players: [
    { name: "Speler 1", score: 0 },
    { name: "Speler 2", score: 0 }
  ],
  selectedPairs: [],
  cards: [],
  firstCard: null,
  secondCard: null,
  locked: false,
  moves: 0,
  matches: 0,
  seconds: 0,
  timerId: null,
  pendingTimeouts: new Set(),
  timerStarted: false,
  soundEnabled: gameConfig.useSound,
  lastGamePairs: []
};

const elements = {
  screens: [...document.querySelectorAll(".screen")],
  startScreen: document.querySelector("#start-screen"),
  gameScreen: document.querySelector("#game-screen"),
  endScreen: document.querySelector("#end-screen"),
  overviewScreen: document.querySelector("#overview-screen"),
  board: document.querySelector("#game-board"),
  authorGrid: document.querySelector("#author-grid"),
  moves: document.querySelector("#moves"),
  matches: document.querySelector("#matches"),
  matchTotal: document.querySelector("#match-total"),
  timer: document.querySelector("#timer"),
  timerStat: document.querySelector("#timer-stat"),
  versusScoreboard: document.querySelector("#versus-scoreboard"),
  playerScores: [document.querySelector("#player-one-score"), document.querySelector("#player-two-score")],
  turnIndicator: document.querySelector("#turn-indicator"),
  status: document.querySelector("#game-status"),
  bestScore: document.querySelector("#best-score"),
  factDialog: document.querySelector("#fact-dialog"),
  factTitle: document.querySelector("#fact-title"),
  factText: document.querySelector("#fact-text"),
  soundButtons: [...document.querySelectorAll(".sound-toggle")]
};

elements.fullscreenToggle = document.querySelector("#fullscreen-toggle");
elements.fullscreenHint = document.querySelector("#fullscreen-hint");
elements.fullscreenHintButton = document.querySelector("#fullscreen-hint-button");
elements.fullscreenHintClose = document.querySelector("#fullscreen-hint-close");

let fullscreenHintDismissed = false;

function shuffle(items) {
  const result = [...items];
  for (let index = result.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [result[index], result[randomIndex]] = [result[randomIndex], result[index]];
  }
  return result;
}

function showScreen(screenId) {
  elements.screens.forEach((screen) => screen.classList.toggle("is-active", screen.id === screenId));
  const reducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
  const activeHeading = document.querySelector(`#${screenId} h1:not(.visually-hidden)`);
  if (activeHeading) {
    activeHeading.setAttribute("tabindex", "-1");
    activeHeading.focus({ preventScroll: true });
  }
}

function startGame(pairCount = state.pairCount, mode = state.mode) {
  stopTimer();
  clearPendingTasks();
  state.pairCount = Math.min(Number(pairCount), gameData.length);
  state.mode = mode === "versus" ? "versus" : "solo";
  state.currentPlayer = 0;
  state.players = [
    { name: normalizePlayerName(document.querySelector("#player-one-name").value, "Speler 1"), score: 0 },
    { name: normalizePlayerName(document.querySelector("#player-two-name").value, "Speler 2"), score: 0 }
  ];
  state.selectedPairs = shuffle(gameData).slice(0, state.pairCount);
  state.lastGamePairs = [...state.selectedPairs];
  state.cards = shuffle(state.selectedPairs.flatMap((pair) => [
    { pair, type: "book", uid: `${pair.id}-book` },
    { pair, type: "author", uid: `${pair.id}-author` }
  ]));
  state.firstCard = null;
  state.secondCard = null;
  state.locked = false;
  state.moves = 0;
  state.matches = 0;
  state.seconds = 0;
  state.timerStarted = false;
  renderBoard();
  updateStats();
  updatePlayerUI();
  showScreen("game-screen");
  const firstCard = elements.board.querySelector(".memory-card");
  if (firstCard) firstCard.focus({ preventScroll: true });
}

function renderBoard() {
  elements.board.replaceChildren();
  elements.board.dataset.pairs = String(state.pairCount);
  const fragment = document.createDocumentFragment();
  state.cards.forEach((cardData, index) => fragment.append(createCard(cardData, index)));
  elements.board.append(fragment);
}

function createCard(cardData, index) {
  const isBook = cardData.type === "book";
  const card = document.createElement("button");
  card.type = "button";
  card.className = `memory-card ${isBook ? "book-card" : "author-card"}`;
  card.dataset.uid = cardData.uid;
  card.dataset.pairId = cardData.pair.id;
  card.dataset.type = cardData.type;
  card.setAttribute("role", "gridcell");
  card.setAttribute("aria-label", `Gesloten memorykaart ${index + 1} van ${state.cards.length}`);
  card.setAttribute("aria-pressed", "false");

  const inner = document.createElement("span");
  inner.className = "card-inner";
  inner.innerHTML = `<span class="card-face card-back" aria-hidden="true"><img class="card-back-logo" src="${brandLogo}" alt=""></span>`;
  const front = document.createElement("span");
  front.className = "card-face card-front";
  front.setAttribute("aria-hidden", "true");
  front.append(createMedia(isBook ? cardData.pair.bookImage : cardData.pair.authorImage, isBook ? cardData.pair.book : cardData.pair.author, isBook ? "book" : "author"));
  const copy = document.createElement("span");
  copy.className = "card-copy";
  copy.innerHTML = `<span class="card-type">${isBook ? "BOEK" : "SCHRIJVER"}</span><span class="card-name">${escapeHtml(isBook ? cardData.pair.book : cardData.pair.author)}</span>`;
  front.append(copy);
  inner.append(front);
  card.append(inner);
  card.addEventListener("click", () => flipCard(card));
  return card;
}

function createMedia(src, label, type, className = "card-media") {
  const media = document.createElement("span");
  media.className = className;
  const placeholder = document.createElement("span");
  placeholder.className = "image-placeholder";
  placeholder.innerHTML = `<span aria-hidden="true">${type === "book" ? "▰" : "●"}</span><b>${escapeHtml(label)}</b>`;
  const image = document.createElement("img");
  image.src = src;
  image.alt = type === "book" ? `Boekcover van ${label}` : `Portret van ${label}`;
  image.addEventListener("load", () => placeholder.remove());
  image.addEventListener("error", () => image.remove());
  media.append(placeholder, image);
  return media;
}

function flipCard(card) {
  if (state.locked || card === state.firstCard || card.classList.contains("is-matched") || card.classList.contains("is-flipped")) return;
  if (!state.timerStarted) startTimer();
  playSound("flip");
  revealCard(card);
  if (!state.firstCard) {
    state.firstCard = card;
    elements.status.textContent = "Eerste kaart geopend. Kies nu een tweede kaart.";
    return;
  }
  state.secondCard = card;
  state.moves += 1;
  state.locked = true;
  updateStats();
  const isMatch = state.firstCard.dataset.pairId === state.secondCard.dataset.pairId && state.firstCard.dataset.type !== state.secondCard.dataset.type;
  if (isMatch) handleMatch(); else handleMismatch();
}

function revealCard(card) {
  const data = getCardData(card);
  const label = data.type === "book" ? `Boek: ${data.pair.book}` : `Schrijver: ${data.pair.author}`;
  card.classList.add("is-flipped");
  card.setAttribute("aria-pressed", "true");
  card.setAttribute("aria-label", label);
}

function concealCard(card) {
  const index = [...elements.board.children].indexOf(card) + 1;
  card.classList.remove("is-flipped");
  card.setAttribute("aria-pressed", "false");
  card.setAttribute("aria-label", `Gesloten memorykaart ${index} van ${state.cards.length}`);
}

function getCardData(card) {
  return state.cards.find((item) => item.uid === card.dataset.uid);
}

function handleMatch() {
  const pair = getCardData(state.firstCard).pair;
  state.firstCard.classList.add("is-matched");
  state.secondCard.classList.add("is-matched");
  state.firstCard.disabled = true;
  state.secondCard.disabled = true;
  state.matches += 1;
  if (state.mode === "versus") state.players[state.currentPlayer].score += 1;
  updateStats();
  updatePlayerUI();
  playSound("match");
  const playerPrefix = state.mode === "versus" ? `${state.players[state.currentPlayer].name} vindt een paar! ` : "Goed! ";
  elements.status.textContent = `${playerPrefix}${pair.book} is geschreven door ${pair.author}.`;
  resetTurn();

  if (gameConfig.showFacts) {
    elements.factTitle.textContent = `${pair.book} is geschreven door ${pair.author}.`;
    elements.factText.textContent = pair.fact;
    openDialog(elements.factDialog);
  }
  if (state.matches === state.pairCount) {
    stopTimer();
    scheduleTask(() => {
      if (elements.factDialog.open) elements.factDialog.close();
      finishGame();
    }, gameConfig.showFacts ? 350 : 700);
  }
}

function handleMismatch() {
  playSound("mismatch");
  const nextPlayer = state.players[state.currentPlayer === 0 ? 1 : 0];
  elements.status.textContent = state.mode === "versus"
    ? `Dat is nog geen paar. Daarna is ${nextPlayer.name} aan de beurt.`
    : "Dat is nog geen paar. De kaarten draaien weer terug.";
  const first = state.firstCard;
  const second = state.secondCard;
  scheduleTask(() => {
    concealCard(first);
    concealCard(second);
    resetTurn();
    if (state.mode === "versus") switchPlayer();
    first.focus({ preventScroll: true });
  }, gameConfig.mismatchDelay);
}

function resetTurn() {
  state.firstCard = null;
  state.secondCard = null;
  state.locked = false;
}

function switchPlayer() {
  state.currentPlayer = state.currentPlayer === 0 ? 1 : 0;
  updatePlayerUI();
  elements.status.textContent = `${state.players[state.currentPlayer].name} is aan de beurt.`;
}

function startTimer() {
  state.timerStarted = true;
  state.timerId = window.setInterval(() => {
    state.seconds += 1;
    elements.timer.textContent = formatTime(state.seconds);
  }, 1000);
}

function stopTimer() {
  if (state.timerId) window.clearInterval(state.timerId);
  state.timerId = null;
}

function scheduleTask(callback, delay) {
  const timeoutId = window.setTimeout(() => {
    state.pendingTimeouts.delete(timeoutId);
    callback();
  }, delay);
  state.pendingTimeouts.add(timeoutId);
  return timeoutId;
}

function clearPendingTasks() {
  state.pendingTimeouts.forEach((timeoutId) => window.clearTimeout(timeoutId));
  state.pendingTimeouts.clear();
}

function updateStats() {
  elements.moves.textContent = String(state.moves);
  elements.matches.textContent = String(state.matches);
  elements.matchTotal.textContent = String(state.pairCount);
  elements.timer.textContent = formatTime(state.seconds);
  elements.moves.closest("div").hidden = !gameConfig.showMoves;
  elements.timerStat.hidden = !gameConfig.showTimer;
}

function updatePlayerUI() {
  const isVersus = state.mode === "versus";
  elements.versusScoreboard.hidden = !isVersus;
  if (!isVersus) return;
  elements.playerScores.forEach((scoreCard, index) => {
    scoreCard.querySelector(".player-name").textContent = state.players[index].name;
    scoreCard.querySelector("strong").textContent = String(state.players[index].score);
    scoreCard.classList.toggle("is-active", index === state.currentPlayer);
  });
  elements.turnIndicator.textContent = `${state.players[state.currentPlayer].name} is aan de beurt`;
}

function finishGame() {
  if (state.mode === "solo") saveBestResult();
  document.querySelector("#final-moves").textContent = String(state.moves);
  document.querySelector("#final-time").textContent = formatTime(state.seconds);
  document.querySelector("#final-matches").textContent = `${state.matches} paren`;
  document.querySelector("#rating").textContent = getRating();
  renderVersusResult();
  showScreen("end-screen");
  playSound("finish");
}

function getRating() {
  if (state.mode === "versus") {
    const [playerOne, playerTwo] = state.players;
    if (playerOne.score === playerTwo.score) return `Gelijkspel: ${playerOne.score} – ${playerTwo.score}`;
    const winner = playerOne.score > playerTwo.score ? playerOne : playerTwo;
    return `${winner.name} wint en staat in de spotlight!`;
  }
  const ratio = state.moves / state.pairCount;
  if (ratio <= 1.55) return "Spotlight-expert";
  if (ratio <= 2.1) return "Boekenkenner";
  if (ratio <= 3) return "Sterke speurder";
  return "Goed volgehouden";
}

function renderVersusResult() {
  const result = document.querySelector("#versus-result");
  result.hidden = state.mode !== "versus";
  if (state.mode !== "versus") return;
  document.querySelector("#final-player-one").textContent = state.players[0].name;
  document.querySelector("#final-player-one-score").textContent = String(state.players[0].score);
  document.querySelector("#final-player-two").textContent = state.players[1].name;
  document.querySelector("#final-player-two-score").textContent = String(state.players[1].score);
}

function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function openDialog(dialog) {
  if (typeof dialog.showModal === "function") dialog.showModal();
  else dialog.setAttribute("open", "");
}

function renderOverview(pairs = gameData) {
  elements.authorGrid.replaceChildren();
  const fragment = document.createDocumentFragment();
  pairs.forEach((pair) => {
    const article = document.createElement("article");
    article.className = "profile";
    article.append(createMedia(pair.authorImage, pair.author, "author", "profile-media"));
    article.append(createMedia(pair.bookImage, pair.book, "book", "profile-media"));
    const title = document.createElement("h2");
    title.textContent = pair.author;
    const book = document.createElement("p");
    book.className = "profile-book";
    book.textContent = pair.book;
    const fact = document.createElement("p");
    fact.className = "profile-fact";
    fact.textContent = pair.fact;
    article.append(title, book, fact);
    fragment.append(article);
  });
  elements.authorGrid.append(fragment);
  showScreen("overview-screen");
}

function getStoredResults() {
  try { return JSON.parse(localStorage.getItem("spotAanResults")) || {}; }
  catch { return {}; }
}

function saveBestResult() {
  const results = getStoredResults();
  const key = String(state.pairCount);
  const previous = results[key] || {};
  results[key] = {
    moves: !previous.moves || state.moves < previous.moves ? state.moves : previous.moves,
    seconds: !previous.seconds || state.seconds < previous.seconds ? state.seconds : previous.seconds
  };
  try { localStorage.setItem("spotAanResults", JSON.stringify(results)); } catch { /* Privémodus mag het spel niet blokkeren. */ }
}

function updateBestScore() {
  if (!gameConfig.showBestScore) {
    elements.bestScore.textContent = "";
    return;
  }
  const selectedMode = document.querySelector('input[name="game-mode"]:checked')?.value || gameConfig.defaultMode;
  if (selectedMode === "versus") {
    elements.bestScore.textContent = "Wie aan het einde de meeste paren heeft, wint.";
    return;
  }
  const count = Number(document.querySelector('input[name="pair-count"]:checked').value);
  const best = getStoredResults()[String(count)];
  elements.bestScore.textContent = best ? `Beste score: ${best.moves} zetten · snelste tijd: ${formatTime(best.seconds)}` : "Nog geen score voor dit spel.";
}

function normalizePlayerName(value, fallback) {
  const cleanName = String(value || "").trim().replace(/\s+/g, " ");
  return cleanName || fallback;
}

function updateModeControls() {
  const mode = document.querySelector('input[name="game-mode"]:checked')?.value || gameConfig.defaultMode;
  document.querySelector("#player-names").hidden = mode !== "versus";
  updateBestScore();
}

function loadPreferences() {
  try {
    const saved = localStorage.getItem("spotAanSound");
    if (saved !== null) state.soundEnabled = saved === "true";
  } catch { state.soundEnabled = gameConfig.useSound; }
  updateSoundButtons();
}

function toggleSound() {
  state.soundEnabled = !state.soundEnabled;
  try { localStorage.setItem("spotAanSound", String(state.soundEnabled)); } catch { /* Geen opslag beschikbaar. */ }
  updateSoundButtons();
}

function updateSoundButtons() {
  elements.soundButtons.forEach((button) => {
    button.setAttribute("aria-pressed", String(state.soundEnabled));
    button.setAttribute("aria-label", state.soundEnabled ? "Geluid uitzetten" : "Geluid aanzetten");
    button.querySelector("[aria-hidden]").textContent = state.soundEnabled ? "🔊" : "🔇";
    const label = button.querySelector(".sound-label");
    if (label) label.textContent = state.soundEnabled ? "Geluid aan" : "Geluid uit";
  });
}

function getFullscreenElement() {
  return document.fullscreenElement || document.webkitFullscreenElement || null;
}

function fullscreenIsSupported() {
  return Boolean(
    document.fullscreenEnabled ||
    document.webkitFullscreenEnabled ||
    document.documentElement.requestFullscreen ||
    document.documentElement.webkitRequestFullscreen
  );
}

async function toggleFullscreen() {
  if (!fullscreenIsSupported()) return;
  try {
    if (getFullscreenElement()) {
      const exitFullscreen = document.exitFullscreen || document.webkitExitFullscreen;
      if (exitFullscreen) await exitFullscreen.call(document);
    } else {
      const requestFullscreen = document.documentElement.requestFullscreen || document.documentElement.webkitRequestFullscreen;
      if (requestFullscreen) {
        await requestFullscreen.call(document.documentElement);
        fullscreenHintDismissed = true;
      }
    }
  } catch {
    elements.fullscreenHint.querySelector("span").textContent = "Fullscreen kon niet worden geopend. Gebruik de fullscreenknop van je browser.";
    elements.fullscreenHint.hidden = false;
  }
  updateFullscreenUI();
}

function updateFullscreenUI() {
  const supported = fullscreenIsSupported();
  const isFullscreen = Boolean(getFullscreenElement());
  elements.fullscreenToggle.hidden = !supported;
  elements.fullscreenToggle.setAttribute("aria-pressed", String(isFullscreen));
  elements.fullscreenToggle.setAttribute("aria-label", isFullscreen ? "Fullscreen afsluiten" : "Fullscreen openen");
  elements.fullscreenToggle.querySelector(".fullscreen-label").textContent = isFullscreen ? "Fullscreen uit" : "Fullscreen";
  elements.fullscreenToggle.querySelector(".fullscreen-icon").textContent = isFullscreen ? "×" : "⛶";
  elements.fullscreenHint.hidden = !supported || isFullscreen || fullscreenHintDismissed;
}

function isTypingTarget(target) {
  return target instanceof HTMLElement && (
    target.matches("input, textarea, select") ||
    target.isContentEditable
  );
}

function playSound(name) {
  if (!gameConfig.useSound || !state.soundEnabled) return;
  /* Eerst kan een lokaal bestand worden gebruikt. Bij ontbreken klinkt een korte Web Audio-toon. */
  const audio = new Audio(audioFiles[name]);
  audio.volume = 0.25;
  audio.play().catch(() => playTone(name));
}

function playTone(name) {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const context = new AudioContext();
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    const frequencies = { flip: 260, match: 520, mismatch: 150, finish: 660 };
    oscillator.frequency.value = frequencies[name] || 300;
    oscillator.type = name === "mismatch" ? "sawtooth" : "sine";
    gain.gain.setValueAtTime(0.06, context.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 0.12);
    oscillator.connect(gain).connect(context.destination);
    oscillator.start();
    oscillator.stop(context.currentTime + 0.12);
    oscillator.addEventListener("ended", () => context.close());
  } catch { /* Geluid is optioneel. */ }
}

function escapeHtml(value) {
  return String(value).replace(/[&<>'"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[character]);
}

document.querySelector("#start-button").addEventListener("click", () => {
  const selected = document.querySelector('input[name="pair-count"]:checked');
  const mode = document.querySelector('input[name="game-mode"]:checked')?.value || gameConfig.defaultMode;
  startGame(selected ? Number(selected.value) : gameConfig.defaultPairs, mode);
});
document.querySelector("#restart-button").addEventListener("click", () => startGame(state.pairCount));
document.querySelector("#play-again").addEventListener("click", () => startGame(state.pairCount));
document.querySelector("#continue-button").addEventListener("click", () => elements.factDialog.close());
document.querySelectorAll('input[name="pair-count"]').forEach((input) => input.addEventListener("change", updateBestScore));
document.querySelectorAll('input[name="game-mode"]').forEach((input) => input.addEventListener("change", updateModeControls));
elements.soundButtons.forEach((button) => button.addEventListener("click", toggleSound));
elements.fullscreenToggle.addEventListener("click", toggleFullscreen);
elements.fullscreenHintButton.addEventListener("click", toggleFullscreen);
elements.fullscreenHintClose.addEventListener("click", () => {
  fullscreenHintDismissed = true;
  elements.fullscreenHint.hidden = true;
});

document.addEventListener("keydown", (event) => {
  if (
    event.key.toLowerCase() !== "f" ||
    event.repeat ||
    event.altKey || event.ctrlKey || event.metaKey ||
    isTypingTarget(event.target) ||
    document.querySelector("dialog[open]")
  ) return;
  event.preventDefault();
  toggleFullscreen();
});

document.addEventListener("fullscreenchange", updateFullscreenUI);
document.addEventListener("webkitfullscreenchange", updateFullscreenUI);

document.addEventListener("click", (event) => {
  const home = event.target.closest('[data-action="home"]');
  if (home) {
    event.preventDefault();
    stopTimer();
    clearPendingTasks();
    resetTurn();
    showScreen("start-screen");
    updateBestScore();
  }
  if (event.target.closest('[data-action="overview"]')) renderOverview(gameData);
  if (event.target.closest('[data-action="overview-used"]')) renderOverview(state.lastGamePairs.length ? state.lastGamePairs : gameData);
  const dialogTrigger = event.target.closest("[data-dialog]");
  if (dialogTrigger) openDialog(document.querySelector(`#${dialogTrigger.dataset.dialog}`));
  if (event.target.closest(".dialog-close") || event.target.closest(".dialog-ok")) event.target.closest("dialog").close();
});

document.querySelector("#clear-scores").addEventListener("click", () => {
  if (window.confirm("Weet je zeker dat je alle beste scores wilt wissen?")) {
    try { localStorage.removeItem("spotAanResults"); } catch { /* Geen opslag beschikbaar. */ }
    updateBestScore();
  }
});

window.addEventListener("pagehide", () => {
  stopTimer();
  clearPendingTasks();
});

/* Kleine, alleen-lezen testhaak voor lokale kwaliteitscontrole. */
window.SpotAan = {
  startGame,
  getSnapshot: () => ({ pairCount: state.pairCount, mode: state.mode, currentPlayer: state.currentPlayer, players: state.players.map((player) => ({ ...player })), moves: state.moves, matches: state.matches, seconds: state.seconds, timerStarted: state.timerStarted, locked: state.locked, cardOrder: state.cards.map((card) => card.uid) }),
  dataCount: gameData.length,
  config: { ...gameConfig }
};

loadPreferences();
updateFullscreenUI();
document.querySelector(`input[name="pair-count"][value="${gameConfig.defaultPairs}"]`).checked = true;
document.querySelector(`input[name="game-mode"][value="${gameConfig.defaultMode}"]`).checked = true;
updateModeControls();
