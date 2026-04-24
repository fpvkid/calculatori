// ===== RAW DOG FOOD CALCULATOR =====

(function () {
    'use strict';

    // --- Feeding percentages by life stage and activity ---
    // Returns the % of body weight to feed per day (as a decimal)
    const FEED_RATES = {
        'puppy-young': { low: 0.08, moderate: 0.09, high: 0.10 },
        'puppy-mid':   { low: 0.06, moderate: 0.07, high: 0.08 },
        'puppy-old':   { low: 0.04, moderate: 0.05, high: 0.06 },
        'adult':       { low: 0.02, moderate: 0.025, high: 0.03 },
        'senior':      { low: 0.015, moderate: 0.02, high: 0.025 },
    };

    // Weight goal multipliers
    const GOAL_MULT = {
        maintain: 1.0,
        lose: 0.9,
        gain: 1.1,
    };

    // Ratio split
    const RATIO = {
        meat: 0.80,
        bone: 0.10,
        organ: 0.10,
        liver: 0.05,      // half of organ
        otherOrgan: 0.05,  // other half
    };

    // --- DOM refs ---
    const form = document.getElementById('calc-form');
    const resultsEl = document.getElementById('calc-results');
    const recalcBtn = document.getElementById('recalc-btn');
    const unitBtns = document.querySelectorAll('.unit-btn');

    let currentUnit = 'kg';

    // --- Unit toggle ---
    unitBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
            unitBtns.forEach(function (b) { b.classList.remove('active'); });
            btn.classList.add('active');
            currentUnit = btn.dataset.unit;
        });
    });

    // --- Form submit ---
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        calculate();
    });

    // --- Recalculate ---
    recalcBtn.addEventListener('click', function () {
        resultsEl.classList.add('hidden');
        form.style.display = '';
        form.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    // --- Core calculation ---
    function calculate() {
        var weightInput = parseFloat(document.getElementById('dog-weight').value);
        var stage = document.getElementById('life-stage').value;
        var activityEl = document.querySelector('input[name="activity"]:checked');
        var goal = document.getElementById('weight-goal').value;

        // Validation
        if (!weightInput || weightInput <= 0) {
            shakeField('fg-weight');
            return;
        }
        if (!stage) {
            shakeField('fg-stage');
            return;
        }
        if (!activityEl) {
            shakeField('fg-activity');
            return;
        }

        var activity = activityEl.value;

        // Convert to kg if needed
        var weightKg = currentUnit === 'lb' ? weightInput * 0.453592 : weightInput;

        // Get feeding rate
        var rate = FEED_RATES[stage][activity];
        var goalMult = GOAL_MULT[goal];
        var dailyTotalKg = weightKg * rate * goalMult;
        var dailyTotalG = Math.round(dailyTotalKg * 1000);

        // Break down by ratio
        var meatG = Math.round(dailyTotalG * RATIO.meat);
        var boneG = Math.round(dailyTotalG * RATIO.bone);
        var organG = Math.round(dailyTotalG * RATIO.organ);
        var liverG = Math.round(dailyTotalG * RATIO.liver);
        var otherOrganG = Math.round(dailyTotalG * RATIO.otherOrgan);

        // Oz conversion
        var dailyTotalOz = (dailyTotalG / 28.3495).toFixed(1);
        var meatOz = (meatG / 28.3495).toFixed(1);
        var boneOz = (boneG / 28.3495).toFixed(1);
        var organOz = (organG / 28.3495).toFixed(1);
        var liverOz = (liverG / 28.3495).toFixed(1);
        var otherOz = (otherOrganG / 28.3495).toFixed(1);

        // Populate results based on unit preference
        if (currentUnit === 'lb') {
            document.getElementById('total-grams').textContent = dailyTotalOz;
            document.querySelector('.result-total .result-card-unit').textContent = 'oz / day';
            document.getElementById('total-oz').textContent = '(' + dailyTotalG + ' grams)';

            document.getElementById('meat-grams').textContent = meatOz;
            document.querySelector('.result-meat .result-card-unit').textContent = 'oz';

            document.getElementById('bone-grams').textContent = boneOz;
            document.querySelector('.result-bone .result-card-unit').textContent = 'oz';

            document.getElementById('organ-grams').textContent = organOz;
            document.querySelector('.result-organ .result-card-unit').textContent = 'oz';
            
            document.getElementById('liver-grams').textContent = liverOz;
            document.getElementById('other-organ-grams').textContent = otherOz;
            document.querySelector('.result-organ .result-card-info').innerHTML = 
                liverOz + ' oz liver + ' + otherOz + ' oz kidney/spleen';
        } else {
            document.getElementById('total-grams').textContent = dailyTotalG;
            document.querySelector('.result-total .result-card-unit').textContent = 'grams / day';
            document.getElementById('total-oz').textContent = '(' + dailyTotalOz + ' oz)';

            document.getElementById('meat-grams').textContent = meatG;
            document.querySelector('.result-meat .result-card-unit').textContent = 'grams';

            document.getElementById('bone-grams').textContent = boneG;
            document.querySelector('.result-bone .result-card-unit').textContent = 'grams';

            document.getElementById('organ-grams').textContent = organG;
            document.querySelector('.result-organ .result-card-unit').textContent = 'grams';
            
            document.getElementById('liver-grams').textContent = liverG;
            document.getElementById('other-organ-grams').textContent = otherOrganG;
            document.querySelector('.result-organ .result-card-info').innerHTML = 
                liverG + ' g liver + ' + otherOrganG + ' g kidney/spleen';
        }

        // Summary text
        var stageLabel = document.getElementById('life-stage').options[document.getElementById('life-stage').selectedIndex].text;
        var pctDisplay = (rate * 100 * goalMult).toFixed(1);
        var weightDisplay = currentUnit === 'lb'
            ? weightInput + ' lb'
            : weightInput + ' kg';

        document.getElementById('results-summary').textContent =
            stageLabel + ', ' + activity + ' activity, ' + weightDisplay + ' — feeding ' + pctDisplay + '% of body weight.';

        // Weekly table
        var tbody = document.getElementById('weekly-tbody');
        tbody.innerHTML = '';
        
        var rows = currentUnit === 'lb' ? [
            ['Total food', dailyTotalOz + ' oz', (dailyTotalOz * 7).toFixed(1) + ' oz (' + (dailyTotalOz * 7 / 16).toFixed(2) + ' lbs)'],
            ['Muscle meat (80%)', meatOz + ' oz', (meatOz * 7).toFixed(1) + ' oz'],
            ['Edible bone (10%)', boneOz + ' oz', (boneOz * 7).toFixed(1) + ' oz'],
            ['Liver (5%)', liverOz + ' oz', (liverOz * 7).toFixed(1) + ' oz'],
            ['Other organ (5%)', otherOz + ' oz', (otherOz * 7).toFixed(1) + ' oz'],
        ] : [
            ['Total food', dailyTotalG + ' g', (dailyTotalG * 7 / 1000).toFixed(2) + ' kg'],
            ['Muscle meat (80%)', meatG + ' g', (meatG * 7 / 1000).toFixed(2) + ' kg'],
            ['Edible bone (10%)', boneG + ' g', (boneG * 7 / 1000).toFixed(2) + ' kg'],
            ['Liver (5%)', liverG + ' g', (liverG * 7 / 1000).toFixed(2) + ' g'],
            ['Other organ (5%)', otherOrganG + ' g', (otherOrganG * 7 / 1000).toFixed(2) + ' g'],
        ];

        rows.forEach(function (row) {
            var tr = document.createElement('tr');
            tr.innerHTML =
                '<td>' + row[0] + '</td>' +
                '<td>' + row[1] + '</td>' +
                '<td>' + row[2] + '</td>';
            tbody.appendChild(tr);
        });

        // Show results, hide form
        form.style.display = 'none';
        resultsEl.classList.remove('hidden');

        // Scroll to results
        resultsEl.scrollIntoView({ behavior: 'smooth', block: 'start' });

        // Animate the numbers counting up
        animateNumbers();
    }

    // --- Shake animation for invalid fields ---
    function shakeField(id) {
        var el = document.getElementById(id);
        if (!el) return;
        el.style.animation = 'none';
        el.offsetHeight; // reflow
        el.style.animation = 'shake 0.4s ease';
        setTimeout(function () { el.style.animation = ''; }, 500);
    }

    // Add shake keyframes dynamically
    var shakeStyle = document.createElement('style');
    shakeStyle.textContent =
        '@keyframes shake { 0%, 100% { transform: translateX(0); } 20%, 60% { transform: translateX(-6px); } 40%, 80% { transform: translateX(6px); } }';
    document.head.appendChild(shakeStyle);

    // --- Count-up animation ---
    function animateNumbers() {
        var cards = document.querySelectorAll('.result-card-value');
        cards.forEach(function (card) {
            var target = parseInt(card.textContent, 10);
            if (isNaN(target) || target === 0) return;

            var start = 0;
            var duration = 600;
            var startTime = null;

            function step(time) {
                if (!startTime) startTime = time;
                var progress = Math.min((time - startTime) / duration, 1);
                // ease-out cubic
                var eased = 1 - Math.pow(1 - progress, 3);
                card.textContent = Math.round(eased * target);
                if (progress < 1) {
                    requestAnimationFrame(step);
                }
            }

            requestAnimationFrame(step);
        });
    }

    // --- Smooth scroll offset for fixed header ---
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            var targetId = this.getAttribute('href');
            if (targetId === '#') return;
            var targetEl = document.querySelector(targetId);
            if (!targetEl) return;
            e.preventDefault();
            var offset = 80; // header height + padding
            var top = targetEl.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({ top: top, behavior: 'smooth' });
        });
    });

    // --- Header background on scroll ---
    var header = document.getElementById('site-header');
    if (header) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 30) {
                header.style.background = 'rgba(12, 15, 20, 0.95)';
            } else {
                header.style.background = 'rgba(12, 15, 20, 0.85)';
            }
        }, { passive: true });
    }

})();
