export const en = {
  language: {
    flag: "🇺🇸",
    name: "English",
    id: "Indonesian",
  },
  errors: {
    needMoreParticipants: "Need at least 2 participants!",
    invalidPairs: "Couldn't generate valid pairs with the current rules. Please check the rules and try again.",
    multipleMustRules: "Multiple MUST rules found",
    conflictingRules: "Conflicting use of a MUST and MUST NOT rule",
    emptyName: "Empty name",
    duplicateName: "Duplicate name: {{name}}",
    invalidRuleFormat: "Invalid rule format: {{rule}}",
    unknownParticipant: "Unknown participant in rule: {{name}}",
    noValidReceivers: "No valid receivers left for this participant",
    line: "Line {{number}}"
  },
  home: {
    vanity: 'Credits: <a href="https://github.com/arcanis/secretsanta" target="_blank" class="underline hover:text-gray-600">Github</a>',
    vanityUrl: "https://github.com/arcanis/secretsanta",
    sponsor: "Support me on GitHub",
    title: "Secret Santa Planner",
    explanation: [
      "Welcome! This tool will help you arrange your holiday gift exchanges easily.",
      "Add participants manually or upload a CSV with all participant details (Name, Address, Phone, Gift Hint, Notes).",
      "Set pairing rules for participants (force a pairing or prevent a pairing).",
      "Generate Secret Santa pairings automatically.",
      "Each participant will receive a unique link showing who they should gift, along with Gift Hint, Address, Phone, Notes, and optional instructions.",
      "No accounts, emails, or backend required — everything runs in your browser and is hosted on GitHub Pages.",
      "Enjoy a fun and stress-free Secret Santa experience! 🎄",
      "You will receive a unique link for each participant, which you must share yourself (via email, Slack, etc). [Example link]"
    ]
  },
  pairing: {
    title: "Your Secret Santa Assignment",
    assignment: "Welcome, <name/>! You have been picked to get a gift for:",
    error: "Failed to decrypt the message. The link might be invalid.",
    startYourOwn: "Start a Secret Santa yourself!",
    address: "Address",
    phone: "Phone",
    notes: "Notes",
    rulesReminder: "{{instructions}}" // custom instructions
  },
  participants: {
    title: "Participants",
    generationWarning: "Important: Any change made to the participant list or settings will require creating new pairings. Existing links won't be updated.",
    addPerson: "Add Person",
    generatePairs: "Generate Pairings",
    enterName: "Enter participant name",
    editRules: "Edit rules",
    removeParticipant: "Remove participant",
    rulesCount_one: "{{count}} rule",
    rulesCount_other: "{{count}} rules",
    switchToFormView: "Switch to form view",
    switchToTextView: "Switch to text view"
  },
  rules: {
    title: "Rules for {{name}}",
    hintLabel: "Gift Hint",
    hintPlaceholder: "Enter a gift hint (optional)",
    addressLabel: "Address",
    addressPlaceholder: "Enter address (optional)",
    phoneLabel: "Phone",
    phonePlaceholder: "Enter phone (optional)",
    notesLabel: "Notes",
    notesPlaceholder: "Enter additional notes (optional)",
    addMustRule: "Force a Pairing",
    addMustNotRule: "Prevent a Pairing",
    mustBePairedWith: "Must be paired with",
    mustNotBePairedWith: "Must not be paired with",
    selectParticipant: "Select another participant",
    removeRule: "Remove rule",
    cancel: "Cancel",
    saveRules: "Save Rules"
  },
  links: {
    title: "Links to Share",
    warningParticipantsChanged: "Warning: Participants or rules have changed since these links were generated.",
    resetAssignments: "Regenerate Pairings",
    shareInstructions: "Only share these links with the corresponding gift giver",
    exportCSV: "Export as CSV",
    copySecretLink: "Copy Secret Link",
    linkCopied: "Added to clipboard!",
    for: "for"
  },
  settings: {
    title: "Settings",
    instructions: "Additional Instructions",
    instructionsPlaceholder: "e.g., budget, date, location...",
    instructionsHelp: "They will be shown to all participants on their assignment page. Keep it short to avoid long links."
  }
};
