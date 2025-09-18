import { 
  doc, setDoc, getDoc, updateDoc, onSnapshot, arrayUnion 
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";
import { db } from "./firebase.js";

let currentGameId = null;
let currentPlayerName = "Player" + Math.floor(Math.random()*1000);
let currentTeam = null;

// HTML references
const lobbyScreen = document.getElementById("lobbyScreen");
const teamScreen = document.getElementById("teamScreen");
const gameScreen = document.getElementById("gameScreen");
const createGameBtn = document.getElementById("createGameBtn");
const joinGameBtn = document.getElementById("joinGameBtn");
const joinCodeInput = document.getElementById("joinCodeInput");
const joinWhiteBtn = document.getElementById("joinWhiteBtn");
const joinBlackBtn = document.getElementById("joinBlackBtn");
const logBtn = document.getElementById("logBtn");
const logModal = document.getElementById("logModal");
const closeLog = logModal.querySelector(".close");
const logContent = document.getElementById("logContent");

// --- GAME FLOW ---
createGameBtn.onclick = async () => {
  currentGameId = Math.random().toString(36).substring(2,7).toUpperCase();
  await setDoc(doc(db, "games", currentGameId), {
    createdAt: Date.now(),
    players: {},
    logs: []
  });
  lobbyScreen.style.display = "none";
  teamScreen.style.display = "block";
};

joinGameBtn.onclick = async () => {
  const code = joinCodeInput.value.trim().toUpperCase();
  const gameDoc = await getDoc(doc(db, "games", code));
  if (gameDoc.exists()) {
    currentGameId = code;
    lobbyScreen.style.display = "none";
    teamScreen.style.display = "block";
  } else {
    alert("Game not found");
  }
};

joinWhiteBtn.onclick = () => joinTeam("white");
joinBlackBtn.onclick = () => joinTeam("black");

async function joinTeam(team) {
  currentTeam = team;
  await updateDoc(doc(db, "games", currentGameId), {
    [`players.${currentPlayerName}`]: team
  });
  teamScreen.style.display = "none";
  gameScreen.style.display = "block";
  listenToGame();
}

// --- LISTEN TO CHANGES ---
function listenToGame() {
  const gameRef = doc(db, "games", currentGameId);
  onSnapshot(gameRef, (snap) => {
    const data = snap.data();
    renderLog(data.logs);
  });
}

// --- LOGGING ---
export async function logAction(text) {
  const gameRef = doc(db, "games", currentGameId);
  await updateDoc(gameRef, {
    logs: arrayUnion(`${currentPlayerName}: ${text}`)
  });
}

function renderLog(logs) {
  if (!logs) return;
  let output = "";

  // Separate words (by page) from notes
  const wordLogs = logs.filter(l => l.includes("added word"));
  const noteLogs = logs.filter(l => l.includes("note"));

  for (let p=1; p<=8; p++) {
    output += `=== Shared Words (Page ${p}) ===\n`;
    const pageLogs = wordLogs.filter(l => l.includes(`Page${p}`));
    if (pageLogs.length === 0) {
      output += "  (empty)\n\n";
    } else {
      pageLogs.forEach(l => output += "  " + l + "\n");
      output += "\n";
    }
  }

  if (noteLogs.length > 0) {
    output += "\n────────── Notes ──────────\n\n";
    for (let panel=1; panel<=4; panel++) {
      output += `=== Panel ${panel} ===\n`;
      noteLogs
        .filter(l => l.includes(`Panel${panel}`))
        .forEach(l => output += "  " + l + "\n");
      output += "\n";
    }
  }

  logContent.textContent = output;
}

// --- LOG MODAL ---
logBtn.onclick = () => logModal.classList.add("show");
closeLog.onclick = () => logModal.classList.remove("show");
