
export const enCopy = {
  app: {
    name: "Thyroid Shati",
    tagline: "Your simple thyroid companion",
    splashTitle: "Thyroid Shati",
    splashTagline: "Your companion for all thyroid problems",
    noActiveCourseAlert: "No active course found. Please create one in the Tracker to test this modal.",
  },
  home: {
    welcome: "Welcome",
    quizCard: "Thyroid Home Test",
    quizDesc: "At-home thyroid check",
    calcCard: "Thyroid Calculator",
    calcDesc: "Useful conversions",
    foodCard: "Thyroid Food Guide",
    foodDesc: "Foods to eat & avoid",
    doseCard: "Thyroid Dose Doctor",
    doseDesc: "AI-powered dose helper",
    guideCard: "Thyroid Guide",
    guideDesc: "In-depth articles",
    dailyDoseTaken: "Daily Dose - TAKEN",
    dailyDoseLogged: "Your daily medication is logged.",
    doseCheckQuestion: "Have you taken your medicine today?",
    doseCheckYes: "Yes",
    doseCheckNo: "No",
    doseCheckLater: "Later",
    dailyDoseSkipped: "Daily Dose - SKIPPED",
    dailyDoseSkippedDesc: "Please remember to take it as advised.",
    langSwitchEN: "EN",
    langSwitchBN: "বাংলা",
  },
  featureCard: {
    pro: "PRO",
  },
  nav: {
    home: "Home",
    tracker: "Tracker",
    data: "My Data",
    profile: "Profile",
    settings: "Settings",
    tests: "Tests"
  },
  placeholders: {
    empty: "Module not attached yet. Check back soon for this feature!",
    pro: "Pro Feature — Coming Soon",
    locked: "This is a pro feature. Upgrade to unlock.",
    notFoundTitle: "Page Not Found",
    notFoundMessage: "The page you are looking for does not exist. Let's get you back home.",
    goHome: "Go Home",
    comingSoon: "Coming Soon",
    notFoundHeading: "404",
  },
  tracker: {
    course: "Course",
    addNewCourse: "New Course",
    dateHeader: "Date",
    doseHeader: "Dose",
    bodyHeader: "Body",
    mindHeader: "Mind",
    sleepHeader: "Sleep",
    startDate: "Start Date",
    medication: "Medication",
    medicationPlaceholder: "e.g., Thyroxine",
    dose: "Dose",
    dosePlaceholder: "e.g., 100 mcg",
    saveCourse: "Save Course",
    cancel: "Cancel",
    currentCourse: "Current Course",
    pastCourses: "Past Courses",
    preCourseLabs: "Pre-Course Labs",
    tsh: "TSH",
    ft4: "Free T4",
    ft3: "Free T3",
    fillMedicationAlert: "Please fill in medication and dose.",
    noCoursesPlaceholder: "Click 'Add New Course' to start tracking.",
  },
  calculator: {
    title: "Thyroid Lab Result Interpreter",
    tshLabel: "TSH (mIU/L)",
    ft4Label: "Free T4",
    ft3Label: "Free T3",
    calculateButton: "Interpret Results",
    resetButton: "Reset",
    finishButton: "Finish",
    helpButton: "Get Help",
    helpModal: {
      title: "How can we help you?",
      youtube: "Visit our YouTube Channel",
      call: "Talk to a representative",
      closeButton: "Close"
    },
    disclaimerTitle: "Disclaimer",
    disclaimerText: "This is an educational tool, not a diagnosis. Results are based on standard reference ranges and may not apply to your specific situation. Always consult a healthcare professional for medical advice.",
    nextStepsTitle: "What to do next",
    nextSteps: {
      consultDoctor: "Please consult your doctor for a full evaluation, confirmation, and to discuss treatment options.",
      followUp: "It's good practice to have a follow-up test in 2-3 months or as advised by your healthcare provider, even with normal results."
    },
    results: {
      invalid: {
        headline: "Incomplete Information",
        advisory: "Please enter at least the TSH value to get an interpretation."
      },
      hypo_overt: {
        headline: "Overt Hypothyroidism",
        advisory: "A high TSH with a low Free T4 strongly suggests the thyroid gland is underactive. This is the most common cause of hypothyroidism. Consultation with a doctor for confirmation and treatment is essential."
      },
      hypo_subclinical: {
        headline: "Subclinical Hypothyroidism",
        advisory: "A high TSH with a normal Free T4 may indicate a mild or early stage of thyroid failure. The brain is working harder to keep hormone levels normal. Your doctor can determine if monitoring or treatment is needed."
      },
      hypo_likely: {
        headline: "Likely Hypothyroidism",
        advisory: "A high TSH is the primary marker for an underactive thyroid. An FT4 test is recommended for a complete picture and to confirm the diagnosis."
      },
      hyper_overt: {
        headline: "Overt Hyperthyroidism",
        advisory: "A low TSH with a high Free T4 strongly suggests the thyroid gland is overproducing hormones. This requires medical evaluation to determine the cause and appropriate management."
      },
      hyper_overt_t3: {
        headline: "Overt Hyperthyroidism (T3 Thyrotoxicosis)",
        advisory: "A low TSH with a high Free T3 (and normal Free T4) indicates a specific type of overactive thyroid called T3 thyrotoxicosis. A medical consultation is important for diagnosis and treatment."
      },
      hyper_subclinical: {
        headline: "Subclinical Hyperthyroidism",
        advisory: "A low TSH with normal thyroid hormone levels may indicate a mild form of hyperthyroidism. The brain has reduced its signal in response to slight overactivity. Please discuss this with your doctor."
      },
      hyper_likely: {
        headline: "Likely Hyperthyroidism",
        advisory: "A low TSH is the primary marker for an overactive thyroid. Free T4 and Free T3 tests are recommended for a complete picture and to confirm the diagnosis."
      },
      normal_tsh_low_ft4: {
        headline: "Atypical Result (Possible Secondary Hypothyroidism)",
        advisory: "A low or normal TSH with a low Free T4 is an unusual pattern. This may indicate a problem with the pituitary gland in the brain, rather than the thyroid itself. A doctor's consultation is essential for proper diagnosis."
      },
      normal_tsh_high_ft4: {
        headline: "Atypical Result (Other)",
        advisory: "A normal TSH with a high Free T4 is uncommon. It can be caused by various factors, including certain medications, lab test interference, or rare conditions. A thorough investigation by a doctor is required."
      },
      euthyroid: {
        headline: "Normal (Euthyroid)",
        advisory: "Based on the provided values, your thyroid function appears to be within the standard normal range. Continue to monitor as advised by your healthcare provider."
      },
      error: {
        headline: "Error",
        advisory: "An unexpected error occurred. Please check your inputs and try again."
      }
    }
  },
  quiz: {
    splashTitle: "Thyroid Symptom Checker",
    splashDesc: "Answer a few simple questions to understand your thyroid health status.",
    startQuiz: "Start Quiz",
    yes: "Yes",
    no: "No",
    back: "Back",
    reset: "Reset",
    resetConfirm: "Are you sure? All your answers will be cleared and the quiz will start over.",
    resultTitle: "Your Thyroid Screening Result",
    totalScore: "Total Score:",
    interpretation: "Interpretation:",
    nextSteps: "Next Steps:",
    nextStepsAdvice: "Please consult a doctor. If needed, test TSH, Free T4, and Free T3.",
    disclaimer: "Disclaimer:",
    disclaimerText: "This is a screening tool, not a diagnosis. The estimate is based on symptoms only and can be inaccurate. Medical evaluation is required for confirmation.",
    questionDisclaimer: "This is for educational purposes only and not a medical diagnosis. Please see a doctor if you have concerns.",
    restartQuiz: "Restart Quiz",
    callForHelp: "Call for Help",
    questionLabel: (current: number, total: number) => `Question ${current} / ${total}`,
    classifications: {
      hyper: "The pattern of your symptoms suggests possible Hyperthyroidism.",
      hypo: "The pattern of your symptoms suggests possible Hypothyroidism.",
      mixed: "Your results are inconclusive. Some symptoms may overlap or do not point to a specific pattern."
    },
    questions: [
      {"id":"q1","text":"Are you losing weight without trying?","weight":3},
      {"id":"q2","text":"Do you often feel nervous or anxious?","weight":3},
      {"id":"q3","text":"Do you have tremors in your hands or fingers?","weight":2},
      {"id":"q4","text":"Are you restless or easily irritated?","weight":2},
      {"id":"q5","text":"Have you experienced weakness or loss of strength?","weight":1},
      {"id":"q6","text":"Do you have frequent or loose stools?","weight":1},
      {"id":"q7","text":"Do you have trouble sleeping or wake up often?","weight":1},
      {"id":"q8","text":"Do you have a swelling in your neck (goiter)?","weight":1},
      {"id":"q9","text":"Are your menstrual periods missed or very frequent?","weight":2},
      {"id":"q10","text":"Are your eyes puffy or do you have blurry vision?","weight":2},
      {"id":"q11","text":"Do you feel tired or lacking in energy all the time?","weight":-3},
      {"id":"q12","text":"Have you gained weight or find it hard to lose?","weight":-2},
      {"id":"q13","text":"Are you intolerant to cold or have cold hands/feet?","weight":-2},
      {"id":"q14","text":"Is your hair dry, falling out, or brittle?","weight":-1},
      {"id":"q15","text":"Do you suffer from constipation?","weight":-1},
      {"id":"q16","text":"Do you feel down or have a loss of interest?","weight":-1},
      {"id":"q17","text":"Do you have body aches, muscle cramps, or joint pain?","weight":-1},
      {"id":"q18","text":"Are you forgetful or have trouble concentrating?","weight":-1}
    ],
    thresholds: { "hyper": 4, "hypo": -8 }
  },
  profile: {
    title: "Your Information",
    nameLabel: "Name",
    namePlaceholder: "e.g., Rahim Khan",
    ageLabel: "Age (years)",
    agePlaceholder: "e.g., 35",
    sexLabel: "Sex",
    sexPlaceholder: "Select...",
    weightLabel: "Weight (kg)",
    weightPlaceholder: "e.g., 70",
    medicationLabel: "Current Medication",
    medicationPlaceholder: "Select medication...",
    doseLabel: "Dose",
    dosePlaceholder: "e.g., 100",
    medicationOptions: {
        none: "None",
        thyroxine: "Thyroxine (LT4)",
        carbimazole: "Carbimazole",
        ptu: "Propylthiouracil (PTU)"
    },
    doseUnits: {
        mcg: "mcg",
        mg: "mg"
    },
    saveButton: "Save Profile",
    saveSuccess: "Profile saved successfully!",
    debug: {
      title: "Debug Tools",
      triggerDailyCheckin: "Trigger Daily Check-in",
      triggerInactivity: "Trigger Inactivity Modal",
      triggerConcern: "Trigger Concern Modal"
    }
  },
  data: {
    title: "My Data",
    courseSummaries: "Course Summaries",
    doseAdherence: "Dose Adherence",
    wellbeingOverview: "Wellbeing Overview",
    taken: "Taken",
    skipped: "Skipped",
    noDataForCourse: "No data has been logged for this course yet.",
    noCoursesTitle: "No Courses Found",
    noCoursesMessage: "Start a new course in the Tracker section to see your progress here."
  },
  tests: {
    labReports: "Lab Reports",
    addReport: "Add New Data Log",
    addNewLogTitle: "Log New Data",
    date: "Date",
    weight: "Weight (kg)",
    thyroidTests: "Thyroid Tests",
    tsh: "TSH",
    ft4: "Free T4",
    ft3: "Free T3",
    otherTests: "Other Tests",
    cbc: "CBC",
    creatinine: "Creatinine",
    hba1c: "HbA1c",
    rbs: "RBS",
    calcium: "Calcium",
    vitaminD: "Vitamin D",
    pth: "PTH",
    save: "Save",
    deleteConfirm: "Are you sure you want to delete this report?",
    noReportsTitle: "No Lab Reports",
    noReportsMessage: "Tap the '+' button to add your first lab report and start tracking your results.",
    eg: "e.g.,"
  },
  dailyCheckin: {
    medicineTitle: "Have you Taken your Medicine?",
    feelingTitle: "How are you Feeling?",
    yes: "Yes",
    no: "No",
    later: "Later",
    saveButton: "Save"
  },
  inactivityModal: {
    title: "We've missed you!",
    messages: [
      "I haven’t seen you for a few days. Are you okay?",
      "I was thinking about you. How are you feeling today?",
      "I missed seeing you here. Hope you’re doing fine."
    ],
    okButton: "I'm okay",
    helpButton: "I need help"
  },
  concernModal: {
    title: "A Gentle Check-in",
    messages: [
      "I see you’ve been feeling bad for a few days. I’m worried about you.",
      "You’ve marked bad days again. Please take rest.",
      "You’ve been feeling low for some time. Would you like to talk to a doctor?"
    ],
    betterButton: "I'm feeling better",
    doctorButton: "Talk to Doctor"
  },
  foodGuide: {
    loading: "Loading Food Guide...",
    loadError: "Failed to load food data. Please try again later.",
    noResults: "No food items match your search.",
    itemsFound: (count: number) => `${count} items`,
    toggleLang: "বাংলা",
    ui: {
      appName: "Thyroid Food Guide",
      searchPlaceholder: "Search foods...",
      viewAsGrid: "Grid View",
      viewAsList: "List View",
      closeModal: "Close modal",
      categories: {
        "All": "All",
        "Grains": "Grains",
        "Lentils & Legumes": "Lentils & Legumes",
        "Fish & Seafood": "Fish & Seafood",
        "Meat & Poultry": "Meat & Poultry",
        "Soy & Alternatives": "Soy & Alternatives",
        "Vegetables": "Vegetables",
        "Leafy Greens": "Leafy Greens",
        "Dairy & Eggs": "Dairy & Eggs",
        "Oils & Spices": "Oils & Spices"
      },
      statusLabels: {
        "goitrogen_present": "Goitrogen present"
      }
    },
    foods: [
      { "id": 1, "category": "Grains", "image": "/images/aromatic-rice-chinigurakalojira.png", "name": "Rice", "line1": "This rice gives quick energy because it is mostly starch.", "line2": "But it has very little fiber and few vitamins.", "line3": "No effect on thyroid.", "status": null },
      { "id": 2, "category": "Grains", "image": "/images/whole-wheat-roti-ata-ruti.png", "name": "Whole-wheat roti", "line1": "This bread has fiber that helps your tummy work well.", "line2": "But it has phytates that can slow mineral absorption a little.", "line3": "No effect on thyroid.", "status": null },
      { "id": 3, "category": "Grains", "image": "/images/paratha-porota.png", "name": "Paratha", "line1": "It gives a lot of energy from carbohydrates and fat.", "line2": "But it can be high in total fat and calories.", "line3": "No effect on thyroid.", "status": null },
      { "id": 4, "category": "Grains", "image": "/images/semolina-suji.png", "name": "Semolina", "line1": "It gives easy energy and some protein.", "line2": "But it is low in fiber and can raise blood sugar faster.", "line3": "No effect on thyroid.", "status": null },
      { "id": 5, "category": "Grains", "image": "/images/puffed-rice-muri.png", "name": "Puffed rice", "line1": "It is very light and gives quick energy.", "line2": "But it has almost no protein, fiber, or vitamins.", "line3": "No effect on thyroid.", "status": null },
      { "id": 6, "category": "Grains", "image": "/images/flattened-rice-chira.png", "name": "Flattened rice", "line1": "It is a simple source of carbohydrate for energy.", "line2": "But it is low in protein and fiber by itself.", "line3": "No effect on thyroid.", "status": null },
      { "id": 7, "category": "Lentils & Legumes", "image": "/images/masoor-dal.png", "name": "Masoor dal", "line1": "It gives plant protein, iron, and folate.", "line2": "But natural compounds can make iron harder to absorb.", "line3": "No effect on thyroid.", "status": null },
      { "id": 8, "category": "Lentils & Legumes", "image": "/images/mung-dal.png", "name": "Mung dal", "line1": "It has protein and soluble fiber that help fullness.", "line2": "But it also has phytates and gas-forming carbs.", "line3": "No effect on thyroid.", "status": null },
      { "id": 9, "category": "Lentils & Legumes", "image": "/images/chana-dal.png", "name": "Chana dal", "line1": "It is rich in protein and fiber and has a low sugar load.", "line2": "But it can cause gas in some people.", "line3": "No effect on thyroid.", "status": null },
      { "id": 10, "category": "Lentils & Legumes", "image": "/images/urad-mashkalai-dal.png", "name": "Urad", "line1": "It provides protein and folate.", "line2": "But it has more antinutrients and purines than some lentils.", "line3": "No effect on thyroid.", "status": null },
      { "id": 11, "category": "Lentils & Legumes", "image": "/images/whole-chickpeas-boot-chola.png", "name": "Whole chickpeas", "line1": "They give protein, fiber, iron, and zinc.", "line2": "But phytates can lower mineral absorption.", "line3": "No effect on thyroid.", "status": null },
      { "id": 12, "category": "Fish & Seafood", "image": "/images/hilsa-ilish.png", "name": "Hilsa", "line1": "It has healthy omega-3 fats and vitamin D.", "line2": "But it is high in total fat and calories.", "line3": "No effect on thyroid.", "status": null },
      { "id": 13, "category": "Fish & Seafood", "image": "/images/rohu-rui.png", "name": "Rohu", "line1": "It gives lean protein and B-vitamins.", "line2": "But it has less omega-3 than fatty sea fish.", "line3": "No effect on thyroid.", "status": null },
      { "id": 14, "category": "Fish & Seafood", "image": "/images/catla-katla.png", "name": "Catla", "line1": "It is a good source of protein.", "line2": "But fat amount changes by cut, and the belly has more fat.", "line3": "No effect on thyroid.", "status": null },
      { "id": 15, "category": "Fish & Seafood", "image": "/images/koi.png", "name": "Koi", "line1": "It gives lean protein and some calcium if small bones are eaten.", "line2": "But it has limited omega-3 fats.", "line3": "No effect on thyroid.", "status": null },
      { "id": 16, "category": "Fish & Seafood", "image": "/images/pangas-pangasius.png", "name": "Pangas", "line1": "It is an affordable source of protein.", "line2": "But it is low in omega-3 and higher in omega-6.", "line3": "No effect on thyroid.", "status": null },
      { "id": 17, "category": "Fish & Seafood", "image": "/images/tilapia-telapia.png", "name": "Tilapia", "line1": "It is a lean fish with low saturated fat.", "line2": "But it has more omega-6 than omega-3.", "line3": "No effect on thyroid.", "status": null },
      { "id": 18, "category": "Fish & Seafood", "image": "/images/prawn-shrimp-chingri.png", "name": "Prawn", "line1": "It is rich in iodine, selenium, and protein.", "line2": "But it has more dietary cholesterol than many fish.", "line3": "No effect on thyroid.", "status": null },
      { "id": 19, "category": "Meat & Poultry", "image": "/images/chicken-murgi.png", "name": "Chicken", "line1": "It provides high-quality protein and B-vitamins.", "line2": "But the skin adds extra saturated fat.", "line3": "No effect on thyroid.", "status": null },
      { "id": 20, "category": "Meat & Poultry", "image": "/images/beef-gorur-mangsho.png", "name": "Beef", "line1": "It gives heme iron, vitamin B12, and zinc.", "line2": "But some cuts have a lot of saturated fat.", "line3": "No effect on thyroid.", "status": null },
      { "id": 21, "category": "Meat & Poultry", "image": "/images/mutton-goat-khashir-mangsho.png", "name": "Mutton", "line1": "It supplies protein and iron.", "line2": "But it usually has more saturated fat than chicken.", "line3": "No effect on thyroid.", "status": null },
      { "id": 22, "category": "Meat & Poultry", "image": "/images/duck-hash.png", "name": "Duck", "line1": "It provides protein, iron, and B-vitamins.", "line2": "But it is high in fat, especially under the skin.", "line3": "No effect on thyroid.", "status": null },
      { "id": 23, "category": "Soy & Alternatives", "image": "/images/soya-chunks-soya-bori.png", "name": "Soya chunks", "line1": "They give a lot of plant protein and iron.", "line2": "But soy can lower thyroid pill absorption if taken together.", "line3": "It's best to wait 4 hours between eating soy and taking thyroid pills.", "status": null },
      { "id": 24, "category": "Vegetables", "image": "/images/potato-alu.png", "name": "Potato", "line1": "It gives potassium and vitamin C (when fresh).", "line2": "But it can raise blood sugar quickly when eaten alone.", "line3": "No effect on thyroid.", "status": null },
      { "id": 25, "category": "Vegetables", "image": "/images/eggplant-begun.png", "name": "Eggplant", "line1": "It is low in calories and has some fiber and antioxidants.", "line2": "But it has very little protein and few minerals.", "line3": "No effect on thyroid.", "status": null },
      { "id": 26, "category": "Vegetables", "image": "/images/pointed-gourd-potol.png", "name": "Pointed gourd", "line1": "It has a little fiber and vitamin C with very few calories.", "line2": "But it is low in protein and minerals.", "line3": "No effect on thyroid.", "status": null },
      { "id": 27, "category": "Vegetables", "image": "/images/bottle-gourd-lau.png", "name": "Bottle gourd", "line1": "It has lots of water and is very low in calories.", "line2": "But it has low protein and low micronutrients.", "line3": "No effect on thyroid.", "status": null },
      { "id": 28, "category": "Vegetables", "image": "/images/pumpkin-mishti-kumra.png", "name": "Pumpkin", "line1": "It has beta-carotene for eye health and some fiber.", "line2": "But it adds natural sugars to your meal.", "line3": "No effect on thyroid.", "status": null },
      { "id": 29, "category": "Vegetables", "image": "/images/onion-peyaj.png", "name": "Onion", "line1": "It has prebiotic fibers and antioxidants like quercetin.", "line2": "But FODMAP sugars can cause gas for some people.", "line3": "No effect on thyroid.", "status": null },
      { "id": 30, "category": "Vegetables", "image": "/images/okra-dherosh.png", "name": "Okra", "line1": "It has soluble fiber and vitamin C.", "line2": "But it contains oxalates and gives little protein.", "line3": "No effect on thyroid.", "status": null },
      { "id": 31, "category": "Leafy Greens", "image": "/images/spinach-palong-shak.png", "name": "Spinach", "line1": "It gives folate, vitamin K, and vitamin A.", "line2": "But high oxalate can block some calcium and iron.", "line3": "No effect on thyroid.", "status": null },
      { "id": 32, "category": "Leafy Greens", "image": "/images/malabar-spinach-pui-shak.png", "name": "Malabar spinach", "line1": "It has vitamin A and vitamin C with soft soluble fiber.", "line2": "But it also has oxalates.", "line3": "No effect on thyroid.", "status": null },
      { "id": 33, "category": "Leafy Greens", "image": "/images/amaranth-leaves-lal-shak.png", "name": "Amaranth leaves", "line1": "They give iron, calcium, and vitamin A.", "line2": "But oxalates can reduce how much minerals you absorb.", "line3": "No effect on thyroid.", "status": null },
      { "id": 34, "category": "Leafy Greens", "image": "/images/water-spinach-kalmi-shak.png", "name": "Water spinach", "line1": "It is low in calories and gives some iron and vitamin A.", "line2": "But it is low in protein and many minerals.", "line3": "No effect on thyroid.", "status": null },
      { "id": 35, "category": "Leafy Greens", "image": "/images/mustard-greens-shorshe-shak.png", "name": "Mustard greens", "line1": "They have vitamin K, vitamin A, vitamin C, and fiber.", "line2": "But they have goitrogens that can make iodine harder to use if you eat a lot raw.", "line3": "Has goitrogens. Limit or avoid, especially when raw.", "status": {"key": "goitrogen_present"} },
      { "id": 36, "category": "Leafy Greens", "image": "/images/colocasia-leaves-kochu-pata.png", "name": "Colocasia leaves", "line1": "They provide calcium, vitamin A, and fiber.", "line2": "But they are very high in oxalates.", "line3": "No effect on thyroid.", "status": null },
      { "id": 37, "category": "Dairy & Eggs", "image": "/images/milk-dudh.png", "name": "Milk", "line1": "It gives complete protein, calcium, and often iodine.", "line2": "But lactose can upset some tummies, and calcium can affect thyroid pills if taken together.", "line3": "It's best to wait 4 hours between drinking milk and taking thyroid pills.", "status": null },
      { "id": 38, "category": "Dairy & Eggs", "image": "/images/yogurt-doi.png", "name": "Yogurt", "line1": "It has protein, calcium, and helpful live cultures.", "line2": "But sweetened yogurt adds extra sugar.", "line3": "It's best to wait 4 hours between eating yogurt and taking thyroid pills.", "status": null },
      { "id": 39, "category": "Dairy & Eggs", "image": "/images/eggs-dim.png", "name": "Eggs", "line1": "They give complete protein, choline, iodine, and selenium in the yolk.", "line2": "But they also contain dietary cholesterol.", "line3": "No effect on thyroid.", "status": null },
      { "id": 40, "category": "Dairy & Eggs", "image": "/images/chhana-fresh-curd-cheese.png", "name": "Chhana", "line1": "It is rich in protein and calcium.", "line2": "But it usually has less iodine than milk.", "line3": "It's best to wait 4 hours between eating chhana and taking thyroid pills.", "status": null },
      { "id": 41, "category": "Oils & Spices", "image": "/images/mustard-oil-shorsher-tel.png", "name": "Mustard oil", "line1": "It has mostly unsaturated fats, including MUFA and some ALA.", "line2": "But it can contain erucic acid depending on the source.", "line3": "No effect on thyroid.", "status": null },
      { "id": 42, "category": "Oils & Spices", "image": "/images/turmeric-holud.png", "name": "Turmeric", "line1": "It has curcumin, a plant compound with antioxidant activity.", "line2": "But the body absorbs curcumin poorly on its own.", "line3": "No effect on thyroid.", "status": null },
      { "id": 43, "category": "Oils & Spices", "image": "/images/cumin-jira.png", "name": "Cumin", "line1": "It has small amounts of iron and helpful plant oils.", "line2": "But normal cooking uses tiny amounts, so nutrients are small.", "line3": "No effect on thyroid.", "status": null },
      { "id": 44, "category": "Oils & Spices", "image": "/images/chilies-green-dried-kacha-shukna-morich.png", "name": "Chilies", "line1": "They give vitamin C and capsaicin.", "line2": "But they can irritate people who have acid reflux.", "line3": "No effect on thyroid.", "status": null },
      { "id": 45, "category": "Oils & Spices", "image": "/images/coriander-leaf-seed-dhone-pata-dhone-dana.png", "name": "Coriander", "line1": "The leaves and seeds have antioxidants and a fresh taste.", "line2": "But usual serving sizes are too small to change nutrition much.", "line3": "No effect on thyroid.", "status": null },
      { "id": 46, "category": "Vegetables", "image": "/images/cabbage-badhakopi.png", "name": "Cabbage", "line1": "It has vitamin C, vitamin K, fiber, and plant chemicals.", "line2": "But raw or very big amounts can make it harder for the body to use iodine.", "line3": "Has goitrogens. Limit or avoid, especially when raw.", "status": {"key": "goitrogen_present"} },
      { "id": 47, "category": "Vegetables", "image": "/images/cauliflower-fulkopi.png", "name": "Cauliflower", "line1": "It gives vitamin C, vitamin K, and fiber.", "line2": "But in large raw amounts it may reduce iodine use in the body.", "line3": "Has goitrogens. Limit or avoid, especially when raw.", "status": {"key": "goitrogen_present"} },
      { "id": 48, "category": "Vegetables", "image": "/images/broccoli-brokoli.png", "name": "Broccoli", "line1": "It has vitamin C, vitamin K, folate, and special plant compounds.", "line2": "But big raw servings can act as goitrogens.", "line3": "Has goitrogens. Limit or avoid, especially when raw.", "status": {"key": "goitrogen_present"} },
      { "id": 49, "category": "Vegetables", "image": "/images/radish-mula.png", "name": "Radish", "line1": "It has vitamin C, potassium, and fiber.", "line2": "But large raw amounts can make goitrogen compounds.", "line3": "Has goitrogens. Limit or avoid, especially when raw.", "status": {"key": "goitrogen_present"} },
      { "id": 50, "category": "Grains", "image": "/images/millet-bajra-kangni.png", "name": "Millet", "line1": "It is a whole grain with fiber, magnesium, and B-vitamins.", "line2": "But high millet intake with low iodine can slow thyroid activity.", "line3": "Has goitrogens. Limit intake, especially if iodine deficient.", "status": {"key": "goitrogen_present"} },
      { "id": 51, "category": "Soy & Alternatives", "image": "/images/tofu-tofu.png", "name": "Tofu", "line1": "It gives plant protein and sometimes calcium if calcium-set.", "line2": "But soy can lower thyroid pill absorption if eaten at the same time.", "line3": "It's best to wait 4 hours between eating soy and taking thyroid pills.", "status": null },
      { "id": 52, "category": "Soy & Alternatives", "image": "/images/soy-milk-soyadudh.png", "name": "Soy milk", "line1": "It provides plant protein and is often calcium-fortified.", "line2": "But it usually has little iodine unless it is fortified.", "line3": "It's best to wait 4 hours between eating soy and taking thyroid pills.", "status": null }
    ]
  },
  guide: {
    title: "Thyroid Q&A Guide",
    toggleLang: "বাংলা",
    data: [
      { "title": "Core Concepts (Basics)", "qa": [ { "question": "Where is the thyroid gland located?", "answer": "At the front of the neck below the Adam’s apple; butterfly‑shaped with two lobes connected by an isthmus." }, { "question": "Which thyroid hormones are produced?", "answer": "Mainly thyroxine (T4) and triiodothyronine (T3)." }, { "question": "What does TSH do?", "answer": "Pituitary thyroid‑stimulating hormone (TSH) tells the thyroid how much hormone to make." }, { "question": "Why is thyroid balance important?", "answer": "Thyroid hormones affect metabolism, temperature, mood, heart rate, energy, and many organs." }, { "question": "What does euthyroid mean?", "answer": "Blood thyroid hormone levels are within the normal range." }, { "question": "What is hypothyroidism?", "answer": "A state of insufficient thyroid hormone for the body’s needs." }, { "question": "What is hyperthyroidism?", "answer": "Excess thyroid hormone in the bloodstream relative to the body’s needs." }, { "question": "What is a goiter?", "answer": "An enlarged thyroid causing a neck swelling; may be diffuse or nodular." }, { "question": "What is a thyroid nodule?", "answer": "One or more lumps inside the thyroid; most are benign, some require biopsy." }, { "question": "Which body systems are affected by thyroid disorders?", "answer": "Heart, brain/nerves, weight and lipids, skin/hair, menstrual and fertility health." } ] },
      { "title": "Physiology", "qa": [ { "question": "How do the brain and thyroid communicate?", "answer": "Hypothalamus and pituitary adjust TSH; thyroid responds with T4/T3—negative feedback loop." }, { "question": "What happens to TSH in hyperthyroidism?", "answer": "It is typically low because the pituitary reduces the signal when hormones are high." }, { "question": "What happens to TSH in hypothyroidism?", "answer": "It is typically high because the pituitary increases the signal when hormones are low." }, { "question": "Where is T4 converted to active T3?", "answer": "In tissues by deiodinase enzymes." }, { "question": "How do thyroid hormones affect metabolism?", "answer": "They regulate energy production and expenditure, heat generation, and protein turnover." }, { "question": "Why are rapid hormone swings risky?", "answer": "They disturb pulse, mood, sleep, weight, glucose, and lipids, increasing complications." }, { "question": "Why does diabetes care often include thyroid checks?", "answer": "Uncontrolled thyroid function worsens glycemic control." }, { "question": "How are hair and skin affected?", "answer": "Hypothyroidism causes dry skin and hair loss; hyperthyroidism causes fine hair and sweating." }, { "question": "How is mood affected?", "answer": "Hypothyroidism: slowing and low mood; hyperthyroidism: restlessness and anxiety." }, { "question": "What are the cardiac effects?", "answer": "Hyperthyroidism: tachycardia/arrhythmia; hypothyroidism: bradycardia and higher LDL." } ] },
      { "title": "Hypothyroidism — Symptoms", "qa": [ { "question": "Why does weight increase?", "answer": "Slowed metabolism and fluid retention raise weight." }, { "question": "Why does fatigue and sleepiness occur?", "answer": "Lower energy production leads to tiredness and somnolence." }, { "question": "Why is cold intolerance common?", "answer": "Reduced heat production." }, { "question": "Why does constipation occur?", "answer": "Bowel motility slows with lower metabolic rate." }, { "question": "Why does hair fall out?", "answer": "Hair follicles cycle more slowly; shafts become dry and brittle." }, { "question": "Why are memory and focus affected?", "answer": "Cerebral processing slows; attention and recall decline." }, { "question": "Why is skin dry?", "answer": "Sweat/sebum production falls; skin becomes rough." }, { "question": "Why does muscle weakness happen?", "answer": "Lower energy and slower protein turnover." }, { "question": "How can fertility be affected?", "answer": "Ovulation and menstrual cycles can be disrupted." }, { "question": "Can depression worsen?", "answer": "Yes—neurotransmitter and metabolic effects can aggravate depressive symptoms." } ] },
      { "title": "Hypothyroidism — Causes & Conditions", "qa": [ { "question": "What is an autoimmune cause?", "answer": "Immune cells attack thyroid tissue, gradually reducing function." }, { "question": "How does iodine deficiency cause disease?", "answer": "Hormone synthesis drops; thyroid enlarges and forms goiter." }, { "question": "Why does hypothyroidism follow surgery or radioiodine?", "answer": "Removing or ablating tissue reduces or eliminates hormone production." }, { "question": "Who gets congenital hypothyroidism?", "answer": "Some infants are born with absent or poorly formed glands." }, { "question": "Can medicines cause hypothyroidism?", "answer": "Yes—some drugs impair thyroid function; monitoring is needed." }, { "question": "What is Hashimoto’s thyroiditis?", "answer": "Chronic autoimmune inflammation often leading to permanent hypothyroidism." }, { "question": "Why can Hashimoto’s show brief hyper‑like symptoms?", "answer": "Stored hormone may spill into blood during active inflammation." }, { "question": "How is Hashimoto’s diagnosed?", "answer": "By hormone profile, thyroid antibodies, and ultrasound; FNAC if indicated." }, { "question": "What long‑term therapy is typical in Hashimoto’s?", "answer": "Most patients require lifelong levothyroxine with regular follow‑up." }, { "question": "Why does hypothyroidism raise cholesterol?", "answer": "Metabolic clearance of lipids slows." } ] },
      { "title": "Hypothyroidism — Treatment & Self‑care", "qa": [ { "question": "What is the main treatment?", "answer": "Levothyroxine to replace missing hormone." }, { "question": "When should levothyroxine be taken?", "answer": "Every morning on an empty stomach; wait 30–60 minutes before food." }, { "question": "Which foods/supplements should be spaced from the dose?", "answer": "Milk, calcium/iron, and antacids—separate by at least 4 hours." }, { "question": "Is the dose the same for everyone?", "answer": "No—individualized based on labs, symptoms, age, and weight." }, { "question": "What suggests under‑replacement?", "answer": "Persistent hypo symptoms: fatigue, cold intolerance, constipation." }, { "question": "What suggests over‑replacement?", "answer": "Palpitations, reduced sleep, weight loss—hyper‑like symptoms." }, { "question": "What exercise is safe?", "answer": "Regular walking/light cardio; increase duration gradually." }, { "question": "Why prioritize sleep and stress control?", "answer": "Consistent routines support hormonal stability and well‑being." }, { "question": "How to approach weight management?", "answer": "Gradual loss with balanced diet, activity, and adequate sleep." }, { "question": "When to seek urgent care?", "answer": "Severe palpitations, rapid weight change, pregnancy planning, or new major symptoms." } ] },
      { "title": "Hyperthyroidism — Symptoms & Causes", "qa": [ { "question": "What are common hyperthyroid symptoms?", "answer": "Palpitations, tremor, heat intolerance, weight loss, insomnia, and anxiety." }, { "question": "What is Graves’ disease?", "answer": "Autoantibodies stimulate the thyroid like TSH, causing persistent overproduction." }, { "question": "What is a toxic nodule?", "answer": "An overactive nodule making hormone independent of TSH control." }, { "question": "Why is thyroiditis hyper‑phase possible?", "answer": "Inflammation releases preformed hormone into the blood." }, { "question": "Why can eyes bulge or feel dry in Graves’?", "answer": "Orbital tissues become involved, pushing the eye forward and reducing lubrication." }, { "question": "Why are frequent stools common?", "answer": "Higher metabolic and bowel motility." }, { "question": "Why does proximal muscle weakness occur?", "answer": "Catabolism increases, weakening shoulder/hip muscles." }, { "question": "What are cardiac risks?", "answer": "Tachycardia and arrhythmias; heart failure risk rises in predisposed patients." }, { "question": "Why does weight drop?", "answer": "Raised energy expenditure and catabolism." }, { "question": "How is sleep affected?", "answer": "Insomnia and restlessness are common." } ] },
      { "title": "Hyperthyroidism — Treatment", "qa": [ { "question": "What are first‑line medicines?", "answer": "Antithyroid drugs such as carbimazole or propylthiouracil." }, { "question": "Are medicines a permanent cure?", "answer": "Not always—relapse can occur; long‑term planning is needed." }, { "question": "What does radioactive iodine do?", "answer": "It selectively ablates overactive thyroid tissue (contraindicated in pregnancy)." }, { "question": "When is surgery used?", "answer": "When medicines or RAI fail, or cancer is suspected—thyroidectomy may cure." }, { "question": "How to take carbimazole?", "answer": "Usually after meals at fixed times; dosing guided by labs." }, { "question": "What about exercise during active hyperthyroidism?", "answer": "Light walking only; avoid strenuous activity until controlled." }, { "question": "Any dietary tips?", "answer": "Avoid excess iodine (e.g., seaweed); reduce caffeine; ensure hydration." }, { "question": "Why is follow‑up crucial?", "answer": "Hormone levels change over time; therapy must be adjusted." }, { "question": "What often follows RAI?", "answer": "Hypothyroidism requiring levothyroxine replacement." }, { "question": "When to seek urgent help?", "answer": "Severe palpitations, breathlessness, or eye emergencies." } ] },
      { "title": "Goiter & Nodules", "qa": [ { "question": "Why does goiter occur?", "answer": "Iodine deficiency, TSH changes, and inflammation can enlarge the thyroid." }, { "question": "Can multiple nodules form?", "answer": "Yes—multinodular goiter is common." }, { "question": "How does swelling progress?", "answer": "From subtle to visible; large goiters may compress airway/esophagus." }, { "question": "Are nodules painful?", "answer": "Usually not; evaluation is still necessary." }, { "question": "Why is ultrasound important?", "answer": "It assesses number, size, and risk features of nodules." }, { "question": "What is FNAC?", "answer": "Fine‑needle aspiration cytology to examine cells for malignancy." }, { "question": "Why emphasize ≥1 cm nodules?", "answer": "Nodules ≥1 cm often warrant FNAC based on ultrasound risk features." }, { "question": "Why does iodine deficiency cause ‘neck crowding’?", "answer": "TSH rises and the gland enlarges—endemic goiter." }, { "question": "Why operate on large goiters in time?", "answer": "To prevent compression symptoms and complications." }, { "question": "Are all nodules cancer?", "answer": "No—most are benign, but testing identifies the risky ones." } ] },
      { "title": "Thyroid Cancer — Features & Types", "qa": [ { "question": "What are common cancer clues?", "answer": "Hard fixed nodule, enlarged neck nodes, hoarseness, dysphagia, or dyspnea." }, { "question": "Are most nodules malignant?", "answer": "No, but some hide cancer—hence risk stratification." }, { "question": "What is papillary thyroid carcinoma?", "answer": "The most common type with generally excellent outcomes." }, { "question": "What is follicular carcinoma?", "answer": "Less common; may spread via the bloodstream." }, { "question": "What is medullary carcinoma?", "answer": "Can be sporadic or hereditary; outcomes vary." }, { "question": "What is anaplastic carcinoma?", "answer": "A rare, aggressive cancer of older adults; difficult to treat." }, { "question": "What raises cancer risk?", "answer": "Childhood radiation exposure and certain genetic syndromes." }, { "question": "Does chronic inflammation raise risk?", "answer": "Long‑standing autoimmune thyroiditis may increase risk slightly." }, { "question": "When is urgent referral needed?", "answer": "Rapidly enlarging hard mass, breathing difficulty, or new hoarseness." }, { "question": "How effective is FNAC?", "answer": "Highly useful for diagnosis and triage in most nodules." } ] },
      { "title": "Thyroid Cancer — Treatment", "qa": [ { "question": "What is the primary treatment?", "answer": "Surgery—partial or total thyroidectomy depending on stage." }, { "question": "Why suppress TSH after surgery?", "answer": "To reduce stimulation of any residual cancer with levothyroxine." }, { "question": "When is radioactive iodine indicated?", "answer": "For higher‑risk disease to ablate residual tissue or microscopic spread." }, { "question": "What if lymph nodes are involved?", "answer": "Neck dissection plus TSH suppression and possible RAI." }, { "question": "What about distant spread?", "answer": "Thyroidectomy first if feasible, then RAI/beam therapy and suppression." }, { "question": "Why is follow‑up essential?", "answer": "To detect recurrence early and adjust therapy." }, { "question": "Will lifelong hormone be needed after surgery?", "answer": "Often yes—levothyroxine replacement is typical." }, { "question": "Can life return to normal after treatment?", "answer": "Most patients resume normal life with appropriate care." }, { "question": "Is biopsy always required?", "answer": "Biopsy/FNAC depends on size and ultrasound risk features." }, { "question": "What are RAI side effects?", "answer": "Temporary salivary discomfort and later hypothyroidism in many patients." } ] },
      { "title": "Tests & Reports", "qa": [ { "question": "Which tests are commonly used?", "answer": "TSH, Free T4/T3, thyroid antibodies, ultrasound, and FNAC." }, { "question": "What does a high TSH usually mean?", "answer": "Primary hypothyroidism—needs evaluation or dose adjustment." }, { "question": "What does a low TSH usually mean?", "answer": "Hyperthyroidism—treat according to cause." }, { "question": "How are disorders separated by labs?", "answer": "By the TSH/FT4 pattern alongside symptoms and imaging." }, { "question": "When should tests be repeated?", "answer": "After dose changes, new symptoms, or during pregnancy." }, { "question": "How is iodine status considered?", "answer": "By diet, locality, and clinical assessment." }, { "question": "What is a ‘thyroid card’?", "answer": "A record of dates, results, doses, and symptoms to track care." }, { "question": "Any special tests for Graves’?", "answer": "Autoantibodies, and sometimes nuclear scans or detailed ultrasound." }, { "question": "When is a scan needed?", "answer": "In complex cases where functional assessment is required." }, { "question": "When to test children?", "answer": "Newborn screening and symptom‑driven testing via pediatricians." } ] },
      { "title": "Surgery (Thyroidectomy)", "qa": [ { "question": "When is surgery indicated?", "answer": "Cancer/suspicion, large goiter, complicated nodules, or failed other therapies." }, { "question": "When is observation acceptable?", "answer": "Small, low‑risk nodules without symptoms under surveillance." }, { "question": "What types of operations exist?", "answer": "Partial or total thyroidectomy; node dissection when needed." }, { "question": "What are key risks?", "answer": "Voice changes, low calcium, and bleeding—reduced with expert care." }, { "question": "How is surgery performed safely?", "answer": "Standardized techniques by experienced surgeons." }, { "question": "Will medicines be needed afterward?", "answer": "Often lifelong levothyroxine; monitor calcium early on." }, { "question": "What is recovery like?", "answer": "Most return to routine life; follow‑up manages issues early." }, { "question": "Why not delay for very large swelling?", "answer": "Compression risk increases—timely surgery prevents problems." }, { "question": "Are there non‑surgical alternatives?", "answer": "Selected cases may use RAI or medication; individualized decisions." }, { "question": "What if hoarseness develops after surgery?", "answer": "Seek prompt evaluation—nerve function and calcium must be checked." } ] },
      { "title": "Women’s Health & Pregnancy", "qa": [ { "question": "Why do menstrual irregularities occur?", "answer": "Hormonal imbalance alters cycle timing and flow." }, { "question": "How does thyroid function affect fertility?", "answer": "An abnormal thyroid can disrupt ovulation and implantation." }, { "question": "What are pregnancy risks of maternal hypothyroidism?", "answer": "Complications for mother and fetus—control is essential." }, { "question": "How to use medicines during pregnancy?", "answer": "Levothyroxine is safe under medical guidance; monitor frequently." }, { "question": "Is RAI allowed during pregnancy?", "answer": "No—radioactive iodine is contraindicated." }, { "question": "What is postpartum thyroiditis?", "answer": "A transient hyper‑then‑hypo pattern after delivery in some women." }, { "question": "Is breastfeeding compatible with therapy?", "answer": "Yes—under clinician guidance and appropriate dosing." }, { "question": "How to manage Graves’ in pregnancy?", "answer": "Specialist care with careful medication and eye protection as needed." }, { "question": "What to do before planned conception?", "answer": "Achieve euthyroid state and stabilize dose beforehand." }, { "question": "Who is higher risk?", "answer": "Those with prior thyroid disease, autoimmunity, or strong family history." } ] },
      { "title": "Children & Teens", "qa": [ { "question": "What about newborns?", "answer": "Screening and prompt treatment if abnormal to prevent impairment." }, { "question": "How can development be affected?", "answer": "Untreated hypothyroidism can impair physical and cognitive growth." }, { "question": "How are pediatric doses handled?", "answer": "By specialists with age‑ and weight‑adjusted dosing." }, { "question": "What are teen concerns?", "answer": "Weight, mood, and school performance; follow‑up is vital." }, { "question": "Why is early screening crucial?", "answer": "Early treatment prevents long‑term harm." }, { "question": "What if a child has goiter?", "answer": "Evaluate cause—iodine status, autoimmunity, and function." }, { "question": "How often to test children?", "answer": "As per the clinician’s schedule for the condition." }, { "question": "Any diet cautions for kids?", "answer": "Balanced nutrition; avoid unsupervised iodine or supplement excess." }, { "question": "How is school performance related?", "answer": "Sleep, mood, and attention improve with proper control." }, { "question": "What changes at puberty?", "answer": "Imbalance may alter timing/pattern of pubertal development." } ] },
      { "title": "Diet & Lifestyle", "qa": [ { "question": "What should a balanced diet include?", "answer": "Grains, pulses, fish/eggs, vegetables, and fruit in moderation." }, { "question": "How to handle goitrogenic foods?", "answer": "Limit raw crucifers/soy excess; cooking reduces goitrogen effect." }, { "question": "Should iodized salt be used?", "answer": "Yes—use in moderation; avoid excess iodine." }, { "question": "How to lose weight in hypothyroidism?", "answer": "Regular meals, fiber and water, and consistent walking." }, { "question": "What beverages to limit in hyperthyroidism?", "answer": "Tea/coffee/energy drinks due to stimulants." }, { "question": "Why is sleep routine important?", "answer": "7–8 hours at consistent times supports hormonal stability." }, { "question": "How to manage stress?", "answer": "Deep breathing, prayer/meditation, and regular relaxation." }, { "question": "Any skin/hair tips?", "answer": "Moisturize, ensure nutrition, and check iron/vitamins if needed." }, { "question": "Is salt allowed?", "answer": "Yes—thyroid disease is not a salt ban, but balance intake." }, { "question": "Is one diet right for all?", "answer": "No—plans are individualized to age, weight, and comorbidities." } ] },
      { "title": "Monitoring & Follow‑up", "qa": [ { "question": "Why is periodic follow‑up essential?", "answer": "Therapy needs adjustment; complications are caught early." }, { "question": "What TSH target should I aim for?", "answer": "Targets vary by diagnosis and person; follow your clinician’s plan." }, { "question": "What if I miss a dose?", "answer": "Take the next dose as usual; do not double without advice." }, { "question": "When to recheck after dose changes?", "answer": "Typically 4–6 weeks after adjustments." }, { "question": "What goes on a ‘thyroid card’?", "answer": "Dates, results, doses, symptoms, and special notes." }, { "question": "When is urgent service needed?", "answer": "Breathlessness, severe palpitations, rapid change in voice or swelling." }, { "question": "How to keep documents organized?", "answer": "Bookmark key pages; maintain notes and QR references if available." }, { "question": "How to self‑monitor?", "answer": "Track symptoms, pulse, and weight to discuss at clinic visits." }, { "question": "When should doses change?", "answer": "During pregnancy, large weight change, or new symptoms—guided by labs." }, { "question": "Should I stop medicines on my own?", "answer": "No—never change therapy without medical advice." } ] },
      { "title": "Patient Guidance (What to Do)", "qa": [ { "question": "What if I feel a neck lump?", "answer": "Get ultrasound ± FNAC—don’t ignore painless lumps." }, { "question": "What if my periods are irregular?", "answer": "Check thyroid labs and consult your clinician." }, { "question": "What if my weight jumps up suddenly?", "answer": "Screen for hypothyroidism and review therapy." }, { "question": "What if my weight drops unexpectedly?", "answer": "Consider hyperthyroidism; test and treat the cause." }, { "question": "How to plan pregnancy safely?", "answer": "Normalize thyroid function before conceiving." }, { "question": "What if surgery is mentioned?", "answer": "Don’t panic—seek timely specialist evaluation and counseling." }, { "question": "What if cancer is diagnosed?", "answer": "Stage‑based surgery ± RAI ± TSH suppression with regular follow‑up." }, { "question": "What if I suspect thyrotoxicosis?", "answer": "Seek prompt care, especially for pulse, eyes, and weight changes." }, { "question": "What if mood/sleep is poor?", "answer": "Check thyroid profile and optimize lifestyle alongside care." }, { "question": "What if I have diabetes too?", "answer": "Optimizing thyroid function improves glucose control." } ] }
    ]
  },
  doseDoctor: {
    generateButton: "Generate Recommendation",
    startNewCaseButton: "Start New Case",
    disclaimer: "Disclaimer: This tool is intended for use by licensed healthcare professionals only. The recommendations are based on standard clinical guidelines but must be reviewed and verified against the clinician's own judgment and the patient's full clinical context. The creators are not liable for any clinical decisions made based on this tool's output.",
    loading: "Generating recommendation...",
    error: {
      title: "Error",
      message: "Failed to generate a recommendation. The model may have returned an invalid response. Please check the inputs and try again.",
      tryAgain: "Try Again"
    },
    form: {
      patientHistory: {
        title: "Patient & Clinical History",
        age: "Age (years)",
        weight: "Weight (kg)",
        height: "Height (cm)",
        sex: "Sex",
        sexOptions: { female: "Female", male: "Male", other: "Other" },
        pregnancy: "Pregnancy Status",
        pregnancyOptions: {
          not_pregnant: "Not Pregnant",
          planning: "Planning",
          T1: "1st Trimester",
          T2: "2nd Trimester",
          T3: "3rd Trimester",
          postpartum: "Postpartum"
        },
        heartDisease: "Heart Disease/HF",
        thyroidectomy: "Thyroidectomy",
        rai: "Prior RAI",
        ckd: "CKD",
        liverDisease: "Liver Disease"
      },
      labResults: {
        title: "Lab Results",
        tsh: "TSH Value*",
        tshRefLow: "TSH Ref Low",
        tshRefHigh: "TSH Ref High",
        ft4: "FT4 Value",
        ft4RefLow: "FT4 Ref Low",
        ft4RefHigh: "FT4 Ref High",
        t3Type: "T3 Type",
        t3Options: { none: "None", FT3: "Free T3", TT3: "Total T3" },
        t3Value: "T3 Value",
        trab: "TRAb Value (IU/L)",
        editRefRanges: "Edit Reference Ranges",
        hideRefRanges: "Hide Reference Ranges",
      },
      medication: {
        title: "Current Medication",
        drug: "Current Drug",
        drugOptions: {
          none: "None",
          LT4: "Levothyroxine (LT4)",
          carbimazole: "Carbimazole",
          methimazole: "Methimazole",
          PTU: "PTU"
        },
        dose: "Current Dose (mcg or mg)",
        adherence: "Adherence",
        adherenceOptions: { good: "Good", inconsistent: "Inconsistent", poor: "Poor" },
        lastChange: "Weeks Since Last Change"
      }
    },
    result: {
      title: (action: string) => `Recommendation: ${action.replace('_', ' ')}`,
      maintainDose: (drug: string, dose: string, unit: string) => `Maintain ${drug} ${dose}${unit}`,
      newDose: (drug: string, dose: string) => `${drug} → ${dose}`,
      rationale: "Rationale",
      nextSteps: "Next Steps"
    }
  },
  chatMessages: [
    "Thyroid medicine works slowly. Taking it correctly every day keeps your body healthy.",
    "Thyroid hormone controls your body's energy, so don't skip your medication.",
    "Take your medicine at the same time every morning. This helps keep your hormones balanced.",
    "Levothyroxine works best on an empty stomach. Take it 30 minutes before breakfast.",
    "Wait a little while after taking your medicine before eating anything. This helps it absorb properly.",
    "Don't take your thyroid medicine with milk or coffee. Use only water.",
    "Calcium or iron tablets can reduce the effectiveness of thyroid medicine. Take them 4 hours after your thyroxine.",
    "If you forget your medicine today, don't take two tomorrow. Just resume your normal schedule.",
    "It's not safe to change your dose on your own. Ask your doctor first.",
    "Regular blood tests help check if your dose is right. Get tested every 1-2 months.",
    "If you feel very tired for a long time, tell your doctor. Your dose might need checking.",
    "If you have palpitations for a long time, check if your thyroid is overactive.",
    "If you have neck swelling, trouble swallowing, or breathing difficulties, see a doctor quickly. These could be thyroid symptoms.",
    "Use iodized salt. It provides the iodine your thyroid needs.",
    "Eating sea fish once or twice a week is good for your thyroid. They contain iodine.",
    "Don't stop taking your medicine just because you feel better. Follow the rules.",
    "If you start any new medicine, tell your doctor. This helps keep your thyroid dose correct.",
    "Adequate sleep helps balance hormones. Try to sleep and wake up at the same time every day.",
    "Reducing stress helps keep your body balanced. Try to stay calm.",
    "Walk a little every day. It's good for both your weight and your thyroid.",
    "Don't be scared if your weight suddenly goes up or down; get a blood test.",
    "Thyroid care is very important during pregnancy. Get regular tests and follow your doctor's instructions.",
    "Track whether you're taking your medicine daily using our app.",
    "Write down your symptoms. This helps the doctor adjust your dose easily.",
    "Keep your reports together. Use the Thyroid Shati app to record them.",
    "Set a daily alarm to take your medicine. It makes it easier to stick to the routine.",
    "Don't copy someone else's dose. Your body needs a different dose.",
    "If you frequently miss your medicine, don't be ashamed. Track it and talk to your doctor.",
    "Suddenly stopping medicine after many years can cause problems.",
    "Food, sleep, and medicine — following these three rules keeps your thyroid in check."
  ]
};

export type AppCopy = typeof enCopy;