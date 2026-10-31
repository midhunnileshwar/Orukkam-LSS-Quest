// Question Bank for Orukkam - CM Kids Quest (Kerala Class 4 LSS Curriculum)

export const QUESTIONS_DATA = {
  maths: {
    1: {
      title: 'സംഖ്യാ പരിചയം (Numbers & Values)',
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
        {
          id: 'm1_q3',
          text: '584 എന്ന സംഖ്യയിലെ 8 ന്റെ സ്ഥാനവില എത്ര?',
          options: [
            { id: 'a', text: '8' },
            { id: 'b', text: '80' },
            { id: 'c', text: '800' },
            { id: 'd', text: '84' },
          ],
          correct: 'b',
          explanation: '8 പത്തുകളുടെ സ്ഥാനത്താണ്, അതിനാൽ സ്ഥാനവില 80 ആണ്.',
        },
        {
          id: 'm1_q4',
          text: '1000 ത്തിൽ നിന്ന് 1 കുറച്ചാൽ എത്ര കിട്ടും?',
          options: [
            { id: 'a', text: '900' },
            { id: 'b', text: '990' },
            { id: 'c', text: '999' },
            { id: 'd', text: '909' },
          ],
          correct: 'c',
          explanation: '1000 - 1 = 999.',
        },
        {
          id: 'm1_q5',
          text: 'ഏറ്റവും ചെറിയ നാലക്ക സംഖ്യ ഏതാണ്?',
          options: [
            { id: 'a', text: '1000' },
            { id: 'b', text: '1001' },
            { id: 'c', text: '9999' },
            { id: 'd', text: '1111' },
          ],
          correct: 'a',
          explanation: 'ഏറ്റവും ചെറിയ നാലക്ക സംഖ്യ 1000 ആണ്.',
        },
      ],
    },
    2: {
      title: 'ഗുണനവും ഹരണവും (Multiplication & Division)',
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
        {
          id: 'm2_q2',
          text: '48 നെ 6 കൊണ്ട് ഹരിച്ചാൽ ശിഷ്ടം എത്ര?',
          options: [
            { id: 'a', text: '0' },
            { id: 'b', text: '1' },
            { id: 'c', text: '2' },
            { id: 'd', text: '8' },
          ],
          correct: 'a',
          explanation: '48 = 6 x 8. പൂർണ്ണമായി ഹരിക്കാം, ശിഷ്ടം 0 ആണ്.',
        },
        {
          id: 'm2_q3',
          text: 'ഒരു പേനയ്ക്ക് 7 രൂപ. 8 പേനകൾക്ക് എത്ര രൂപയാകും?',
          options: [
            { id: 'a', text: '49' },
            { id: 'b', text: '54' },
            { id: 'c', text: '56' },
            { id: 'd', text: '63' },
          ],
          correct: 'c',
          explanation: '7 x 8 = 56 രൂപ.',
        },
        {
          id: 'm2_q4',
          text: '15 x 0 = ?',
          options: [
            { id: 'a', text: '15' },
            { id: 'b', text: '0' },
            { id: 'c', text: '1' },
            { id: 'd', text: '150' },
          ],
          correct: 'b',
          explanation: 'ഏതൊരു സംഖ്യയെയും പൂജ്യം കൊണ്ട് ഗുണിച്ചാൽ പൂജ്യം ലഭിക്കും.',
        },
        {
          id: 'm2_q5',
          text: '72 മിഠായികൾ 8 കുട്ടികൾക്ക് തുല്യമായി വീതിച്ചാൽ ഒരാൾക്ക് എത്ര കിട്ടും?',
          options: [
            { id: 'a', text: '7' },
            { id: 'b', text: '8' },
            { id: 'c', text: '9' },
            { id: 'd', text: '10' },
          ],
          correct: 'c',
          explanation: '72 ÷ 8 = 9 മിഠായികൾ വീതം.',
        },
      ],
    },
    3: {
      title: 'ക്രമങ്ങളും പസിലുകളും (Patterns & Logic)',
      questions: [
        {
          id: 'm3_q1',
          text: 'തുടർസംഖ്യ കണ്ടെത്തുക: 3, 6, 9, 12, ___ ?',
          options: [
            { id: 'a', text: '14' },
            { id: 'b', text: '15' },
            { id: 'c', text: '16' },
            { id: 'd', text: '18' },
          ],
          correct: 'b',
          explanation: '3 വീതം കൂട്ടിവരുന്നു (3, 6, 9, 12, 15).',
        },
        {
          id: 'm3_q2',
          text: 'ഒരു വരിയിൽ മുന്നിൽ നിന്നും പിന്നിൽ നിന്നും രാഹുൽ 5-ാമനാണ്. വരിയിൽ ആകെ എത്ര കുട്ടികളുണ്ട്?',
          options: [
            { id: 'a', text: '10' },
            { id: 'b', text: '9' },
            { id: 'c', text: '8' },
            { id: 'd', text: '11' },
          ],
          correct: 'b',
          explanation: 'മുന്നിൽ 4 പേർ, പിന്നിൽ 4 പേർ, നടുവിൽ രാഹുൽ = 4 + 4 + 1 = 9 കുട്ടികൾ.',
        },
        {
          id: 'm3_q3',
          text: 'തുടർസംഖ്യ ഏത്: 10, 20, 40, 80, ___ ?',
          options: [
            { id: 'a', text: '100' },
            { id: 'b', text: '120' },
            { id: 'c', text: '140' },
            { id: 'd', text: '160' },
          ],
          correct: 'd',
          explanation: 'ഓരോ സംഖ്യയും ഇരട്ടിയാകുന്നു. 80 x 2 = 160.',
        },
        {
          id: 'm3_q4',
          text: 'ഒരു സമചതുരത്തിന് എത്ര വശങ്ങളുണ്ട്?',
          options: [
            { id: 'a', text: '3' },
            { id: 'b', text: '4' },
            { id: 'c', text: '5' },
            { id: 'd', text: '6' },
          ],
          correct: 'b',
          explanation: 'സമചതുരത്തിന് തുല്യമായ 4 വശങ്ങളുണ്ട്.',
        },
      ],
    },
    4: {
      title: 'അളവുകളും സമയവും (Measurements & Time)',
      questions: [
        {
          id: 'm4_q1',
          text: '1 കിലോഗ്രാമിൽ എത്ര ഗ്രാം ഉണ്ട്?',
          options: [
            { id: 'a', text: '100' },
            { id: 'b', text: '500' },
            { id: 'c', text: '1000' },
            { id: 'd', text: '10000' },
          ],
          correct: 'c',
          explanation: '1 കിലോഗ്രാം = 1000 ഗ്രാം.',
        },
        {
          id: 'm4_q2',
          text: 'ഒരു ദിവസത്തിൽ എത്ര മണിക്കൂറുകൾ ഉണ്ട്?',
          options: [
            { id: 'a', text: '12' },
            { id: 'b', text: '24' },
            { id: 'c', text: '48' },
            { id: 'd', text: '60' },
          ],
          correct: 'b',
          explanation: 'ഒരു ദിവസത്തിൽ 24 മണിക്കൂറുകൾ ഉണ്ട്.',
        },
        {
          id: 'm4_q3',
          text: 'അര മീറ്റർ എന്നാൽ എത്ര സെൻ്റീമീറ്റർ ആണ്?',
          options: [
            { id: 'a', text: '25' },
            { id: 'b', text: '50' },
            { id: 'c', text: '75' },
            { id: 'd', text: '100' },
          ],
          correct: 'b',
          explanation: '1 മീറ്റർ = 100 സെ.മീ. അതിനാൽ അര മീറ്റർ = 50 സെ.മീ.',
        },
      ],
    },
  },

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
      ],
    },
    2: {
      title: 'സാഹിത്യവും കവികളും (Literature & Poets)',
      questions: [
        {
          id: 'mal2_q1',
          text: "'ജ്ഞാനപ്പാന' രചിച്ചതാര്?",
          options: [
            { id: 'a', text: 'എഴുത്തച്ഛൻ' },
            { id: 'b', text: 'പൂന്താനം' },
            { id: 'c', text: 'വള്ളത്തോൾ' },
            { id: 'd', text: 'ഉള്ളൂർ' },
          ],
          correct: 'b',
          explanation: 'ശരിയായ ഉത്തരം: പൂന്താനം നമ്പൂതിരി',
        },
        {
          id: 'mal2_q2',
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
          id: 'mal2_q3',
          text: 'തുള്ളൽ പ്രസ്ഥാനത്തിന്റെ ഉപജ്ഞാതാവ് ആര്?',
          options: [
            { id: 'a', text: 'കുഞ്ചൻ നമ്പ്യാർ' },
            { id: 'b', text: 'ചെറുശ്ശേരി' },
            { id: 'c', text: 'എഴുത്തച്ഛൻ' },
            { id: 'd', text: 'ഉണ്ണായിവാര്യർ' },
          ],
          correct: 'a',
          explanation: 'ശരിയായ ഉത്തരം: കുഞ്ചൻ നമ്പ്യാർ',
        },
        {
          id: 'mal2_q4',
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
      ],
    },
    3: {
      title: 'പഴഞ്ചൊല്ലും കടങ്കഥകളും (Riddles & Sayings)',
      questions: [
        {
          id: 'mal3_q1',
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
          id: 'mal3_q2',
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
          id: 'mal3_q3',
          text: 'കടങ്കഥ: "പച്ചപ്പട്ടണിഞ്ഞ് പാറമേലിരിക്കും, ചൂണ്ടയിട്ടാൽ പിടികിട്ടില്ല" - ഇതാരാണ്?',
          options: [
            { id: 'a', text: 'തവള' },
            { id: 'b', text: 'പാമ്പ്' },
            { id: 'c', text: 'പായൽ' },
            { id: 'd', text: 'ഓന്ത്' },
          ],
          correct: 'c',
          explanation: 'ശരിയായ ഉത്തരം: പായൽ',
        },
      ],
    },
  },

  english: {
    1: {
      title: 'Word Power & Opposites',
      questions: [
        {
          id: 'eng1_q1',
          text: "What is the opposite of 'HAPPY'?",
          options: [
            { id: 'a', text: 'Glad' },
            { id: 'b', text: 'Sad' },
            { id: 'c', text: 'Joy' },
            { id: 'd', text: 'Bright' },
          ],
          correct: 'b',
          explanation: 'Opposite of Happy is Sad.',
        },
        {
          id: 'eng1_q2',
          text: "What is the plural of 'CHILD'?",
          options: [
            { id: 'a', text: 'Childs' },
            { id: 'b', text: 'Childes' },
            { id: 'c', text: 'Children' },
            { id: 'd', text: 'Childrens' },
          ],
          correct: 'c',
          explanation: 'The plural of child is children.',
        },
        {
          id: 'eng1_q3',
          text: 'Which of these is the home of a lion?',
          options: [
            { id: 'a', text: 'Shed' },
            { id: 'b', text: 'Den' },
            { id: 'c', text: 'Nest' },
            { id: 'd', text: 'Stable' },
          ],
          correct: 'b',
          explanation: 'A lion lives in a den.',
        },
        {
          id: 'eng1_q4',
          text: "What is the past tense of 'GO'?",
          options: [
            { id: 'a', text: 'Gone' },
            { id: 'b', text: 'Goed' },
            { id: 'c', text: 'Went' },
            { id: 'd', text: 'Going' },
          ],
          correct: 'c',
          explanation: 'Past tense of go is went.',
        },
      ],
    },
    2: {
      title: 'Grammar & Articles',
      questions: [
        {
          id: 'eng2_q1',
          text: "Fill in the blank: 'This is ___ apple.'",
          options: [
            { id: 'a', text: 'a' },
            { id: 'b', text: 'an' },
            { id: 'c', text: 'the' },
            { id: 'd', text: 'two' },
          ],
          correct: 'b',
          explanation: "Before a vowel sound (a, e, i, o, u), we use 'an'.",
        },
        {
          id: 'eng2_q2',
          text: "Choose the correct pronoun: '___ is my sister.'",
          options: [
            { id: 'a', text: 'He' },
            { id: 'b', text: 'She' },
            { id: 'c', text: 'It' },
            { id: 'd', text: 'They' },
          ],
          correct: 'b',
          explanation: "For female individuals, we use 'She'.",
        },
        {
          id: 'eng2_q3',
          text: "'The cat is sitting ___ the table.' (on top)",
          options: [
            { id: 'a', text: 'on' },
            { id: 'b', text: 'in' },
            { id: 'c', text: 'at' },
            { id: 'd', text: 'between' },
          ],
          correct: 'a',
          explanation: "We use 'on' when something is resting on a surface.",
        },
      ],
    },
    3: {
      title: 'Rhyming & Riddle Fun',
      questions: [
        {
          id: 'eng3_q1',
          text: "Which word rhymes with 'SUN'?",
          options: [
            { id: 'a', text: 'Moon' },
            { id: 'b', text: 'Run' },
            { id: 'c', text: 'Star' },
            { id: 'd', text: 'Sky' },
          ],
          correct: 'b',
          explanation: 'Sun and Run have matching ending sounds.',
        },
        {
          id: 'eng3_q2',
          text: "Riddle: 'I have hands and a face, but I cannot walk. What am I?'",
          options: [
            { id: 'a', text: 'A tree' },
            { id: 'b', text: 'A clock' },
            { id: 'c', text: 'A car' },
            { id: 'd', text: 'A book' },
          ],
          correct: 'b',
          explanation: 'A clock has hour/minute hands and a dial face.',
        },
      ],
    },
  },

  evs: {
    1: {
      title: 'സസ്യലോകം (The World of Plants)',
      questions: [
        {
          id: 'evs1_q1',
          text: 'സസ്യങ്ങൾ ആഹാരം നിർമ്മിക്കുന്ന പ്രക്രിയ ഏതാണ്?',
          options: [
            { id: 'a', text: 'ശ്വസനം' },
            { id: 'b', text: 'പ്രകാശസംശ്ലേഷണം' },
            { id: 'c', text: 'ബാഷ്പീകരണം' },
            { id: 'd', text: 'ദഹനം' },
          ],
          correct: 'b',
          explanation:
            'സൂര്യപ്രകാശത്തിന്റെ സഹായത്തോടെ ഇലകളിൽ നടക്കുന്ന ആഹാര നിർമ്മാണമാണ് പ്രകാശസംശ്ലേഷണം (Photosynthesis).',
        },
        {
          id: 'evs1_q2',
          text: 'ഇലകൾക്ക് പച്ചനിറം നൽകുന്ന വർണ്ണകം ഏത്?',
          options: [
            { id: 'a', text: 'ഹരിതകം (Chlorophyll)' },
            { id: 'b', text: 'കരോട്ടിൻ' },
            { id: 'c', text: 'മെലാനിൻ' },
            { id: 'd', text: 'ഹിമോഗ്ലോബിൻ' },
          ],
          correct: 'a',
          explanation: 'ഹരിതകം (ക്ലോറോഫിൽ) ആണ് ഇലകൾക്ക് പച്ച നിറം നൽകുന്നത്.',
        },
        {
          id: 'evs1_q3',
          text: 'മണ്ണിൽ നിന്ന് വെള്ളവും ലവണങ്ങളും വലിച്ചെടുക്കുന്നത് ഏത് ഭാഗമാണ്?',
          options: [
            { id: 'a', text: 'തണ്ട്' },
            { id: 'b', text: 'ഇല' },
            { id: 'c', text: 'വേര്' },
            { id: 'd', text: 'പൂവ്' },
          ],
          correct: 'c',
          explanation: 'വേരുകളാണ് മണ്ണിൽ നിന്ന് ജലവും പോഷകങ്ങളും ആഗിരണം ചെയ്യുന്നത്.',
        },
      ],
    },
    2: {
      title: 'ജീവലോകം (Animal Kingdom)',
      questions: [
        {
          id: 'evs2_q1',
          text: 'കേരളത്തിന്റെ ഔദ്യോഗിക മൃഗം ഏതാണ്?',
          options: [
            { id: 'a', text: 'കടുവ' },
            { id: 'b', text: 'സിംഹം' },
            { id: 'c', text: 'ആന' },
            { id: 'd', text: 'മാൻ' },
          ],
          correct: 'c',
          explanation: 'കേരളത്തിന്റെ സംസ്ഥാന മൃഗമാണ് ഇന്ത്യൻ ആന.',
        },
        {
          id: 'evs2_q2',
          text: 'ചിറകുകൾ ഉണ്ടെങ്കിലും പറക്കാൻ കഴിയാത്ത പക്ഷി ഏത്?',
          options: [
            { id: 'a', text: 'ഒട്ടകപ്പക്ഷി' },
            { id: 'b', text: 'പ്രാവ്' },
            { id: 'c', text: 'മയിൽ' },
            { id: 'd', text: 'പരുന്ത്' },
          ],
          correct: 'a',
          explanation: 'ഒട്ടകപ്പക്ഷി (Ostrich) പറക്കാൻ കഴിയാത്ത വലിയ പക്ഷിയാണ്.',
        },
        {
          id: 'evs2_q3',
          text: 'ചെകിളകൾ ഉപയോഗിച്ച് ശ്വസിക്കുന്ന ജീവി ഏത്?',
          options: [
            { id: 'a', text: 'തവള' },
            { id: 'b', text: 'മത്സ്യം' },
            { id: 'c', text: 'ആമ' },
            { id: 'd', text: 'മുതല' },
          ],
          correct: 'b',
          explanation: 'മത്സ്യങ്ങൾ ശ്വസിക്കാൻ ഗിൽസ് അഥവാ ചെകിളപ്പൂക്കൾ ഉപയോഗിക്കുന്നു.',
        },
      ],
    },
    3: {
      title: 'പരിസ്ഥിതിയും ആരോഗ്യവും (Health & Nature)',
      questions: [
        {
          id: 'evs3_q1',
          text: 'നമുക്ക് കാഴ്ചശക്തി നൽകാൻ സഹായിക്കുന്ന ജീവകം (വിറ്റാമിൻ) ഏത്?',
          options: [
            { id: 'a', text: 'വിറ്റാമിൻ A' },
            { id: 'b', text: 'വിറ്റാമിൻ B' },
            { id: 'c', text: 'വിറ്റാമിൻ C' },
            { id: 'd', text: 'വിറ്റാമിൻ D' },
          ],
          correct: 'a',
          explanation:
            'കണ്ണിന്റെ ആരോഗ്യത്തിനും കാഴ്ചയ്ക്കും വിറ്റാമിൻ A അത്യാവശ്യമാണ് (ഉദാ: കാരറ്റ്).',
        },
        {
          id: 'evs3_q2',
          text: 'ലോക പരിസ്ഥിതി ദിനം എന്ന്?',
          options: [
            { id: 'a', text: 'ജൂൺ 5' },
            { id: 'b', text: 'നവംബർ 14' },
            { id: 'c', text: 'ഓഗസ്റ്റ് 15' },
            { id: 'd', text: 'ജനുവരി 26' },
          ],
          correct: 'a',
          explanation: 'എല്ലാ വർഷവും ജൂൺ 5 ലോക പരിസ്ഥിതി ദിനമായി ആചരിക്കുന്നു.',
        },
      ],
    },
  },

  gk: {
    1: {
      title: 'നമ്മുടെ കേരളം (Our Kerala)',
      questions: [
        {
          id: 'gk1_q1',
          text: 'കേരളത്തിൽ എത്ര ജില്ലകളുണ്ട്?',
          options: [
            { id: 'a', text: '12' },
            { id: 'b', text: '14' },
            { id: 'c', text: '16' },
            { id: 'd', text: '15' },
          ],
          correct: 'b',
          explanation: 'കേരളത്തിൽ ആകെ 14 ജില്ലകളുണ്ട്.',
        },
        {
          id: 'gk1_q2',
          text: 'കേരളത്തിലെ ഏറ്റവും നീളം കൂടിയ നദി ഏതാണ്?',
          options: [
            { id: 'a', text: 'ഭാരതപ്പുഴ' },
            { id: 'b', text: 'പെരിയാർ' },
            { id: 'c', text: 'പമ്പ' },
            { id: 'd', text: 'ചാലിയാർ' },
          ],
          correct: 'b',
          explanation: 'കേരളത്തിലെ ഏറ്റവും നീളം കൂടിയ നദി പെരിയാർ ആണ് (244 കി.മീ).',
        },
        {
          id: 'gk1_q3',
          text: 'കേരളത്തിന്റെ ഔദ്യോഗിക പക്ഷി ഏതാണ്?',
          options: [
            { id: 'a', text: 'മയിൽ' },
            { id: 'b', text: 'തത്ത' },
            { id: 'c', text: 'വേഴാമ്പൽ (മലമുഴക്കി വേഴാമ്പൽ)' },
            { id: 'd', text: 'കുയിൽ' },
          ],
          correct: 'c',
          explanation: 'കേരളത്തിന്റെ ഔദ്യോഗിക പക്ഷിയാണ് മലമുഴക്കി വേഴാമ്പൽ (Great Hornbill).',
        },
        {
          id: 'gk1_q4',
          text: 'കേരളത്തിന്റെ തലസ്ഥാനം ഏതാണ്?',
          options: [
            { id: 'a', text: 'എറണാകുളം' },
            { id: 'b', text: 'കോഴിക്കോട്' },
            { id: 'c', text: 'തിരുവനന്തപുരം' },
            { id: 'd', text: 'തൃശ്ശൂർ' },
          ],
          correct: 'c',
          explanation: 'കേരളത്തിന്റെ തലസ്ഥാനം തിരുവനന്തപുരം ആണ്.',
        },
      ],
    },
    2: {
      title: 'നമ്മുടെ ഭാരതം (Our India)',
      questions: [
        {
          id: 'gk2_q1',
          text: 'നമ്മുടെ രാഷ്ട്രപിതാവ് ആര്?',
          options: [
            { id: 'a', text: 'ജവഹർലാൽ നെഹ്റു' },
            { id: 'b', text: 'മഹാത്മാഗാന്ധി' },
            { id: 'c', text: 'സുഭാഷ് ചന്ദ്രബോസ്' },
            { id: 'd', text: 'ഡോ. ബി.ആർ. അംബേദ്കർ' },
          ],
          correct: 'b',
          explanation: 'ഭാരതത്തിന്റെ രാഷ്ട്രപിതാവാണ് മഹാത്മാഗാന്ധി.',
        },
        {
          id: 'gk2_q2',
          text: 'നമ്മുടെ ദേശീയ ഗാനം ഏത്?',
          options: [
            { id: 'a', text: 'വന്ദേമാതരം' },
            { id: 'b', text: 'ജനഗണമന' },
            { id: 'c', text: 'സാരേ ജഹാം സെ അച്ഛാ' },
            { id: 'd', text: 'മാതൃഭൂമി ഗീതം' },
          ],
          correct: 'b',
          explanation: 'രവീന്ദ്രനാഥ ടാഗോർ രചിച്ച ജനഗണമന ആണ് നമ്മുടെ ദേശീയ ഗാനം.',
        },
        {
          id: 'gk2_q3',
          text: 'ഭാരതത്തിന്റെ ദേശീയ മൃഗം ഏതാണ്?',
          options: [
            { id: 'a', text: 'സിംഹം' },
            { id: 'b', text: 'കടുവ (റോയൽ ബംഗാൾ ടൈഗർ)' },
            { id: 'c', text: 'ആന' },
            { id: 'd', text: 'ചിറ്റപ്പുലി' },
          ],
          correct: 'b',
          explanation: 'റോയൽ ബംഗാൾ ടൈഗർ (കടുവ) ആണ് ഇന്ത്യയുടെ ദേശീയ മൃഗം.',
        },
      ],
    },
    3: {
      title: 'ലോക വിജ്ഞാനം (General Science & Facts)',
      questions: [
        {
          id: 'gk3_q1',
          text: 'സൗരയൂഥത്തിലെ ഏറ്റവും വലിയ ഗ്രഹം ഏതാണ്?',
          options: [
            { id: 'a', text: 'ഭൂമി' },
            { id: 'b', text: 'വ്യാഴം (Jupiter)' },
            { id: 'c', text: 'ശനി' },
            { id: 'd', text: 'ചൊവ്വ' },
          ],
          correct: 'b',
          explanation: 'സൗരയൂഥത്തിലെ ഏറ്റവും വലിയ ഗ്രഹം വ്യാഴം (Jupiter) ആണ്.',
        },
        {
          id: 'gk3_q2',
          text: 'ഭൂമിയുടെ ഉപഗ്രഹം ഏതാണ്?',
          options: [
            { id: 'a', text: 'ചന്ദ്രൻ' },
            { id: 'b', text: 'സൂര്യൻ' },
            { id: 'c', text: 'വ്യാഴം' },
            { id: 'd', text: 'ധ്രുവനക്ഷത്രം' },
          ],
          correct: 'a',
          explanation: 'ഭൂമിയുടെ സ്വാഭാവിക ഉപഗ്രഹമാണ് ചന്ദ്രൻ.',
        },
      ],
    },
  },
};

// Helper to get custom questions saved by teachers in localStorage
const getCustomQuestions = (landId, levelId) => {
  try {
    const raw = localStorage.getItem('orukkam_custom_questions');
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return parsed[landId]?.[levelId] || null;
  } catch (e) {
    console.error('Failed to read custom questions', e);
    return null;
  }
};

// Generates a dynamic Daily Mix quiz from across all categories
const getDailyMixQuestions = () => {
  const allQuestions = [];
  const lands = ['maths', 'malayalam', 'english', 'evs', 'gk'];
  lands.forEach((land) => {
    const levels = QUESTIONS_DATA[land];
    if (levels) {
      Object.values(levels).forEach((level) => {
        if (level.questions) {
          allQuestions.push(...level.questions);
        }
      });
    }
  });

  // Shuffle and pick 5 distinct questions
  const shuffled = [...allQuestions].sort(() => 0.5 - Math.random());
  return {
    title: 'ദിവസേനയുള്ള ചലഞ്ച് (Daily Mix)',
    questions: shuffled.slice(0, 5),
  };
};

export const getQuestionsForLevel = (landId, levelId) => {
  // Support daily mix
  if (landId === 'daily' || levelId === 'mix') {
    return getDailyMixQuestions();
  }

  // Check custom teacher-created questions first
  const custom = getCustomQuestions(landId, levelId);
  if (custom) return custom;

  const landData = QUESTIONS_DATA[landId];
  if (!landData) return null;
  if (landData[levelId]) return landData[levelId];

  // Dynamic Challenge Level: pull from land's existing pool for higher levels
  const allLandQuestions = [];
  Object.values(landData).forEach((lvl) => {
    if (lvl.questions) allLandQuestions.push(...lvl.questions);
  });

  if (allLandQuestions.length > 0) {
    const shuffled = [...allLandQuestions].sort(() => 0.5 - Math.random());
    return {
      title: `മേഖലാ ചലഞ്ച് (Challenge Level ${levelId})`,
      questions: shuffled.slice(0, 4),
    };
  }

  return null;
};
