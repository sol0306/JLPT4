let words = [];
let wordSets = [];
let currentDay = 0;
let currentIndex = 0;
let knownWords = [];
let unknownWords = [];
let currentBatch = [];

fetch('jlpt_n4_words_40.json')
  .then(response => response.json())
  .then(data => {
    words = data;
    wordSets = Array.from({ length: 7 }, (_, i) =>
      words.slice(i * 30, i * 30 + 30)
    );
    createDayButtons();
  });

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function createDayButtons() {
  const container = document.getElementById("day_buttons");
  for (let i = 0; i < wordSets.length; i++) {
    const btn = document.createElement("button");
    btn.innerText = `${i + 1}일차`;
    btn.onclick = () => startDay(i);
    container.appendChild(btn);
  }
}

function startDay(day) {
  currentDay = day;
  currentIndex = 0;
  knownWords = [];
  unknownWords = [];
  currentBatch = shuffle([...wordSets[day]]);
  document.getElementById("start_section").style.display = "none";
  document.getElementById("app_section").style.display = "block";
  nextWord();
}

function nextWord() {
  if (currentIndex >= currentBatch.length) {
    alert("학습 완료! 🎉");
    document.getElementById("app_section").innerHTML = "<h2>오늘의 학습을 마쳤습니다!</h2>";
    return;
  }

  const wordObj = currentBatch[currentIndex];
  document.getElementById("word_display").innerText = `単語: ${wordObj.word}`;
  document.getElementById("kana_text").innerText = wordObj.kana;
  document.getElementById("ko_word").innerText = wordObj.ko_word;

  document.getElementById("kana_display").style.display = "none";
  document.getElementById("jp_display").style.display = "none";
  document.getElementById("btn_show_kana").style.display = "inline-block";
  document.getElementById("btn_show_jp").style.display = "none";
  document.getElementById("btn_ox").style.display = "none";
  document.getElementById("ox_buttons").style.display = "none";
  document.getElementById("btn_next").style.display = "none";

  document.getElementById("progress_info").innerText = 
    `진행: ${currentIndex + 1} / ${currentBatch.length}`;
}

function revealKana() {
  document.getElementById("kana_display").style.display = "block";
  document.getElementById("btn_show_kana").style.display = "none";
  document.getElementById("btn_show_jp").style.display = "inline-block";
}

function revealKorean() {
  document.getElementById("jp_display").style.display = "block";
  document.getElementById("btn_show_jp").style.display = "none";
  document.getElementById("btn_ox").style.display = "inline-block";
}

function showOX() {
  document.getElementById("btn_ox").style.display = "none";
  document.getElementById("ox_buttons").style.display = "flex";
}

function markKnown(known) {
  const wordObj = currentBatch[currentIndex];
  if (known) knownWords.push(wordObj);
  else unknownWords.push(wordObj);

  currentIndex++;
  document.getElementById("btn_next").style.display = "inline-block";
  document.getElementById("ox_buttons").style.display = "none";
}
