// ===== EGG BOILING TIMER =====

(function () {
    'use strict';

    // Selection State
    var config = {
        size: 'C0',
        temp: 'fridge',
        doneness: 'medium',
        method: 'boiling',
        stove: 'gas',
        altitude: '0'
    };

    // Physics-calibrated timings map (Seconds)
    // Calibrated for E.U. C1 (~68g) and C0 (~78g) eggs
    var timingData = {
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
    var selectionView = document.getElementById('selection-view');
    var timerView = document.getElementById('timer-view');
    var timeLeftDisplay = document.getElementById('time-left');
    var timerStatus = document.getElementById('timer-status');
    var progressCircle = document.querySelector('.progress-ring__circle');
    var startBtn = document.getElementById('start-btn');
    var testBtn = document.getElementById('test-btn');
    var cancelBtn = document.getElementById('cancel-btn');
    var alarm = document.getElementById('alarm-sound');

    // Progress Ring Constants
    var radius = 110;
    var circumference = 2 * Math.PI * radius;
    progressCircle.style.strokeDasharray = circumference + ' ' + circumference;

    var timerInterval;
    var totalSeconds;
    var currentSeconds;

    // Test sound
    testBtn.addEventListener('click', function () {
        alarm.loop = false;
        alarm.play().catch(function (e) { console.error("Audio block:", e); });
        setTimeout(function () {
            if (!alarm.loop) { alarm.pause(); alarm.currentTime = 0; }
        }, 1000);
    });

    // Bind all chip/doneness interactions
    document.querySelectorAll('.chip, .doneness-card').forEach(function (el) {
        el.addEventListener('click', function () {
            var parent = el.parentElement;
            parent.querySelectorAll('.active').forEach(function (active) {
                active.classList.remove('active');
            });
            el.classList.add('active');

            var value = el.dataset.value;
            var parentId = parent.id;

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
        var seconds = timingData[config.size][config.temp][config.method][config.doneness];

        // Stove Thermal Recovery Offset
        if (config.stove === 'electric' && config.method === 'boiling') seconds += 25;
        if (config.stove === 'electric' && config.method === 'cold') seconds -= 20;

        // Altitude offset: ~+60s per 1000m
        var altitudeMeters = Number(config.altitude);
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
        } else {
            timerStatus.textContent = "Boiling...";
        }

        timerInterval = setInterval(function () {
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
        var offset = circumference - (percent / 100 * circumference);
        progressCircle.style.strokeDashoffset = offset;
    }

    function updateDisplay() {
        var minutes = Math.floor(currentSeconds / 60);
        var seconds = currentSeconds % 60;
        timeLeftDisplay.textContent =
            String(minutes).padStart(2, '0') + ':' + String(seconds).padStart(2, '0');
    }

    function timerFinished() {
        timerStatus.textContent = "Time's up!";
        alarm.loop = true;
        alarm.play();
        timeLeftDisplay.classList.add('finish-animation');

        startBtn.textContent = "Stop Alarm";
        startBtn.style.background = "#eb4d4b";
        startBtn.onclick = function () { resetUI(); };

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

})();
