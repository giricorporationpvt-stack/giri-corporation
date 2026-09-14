/**
 * Giri — Sovereign Multilingual Translation Engine (i18n.js)
 * Supports all 22 Eighth Schedule Indian Languages + English:
 * 1. Instant client-side DOM translation engine (0ms latency, zero external dependencies).
 * 2. Caches original English text nodes on first read; restores pristine text in 0ms on reverting to English.
 * 3. Comprehensive dictionaries covering apps.html, index.html, and founder.html.
 * 4. Persistent state across pages and navigation via localStorage.
 */

export const INDIAN_LANGUAGES = [
  { code: 'en', name: 'English (India)', native: 'English', display: 'India (EN)', script: 'Latin', region: 'Pan-India Standard' },
  { code: 'hi', name: 'Hindi', native: 'हिन्दी', display: 'भारत (HI)', script: 'Devanagari', region: 'Northern & Central India' },
  { code: 'bn', name: 'Bengali', native: 'বাংলা', display: 'ভারত (BN)', script: 'Bengali', region: 'West Bengal, Tripura, Assam' },
  { code: 'te', name: 'Telugu', native: 'తెలుగు', display: 'భారత్ (TE)', script: 'Telugu', region: 'Andhra Pradesh, Telangana' },
  { code: 'mr', name: 'Marathi', native: 'मराठी', display: 'भारत (MR)', script: 'Devanagari', region: 'Maharashtra, Goa' },
  { code: 'ta', name: 'Tamil', native: 'தமிழ்', display: 'இந்தியா (TA)', script: 'Tamil', region: 'Tamil Nadu, Puducherry' },
  { code: 'gu', name: 'Gujarati', native: 'ગુજરાતી', display: 'ભારત (GU)', script: 'Gujarati', region: 'Gujarat' },
  { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ', display: 'ಭಾರತ (KN)', script: 'Kannada', region: 'Karnataka' },
  { code: 'ml', name: 'Malayalam', native: 'മലയാളം', display: 'ഭാരതം (ML)', script: 'Malayalam', region: 'Kerala, Lakshadweep' },
  { code: 'pa', name: 'Punjabi', native: 'ਪੰਜਾਬੀ', display: 'ਭਾਰਤ (PA)', script: 'Gurmukhi', region: 'Punjab, Chandigarh' },
  { code: 'or', name: 'Odia', native: 'ଓଡ଼ିଆ', display: 'ଭାରତ (OR)', script: 'Odia', region: 'Odisha' },
  { code: 'as', name: 'Assamese', native: 'অসমীয়া', display: 'ভাৰত (AS)', script: 'Bengali-Assamese', region: 'Assam' },
  { code: 'ur', name: 'Urdu', native: 'اردو', display: 'ہندوستان (UR)', script: 'Perso-Arabic', region: 'Pan-India' },
  { code: 'sa', name: 'Sanskrit', native: 'संस्कृतम्', display: 'भारतम् (SA)', script: 'Devanagari', region: 'Classical Heritage' },
  { code: 'mai', name: 'Maithili', native: 'मैथिली', display: 'भारत (MAI)', script: 'Devanagari / Tirhuta', region: 'Bihar, Jharkhand' },
  { code: 'sat', name: 'Santali', native: 'ᱥᱟᱱᱛᱟᱲᱤ', display: 'ᱥᱤᱧᱚᱛ (SAT)', script: 'Ol Chiki', region: 'Jharkhand, Odisha' },
  { code: 'ks', name: 'Kashmiri', native: 'कॉशुर / كٲشُر', display: 'کٔشِیر (KS)', script: 'Perso-Arabic / Devanagari', region: 'Jammu & Kashmir' },
  { code: 'ne', name: 'Nepali', native: 'नेपाली', display: 'भारत (NE)', script: 'Devanagari', region: 'Sikkim, West Bengal' },
  { code: 'kok', name: 'Konkani', native: 'कोंकणी', display: 'भारत (KOK)', script: 'Devanagari', region: 'Goa, Maharashtra, Karnataka' },
  { code: 'sd', name: 'Sindhi', native: 'سنڌي / सिंधी', display: 'سنڌي (SD)', script: 'Perso-Arabic / Devanagari', region: 'Western India' },
  { code: 'doi', name: 'Dogri', native: 'डोगरी', display: 'भारत (DOI)', script: 'Devanagari', region: 'Jammu & Kashmir' },
  { code: 'brx', name: 'Bodo', native: 'बड़ो', display: 'भारत (BRX)', script: 'Devanagari', region: 'Bodoland, Assam' },
  { code: 'mni', name: 'Manipuri', native: 'মৈতৈলোন্ / ꯃꯤꯇꯩꯂꯣꯟ', display: 'ভারত (MNI)', script: 'Meetei Mayek / Bengali', region: 'Manipur' }
];

export const TRANSLATION_DICTIONARY = {
  hi: {
    "Explore Apps & Tools": "ऐप्स एवं टूल्स देखें",
    "The Founder's Letter ›": "संस्थापक का पत्र ›",
    "Girionix AI: The Polymath Companion for India": "गिरिओनिक्स एआई: भारत के लिए पॉलीमैथ साथी",
    "Live React 18 & TypeScript IDE in-browser": "ब्राउज़र में लाइव रिएक्ट 18 और टाइपस्क्रिप्ट आईडीई",
    "Screenplay Studio with Hollywood industry beats": "हॉलीवुड उद्योग प्रारूप के साथ पटकथा स्टूडियो",
    "Olympiad Math derivation & KaTeX proofing": "ओलंपियाड गणित समाधान एवं KaTeX प्रमाणन",
    "100% On-Device Titan Intelligence (Zero Server Data)": "100% ऑन-डिवाइस टाइटन बुद्धिमत्ता (शून्य सर्वर डेटा)",
    "Polymath AI Workspace": "पॉलीमैथ एआई वर्कस्पेस",
    "Distraction-free notes": "शांत व एकाग्र नोट्स",
    "Rupee-first family finance": "रुपया-प्रथम पारिवारिक वित्त",
    "Keynotes & slide decks": "प्रस्तुति एवं स्लाइड डेक्स",
    "FLAGSHIP SOVEREIGN AI": "फ़्लैगशिप संप्रभु एआई",
    "Accessibility & Comfort Suite": "सुगमता एवं सुविधा सुइट",
    "Font Size Scaling": "फ़ॉन्ट आकार स्केलिंग",
    "Adjust typography scale": "अक्षरों का आकार समायोजित करें",
    "Normal (100%)": "सामान्य (100%)",
    "Large (115%)": "बड़ा (115%)",
    "Extra Large (125%)": "अतिरिक्त बड़ा (125%)",
    "High-Contrast Mode": "उच्च-कंट्रास्ट मोड",
    "Maximize contrast for visual clarity (WCAG AAA)": "स्पष्टता के लिए कंट्रास्ट अधिकतम करें (WCAG AAA)",
    "Reduced Motion": "धीमी गति (कम एनिमेशन)",
    "Silence background ambient animations": "पृष्ठभूमि एनिमेशन बंद करें",
    "Full Motion": "पूर्ण गति",
    "Disabled": "निष्क्रिय",
    "Enabled": "सक्रिय",
    "My Sovereign Data Hub": "मेरा संप्रभु डेटा हब",
    "Every Giri application stores 100% of your notes, budgets, decks, and settings locally on your physical machine. Nothing is ever synchronized to remote server databases.": "प्रत्येक गिरी एप्लिकेशन आपके 100% नोट्स, बजट, स्लाइड्स और सेटिंग्स को स्थानीय रूप से आपकी मशीन पर संग्रहीत करता है। कुछ भी दूरस्थ सर्वर डेटाबेस पर सिंक नहीं किया जाता है।",
    "Drift Drafts": "ड्रिफ्ट नोट्स",
    "Axis Ledger Entries": "एक्सिस प्रविष्टियां",
    "Local Footprint": "स्थानीय स्टोरेज",
    "Export All Data (JSON)": "सभी डेटा निर्यात करें (JSON)",
    "Wipe Local Data": "स्थानीय डेटा हटाएं",
    "Sovereign Data Hub": "संप्रभु डेटा हब",
    "Find Your Perfect Tool": "अपना उत्तम टूल चुनें",
    "Answer 1 question to get the ideal Giri application tailored to your goals": "अपने लक्ष्यों के अनुकूल आदर्श गिरी एप्लिकेशन पाने के लिए 1 प्रश्न का उत्तर दें",
    "I am a...": "मैं हूँ एक...",
    "Student": "छात्र",
    "Writer": "लेखक",
    "Family / Planner": "परिवार / योजनाकार",
    "Presenter": "प्रस्तुतकर्ता",
    "Polymath / Builder": "पॉलीमैथ / निर्माता",
    "🎧 Listen to Founder's Letter": "🎧 संस्थापक का पत्र सुनें",
    "Click to listen • Powered by client-side speech synthesis": "सुनने के लिए क्लिक करें • ऑन-डिवाइस वाक् संश्लेषण द्वारा संचालित",
  "Home": "होम",
  "Apps and Tools": "ऐप्स और टूल्स",
  "Founder's Letter": "संस्थापक का पत्र",
  "Founder & Vision": "संस्थापक एवं दृष्टिकोण",
  "Edge 100% Live": "एज 100% लाइव",
  "Search Giri Tools": "गिरी टूल्स खोजें",
  "Search Giri Tools (Ctrl+K)": "गिरी टूल्स खोजें (Ctrl+K)",
  "Select Region and Language": "क्षेत्र एवं भाषा चुनें",
  "India (EN)": "भारत (EN)",
  "Launch": "लॉन्च करें",
  "Affordable for Everyone": "सभी के लिए किफायती",
  "Navigation: Click or Press Enter to open": "नेविगेशन: खोलने के लिए क्लिक करें या Enter दबाएं",
  "Keyboard Shortcut:": "कीबोर्ड शॉर्टकट:",
  "or": "या",
  "Select Sovereign Indian Language": "संप्रभु भारतीय भाषा चुनें",
  "22 Officially Recognized Indian Languages + Indian English": "22 आधिकारिक तौर पर मान्यता प्राप्त भारतीय भाषाएं + भारतीय अंग्रेजी",
  "Made in India Promise": "मेक इन इंडिया वादा",
  ": All Giri software runs locally on your machine with zero foreign subscription fees, sacred data privacy, and rupee-first financial intelligence.": ": गिरी का सारा सॉफ्टवेयर आपकी मशीन पर शून्य विदेशी सदस्यता शुल्क, पवित्र डेटा गोपनीयता और रुपया-प्रथम वित्तीय समझ के साथ स्थानीय रूप से चलता है।",
  "Press": "दबाएं",
  "to close": "बंद करने के लिए",
  "EXPLORE APPS & TOOLS": "ऐप्स एवं टूल्स देखें",
  "FOUNDER'S LETTER": "संस्थापक का पत्र",
  "100% Made in India": "100% भारत में निर्मित",
  "₹0 Foreign Dollar Fees": "₹0 विदेशी डॉलर शुल्क",
  "Zero Ad Trackers": "शून्य विज्ञापन ट्रैकर्स",
  "Apps and Tools — Giri | Proudly Made in India": "ऐप्स और टूल्स — गिरी | भारत में गर्व से निर्मित",
  "THE GIRI SUITE • PROUDLY MADE IN INDIA": "द गिरी सुइट • भारत में गर्व से निर्मित",
  "Dedicated Apps & Tools for Everyday Life": "दैनिक जीवन के लिए समर्पित ऐप्स और टूल्स",
  "Sovereign, fast, and radically affordable digital tools designed for normal users, students, creators, and families. No foreign dollar subscriptions, no intrusive ads, and no data selling.": "सामान्य उपयोगकर्ताओं, छात्रों, रचनाकारों और परिवारों के लिए डिज़ाइन किए गए संप्रभु, तेज़ और बेहद किफायती डिजिटल टूल्स। कोई विदेशी डॉलर सदस्यता नहीं, कोई दखल देने वाले विज्ञापन नहीं, और कोई डेटा बेचना नहीं।",
  "All Tools (4)": "सभी टूल्स (4)",
  "AI & Polymath": "एआई और पॉलीमैथ",
  "Writing & Notes": "लेखन एवं नोट्स",
  "Finance & Savings": "वित्त एवं बचत",
  "Presentations & Decks": "प्रस्तुति एवं स्लाइड्स",
  "FLAGSHIP AI • SOVEREIGN WORKSPACE": "फ़्लैगशिप एआई • संप्रभु वर्कस्पेस",
  "✨ Envisioned & Engineered by Abhinav Giri": "✨ अभिनव गिरी द्वारा परिकल्पित एवं निर्मित",
  "Girionix AI": "गिरिओनिक्स एआई",
  "Sovereign Polymath AI Workspace: Think • Create • Explore": "संप्रभु पॉलीमैथ एआई वर्कस्पेस: सोचें • रचें • अन्वेषण करें",
  "The omnipotent sovereign AI workspace that unifies React 18 live code compilation, Hollywood screenplay formatting, Olympiad math derivations, 8K FLUX photorealism, 4K cinema video, and 100% on-device Titan intelligence.": "सर्वशक्तिमान संप्रभु एआई वर्कस्पेस जो रिएक्ट 18 लाइव कोड संकलन, हॉलीवुड पटकथा प्रारूप, ओलंपियाड गणित समाधान, 8K FLUX फोटोरियलिज्म, 4K सिनेमा वीडियो और 100% ऑन-डिवाइस टाइटन बुद्धिमत्ता को एकीकृत करता है।",
  "Live React 18 & TypeScript IDE with instant in-browser execution": "ब्राउज़र में तुरंत निष्पादन के साथ लाइव रिएक्ट 18 और टाइपस्क्रिप्ट आईडीई",
  "Screenplay Studio with Hollywood industry scene beat formatting": "हॉलीवुड उद्योग दृश्य प्रारूप के साथ पटकथा स्टूडियो",
  "Olympiad Math derivation engine with KaTeX symbolic proofing": "KaTeX प्रतीकात्मक प्रमाणन के साथ ओलंपियाड गणित समाधान इंजन",
  "VisionForge 8K FLUX photorealism & cinema video generation": "VisionForge 8K FLUX फोटोरियलिज्म और सिनेमा वीडियो निर्माण",
  "100% On-Device & Air-Gapped Titan physical compute mode": "100% ऑन-डिवाइस एवं एयर-गैप्ड टाइटन फिजिकल कंप्यूट मोड",
  "Olympiad Math & Physics step-by-step rigorous symbolic engine": "ओलंपियाड गणित और भौतिकी चरण-दर-चरण सटीक प्रतीकात्मक इंजन",
  "Titan 100% On-Device Neural Intelligence with zero cloud telemetry": "शून्य क्लाउड टेलीमेट्री के साथ टाइटन 100% ऑन-डिवाइस न्यूरल इंटेलिजेंस",
  "₹0 • Free & Sovereign Access": "₹0 • मुफ़्त और संप्रभु पहुंच",
  "Launch Girionix AI Workspace ↗": "गिरिओनिक्स एआई वर्कस्पेस लॉन्च करें ↗",
  "Launch Girionix AI ↗": "गिरिओनिक्स एआई लॉन्च करें ↗",
  "WRITING • 100% FREE": "लेखन • 100% मुफ़्त",
  "DISTRACTION-FREE WRITING": "एकाग्रता-सुलभ लेखन",
  "Giri Drift": "गिरी ड्रिफ्ट",
  "Drift": "ड्रिफ्ट",
  "Distraction-free mindful notes, journaling & essay writing": "व्याकुलता-मुक्त ध्यानपूर्ण नोट्स, जर्नलिंग और निबंध लेखन",
  "The quiet sanctuary for unhurried thoughts and long-form prose.": "शांत विचारों और गहन गद्य के लिए एक शांत अभयारण्य।",
  "Crafted for students, thinkers, and writers who need a tranquil, noise-free space. Drift loads instantly, persists your thoughts securely in local storage, and never pesters you with subscription popups.": "छात्रों, विचारकों और लेखकों के लिए निर्मित जिन्हें एक शांत, व्याकुलता-मुक्त स्थान की आवश्यकता है। ड्रिफ्ट तुरंत लोड होता है, स्थानीय स्टोरेज में विचारों को सुरक्षित रखता है और सदस्यता पॉपअप से कभी परेशान नहीं करता।",
  "A minimalist writing environment designed to restore mental clarity. Free from intrusive cloud popups, engagement notifications, and AI autocorrect interference.": "मानसिक स्पष्टता बहाल करने के लिए डिज़ाइन किया गया एक न्यूनतम लेखन वातावरण। दखल देने वाले क्लाउड पॉपअप, सूचनाओं और एआई ऑटो-करेक्ट से पूरी तरह मुक्त।",
  "Tranquil focus mode with mathematical optical sizing": "गणितीय ऑप्टिकल आकार के साथ शांत फोकस मोड",
  "Live word counter & estimated reading time telemetry": "लाइव शब्द गणना और अनुमानित पठन समय टेलीमेट्री",
  "One-click note clipboard export & auto-save": "एक क्लिक में क्लिपबोर्ड निर्यात और ऑटो-सेव",
  "100% Private: your thoughts stay strictly on your machine": "100% निजी: आपके विचार केवल आपकी मशीन पर रहते हैं",
  "Full offline execution with local browser storage": "स्थानीय ब्राउज़र स्टोरेज के साथ पूर्ण ऑफ़लाइन निष्पादन",
  "Real-time word, character, and estimated reading time counts": "वास्तविक समय में शब्द, वर्ण और अनुमानित पढ़ने का समय",
  "Instant Markdown export and clean distraction-free typography": "त्वरित मार्कडाउन निर्यात और स्वच्छ व्याकुलता-मुक्त टाइपोग्राफी",
  "Zero telemetry and zero external server tracking": "शून्य टेलीमेट्री और शून्य बाहरी सर्वर ट्रैकिंग",
  "₹0 • Free Forever": "₹0 • हमेशा के लिए मुफ़्त",
  "Open Dedicated Drift Studio": "समर्पित ड्रिफ्ट स्टूडियो खोलें",
  "Launch Drift ↗": "ड्रिफ्ट लॉन्च करें ↗",
  "FINANCE • RUPEE-FIRST": "वित्त • रुपया-प्रथम",
  "LOCAL-FIRST FINANCIAL INTELLIGENCE": "लोकल-फर्स्ट वित्तीय बुद्धिमत्ता",
  "Giri Axis": "गिरी एक्सिस",
  "Axis": "एक्सिस",
  "Visual personal & family finance, savings & budgeting": "व्यक्तिगत एवं पारिवारिक वित्त, बचत और बजट का दृश्य प्रबंधन",
  "Radically private financial modeling and compound interest projections.": "अत्यंत निजी वित्तीय मॉडलिंग और चक्रवृद्धि ब्याज अनुमान।",
  "A stress-free visual alternative to 50-row spreadsheets and foreign budgeting apps. Axis helps Indian families and students plan savings goals and visualize compound growth in transparent Indian Rupees (₹).": "जटिल स्प्रेडशीट और विदेशी ऐप्स का तनाव-मुक्त विकल्प। एक्सिस भारतीय परिवारों और छात्रों को बचत लक्ष्यों की योजना बनाने और भारतीय रुपयों (₹) में चक्रवृद्धि विकास देखने में मदद करता है।",
  "An institutional-grade financial calculator and monthly savings forecaster built strictly for Indian households, creators, and micro-enterprises.": "भारतीय परिवारों, रचनाकारों और छोटे व्यवसायों के लिए विशेष रूप से निर्मित वित्तीय कैलकुलेटर और बचत पूर्वानुमान।",
  "Real-time dynamic 5-year savings projection simulator": "वास्तविक समय गतिशील 5-वर्षीय बचत अनुमान सिमुलेटर",
  "Visual goal milestone cards & monthly budget tracking": "लक्ष्य मील का पत्थर कार्ड और मासिक बजट ट्रैकिंग",
  "Zero data brokering: never sells your financial data to lenders": "शून्य डेटा ब्रोकरिंग: आपका वित्तीय डेटा कभी उधारदाताओं को नहीं बेचता",
  "Optimized for Indian Rupee (₹) household economics": "भारतीय रुपया (₹) घरेलू अर्थशास्त्र के लिए अनुकूलित",
  "Real-time compound interest and investment milestone graphing": "वास्तविक समय में चक्रवृद्धि ब्याज और निवेश मील के पत्थर रेखांकन",
  "Inflation-adjusted purchasing power simulations": "मुद्रास्फीति-समायोजित क्रय शक्ति सिमुलेशन",
  "All calculation logic executes 100% in your local browser": "सभी गणना तर्क आपके स्थानीय ब्राउज़र में 100% निष्पादित होते हैं",
  "Never asks for bank logins, credentials, or personal identity": "बैंक लॉगिन, क्रेडेंशियल या व्यक्तिगत पहचान की कभी मांग नहीं",
  "Open Dedicated Axis Finance": "समर्पित एक्सिस फाइनेंस खोलें",
  "Launch Axis ↗": "एक्सिस लॉन्च करें ↗",
  "KEYNOTE • EFFORTLESS": "कीनोट • सहज एवं सरल",
  "RAPID DECK ENGINE": "तीव्र स्लाइड इंजन",
  "Giri Kinetic": "गिरी काइनेटिक",
  "Kinetic": "काइनेटिक",
  "Cinematic story decks & slide presentations in minutes": "मिनटों में सिनेमाई स्टोरी डेक और स्लाइड प्रस्तुतियां",
  "High-velocity markdown slide generator for creators and educators.": "रचनाकारों और शिक्षकों के लिए उच्च-गति मार्कडाउन स्लाइड जनरेटर।",
  "Build clean, executive-quality presentation decks without fighting clunky menus or paying $20/month. Type your core ideas, and Kinetic's spatial grids lay out typography and visuals with cinematic grace.": "बिना किसी जटिल मेनू या $20/महीने के शुल्क के साफ़, कार्यकारी स्तर के प्रेजेंटेशन डेक बनाएं। अपने मुख्य विचार टाइप करें, और काइनेटिक का स्थानिक ग्रिड उन्हें खूबसूरती से व्यवस्थित करता है।",
  "Transform clean markdown notes into presentation-ready 16:9 widescreen slide decks in under 60 seconds without clumsy drag-and-drop slide builders.": "बिना किसी जटिल ड्रैग-एंड-ड्रॉप स्लाइड बिल्डर के, स्वच्छ मार्कडाउन नोट्स को 60 सेकंड में 16:9 वाइडस्क्रीन स्लाइड में बदलें।",
  "16:9 cinematic presentation viewport & interactive deck player": "16:9 सिनेमाई प्रेजेंटेशन व्यूपोर्ट और इंटरैक्टिव डेक प्लेयर",
  "Smart auto-layout: focus on your story, not complex alignment": "स्मार्ट ऑटो-लेआउट: अपनी कहानी पर ध्यान दें, संरेखण पर नहीं",
  "Ready for college seminars, business pitches & storytelling": "कॉलेज सेमिनार, बिजनेस पिच और प्रस्तुति के लिए तैयार",
  "Instant sharing via web presentation links & one-click export": "वेब लिंक और एक-क्लिक निर्यात के माध्यम से त्वरित साझाकरण",
  "Simple markdown syntax for slides and bullet layouts": "स्लाइड और बुलेट लेआउट के लिए सरल मार्कडाउन सिंटैक्स",
  "Keyboard-driven fullscreen presentation presenter mode": "कीबोर्ड-संचालित फ़ुलस्क्रीन प्रस्तुति मोड",
  "Zero watermark, zero subscription paywalls, and instant PDF print": "शून्य वॉटरमार्क, शून्य सदस्यता दीवारें और त्वरित पीडीएफ प्रिंट",
  "Lightweight and fast even on entry-level student laptops": "शुरुआती स्तर के छात्र लैपटॉप पर भी हल्का और तेज़",
  "Open Dedicated Kinetic Studio": "समर्पित काइनेटिक स्टूडियो खोलें",
  "Launch Kinetic ↗": "काइनेटिक लॉन्च करें ↗",
  "THE GIRI COMMITMENT": "गिरी का संकल्प",
  "Why We Build Differently": "हम अलग तरह से क्यों निर्माण करते हैं",
  "How Giri's homegrown philosophy compares to typical foreign subscription models.": "गिरी का स्वदेशी दर्शन सामान्य विदेशी सदस्यता मॉडल से कैसे बेहतर है।",
  "Typical Foreign Software Giants": "विदेशी सॉफ्टवेयर कंपनियां",
  "Exorbitant Dollar Pricing:": "अत्यधिक डॉलर मूल्य निर्धारण:",
  "$12 to $25/month recurring subscriptions (₹1,200 to ₹2,000 every month) that burden Indian students and families.": "$12 से $25/माह की आवर्ती सदस्यता (हर महीने ₹1,200 से ₹2,000) जो भारतीय छात्रों और परिवारों पर बोझ बनती है।",
  "Surveillance Ad Monetization:": "निगरानी विज्ञापन मुद्रीकरण:",
  "Harvesting private Indian data, selling advertising profiles to third-party data brokers.": "निजी भारतीय डेटा का दोहन और तीसरे पक्ष के डेटा दलालों को विज्ञापन प्रोफाइल बेचना।",
  "Bloated Enterprise Menus:": "बोझिल एंटरप्राइज मेनू:",
  "Hundreds of unnecessary buttons, slow startup times, and constant upgrade notifications.": "सैकड़ों अनावश्यक बटन, धीमी शुरुआत और लगातार अपग्रेड की सूचनाएं।",
  "Heavy Hardware Lock-in:": "भारी हार्डवेयर निर्भरता:",
  "Require costly modern machines, failing on budget smartphones or everyday PCs.": "महंगे आधुनिक कंप्यूटरों की मांग, बजट स्मार्टफोन या साधारण पीसी पर विफल।",
  "Giri (Make in India)": "गिरी (मेक इन इंडिया)",
  "Transparent Rupee Pricing:": "पारदर्शी रुपया मूल्य निर्धारण:",
  "Completely free or deeply affordable in honest Indian Rupees (₹) with zero recurring traps.": "पूरी तरह से मुफ़्त या ईमानदार भारतीय रुपयों (₹) में बेहद किफ़ायती, शून्य आवर्ती जाल के साथ।",
  "Sacred Data Privacy:": "पवित्र डेटा गोपनीयता:",
  "100% local persistence on your machine. Zero tracking, zero ads, zero data brokering.": "आपकी मशीन पर 100% स्थानीय स्टोरेज। शून्य ट्रैकिंग, शून्य विज्ञापन, शून्य डेटा दलाली।",
  "Human-Centric Craft:": "मानव-केंद्रित शिल्प:",
  "Minimalist luxury aesthetics inspired by Apple & Stripe. Clean, fast, and respectful of your attention.": "एप्पल और स्ट्राइप से प्रेरित न्यूनतम लक्जरी सौंदर्य। स्वच्छ, तेज़ और आपके ध्यान का सम्मान करने वाला।",
  "Lightweight & Sovereign:": "हल्का एवं संप्रभु:",
  "Engineered locally to run lightning-fast on ordinary smartphones and older laptops across India.": "भारत भर के साधारण स्मार्टफोन और पुराने लैपटॉप पर बिजली की गति से चलने के लिए स्थानीय रूप से इंजीनियर किया गया।",
  "Founder & Lead Architect": "संस्थापक एवं मुख्य वास्तुकार",
  "THE FOUNDER'S LETTER": "संस्थापक का पत्र",
  "“Indian minds have powered global tech for decades. It is time we build world-class, sovereign, and deeply affordable digital tools for our own people.”": "“भारतीय प्रतिभाओं ने दशकों से वैश्विक तकनीक को शक्ति दी है। अब समय आ गया है कि हम अपने लोगों के लिए विश्वस्तरीय, संप्रभु और बेहद किफायती डिजिटल टूल्स बनाएं।”",
  "Read the personal letter by founder Abhinav Giri on why he started Giri to build honest, deeply affordable, and homegrown software for everyday Indian citizens.": "संस्थापक अभिनव गिरी का व्यक्तिगत पत्र पढ़ें कि उन्होंने आम भारतीय नागरिकों के लिए ईमानदार, किफायती और स्वदेशी सॉफ्टवेयर बनाने के लिए गिरी क्यों शुरू किया।",
  "Make in India": "मेक इन इंडिया",
  "Affordable for All": "सभी के लिए किफायती",
  "Zero Dollar Subscriptions": "शून्य डॉलर सदस्यता",
  "Sacred Data Privacy": "पवित्र डेटा गोपनीयता",
  "Read The Founder's Letter & Vision →": "पढ़ें संस्थापक का पत्र एवं दृष्टिकोण →",
  "Giri Security & Sovereignty Standards": "गिरी सुरक्षा एवं संप्रभुता मानक",
  "Every tool in the Giri Suite is built under our non-negotiable principles:": "गिरी सुइट का प्रत्येक टूल हमारे इन अडिग सिद्धांतों के तहत निर्मित है:",
  "100% Client-Side Privacy: Your notes, calculations, and decks remain on your device.": "100% क्लाइंट-साइड गोपनीयता: आपके नोट्स, गणना और स्लाइड केवल आपके डिवाइस पर रहते हैं।",
  "Zero Tracking Cookies: No advertising pixels, tracking scripts, or profiling cookies.": "शून्य ट्रैकिंग कुकीज़: कोई विज्ञापन पिक्सेल, ट्रैकिंग स्क्रिप्ट या प्रोफाइलिंग कुकीज़ नहीं।",
  "Free & Sovereign Access: Built in India for students, families, and builders.": "मुफ़्त और संप्रभु पहुंच: छात्रों, परिवारों और निर्माताओं के लिए भारत में निर्मित।",
  "Sub-15ms Edge Delivery: Optimized static files served with zero origin bottlenecks.": "सब-15ms एज डिलीवरी: बिना किसी सर्वर रुकावट के तुरंत डिलीवर होने वाली अनुकूलित स्थिर फ़ाइलें।",
  "Proudly Made in India. Sovereign, private, and truly affordable software built with care for everyday people by Abhinav Giri.": "भारत में गर्व से निर्मित। अभिनव गिरी द्वारा आम लोगों के लिए देखभाल के साथ निर्मित संप्रभु, निजी और वास्तव में किफायती सॉफ्टवेयर।",
  "Founder on Instagram:": "इंस्टाग्राम पर संस्थापक:",
  "Everyday Apps & AI": "रोजमर्रा के ऐप्स एवं एआई",
  "Girionix AI (Flagship ↗)": "गिरिओनिक्स एआई (फ़्लैगशिप ↗)",
  "Giri Drift (Writing)": "गिरी ड्रिफ्ट (लेखन)",
  "Giri Axis (Money)": "गिरी एक्सिस (वित्त)",
  "Giri Kinetic (Slides)": "गिरी काइनेटिक (स्लाइड्स)",
  "The Founder's Letter": "संस्थापक का पत्र",
  "Instagram @abhinavgiri45": "इंस्टाग्राम @abhinavgiri45",
  "Sovereign, fast, and distraction-free software built in India for normal users, students, and creators. We charge no dollar subscriptions and sell no user data.": "सामान्य उपयोगकर्ताओं, छात्रों और रचनाकारों के लिए भारत में निर्मित संप्रभु, तेज़ और व्याकुलता-मुक्त सॉफ्टवेयर। हम कोई डॉलर सदस्यता नहीं लेते और कोई उपयोगकर्ता डेटा नहीं बेचते।",
  "Made in India • Sovereign • Private": "भारत में निर्मित • संप्रभु • निजी",
  "Apps & Tools": "ऐप्स और टूल्स",
  "Company": "कंपनी",
  "Connect": "जुड़ें",
  "Drift — Focus Pad": "ड्रिफ्ट — फोकस पैड",
  "Axis — Savings Projector": "एक्सिस — बचत प्रोजेक्टर",
  "Kinetic — Slide Player": "काइनेटिक — स्लाइड प्लेयर",
  "Girionix AI — Polymath Workspace": "गिरिओनिक्स एआई — पॉलीमैथ वर्कस्पेस",
  "Core Philosophy": "मूल दर्शन",
  "Edge Status: Live": "एज स्थिति: लाइव",
  "Privacy Architecture": "गोपनीयता वास्तुकला",
  "All rights reserved. Proudly engineered in India.": "सर्वाधिकार सुरक्षित। भारत में गर्व से निर्मित।",
  "Giri — Everyday Apps, Extraordinary Craft | Founded by Abhinav Giri": "गिरी — रोजमर्रा के ऐप्स, असाधारण शिल्प | संस्थापक अभिनव गिरी",
  "PROUDLY MADE IN INDIA • SOVEREIGN & AFFORDABLE SOFTWARE": "भारत में निर्मित • संप्रभु एवं किफायती सॉफ्टवेयर",
  "Everyday tools, world-class craft.": "रोजमर्रा के टूल्स, विश्वस्तरीय शिल्प।",
  "Built in India to make technology affordable for everyone.": "भारत में निर्मित, ताकि तकनीक हर किसी के लिए सुलभ और सस्ती हो सके।",
  "Built in India so technology remains accessible and affordable for everyone.": "भारत में निर्मित, ताकि तकनीक हर किसी के लिए सुलभ और सस्ती हो सके।",
  "Search Giri products (Drift, Axis, Kinetic, Girionix) or speak...": "गिरी उत्पाद खोजें (ड्रिफ्ट, एक्सिस, काइनेटिक, गिरिओनिक्स) या बोलें...",
  "Search Giri products (Drift, Axis, Kinetic) or speak...": "गिरी उत्पाद खोजें (ड्रिफ्ट, एक्सिस, काइनेटिक) या बोलें...",
  "Sovereign Omnipotent AI: React 18 IDE, Screenplay, Math proofs & 8K FLUX Art.": "संप्रभु सर्वशक्तिमान एआई: रिएक्ट 18 आईडीई, पटकथा, गणित प्रमाण और 8K FLUX आर्ट।",
  "Distraction-free mindful notes, journaling & live reading telemetry.": "व्याकुलता-मुक्त नोट्स, जर्नलिंग और लाइव पठन टेलीमेट्री।",
  "Visual personal & family finance, 5-year savings simulator in ₹.": "व्यक्तिगत एवं पारिवारिक वित्त, ₹ में 5-वर्षीय बचत सिमुलेटर।",
  "SLIDES • KEYNOTE": "स्लाइड्स • कीनोट",
  "Cinematic story decks & slide presentations with smart auto-layout.": "स्मार्ट ऑटो-लेआउट के साथ सिनेमाई स्टोरी डेक और स्लाइड प्रस्तुतियां।",
  "View Full Apps & Tools Catalog →": "पूर्ण ऐप्स एवं टूल्स कैटलॉग देखें →",
  "THE GIRI SUITE": "द गिरी सुइट",
  "Essential Everyday Tools": "आवश्यक रोजमर्रा के टूल्स",
  "Three sovereign applications crafted for normal users, students, and families. Fast, reliable, and free of foreign subscription paywalls.": "सामान्य उपयोगकर्ताओं, छात्रों और परिवारों के लिए तैयार किए गए तीन संप्रभु एप्लिकेशन। तेज़, विश्वसनीय और विदेशी सदस्यता दीवारों से मुक्त।",
  "Mindful notes, journaling & distraction-free writing": "ध्यानपूर्ण नोट्स, जर्नलिंग और व्याकुलता-मुक्त लेखन",
  "Tranquil optical typography, live word counting, and instant local storage without popups or annoying subscriptions.": "बिना किसी पॉपअप या सदस्यता के शांत टाइपोग्राफी, लाइव शब्द गणना और त्वरित स्थानीय स्टोरेज।",
  "Calm, distraction-free focus space": "शांत, व्याकुलता-मुक्त फोकस स्पेस",
  "Real-time word & reading telemetry": "वास्तविक समय शब्द और पठन टेलीमेट्री",
  "100% private on your machine": "आपकी मशीन पर 100% निजी",
  "Open Giri Drift": "गिरी ड्रिफ्ट खोलें",
  "Dynamic 5-year savings projection and clear visual milestone cards designed for Indian household budgets.": "भारतीय घरेलू बजट के लिए डिज़ाइन किया गया गतिशील 5-वर्षीय बचत अनुमान और स्पष्ट मील का पत्थर कार्ड।",
  "Interactive 5-year savings simulator": "इंटरैक्टिव 5-वर्षीय बचत सिमुलेटर",
  "Zero data brokering or ad monetization": "शून्य डेटा दलाली या विज्ञापन मुद्रीकरण",
  "Transparent Indian Rupee (₹) pricing": "पारदर्शी भारतीय रुपया (₹) मूल्य निर्धारण",
  "Open Giri Axis": "गिरी एक्सिस खोलें",
  "PRESENTATIONS • SMART": "प्रस्तुतियां • स्मार्ट",
  "Cinematic story decks & slide presentations": "सिनेमाई स्टोरी डेक और स्लाइड प्रस्तुतियां",
  "Type your message and let smart spatial grids arrange typography and visuals automatically with fluid slide animations.": "अपना संदेश टाइप करें और स्मार्ट ग्रिड को टाइपोग्राफी और दृश्यों को स्वचालित रूप से व्यवस्थित करने दें।",
  "16:9 cinematic keynote viewport": "16:9 सिनेमाई कीनोट व्यूपोर्ट",
  "Smart auto-layout: zero design stress": "स्मार्ट ऑटो-लेआउट: शून्य डिज़ाइन तनाव",
  "One-click presentation sharing": "एक-क्लिक प्रेजेंटेशन साझाकरण",
  "Open Giri Kinetic": "गिरी काइनेटिक खोलें",
  "View All Apps and Tools in Dedicated Suite →": "समर्पित सुइट में सभी ऐप्स और टूल्स देखें →",
  "THE REALITY OF SOFTWARE COSTS IN INDIA": "भारत में सॉफ्टवेयर लागत की वास्तविकता",
  "Foreign Dollar Monopolies vs. Giri": "विदेशी डॉलर एकाधिकार बनाम गिरी",
  "Why should Indian students, families, and creators pay exorbitant monthly fees in foreign US Dollars for basic digital tools? Here is the honest comparison:": "भारतीय छात्रों, परिवारों और रचनाकारों को बुनियादी डिजिटल उपकरणों के लिए विदेशी अमेरिकी डॉलर में भारी मासिक शुल्क क्यों देना चाहिए? यहाँ ईमानदार तुलना है:",
  "Foreign Silicon Valley Stack": "विदेशी सिलिकॉन वैली स्टैक",
  "Recurring monthly dollar subscriptions that compound into heavy expenses": "आवर्ती मासिक डॉलर सदस्यता जो भारी खर्चों में बदल जाती है",
  "Notion Personal Pro": "नोशन पर्सनल प्रो",
  "Notes, wikis & database docs": "नोट्स, विकी और डेटाबेस दस्तावेज़",
  "$10/mo (₹830)": "$10/माह (₹830)",
  "Office 365 / Copilot": "ऑफिस 365 / कोपायलट",
  "Spreadsheets & word processing": "स्प्रेडशीट और वर्ड प्रोसेसिंग",
  "$12.50/mo (₹1,040)": "$12.50/माह (₹1,040)",
  "Canva Pro / Pitch Deck SaaS": "कैनवा प्रो / पिच डेक सास",
  "Slide templates & presentations": "स्लाइड टेम्पलेट और प्रस्तुतियां",
  "$13/mo (₹1,080)": "$13/माह (₹1,080)",
  "Monthly Drain:": "मासिक व्यय:",
  "₹2,950 / mo ($35.50)": "₹2,950 / माह ($35.50)",
  "Giri Sovereign Suite": "गिरी संप्रभु सुइट",
  "100% Made in India for normal users, students, and families": "सामान्य उपयोगकर्ताओं, छात्रों और परिवारों के लिए 100% भारत में निर्मित",
  "Mindful notes, distraction-free writing": "ध्यानपूर्ण नोट्स, व्याकुलता-मुक्त लेखन",
  "Personal & family finance simulator": "व्यक्तिगत एवं पारिवारिक वित्त सिमुलेटर",
  "Keynote decks, slides & sharing": "कीनोट डेक, स्लाइड और साझाकरण",
  "Giri Cost:": "गिरी की लागत:",
  "₹0 / mo (Free)": "₹0 / माह (मुफ़्त)",
  "Direct Impact: ₹35,400+ Saved Every Year": "प्रत्यक्ष प्रभाव: हर साल ₹35,400+ की बचत",
  "We keep honest wealth in Indian households. Zero foreign currency charges, zero credit card traps, and zero ad surveillance.": "हम भारतीय परिवारों में ईमानदार संपत्ति को बनाए रखते हैं। शून्य विदेशी मुद्रा शुल्क, शून्य क्रेडिट कार्ड जाल और शून्य विज्ञापन निगरानी।",
  "Explore All Free Tools": "सभी मुफ़्त टूल्स देखें",
  "ENGINEERED FOR 1 BILLION+ CITIZENS": "1 अरब से अधिक नागरिकों के लिए निर्मित",
  "Governed by Sacred Trust, Local Privacy & Global Edge Scale": "पवित्र विश्वास, स्थानीय गोपनीयता और वैश्विक एज स्केल द्वारा संचालित",
  "Every product built under Giri adheres to strict sovereign engineering standards: zero remote data harvesting, transparent Rupee economics, and a static edge architecture tested for 1,000,000+ users per second.": "गिरी के तहत निर्मित प्रत्येक उत्पाद कड़े संप्रभु इंजीनियरिंग मानकों का पालन करता है: शून्य रिमोट डेटा संचयन, पारदर्शी रुपया अर्थशास्त्र और प्रति सेकंड 10,00,000+ उपयोगकर्ताओं के लिए परीक्षण किया गया स्थिर एज आर्किटेक्चर।",
  "100% Client-Side Privacy": "100% क्लाइंट-साइड गोपनीयता",
  "Your writing, savings calculations, and creations execute locally in your browser. Zero central databases, zero third-party telemetry, and zero ad surveillance brokers.": "आपका लेखन, बचत गणना और रचनाएं आपके ब्राउज़र में स्थानीय रूप से निष्पादित होती हैं। शून्य केंद्रीय डेटाबेस, शून्य तृतीय-पक्ष टेलीमेट्री और शून्य विज्ञापन निगरानी दलाल।`",
  "1M+ Users/Sec Edge Scale": "10 लाख+ उपयोगकर्ता/सेकंड एज स्केल",
  "Powered by distributed static edge nodes and PWA Service Worker caching. Zero server bottlenecks, sub-15ms global delivery, and 100% offline resilience.": "वितरित स्थिर एज नोड्स और PWA सर्विस वर्कर कैशिंग द्वारा संचालित। शून्य सर्वर रुकावटें, सब-15ms वैश्विक डिलीवरी और 100% ऑफ़लाइन लचीलापन।",
  "Founder Accountability": "संस्थापक की जवाबदेही",
  "Directly envisioned and engineered by Abhinav Giri (@abhinavgiri45). No corporate committees, no anonymous venture boards, and open direct communication.": "अभिनव गिरी (@abhinavgiri45) द्वारा सीधे परिकल्पित और निर्मित। कोई कॉर्पोरेट समितियां नहीं, कोई अनाम वेंचर बोर्ड नहीं, और खुला सीधा संवाद।",
  "Radical Rupee Affordability": "अभूतपूर्व रुपया सामर्थ्य",
  "Built for real Indian budgets. Free forever or transparently priced in Indian Rupees (₹). Zero dollar conversions, zero price hikes, and zero surprise auto-debits.": "वास्तविक भारतीय बजट के लिए निर्मित। हमेशा के लिए मुफ़्त या भारतीय रुपयों (₹) में पारदर्शी मूल्य। शून्य डॉलर रूपांतरण, शून्य मूल्य वृद्धि और शून्य अचानक ऑटो-डेबिट।",
  "Client-Side Local-First Privacy": "क्लाइंट-साइड लोकल-फर्स्ट गोपनीयता",
  "Zero Tracking Cookies & Ads": "शून्य ट्रैकिंग कुकीज़ एवं विज्ञापन",
  "Sub-15ms Edge PWA Architecture": "सब-15ms एज PWA आर्किटेक्चर",
  "Proudly Made in India Sovereignty": "भारत में गर्व से निर्मित संप्रभुता",
  "I started Giri with a simple belief: essential digital tools shouldn't come with expensive monthly dollar subscriptions, aggressive trackers, or complicated barriers. We build honest, reliable, and deeply affordable software right here in India—crafted with care for students, creators, and families.": "मैंने एक साधारण विश्वास के साथ गिरी शुरू किया: आवश्यक डिजिटल उपकरणों के साथ महंगी मासिक डॉलर सदस्यता, आक्रामक ट्रैकर्स या जटिल बाधाएं नहीं होनी चाहिए। हम भारत में ही ईमानदार, विश्वसनीय और बेहद किफायती सॉफ्टवेयर बनाते हैं—छात्रों, रचनाकारों और परिवारों के लिए देखभाल के साथ तैयार किया गया।",
  "Read The Full Founder's Letter →": "पढ़ें पूरा संस्थापक पत्र →",
  "Listening...": "सुन रहे हैं...",
  "Speak product: \"Drift\", \"Axis\", \"Kinetic\", or \"Notes\"": "उत्पाद का नाम बोलें: \"ड्रिफ्ट\", \"एक्सिस\", \"काइनेटिक\", या \"नोट्स\"",
  "ALL PRODUCTS (4)": "सभी उत्पाद (4)",
  "All": "सभी",
  "AI": "एआई",
  "Writing": "लेखन",
  "Finance": "वित्त",
  "Slides": "स्लाइड्स",
  "Launch ↗": "लॉन्च करें ↗",
  "Experience the Suite": "सुइट का अनुभव करें",
  "Interactive Demonstrations": "इंटरैक्टिव प्रदर्शन",
  "Word Count": "शब्द गणना",
  "Characters": "वर्ण",
  "Reading Time": "पढ़ने का समय",
  "Copy Text": "टेक्स्ट कॉपी करें",
  "Copied!": "कॉपी हो गया!",
  "Clear": "साफ़ करें",
  "Monthly Savings (₹)": "मासिक बचत (₹)",
  "Investment Horizon (Years)": "निवेश अवधि (वर्ष)",
  "Estimated Wealth": "अनुमानित संपत्ति",
  "Annual Dividend Flow": "वार्षिक लाभांश प्रवाह",
  "Next Slide →": "अगली स्लाइड →",
  "Previous Slide ←": "पिछली स्लाइड ←",
  "Fullscreen Presenter": "फ़ुलस्क्रीन प्रेजेंटर",
  "THE GIRI VALUE PROMISE": "गिरी वैल्यू प्रॉमिस",
  "Save Thousands of Rupees Every Year": "हर साल हज़ारों रुपयों की बचत करें",
  "INSTITUTIONAL TRUST & SOVEREIGNTY": "संस्थागत विश्वास एवं संप्रभुता",
  "Engineered for 1,000,000+ Users. Built on Absolute Transparency.": "10,00,000+ उपयोगकर्ताओं के लिए निर्मित। पूर्ण पारदर्शिता पर आधारित।",
  "100% Client-Side Privacy / Local-First": "100% क्लाइंट-साइड गोपनीयता / लोकल-फर्स्ट",
  "Zero Ad Trackers & Third-Party Surveillance": "शून्य विज्ञापन ट्रैकर्स एवं तृतीय-पक्ष निगरानी",
  "Sub-15ms Edge Delivery (1M+ Users/Sec Ready)": "सब-15ms एज डिलीवरी (10 लाख उपयोगकर्ता/सेकंड तैयार)",
  "Transparent Rupee-First Pricing (₹)": "पारदर्शी रुपया-प्रथम मूल्य निर्धारण (₹)",
  "THE FOUNDER'S VISION": "संस्थापक का दृष्टिकोण",
  "“Indian minds have powered global tech for decades. Now it is time we build world-class tools for our own people.”": "“भारतीय प्रतिभाओं ने दशकों से वैश्विक तकनीक को शक्ति दी है। अब समय आ गया है कि हम अपने लोगों के लिए विश्वस्तरीय और सुलभ डिजिटल टूल्स बनाएं।”",
  "Read Full Founder Letter →": "पढ़ें पूरा संस्थापक पत्र →",
  "Abhinav Giri — Founder & Vision | Giri": "अभिनव गिरी — संस्थापक एवं दृष्टिकोण | गिरी",
  "By": "द्वारा",
  ", Founder": ", संस्थापक",
  "A personal note on Make in India, honest pricing, and building for real people": "मेक इन इंडिया, ईमानदार मूल्य निर्धारण और वास्तविक लोगों के लिए निर्माण पर एक व्यक्तिगत नोट",
  "“Technology should feel like a helpful friend, not another monthly bill. We can build world-class, honest software right here in India.”": "“प्रौद्योगिकी को एक मददगार दोस्त की तरह लगना चाहिए, न कि एक और मासिक बिल। हम भारत में ही विश्वस्तरीय, ईमानदार सॉफ्टवेयर बना सकते हैं।”",
  "FOLLOW THE JOURNEY": "यात्रा का अनुसरण करें",
  "Connect on Instagram →": "इंस्टाग्राम पर जुड़ें →",
  "Make in India, From the Heart": "मेक इन इंडिया, दिल से",
  "Deeply Affordable for Everyone": "हर किसी के लिए बेहद किफायती",
  "Zero Costly Dollar Subscriptions": "शून्य महंगी डॉलर सदस्यता",
  "Sacred Respect for Your Privacy": "आपकी गोपनीयता के प्रति पवित्र सम्मान",
  "Dear friend,": "प्रिय मित्र,",
  "If you have ever opened an app just to jot down a late-night thought, plan your family's monthly grocery budget, or prepare a simple school presentation, you probably know the sinking feeling I'm talking about.": "यदि आपने कभी देर रात का कोई विचार लिखने, अपने परिवार के मासिक किराने के बजट की योजना बनाने, या एक साधारण स्कूल प्रेजेंटेशन तैयार करने के लिए कोई ऐप खोला है, तो आप शायद उस निराशाजनक भावना को जानते होंगे जिसकी मैं बात कर रहा हूँ।",
  "Within moments of opening the app, a slick pop-up takes over your screen:": "ऐप खोलने के कुछ ही पलों के भीतर, आपकी स्क्रीन पर एक पॉप-अप आ जाता है:",
  "“Your free trial has expired. Upgrade to Pro for $14.99 a month.”": "“आपका मुफ़्त परीक्षण समाप्त हो गया है। $14.99 प्रति माह के लिए प्रो में अपग्रेड करें।”",
  "To an executive sitting in California, fifteen dollars is just the price of a quick lunch. But here at home in India, ₹1,200 every single month is real money. It is a week of fresh groceries for a household, an electricity bill paid on time, a stack of textbooks for a student preparing for competitive exams, or hard-earned savings put aside for a rainy day.": "कैलिफ़ोर्निया में बैठे एक अधिकारी के लिए पंद्रह डॉलर केवल एक साधारण लंच की कीमत है। लेकिन यहाँ भारत में हमारे घर पर हर महीने ₹1,200 असली पैसा है। यह एक परिवार के लिए ताज़ी किराने का एक सप्ताह का खर्च है, समय पर भरा गया बिजली का बिल है, प्रतियोगी परीक्षाओं की तैयारी कर रहे छात्र के लिए किताबों का ढेर है, या मुश्किल दिनों के लिए बचाई गई गाढ़ी कमाई है।",
  "I kept asking myself: why should an Indian college student, a teacher, a freelancer, or a parent have to pay exorbitant monthly fees in foreign US dollars just to organize their day or write their thoughts? Why should free tools be stuffed with intrusive ads, sneaky auto-debits, and trackers that secretly harvest private data?": "मैं खुद से पूछता रहा: एक भारतीय कॉलेज के छात्र, शिक्षक, फ्रीलांसर या माता-पिता को केवल अपने दिन को व्यवस्थित करने या अपने विचारों को लिखने के लिए विदेशी अमेरिकी डॉलर में भारी मासिक शुल्क क्यों देना चाहिए? मुफ़्त टूल्स में दखल देने वाले विज्ञापन, गुप्त ऑटो-डेबिट और निजी डेटा चुराने वाले ट्रैकर्स क्यों भरे होने चाहिए?",
  "I started Giri because I wanted something better for us.": "मैंने गिरी इसलिए शुरू किया क्योंकि मैं हमारे लिए कुछ बेहतर चाहता था।",
  "India has some of the brightest engineers, artists, and problem solvers on earth. For decades, our minds have built the engines behind the world’s biggest tech platforms. I felt it was high time we directed that same energy toward building world-class, honest tools for our own people.": "भारत में दुनिया के सबसे प्रतिभाशाली इंजीनियर, कलाकार और समस्या निवारक हैं। दशकों से हमारी प्रतिभाओं ने दुनिया के सबसे बड़े टेक प्लेटफॉर्म्स को संचालित किया है। मुझे लगा कि अब समय आ गया है कि हम उस ऊर्जा को अपने लोगों के लिए विश्वस्तरीय, ईमानदार उपकरण बनाने में लगाएं।",
  "Giri is my personal commitment to a proud": "गिरी एक गौरवपूर्ण",
  "future, grounded in three simple promises:": "भविष्य के लिए मेरी व्यक्तिगत प्रतिबद्धता है, जो तीन सरल वादों पर आधारित है:",
  "1. Deeply affordable and honest pricing.": "1. बेहद किफायती और ईमानदार मूल्य निर्धारण।",
  "Technology should lift people up, not trap them in expensive cycles. Our tools—": "प्रौद्योगिकी को लोगों को ऊपर उठाना चाहिए, न कि उन्हें महंगे चक्रों में फंसाना चाहिए। हमारे उपकरण—",
  "for distraction-free writing,": "व्याकुलता-मुक्त लेखन के लिए,",
  "for clear family budgeting, and": "स्पष्ट पारिवारिक बजट के लिए, और",
  "for simple visual presentations—are built to be free or priced in honest, transparent Indian Rupees (₹) that any student or working family can comfortably afford. No foreign dollar conversions, no auto-renew traps, and no paywalls on basic human creativity.": "सरल दृश्य प्रस्तुतियों के लिए—मुफ़्त या ईमानदार, पारदर्शी भारतीय रुपयों (₹) में मूल्यवान होने के लिए बनाए गए हैं जिन्हें कोई भी छात्र या कामकाजी परिवार आराम से वहन कर सकता है। कोई विदेशी डॉलर रूपांतरण नहीं, कोई ऑटो-नवीनीकरण जाल नहीं, और बुनियादी मानव रचनात्मकता पर कोई पेवॉल नहीं।",
  "2. Engineered locally for real life.": "2. वास्तविक जीवन के लिए स्थानीय रूप से इंजीनियर किया गया।",
  "Every line of code is written right here at home. We test our software on budget smartphones, older family laptops, and spotty internet connections. It opens fast, stays lightweight, and works quietly in the background without draining your phone's battery or your monthly data pack.": "कोड की हर पंक्ति यहीं भारत में लिखी गई है। हम अपने सॉफ्टवेयर का परीक्षण बजट स्मार्टफोन, पुराने पारिवारिक लैपटॉप और कमजोर इंटरनेट कनेक्शन पर करते हैं। यह तेज़ी से खुलता है, हल्का रहता है और आपके फोन की बैटरी या मासिक डेटा पैक को खत्म किए बिना चुपचाप पृष्ठभूमि में काम करता है।",
  "3. Sacred respect for your privacy and peace.": "3. आपकी गोपनीयता और शांति के प्रति पवित्र सम्मान।",
  "What you write in your journal, how you manage your savings, and what you dream for your family belongs solely to you. We do not track your digital footprints, we do not package your habits for advertisers, and we never spam you with noisy notifications.": "आप अपनी डायरी में क्या लिखते हैं, अपनी बचत का प्रबंधन कैसे करते हैं, और अपने परिवार के लिए क्या सपने देखते हैं, वह केवल आपका है। हम आपके डिजिटल पदचिह्नों को ट्रैक नहीं करते, हम विज्ञापनदाताओं के लिए आपकी आदतों का पैकेज नहीं बनाते, और हम आपको अवांछित सूचनाओं से कभी परेशान नहीं करते।",
  "We are not building a soulless corporate machine chasing investor hype. We are an independent Indian initiative taking the slow, careful path to build software you can genuinely rely on and feel proud to use.": "हम निवेशकों के प्रचार के पीछे भागने वाली कॉर्पोरेट मशीन नहीं बना रहे हैं। हम एक स्वतंत्र भारतीय पहल हैं जो धीमे, विचारशील मार्ग पर चलकर ऐसा सॉफ्टवेयर बना रहे हैं जिस पर आप वास्तव में भरोसा कर सकें और गर्व से उपयोग कर सकें।",
  "If this resonates with you, I would love to have you with us. Please feel free to reach out to me personally on Instagram at": "यदि यह बात आपके दिल को छूती है, तो मुझे आपको अपने साथ जोड़कर खुशी होगी। कृपया इंस्टाग्राम पर व्यक्तिगत रूप से मुझसे संपर्क करने में संकोच न करें",
  ". Tell me what tools you need, what frustrates you about modern apps, or just say hello. I read every message myself.": "। मुझे बताएं कि आपको किन उपकरणों की आवश्यकता है, आधुनिक ऐप्स के बारे में आपको क्या परेशान करता है, या बस नमस्ते कहें। मैं हर संदेश खुद पढ़ता हूँ।",
  "Thank you for believing in homegrown Indian software.": "स्वदेशी भारतीय सॉफ्टवेयर पर विश्वास करने के लिए धन्यवाद।",
  "Founder & Lead Architect, Giri • Make in India": "संस्थापक एवं मुख्य वास्तुकार, गिरी • मेक इन इंडिया",
  "Explore the Ecosystem": "इकोसिस्टम देखें",
  "WRITING": "लेखन",
  "Distraction-free notes & mindful essays.": "व्याकुलता-मुक्त नोट्स और विचारपूर्ण निबंध।",
  "FINANCE": "वित्त",
  "Visual money, family budgets & savings.": "दृश्य वित्त, पारिवारिक बजट और बचत।",
  "PRESENTATIONS": "प्रस्तुतियां",
  "Effortless visual slides and story decks.": "सहज दृश्य स्लाइड और स्टोरी डेक।",
  "“Why I Started Giri: Building Honest, Affordable Software for Everyday Life.”": "“मैंने गिरी क्यों शुरू किया: दैनिक जीवन के लिए ईमानदार, किफायती सॉफ्टवेयर का निर्माण।”",
  "MAKE IN INDIA INITIATIVE • THE FOUNDER'S VISION": "मेक इन इंडिया पहल • संस्थापक का दृष्टिकोण",
  "By Abhinav Giri • Founder, Giri": "अभिनव गिरी द्वारा • संस्थापक, गिरी",
  "Reading time: 3 minutes": "पढ़ने का समय: 3 मिनट",
  "Dear Friend,": "प्रिय मित्र,",
  "With conviction,": "दृढ़ संकल्प के साथ,",
  "Founder, Giri": "संस्थापक, गिरी",
  "Connect on Instagram": "इंस्टाग्राम पर जुड़ें"
},
  bn: {
    "Explore Apps & Tools": "অ্যাপ ও টুলস দেখুন",
    "The Founder's Letter ›": "প্রতিষ্ঠাতার চিঠি ›",
    "Girionix AI: The Polymath Companion for India": "গিরিওনিক্স এআই: ভারতের জন্য পলিম্যাথ সঙ্গী",
    "Live React 18 & TypeScript IDE in-browser": "ব্রাউজারে লাইভ রিঅ্যাক্ট ১৮ এবং টাইপস্ক্রিপ্ট আইডিই",
    "Screenplay Studio with Hollywood industry beats": "হলিউড ইন্ডাস্ট্রি ফরম্যাট সহ চিত্রনাট্য স্টুডিও",
    "Olympiad Math derivation & KaTeX proofing": "অলিম্পিয়াড গণিত সমাধান এবং KaTeX প্রুফিং",
    "100% On-Device Titan Intelligence (Zero Server Data)": "১০০% অন-ডিভাইস টাইটান বুদ্ধিমত্তা (শূন্য সার্ভার ডেটা)",
    "Polymath AI Workspace": "পলিম্যাথ এআই ওয়ার্কস্পেস",
    "Distraction-free notes": "শান্ত ও বিভ্রান্তিমুক্ত নোট",
    "Rupee-first family finance": "টাকা-প্রথম পারিবারিক অর্থ",
    "Keynotes & slide decks": "স্লাইড ও উপস্থাপনা ডেক",
    "FLAGSHIP SOVEREIGN AI": "ফ্ল্যাগশিপ সার্বভৌম এআই",
    "Accessibility & Comfort Suite": "অ্যাক্সেসযোগ্যতা ও স্বাচ্ছন্দ্য স্যুট",
    "Font Size Scaling": "ফন্ট সাইজ স্কেলিং",
    "Adjust typography scale": "লেখার আকার সামঞ্জস্য করুন",
    "Normal (100%)": "স্বাভাবিক (১০০%)",
    "Large (115%)": "বড় (১১৫%)",
    "Extra Large (125%)": "অতিরিক্ত বড় (১২৫%)",
    "High-Contrast Mode": "উচ্চ-কন্ট্রাস্ট মোড",
    "Maximize contrast for visual clarity (WCAG AAA)": "দৃষ্টিগোচরতার জন্য কন্ট্রাস্ট বৃদ্ধি করুন (WCAG AAA)",
    "Reduced Motion": "ধীর মোশন",
    "Silence background ambient animations": "পটভূমির অ্যানিমেশন বন্ধ করুন",
    "Full Motion": "পূর্ণ মোশন",
    "Disabled": "নিষ্ক্রিয়",
    "Enabled": "সক্রিয়",
    "My Sovereign Data Hub": "আমার সার্বভৌম ডেটা হাব",
    "Every Giri application stores 100% of your notes, budgets, decks, and settings locally on your physical machine. Nothing is ever synchronized to remote server databases.": "প্রতিটি গিরি অ্যাপ আপনার নোট, বাজেট, ডেক এবং সেটিংসের ১০০% স্থানীয়ভাবে আপনার ডিভাইসে সংরক্ষণ করে। দূরবর্তী সার্ভারে কিছুই পাঠানো হয় না।",
    "Drift Drafts": "ড্রিফ্ট ড্রাফ্ট",
    "Axis Ledger Entries": "অ্যাক্সিস লেজার এন্ট্রি",
    "Local Footprint": "স্থানীয় স্টোরেজ",
    "Export All Data (JSON)": "সমস্ত ডেটা এক্সপোর্ট করুন (JSON)",
    "Wipe Local Data": "স্থানীয় ডেটা মুছে ফেলুন",
    "Sovereign Data Hub": "সার্বভৌম ডেটা হাব",
    "Find Your Perfect Tool": "আপনার নিখুঁত টুলটি খুঁজুন",
    "Answer 1 question to get the ideal Giri application tailored to your goals": "আপনার লক্ষ্যের জন্য আদর্শ গিরি অ্যাপ্লিকেশন পেতে ১টি প্রশ্নের উত্তর দিন",
    "I am a...": "আমি একজন...",
    "Student": "ছাত্র / ছাত্রী",
    "Writer": "লেখক",
    "Family / Planner": "পরিবার / পরিকল্পনাকারী",
    "Presenter": "উপস্থাপক",
    "Polymath / Builder": "পলিম্যাথ / নির্মাতা",
    "🎧 Listen to Founder's Letter": "🎧 প্রতিষ্ঠাতার চিঠি শুনুন",
    "Click to listen • Powered by client-side speech synthesis": "শোনার জন্য ক্লিক করুন • ব্রাউজার স্পিচ দ্বারা চালিত",
    'Home': 'হোম',
    'Apps and Tools': 'অ্যাপস এবং সরঞ্জাম',
    "Founder's Letter": 'প্রতিষ্ঠাতার চিঠি',
    'Founder & Vision': 'প্রতিষ্ঠাতা ও দর্শন',
    'Edge 100% Live': 'এজ ১০০% লাইভ',
    'Dedicated Apps & Tools for Everyday Life': 'দৈনন্দিন জীবনের জন্য নিবেদিত অ্যাপস এবং সরঞ্জাম',
    'All Tools (4)': 'সমস্ত সরঞ্জাম (৪)',
    'AI & Polymath': 'এআই এবং পলিম্যাথ',
    'Writing & Notes': 'লেখা ও নোটস',
    'Finance & Savings': 'অর্থ ও সঞ্চয়',
    'Presentations & Decks': 'উপস্থাপনা ও স্লাইড',
    'FLAGSHIP AI • SOVEREIGN WORKSPACE': 'ফ্ল্যাগশিপ এআই • সার্বভৌম ওয়ার্কস্পেস',
    'Girionix AI': 'গিরিওনিক্স এআই',
    'Launch Girionix AI Workspace ↗': 'গিরিওনিক্স এআই ওয়ার্কস্পেস চালু করুন ↗',
    'WRITING • 100% FREE': 'লেখা • ১০০% বিনামূল্যে',
    'Giri Drift': 'গিরি ড্রিফ্ট',
    'Open Dedicated Drift Studio': 'ড্রিফ্ট স্টুডিও খুলুন',
    'FINANCE • RUPEE-FIRST': 'অর্থ • টাকা-প্রথম',
    'Giri Axis': 'গিরি অ্যাক্সিস',
    'Open Dedicated Axis Finance': 'অ্যাক্সিস ফিন্যান্স খুলুন',
    'KEYNOTE • EFFORTLESS': 'কী-নোট • সহজ',
    'Giri Kinetic': 'গিরি কাইনেটিক',
    'Open Dedicated Kinetic Studio': 'কাইনেটিক স্টুডিও খুলুন'
  },
  te: {
    "Explore Apps & Tools": "యాప్స్ మరియు టూల్స్ అన్వేషించండి",
    "The Founder's Letter ›": "వ్యవస్థాపకుడి లేఖ ›",
    "Girionix AI: The Polymath Companion for India": "గిరియోనిక్స్ ఏఐ: భారతదేశానికి పాలీమ్యాత్ సహచరుడు",
    "Live React 18 & TypeScript IDE in-browser": "బ్రౌజర్‌లో లైవ్ రియాక్ట్ 18 & టైప్‌స్క్రిప్ట్ ఐడీఈ",
    "Screenplay Studio with Hollywood industry beats": "హాలీవుడ్ పరిశ్రమ ఫార్మాట్‌తో స్క్రీన్‌ప్లే స్టూడియో",
    "Olympiad Math derivation & KaTeX proofing": "ఒలింపియాడ్ గణిత పరిష్కారాలు & KaTeX ప్రూఫింగ్",
    "100% On-Device Titan Intelligence (Zero Server Data)": "100% ఆన్-డివైస్ టైటాన్ ఇంటెలిజెన్స్ (సున్నా సర్వర్ డేటా)",
    "Polymath AI Workspace": "పాలీమ్యాత్ ఏఐ వర్క్‌స్పేస్",
    "Distraction-free notes": "ఏకాగ్రత గల నోట్స్",
    "Rupee-first family finance": "రూపాయి-ప్రథమ కుటుంబ ఆర్థికం",
    "Keynotes & slide decks": "ప్రెజెంటేషన్ మరియు స్లైడ్ డెక్స్",
    "FLAGSHIP SOVEREIGN AI": "ఫ్లాగ్‌షిప్ సార్వభౌమ ఏఐ",
    "Accessibility & Comfort Suite": "సౌలభ్యం మరియు సౌకర్య సూట్",
    "Font Size Scaling": "ఫాంట్ పరిమాణ సర్దుబాటు",
    "Adjust typography scale": "అక్షరాల పరిమాణాన్ని మార్చండి",
    "Normal (100%)": "సాధారణ (100%)",
    "Large (115%)": "పెద్దది (115%)",
    "Extra Large (125%)": "చాలా పెద్దది (125%)",
    "High-Contrast Mode": "హై-కాంట్రాస్ట్ మోడ్",
    "Maximize contrast for visual clarity (WCAG AAA)": "స్పష్టత కోసం కాంట్రాస్ట్‌ను పెంచండి (WCAG AAA)",
    "Reduced Motion": "తగ్గించిన యానిమేషన్",
    "Silence background ambient animations": "బ్యాక్‌గ్రౌండ్ యానిమేషన్లను నిలిపివేయండి",
    "Full Motion": "పూర్తి యానిమేషన్",
    "Disabled": "ఆపివేయబడింది",
    "Enabled": "ప్రారంభించబడింది",
    "My Sovereign Data Hub": "నా సార్వభౌమ డేటా హబ్",
    "Every Giri application stores 100% of your notes, budgets, decks, and settings locally on your physical machine. Nothing is ever synchronized to remote server databases.": "ప్రతి గిరి అప్లికేషన్ మీ నోట్స్, బడ్జెట్ మరియు సెట్టింగ్‌లలో 100% మీ డివైజ్‌లోనే నిల్వ చేస్తుంది. సర్వర్‌కు ఏదీ పంపబడదు.",
    "Drift Drafts": "డ్రిఫ్ట్ డ్రాఫ్ట్‌లు",
    "Axis Ledger Entries": "యాక్సిస్ లెడ్జర్ ఎంట్రీలు",
    "Local Footprint": "స్థానిక నిల్వ",
    "Export All Data (JSON)": "మొత్తం డేటాను ఎగుమతి చేయండి (JSON)",
    "Wipe Local Data": "స్థానిక డేటాను తొలగించండి",
    "Sovereign Data Hub": "సార్వభౌమ డేటా హబ్",
    "Find Your Perfect Tool": "మీకు సరైన టూల్‌ను కనుగొనండి",
    "Answer 1 question to get the ideal Giri application tailored to your goals": "మీ లక్ష్యాలకు తగిన గిరి యాప్‌ను కనుగొనడానికి 1 ప్రశ్నకు సమాధానం ఇవ్వండి",
    "I am a...": "నేను ఒక...",
    "Student": "విద్యార్థి",
    "Writer": "రచయిత",
    "Family / Planner": "కుటుంబం / ప్లానర్",
    "Presenter": "ప్రెజెంటర్",
    "Polymath / Builder": "పాలీమ్యాత్ / బిల్డర్",
    "🎧 Listen to Founder's Letter": "🎧 వ్యవస్థాపకుడి లేఖను వినండి",
    "Click to listen • Powered by client-side speech synthesis": "వినడానికి క్లిక్ చేయండి • పరికర ఆధారిత స్పీచ్ సింథసిస్",
    'Home': 'హోమ్',
    'Apps and Tools': 'యాప్స్ మరియు సాధనాలు',
    "Founder's Letter": 'వ్యవస్థాపకుని లేఖ',
    'Founder & Vision': 'వ్యవస్థాపకుడు & ఆలోచన',
    'Edge 100% Live': 'ఎడ్జ్ 100% లైవ్',
    'Dedicated Apps & Tools for Everyday Life': 'రోజువారీ జీవితం కోసం ప్రత్యేక యాప్‌లు & సాధనాలు',
    'All Tools (4)': 'అన్ని సాధనాలు (4)',
    'AI & Polymath': 'AI & పాలిమ్యాత్',
    'Writing & Notes': 'రచన & నోట్స్',
    'Finance & Savings': 'ఆర్థికం & పొదుపు',
    'Presentations & Decks': 'ప్రెజెంటేషన్లు & స్లైడ్‌లు',
    'FLAGSHIP AI • SOVEREIGN WORKSPACE': 'ఫ్లాగ్‌షిప్ AI • సార్వభౌమ వర్క్‌స్పేస్',
    'Girionix AI': 'గిరియోనిక్స్ AI',
    'Launch Girionix AI Workspace ↗': 'గిరియోనిక్స్ AI ప్రారంభించండి ↗',
    'WRITING • 100% FREE': 'రచన • 100% ఉచితం',
    'Giri Drift': 'గిరి డ్రిఫ్ట్',
    'Open Dedicated Drift Studio': 'డ్రిఫ్ట్ స్టూడియోను తెరవండి',
    'FINANCE • RUPEE-FIRST': 'ఫైనాన్స్ • రూపాయి-ప్రథమం',
    'Giri Axis': 'గిరి యాక్సిస్',
    'Open Dedicated Axis Finance': 'యాక్సిస్ ఫైనాన్స్ తెరవండి',
    'KEYNOTE • EFFORTLESS': 'కీనోట్ • సరళమైనది',
    'Giri Kinetic': 'గిరి కైనెటిక్',
    'Open Dedicated Kinetic Studio': 'కైనెటిక్ స్టూడియో తెరవండి'
  },
  mr: {
    "Explore Apps & Tools": "ॲप्स आणि टूल्स एक्सप्लोर करा",
    "The Founder's Letter ›": "संस्थापकांचे पत्र ›",
    "Girionix AI: The Polymath Companion for India": "गिरिओनिक्स एआय: भारतासाठी पॉलिमॅथ साथीदार",
    "Live React 18 & TypeScript IDE in-browser": "ब्राउझरमध्ये थेट रिॲक्ट १८ आणि टाइपस्क्रिप्ट आयडीई",
    "Screenplay Studio with Hollywood industry beats": "हॉलिवूड उद्योग फॉरमॅटसह पटकथा स्टुडिओ",
    "Olympiad Math derivation & KaTeX proofing": "ऑलिम्पियाड गणित उपाय आणि KaTeX प्रमाणीकरण",
    "100% On-Device Titan Intelligence (Zero Server Data)": "१००% ऑन-डिव्हाइस टायटन बुद्धिमत्ता (शून्य सर्व्हर डेटा)",
    "Polymath AI Workspace": "पॉलिमॅथ एआय वर्कस्पेस",
    "Distraction-free notes": "शांत आणि एकाग्र नोट्स",
    "Rupee-first family finance": "रुपया-प्रथम कौटुंबिक वित्त",
    "Keynotes & slide decks": "सादरीकरण आणि स्लाइड डेक्स",
    "FLAGSHIP SOVEREIGN AI": "फ्लॅगशिप सार्वभौम एआय",
    "Accessibility & Comfort Suite": "सुलभता आणि सुविधा सुइट",
    "Font Size Scaling": "फॉन्ट आकार स्केलिंग",
    "Adjust typography scale": "अक्षरांचा आकार बदला",
    "Normal (100%)": "सामान्य (100%)",
    "Large (115%)": "मोठा (115%)",
    "Extra Large (125%)": "अति मोठा (125%)",
    "High-Contrast Mode": "हाय-कॉन्ट्रास्ट मोड",
    "Maximize contrast for visual clarity (WCAG AAA)": "स्पष्टतेसाठी कॉन्ट्रास्ट वाढवा (WCAG AAA)",
    "Reduced Motion": "कमी ॲनिमेशन",
    "Silence background ambient animations": "पार्श्वभूमी ॲनिमेशन बंद करा",
    "Full Motion": "पूर्ण ॲनिमेशन",
    "Disabled": "अक्षम",
    "Enabled": "सक्षम",
    "My Sovereign Data Hub": "माझे सार्वभौम डेटा हब",
    "Every Giri application stores 100% of your notes, budgets, decks, and settings locally on your physical machine. Nothing is ever synchronized to remote server databases.": "प्रत्येक गिरी ॲप्लिकेशन तुमच्या नोट्स, बजेट आणि सेटिंग्ज १००% तुमच्या डिव्हाइसवर सुरक्षित ठेवते. कोणत्याही सर्व्हरवर डेटा पाठवला जात नाही.",
    "Drift Drafts": "ड्रिफ्ट नोट्स",
    "Axis Ledger Entries": "ॲक्सिस नोंदी",
    "Local Footprint": "स्थानिक स्टोरेज",
    "Export All Data (JSON)": "सर्व डेटा निर्यात करा (JSON)",
    "Wipe Local Data": "स्थानिक डेटा हटवा",
    "Sovereign Data Hub": "सार्वभौम डेटा हब",
    "Find Your Perfect Tool": "तुमचे परिपूर्ण टूल शोधा",
    "Answer 1 question to get the ideal Giri application tailored to your goals": "तुमच्या ध्येयानुसार योग्य गिरी ॲप्लिकेशन मिळवण्यासाठी १ प्रश्नाचे उत्तर द्या",
    "I am a...": "मी आहे एक...",
    "Student": "विद्यार्थी",
    "Writer": "लेखक",
    "Family / Planner": "कुटुंब / नियोजक",
    "Presenter": "सादरकर्ता",
    "Polymath / Builder": "पॉलिमॅथ / निर्माता",
    "🎧 Listen to Founder's Letter": "🎧 संस्थापकांचे पत्र ऐका",
    "Click to listen • Powered by client-side speech synthesis": "ऐकण्यासाठी क्लिक करा • डिव्हाइसवरील व्हॉइसद्वारे समर्थित",
    'Home': 'मुख्यपृष्ठ',
    'Apps and Tools': 'अॅप्स आणि साधने',
    "Founder's Letter": 'संस्थापकांचे पत्र',
    'Founder & Vision': 'संस्थापक आणि दृष्टिकोन',
    'Edge 100% Live': 'एज १००% लाईव्ह',
    'Dedicated Apps & Tools for Everyday Life': 'रोजच्या जीवनासाठी समर्पित अॅप्स आणि साधने',
    'All Tools (4)': 'सर्व साधने (४)',
    'AI & Polymath': 'एआय आणि पॉलिमॅथ',
    'Writing & Notes': 'लेखन आणि नोंदी',
    'Finance & Savings': 'वित्त आणि बचत',
    'Presentations & Decks': 'सादरीकरण आणि स्लाइड्स',
    'FLAGSHIP AI • SOVEREIGN WORKSPACE': 'फ्लॅगशिप एआय • सार्वभौम वर्कस्पेस',
    'Girionix AI': 'गिरिओनिक्स एआय',
    'Launch Girionix AI Workspace ↗': 'गिरिओनिक्स एआय वर्कस्पेस सुरू करा ↗',
    'WRITING • 100% FREE': 'लेखन • १००% मोफत',
    'Giri Drift': 'गिरी ड्रिफ्ट',
    'Open Dedicated Drift Studio': 'ड्रिफ्ट स्टुडिओ उघडा',
    'FINANCE • RUPEE-FIRST': 'वित्त • रुपया-प्रथम',
    'Giri Axis': 'गिरी एक्सिस',
    'Open Dedicated Axis Finance': 'एक्सिस वित्त उघडा',
    'KEYNOTE • EFFORTLESS': 'की-नोट • सोपे',
    'Giri Kinetic': 'गिरी कायनेटिक',
    'Open Dedicated Kinetic Studio': 'कायनेटिक स्टुडिओ उघडा'
  },
  ta: {
    "Explore Apps & Tools": "பயன்பாடுகள் மற்றும் கருவிகளை ஆராயுங்கள்",
    "The Founder's Letter ›": "நிறுவனரின் கடிதம் ›",
    "Girionix AI: The Polymath Companion for India": "கிரியோனிக்ஸ் ஏஐ: இந்தியாவுக்கான பல்நோக்கு தோழன்",
    "Live React 18 & TypeScript IDE in-browser": "உலாவியில் நேரடி ரியாக்ட் 18 & டைப்ஸ்கிரிப்ட் ஐடிஇ",
    "Screenplay Studio with Hollywood industry beats": "ஹாலிவுட் திரைக்கதை ஸ்டுடியோ",
    "Olympiad Math derivation & KaTeX proofing": "ஒலிம்பியாட் கணித தீர்வுகள் & KaTeX சரிபார்ப்பு",
    "100% On-Device Titan Intelligence (Zero Server Data)": "100% சாதன டைட்டன் நுண்ணறிவு (சர்வர் தரவு இல்லை)",
    "Polymath AI Workspace": "பல்நோக்கு ஏஐ பணியிடம்",
    "Distraction-free notes": "கவனச்சிதறல் இல்லாத குறிப்புகள்",
    "Rupee-first family finance": "ரூபாய்-முதல் குடும்ப நிதி",
    "Keynotes & slide decks": "விளக்கக்காட்சி ஸ்லைடுகள்",
    "FLAGSHIP SOVEREIGN AI": "முதன்மை இறையாண்மை ஏஐ",
    "Accessibility & Comfort Suite": "அணுகல் மற்றும் வசதி தொகுப்பு",
    "Font Size Scaling": "எழுத்துரு அளவு மாற்றம்",
    "Adjust typography scale": "எழுத்து அளவை மாற்றவும்",
    "Normal (100%)": "வழக்கமான (100%)",
    "Large (115%)": "பெரியது (115%)",
    "Extra Large (125%)": "மிகப் பெரியது (125%)",
    "High-Contrast Mode": "உயர் மாறுபட்ட முறை",
    "Maximize contrast for visual clarity (WCAG AAA)": "தெளிவுக்கு மாறுபாட்டை அதிகரிக்கவும் (WCAG AAA)",
    "Reduced Motion": "குறைக்கப்பட்ட அசைவு",
    "Silence background ambient animations": "பின்னணி அனிமேஷனை நிறுத்தவும்",
    "Full Motion": "முழு அசைவு",
    "Disabled": "முடக்கப்பட்டது",
    "Enabled": "செயல்படுத்தப்பட்டது",
    "My Sovereign Data Hub": "எனது இறையாண்மை தரவு மையம்",
    "Every Giri application stores 100% of your notes, budgets, decks, and settings locally on your physical machine. Nothing is ever synchronized to remote server databases.": "ஒவ்வொரு கிரி பயன்பாடும் உங்கள் குறிப்புகள், பட்ஜெட் மற்றும் அமைப்புகளை 100% உங்கள் சாதனத்தில் சேமிக்கிறது. சர்வர்களுக்கு எதுவும் அனுப்பப்படுவதில்லை.",
    "Drift Drafts": "ட்ரிஃப்ட் வரைவுகள்",
    "Axis Ledger Entries": "ஆக்சிஸ் கணக்குகள்",
    "Local Footprint": "உள்ளூர் சேமிப்பு",
    "Export All Data (JSON)": "அனைத்து தரவையும் ஏற்றுமதி செய்க (JSON)",
    "Wipe Local Data": "உள்ளூர் தரவை அழிக்கவும்",
    "Sovereign Data Hub": "இறையாண்மை தரவு மையம்",
    "Find Your Perfect Tool": "உங்களுக்கான சரியான கருவியைக் கண்டறியவும்",
    "Answer 1 question to get the ideal Giri application tailored to your goals": "உங்கள் இலக்குகளுக்கான சிறந்த கிரி செயலியைப் பெற 1 கேள்விக்கு பதிலளிக்கவும்",
    "I am a...": "நான் ஒரு...",
    "Student": "மாணவர்",
    "Writer": "எழுத்தாளர்",
    "Family / Planner": "குடும்பம் / திட்டமிடுபவர்",
    "Presenter": "வழங்குநர்",
    "Polymath / Builder": "பல்நோக்கு மேதை / உருவாக்குநர்",
    "🎧 Listen to Founder's Letter": "🎧 நிறுவனரின் கடிதத்தைக் கேளுங்கள்",
    "Click to listen • Powered by client-side speech synthesis": "கேட்க கிளிக் செய்யவும் • சாதன ஸ்பீச் சிஸ்டம் மூலம் இயக்கப்படுகிறது",
    'Home': 'முகப்பு',
    'Apps and Tools': 'செயலிகள் & கருவிகள்',
    "Founder's Letter": 'நிறுவனர் கடிதம்',
    'Founder & Vision': 'நிறுவனர் மற்றும் பார்வை',
    'Edge 100% Live': 'எட்ஜ் 100% நேரலை',
    'Dedicated Apps & Tools for Everyday Life': 'அன்றாட வாழ்க்கைக்கான பிரத்யேக செயலிகள் மற்றும் கருவிகள்',
    'All Tools (4)': 'அனைத்து கருவிகள் (4)',
    'AI & Polymath': 'செயற்கை நுண்ணறிவு & பாலிமேத்',
    'Writing & Notes': 'எழுதுதல் & குறிப்புகள்',
    'Finance & Savings': 'நிதி & சேமிப்பு',
    'Presentations & Decks': 'விளக்கக்காட்சிகள்',
    'FLAGSHIP AI • SOVEREIGN WORKSPACE': 'முதன்மை AI • இறையாண்மை பணியிடம்',
    'Girionix AI': 'கிரியோனிக்ஸ் AI',
    'Launch Girionix AI Workspace ↗': 'கிரியோனிக்ஸ் AI பணியிடத்தைத் தொடங்கு ↗',
    'WRITING • 100% FREE': 'எழுதுதல் • 100% இலவசம்',
    'Giri Drift': 'கிரி டிரிஃப்ட்',
    'Open Dedicated Drift Studio': 'டிரிஃப்ட் ஸ்டுடியோவைத் திறக்கவும்',
    'FINANCE • RUPEE-FIRST': 'நிதி • ரூபாய்-முதன்மை',
    'Giri Axis': 'கிரி ஆக்சிஸ்',
    'Open Dedicated Axis Finance': 'ஆக்சிஸ் நிதியைத் திறக்கவும்',
    'KEYNOTE • EFFORTLESS': 'கீநோட் • எளிதானது',
    'Giri Kinetic': 'கிரி கைனடிக்',
    'Open Dedicated Kinetic Studio': 'கைனடிக் ஸ்டுடியோவைத் திறக்கவும்'
  }
};

/**
 * Universal Client-Side In-Browser DOM Translation Engine
 */
export function translateCurrentPage(langCode) {
  if (!langCode) langCode = 'en';

  // 1. Update language selector badge text
  const langObj = INDIAN_LANGUAGES.find(l => l.code === langCode) || INDIAN_LANGUAGES[0];
  document.querySelectorAll('.lang-selector span').forEach(span => {
    span.textContent = langObj.display;
  });

  // 2. Revert cleanly back to original English if 'en'
  if (langCode === 'en') {
    revertToEnglish();
    document.documentElement.lang = 'en';
    return;
  }

  document.documentElement.lang = langCode;

  // 3. Resolve active dictionary (with Hindi as rich fallback for any missing key)
  const dict = TRANSLATION_DICTIONARY[langCode] || TRANSLATION_DICTIONARY['hi'];
  const fallback = TRANSLATION_DICTIONARY['hi'];

  // 4. Recursive TreeWalker translation across all visible text nodes
  const walker = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_TEXT,
    {
      acceptNode(node) {
        const parent = node.parentElement;
        if (!parent) return NodeFilter.FILTER_REJECT;
        const tag = parent.tagName.toLowerCase();
        
        // Skip code, script, styles, and developer tags
        if (['script', 'style', 'noscript', 'code', 'pre', 'kbd'].includes(tag)) {
          return NodeFilter.FILTER_REJECT;
        }

        // Strictly preserve brand name: "GIRI"
        if (parent.closest('.brand-text') || parent.closest('.brand-name')) {
          return NodeFilter.FILTER_REJECT;
        }

        // Do not touch language modal options grid (they have their own native labels)
        if (parent.closest('#lang-dialog') || parent.closest('.founder-nav-pill') || parent.closest('.letter-insta-chip')) {
          return NodeFilter.FILTER_REJECT;
        }

        // Text evaluation
        const origVal = node._giriOrigText !== undefined ? node._giriOrigText : node.nodeValue;
        const text = origVal.trim();
        if (!text || text.length < 2 || /^\d+$/.test(text) || text === '/' || text === '✕' || text === '✓') {
          return NodeFilter.FILTER_REJECT;
        }

        return NodeFilter.FILTER_ACCEPT;
      }
    }
  );

  let node;
  while ((node = walker.nextNode())) {
    // Cache original English text on first pass
    if (node._giriOrigText === undefined) {
      node._giriOrigText = node.nodeValue;
    }

    const origTrimmed = node._giriOrigText.trim();
    const translation = dict[origTrimmed] || (fallback && fallback[origTrimmed]);

    if (translation) {
      node.nodeValue = node._giriOrigText.replace(origTrimmed, translation);
    }
  }

  // 5. Translate Input Placeholders
  document.querySelectorAll('input[placeholder]').forEach(input => {
    if (input.closest('#lang-dialog')) return;
    if (input.dataset.giriOrigPlaceholder === undefined) {
      input.dataset.giriOrigPlaceholder = input.placeholder;
    }
    const orig = input.dataset.giriOrigPlaceholder.trim();
    const trans = dict[orig] || (fallback && fallback[orig]);
    if (trans) input.placeholder = trans;
  });

  // 6. Translate Element Titles and Aria Labels
  document.querySelectorAll('[title]').forEach(el => {
    if (el.closest('#lang-dialog') || el.classList.contains('lang-selector')) return;
    if (el.dataset.giriOrigTitle === undefined) {
      el.dataset.giriOrigTitle = el.title;
    }
    const orig = el.dataset.giriOrigTitle.trim();
    const trans = dict[orig] || (fallback && fallback[orig]);
    if (trans) el.title = trans;
  });

  // 7. Fire Custom Event for Dynamic UI Subcomponents
  window.dispatchEvent(new CustomEvent('giri:language-changed', {
    detail: { lang: langCode, langObj }
  }));
}

/**
 * Instant 0ms English Restoration
 */
export function revertToEnglish() {
  const walker = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_TEXT,
    {
      acceptNode(node) {
        if (node._giriOrigText !== undefined) return NodeFilter.FILTER_ACCEPT;
        return NodeFilter.FILTER_SKIP;
      }
    }
  );

  let node;
  while ((node = walker.nextNode())) {
    node.nodeValue = node._giriOrigText;
  }

  document.querySelectorAll('input[data-giri-orig-placeholder]').forEach(input => {
    input.placeholder = input.dataset.giriOrigPlaceholder;
  });

  document.querySelectorAll('[data-giri-orig-title]').forEach(el => {
    el.title = el.dataset.giriOrigTitle;
  });

  document.querySelectorAll('.lang-selector span').forEach(span => {
    span.textContent = 'India (EN)';
  });
}

/**
 * Language Persistence: English ('en') is strictly the universal default.
 */
export function getSavedLanguage() {
  try {
    if (!sessionStorage.getItem('giri_lang_initialized')) {
      // New session: ensure English is strictly the default language
      sessionStorage.setItem('giri_lang_initialized', 'true');
      sessionStorage.setItem('giri_selected_lang', 'en');
      localStorage.setItem('giri_selected_lang', 'en');
      document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=' + window.location.hostname + ';';
      return 'en';
    }
    return sessionStorage.getItem('giri_selected_lang') || localStorage.getItem('giri_selected_lang') || 'en';
  } catch (e) {
    return 'en';
  }
}

export function saveLanguage(code) {
  try {
    sessionStorage.setItem('giri_lang_initialized', 'true');
    sessionStorage.setItem('giri_selected_lang', code);
    localStorage.setItem('giri_selected_lang', code);
  } catch (e) {}
}
