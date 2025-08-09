const subsInput = document.querySelector(".subject-input");
const durationInput = document.querySelector(".duration-input");
const subsOutput = document.querySelector(".subject-output");
const durationOuput = document.querySelector(".duration-output");
const sessionContainer = document.querySelector(".session-container");
const buttons = document.querySelectorAll("button");
let studyArr = [];

function saveSession() {
  const sessions = localStorage.setItem("mySessions", JSON.stringify(studyArr));
  return sessions;
}

function loadSession() {
  try {
    studyArr = JSON.parse(localStorage.getItem("mySessions")) || [];
  } catch (error) {
    studyArr = [];
    console.error("Failed to pass save sessions", error);
  }
  renderedSessions();
}

function renderedSessions() {
  sessionContainer.innerHTML = studyArr
    .map(
      (session, index) => `<div>${session.subject}</div>
      <div>${session.duration}</div>
      <button onclick="editSession(${index})">Edit Session</button>
      <button onclick="removeSession(${index})">Remove Session</button>
    `
    )
    .join("");
}

function editSession(index) {
  const subjectField = prompt("Subject Field Edit").trim();
  const durationField = Number(prompt("Duration Field Edit"));

  if (!subjectField || !durationField) {
    alert("Invalid edit");
    return;
  } else {
    studyArr[index].subject = subjectField;
    studyArr[index].duration = durationField;
  }
  renderedSessions();
  saveSession();
}

function removeSession(index) {
  const confirmation = confirm("Do you want to delete this session?");
  if (confirmation === true) {
    studyArr.splice(index, 1);
    renderedSessions();
    saveSession();
  }
}

function addSession() {
  const inputValue = subsInput.value.trim();
  const durationValue = durationInput.value.trim();

  if (!inputValue || !Number(durationValue) || durationValue <= 0) {
    alert("Invalid Input");
    return;
  } else {
    studyArr.push({ subject: inputValue, duration: durationValue });
    renderedSessions();
    subsOutput.textContent = inputValue;
    durationOuput.textContent = durationValue;
    subsInput.value = "";
    durationInput.value = "";
    saveSession();
  }
}

function resetAllSessions() {
  studyArr = [];
  subsOutput.textContent = "";
  durationOuput.textContent = "";
  renderedSessions();
}

buttons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    if (e.currentTarget.id === "reset") return resetAllSessions();
    addSession();
    saveSession();
  });
});

loadSession();
