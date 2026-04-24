// Selection State
let config = {
    size: 'C1',
    temp: 'fridge',
    doneness: 'medium',
    method: 'boiling',
    stove: 'gas',
    altitude: '0'
};

// Physics-calibrated timings map (Seconds)
// These represent the 'Gold Standard' for E.U. C1 (~68g) and C0 (~78g) eggs
const timingData = {
    'C1': {
        'fridge': {
            'boiling': { soft: 360, medium: 470, hard: 660 },
            'cold':    { soft: 180, medium: 360, hard: 580 }
        },
        'room': {
            'boiling': { soft: 300, medium: 410, hard: 600 },
            'cold':    { soft: 140, medium: 310, hard: 520 }
        }
    },
    'C0': {
        'fridge': {
            'boiling': { soft: 410, medium: 530, hard: 750 },
            'cold':    { soft: 240, medium: 420, hard: 660 }
        },
        'room': {
            'boiling': { soft: 350, medium: 470, hard: 690 },
            'cold':    { soft: 200, medium: 370, hard: 600 }
        }
    }
};

// UI Elements
const selectionView = document.getElementById('selection-view');
const timerView = document.getElementById('timer-view');
const timeLeftDisplay = document.getElementById('time-left');
const timerStatus = document.getElementById('timer-status');
const progressCircle = document.querySelector('.progress-ring__circle');
const startBtn = document.getElementById('start-btn');
const testBtn = document.getElementById('test-btn');
const cancelBtn = document.getElementById('cancel-btn');
const alarm = document.getElementById('alarm-sound');

// Initialization
testBtn.addEventListener('click', () => {
    alarm.loop = false;
    alarm.play().catch(e => console.error("Audio block:", e));
    setTimeout(() => { if (!alarm.loop) { alarm.pause(); alarm.currentTime = 0; } }, 1000);
});

// Progress Ring Constants
const radius = 110;
const circumference = 2 * Math.PI * radius;
progressCircle.style.strokeDasharray = `${circumference} ${circumference}`;

let timerInterval;
let totalSeconds;
let currentSeconds;

// Bind all interaction events
document.querySelectorAll('.chip, .doneness-card').forEach(el => {
    el.addEventListener('click', (e) => {
        const parent = el.parentElement;
        parent.querySelectorAll('.active').forEach(active => active.classList.remove('active'));
        el.classList.add('active');

        const value = el.dataset.value;
        const parentId = parent.id;
        
        if (parentId === 'size-chips') config.size = value;
        if (parentId === 'temp-chips') config.temp = value;
        if (parentId === 'method-chips') config.method = value;
        if (parentId === 'stove-chips') config.stove = value;
        if (parentId === 'altitude-chips') config.altitude = value;
        if (el.classList.contains('doneness-card')) config.doneness = value;
    });
});

startBtn.addEventListener('click', startTimer);
cancelBtn.addEventListener('click', resetUI);

function calculateSeconds() {
    let seconds = timingData[config.size][config.temp][config.method][config.doneness];

    // Stove Thermal Recovery Offset
    if (config.stove === 'electric' && config.method === 'boiling') seconds += 25; 
    if (config.stove === 'electric' && config.method === 'cold') seconds -= 20; 

    // Altitude Physics Offset (Lower pressure = Lower boiling point = Slower cooking)
    // Rule: Approx +60s per 1000m for boiled eggs
    const altitudeMeters = Number(config.altitude);
    if (altitudeMeters > 0) {
        seconds += Math.round((altitudeMeters / 1000) * 60);
    }

    return seconds;
}

function startTimer() {
    totalSeconds = calculateSeconds();
    currentSeconds = totalSeconds;
    
    updateDisplay();
    setProgress(0);

    selectionView.classList.add('hidden');
    timerView.classList.remove('hidden');
    
    if (config.method === 'cold') {
        timerStatus.textContent = "Wait for boil, then start!";
        // In real use, cold start timer usually manual, but we'll run it as "boiling phase"
    } else {
        timerStatus.textContent = "Boiling...";
    }

    timerInterval = setInterval(() => {
        currentSeconds--;
        updateDisplay();
        setProgress(((totalSeconds - currentSeconds) / totalSeconds) * 100);

        if (currentSeconds <= 0) {
            clearInterval(timerInterval);
            timerFinished();
        }
    }, 1000);
}

function setProgress(percent) {
    const offset = circumference - (percent / 100 * circumference);
    progressCircle.style.strokeDashoffset = offset;
}

function updateDisplay() {
    const minutes = Math.floor(currentSeconds / 60);
    const seconds = currentSeconds % 60;
    timeLeftDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function timerFinished() {
    timerStatus.textContent = "Time's up!";
    alarm.loop = true;
    alarm.play();
    timeLeftDisplay.classList.add('finish-animation');
    
    startBtn.textContent = "Stop Alarm";
    startBtn.style.background = "#eb4d4b";
    startBtn.onclick = () => resetUI();
    
    if ("vibrate" in navigator) {
        navigator.vibrate([500, 200, 500, 200, 500, 200, 500]);
    }
}

function resetUI() {
    clearInterval(timerInterval);
    alarm.pause();
    alarm.currentTime = 0;
    alarm.loop = false;
    
    timeLeftDisplay.classList.remove('finish-animation');
    selectionView.classList.remove('hidden');
    timerView.classList.add('hidden');
    
    // Restore start button
    startBtn.textContent = "Start Timer";
    startBtn.style.background = "";
    startBtn.onclick = startTimer;
}
