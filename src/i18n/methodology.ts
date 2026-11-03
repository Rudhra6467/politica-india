import type { Locale } from "./index";

export type MethodologySection = { heading: string; paragraphs?: string[]; bullets?: string[]; layers?: { dot: string; title: string; body: string }[] };
export type MethodologyContent = { title: string; metaTitle: string; metaDescription: string; intro: string; sections: MethodologySection[]; closing: string };

const en: MethodologyContent = {
  title: "How Politica Works",
  metaTitle: "How Politica Works · Methodology",
  metaDescription: "How Politica India sources, tracks, and presents political information. What we do and what we do not do.",
  intro: "Politica India is a source-backed political information system. It is designed to make public records and tracked claims easier to understand, not to tell anyone how to vote.",
  sections: [
    {
      heading: "Three layers of information",
      layers: [
        { dot: "bg-blue-500", title: "Verified Record", body: "Facts from official or public records, primarily ECI Form 26 affidavits (assets, liabilities, education, declared criminal cases), with source attribution and links where available." },
        { dot: "bg-amber-500", title: "Tracked", body: "Promises and announcements with status and evidence notes. “Unable to verify” is preferred over unsupported certainty." },
        { dot: "bg-violet-500", title: "Community", body: "Star ratings and promise verdicts are citizen opinion only, never an official fact, score, or editorial ranking of candidates." },
      ],
    },
    {
      heading: "How a promise gets its status",
      paragraphs: ["Every status other than “Unable to verify” must carry at least one dated, linked source, and our data check refuses to build the site otherwise. The rules:"],
      bullets: [
        "Verified completed: an official source (government, PIB, ECI) confirms completion.",
        "Reported completed: reputable press reports completion; not independently confirmed.",
        "In progress: a source shows concrete steps: budget allocated, scheme launched, work started.",
        "Not started: a source shows the commitment exists but no public action yet.",
        "Evidence conflicting: credible sources disagree.",
        "Unable to verify: we found no reliable evidence either way. We say so instead of guessing.",
      ],
    },
    {
      heading: "What a promise is",
      paragraphs: [
        "A tracked promise is a specific pledge we can check: a manifesto guarantee, a campaign statement reported by the press, or a commitment an office-holder has made in office. Each shows who made it and where. Candidates who lost their election usually stay “Unable to verify”, since they hold no office to deliver.",
        "Each source shows its publisher, publication date and a short verbatim line, so you can judge it yourself.",
      ],
    },
    {
      heading: "Pilot engagement (current site)",
      paragraphs: ["Citizens rate leaders one to five stars and judge each promise as kept, partly kept or not kept. One rating per verified mobile number, changeable any time. Averages are shown only after 50 ratings so a few accounts cannot paint a number. The mood board sorts by how many people rated, never by score. Ratings are public opinion shown next to the record; they are never an official fact or an overall “Politica rating”."],
    },
    {
      heading: "Photos and party marks",
      paragraphs: ["Candidate photos use public-domain or clearly licensed sources (Wikimedia Commons, government releases) when available; otherwise initials placeholders. Party marks are simplified ECI-style election symbols for identification only, not official party artwork."],
    },
    {
      heading: "What Politica does not do",
      bullets: [
        "Does not endorse or oppose any candidate or party.",
        "Does not assign overall performance scores or rankings.",
        "Does not treat allegations as convictions.",
        "Does not convert ratings into factual claims.",
        "Does not sell candidate visibility or store Aadhaar numbers.",
      ],
    },
    {
      heading: "Sources",
      paragraphs: ["Primary declarations: Election Commission of India (Form 26), often via ADR / MyNeta with ECI as origin. Results from ECI publications. Promises from public statements with source and last-checked date. Corrections are made in the open: the data is versioned, each correction cites its source, and profiles show their last-updated date."],
    },
    {
      heading: "Pilot status",
      paragraphs: ["Focused pilot: Andhra Pradesh and Telangana. Depth before nationwide thin coverage. Real user accounts come after pilot completeness."],
    },
  ],
  closing: "Politica should make political information easier to understand, not make political decisions easier to outsource.",
};

const te: MethodologyContent = {
  title: "పొలిటికా ఎలా పనిచేస్తుంది",
  metaTitle: "పొలిటికా ఎలా పనిచేస్తుంది · పద్ధతి",
  metaDescription: "పొలిటికా ఇండియా రాజకీయ సమాచారాన్ని ఎలా సేకరిస్తుంది, ట్రాక్ చేస్తుంది, చూపిస్తుంది. మేము ఏమి చేస్తాం, ఏమి చేయం.",
  intro: "పొలిటికా ఇండియా ఆధారాలతో కూడిన రాజకీయ సమాచార వ్యవస్థ. బహిరంగ రికార్డులు, ట్రాక్ చేసిన వాదనలను సులభంగా అర్థం చేసుకునేలా రూపొందించాం. ఎవరికి ఓటు వేయాలో చెప్పడం మా పని కాదు.",
  sections: [
    {
      heading: "సమాచారంలో మూడు పొరలు",
      layers: [
        { dot: "bg-blue-500", title: "ధృవీకృత రికార్డు", body: "అధికారిక లేదా బహిరంగ రికార్డుల నుండి వాస్తవాలు, ప్రధానంగా ECI ఫారం 26 అఫిడవిట్లు (ఆస్తులు, అప్పులు, విద్య, ప్రకటించిన క్రిమినల్ కేసులు); మూలం, లింకుతో సహా." },
        { dot: "bg-amber-500", title: "ట్రాక్ చేసినవి", body: "హామీలు, ప్రకటనలు — స్థితి, ఆధారాల గమనికలతో. ఆధారం లేని ఖచ్చితత్వం కంటే “ధృవీకరించలేకపోయాం” అని చెప్పడమే మేలు." },
        { dot: "bg-violet-500", title: "సమాజం", body: "స్టార్ రేటింగ్‌లు, హామీ తీర్పులు పౌరుల అభిప్రాయం మాత్రమే. అధికారిక వాస్తవం, స్కోరు లేదా సంపాదకీయ ర్యాంకింగ్ ఎప్పుడూ కాదు." },
      ],
    },
    {
      heading: "హామీకి స్థితి ఎలా వస్తుంది",
      paragraphs: ["“ధృవీకరించలేకపోయాం” తప్ప ప్రతి స్థితికీ తేదీతో కూడిన, లింక్ చేసిన మూలం కనీసం ఒకటి ఉండాలి; లేకపోతే మా డేటా తనిఖీ సైట్‌ను బిల్డ్ చేయడానికి నిరాకరిస్తుంది. నియమాలు:"],
      bullets: [
        "పూర్తయినట్లు ధృవీకరణ: అధికారిక మూలం (ప్రభుత్వం, PIB, ECI) పూర్తిని ధృవీకరిస్తుంది.",
        "పూర్తయినట్లు నివేదిక: నమ్మదగిన మీడియా పూర్తయిందని నివేదిస్తుంది; స్వతంత్రంగా ధృవీకరించలేదు.",
        "పురోగతిలో ఉంది: బడ్జెట్ కేటాయింపు, పథకం ప్రారంభం, పని మొదలు వంటి కచ్చితమైన చర్యలను మూలం చూపిస్తుంది.",
        "ప్రారంభం కాలేదు: హామీ ఉన్నట్లు మూలం చూపిస్తుంది కానీ ఇంకా బహిరంగ చర్య లేదు.",
        "ఆధారాలు విరుద్ధం: నమ్మదగిన మూలాలు విభేదిస్తున్నాయి.",
        "ధృవీకరించలేకపోయాం: ఏ వైపుకూ నమ్మదగిన ఆధారం దొరకలేదు. ఊహించకుండా అదే చెబుతాం.",
      ],
    },
    {
      heading: "హామీ అంటే ఏమిటి",
      paragraphs: [
        "ట్రాక్ చేసిన హామీ అంటే మేము పరిశీలించగల నిర్దిష్ట వాగ్దానం: మేనిఫెస్టో హామీ, మీడియా నివేదించిన ప్రచార ప్రకటన, లేదా పదవిలో ఉన్నవారు చేసిన నిబద్ధత. ఎవరు, ఎక్కడ చెప్పారో ప్రతిదీ చూపిస్తుంది. ఎన్నికల్లో ఓడిన అభ్యర్థులు సాధారణంగా “ధృవీకరించలేకపోయాం”లోనే ఉంటారు, ఎందుకంటే అమలు చేయడానికి వారికి పదవి లేదు.",
        "ప్రతి మూలానికీ ప్రచురణకర్త, తేదీ, చిన్న యథాతథ వాక్యం ఉంటాయి, మీరే అంచనా వేయవచ్చు.",
      ],
    },
    {
      heading: "పైలట్ స్పందన (ప్రస్తుత సైట్)",
      paragraphs: ["పౌరులు నాయకులకు 1 నుండి 5 నక్షత్రాలు ఇస్తారు, ప్రతి హామీని నెరవేర్చారు / పాక్షికంగా / నెరవేర్చలేదు అని తీర్పు చెబుతారు. ధృవీకృత మొబైల్ నంబర్‌కు ఒక రేటింగ్, ఎప్పుడైనా మార్చుకోవచ్చు. కొద్దిమంది ఖాతాలు సంఖ్యను మార్చకుండా 50 రేటింగ్‌ల తర్వాతే సగటు చూపిస్తాం. మనోభావ బోర్డు స్కోరుతో కాదు, ఎంతమంది రేట్ చేశారో ఆ క్రమంలో ఉంటుంది. రేటింగ్‌లు రికార్డు పక్కన చూపించే ప్రజాభిప్రాయం మాత్రమే; అధికారిక వాస్తవం లేదా “పొలిటికా రేటింగ్” ఎప్పుడూ కాదు."],
    },
    {
      heading: "ఫోటోలు, పార్టీ గుర్తులు",
      paragraphs: ["అభ్యర్థుల ఫోటోలు పబ్లిక్ డొమైన్ లేదా స్పష్టమైన లైసెన్స్ ఉన్న మూలాల నుండి (వికీమీడియా కామన్స్, ప్రభుత్వ విడుదలలు); లేకపోతే పేరు అక్షరాలు. పార్టీ గుర్తులు గుర్తింపు కోసం సరళీకృత ECI-శైలి ఎన్నికల చిహ్నాలు, అధికారిక పార్టీ కళాకృతి కాదు."],
    },
    {
      heading: "పొలిటికా ఏమి చేయదు",
      bullets: [
        "ఏ అభ్యర్థిని, పార్టీని సమర్థించదు, వ్యతిరేకించదు.",
        "మొత్తం పనితీరు స్కోర్లు లేదా ర్యాంకులు ఇవ్వదు.",
        "ఆరోపణలను నేరనిర్ధారణలుగా చూడదు.",
        "రేటింగ్‌లను వాస్తవ వాదనలుగా మార్చదు.",
        "అభ్యర్థుల ప్రచారం అమ్మదు, ఆధార్ నంబర్లు నిల్వ చేయదు.",
      ],
    },
    {
      heading: "మూలాలు",
      paragraphs: ["ప్రాథమిక ప్రకటనలు: భారత ఎన్నికల సంఘం (ఫారం 26), తరచుగా ADR / MyNeta ద్వారా, మూలం ECI. ఫలితాలు ECI ప్రచురణల నుండి. హామీలు బహిరంగ ప్రకటనల నుండి, మూలం మరియు చివరి పరిశీలన తేదీతో. సవరణలు బహిరంగంగా జరుగుతాయి: డేటాకు వెర్షన్లు ఉంటాయి, ప్రతి సవరణ మూలాన్ని చూపిస్తుంది, ప్రొఫైల్‌లు చివరి నవీకరణ తేదీని చూపిస్తాయి."],
    },
    {
      heading: "పైలట్ స్థితి",
      paragraphs: ["కేంద్రీకృత పైలట్: ఆంధ్రప్రదేశ్, తెలంగాణ. దేశవ్యాప్త పలుచని సమాచారం కంటే లోతు ముందు. పైలట్ పూర్తయ్యాకే నిజమైన వినియోగదారు ఖాతాలు."],
    },
  ],
  closing: "రాజకీయ సమాచారాన్ని సులభంగా అర్థమయ్యేలా చేయడం పొలిటికా పని; రాజకీయ నిర్ణయాలను ఇతరులకు అప్పగించేలా చేయడం కాదు.",
};

const hi: MethodologyContent = {
  title: "पॉलिटिका कैसे काम करता है",
  metaTitle: "पॉलिटिका कैसे काम करता है · कार्यप्रणाली",
  metaDescription: "पॉलिटिका इंडिया राजनीतिक जानकारी कैसे जुटाता, ट्रैक करता और दिखाता है। हम क्या करते हैं और क्या नहीं।",
  intro: "पॉलिटिका इंडिया स्रोत-आधारित राजनीतिक सूचना प्रणाली है। इसे सार्वजनिक रिकॉर्ड और ट्रैक किए गए दावों को समझना आसान बनाने के लिए बनाया गया है, किसी को यह बताने के लिए नहीं कि वोट किसे दें।",
  sections: [
    {
      heading: "जानकारी की तीन परतें",
      layers: [
        { dot: "bg-blue-500", title: "सत्यापित रिकॉर्ड", body: "आधिकारिक या सार्वजनिक रिकॉर्ड से तथ्य, मुख्यतः ECI फ़ॉर्म 26 शपथपत्र (संपत्ति, देनदारियाँ, शिक्षा, घोषित आपराधिक मामले), स्रोत और लिंक सहित।" },
        { dot: "bg-amber-500", title: "ट्रैक किए गए", body: "वादे और घोषणाएँ, स्थिति और साक्ष्य-टिप्पणी के साथ। निराधार निश्चितता से बेहतर है “सत्यापित नहीं कर सके” कहना।" },
        { dot: "bg-violet-500", title: "समुदाय", body: "स्टार रेटिंग और वादों पर फ़ैसले केवल नागरिकों की राय हैं, कभी आधिकारिक तथ्य, स्कोर या संपादकीय रैंकिंग नहीं।" },
      ],
    },
    {
      heading: "किसी वादे को उसकी स्थिति कैसे मिलती है",
      paragraphs: ["“सत्यापित नहीं कर सके” के अलावा हर स्थिति के साथ कम से कम एक दिनांकित, लिंक किया हुआ स्रोत होना ज़रूरी है; वरना हमारी डेटा जाँच साइट को बिल्ड ही नहीं होने देती। नियम:"],
      bullets: [
        "पूरा होना सत्यापित: कोई आधिकारिक स्रोत (सरकार, PIB, ECI) पूरा होने की पुष्टि करता है।",
        "पूरा होने की रिपोर्ट: विश्वसनीय प्रेस पूरा होने की रिपोर्ट करता है; स्वतंत्र पुष्टि नहीं।",
        "प्रगति पर: स्रोत ठोस कदम दिखाता है: बजट आवंटन, योजना शुरू, काम शुरू।",
        "शुरू नहीं हुआ: स्रोत दिखाता है कि वादा मौजूद है पर अभी कोई सार्वजनिक कार्रवाई नहीं।",
        "साक्ष्य परस्पर विरोधी: विश्वसनीय स्रोत असहमत हैं।",
        "सत्यापित नहीं कर सके: किसी भी ओर भरोसेमंद साक्ष्य नहीं मिला। अनुमान लगाने के बजाय हम यही कहते हैं।",
      ],
    },
    {
      heading: "वादा क्या है",
      paragraphs: [
        "ट्रैक किया गया वादा एक ऐसा विशिष्ट वचन है जिसे हम जाँच सकें: घोषणापत्र की गारंटी, प्रेस में दर्ज चुनावी बयान, या पद पर रहते हुए की गई प्रतिबद्धता। हर वादे के साथ दिखता है कि किसने और कहाँ कहा। हारे हुए उम्मीदवार प्रायः “सत्यापित नहीं कर सके” में ही रहते हैं, क्योंकि पूरा करने के लिए उनके पास पद नहीं है।",
        "हर स्रोत के साथ प्रकाशक, तारीख और एक छोटी शब्दशः पंक्ति दिखती है, ताकि आप स्वयं परख सकें।",
      ],
    },
    {
      heading: "पायलट प्रतिक्रिया (वर्तमान साइट)",
      paragraphs: ["नागरिक नेताओं को 1 से 5 स्टार देते हैं और हर वादे पर पूरा किया / आंशिक / पूरा नहीं किया का फ़ैसला देते हैं। प्रति सत्यापित मोबाइल नंबर एक रेटिंग, जिसे कभी भी बदला जा सकता है। औसत 50 रेटिंग के बाद ही दिखता है ताकि कुछ खाते संख्या न बदल सकें। मिज़ाज बोर्ड स्कोर से नहीं, कितनों ने रेट किया उस क्रम में है। रेटिंग रिकॉर्ड के बगल में दिखाई जाने वाली जनता की राय है; कभी आधिकारिक तथ्य या “पॉलिटिका रेटिंग” नहीं।"],
    },
    {
      heading: "तस्वीरें और पार्टी चिह्न",
      paragraphs: ["उम्मीदवारों की तस्वीरें सार्वजनिक डोमेन या स्पष्ट लाइसेंस वाले स्रोतों (विकिमीडिया कॉमन्स, सरकारी विज्ञप्तियाँ) से हैं; अन्यथा नाम के अक्षर दिखते हैं। पार्टी चिह्न केवल पहचान के लिए सरलीकृत ECI-शैली के चुनाव प्रतीक हैं, आधिकारिक पार्टी कलाकृति नहीं।"],
    },
    {
      heading: "पॉलिटिका क्या नहीं करता",
      bullets: [
        "किसी उम्मीदवार या पार्टी का समर्थन या विरोध नहीं करता।",
        "समग्र प्रदर्शन स्कोर या रैंकिंग नहीं देता।",
        "आरोपों को दोषसिद्धि नहीं मानता।",
        "रेटिंग को तथ्यात्मक दावों में नहीं बदलता।",
        "उम्मीदवारों की दृश्यता नहीं बेचता, आधार नंबर संग्रहीत नहीं करता।",
      ],
    },
    {
      heading: "स्रोत",
      paragraphs: ["प्राथमिक घोषणाएँ: भारत निर्वाचन आयोग (फ़ॉर्म 26), अक्सर ADR / MyNeta के माध्यम से, मूल स्रोत ECI। परिणाम ECI प्रकाशनों से। वादे सार्वजनिक बयानों से, स्रोत और अंतिम जाँच की तारीख के साथ। सुधार खुले में किए जाते हैं: डेटा के संस्करण रखे जाते हैं, हर सुधार अपना स्रोत बताता है, और प्रोफ़ाइल अंतिम अद्यतन की तारीख दिखाती हैं।"],
    },
    {
      heading: "पायलट की स्थिति",
      paragraphs: ["केंद्रित पायलट: आंध्र प्रदेश और तेलंगाना। देशव्यापी पतली कवरेज से पहले गहराई। वास्तविक उपयोगकर्ता खाते पायलट पूरा होने के बाद।"],
    },
  ],
  closing: "पॉलिटिका को राजनीतिक जानकारी समझना आसान बनाना चाहिए, राजनीतिक निर्णय दूसरों को सौंपना आसान नहीं।",
};

const content: Record<Locale, MethodologyContent> = { en, te, hi };
export function getMethodology(locale: Locale): MethodologyContent {
  return content[locale] ?? en;
}
