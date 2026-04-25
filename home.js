/**
 * CalcsFor.Life — Homepage Logic
 * Category grid, calculator directory, search + filter
 */
(function () {
    'use strict';

    /* ====== DATA ====== */
    const categories = [
        { id: 'pets',     icon: '🐾', name: 'Pets & Animals' },
        { id: 'kitchen',  icon: '🍳', name: 'Kitchen & Cooking' },
        { id: 'health',   icon: '🏋️', name: 'Health & Fitness' },
        { id: 'home',     icon: '🏠', name: 'Home & DIY' },
        { id: 'garden',   icon: '🌱', name: 'Garden & Plants' },
        { id: 'finance',  icon: '💰', name: 'Finance & Math' },
        { id: 'craft',    icon: '🧵', name: 'Craft & Hobby' },
        { id: 'time',     icon: '⏱️', name: 'Time & Productivity' },
        { id: 'auto',     icon: '🚗', name: 'Auto & Travel' },
        { id: 'fun',      icon: '🍺', name: 'Fun & Niche' },
        { id: 'timers',   icon: '⏲️', name: 'Focus & Timers' },
    ];

    const calculators = [
        // ---- Pets ----
        { title: 'Raw Dog Food Calculator', slug: 'raw-dog-food-calculator', icon: '🥩', cat: 'pets', desc: 'Daily raw feeding portions using the 80/10/10 BARF ratio.', live: true },
        { title: 'Dog Age Calculator', slug: 'dog-age-calculator', icon: '🐕', cat: 'pets', desc: 'Accurate dog-to-human age conversion using breed-adjusted science.', live: true },
        { title: 'Puppy Weight Predictor', slug: 'puppy-weight-calculator', icon: '🐕‍🦺', cat: 'pets', desc: 'Predict your dog\'s adult weight based on current growth and breed size.', live: true },
        { title: 'Cat Calorie Calculator', slug: 'cat-calorie-calculator', icon: '🐱', cat: 'pets', desc: 'How many calories your cat needs based on weight and activity.', live: true },
        { title: 'Aquarium Volume Calculator', slug: 'aquarium-volume-calculator', icon: '🐠', cat: 'pets', desc: 'Calculate gallons or liters for any tank shape.', live: true },
        { title: 'Pet Food Switch Calculator', slug: 'pet-food-switch', icon: '🥣', cat: 'pets', desc: 'Daily mix ratios for a safe 7-day transition to new food.', live: true },

        // ---- Kitchen ----
        { title: 'Egg Boiling Timer', slug: 'egg-boiling-timer', icon: '🥚', cat: 'kitchen', desc: 'Precise egg timer adjusted for size, altitude, and starting temperature.', live: true },
        { title: 'Sourdough Hydration Calculator', slug: 'sourdough-hydration-calculator', icon: '🍞', cat: 'kitchen', desc: 'Calculate baker\'s percentages and hydration for your sourdough recipe.', live: true },
        { title: 'Air Fryer vs Oven Converter', slug: 'air-fryer-converter', icon: '🌬️', cat: 'kitchen', desc: 'Convert recipe time and temp from conventional oven to air fryer.', live: true },
        { title: 'Pizza Party Calculator', slug: 'pizza-party-calc', icon: '🍕', cat: 'kitchen', desc: 'How many pizzas to order based on guest count and age.', live: true },
        { title: 'Coffee-to-Water Ratio Calculator', slug: 'coffee-ratio-calculator', icon: '☕', cat: 'kitchen', desc: 'Brew ratios for pour-over, French press, AeroPress, and espresso.', live: true },
        { title: 'Brine Calculator', slug: 'brine-calculator', icon: '🥒', cat: 'kitchen', desc: 'Salt-to-water brine percentages for fermentation and pickling.', live: true },
        { title: 'Butter-to-Oil Conversion', slug: 'butter-oil-conversion', icon: '🧈', cat: 'kitchen', desc: 'Substitute butter for oil (or vice versa) in any recipe.', live: true },

        // ---- Health ----
        { title: 'Protein Intake Calculator', slug: 'protein-intake-calculator', icon: '💪', cat: 'health', desc: 'Daily protein needs based on lean mass and activity.', live: true },
        { title: 'Water Intake Calculator', slug: 'water-intake-calculator', icon: '💧', cat: 'health', desc: 'How much water you should drink daily based on weight and climate.', live: true },
        { title: 'Macro Calculator', slug: 'macro-calculator', icon: '📊', cat: 'health', desc: 'Protein, carbs, and fat split for cutting, bulking, or maintenance.', live: true },
        { title: 'BMI Calculator', slug: 'bmi-calculator', icon: '⚖️', cat: 'health', desc: 'Check your Body Mass Index and healthy weight range.', live: true },
        { title: 'Heart Age Calculator', slug: 'heart-age-calculator', icon: '❤️', cat: 'health', desc: 'Is your heart older than you? Find your cardio health age.', live: true },
        { title: 'VO2 Max Calculator', slug: 'vo2-max-calculator', icon: '🫁', cat: 'health', desc: 'Estimate your aerobic fitness and oxygen capacity.', live: true },
        { title: 'Sleep Apnea (AHI) Test', slug: 'ahi-calculator', icon: '😴', cat: 'health', desc: 'Screening test for sleep apnea risk and snoring.', live: true },
        { title: 'TDEE Calculator', slug: 'tdee-calculator', icon: '🔥', cat: 'health', desc: 'Calculate your total daily maintenance calories.', live: true },
        { title: 'Sleep Cycle Calculator', slug: 'sleep-cycle-calculator', icon: '🌙', cat: 'health', desc: 'When to sleep or wake up to align with 90min cycles.', live: true },

        // ---- Home ----
        { title: 'Moving Box Calculator', slug: 'moving-box-calculator', icon: '📦', cat: 'home', desc: 'Estimate how many boxes you need by house or room size.', live: true },
        { title: 'Wallpaper Calculator', slug: 'wallpaper-calculator', icon: '🎨', cat: 'home', desc: 'Number of wallpaper rolls you need by room dimensions.', live: true },
        { title: 'Concrete Volume Calculator', slug: 'concrete-calculator', icon: '🧱', cat: 'home', desc: 'Cubic feet/meters of concrete for slabs and footings.', live: true },
        { title: 'Electricity Cost Calculator', slug: 'electricity-cost-calculator', icon: '⚡', cat: 'home', desc: 'Monthly or yearly cost to run any appliance.', live: true },
        { title: 'Fence Material Calculator', slug: 'fence-calculator', icon: '🏗️', cat: 'home', desc: 'Boards, posts, and rails for your fence project.', live: true },
        { title: 'ADU Cost Calculator', slug: 'adu-cost-calculator', icon: '🏡', cat: 'home', desc: 'Estimate the budget for building a guest house or granny flat.', live: true },
        { title: 'Window Replacement Cost', slug: 'window-replacement-cost', icon: '🪟', cat: 'home', desc: 'Estimate the cost of new windows and installation.', live: true },
        { title: 'Hurricane Shutter Cost', slug: 'hurricane-shutter-calculator', icon: '🌀', cat: 'home', desc: 'Storm protection pricing for your windows and doors.', live: true },

        // ---- Garden ----
        { title: 'Raised Bed Soil Calculator', slug: 'raised-bed-soil-calculator', icon: '🌻', cat: 'garden', desc: 'Cubic feet of soil mix for your raised garden bed.', live: true },
        { title: 'House Plant Soil & Pot', slug: 'potting-soil-calculator', icon: '🪴', cat: 'garden', desc: 'Calculate how many liters/bags for your indoor pots.', live: true },
        { title: 'Seed Spacing Calculator', slug: 'seed-spacing-calculator', icon: '🌱', cat: 'garden', desc: 'How far apart to plant and how many seeds per bed.', live: true },
        { title: 'Compost Ratio Calculator', slug: 'compost-ratio-calculator', icon: '♻️', cat: 'garden', desc: 'Green-to-brown ratio for healthy composting.', live: true },

        // ---- Finance ----
        { title: 'Road Trip Fuel Split', slug: 'fuel-split-calculator', icon: '⛽', cat: 'finance', desc: 'Split the gas cost fairly with friends on any trip.', live: true },
        { title: 'Wedding Alcohol Calculator', slug: 'wedding-drink-calc', icon: '🍾', cat: 'finance', desc: 'Bottle counts for beer, wine, and spirits for your event.', live: true },
        { title: 'Rent Affordability Calculator', slug: 'rent-calculator', icon: '🏠', cat: 'finance', desc: 'How much rent you can afford based on income.', live: true },
        { title: 'Discount Calculator', slug: 'discount-calculator', icon: '🔖', cat: 'finance', desc: 'Final price after percentage or flat discount.', live: true },
        { title: 'Mortgage Calculator', slug: 'mortgage-calculator', icon: '🏦', cat: 'finance', desc: 'Estimate monthly mortgage payments and interest.', live: true },
        { title: 'ARV Calculator', slug: 'arv-calculator', icon: '📈', cat: 'finance', desc: 'After Repair Value & MAO estimate for house flipping.', live: true },
        { title: 'KDP Royalty Calculator', slug: 'book-royalty-calculator', icon: '📚', cat: 'finance', desc: 'Estimate Amazon KDP profits for ebooks and paperbacks.', live: true },
        { title: 'ROAS & Ad ROI', slug: 'roas-calculator', icon: '🎯', cat: 'finance', desc: 'Measure the profitability of your marketing campaigns.', live: true },
        { title: 'Grade Calculator', slug: 'grade-calculator', icon: '🎓', cat: 'finance', desc: 'Calculate weighted class grades and final exam needs.', live: true },
        { title: 'Percentage Calculator', slug: 'percentage-calculator', icon: '🔢', cat: 'finance', desc: 'Quickly solve percentage increase, decrease, and common math.', live: true },

        // ---- Craft ----
        { title: 'Fabric Yardage Calculator', slug: 'fabric-calculator', icon: '🧵', cat: 'craft', desc: 'How much fabric for a garment or furniture by size and type.', live: true },
        { title: 'Resin Volume Calculator', slug: 'resin-volume-calculator', icon: '💎', cat: 'craft', desc: 'How much epoxy resin for your mold or surface.', live: true },
        { title: 'Aida Cloth Size', slug: 'aida-cloth-calculator', icon: '🧵', cat: 'craft', desc: 'Fabric dimensions for cross-stitch based on stitch count.', live: true },
        { title: 'Candle Wax Calculator', slug: 'candle-wax-calculator', icon: '🕯️', cat: 'craft', desc: 'Wax weight by container volume for candle making.', live: true },

        // ---- Time ----
        { title: 'Meeting Cost Calculator', slug: 'meeting-cost-calculator', icon: '🤝', cat: 'time', desc: 'How much this meeting is costing your company.', live: true },
        { title: 'Freelance Rate Calculator', slug: 'freelance-rate-calculator', icon: '📋', cat: 'time', desc: 'Calculate your hourly rate from desired yearly income.', live: true },

        // ---- Timers ----
        { title: 'Zen Meditation Timer', slug: 'meditation-timer', icon: '🧘', cat: 'timers', desc: 'Customizable focus sessions with minimalist visual cues.', live: true },
        { title: 'Pomodoro Productivity Timer', slug: 'pomodoro-timer', icon: '🍅', cat: 'timers', desc: 'Work in 25-minute sprints to boost focus and avoid burnout.', live: true },
        { title: 'Perfect Steak Timer', slug: 'steak-timer', icon: '🥩', cat: 'timers', desc: 'Timed guidance for Rare, Medium, and Well-done steaks.', live: true },
        { title: 'Yoga Interval Timer', slug: 'yoga-timer', icon: '🤸', cat: 'timers', desc: 'Set pose durations and transitions for a perfect home flow.', live: true },

        // ---- Auto ----
        { title: 'Car Depreciation Estimate', slug: 'car-depreciation-calculator', icon: '📉', cat: 'auto', desc: 'Estimate future value and total cost of ownership.', live: true },
        { title: 'EV Charging Time Calculator', slug: 'ev-charging-calculator', icon: '🔋', cat: 'auto', desc: 'How long to charge your EV at different power levels.', live: true },

        // ---- Fun ----
        { title: 'Alcohol Dilution Calculator', slug: 'alcohol-dilution-calculator', icon: '🍶', cat: 'fun', desc: 'Dilute spirits to a target ABV percentage.', live: true },
        { title: 'BAC Estimate Calculator', slug: 'bac-calculator', icon: '🍺', cat: 'fun', desc: 'Estimate blood alcohol content from drinks and time.', live: true },
        { title: 'OSRS Agility Calculator', slug: 'osrs-agility-calculator', icon: '🏃', cat: 'fun', desc: 'Calculate laps to your next Agility level in Old School RuneScape.', live: true },
    ];

    /* ====== HERO TYPING EFFECT ====== */
    const typedWords = ['everything', 'your dog\'s diet', 'the perfect egg', 'your next move', 'brew ratios', 'daily macros', 'party planning'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typedEl = document.getElementById('hero-typed');

    function typeLoop() {
        const word = typedWords[wordIndex] || 'everything';
        if (isDeleting) {
            charIndex--;
            typedEl.textContent = word.substring(0, charIndex);
            if (charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % typedWords.length;
                setTimeout(typeLoop, 400);
                return;
            }
            setTimeout(typeLoop, 40);
        } else {
            charIndex++;
            typedEl.textContent = word.substring(0, charIndex);
            if (charIndex === word.length) {
                isDeleting = true;
                setTimeout(typeLoop, 2000);
                return;
            }
            setTimeout(typeLoop, 70);
        }
    }
    if (typedEl) setTimeout(typeLoop, 1500);

    /* ====== RENDER CATEGORIES ====== */
    const catGrid = document.getElementById('cat-grid');
    if (catGrid) {
        categories.forEach(function (cat) {
            const count = calculators.filter(c => c.cat === cat.id).length;
            const card = document.createElement('button');
            card.className = 'cat-card';
            card.dataset.cat = cat.id;
            card.innerHTML = `
                <span class="cat-card-icon">${cat.icon}</span>
                <span class="cat-card-name">${cat.name}</span>
                <span class="cat-card-count">${count} tool${count !== 1 ? 's' : ''}</span>
            `;
            card.addEventListener('click', function () {
                filterByCat(cat.id);
                const target = document.getElementById('calculators');
                if (target) target.scrollIntoView({ behavior: 'smooth' });
            });
            catGrid.appendChild(card);
        });
    }

    /* ====== RENDER FILTER TAGS ====== */
    const filterBar = document.getElementById('filter-bar');
    if (filterBar) {
        categories.forEach(function (cat) {
            const btn = document.createElement('button');
            btn.className = 'filter-tag';
            btn.dataset.filter = cat.id;
            btn.textContent = cat.name;
            filterBar.appendChild(btn);
        });
    }

    /* ====== RENDER CALC CARDS ====== */
    const calcGrid = document.getElementById('calc-grid');
    const noResults = document.getElementById('no-results');

    function renderCards(list) {
        if (!calcGrid) return;
        calcGrid.innerHTML = '';
        if (list.length === 0) {
            if (noResults) noResults.classList.remove('hidden');
            return;
        }
        if (noResults) noResults.classList.add('hidden');

        list.forEach(function (calc) {
            const el = document.createElement('a');
            el.className = 'calc-card' + (calc.live ? '' : ' calc-card-soon');
            el.href = calc.live ? calc.slug + '/' : '#';
            if (!calc.live) {
                el.addEventListener('click', function (e) { e.preventDefault(); });
            }
            el.innerHTML = `
                <span class="calc-card-icon">${calc.icon}</span>
                <span class="calc-card-title">${calc.title}</span>
                <span class="calc-card-desc">${calc.desc}</span>
                <span class="calc-card-tag">${calc.live ? categories.find(c => c.id === calc.cat).name : 'Coming soon'}</span>
            `;
            calcGrid.appendChild(el);
        });
    }
    renderCards(calculators);

    /* ====== FILTER ====== */
    let activeFilter = 'all';

    function filterByCat(catId) {
        if (!filterBar) return;
        activeFilter = catId;
        filterBar.querySelectorAll('.filter-tag').forEach(function (btn) {
            btn.classList.toggle('active', btn.dataset.filter === catId);
        });
        const filtered = catId === 'all' ? calculators : calculators.filter(c => c.cat === catId);
        renderCards(filtered);
        const sI = document.getElementById('search-input');
        if (sI) sI.value = '';
    }

    if (filterBar) {
        filterBar.addEventListener('click', function (e) {
            const tag = e.target.closest('.filter-tag');
            if (!tag) return;
            filterByCat(tag.dataset.filter);
        });
    }

    /* ====== SEARCH ====== */
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', function () {
            const q = this.value.toLowerCase().trim();
            if (activeFilter !== 'all') {
                activeFilter = 'all';
                filterBar.querySelectorAll('.filter-tag').forEach(function (btn) {
                    btn.classList.toggle('active', btn.dataset.filter === 'all');
                });
            }
            if (!q) {
                renderCards(calculators);
                return;
            }
            const filtered = calculators.filter(function (c) {
                return c.title.toLowerCase().includes(q) ||
                       c.desc.toLowerCase().includes(q) ||
                       c.slug.replace(/-/g, ' ').includes(q) ||
                       c.cat.includes(q);
            });
            renderCards(filtered);
        });
    }

})();
