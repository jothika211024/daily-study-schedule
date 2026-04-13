let schedules = [];
let notifiedTimes = [];
let alarmSound = new Audio("https://www.soundjay.com/buttons/beep-01a.mp3");

if ("Notification" in window) {
    Notification.requestPermission().then(permission => {
        console.log("Notification permission:", permission);
    });
}

function addSchedule() {
    let time = document.getElementById("studyTime").value;
    let subject = document.getElementById("subject").value;

    if (time === "" || subject === "") {
        alert("Please enter time and subject");
        return;
    }

    schedules.push({ time, subject });

    let list = document.getElementById("scheduleList");
    let li = document.createElement("li");

    li.innerHTML = `
        ${time} → ${subject}
        <button onclick="finishTask(this)">✅ Finish</button>
    `;

    list.appendChild(li);

    alert("✅ Schedule added successfully!");

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

setInterval(() => {
    let now = new Date();
    let currentTime = now.toTimeString().slice(0, 5);

    schedules.forEach(schedule => {
        let uniqueKey = schedule.time + "-" + schedule.subject;

        if (
            schedule.time === currentTime &&
            !notifiedTimes.includes(uniqueKey)
        ) {
            alarmSound.play();

            navigator.serviceWorker.ready.then(reg => {
                reg.active.postMessage({
                    type: "SHOW_NOTIFICATION",
                    message: "Time to study " + schedule.subject
                });
            });

            notifiedTimes.push(uniqueKey);
        }
    });
}, 1000);