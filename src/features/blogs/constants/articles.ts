import type { BlogArticleDetail, BlogReference } from "../types";

// Mock article bodies. Reference links point to real public pages; the article text is placeholder copy.
const AUTHOR = "Anonymous Research Team";

const ref = (title: string, source: string, url: string): BlogReference => ({ title, source, url });

const MITRE = "MITRE ATT&CK";
const WIKI = "Wikipedia";
const NIST = "NIST";

export const articleDetails: BlogArticleDetail[] = [
  {
    slug: "end-of-an-era",
    author: AUTHOR,
    date: "2026-09-29",
    intro: [
      "For decades, antivirus worked like a bouncer with a photo album. If a file matched a known signature, it was stopped. If it did not, it walked in. That model assumed the album could keep up with the attackers [1].",
    ],
    sections: [
      {
        heading: "Why signatures fall behind",
        paragraphs: [
          "A signature describes a file that already exists. Attackers can change a few bytes, repack the payload or encrypt it differently, and the fingerprint no longer matches [2]. Every variant looks new, so the album is always one step behind.",
          "The result is a gap between when a threat appears and when a vendor ships a signature for it. During that gap, defenders are blind to exactly the files that matter most.",
        ],
      },
      {
        heading: "What replaces the album",
        paragraphs: [
          "Instead of asking whether a file has been seen before, newer engines ask what the file is built to do. Structure, code patterns and behavior carry meaning even when the hash is brand new.",
          "That shift is the idea behind Anonymous: judge a file by what it is, not by who has met it before.",
        ],
      },
    ],
    references: [
      ref("Antivirus software", WIKI, "https://en.wikipedia.org/wiki/Antivirus_software"),
      ref("Obfuscated Files or Information (T1027)", MITRE, "https://attack.mitre.org/techniques/T1027/"),
    ],
  },
  {
    slug: "defending-our-ai-defenders",
    author: AUTHOR,
    date: "2026-09-24",
    intro: [
      "Artificial intelligence gives defenders speed they have never had. It also gives attackers a new target: the model itself. A detection engine that can be tricked is a liability, however accurate it looks in a demo [1].",
    ],
    sections: [
      {
        heading: "New ways to attack a detector",
        paragraphs: [
          "Adversaries can craft inputs that a model misreads, poison the data it learns from, or probe it until they learn its blind spots [2]. None of this requires breaking the software around the model.",
        ],
      },
      {
        heading: "Defending the defender",
        paragraphs: [
          "Treat the model like any other critical system. Track what it was trained on, test it against deliberately hostile samples, monitor its decisions in production and keep a human in the loop for the calls that matter.",
          "Risk frameworks give teams a shared vocabulary for this work, so security and machine learning groups can plan it together [1].",
        ],
      },
    ],
    references: [
      ref("AI Risk Management Framework", NIST, "https://www.nist.gov/itl/ai-risk-management-framework"),
      ref(
        "OWASP Top 10 for Large Language Model Applications",
        "OWASP",
        "https://owasp.org/www-project-top-10-for-large-language-model-applications/"
      ),
    ],
  },
  {
    slug: "linguistics-of-malice",
    author: AUTHOR,
    date: "2026-09-18",
    intro: [
      "What if software could understand malicious intent the way a language model understands a sentence? Code is a language too, with grammar, vocabulary and context [1].",
    ],
    sections: [
      {
        heading: "Code as text",
        paragraphs: [
          "Disassembled programs are long sequences of instructions [2]. Like words in a paragraph, a single instruction means little alone. The meaning comes from what surrounds it and the order it appears in.",
        ],
      },
      {
        heading: "What a model can learn",
        paragraphs: [
          "Trained on large collections of benign and malicious programs, a language model can pick up the phrases that tend to appear in harmful code, such as unusual call sequences or routines that hide strings.",
          "It does not need an exact match. A new sample that reads like known malware is still suspicious, which is what makes the approach useful against threats nobody has catalogued yet.",
        ],
      },
    ],
    references: [
      ref("Large language model", WIKI, "https://en.wikipedia.org/wiki/Large_language_model"),
      ref("Disassembler", WIKI, "https://en.wikipedia.org/wiki/Disassembler"),
    ],
  },
  {
    slug: "beyond-the-sandbox",
    author: AUTHOR,
    date: "2026-09-12",
    intro: [
      "A sandbox runs a suspicious file in a controlled space and watches what it does. It was a big step forward, and attackers noticed it too [1].",
    ],
    sections: [
      {
        heading: "Malware that knows it is watched",
        paragraphs: [
          "Many samples check whether they are running in a virtual machine and stay quiet if they are. Others wait for hours before acting [2]. A sandbox that sees nothing wrong may simply have been outwaited.",
        ],
      },
      {
        heading: "Analysis that does not need cooperation",
        paragraphs: [
          "Static methods read a file without running it, so there is nothing for the malware to detect and no delay to sit through. They do not replace the sandbox, but they cover the cases where behavior is deliberately hidden.",
          "Combining both gives the best coverage: a fast static verdict first, and deeper dynamic work only where it is worth the time.",
        ],
      },
    ],
    references: [
      ref("Sandbox (computer security)", WIKI, "https://en.wikipedia.org/wiki/Sandbox_(computer_security)"),
      ref("Virtualization/Sandbox Evasion (T1497)", MITRE, "https://attack.mitre.org/techniques/T1497/"),
    ],
  },
  {
    slug: "unmasking-obfuscated-malware",
    author: AUTHOR,
    date: "2026-09-05",
    intro: [
      "Attackers rarely ship their payload in the open. They wrap it, compress it and scramble it so that what you see on disk is not what eventually runs [1].",
    ],
    sections: [
      {
        heading: "How packers hide code",
        paragraphs: [
          "A packer compresses or encrypts the real program and attaches a small stub that restores it in memory [2]. The file on disk is mostly noise, which is why simple string searches find nothing.",
        ],
      },
      {
        heading: "Seeing through it statically",
        paragraphs: [
          "Packed data has a telltale statistical shape. High entropy, unusual section layouts and tiny import tables all hint that something is hidden. Unpacking known formats lets analysis continue on the real payload without executing anything.",
        ],
      },
    ],
    references: [
      ref("Software Packing (T1027.002)", MITRE, "https://attack.mitre.org/techniques/T1027/002/"),
      ref("Executable compression", WIKI, "https://en.wikipedia.org/wiki/Executable_compression"),
    ],
  },
  {
    slug: "bytes-to-pixels",
    author: AUTHOR,
    date: "2026-08-28",
    intro: [
      "Turning a program into a picture sounds like a party trick until you see the results. Raw bytes, drawn as pixels, form textures that differ from family to family [1].",
    ],
    sections: [
      {
        heading: "Reading the texture",
        paragraphs: [
          "Code sections look different from data sections, and encrypted regions look like static. Related samples tend to share layout, so their images look alike even when their hashes do not.",
        ],
      },
      {
        heading: "Why image models fit",
        paragraphs: [
          "Convolutional networks are built to pick out local patterns in images [2]. Applied to byte-images, they learn the visual signatures of families without anyone writing rules for them. Entropy, the measure of randomness in the data, is one of the cues they pick up on [2].",
        ],
      },
    ],
    references: [
      ref("Convolutional neural network", WIKI, "https://en.wikipedia.org/wiki/Convolutional_neural_network"),
      ref("Entropy (information theory)", WIKI, "https://en.wikipedia.org/wiki/Entropy_(information_theory)"),
    ],
  },
  {
    slug: "reading-attack-like-a-map",
    author: AUTHOR,
    date: "2026-08-20",
    intro: [
      "The MITRE ATT&CK framework is often treated as a checklist. It works better as a map of how attackers move, from first access to final impact [1].",
    ],
    sections: [
      {
        heading: "Tactics are the route, techniques are the roads",
        paragraphs: [
          "Tactics describe why an attacker does something, such as persistence or defense evasion. Techniques describe how [2]. Reading a sample's techniques in tactic order shows the likely path it takes through a network.",
        ],
      },
      {
        heading: "Using the map during triage",
        paragraphs: [
          "Ask where on the map a sample sits, what it must have done before, and what it can do next. The answers point to what to check on affected machines and which detections to turn on.",
        ],
      },
    ],
    references: [
      ref("MITRE ATT&CK", MITRE, "https://attack.mitre.org/"),
      ref("Enterprise tactics", MITRE, "https://attack.mitre.org/tactics/enterprise/"),
    ],
  },
  {
    slug: "ransomware-families",
    author: AUTHOR,
    date: "2026-08-12",
    intro: [
      "Not all ransomware behaves alike. How a family encrypts files, spreads and contacts its operators shapes what responders should do in the first hour [1].",
    ],
    sections: [
      {
        heading: "Fingerprints in the code",
        paragraphs: [
          "Families reuse components: encryption routines, file extension lists, ransom note templates and shutdown commands for backup services. Those habits show up in code structure long before an incident [2].",
        ],
      },
      {
        heading: "Why the family changes the response",
        paragraphs: [
          "Some families steal data before encrypting, which turns an outage into a breach. Others spread through a network in minutes. Knowing which one you face decides whether to isolate machines first or start notification planning.",
        ],
      },
    ],
    references: [
      ref("Stop Ransomware", "CISA", "https://www.cisa.gov/stopransomware"),
      ref("Data Encrypted for Impact (T1486)", MITRE, "https://attack.mitre.org/techniques/T1486/"),
    ],
  },
  {
    slug: "zero-days-without-panic",
    author: AUTHOR,
    date: "2026-08-03",
    intro: [
      "A zero-day is a threat nobody has seen before, which means nobody has a signature for it [1]. That does not mean you are helpless.",
    ],
    sections: [
      {
        heading: "Judging what you have never seen",
        paragraphs: [
          "Heuristic methods look at traits instead of identities [2]. Does the file hide its imports, encrypt its own sections, or build commands at runtime? Each trait is weak alone and informative together.",
        ],
      },
      {
        heading: "Where learned models help",
        paragraphs: [
          "A trained model combines hundreds of such traits at once and gives a probability instead of a yes or no. That score lets a team decide how fast to react to a file that has no history.",
        ],
      },
    ],
    references: [
      ref("Zero-day vulnerability", WIKI, "https://en.wikipedia.org/wiki/Zero-day_vulnerability"),
      ref("Heuristic analysis", WIKI, "https://en.wikipedia.org/wiki/Heuristic_analysis"),
    ],
  },
  {
    slug: "static-vs-dynamic-analysis",
    author: AUTHOR,
    date: "2026-07-25",
    intro: [
      "Static analysis reads a program without running it. Dynamic analysis runs it and watches. Teams often argue about which is better, when the real question is which one to use first [1].",
    ],
    sections: [
      {
        heading: "What static analysis is good at",
        paragraphs: [
          "It is fast, safe and easy to run at scale. Nothing executes, so a dangerous file cannot do harm while you inspect it. It struggles when code is heavily packed or only reveals itself at runtime.",
        ],
      },
      {
        heading: "What dynamic analysis adds",
        paragraphs: [
          "Running a sample shows network calls, file changes and process activity that static reading can only guess at [2]. It costs more time and carries more risk, so it works best on files that static triage has already marked as interesting.",
        ],
      },
    ],
    references: [
      ref("Static program analysis", WIKI, "https://en.wikipedia.org/wiki/Static_program_analysis"),
      ref("Dynamic program analysis", WIKI, "https://en.wikipedia.org/wiki/Dynamic_program_analysis"),
    ],
  },
  {
    slug: "reading-detection-metrics",
    author: AUTHOR,
    date: "2026-07-16",
    intro: [
      "A headline accuracy number is easy to quote and hard to interpret. Two engines with the same score can behave very differently on the files you care about [1].",
    ],
    sections: [
      {
        heading: "Precision and recall",
        paragraphs: [
          "Precision asks how many flagged files were truly malicious. Recall asks how many malicious files were flagged. An engine can score well on one while failing the other [1].",
        ],
      },
      {
        heading: "Read the confusion matrix",
        paragraphs: [
          "A confusion matrix lays out true and false positives and negatives side by side [2]. It shows what kind of mistakes an engine makes, and that matters more than a single percentage when a false alarm and a missed threat have very different costs.",
        ],
      },
    ],
    references: [
      ref("Precision and recall", WIKI, "https://en.wikipedia.org/wiki/Precision_and_recall"),
      ref("Confusion matrix", WIKI, "https://en.wikipedia.org/wiki/Confusion_matrix"),
    ],
  },
  {
    slug: "spyware-in-plain-sight",
    author: AUTHOR,
    date: "2026-07-08",
    intro: [
      "Ransomware announces itself. Spyware does the opposite. It is built to be forgotten, and the best examples stay on a machine for months [1].",
    ],
    sections: [
      {
        heading: "Small signals add up",
        paragraphs: [
          "Look for steady, low-volume traffic to unfamiliar hosts, new autostart entries, background processes with generic names and surprising permissions. None is proof alone, but a cluster of them deserves a closer look.",
        ],
      },
      {
        heading: "Catching it earlier",
        paragraphs: [
          "Scanning files at the point they arrive is far cheaper than hunting for a quiet intruder later [2]. Classification helps too: knowing a sample belongs to a spyware family tells you to check for stolen credentials, not just infected files.",
        ],
      },
    ],
    references: [
      ref("Spyware", WIKI, "https://en.wikipedia.org/wiki/Spyware"),
      ref("Cyber threats and advisories", "CISA", "https://www.cisa.gov/topics/cyber-threats-and-advisories"),
    ],
  },
  {
    slug: "triage-playbook-by-family",
    author: AUTHOR,
    date: "2026-06-30",
    intro: [
      "Once you know the malware family, you know what to check first. A playbook turns that knowledge into steps people can follow under pressure [1].",
    ],
    sections: [
      {
        heading: "One page per family",
        paragraphs: [
          "Keep each entry short: what the family usually does, the first three things to verify, the systems to isolate and who to notify. A responder at 3 a.m. should not have to read an essay.",
        ],
      },
      {
        heading: "Link it to the tools",
        paragraphs: [
          "Connect each playbook page to the classification result that triggers it, and to the known behavior of that family [2]. When a scan reports a family, the matching page should be one click away.",
        ],
      },
    ],
    references: [
      ref(
        "Computer Security Incident Handling Guide (SP 800-61 Rev. 2)",
        NIST,
        "https://csrc.nist.gov/pubs/sp/800/61/r2/final"
      ),
      ref("Software", MITRE, "https://attack.mitre.org/software/"),
    ],
  },
  {
    slug: "explainable-verdicts",
    author: AUTHOR,
    date: "2026-06-22",
    intro: [
      "An analyst will not act on a score they cannot explain. A verdict that arrives with its evidence gets trusted, challenged and improved. One that arrives alone gets ignored [1].",
    ],
    sections: [
      {
        heading: "What an explanation should contain",
        paragraphs: [
          "Show which traits pushed the score up, which pulled it down and how confident the model is. Keep it in terms an analyst already uses: imports, sections, strings and techniques, not internal model weights.",
        ],
      },
      {
        heading: "Explanations make the model better",
        paragraphs: [
          "When people can see why a file was flagged, they spot wrong reasons as well as wrong answers [2]. Those corrections feed back into training, and the engine improves faster than it would on labels alone.",
        ],
      },
    ],
    references: [
      ref(
        "Explainable artificial intelligence",
        WIKI,
        "https://en.wikipedia.org/wiki/Explainable_artificial_intelligence"
      ),
      ref("AI Risk Management Framework", NIST, "https://www.nist.gov/itl/ai-risk-management-framework"),
    ],
  },
  {
    slug: "malware-language-models",
    author: AUTHOR,
    date: "2026-06-14",
    intro: [
      "Language models are good at context. Applied to disassembled code, they start to recognize malicious intent the way they recognize meaning in text [1].",
    ],
    sections: [
      {
        heading: "Teaching a model assembly",
        paragraphs: [
          "Assembly is verbose and low level, but it is still a language with patterns [2]. Models learn which sequences tend to appear together, such as the setup for process injection or the loop that walks a directory tree.",
        ],
      },
      {
        heading: "Limits worth knowing",
        paragraphs: [
          "Long programs exceed what a model can read at once, so analysis works on windows and combines the results. Obfuscated code can also look like nonsense, which is why unpacking comes before reading.",
        ],
      },
    ],
    references: [
      ref("Large language model", WIKI, "https://en.wikipedia.org/wiki/Large_language_model"),
      ref("Assembly language", WIKI, "https://en.wikipedia.org/wiki/Assembly_language"),
    ],
  },
  {
    slug: "sharing-threat-intelligence",
    author: AUTHOR,
    date: "2026-06-05",
    intro: [
      "Good reports travel further than samples do. You can give partners everything they need to defend themselves without ever handing them the malware [1].",
    ],
    sections: [
      {
        heading: "Share findings, not files",
        paragraphs: [
          "Describe behavior, techniques and indicators such as domains and file hashes. That is enough for another team to write detections, and nobody has to handle a live sample.",
        ],
      },
      {
        heading: "Use shared formats and labels",
        paragraphs: [
          "Structured formats let tools exchange indicators automatically [2]. Simple sensitivity labels tell recipients how widely a report may be passed on, which makes people more willing to share in the first place.",
        ],
      },
    ],
    references: [
      ref("Traffic Light Protocol (TLP)", "FIRST", "https://www.first.org/tlp/"),
      ref("STIX and TAXII documentation", "OASIS Open", "https://oasis-open.github.io/cti-documentation/"),
    ],
  },
];
