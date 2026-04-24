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
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mainNav = document.getElementById('main-nav');

    let currentUnit = 'kg';

    // --- Unit toggle ---
    unitBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
            unitBtns.forEach(function (b) { b.classList.remove('active'); });
            btn.classList.add('active');
            currentUnit = btn.dataset.unit;
        });
    });

    // --- Mobile menu ---
    if (menuBtn && mainNav) {
        menuBtn.addEventListener('click', function () {
            var isOpen = mainNav.classList.toggle('open');
            menuBtn.classList.toggle('active');
            menuBtn.setAttribute('aria-expanded', isOpen);
        });

        // Close on link click
        mainNav.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                mainNav.classList.remove('open');
                menuBtn.classList.remove('active');
                menuBtn.setAttribute('aria-expanded', 'false');
            });
        });
    }

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

        // Populate results
        document.getElementById('total-grams').textContent = dailyTotalG;
        document.getElementById('total-oz').textContent = dailyTotalOz + ' oz';
        document.getElementById('meat-grams').textContent = meatG;
        document.getElementById('bone-grams').textContent = boneG;
        document.getElementById('organ-grams').textContent = organG;
        document.getElementById('liver-grams').textContent = liverG;
        document.getElementById('other-organ-grams').textContent = otherOrganG;

        // Summary text
        var stageLabel = document.getElementById('life-stage').options[document.getElementById('life-stage').selectedIndex].text;
        var pctDisplay = (rate * 100 * goalMult).toFixed(1);
        var weightDisplay = currentUnit === 'lb'
            ? weightInput + ' lb (' + weightKg.toFixed(1) + ' kg)'
            : weightInput + ' kg';

        document.getElementById('results-summary').textContent =
            stageLabel + ', ' + activity + ' activity, ' + weightDisplay + ' — feeding ' + pctDisplay + '% of body weight.';

        // Weekly table
        var tbody = document.getElementById('weekly-tbody');
        tbody.innerHTML = '';
        var rows = [
            ['Total food', dailyTotalG, dailyTotalG * 7],
            ['Muscle meat (80%)', meatG, meatG * 7],
            ['Edible bone (10%)', boneG, boneG * 7],
            ['Liver (5%)', liverG, liverG * 7],
            ['Other organ (5%)', otherOrganG, otherOrganG * 7],
        ];

        rows.forEach(function (row) {
            var tr = document.createElement('tr');
            tr.innerHTML =
                '<td>' + row[0] + '</td>' +
                '<td>' + row[1] + ' g</td>' +
                '<td>' + row[2] + ' g (' + (row[2] / 1000).toFixed(2) + ' kg)</td>';
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
    window.addEventListener('scroll', function () {
        if (window.scrollY > 30) {
            header.style.background = 'rgba(12, 15, 20, 0.95)';
        } else {
            header.style.background = 'rgba(12, 15, 20, 0.85)';
        }
    }, { passive: true });

})();
