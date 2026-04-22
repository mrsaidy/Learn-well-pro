import { useState, useEffect, useRef } from "react";

// ─── COLOUR PALETTE ───────────────────────────────────────────────
const COLORS = {
  maths:   { bg: "#0f2d4a", accent: "#1e90ff", light: "#e8f2ff" },
  english: { bg: "#1a3a1a", accent: "#2ecc71", light: "#eafaf1" },
};

// ─── SUBJECTS & TOPICS ────────────────────────────────────────────
const SUBJECTS = {
  maths: {
    label: "Mathematics", icon: "∑",
    topics: ["Algebra","Geometry","Statistics","Fractions & Decimals","Indices & Standard Form"],
  },
  english: {
    label: "English Language", icon: "✍",
    topics: ["Grammar","Vocabulary","Comprehension","Essay Writing","Creative Writing","Letter & Report Writing"],
  },
};

// ─── LESSONS ──────────────────────────────────────────────────────
const LESSONS = {
  maths: {
    Algebra: {
      title: "Introduction to Algebra",
      sections: [
        { h: "What is Algebra?", t: "Algebra uses letters (variables) to represent unknown numbers. It lets us write general rules and solve problems where a value is missing." },
        { h: "Solving Equations", t: "To solve 2x + 4 = 10, isolate x. Subtract 4: 2x = 6. Divide by 2: x = 3. Always do the same operation to both sides." },
        { h: "Expanding Brackets", t: "To expand a(b + c), multiply a by each term inside: ab + ac. Example: 3(x + 5) = 3x + 15." },
        { h: "Factorising", t: "Factorising is the reverse of expanding. To factorise 6x + 9, find the HCF (3): 3(2x + 3)." },
      ],
    },
    Geometry: {
      title: "Shapes & Measurements",
      sections: [
        { h: "Area Formulae", t: "Rectangle: l × w. Triangle: ½ × b × h. Circle: πr². Trapezium: ½(a+b)h." },
        { h: "Perimeter & Circumference", t: "Perimeter = total distance around a shape. Circle circumference = 2πr or πd." },
        { h: "Angles", t: "Angles in a triangle = 180°. Angles in a quadrilateral = 360°. Vertically opposite angles are equal." },
        { h: "Pythagoras' Theorem", t: "In a right-angled triangle: a² + b² = c², where c is the hypotenuse (longest side)." },
      ],
    },
    Statistics: {
      title: "Averages & Data",
      sections: [
        { h: "Mean", t: "Add all values, divide by how many there are. Example: (4+8+6+5+7) ÷ 5 = 6." },
        { h: "Median", t: "Arrange values in order; the median is the middle value. If two middle values, find their mean." },
        { h: "Mode & Range", t: "Mode = most frequent value. Range = largest − smallest value." },
        { h: "Pie Charts & Bar Charts", t: "Pie chart sectors represent proportions of a whole (360° total). Bar charts compare frequencies using rectangular bars." },
      ],
    },
    "Fractions & Decimals": {
      title: "Fractions, Decimals & Percentages",
      sections: [
        { h: "Fractions", t: "A fraction represents part of a whole. To add fractions, find a common denominator. To multiply, multiply numerators and denominators separately." },
        { h: "Converting Forms", t: "To convert a fraction to a decimal, divide the numerator by the denominator. To convert to a percentage, multiply the decimal by 100." },
        { h: "Percentages", t: "To find a percentage of an amount: (percentage ÷ 100) × amount. Example: 20% of 80 = (20÷100) × 80 = 16." },
        { h: "Percentage Change", t: "Percentage change = (change ÷ original) × 100. A positive result is an increase; negative is a decrease." },
      ],
    },
    "Indices & Standard Form": {
      title: "Indices & Standard Form",
      sections: [
        { h: "Index Laws", t: "When multiplying: aᵐ × aⁿ = aᵐ⁺ⁿ. When dividing: aᵐ ÷ aⁿ = aᵐ⁻ⁿ. Power of a power: (aᵐ)ⁿ = aᵐⁿ." },
        { h: "Negative & Zero Indices", t: "Any number to the power of 0 equals 1. A negative index means the reciprocal: a⁻ⁿ = 1/aⁿ." },
        { h: "Standard Form", t: "Standard form writes large or small numbers as A × 10ⁿ, where 1 ≤ A < 10. Example: 45,000 = 4.5 × 10⁴." },
        { h: "Calculating in Standard Form", t: "To multiply: multiply the A values and add the powers. To divide: divide the A values and subtract the powers." },
      ],
    },
  },
  english: {
    Grammar: {
      title: "Grammar Essentials",
      sections: [
        { h: "Parts of Speech", t: "Noun (person/place/thing), verb (action/state), adjective (describes noun), adverb (describes verb/adjective), pronoun, preposition, conjunction, interjection." },
        { h: "Subject–Verb Agreement", t: "A singular subject takes a singular verb; a plural subject takes a plural verb. 'The dog runs' vs 'The dogs run'." },
        { h: "Tenses", t: "Simple past: walked. Simple present: walks. Simple future: will walk. Perfect tenses use 'have/has/had' with a past participle." },
        { h: "Active & Passive Voice", t: "Active: The teacher marked the papers. Passive: The papers were marked by the teacher. Active voice is usually clearer and more direct." },
      ],
    },
    Vocabulary: {
      title: "Building Your Vocabulary",
      sections: [
        { h: "Synonyms & Antonyms", t: "Synonyms share similar meanings (begin/start/commence). Antonyms are opposites (bright/dark). Using varied synonyms improves your writing style." },
        { h: "Prefixes & Suffixes", t: "Prefixes change meaning at the start (un-, re-, mis-, pre-). Suffixes alter the word at the end (-tion, -ful, -less, -ness). Learning these unlocks thousands of words." },
        { h: "Word Families", t: "Words sharing the same root form a family: act, action, active, activate, activity. Recognising roots helps with spelling and meaning." },
        { h: "Context Clues", t: "Deduce unfamiliar words from surrounding text. Look for definitions, examples, contrasts, or explanations nearby in the passage." },
      ],
    },
    Comprehension: {
      title: "Reading & Understanding",
      sections: [
        { h: "Main Idea & Supporting Details", t: "The main idea is what a passage is mostly about. Supporting details are facts, examples, or reasons that explain or prove the main idea." },
        { h: "Making Inferences", t: "An inference is a conclusion drawn using text clues and your own knowledge. Good readers 'read between the lines' rather than only the surface meaning." },
        { h: "Figurative Language", t: "Simile: she ran like the wind. Metaphor: he is a lion in battle. Personification: the stars danced. Hyperbole: I've told you a million times." },
        { h: "Answering Questions", t: "For 'explain' questions, use the PEE structure: Point, Evidence (quote from text), Explanation. Always refer back to the text." },
      ],
    },
    "Essay Writing": {
      title: "Essay Writing & Paragraphing",
      sections: [
        { h: "Essay Structure", t: "Every essay needs an Introduction (introduce topic + thesis), Body Paragraphs (each with one main point), and a Conclusion (summarise + restate thesis)." },
        { h: "The PEEL Paragraph", t: "Point: state your argument. Evidence: quote or example. Explanation: explain how evidence proves your point. Link: connect back to the question or to the next paragraph." },
        { h: "Writing a Strong Introduction", t: "Hook the reader with a bold statement, question, or statistic. Provide brief context. End with a clear thesis statement that outlines your argument." },
        { h: "Formal Register", t: "Use formal vocabulary, avoid contractions (write 'do not' not 'don't'), use third-person where required, and vary sentence length for rhythm and effect." },
      ],
    },
    "Creative Writing": {
      title: "Creative & Narrative Writing",
      sections: [
        { h: "Story Structure", t: "Use Freytag's Pyramid: Exposition → Rising Action → Climax → Falling Action → Resolution. Every strong narrative has tension, a turning point, and closure." },
        { h: "Show, Don't Tell", t: "Instead of 'she was scared', write 'her hands trembled as she reached for the door handle'. Vivid sensory detail immerses the reader." },
        { h: "Characterisation", t: "Reveal character through dialogue, actions, thoughts, and others' reactions — not just description. Authentic dialogue brings characters to life." },
        { h: "Writing Techniques", t: "Use varied sentence structures for pace. Short sentences create tension. Longer, flowing sentences slow the reader down. Use powerful verbs and precise nouns." },
      ],
    },
    "Letter & Report Writing": {
      title: "Letter & Report Writing",
      sections: [
        { h: "Formal Letter Format", t: "Include: your address (top right), date, recipient's address (left), salutation (Dear Mr/Ms...), body paragraphs, formal closing (Yours sincerely/faithfully), signature." },
        { h: "Formal vs Informal Letters", t: "Formal letters use professional language for official purposes. Informal letters to friends/family use casual language. Match your register to your audience." },
        { h: "Report Structure", t: "Reports have: a title, introduction (purpose), findings (organised under subheadings), conclusion, and recommendations. Use clear, factual, impersonal language." },
        { h: "Purpose & Audience", t: "Always ask: Who am I writing to? Why am I writing? What tone is appropriate? These three questions shape every writing decision you make." },
      ],
    },
  },
};

// ─── QUIZ BANK ────────────────────────────────────────────────────
const QUIZ = {
  maths: {
    Algebra: [
      { q:"Solve: 3x - 7 = 11", o:["x=5","x=6","x=7","x=4"], a:1 },
      { q:"Expand: 4(2x + 3)", o:["6x+7","8x+12","8x+3","6x+12"], a:1 },
      { q:"Factorise: 10x + 15", o:["5(2x+3)","2(5x+15)","10(x+5)","3(x+5)"], a:0 },
      { q:"If 5y = 35, what is y?", o:["5","6","7","8"], a:2 },
      { q:"Simplify: 3x + 2y - x + 4y", o:["2x+6y","4x+6y","2x+2y","4x+2y"], a:0 },
    ],
    Geometry: [
      { q:"Area of a triangle: base=8, height=5", o:["40","20","13","80"], a:1 },
      { q:"Angles in a triangle sum to:", o:["90°","360°","180°","270°"], a:2 },
      { q:"Circumference of a circle, r=5 (π≈3.14):", o:["15.7","31.4","78.5","25.0"], a:1 },
      { q:"In a right triangle: a=3, b=4. Find c.", o:["5","6","7","25"], a:0 },
      { q:"Area of a rectangle: l=9, w=4", o:["13","26","36","40"], a:2 },
    ],
    Statistics: [
      { q:"Mean of: 5, 10, 15, 20", o:["10","12","12.5","15"], a:2 },
      { q:"Median of: 3, 7, 1, 9, 5 (ordered: 1,3,5,7,9)", o:["3","5","7","9"], a:1 },
      { q:"Mode of: 4, 4, 6, 8, 4, 6", o:["4","6","8","No mode"], a:0 },
      { q:"Range of: 12, 5, 19, 3, 8", o:["14","16","15","17"], a:1 },
      { q:"Which average is most affected by extreme values?", o:["Mode","Median","Mean","Range"], a:2 },
    ],
    "Fractions & Decimals": [
      { q:"What is ¾ as a decimal?", o:["0.34","0.75","0.73","0.25"], a:1 },
      { q:"25% of 200 =", o:["25","50","75","100"], a:1 },
      { q:"½ + ⅓ =", o:["2/5","5/6","3/5","2/3"], a:1 },
      { q:"Convert 0.6 to a percentage:", o:["6%","0.6%","60%","600%"], a:2 },
      { q:"A shirt costs £40. It is reduced by 15%. New price?", o:["£30","£32","£34","£36"], a:2 },
    ],
    "Indices & Standard Form": [
      { q:"Simplify: 2³ × 2⁴", o:["2⁷","2¹²","4⁷","2¹"], a:0 },
      { q:"What is 5⁰?", o:["0","5","1","25"], a:2 },
      { q:"Write 67,000 in standard form:", o:["6.7×10³","67×10³","6.7×10⁴","0.67×10⁵"], a:2 },
      { q:"Simplify: (3²)³", o:["3⁵","3⁶","9³","3⁸"], a:1 },
      { q:"What is 4⁻²?", o:["−16","1/16","−8","1/8"], a:1 },
    ],
  },
  english: {
    Grammar: [
      { q:"Which is correct?", o:["She don't like it.","She doesn't like it.","She not like it.","She doesn't likes it."], a:1 },
      { q:"Identify the verb: 'The children played in the park.'", o:["children","played","park","The"], a:1 },
      { q:"Which sentence uses the passive voice?", o:["The dog bit the man.","The man was bitten by the dog.","The man bit the dog.","The dog bites men."], a:1 },
      { q:"What is the past tense of 'run'?", o:["runned","runs","ran","running"], a:2 },
      { q:"Which is an adverb?", o:["quickly","quick","quickness","quicker"], a:0 },
    ],
    Vocabulary: [
      { q:"What does 'benevolent' mean?", o:["cruel","kind and generous","intelligent","mysterious"], a:1 },
      { q:"Antonym of 'abundant':", o:["plentiful","scarce","generous","full"], a:1 },
      { q:"The prefix 'mis-' means:", o:["again","wrongly","not","before"], a:1 },
      { q:"Which is spelled correctly?", o:["recieve","accomodate","receive","seperate"], a:2 },
      { q:"A word with the same meaning as 'happy':", o:["melancholy","jovial","pensive","sullen"], a:1 },
    ],
    Comprehension: [
      { q:"What is the main idea of a passage?", o:["A supporting detail","The conclusion only","What the passage is mostly about","The first sentence"], a:2 },
      { q:"What is an inference?", o:["A direct quote","A conclusion drawn from clues in the text","A dictionary definition","A chapter title"], a:1 },
      { q:"'Her smile was a ray of sunshine' is a:", o:["Simile","Metaphor","Personification","Hyperbole"], a:1 },
      { q:"PEE paragraph structure stands for:", o:["Plan, Edit, Evaluate","Point, Evidence, Explanation","Paragraph, Example, End","Plot, Event, Ending"], a:1 },
      { q:"'The wind whispered through the trees' is:", o:["Simile","Metaphor","Personification","Alliteration"], a:2 },
    ],
    "Essay Writing": [
      { q:"What does PEEL stand for?", o:["Plan,Edit,Evaluate,Link","Point,Evidence,Explain,Link","Paragraph,Example,Evaluate,Link","Point,Expand,Explain,List"], a:1 },
      { q:"Where does the thesis statement usually go?", o:["Body paragraph","Conclusion","Introduction","Anywhere"], a:2 },
      { q:"Which is formal register?", o:["I can't believe it!","It cannot be denied that…","So basically…","Loads of people think…"], a:1 },
      { q:"What is the purpose of a conclusion?", o:["Introduce new arguments","Summarise and restate the thesis","Give evidence","Ask a question"], a:1 },
      { q:"How many main points should each body paragraph have?", o:["As many as possible","Two or three","One clear point","None"], a:2 },
    ],
    "Creative Writing": [
      { q:"'Show, don't tell' means:", o:["Use long descriptions","Use vivid sensory detail rather than stating emotions directly","Tell the reader everything","Use simple language"], a:1 },
      { q:"The climax of a story is:", o:["The beginning","The turning point of highest tension","The resolution","The introduction of characters"], a:1 },
      { q:"Short sentences in narrative create:", o:["Relaxation","Humour","Tension and pace","Boredom"], a:2 },
      { q:"Characterisation is best revealed through:", o:["Only physical description","Dialogue, actions and thoughts","The title","The setting alone"], a:1 },
      { q:"Which is an example of a simile?", o:["He roared like a lion.","He was a lion.","The lion spoke.","The lion's roar filled the room."], a:0 },
    ],
    "Letter & Report Writing": [
      { q:"A formal letter should close with:", o:["Love from","See you soon","Yours sincerely or Yours faithfully","Best wishes"], a:2 },
      { q:"'Yours sincerely' is used when:", o:["You don't know the recipient's name","You know the recipient's name","Writing to a friend","Writing informally"], a:1 },
      { q:"A report's findings section should be:", o:["Written as a story","Organised under clear subheadings","Written in first person","Full of opinions"], a:1 },
      { q:"What should you consider first when writing?", o:["Word count","Purpose and audience","Font size","Paragraph length"], a:1 },
      { q:"Which belongs in a formal letter?", o:["Hey there!","Just to let you know…","I am writing to formally request…","Loads of problems happened."], a:2 },
    ],
  },
};

// ─── WRITING PROMPTS ──────────────────────────────────────────────
const WRITING_PROMPTS = {
  "Essay Writing": [
    "Should mobile phones be banned in schools? Write a balanced essay arguing both sides.",
    "Social media does more harm than good to teenagers. Do you agree? Write a formal essay.",
    "Write an essay discussing whether homework should be abolished.",
  ],
  "Creative Writing": [
    "Write a short story that begins with: 'The door had been locked for twenty years — until today.'",
    "Describe a character arriving in a new city for the first time. Focus on their emotions and surroundings.",
    "Write a narrative about a difficult decision that changed everything.",
  ],
  "Letter & Report Writing": [
    "Write a formal letter to your headteacher requesting better library facilities for students.",
    "Write a report on the benefits and drawbacks of after-school clubs in your school.",
    "Write a letter to a local newspaper about an environmental issue in your community.",
  ],
};

// ─── MAIN APP ─────────────────────────────────────────────────────
export default function LearnWellPro() {
  const [studentName, setStudentName] = useState("");
  const [nameInput, setNameInput] = useState("");
  const [screen, setScreen] = useState("login");
  const [subject, setSubject] = useState(null);
  const [topic, setTopic] = useState(null);
  const [quizState, setQuizState] = useState({ idx: 0, score: 0, selected: null, done: false, answers: [] });
  const [progress, setProgress] = useState({});
  const [chatHistory, setChatHistory] = useState([]);
  const [aiInput, setAiInput] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [writingPrompt, setWritingPrompt] = useState("");
  const [writingText, setWritingText] = useState("");
  const [writingFeedback, setWritingFeedback] = useState("");
  const [feedbackLoading, setFeedbackLoading] = useState(false);
  const [tab, setTab] = useState("lesson");
  const chatEndRef = useRef(null);

  const sub = subject ? COLORS[subject] : null;
  const subInfo = subject ? SUBJECTS[subject] : null;

  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [chatHistory]);

  const progressKey = subject && topic ? `${subject}||${topic}` : null;
  const allProgress = Object.entries(progress);
  const avgScore = allProgress.length
    ? Math.round(allProgress.reduce((s, [, v]) => s + v, 0) / allProgress.length)
    : 0;

  // ── LOGIN ──
  if (screen === "login") return (
    <div style={{ minHeight:"100vh", background:"#0f2d4a", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Palatino Linotype','Book Antiqua',Palatino,serif" }}>
      <div style={{ background:"#fff", borderRadius:12, padding:"40px 36px", maxWidth:400, width:"90%", textAlign:"center", boxShadow:"0 8px 40px rgba(0,0,0,0.3)" }}>
        <div style={{ fontSize:48, marginBottom:8 }}>📚</div>
        <h1 style={{ margin:"0 0 4px", fontSize:26, color:"#0f2d4a", letterSpacing:1 }}>LearnWell Pro</h1>
        <p style={{ color:"#777", margin:"0 0 28px", fontSize:14 }}>Secondary School Tutor — Maths & English</p>
        <input
          style={{ width:"100%", border:"1px solid #ccc", borderRadius:6, padding:"12px 14px", fontFamily:"inherit", fontSize:15, boxSizing:"border-box", marginBottom:14, textAlign:"center" }}
          placeholder="Enter your name to begin…"
          value={nameInput}
          onChange={e => setNameInput(e.target.value)}
          onKeyDown={e => { if (e.key === "Enter" && nameInput.trim()) { setStudentName(nameInput.trim()); setScreen("home"); }}}
        />
        <button
          disabled={!nameInput.trim()}
          onClick={() => { setStudentName(nameInput.trim()); setScreen("home"); }}
          style={{ width:"100%", background: nameInput.trim() ? "#0f2d4a" : "#ccc", color:"#fff", border:"none", borderRadius:6, padding:"13px", fontSize:16, fontFamily:"inherit", cursor: nameInput.trim() ? "pointer" : "default", fontWeight:"bold", letterSpacing:0.5 }}
        >Start Learning →</button>
      </div>
    </div>
  );

  // ── HOME ──
  if (screen === "home") return (
    <div style={{ minHeight:"100vh", background:"#f5f3ee", fontFamily:"'Palatino Linotype','Book Antiqua',Palatino,serif" }}>
      <div style={{ background:"#0f2d4a", color:"#fff", padding:"16px 24px", display:"flex", alignItems:"center", gap:12 }}>
        <span style={{ fontSize:22 }}>📚</span>
        <span style={{ flex:1, fontSize:18, fontWeight:"bold", letterSpacing:1 }}>LearnWell Pro</span>
        <span style={{ fontSize:13, opacity:0.8 }}>Welcome, {studentName}</span>
      </div>
      <div style={{ maxWidth:680, margin:"0 auto", padding:"24px 16px" }}>

        {/* Dashboard */}
        <div style={{ background:"#fff", border:"1px solid #ddd", borderRadius:8, padding:24, marginBottom:16, boxShadow:"0 1px 4px rgba(0,0,0,0.06)" }}>
          <h2 style={{ margin:"0 0 4px", fontSize:20, color:"#0f2d4a" }}>Your Dashboard</h2>
          <p style={{ margin:"0 0 18px", color:"#666", fontSize:13 }}>Topics completed: {allProgress.length} &nbsp;|&nbsp; Average score: {allProgress.length ? avgScore+"%" : "—"}</p>
          {allProgress.length > 0 ? (
            <div>
              {allProgress.map(([key, pct]) => {
                const [s, t] = key.split("||");
                const c = COLORS[s];
                return (
                  <div key={key} style={{ marginBottom:10 }}>
                    <div style={{ display:"flex", justifyContent:"space-between", fontSize:13, marginBottom:3 }}>
                      <span style={{ color:"#333" }}>{SUBJECTS[s].label} — <strong>{t}</strong></span>
                      <span style={{ color: c.accent, fontWeight:"bold" }}>{pct}%</span>
                    </div>
                    <div style={{ height:7, background:"#eee", borderRadius:4, overflow:"hidden" }}>
                      <div style={{ height:"100%", width:`${pct}%`, background:c.accent, borderRadius:4, transition:"width 0.6s" }} />
                    </div>
                  </div>
                );
              })}
            </div>
          ) : <p style={{ color:"#aaa", fontSize:13, margin:0 }}>Complete your first quiz to see your progress here.</p>}
        </div>

        {/* Subject Cards */}
        <h3 style={{ margin:"0 0 12px", color:"#333", fontSize:15, textTransform:"uppercase", letterSpacing:1 }}>Choose a Subject</h3>
        <div style={{ display:"flex", gap:14, flexWrap:"wrap" }}>
          {Object.entries(SUBJECTS).map(([key, s]) => (
            <button key={key} onClick={() => { setSubject(key); setTopic(null); setTab("lesson"); setScreen("topics"); }}
              style={{ flex:1, minWidth:140, background: COLORS[key].bg, color:"#fff", border:"none", borderRadius:8, padding:"28px 20px", cursor:"pointer", textAlign:"left", fontFamily:"inherit" }}>
              <div style={{ fontSize:34, marginBottom:8 }}>{s.icon}</div>
              <div style={{ fontSize:18, fontWeight:"bold", marginBottom:4 }}>{s.label}</div>
              <div style={{ fontSize:12, opacity:0.75 }}>{s.topics.length} topics available</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  // ── TOPICS ──
  if (screen === "topics") return (
    <div style={{ minHeight:"100vh", background:"#f5f3ee", fontFamily:"'Palatino Linotype','Book Antiqua',Palatino,serif" }}>
      <div style={{ background: sub.bg, color:"#fff", padding:"16px 24px", display:"flex", alignItems:"center", gap:12 }}>
        <button onClick={() => setScreen("home")} style={{ background:"rgba(255,255,255,0.15)", border:"none", color:"#fff", padding:"6px 14px", borderRadius:4, cursor:"pointer", fontFamily:"inherit", fontSize:13 }}>← Home</button>
        <span style={{ fontSize:20 }}>{subInfo.icon}</span>
        <span style={{ flex:1, fontSize:18, fontWeight:"bold" }}>{subInfo.label}</span>
      </div>
      <div style={{ maxWidth:680, margin:"0 auto", padding:"24px 16px" }}>
        <div style={{ background:"#fff", border:"1px solid #ddd", borderRadius:8, padding:24, boxShadow:"0 1px 4px rgba(0,0,0,0.06)" }}>
          <h3 style={{ margin:"0 0 16px", color: sub.bg }}>Select a Topic</h3>
          {subInfo.topics.map(t => {
            const key = `${subject}||${t}`;
            const pct = progress[key];
            return (
              <button key={t} onClick={() => { setTopic(t); setChatHistory([]); setWritingFeedback(""); setWritingText(""); setWritingPrompt(""); setTab("lesson"); setScreen("study"); }}
                style={{ display:"block", width:"100%", background:"#fff", border:`1px solid #ccc`, borderLeft:`4px solid ${sub.accent}`, borderRadius:6, padding:"13px 16px", marginBottom:10, cursor:"pointer", textAlign:"left", fontFamily:"inherit", fontSize:15 }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                  <span style={{ fontWeight:"bold", color: sub.bg }}>{t}</span>
                  {pct !== undefined && <span style={{ background: sub.accent, color:"#fff", borderRadius:20, padding:"2px 10px", fontSize:12 }}>{pct}%</span>}
                </div>
                <div style={{ fontSize:12, color:"#888", marginTop:3 }}>{LESSONS[subject][t]?.title}</div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );

  // ── STUDY SCREEN (lesson + quiz + writing + tutor tabs) ──
  if (screen === "study" && topic) {
    const lesson = LESSONS[subject][topic];
    const questions = QUIZ[subject][topic] || [];
    const isWritingTopic = !!WRITING_PROMPTS[topic];

    const startQuiz = () => setQuizState({ idx:0, score:0, selected:null, done:false, answers:[] });

    const handleAnswer = (idx) => {
      if (quizState.selected !== null) return;
      const correct = questions[quizState.idx].a === idx;
      const newScore = correct ? quizState.score + 1 : quizState.score;
      const newAnswers = [...quizState.answers, { selected: idx, correct }];
      setQuizState(q => ({ ...q, selected: idx, score: newScore, answers: newAnswers }));
      setTimeout(() => {
        if (quizState.idx + 1 >= questions.length) {
          const pct = Math.round((newScore / questions.length) * 100);
          setProgress(p => ({ ...p, [`${subject}||${topic}`]: pct }));
          setQuizState(q => ({ ...q, done: true }));
        } else {
          setQuizState(q => ({ ...q, idx: q.idx + 1, selected: null }));
        }
      }, 900);
    };

    const askTutor = async () => {
      if (!aiInput.trim()) return;
      setAiLoading(true);
      const newHistory = [...chatHistory, { role:"user", content: aiInput }];
      setChatHistory(newHistory);
      setAiInput("");
      try {
        const res = await fetch("https://api.anthropic.com/v1/messages", {
          method:"POST",
          headers:{ "Content-Type":"application/json" },
          body: JSON.stringify({
            model:"claude-sonnet-4-20250514",
            max_tokens:1000,
            system:`You are an experienced, patient secondary school teacher (ages 11-16) specialising in ${subInfo.label}, currently teaching the topic: ${topic}. Explain concepts clearly in 3-5 sentences with examples. Use encouraging, professional language. End each reply with a short follow-up question to check understanding. No markdown headers.`,
            messages: newHistory,
          }),
        });
        const data = await res.json();
        const reply = data.content?.find(b => b.type==="text")?.text || "Sorry, I couldn't process that. Please try again.";
        setChatHistory([...newHistory, { role:"assistant", content: reply }]);
      } catch { setChatHistory([...newHistory, { role:"assistant", content:"Connection error. Please try again." }]); }
      setAiLoading(false);
    };

    const getWritingFeedback = async () => {
      if (!writingText.trim() || writingText.trim().split(" ").length < 20) return;
      setFeedbackLoading(true);
      setWritingFeedback("");
      try {
        const res = await fetch("https://api.anthropic.com/v1/messages", {
          method:"POST",
          headers:{ "Content-Type":"application/json" },
          body: JSON.stringify({
            model:"claude-sonnet-4-20250514",
            max_tokens:1000,
            system:`You are a supportive English teacher marking a secondary school student's writing (ages 11-16) on the topic: ${topic}. 
The writing prompt was: "${writingPrompt}". 
Give warm, constructive feedback in this exact structure (use these exact labels):
STRENGTHS: (2-3 specific things done well)
AREAS TO IMPROVE: (2-3 specific, actionable suggestions)
TEACHER'S TIP: (one memorable technique or rule to apply next time)
Keep feedback encouraging, specific, and age-appropriate. Do not rewrite their work.`,
            messages: [{ role:"user", content: writingText }],
          }),
        });
        const data = await res.json();
        const reply = data.content?.find(b => b.type==="text")?.text || "Could not generate feedback. Please try again.";
        setWritingFeedback(reply);
      } catch { setWritingFeedback("Connection error. Please try again."); }
      setFeedbackLoading(false);
    };

    const tabs = ["lesson","quiz", ...(isWritingTopic ? ["write"] : []), "tutor"];
    const tabLabels = { lesson:"📖 Lesson", quiz:"✏️ Quiz", write:"🖊️ Write", tutor:"💬 Tutor" };

    return (
      <div style={{ minHeight:"100vh", background:"#f5f3ee", fontFamily:"'Palatino Linotype','Book Antiqua',Palatino,serif" }}>
        {/* Header */}
        <div style={{ background: sub.bg, color:"#fff", padding:"16px 24px", display:"flex", alignItems:"center", gap:12 }}>
          <button onClick={() => setScreen("topics")} style={{ background:"rgba(255,255,255,0.15)", border:"none", color:"#fff", padding:"6px 14px", borderRadius:4, cursor:"pointer", fontFamily:"inherit", fontSize:13 }}>← Topics</button>
          <span style={{ flex:1, fontSize:17, fontWeight:"bold" }}>{topic}</span>
          {progress[`${subject}||${topic}`] !== undefined && (
            <span style={{ background: sub.accent, borderRadius:20, padding:"3px 12px", fontSize:13, fontWeight:"bold" }}>{progress[`${subject}||${topic}`]}%</span>
          )}
        </div>

        {/* Tabs */}
        <div style={{ background:"#fff", borderBottom:"1px solid #ddd", display:"flex" }}>
          {tabs.map(t => (
            <button key={t} onClick={() => setTab(t)}
              style={{ flex:1, border:"none", borderBottom: tab===t ? `3px solid ${sub.accent}` : "3px solid transparent", background:"none", padding:"13px 8px", cursor:"pointer", fontFamily:"inherit", fontSize:13, fontWeight: tab===t ? "bold" : "normal", color: tab===t ? sub.bg : "#777" }}>
              {tabLabels[t]}
            </button>
          ))}
        </div>

        <div style={{ maxWidth:680, margin:"0 auto", padding:"20px 16px" }}>

          {/* LESSON TAB */}
          {tab === "lesson" && lesson && (
            <div style={{ background:"#fff", border:"1px solid #ddd", borderRadius:8, padding:24, boxShadow:"0 1px 4px rgba(0,0,0,0.06)" }}>
              <h2 style={{ margin:"0 0 18px", color: sub.bg, fontSize:20 }}>{lesson.title}</h2>
              {lesson.sections.map((s, i) => (
                <div key={i} style={{ marginBottom:18, paddingBottom:18, borderBottom: i < lesson.sections.length-1 ? "1px solid #f0f0f0" : "none" }}>
                  <div style={{ fontWeight:"bold", color: sub.accent, marginBottom:5, fontSize:15 }}>{s.h}</div>
                  <p style={{ margin:0, lineHeight:1.75, color:"#333", fontSize:15 }}>{s.t}</p>
                </div>
              ))}
              <div style={{ marginTop:8, display:"flex", gap:10, flexWrap:"wrap" }}>
                <button onClick={() => { setTab("quiz"); startQuiz(); }} style={{ background: sub.accent, color:"#fff", border:"none", borderRadius:6, padding:"11px 22px", cursor:"pointer", fontFamily:"inherit", fontSize:14, fontWeight:"bold" }}>Take Quiz →</button>
                <button onClick={() => setTab("tutor")} style={{ background: sub.bg, color:"#fff", border:"none", borderRadius:6, padding:"11px 22px", cursor:"pointer", fontFamily:"inherit", fontSize:14 }}>Ask the Tutor 💬</button>
              </div>
            </div>
          )}

          {/* QUIZ TAB */}
          {tab === "quiz" && (
            <div style={{ background:"#fff", border:"1px solid #ddd", borderRadius:8, padding:24, boxShadow:"0 1px 4px rgba(0,0,0,0.06)" }}>
              {questions.length === 0 ? <p style={{ color:"#999" }}>No quiz available for this topic yet.</p> : quizState.done ? (
                <div style={{ textAlign:"center" }}>
                  <div style={{ fontSize:52, marginBottom:10 }}>{quizState.score/questions.length >= 0.7 ? "🎉" : "📖"}</div>
                  <h2 style={{ margin:"0 0 6px" }}>Score: {quizState.score} / {questions.length}</h2>
                  <div style={{ fontSize:30, fontWeight:"bold", color: sub.accent, marginBottom:14 }}>{Math.round(quizState.score/questions.length*100)}%</div>
                  <p style={{ color:"#555", marginBottom:20, fontSize:14 }}>
                    {quizState.score === questions.length ? "Perfect! Outstanding work." : quizState.score/questions.length >= 0.7 ? "Great effort! Review any missed questions." : "Keep practising — revisit the lesson and try again."}
                  </p>
                  {/* Review answers */}
                  <div style={{ textAlign:"left", marginBottom:20 }}>
                    {questions.map((q, i) => (
                      <div key={i} style={{ marginBottom:10, padding:"10px 14px", borderRadius:6, background: quizState.answers[i]?.correct ? "#e8f5e9" : "#fdecea", borderLeft:`3px solid ${quizState.answers[i]?.correct ? "#27ae60" : "#e74c3c"}` }}>
                        <div style={{ fontSize:13, fontWeight:"bold", marginBottom:3 }}>Q{i+1}: {q.q}</div>
                        <div style={{ fontSize:13, color:"#555" }}>Your answer: <strong>{q.o[quizState.answers[i]?.selected]}</strong> {quizState.answers[i]?.correct ? "✓" : `✗ — Correct: ${q.o[q.a]}`}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ display:"flex", gap:10, justifyContent:"center", flexWrap:"wrap" }}>
                    <button onClick={startQuiz} style={{ background: sub.accent, color:"#fff", border:"none", borderRadius:6, padding:"11px 20px", cursor:"pointer", fontFamily:"inherit", fontSize:14, fontWeight:"bold" }}>Retry Quiz</button>
                    <button onClick={() => setTab("lesson")} style={{ background: sub.bg, color:"#fff", border:"none", borderRadius:6, padding:"11px 20px", cursor:"pointer", fontFamily:"inherit", fontSize:14 }}>Back to Lesson</button>
                  </div>
                </div>
              ) : (
                <>
                  <div style={{ display:"flex", justifyContent:"space-between", marginBottom:16, alignItems:"center" }}>
                    <span style={{ fontSize:12, color: sub.accent, fontWeight:"bold", textTransform:"uppercase", letterSpacing:1 }}>Question {quizState.idx+1} of {questions.length}</span>
                    <span style={{ fontSize:12, color:"#999" }}>Score: {quizState.score}</span>
                  </div>
                  <div style={{ height:5, background:"#eee", borderRadius:4, marginBottom:18 }}>
                    <div style={{ height:"100%", width:`${((quizState.idx)/questions.length)*100}%`, background: sub.accent, borderRadius:4, transition:"width 0.4s" }} />
                  </div>
                  <p style={{ fontSize:17, fontWeight:"bold", marginBottom:20, lineHeight:1.5, color: sub.bg }}>{questions[quizState.idx].q}</p>
                  {questions[quizState.idx].o.map((opt, idx) => {
                    let bg="#fff", border=`1px solid #ccc`;
                    if (quizState.selected !== null) {
                      if (idx === questions[quizState.idx].a) { bg="#e8f5e9"; border="2px solid #27ae60"; }
                      else if (idx === quizState.selected) { bg="#fdecea"; border="2px solid #e74c3c"; }
                    }
                    return (
                      <button key={idx} onClick={() => handleAnswer(idx)}
                        style={{ display:"block", width:"100%", background:bg, border, borderRadius:6, padding:"12px 16px", marginBottom:8, cursor: quizState.selected===null ? "pointer" : "default", textAlign:"left", fontFamily:"inherit", fontSize:14 }}>
                        <span style={{ fontWeight:"bold", color: sub.accent, marginRight:8 }}>{["A","B","C","D"][idx]}.</span>{opt}
                      </button>
                    );
                  })}
                </>
              )}
            </div>
          )}

          {/* WRITE TAB */}
          {tab === "write" && isWritingTopic && (
            <div style={{ background:"#fff", border:"1px solid #ddd", borderRadius:8, padding:24, boxShadow:"0 1px 4px rgba(0,0,0,0.06)" }}>
              <h3 style={{ margin:"0 0 4px", color: sub.bg }}>Writing Practice</h3>
              <p style={{ color:"#666", fontSize:13, margin:"0 0 16px" }}>Choose a prompt, write your response, and get personalised AI feedback from your tutor.</p>
              <div style={{ marginBottom:16 }}>
                <div style={{ fontSize:13, fontWeight:"bold", color:"#555", marginBottom:8 }}>Select a writing prompt:</div>
                {WRITING_PROMPTS[topic].map((p, i) => (
                  <button key={i} onClick={() => { setWritingPrompt(p); setWritingFeedback(""); }}
                    style={{ display:"block", width:"100%", textAlign:"left", background: writingPrompt===p ? sub.light : "#fafafa", border: writingPrompt===p ? `2px solid ${sub.accent}` : "1px solid #ddd", borderRadius:6, padding:"11px 14px", marginBottom:8, cursor:"pointer", fontFamily:"inherit", fontSize:13, lineHeight:1.5, color:"#333" }}>
                    {i+1}. {p}
                  </button>
                ))}
              </div>
              {writingPrompt && (
                <>
                  <div style={{ background: sub.light, borderLeft:`3px solid ${sub.accent}`, borderRadius:4, padding:"10px 14px", marginBottom:14, fontSize:13, color: sub.bg, fontStyle:"italic" }}>
                    Prompt: {writingPrompt}
                  </div>
                  <textarea
                    style={{ width:"100%", border:"1px solid #ccc", borderRadius:6, padding:"12px 14px", fontFamily:"inherit", fontSize:14, boxSizing:"border-box", minHeight:180, resize:"vertical", marginBottom:12, lineHeight:1.7 }}
                    placeholder="Write your response here… (minimum 20 words for feedback)"
                    value={writingText}
                    onChange={e => { setWritingText(e.target.value); setWritingFeedback(""); }}
                  />
                  <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:16, flexWrap:"wrap" }}>
                    <button onClick={getWritingFeedback}
                      disabled={feedbackLoading || writingText.trim().split(" ").length < 20}
                      style={{ background: (feedbackLoading || writingText.trim().split(" ").length < 20) ? "#ccc" : sub.accent, color:"#fff", border:"none", borderRadius:6, padding:"11px 22px", cursor: (feedbackLoading || writingText.trim().split(" ").length < 20) ? "default" : "pointer", fontFamily:"inherit", fontSize:14, fontWeight:"bold" }}>
                      {feedbackLoading ? "Marking…" : "Get AI Feedback ✓"}
                    </button>
                    <span style={{ fontSize:12, color:"#999" }}>{writingText.trim().split(" ").filter(Boolean).length} words</span>
                  </div>
                  {writingFeedback && (
                    <div style={{ background:"#f9f9f4", border:"1px solid #ddd", borderRadius:8, padding:18 }}>
                      <div style={{ fontSize:13, fontWeight:"bold", color: sub.bg, marginBottom:10, textTransform:"uppercase", letterSpacing:0.5 }}>📝 Tutor Feedback</div>
                      {writingFeedback.split("\n").filter(Boolean).map((line, i) => {
                        const isLabel = line.startsWith("STRENGTHS:") || line.startsWith("AREAS TO IMPROVE:") || line.startsWith("TEACHER'S TIP:");
                        return <p key={i} style={{ margin:"0 0 8px", fontSize:14, lineHeight:1.7, fontWeight: isLabel ? "bold" : "normal", color: isLabel ? sub.bg : "#333" }}>{line}</p>;
                      })}
                    </div>
                  )}
                </>
              )}
            </div>
          )}

          {/* TUTOR TAB */}
          {tab === "tutor" && (
            <div style={{ background:"#fff", border:"1px solid #ddd", borderRadius:8, padding:24, boxShadow:"0 1px 4px rgba(0,0,0,0.06)" }}>
              <h3 style={{ margin:"0 0 4px", color: sub.bg }}>Ask Your Tutor</h3>
              <p style={{ color:"#666", fontSize:13, margin:"0 0 14px" }}>Ask any question about {topic}. Your AI tutor will explain clearly and patiently.</p>
              <div style={{ maxHeight:340, overflowY:"auto", marginBottom:14, display:"flex", flexDirection:"column", gap:10 }}>
                {chatHistory.length === 0 && (
                  <div style={{ textAlign:"center", color:"#bbb", fontSize:13, padding:"20px 0" }}>Your conversation will appear here.<br/>Ask your first question below!</div>
                )}
                {chatHistory.map((msg, i) => (
                  <div key={i} style={{ padding:"10px 14px", borderRadius:6, background: msg.role==="user" ? sub.light : "#f9f9f4", borderLeft:`3px solid ${msg.role==="user" ? sub.accent : "#bbb"}`, alignSelf: msg.role==="user" ? "flex-end" : "flex-start", maxWidth:"92%" }}>
                    <div style={{ fontSize:11, fontWeight:"bold", color:"#999", marginBottom:4, textTransform:"uppercase" }}>{msg.role==="user" ? studentName : "Tutor"}</div>
                    <p style={{ margin:0, fontSize:14, lineHeight:1.7, whiteSpace:"pre-wrap", color:"#333" }}>{msg.content}</p>
                  </div>
                ))}
                {aiLoading && (
                  <div style={{ padding:"10px 14px", borderRadius:6, background:"#f9f9f4", borderLeft:"3px solid #bbb", alignSelf:"flex-start" }}>
                    <div style={{ fontSize:11, fontWeight:"bold", color:"#999", marginBottom:4, textTransform:"uppercase" }}>Tutor</div>
                    <p style={{ margin:0, fontSize:14, color:"#bbb" }}>Thinking…</p>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>
              <textarea
                style={{ width:"100%", border:"1px solid #ccc", borderRadius:6, padding:"10px 14px", fontFamily:"inherit", fontSize:14, boxSizing:"border-box", minHeight:70, resize:"vertical", marginBottom:10 }}
                placeholder={`e.g. "Can you explain ${topic} with an example?"`}
                value={aiInput}
                onChange={e => setAiInput(e.target.value)}
                onKeyDown={e => { if (e.key==="Enter" && !e.shiftKey) { e.preventDefault(); askTutor(); }}}
              />
              <button onClick={askTutor} disabled={aiLoading || !aiInput.trim()}
                style={{ background: (!aiLoading && aiInput.trim()) ? sub.accent : "#ccc", color:"#fff", border:"none", borderRadius:6, padding:"11px 24px", cursor: (!aiLoading && aiInput.trim()) ? "pointer" : "default", fontFamily:"inherit", fontSize:14, fontWeight:"bold" }}>
                {aiLoading ? "Asking…" : "Send →"}
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return null;
}
