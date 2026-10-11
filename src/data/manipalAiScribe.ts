export const manipalAiScribe = {
  title: "Manipal AI Scribe",
  org: "Manipal Hospitals",
  document: "Product Requirements Document",
  version: "V1",
  summary:
    "Ambient consultation capture, clinical understanding, a structured prescription, and consultant review — inside the Manipal OPD workflow.",
  positioning:
    "You stay with the patient. Manipal prepares the prescription.",
  vision:
    "Manipal AI Scribe takes the keyboard out of the consultation. The consultant speaks with the patient and attendant in the room. Manipal captures the conversation, turns it into a transcript, extracts only what is clinically relevant, and maps it into the OPD prescription already open in the hospital EMR. Nothing becomes part of the record until the consultant reviews and signs it. This is the documentation layer of the OPD consult, not a separate transcription product.",
  problems: [
    "In a high-volume OPD, documentation pulls the consultant’s eyes to the workstation while the patient is still in the chair.",
    "Listening, deciding, and typing at the same time drops details that matter: duration, negation, old medicines, and what was actually advised.",
    "The OPD prescription is spread across complaints, history, examination, diagnosis, medicines, investigations, advice, and follow-up. Each block is another set of clicks between patients.",
    "A Manipal consult is often multilingual and code-mixed. Kannada, Hindi, English, and other unit languages sit in the same conversation, with English medical terms inside the sentence.",
    "Speech-to-text alone still leaves the consultant to convert free text into structured fields the EMR, pharmacy, laboratory, and appointment desk can use.",
    "An attendant frequently speaks for the patient. A note that cannot tell those voices apart will file the wrong fact.",
  ],
  goals: [
    "Capture the consultation with almost no demand on the screen.",
    "Support a live doctor–patient conversation and consultant-only dictation.",
    "Map speech into the OPD prescription sections the EMR already uses.",
    "Handle multilingual and code-mixed Indian clinical speech, and write the structured note in the unit’s configured language.",
    "Keep a source span, a review state, and a one-click correction on every extracted item.",
    "Leave nurse-entered vitals, existing orders, and the signed record untouched unless the consultant explicitly accepts a change.",
  ],
  nonGoals: [
    "Diagnose or prescribe without the consultant’s confirmation.",
    "Replace the consultant as the clinical decision-maker.",
    "Silently guess an unclear medicine, dose, frequency, strength, or route.",
    "Treat the raw transcript as the legal clinical record.",
    "Open a second notes product beside the OPD prescription.",
    "Link ABHA, submit insurance claims, or generate discharge summaries in this version.",
  ],
  users: [
    {
      user: "Consultant, OPD",
      need: "Finish the prescription without leaving the conversation, then sign a note they have actually checked.",
    },
    {
      user: "Resident or trainee",
      need: "Prepare a structured draft the consultant can correct and sign. A trainee draft is not a final record.",
    },
    {
      user: "Specialist",
      need: "Specialty language for complaints, examination, and orders, without a generic medicine template forced onto every department.",
    },
    {
      user: "OPD nurse",
      need: "Vitals captured at triage stay the source reading unless the consultant dictates a new one and accepts it.",
    },
    {
      user: "Unit admin and medical records",
      need: "Permissions, retention, audit, and a clear line between draft audio and the signed prescription.",
    },
    {
      user: "Patient and attendant",
      need: "A consultation in which the consultant is present, and an obvious signal whenever the room is being recorded.",
    },
  ],
  modes: [
    {
      mode: "Ambient AI Scribe",
      entry: "AI Scribe on the open OPD consultation",
      experience:
        "Consultant, patient, and attendant talk. Capture runs until pause or stop. Live transcript stays optional.",
      output: "Structured draft across the OPD prescription, plus the transcript.",
    },
    {
      mode: "Full prescription dictation",
      entry: "Dictate Rx on the consultation",
      experience:
        "The consultant dictates the clinical note and prescription after or during the visit.",
      output: "Structured prescription draft for review.",
    },
    {
      mode: "Section dictation",
      entry: "Microphone on one prescription section",
      experience:
        "The consultant dictates only complaints, examination, a medicine, advice, or another single section.",
      output: "Draft written only into that section.",
    },
  ],
  ambientFlow: [
    "Open the OPD consultation",
    "Start AI Scribe after consent is confirmed",
    "Listening, with pause and resume",
    "Stop",
    "Processing",
    "Structured review grouped like the prescription",
    "Edit or accept each item",
    "Add to the prescription",
    "Consultant signs",
  ],
  dictationFlow: [
    "Tap the section microphone or Dictate Rx",
    "Dictate",
    "Stop",
    "Preview the transcript and extracted fields",
    "Edit where needed",
    "Add to the selected section or to the prescription",
  ],
  mapping: [
    {
      section: "Chief complaints",
      extracts: "Symptom, duration, and severity or context only when spoken.",
      example: "“Fever for three days” → Fever · 3 days",
    },
    {
      section: "Vitals",
      extracts:
        "BP, pulse, temperature, SpO2, respiratory rate, height, weight, and unit-configured vitals. A new value never overwrites triage vitals until accepted.",
      example: "“BP is 150 over 90” → 150/90 mmHg",
    },
    {
      section: "History",
      extracts:
        "Past conditions, allergies, family and lifestyle history, prior procedures, and medicines the patient is already taking.",
      example: "“Diabetic for eight years” → Diabetes · 8 years",
    },
    {
      section: "Examination",
      extracts: "System findings and free-text findings, including normal examinations.",
      example: "“Chest clear, bilateral air entry equal” → Respiratory exam",
    },
    {
      section: "Diagnosis",
      extracts:
        "Diagnosis, suspected or confirmed, and terminology mapping when the term is explicit.",
      example: "“Looks like viral upper respiratory infection” → Viral URTI · Suspected",
    },
    {
      section: "Investigations",
      extracts:
        "Labs, imaging, and procedures ordered, matched to the hospital order catalogue.",
      example: "“Do CBC and CRP” → CBC, CRP",
    },
    {
      section: "Medicines",
      extracts:
        "Name, strength, form, dose, frequency, duration, route, timing, and instructions, resolved against the hospital formulary.",
      example:
        "“Augmentin 625, one tablet morning and night after food for five days” → formulary match, or unresolved if the strength is not stocked",
    },
    {
      section: "Advice",
      extracts: "Clinical advice and precautions in the configured note language.",
      example: "“Drink plenty of fluids” → Adequate hydration",
    },
    {
      section: "Follow-up",
      extracts:
        "Interval or date, and the instruction. Accepted follow-up can raise an appointment request for the OPD desk.",
      example: "“Come back after three days” → Follow-up · 3 days",
    },
    {
      section: "Clinical notes",
      extracts:
        "SOAP or free text when the unit template asks for a narrative the structured fields do not hold.",
      example: "The spoken assessment stays attached to the consult, separate from orders.",
    },
  ],
  interpretation: [
    "Separate the current complaint, past history, family history, a negative finding, an examination finding, the diagnosis, and the treatment plan.",
    "Negation stays negation. “No chest pain” never becomes a chief complaint.",
    "A medicine the patient already takes is history. It becomes an order only when the consultant continues, changes, or newly prescribes it.",
    "A medicine the patient or attendant asks for is not an order until the consultant confirms it.",
    "If the consultant sounds uncertain, the diagnosis stays suspected or provisional.",
    "Do not fill in a duration, dose, frequency, route, timing, strength, diagnosis, or investigation that nobody stated.",
    "Every structured item keeps the source words and a timestamp, so the consultant can see why it was added.",
    "The signed prescription is created only after consultant review. A resident draft cannot sign itself.",
  ],
  medication: {
    intro:
      "Medication extraction is safety-critical. It is not a single free-form model answer. Speech recognition, a medical vocabulary, the Manipal formulary, phonetic matching, strength and form checks, and structured extraction all have to agree before a medicine can look routine.",
    rows: [
      {
        field: "Medicine identity",
        rule: "Resolve the spoken brand or generic against the hospital formulary. If more than one drug fits, show the candidates. Prefer the formulary generic when unit policy says so.",
      },
      {
        field: "Strength",
        rule: "Use a strength the formulary actually stocks, or leave the field unresolved.",
      },
      {
        field: "Form",
        rule: "Tablet, capsule, syrup, drops, inhaler, injection, and the other configured forms. Do not infer a form when the choice changes the order.",
      },
      {
        field: "Dose",
        rule: "Support half, one, one and a half, ml, drops, puffs, units, and spoon measures in the formats the EMR already accepts.",
      },
      {
        field: "Frequency",
        rule: "Normalise once daily, morning and night, 1-0-1, BD, and TID only after the phrase is reliable.",
      },
      {
        field: "Duration",
        rule: "Capture number and unit. Leave it unresolved when it was not said.",
      },
      {
        field: "Timing and route",
        rule: "Capture only what was spoken, or what the consultant later selects.",
      },
      {
        field: "Restricted medicines",
        rule: "Antimicrobials and other formulary-restricted items stay in review even when the name is clear, until the consultant confirms the order.",
      },
      {
        field: "Uncertainty",
        rule: "An ambiguous medicine, dose, or frequency is flagged. It cannot be accepted in bulk.",
      },
    ],
  },
  architecture: {
    pipeline:
      "Audio, then speech-to-text, then speaker and language, then a normalised transcript, then clinical extraction, then formulary and terminology resolution, then validation rules, then review states, then a structured draft, then consultant review, then the EMR prescription.",
    rules: [
      "Keep raw audio, the transcript, and the structured interpretation separate.",
      "Use a versioned extraction schema so a model change cannot break the prescription contract.",
      "After extraction, deterministic checks own units, formulary strength, duration, and field types.",
      "Specialty, unit language, and the consultant’s saved favourites may rank likely options. They may not invent a fact that was not said.",
      "A failed or repeated run must not create a second prescription. Reprocessing replaces the unsigned draft.",
      "Audio processing stays inside the vendors and regions Manipal has approved for health data.",
    ],
  },
  contract:
    "Each extracted item carries section, normalised value, display value, attributes, source text, speaker, start and end timestamps, review state, a terminology code when one exists, and the extraction version.",
  statuses: [
    {
      status: "Ready",
      meaning: "Valid and consistent, still waiting for the consultant.",
      ux: "Ordinary card with a check.",
    },
    {
      status: "Review",
      meaning: "Plausible, and the consultant should look.",
      ux: "Amber highlight and an inline edit.",
    },
    {
      status: "Unresolved",
      meaning: "Ambiguous or unsafe to file.",
      ux: "Red warning. A selection or edit is required.",
    },
    {
      status: "Removed",
      meaning: "The consultant took the suggestion off the draft.",
      ux: "Not added. The audit record can keep the removal.",
    },
  ],
  ux: [
    "While listening, the screen stays quiet: a small bar with a timer, a waveform, Pause, and Stop.",
    "The live transcript is optional. The consultation does not require the consultant to read it.",
    "After Stop, review opens in the same section order as the OPD prescription.",
    "Accept-all applies only to ready items. Unresolved medicines and other critical fields stay blocked until handled.",
    "Any item can be edited inline.",
    "On the consult-room workstation, review sits beside the prescription. On a phone, it opens as a full-screen sheet.",
    "The section microphone sits on that section’s heading. It does not add a new screen.",
    "States are explicit: Listening, Paused, Processing audio, Structuring the prescription, Ready to review, Failed.",
    "Selecting an item shows the transcript line and the timestamp it came from.",
    "The consultant never has to read a confidence percentage. Ready, review, and unresolved are the interface.",
  ],
  privacy: [
    "Recording starts only after the unit’s consent step is complete for that visit.",
    "An obvious listening indicator is visible in the room whenever capture is on.",
    "Access to audio, transcript, draft, and the signed prescription is role-based. Medical records sees the signed note. Audio access is narrower.",
    "Data is encrypted in transit and at rest under Manipal’s security standard.",
    "Retention and deletion for source audio and transcript are set before any unit goes live. The signed prescription follows the medical record policy, which is a different clock.",
    "The audit trail covers AI-created fields, edits, acceptance, removal, signature, and reprocessing, including whether a resident or the consultant acted.",
    "Every external speech or language processor needs a data-flow review before it is switched on.",
    "Legal and compliance own the final consent language under the DPDP Act and Manipal’s health-data obligations, including what the attendant is told.",
  ],
  edges: [
    {
      scenario: "Noisy OPD or weak audio",
      behaviour: "Warn that capture quality is poor. Leave uncertain fields unresolved.",
    },
    {
      scenario: "People speak over each other",
      behaviour:
        "Keep the transcript. Do not force a speaker label that is unsafe. Flag the clinical items that depend on it.",
    },
    {
      scenario: "The attendant answers for the patient",
      behaviour:
        "Attribute the turn when the voice can be separated. History from an attendant still needs the same clinical rules, and it is not an order.",
    },
    {
      scenario: "Language changes mid-consult",
      behaviour:
        "Keep capturing. Preserve the meaning. Write structured fields in the unit’s configured prescription language.",
    },
    {
      scenario: "A medicine sounds like another brand",
      behaviour: "Show the candidate list. Never auto-pick a weak match.",
    },
    {
      scenario: "The consultant corrects an earlier statement",
      behaviour: "Use the latest explicit correction, and keep both spans available in the trace.",
    },
    {
      scenario: "An old report or home medicine is mentioned",
      behaviour: "File it as history unless the consultant orders or continues it.",
    },
    {
      scenario: "A call or the audio drops",
      behaviour: "Keep the completed audio. Allow resume. Do not extract the same span twice.",
    },
    {
      scenario: "Processing fails",
      behaviour:
        "The prescription stays as it was. The consultant can retry or keep documenting by hand.",
    },
    {
      scenario: "Consent is missing",
      behaviour:
        "Ambient recording stays off. Section dictation is available only if unit policy allows it without room recording.",
    },
  ],
  phases: [
    {
      phase: "MVP 1 — Dictation",
      scope:
        "Section dictation and full prescription dictation on the OPD workstation and the consultant’s phone. Complaints, diagnosis, examination, medicines, investigations, advice, and follow-up. Nothing is filed before review.",
    },
    {
      phase: "MVP 2 — Ambient scribe",
      scope:
        "In-room recording, multilingual and code-mixed speech, speaker-aware transcript, structured review, and source trace. First unit is a single high-volume OPD, then a second specialty before a wider rollout.",
    },
    {
      phase: "MVP 3 — Clinical strength",
      scope:
        "Terminology mapping, tighter formulary resolution, negation and history logic, specialty templates, and stricter validation. Restricted medicines always stop for confirmation.",
    },
    {
      phase: "MVP 4 — Personalisation",
      scope:
        "Consultant favourites, vocabulary, specialty context, and a preferred prescription style. Usage analytics for the unit. Still no autonomous clinical decision.",
    },
  ],
  metrics: [
    {
      metric: "Weekly consultant adoption",
      why: "Share of eligible OPD consultants who use it in a week.",
    },
    {
      metric: "Consults documented with AI",
      why: "Whether it is actually in the OPD path, not only installed.",
    },
    {
      metric: "Time to signed prescription",
      why: "Documentation time between the end of the conversation and signature.",
    },
    {
      metric: "Item acceptance rate",
      why: "Whether extraction matches what the consultant is willing to sign.",
    },
    {
      metric: "Edit rate by section",
      why: "Shows weak sections, especially medicines, diagnosis, and examination.",
    },
    {
      metric: "Unresolved medicine rate",
      why: "Quality of formulary matching, and a safety signal.",
    },
    {
      metric: "Time from Stop to review",
      why: "Waiting after the consultation ends.",
    },
    {
      metric: "Abandonment and failure rate",
      why: "Reliability during a live OPD session.",
    },
    {
      metric: "Manual entry reduction",
      why: "How much of the prescription was accepted from the draft instead of typed.",
    },
    {
      metric: "Consultant satisfaction",
      why: "Trust. A fast draft that consultants refuse is not a success.",
    },
  ],
  acceptance: [
    "A consultant can dictate into any supported prescription section on the workstation and on mobile.",
    "A consultant can dictate a full prescription and receive separate sections for review.",
    "No AI output is written to the signed record until the consultant approves it.",
    "Medicine fields are editable on their own. Unresolved critical fields are visibly blocked.",
    "In the defined test cases, negative statements and historical medicines are not filed as an active complaint or a new order.",
    "Nurse-entered vitals remain in place unless the consultant accepts a dictated replacement.",
    "Each extracted item can be opened back to its source words.",
    "A failure leaves the current prescription unchanged and manual documentation still works.",
    "AI-created, edited, accepted, and removed items are audit logged with the actor’s role.",
    "Telemetry records latency, acceptance, edits, unresolved fields, and failures.",
  ],
};
