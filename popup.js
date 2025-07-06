let currentDay = 1;


const roadmap = [
  { day: 1, tasks: ["📘 Grammar: Present Simple", "🎧 Listening: Ep.1", "💻 VS Code setup"] },
  { day: 2, tasks: ["📘 Grammar: Present Continuous", "🎧 Listening: Ep.2", "💻 Dashboard UI"] },
  { day: 3, tasks: ["📘 Vocabulary: 50 words", "🎧 Listening: Ep.3", "💻 Portfolio repo"] },
  { day: 4, tasks: ["📘 Grammar: Past Simple", "🎧 Listening: Ep.4", "💻 Contact Form"] },
  { day: 5, tasks: ["📘 Grammar: Future Simple", "🎧 Listening: Ep.5", "💻 About Page"] },
  { day: 6, tasks: ["📘 Revision: Units 1-5", "🎧 Listening: Ep.6", "💻 CSS Animations"] },
  { day: 7, tasks: ["📘 Grammar: Modal Verbs", "🎧 Listening: Ep.7", "💻 Responsive Design"] },
  { day: 8, tasks: ["📘 Vocabulary: 50 words", "🎧 Listening: Ep.8", "💻 Dark Mode toggle"] },
  { day: 9, tasks: ["📘 Grammar: Present Perfect", "🎧 Listening: Ep.9", "💻 API integration"] },
  { day: 10, tasks: ["📘 Revision: Units 6-9", "🎧 Listening: Ep.10", "💻 Project Deploy"] }
];


function loadDay(day) {
  const taskContainer = document.getElementById("tasks");
  taskContainer.innerHTML = "";


  roadmap[day - 1].tasks.forEach(task => {
    const p = document.createElement("p");
    p.textContent = task;
    taskContainer.appendChild(p);
  });

  chrome.storage.local.get(["day" + day], (result) => {
    const statusText = document.createElement("div");
    statusText.style.marginTop = "10px";
    statusText.style.fontWeight = "bold";

    if (result["day" + day] === "completed") {
      statusText.textContent = `✅ Day ${day} Completed`;
      statusText.style.color = "#00ff88";
    } else if (result["day" + day] === "missed") {
      statusText.textContent = `❌ Day ${day} Missed`;
      statusText.style.color = "#ff4d4d";
    } else {
      statusText.textContent = `⏳ Day ${day} In Progress`;
      statusText.style.color = "#ffaa00";
    }
    taskContainer.appendChild(statusText);
  });
}

document.getElementById("prevDay").addEventListener("click", () => {
  if (currentDay > 1) {
    currentDay--;
    loadDay(currentDay);
  }
});


document.getElementById("nextDay").addEventListener("click", () => {
  if (currentDay < roadmap.length) {
    currentDay++;
    loadDay(currentDay);
  }
});


document.getElementById("markDone").addEventListener("click", () => {
  chrome.storage.local.set({ ["day" + currentDay]: "completed" }, () => {
    alert(`✅ Day ${currentDay} marked as completed!`);
    loadDay(currentDay);
  });
});


function scheduleMissedTaskCheck() {
  const now = new Date();
  const nextMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0);
  const msUntilMidnight = nextMidnight - now;

  setTimeout(() => {
    chrome.storage.local.get(["day" + currentDay], (result) => {
      if (!result["day" + currentDay]) {
        chrome.storage.local.set({ ["day" + currentDay]: "missed" }, () => {
          console.log(`❌ Day ${currentDay} automatically marked as missed.`);
        });
      }
      if (currentDay < roadmap.length) {
        currentDay++;
        loadDay(currentDay);
        scheduleMissedTaskCheck();
      }
    });
  }, msUntilMidnight);
}

// Initialize
chrome.storage.local.get(null, (result) => {
  // Find first incomplete day
  for (let i = 1; i <= roadmap.length; i++) {
    if (!result["day" + i] || result["day" + i] === "in progress") {
      currentDay = i;
      break;
    }
  }
  loadDay(currentDay);
  scheduleMissedTaskCheck();
});


let secound = document.querySelector(".secound");
function updateSeconds() {
  const start = new Date("2004-08-21T00:00:00Z");
  function tick() {
    const now = new Date();
    const diff = Math.floor((now - start) / 1000);
    if (secound) secound.textContent = diff;
  }
  tick();
  setInterval(tick, 1000);
}
updateSeconds();
const playlist = [
  { id: "jfKfPfyJRdk", name: "🎧 Lofi Girl – Relax/Study Beats" },
  { id: "7NOSDKb0HlU", name: "🚀 Chill Study Beats – Lofi/Chillhop" },
  { id: "n61ULEU7CO0", name: "🔥 Coding in Flow – Deep Focus" },
  { id: "kgx4WGK0oNU", name: "☕ Morning Coffee – Chill Lofi Beats" },
  { id: "hHW1oY26kxQ", name: "📚 Work & Study – 1 Hour Lofi Mix" },
  { id: "b1hSx1R3B6A", name: "✨ Lofi Coding – Calm Beats" },
  { id: "f02mOEt11OQ", name: "🎹 Soft Piano & Rain – Focus Music" },
  { id: "Q7PzvLwzKMI", name: "🎨 Lofi Girl Coding Session – Chill" }
];


let currentIndex = 0;
const ytPlayer = document.getElementById("ytPlayer");
const currentTrack = document.getElementById("currentTrack");

function loadTrack(index) {
  const videoId = playlist[index].id;
  ytPlayer.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&loop=1&playlist=${videoId}&vq=small`;
  currentTrack.textContent = `🎶 Now Playing: ${playlist[index].name}`;
}

document.getElementById("playBtn").addEventListener("click", () => {
  loadTrack(currentIndex);
});

document.getElementById("pauseBtn").addEventListener("click", () => {
  ytPlayer.src = ""; // stop audio
  currentTrack.textContent = "⏸ Paused";
});

document.getElementById("nextBtn").addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % playlist.length;
  loadTrack(currentIndex);
});