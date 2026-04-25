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
        { id: 'education', icon: '🎓', name: 'Education & Career' },
        { id: 'family',   icon: '👪', name: 'Family & Parenting' },
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
        { title: 'Puppy Weight Predictor', slug: 'puppy-weight-calculator', icon: '🐕‍🦺', cat: 'pets', desc: 'Estimate your puppy\'s adult weight based on current growth.', live: true },
        { title: 'Dog Hydration Goal', slug: 'dog-hydration-calculator', icon: '💧', cat: 'pets', desc: 'How much water your dog should drink daily based on weight.', live: true },
        { title: 'Reptile Tank Size', slug: 'reptile-tank-calculator', icon: '🦎', cat: 'pets', desc: 'Minimum habitat volume for bearded dragons, geckos, and pythons.', live: true },
        { title: 'Cat Calorie Calculator', slug: 'cat-calorie-calculator', icon: '🐈', cat: 'pets', desc: 'Daily energy needs for indoor and outdoor cats.', live: true },
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
        { title: 'Cake Pan Converter', slug: 'cake-pan-calculator', icon: '🎂', cat: 'kitchen', desc: 'Adjust recipes for different round or square pan sizes.', live: true },
        { title: 'Bread Yield Tool', slug: 'bread-yield-calculator', icon: '🍞', cat: 'kitchen', desc: 'Estimate baked loaf weight from raw dough weight.', live: true },
        { title: 'Steak Doneness', slug: 'steak-doneness-calculator', icon: '🥩', cat: 'kitchen', desc: 'Internal temps and rest times for the perfect steak.', live: true },
        { title: 'Coffee Roast Loss', slug: 'coffee-roasting-calculator', icon: '☕', cat: 'kitchen', desc: 'Calculate moisture loss and roast degree for beans.', live: true },
        { title: 'Instant Pot Conv.', slug: 'pressure-cooker-calculator', icon: '🥘', cat: 'kitchen', desc: 'Convert slow cooker times to pressure cooker settings.', live: true },
        { title: 'Turkey Thawing', slug: 'turkey-thawing-calculator', icon: '🦃', cat: 'kitchen', desc: 'Safe defrosting times for fridge or cold water methods.', live: true },
        { title: 'Rice Water Ratio', slug: 'rice-ratio-calculator', icon: '🍚', cat: 'kitchen', desc: 'Exact water-to-rice ratios for every variety of grain.', live: true },
        { title: 'Egg Sub Guide', slug: 'egg-substitution-calculator', icon: '🥚', cat: 'kitchen', desc: 'Best alternatives for flax, applesauce, and banana.', live: true },
        { title: 'Kitchen Converter', slug: 'kitchen-unit-calculator', icon: '⚖️', cat: 'kitchen', desc: 'Convert between cups, grams, and ounces for baking.', live: true },
        { title: 'Pizza Dough Tool', slug: 'pizza-dough-calculator', icon: '🍕', cat: 'kitchen', desc: 'Baker\'s percentages for Neapolitan and NY style dough.', live: true },

        // ---- Health ----
        { title: 'Protein Intake Calculator', slug: 'protein-intake-calculator', icon: '💪', cat: 'health', desc: 'Daily protein needs based on lean mass and activity.', live: true },
        { title: 'Water Intake Calculator', slug: 'water-intake-calculator', icon: '💧', cat: 'health', desc: 'How much water you should drink daily based on weight and climate.', live: true },
        { title: 'Macro Calculator', slug: 'macro-calculator', icon: '📊', cat: 'health', desc: 'Protein, carbs, and fat split for cutting, bulking, or maintenance.', live: true },
        { title: 'Keto Macro Calculator', slug: 'keto-calculator', icon: '🥑', cat: 'health', desc: 'Custom macros for ketosis with a net carb tracker.', live: true },
        { title: 'Carnivore Calculator', slug: 'carnivore-calculator', icon: '🥩', cat: 'health', desc: 'Ideal fat-to-protein ratios for a meat-based lifestyle.', live: true },
        { title: 'P:E Ratio Score', slug: 'pe-ratio-calculator', icon: '⚖️', cat: 'health', desc: 'Protein-to-Energy satiety score for any food item.', live: true },
        { title: 'Arby\'s Menu Macros', slug: 'arbys-menu-calculator', icon: '🥪', cat: 'health', desc: 'Nutrition tracker for roast beef, gyros, and sides.', live: true },
        { title: 'Child Height Predictor', slug: 'child-height-calculator', icon: '👶', cat: 'health', desc: 'Estimate your child\'s future adult height based on genetics.', live: true },
        { title: 'BMI Calculator', slug: 'bmi-calculator', icon: '⚖️', cat: 'health', desc: 'Check your Body Mass Index and healthy weight range.', live: true },
        { title: 'Heart Age Calculator', slug: 'heart-age-calculator', icon: '❤️', cat: 'health', desc: 'Is your heart older than you? Find your cardio health age.', live: true },
        { title: 'VO2 Max Calculator', slug: 'vo2-max-calculator', icon: '🫁', cat: 'health', desc: 'Estimate your aerobic fitness and oxygen capacity.', live: true },
        { title: 'Sleep Apnea (AHI) Test', slug: 'ahi-calculator', icon: '😴', cat: 'health', desc: 'Screening test for sleep apnea risk and snoring.', live: true },
        { title: 'TDEE Calculator', slug: 'tdee-calculator', icon: '🔥', cat: 'health', desc: 'Calculate your total daily maintenance calories.', live: true },
        { title: 'AHA PREVENT Tool', slug: 'aha-prevent-calculator', icon: '🛡️', cat: 'health', desc: 'New 10-year CVD risk model including kidney health.', live: true },
        { title: 'Adrenal Washout', slug: 'adrenal-washout-calculator', icon: '🧬', cat: 'health', desc: 'CT HU analysis for adrenal nodule evaluation.', live: true },
        { title: 'ANC Calculator', slug: 'anc-calculator', icon: '🩸', cat: 'health', desc: 'Absolute Neutrophil Count for immune system tracking.', live: true },
        { title: 'Breast Implant Size', slug: 'breast-implant-calculator', icon: '🏥', cat: 'health', desc: 'Estimate CC volume based on base width and projection.', live: true },
        { title: 'Adrenal Nodule Risk', slug: 'adrenal-nodule-calculator', icon: '🔍', cat: 'health', desc: 'Evaluate malignancy risk in adrenal incidentalomas.', live: true },
        { title: 'ABW Calculator', slug: 'abw-calculator', icon: '⚖️', cat: 'health', desc: 'Adjusted Body Weight for clinical medication dosing.', live: true },
        { title: 'Baby Growth (WHO)', slug: 'baby-height-percentile', icon: '👶', cat: 'health', desc: 'Check your child\'s growth percentile by age and sex.', live: true },
        { title: 'Get Abs Timeline', slug: 'get-abs-calculator', icon: '🏋️', cat: 'health', desc: 'How many weeks until you see your six-pack?', live: true },
        { title: 'AFP MoM Calculator', slug: 'afp-calculator', icon: '🤰', cat: 'health', desc: 'Prenatal screening multiple of median for AFP levels.', live: true },
        { title: 'Bilirubin (BiliTool)', slug: 'bili-calculator', icon: '👶', cat: 'health', desc: 'Newborn jaundice risk assessment by hours of life.', live: true },
        { title: 'ASCVD Heart Risk', slug: 'ascvd-calculator', icon: '🫀', cat: 'health', desc: '10-year risk of heart attack or stroke for adults over 40.', live: true },
        { title: 'Acai Bowl Calories', slug: 'acai-bowl-calculator', icon: '🥣', cat: 'health', desc: 'Nutrition and macro tracker for your smoothie bowls.', live: true },
        { title: 'Sleep Cycle Calculator', slug: 'sleep-cycle-calculator', icon: '🌙', cat: 'health', desc: 'When to sleep or wake up to align with 90min cycles.', live: true },

        // ---- Family & Parenting ----
        { title: 'Child Support Calc', slug: 'child-support-calculator', icon: '⚖️', cat: 'family', desc: 'Estimate payments using the Income Shares model.', live: true },
        { title: 'Ovulation Predictor', slug: 'ovulation-calculator', icon: '📅', cat: 'family', desc: 'Identify your fertile window and peak days.', live: true },
        { title: 'Pregnancy Due Date', slug: 'pregnancy-due-date', icon: '👶', cat: 'family', desc: 'Track your baby\'s arrival date and weeks along.', live: true },
        { title: 'Baby Gender (Fun)', slug: 'baby-gender-calculator', icon: '☯️', cat: 'family', desc: 'Chinese Lunar Calendar gender prediction chart.', live: true },
        { title: 'Baby Name Finder', slug: 'baby-name-generator', icon: '✨', cat: 'family', desc: 'Random and popular names with origin and meaning.', live: true },
        { title: 'Daycare Cost Tool', slug: 'daycare-calculator', icon: '🏫', cat: 'family', desc: 'Monthly and annual childcare expense estimator.', live: true },
        { title: 'College Savings', slug: 'college-savings-calculator', icon: '🎓', cat: 'family', desc: 'How much to save for tuition using a 529 plan.', live: true },
        { title: 'Allowance Manager', slug: 'allowance-calculator', icon: '💰', cat: 'family', desc: 'Manage weekly pocket money based on age and chores.', live: true },
        { title: 'Screen Time Guide', slug: 'screen-time-calculator', icon: '📱', cat: 'family', desc: 'Age-appropriate digital media limits and habits.', live: true },
        { title: 'Pet vs Baby Cost', slug: 'pet-vs-baby-calculator', icon: '⚖️', cat: 'family', desc: 'Fun first-year expense comparison for family planning.', live: true },

        // ---- Home ----
        { title: 'Moving Box Calculator', slug: 'moving-box-calculator', icon: '📦', cat: 'home', desc: 'Estimate how many boxes you need by house or room size.', live: true },
        { title: 'Wallpaper Calculator', slug: 'wallpaper-calculator', icon: '🎨', cat: 'home', desc: 'Number of wallpaper rolls you need by room dimensions.', live: true },
        { title: 'Concrete Volume Calculator', slug: 'concrete-calculator', icon: '🧱', cat: 'home', desc: 'Cubic feet/meters of concrete for slabs and footings.', live: true },
        { title: 'Electricity Cost Calculator', slug: 'electricity-cost-calculator', icon: '⚡', cat: 'home', desc: 'Monthly or yearly cost to run any appliance.', live: true },
        { title: 'Fence Material Calculator', slug: 'fence-calculator', icon: '🏗️', cat: 'home', desc: 'Boards, posts, and rails for your fence project.', live: true },
        { title: 'ADU Cost Calculator', slug: 'adu-cost-calculator', icon: '🏡', cat: 'home', desc: 'Estimate the budget for building a guest house or granny flat.', live: true },
        { title: 'Window Replacement Cost', slug: 'window-replacement-cost', icon: '🪟', cat: 'home', desc: 'Estimate the cost of new windows and installation.', live: true },
        { title: 'Hurricane Shutter Cost', slug: 'hurricane-shutter-calculator', icon: '🌀', cat: 'home', desc: 'Storm protection pricing for your windows and doors.', live: true },
        { title: 'HVAC Airflow (CFM)', slug: 'hvac-cfm-calculator', icon: '🌬️', cat: 'home', desc: 'Calculate required airflow for proper room ventilation.', live: true },
        { title: 'Solar Panel Output', slug: 'solar-output-calculator', icon: '☀️', cat: 'home', desc: 'Estimate kWh generation and electricity bill savings.', live: true },
        { title: 'Pneumatic Cylinder Force', slug: 'pneumatic-cylinder-calculator', icon: '⚙️', cat: 'home', desc: 'Push and pull force for air cylinders (PSI/Bar).', live: true },
        { title: 'Roofing Square Tool', slug: 'roofing-calculator', icon: '🏠', cat: 'home', desc: 'Calculate squares and material for roof projects.', live: true },
        { title: 'Deck Material Calc', slug: 'deck-calculator', icon: '🪵', cat: 'home', desc: 'Estimate boards, joists, and screws for a deck.', live: true },
        { title: 'Brick & Mortar Estimator', slug: 'brick-calculator', icon: '🧱', cat: 'home', desc: 'Number of bricks and bags of mortar for walls.', live: true },
        { title: 'Drywall Sheet Calc', slug: 'drywall-calculator', icon: '📋', cat: 'home', desc: 'How many sheets, screws, and tape for a room.', live: true },
        { title: 'Driveway Sealing', slug: 'driveway-calculator', icon: '🛣️', cat: 'home', desc: 'Cost and material for asphalt driveway sealing.', live: true },

        // ---- Garden ----
        { title: 'Raised Bed Soil Calculator', slug: 'raised-bed-soil-calculator', icon: '🌻', cat: 'garden', desc: 'Cubic feet of soil mix for your raised garden bed.', live: true },
        { title: 'Potting Soil Calculator', slug: 'potting-soil-calculator', icon: '🪴', cat: 'garden', desc: 'Soil volume for round or rectangular plant pots.', live: true },
        { title: 'Fertilizer (NPK) Tool', slug: 'fertilizer-calculator', icon: '🌱', cat: 'garden', desc: 'Calculate pounds of fertilizer needed based on lawn area.', live: true },
        { title: 'Mulch Coverage Calc', slug: 'mulch-calculator', icon: '🍂', cat: 'garden', desc: 'Estimate bags or yards of mulch for your flower beds.', live: true },
        { title: 'Seed Spacing Tool', slug: 'seed-spacing-calculator', icon: '🥕', cat: 'garden', desc: 'Proper distance for planting vegetables and flowers.', live: true },
        { title: 'Compost Ratio Calculator', slug: 'compost-ratio-calculator', icon: '♻️', cat: 'garden', desc: 'Green-to-brown ratio for healthy composting.', live: true },

        // ---- Finance ----
        { title: 'Road Trip Fuel Split', slug: 'fuel-split-calculator', icon: '⛽', cat: 'finance', desc: 'Split the gas cost fairly with friends on any trip.', live: true },
        { title: 'Wedding Alcohol Calculator', slug: 'wedding-drink-calc', icon: '🍾', cat: 'finance', desc: 'Bottle counts for beer, wine, and spirits for your event.', live: true },
        { title: 'Rent Affordability Calculator', slug: 'rent-calculator', icon: '🏠', cat: 'finance', desc: 'How much rent you can afford based on income.', live: true },
        { title: 'Discount Calculator', slug: 'discount-calculator', icon: '🔖', cat: 'finance', desc: 'Final price after percentage or flat discount.', live: true },
        { title: 'Mortgage Calculator', slug: 'mortgage-calculator', icon: '🏦', cat: 'finance', desc: 'Estimate monthly mortgage payments and interest.', live: true },
        { title: 'Annuity Commission', slug: 'annuity-commission-calculator', icon: '🏦', cat: 'finance', desc: 'Estimate agent fees for fixed and variable annuities.', live: true },
        { title: 'Affirm Payment Estimator', slug: 'affirm-payment-calculator', icon: '💳', cat: 'finance', desc: 'Calculate monthly payments and interest for Affirm BNPL.', live: true },
        { title: 'KDP Royalty Calculator', slug: 'book-royalty-calculator', icon: '📚', cat: 'finance', desc: 'Estimate Amazon KDP profits for ebooks and paperbacks.', live: true },
        { title: 'ROAS & Ad ROI', slug: 'roas-calculator', icon: '🎯', cat: 'finance', desc: 'Measure the profitability of your marketing campaigns.', live: true },
        { title: 'Percentage Calculator', slug: 'percentage-calculator', icon: '🔢', cat: 'finance', desc: 'Quickly solve percentage increase, decrease, and common math.', live: true },
        { title: 'Ag Loan Calculator', slug: 'ag-loan-calculator', icon: '🚜', cat: 'finance', desc: 'Agricultural financing for farm land and equipment.', live: true },
        { title: 'Ad Valorem (TAVT)', slug: 'ad-valorem-calculator', icon: '🏷️', cat: 'finance', desc: 'Estimated vehicle title and registration taxes.', live: true },
        { title: 'Federal Tax 2026', slug: 'tax-2026-calculator', icon: '📅', cat: 'finance', desc: 'Future tax projection after TCJA expiration.', live: true },
        { title: 'Bonus Tax Tool', slug: 'bonus-tax-calculator', icon: '🎁', cat: 'finance', desc: 'Supplemental tax estimate for work bonuses.', live: true },
        { title: 'AGI Tax Calculator', slug: 'agi-calculator', icon: '🧾', cat: 'finance', desc: 'Adjusted Gross Income after tax adjustments.', live: true },
        { title: 'ACTC Calculator', slug: 'actc-calculator', icon: '👶', cat: 'finance', desc: 'Refundable portion of the Child Tax Credit.', live: true },
        { title: 'ACA Affordability', slug: 'aca-affordability-calculator', icon: '🏥', cat: 'finance', desc: 'Check if health insurance is affordable under ACA.', live: true },
        { title: 'Mortgage & Escrow', slug: 'mortgage-escrow-calculator', icon: '🏦', cat: 'finance', desc: 'Full PITI payment with taxes and insurance.', live: true },
        { title: 'A/R Turnover Ratio', slug: 'ar-turnover-calculator', icon: '📊', cat: 'finance', desc: 'Business efficiency in collecting receivables.', live: true },
        { title: 'BAH Calculator', slug: 'bah-calculator', icon: '🏠', cat: 'finance', desc: 'Military Basic Allowance for Housing (BAH) estimate.', live: true },
        { title: 'Military Retirement', slug: 'military-retirement-calculator', icon: '🎖️', cat: 'finance', desc: 'Legacy High-3 and BRS pension projections.', live: true },
        { title: 'VA Disability Pay', slug: 'va-disability-calculator', icon: '🎗️', cat: 'finance', desc: 'Monthly tax-free veterans disability compensation.', live: true },
        { title: 'Combat Pay Tool', slug: 'combat-pay-calculator', icon: '⚔️', cat: 'finance', desc: 'HDP-L and Hostile Fire Pay for deployed troops.', live: true },
        { title: 'Divorce Asset Split', slug: 'divorce-settlement-calculator', icon: '⚖️', cat: 'finance', desc: 'Rough estimate of marital property division.', live: true },
        { title: 'Lemon Law Refund', slug: 'lemon-law-calculator', icon: '🍋', cat: 'finance', desc: 'Car buyback estimate with mileage offset.', live: true },
        { title: 'Injury Claim Value', slug: 'personal-injury-calculator', icon: '🩹', cat: 'finance', desc: 'Estimate settlement using the multiplier method.', live: true },
        { title: 'Workers Comp Pay', slug: 'workers-comp-calculator', icon: '👷', cat: 'finance', desc: 'Weekly disability benefits for workplace injuries.', live: true },
        { title: 'Wrongful Death Calc', slug: 'wrongful-death-calculator', icon: '🕯️', cat: 'finance', desc: 'Economic loss and future earnings estimation.', live: true },
        { title: 'Copyright Penalty', slug: 'copyright-calculator', icon: '©️', cat: 'finance', desc: 'Statutory damages for intellectual property theft.', live: true },
        { title: 'Rent vs. Buy (Invest)', slug: 'rent-vs-buy-calculator', icon: '⚖️', cat: 'finance', desc: 'Long-term wealth comparison of owning vs. renting.', live: true },
        { title: 'Cap Rate Calculator', slug: 'cap-rate-calculator', icon: '📊', cat: 'finance', desc: 'Property ROI based on Net Operating Income.', live: true },
        { title: 'GRM Calculator', slug: 'grm-calculator', icon: '🔢', cat: 'finance', desc: 'Quick valuation using Gross Rent Multiplier.', live: true },
        { title: 'Airbnb Profit Tool', slug: 'airbnb-calculator', icon: '🏠', cat: 'finance', desc: 'Short-term rental revenue and expense estimator.', live: true },
        { title: 'MAO Flip Calculator', slug: 'mao-calculator', icon: '🏚️', cat: 'finance', desc: 'Maximum Allowable Offer using the 70% rule.', live: true },

        // ---- Education & Career ----
        { title: 'GPA to % Converter', slug: 'gpa-to-percentage-calculator', icon: '📝', cat: 'education', desc: 'Translate GPA to percentage and vice-versa.', live: true },
        { title: 'Final Grade Needed', slug: 'final-grade-calculator', icon: '🎯', cat: 'education', desc: 'Required exam score for target course grade.', live: true },
        { title: 'LSAT Score Est.', slug: 'lsat-calculator', icon: '⚖️', cat: 'education', desc: 'Predict LSAT score from raw practice answers.', live: true },
        { title: 'GRE to GMAT Tool', slug: 'gre-to-gmat-calculator', icon: '🔄', cat: 'education', desc: 'MBA score comparison and conversion.', live: true },
        { title: 'Acceptance Rate', slug: 'acceptance-rate-calculator', icon: '🏛️', cat: 'education', desc: 'Selectivity percentage for college admissions.', live: true },
        { title: 'Hourly to Salary', slug: 'hourly-to-salary-calculator', icon: '📈', cat: 'education', desc: 'Convert hourly pay to annual gross income.', live: true },
        { title: 'Take-Home Pay', slug: 'take-home-pay-calculator', icon: '💸', cat: 'education', desc: 'Estimate net pay after federal and state taxes.', live: true },
        { title: 'Overtime Pay Tool', slug: 'overtime-calculator', icon: '⏰', cat: 'education', desc: 'Calculate weekly pay with time-and-a-half.', live: true },
        { title: 'Self-Employment Tax', slug: 'self-employment-tax-calculator', icon: '💼', cat: 'education', desc: '15.3% tax estimate for 1099 freelancers.', live: true },
        { title: 'Burnout Risk Score', slug: 'burnout-calculator', icon: '🔋', cat: 'education', desc: 'Self-assessment for professional stress levels.', live: true },

        // ---- Craft ----
        { title: 'Fabric Yardage Calculator', slug: 'fabric-calculator', icon: '🧵', cat: 'craft', desc: 'How much fabric for a garment or furniture by size and type.', live: true },
        { title: 'Resin Volume Calculator', slug: 'resin-volume-calculator', icon: '💎', cat: 'craft', desc: 'How much epoxy resin for your mold or surface.', live: true },
        { title: 'Aida Cloth Count', slug: 'aida-cloth-calculator', icon: '🧵', cat: 'craft', desc: 'Fabric size and stitch count for cross-stitch projects.', live: true },
        { title: 'Yarn Yardage Calc', slug: 'yarn-calculator', icon: '🧶', cat: 'craft', desc: 'Estimate yarn needed for sweaters, blankets, and scarves.', live: true },
        { title: 'Board Foot Calculator', slug: 'board-foot-calculator', icon: '🪵', cat: 'craft', desc: 'Lumber volume and cost for woodworking projects.', live: true },
        { title: 'Ring Size Converter', slug: 'ring-size-calculator', icon: '💍', cat: 'craft', desc: 'Convert finger measurements to US, UK, and EU sizes.', live: true },
        { title: 'Knitting Timer', slug: 'knitting-calculator', icon: '🧶', cat: 'craft', desc: 'Estimate total project time based on your stitch speed.', live: true },
        { title: 'Pottery Shrinkage', slug: 'pottery-calculator', icon: '🏺', cat: 'craft', desc: 'Calculate raw size needed for target fired dimensions.', live: true },
        { title: 'Candle Burn Time', slug: 'candle-burn-calculator', icon: '🕯️', cat: 'craft', desc: 'Estimate total life based on wax weight and wick type.', live: true },
        { title: 'Candle Wax Calculator', slug: 'candle-wax-calculator', icon: '🕯️', cat: 'craft', desc: 'Wax weight by container volume for candle making.', live: true },

        // ---- Time ----
        { title: 'Meeting Cost Calculator', slug: 'meeting-cost-calculator', icon: '🤝', cat: 'time', desc: 'How much this meeting is costing your company.', live: true },
        { title: 'Freelance Rate Calculator', slug: 'freelance-rate-calculator', icon: '📋', cat: 'time', desc: 'Calculate your hourly rate from desired yearly income.', live: true },
        { title: 'Binary Code Converter', slug: 'binary-calculator', icon: '💻', cat: 'time', desc: 'Translate text into binary 0s and 1s for fun or school.', live: true },
        { title: 'Random Choice Pick', slug: 'random-choice-calculator', icon: '🎲', cat: 'time', desc: 'Can\'t decide? Let fate choose from your list of options.', live: true },
        { title: 'Date Difference Tool', slug: 'date-difference-calculator', icon: '📅', cat: 'time', desc: 'Calculate the exact number of days between two dates.', live: true },

        // ---- Timers ----
        { title: 'Zen Meditation Timer', slug: 'meditation-timer', icon: '🧘', cat: 'timers', desc: 'Customizable focus sessions with minimalist visual cues.', live: true },
        { title: 'Pomodoro Productivity Timer', slug: 'pomodoro-timer', icon: '🍅', cat: 'timers', desc: 'Work in 25-minute sprints to boost focus and avoid burnout.', live: true },
        { title: 'Perfect Steak Timer', slug: 'steak-timer', icon: '🥩', cat: 'timers', desc: 'Timed guidance for Rare, Medium, and Well-done steaks.', live: true },
        { title: 'Yoga Interval Timer', slug: 'yoga-timer', icon: '🤸', cat: 'timers', desc: 'Set pose durations and transitions for a perfect home flow.', live: true },

        // ---- Auto ----
        { title: 'Car Depreciation Estimate', slug: 'car-depreciation-calculator', icon: '📉', cat: 'auto', desc: 'Estimate future value and total cost of ownership.', live: true },
        { title: 'Tire Size Converter', slug: 'tire-size-calculator', icon: '🛞', cat: 'auto', desc: 'Compare tire diameters and check speedometer error.', live: true },
        { title: 'Towing Capacity Calc', slug: 'towing-capacity-calculator', icon: '🛻', cat: 'auto', desc: 'Safe towing weight for your truck or SUV setup.', live: true },
        { title: 'Flight Carbon Footprint', slug: 'carbon-footprint-calculator', icon: '✈️', cat: 'auto', desc: 'Estimate CO2 emissions for your next air trip.', live: true },
        { title: 'Hotel Points Value', slug: 'hotel-points-calculator', icon: '🏨', cat: 'auto', desc: 'Is it better to pay with cash or rewards points?', live: true },
        { title: 'EV Charging Time', slug: 'ev-charging-calculator', icon: '🔋', cat: 'auto', desc: 'How long to charge your EV at different power levels.', live: true },

        // ---- Fun ----
        { title: 'Life Expectancy Calculator', slug: 'life-expectancy-calculator', icon: '⏳', cat: 'fun', desc: 'Estimate your lifespan based on lifestyle and health data.', live: true },
        { title: 'Age Difference Calculator', slug: 'age-difference-calculator', icon: '👫', cat: 'fun', desc: 'Calculate the exact gap between two people in years and days.', live: true },
        { title: 'Alcohol Dilution Calculator', slug: 'alcohol-dilution-calculator', icon: '🍶', cat: 'fun', desc: 'Dilute spirits to a target ABV percentage.', live: true },
        { title: 'BAC Estimate Calculator', slug: 'bac-calculator', icon: '🍺', cat: 'fun', desc: 'Estimate blood alcohol content from drinks and time.', live: true },
        { title: 'OSRS Agility Calculator', slug: 'osrs-agility-calculator', icon: '🏃', cat: 'fun', desc: 'Calculate laps to your next Agility level in Old School RuneScape.', live: true },
        { title: 'Betting Odds Converter', slug: 'betting-odds-calculator', icon: '🎲', cat: 'fun', desc: 'Convert Moneyline, Decimal, and Fractional odds.', live: true },
        { title: 'Sim Racing FOV', slug: 'sim-racing-fov', icon: '🏎️', cat: 'fun', desc: 'Calculate the perfect Field of View for your racing rig.', live: true },
        { title: 'D&D Stat Roller', slug: 'dnd-stat-roller', icon: '🎲', cat: 'fun', desc: 'Roll 4d6 and drop the lowest for your character stats.', live: true },
        { title: 'The Love Calculator', slug: 'love-calculator', icon: '💖', cat: 'fun', desc: 'Secret name-based algorithm for romantic compatibility.', live: true },
        { title: 'Zodiac Sign Finder', slug: 'zodiac-calculator', icon: '✨', cat: 'fun', desc: 'Find your sun sign and element based on your birthday.', live: true },
        { title: 'Rocket Altitude', slug: 'rocket-calculator', icon: '🚀', cat: 'fun', desc: 'Estimate peak height based on engine impulse and mass.', live: true },
        { title: 'Metal Detector Depth', slug: 'metal-detector-calculator', icon: '🔎', cat: 'fun', desc: 'Detection depth for coins and relics in different soils.', live: true },
        { title: 'Astronomy Exposure', slug: 'astronomy-calculator', icon: '🔭', cat: 'fun', desc: 'The 500 Rule for sharp star photography without trails.', live: true },
        { title: 'MTG Mana Curve', slug: 'mtg-mana-calculator', icon: '🃏', cat: 'fun', desc: 'Optimize your deck spells and lands for consistent play.', live: true },
        { title: 'Pokemon Weakness', slug: 'pokemon-calculator', icon: '🔴', cat: 'fun', desc: 'Identify dual-type vulnerabilities and resistances instantly.', live: true },
        { title: 'Sudoku Scorer', slug: 'sudoku-calculator', icon: '🔢', cat: 'fun', desc: 'True difficulty level based on clues and required logic.', live: true },
        { title: 'Guitar Tension', slug: 'guitar-calculator', icon: '🎸', cat: 'fun', desc: 'Neck force calculation based on string gauge and tuning.', live: true },
        // ---- Tech ----
        { title: 'Sitemap Extractor', slug: 'sitemap-extractor', icon: '🔗', cat: 'fun', desc: 'Extract clean URL lists from XML sitemap source code.', live: true },
        { title: 'CSS Shadow Gen', slug: 'shadow-calculator', icon: '🌗', cat: 'fun', desc: 'Create perfect box-shadows and neumorphic designs.', live: true },
        { title: 'JSON to CSV', slug: 'json-csv-calculator', icon: '📊', cat: 'fun', desc: 'Convert JSON arrays to CSV format for spreadsheets.', live: true },
        { title: 'Base64 Tool', slug: 'base64-calculator', icon: '🔐', cat: 'fun', desc: 'Encode and decode text to Base64 format instantly.', live: true },
        { title: 'Hex to RGB', slug: 'hex-rgb-calculator', icon: '🎨', cat: 'fun', desc: 'Convert colors and generate CSS variable snippets.', live: true },
        { title: 'UTM Link Builder', slug: 'utm-calculator', icon: '🔗', cat: 'fun', desc: 'Add tracking parameters for marketing campaigns.', live: true },
        { title: 'Cron Descriptor', slug: 'cron-calculator', icon: '⏰', cat: 'fun', desc: 'Translate cryptic crontab schedules into plain English.', live: true },
        { title: 'Password Entropy', slug: 'password-calculator', icon: '🔐', cat: 'fun', desc: 'Calculate true password strength and crack time.', live: true },
        { title: 'Image Breakpoints', slug: 'image-breakpoint-calculator', icon: '🖼️', cat: 'fun', desc: 'Optimal srcset widths for responsive web images.', live: true },
        { title: 'SVG Path Scaler', slug: 'svg-calculator', icon: '📐', cat: 'fun', desc: 'Resize vector paths manually with a scale factor.', live: true },
        // ---- Misc & Final ----
        { title: 'Gift Card Tracker', slug: 'gift-card-calculator', icon: '💳', cat: 'fun', desc: 'Manage your store credits and prepaid card spending.', live: true },
        { title: 'Lottery Visualizer', slug: 'lottery-calculator', icon: '🎰', cat: 'fun', desc: 'See your real chances of winning compared to life events.', live: true },
        { title: 'Dice Roller', slug: 'dice-calculator', icon: '🎲', cat: 'fun', desc: 'Multi-sided dice simulator for RPGs and board games.', live: true },
        { title: 'Name Generator', slug: 'name-calculator', icon: '👤', cat: 'fun', desc: 'Create unique fantasy names for Elves, Dwarves, and Orcs.', live: true },
        { title: 'Morse Player', slug: 'morse-calculator', icon: '📻', cat: 'fun', desc: 'Translate text to dots/dashes with audio and light signals.', live: true },
        { title: 'Braille Tool', slug: 'braille-calculator', icon: '⠃', cat: 'fun', desc: 'Translate text to the universal 6-dot tactile system.', live: true },
        { title: 'ASL Alphabet', slug: 'asl-calculator', icon: '🤟', cat: 'fun', desc: 'Visual guide to American Sign Language finger-spelling.', live: true },
        { title: 'Zodiac Harmony', slug: 'zodiac-compatibility', icon: '💞', cat: 'fun', desc: 'Elemental compatibility score between two star signs.', live: true },
        { title: 'Chinese Zodiac', slug: 'chinese-zodiac', icon: '🐉', cat: 'fun', desc: 'Find your animal sign and element in the 60-year cycle.', live: true },
        { title: 'QR Data Tool', slug: 'qr-calculator', icon: '🏁', cat: 'fun', desc: 'Format strings for Wi-Fi, vCards, and links for QR codes.', live: true },
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
