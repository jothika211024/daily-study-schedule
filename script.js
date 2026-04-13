let schedules = [];

function addSchedule() {
    let time = document.getElementById("studyTime").value;
    let subject = document.getElementById("subject").value;

    schedules.push({ time, subject });

    let list = document.getElementById("scheduleList");
    let li = document.createElement("li");

    li.innerHTML = `
        ${time} → ${subject}
        <button onclick="finishTask(this)">✅ Finish</button>
        <button onclick="okMessage()">OK</button>
    `;

    list.appendChild(li);

    document.getElementById("studyTime").value = "";
    document.getElementById("subject").value = "";
}

function finishTask(button) {
    let task = button.parentElement;
    task.style.textDecoration = "line-through";
    task.style.opacity = "0.6";
    button.innerText = "✔ Done";
    button.disabled = true;
}

function okMessage() {
    alert("Successfully set the schedule!");
}

setInterval(() => {
    let now = new Date();
    let currentTime = now.toTimeString().slice(0, 5);

    schedules.forEach(schedule => {
        if (schedule.time === currentTime) {
            alert("📚 Time to study " + schedule.subject);
        }
    });
}, 1000);