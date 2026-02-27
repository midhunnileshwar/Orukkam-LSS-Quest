export const QUESTIONS_DATA = {
  maths: {
    1: {
      title: 'സംഖ്യകൾ (Numbers)',
      questions: [
        {
          id: 'm1_q1',
          text: '245 + 355 = ?',
          options: [
            { id: 'a', text: '500' },
            { id: 'b', text: '600' },
            { id: 'c', text: '590' },
            { id: 'd', text: '610' },
          ],
          correct: 'b',
          explanation: '245 + 355 = 600',
        },
        {
          id: 'm1_q2',
          text: 'ഏറ്റവും വലിയ മൂന്നക്ക സംഖ്യ ഏത്?',
          options: [
            { id: 'a', text: '100' },
            { id: 'b', text: '900' },
            { id: 'c', text: '999' },
            { id: 'd', text: '1000' },
          ],
          correct: 'c',
          explanation: 'ഏറ്റവും വലിയ മൂന്നക്ക സംഖ്യ 999 ആണ്.',
        },
      ],
    },
    2: {
      title: 'ഗുണനം (Multiplication)',
      questions: [
        {
          id: 'm2_q1',
          text: '12 x 5 = ?',
          options: [
            { id: 'a', text: '50' },
            { id: 'b', text: '60' },
            { id: 'c', text: '55' },
            { id: 'd', text: '65' },
          ],
          correct: 'b',
          explanation: '12 x 5 = 60',
        },
      ],
    },
  },
  // Placeholder for other lands
  malayalam: {
    1: {
      title: 'മലയാളം അടിസ്ഥാനം (Malayalam Basics)',
      questions: [
        {
          id: 'mal1_q1',
          text: 'മലയാള ഭാഷയുടെ പിതാവ് എന്നറിയപ്പെടുന്നത് ആര്?',
          options: [
            { id: 'a', text: 'കുഞ്ചൻ നമ്പ്യാർ' },
            { id: 'b', text: 'തുഞ്ചത്ത് എഴുത്തച്ഛൻ' },
            { id: 'c', text: 'ചെറുശ്ശേരി' },
            { id: 'd', text: 'കുമാരനാശാൻ' },
          ],
          correct: 'b',
          explanation: 'ശരിയായ ഉത്തരം: തുഞ്ചത്ത് എഴുത്തച്ഛൻ',
        },
        {
          id: 'mal1_q2',
          text: "'മടിയിൽ + ഇരുത്തി' - ഇത് ചേർത്തെഴുതുമ്പോൾ കിട്ടുന്ന പദം ഏത്?",
          options: [
            { id: 'a', text: 'മടിയിരുത്തി' },
            { id: 'b', text: 'മടിയിലുരുത്തി' },
            { id: 'c', text: 'മടിയലിരുത്തി' },
            { id: 'd', text: 'മടിയിലിരുത്തി' },
          ],
          correct: 'd',
          explanation: 'ശരിയായ ഉത്തരം: മടിയിലിരുത്തി',
        },
        {
          id: 'mal1_q3',
          text: "'സൂര്യൻ' എന്ന പദത്തിന് സമാനമായ അർത്ഥം വരുന്ന പദം (പര്യായം) ഏതാണ്?",
          options: [
            { id: 'a', text: 'ഇന്ദു' },
            { id: 'b', text: 'ശശാങ്കൻ' },
            { id: 'c', text: 'ദിവാകരൻ' },
            { id: 'd', text: 'താരകം' },
          ],
          correct: 'c',
          explanation: 'ശരിയായ ഉത്തരം: ദിവാകരൻ',
        },
        {
          id: 'mal1_q4',
          text: "വിപരീതപദം കണ്ടെത്തുക: 'പ്രകാശം'",
          options: [
            { id: 'a', text: 'ശോഭ' },
            { id: 'b', text: 'പകൽ' },
            { id: 'c', text: 'വെളിച്ചം' },
            { id: 'd', text: 'അന്ധകാരം' },
          ],
          correct: 'd',
          explanation: 'ശരിയായ ഉത്തരം: അന്ധകാരം',
        },
        {
          id: 'mal1_q5',
          text: "'മയൂരം' എന്ന വാക്കിന്റെ അർത്ഥം എന്ത്?",
          options: [
            { id: 'a', text: 'മയിൽ' },
            { id: 'b', text: 'കുയിൽ' },
            { id: 'c', text: 'കാക്ക' },
            { id: 'd', text: 'അരയന്നം' },
          ],
          correct: 'a',
          explanation: 'ശരിയായ ഉത്തരം: മയിൽ',
        },
        {
          id: 'mal1_q6',
          text: "'ജ്ഞാനപ്പാന' രചിച്ചതാര്?",
          options: [
            { id: 'a', text: 'എഴുത്തച്ഛൻ' },
            { id: 'b', text: 'പൂന്താനം' },
            { id: 'c', text: 'വള്ളത്തോൾ' },
            { id: 'd', text: 'ഉള്ളൂർ' },
          ],
          correct: 'b',
          explanation: 'ശരിയായ ഉത്തരം: പൂന്താനം',
        },
        {
          id: 'mal1_q7',
          text: 'കൂട്ടത്തിൽ ശരിയായ പദരൂപം ഏത്?',
          options: [
            { id: 'a', text: 'അനുഗ്രഹം' },
            { id: 'b', text: 'അനുഗ്രഗം' },
            { id: 'c', text: 'അണുഗ്രഹം' },
            { id: 'd', text: 'അനുഗ്രഘം' },
          ],
          correct: 'a',
          explanation: 'ശരിയായ ഉത്തരം: അനുഗ്രഹം',
        },
        {
          id: 'mal1_q8',
          text: 'ഒരു കടങ്കഥ: "അങ്ങോട്ടും ഇങ്ങോട്ടും പോകും, വഴി കാണില്ല" - ഇതെന്താണ്?',
          options: [
            { id: 'a', text: 'തീവണ്ടി' },
            { id: 'b', text: 'തോണി (വള്ളം)' },
            { id: 'c', text: 'വിമാനം' },
            { id: 'd', text: 'കാറ്റ്' },
          ],
          correct: 'b',
          explanation: 'ശരിയായ ഉത്തരം: തോണി (വള്ളം)',
        },
        {
          id: 'mal1_q9',
          text: "'കുട്ടി' എന്ന പദത്തിന്റെ ബഹുവചനം ഏത്?",
          options: [
            { id: 'a', text: 'കുട്ടിക്കൂട്ടം' },
            { id: 'b', text: 'കുട്ടിയമ്മ' },
            { id: 'c', text: 'കുട്ടികൾ' },
            { id: 'd', text: 'കുട്ടിമാർ' },
          ],
          correct: 'c',
          explanation: 'ശരിയായ ഉത്തരം: കുട്ടികൾ',
        },
        {
          id: 'mal1_q10',
          text: "'കാനനം' എന്ന പദത്തിന്റെ അർത്ഥം എന്താണ്?",
          options: [
            { id: 'a', text: 'നദി' },
            { id: 'b', text: 'മല' },
            { id: 'c', text: 'കാട്' },
            { id: 'd', text: 'നാട്' },
          ],
          correct: 'c',
          explanation: 'ശരിയായ ഉത്തരം: കാട്',
        },
        {
          id: 'mal1_q11',
          text: "'മണ്ണും ചാരി നിന്നവൻ പെണ്ണും കൊണ്ടുപോയി' - ഇതൊരു ________ ആണ്.",
          options: [
            { id: 'a', text: 'കടങ്കഥ' },
            { id: 'b', text: 'പഴഞ്ചൊല്ല്' },
            { id: 'c', text: 'കവിത' },
            { id: 'd', text: 'ശൈലി' },
          ],
          correct: 'b',
          explanation: 'ശരിയായ ഉത്തരം: പഴഞ്ചൊല്ല്',
        },
        {
          id: 'mal1_q12',
          text: "'കേരള വാൽമീകി' എന്നറിയപ്പെടുന്ന കവി ആര്?",
          options: [
            { id: 'a', text: 'ഉള്ളൂർ പരമേശ്വരയ്യർ' },
            { id: 'b', text: 'വള്ളത്തോൾ നാരായണമേനോൻ' },
            { id: 'c', text: 'കുമാരനാശാൻ' },
            { id: 'd', text: 'കുഞ്ചൻ നമ്പ്യാർ' },
          ],
          correct: 'b',
          explanation: 'ശരിയായ ഉത്തരം: വള്ളത്തോൾ നാരായണമേനോൻ',
        },
        {
          id: 'mal1_q13',
          text: "'ആന' യെ കുറിക്കുന്ന മറ്റൊരു പദം (പര്യായം) ഏത്?",
          options: [
            { id: 'a', text: 'അശ്വം' },
            { id: 'b', text: 'ശ്വാനൻ' },
            { id: 'c', text: 'സിംഹം' },
            { id: 'd', text: 'ഗജം' },
          ],
          correct: 'd',
          explanation: 'ശരിയായ ഉത്തരം: ഗജം',
        },
        {
          id: 'mal1_q14',
          text: "പിരിച്ചെഴുതുക: 'മരക്കൊമ്പ്'",
          options: [
            { id: 'a', text: 'മര + കൊമ്പ്' },
            { id: 'b', text: 'മരം + കൊമ്പ്' },
            { id: 'c', text: 'മരക് + കൊമ്പ്' },
            { id: 'd', text: 'മരക്ക + ഒമ്പ്' },
          ],
          correct: 'b',
          explanation: 'ശരിയായ ഉത്തരം: മരം + കൊമ്പ്',
        },
        {
          id: 'mal1_q15',
          text: "'വെള്ളം' എന്നതിന് തുല്യമായ അർത്ഥം വരുന്ന വാക്ക് ഏത്?",
          options: [
            { id: 'a', text: 'സലിലം' },
            { id: 'b', text: 'ഗഗനം' },
            { id: 'c', text: 'അനലം' },
            { id: 'd', text: 'സമീരണൻ' },
          ],
          correct: 'a',
          explanation: 'ശരിയായ ഉത്തരം: സലിലം',
        },
      ]
    },
  },
  english: {},
  evs: {},
  gk: {},
};

export const getQuestionsForLevel = (landId, levelId) => {
  const landData = QUESTIONS_DATA[landId];
  if (!landData) return null;
  return landData[levelId];
};
