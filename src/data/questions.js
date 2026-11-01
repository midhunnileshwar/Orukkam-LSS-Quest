import { ENGLISH_UNIT_1_LEVEL_1_QUESTIONS } from './englishUnit1Data';

// Question Bank for Orukkam - CM Kids Quest (Kerala Class 4 LSS Curriculum)
// Supports both Malayalam Medium and English Medium

export const QUESTIONS_DATA = {
  maths: {
    1: {
      title: 'സംഖ്യാ പരിചയം (Numbers & Values)',
      titleEn: 'Numbers & Values',
      questions: [
        {
          id: 'm1_q1',
          text: '245 + 355 = ?',
          textEn: '245 + 355 = ?',
          options: [
            { id: 'a', text: '500', textEn: '500' },
            { id: 'b', text: '600', textEn: '600' },
            { id: 'c', text: '590', textEn: '590' },
            { id: 'd', text: '610', textEn: '610' },
          ],
          correct: 'b',
          explanation: '245 + 355 = 600',
          explanationEn: '245 + 355 = 600',
        },
        {
          id: 'm1_q2',
          text: 'ഏറ്റവും വലിയ മൂന്നക്ക സംഖ്യ ഏത്?',
          textEn: 'Which is the largest three-digit number?',
          options: [
            { id: 'a', text: '100', textEn: '100' },
            { id: 'b', text: '900', textEn: '900' },
            { id: 'c', text: '999', textEn: '999' },
            { id: 'd', text: '1000', textEn: '1000' },
          ],
          correct: 'c',
          explanation: 'ഏറ്റവും വലിയ മൂന്നക്ക സംഖ്യ 999 ആണ്.',
          explanationEn: 'The largest three-digit number is 999.',
        },
        {
          id: 'm1_q3',
          text: '584 എന്ന സംഖ്യയിലെ 8 ന്റെ സ്ഥാനവില എത്ര?',
          textEn: 'What is the place value of 8 in the number 584?',
          options: [
            { id: 'a', text: '8', textEn: '8' },
            { id: 'b', text: '80', textEn: '80' },
            { id: 'c', text: '800', textEn: '800' },
            { id: 'd', text: '84', textEn: '84' },
          ],
          correct: 'b',
          explanation: '8 പത്തുകളുടെ സ്ഥാനത്താണ്, അതിനാൽ സ്ഥാനവില 80 ആണ്.',
          explanationEn: '8 is in the tens place, so its place value is 80.',
        },
        {
          id: 'm1_q4',
          text: '1000 ത്തിൽ നിന്ന് 1 കുറച്ചാൽ എത്ര കിട്ടും?',
          textEn: 'What do you get if you subtract 1 from 1000?',
          options: [
            { id: 'a', text: '900', textEn: '900' },
            { id: 'b', text: '990', textEn: '990' },
            { id: 'c', text: '999', textEn: '999' },
            { id: 'd', text: '909', textEn: '909' },
          ],
          correct: 'c',
          explanation: '1000 - 1 = 999.',
          explanationEn: '1000 - 1 = 999.',
        },
        {
          id: 'm1_q5',
          text: 'ഏറ്റവും ചെറിയ നാലക്ക സംഖ്യ ഏതാണ്?',
          textEn: 'Which is the smallest four-digit number?',
          options: [
            { id: 'a', text: '1000', textEn: '1000' },
            { id: 'b', text: '1001', textEn: '1001' },
            { id: 'c', text: '9999', textEn: '9999' },
            { id: 'd', text: '1111', textEn: '1111' },
          ],
          correct: 'a',
          explanation: 'ഏറ്റവും ചെറിയ നാലക്ക സംഖ്യ 1000 ആണ്.',
          explanationEn: 'The smallest four-digit number is 1000.',
        },
      ],
    },
    2: {
      title: 'ഗുണനവും ഹരണവും (Multiplication & Division)',
      titleEn: 'Multiplication & Division',
      questions: [
        {
          id: 'm2_q1',
          text: '12 x 5 = ?',
          textEn: '12 x 5 = ?',
          options: [
            { id: 'a', text: '50', textEn: '50' },
            { id: 'b', text: '60', textEn: '60' },
            { id: 'c', text: '55', textEn: '55' },
            { id: 'd', text: '65', textEn: '65' },
          ],
          correct: 'b',
          explanation: '12 x 5 = 60',
          explanationEn: '12 x 5 = 60',
        },
        {
          id: 'm2_q2',
          text: '48 നെ 6 കൊണ്ട് ഹരിച്ചാൽ ശിഷ്ടം എത്ര?',
          textEn: 'What is the remainder when 48 is divided by 6?',
          options: [
            { id: 'a', text: '0', textEn: '0' },
            { id: 'b', text: '1', textEn: '1' },
            { id: 'c', text: '2', textEn: '2' },
            { id: 'd', text: '8', textEn: '8' },
          ],
          correct: 'a',
          explanation: '48 = 6 x 8. പൂർണ്ണമായി ഹരിക്കാം, ശിഷ്ടം 0 ആണ്.',
          explanationEn: '48 = 6 x 8. It divides evenly, so the remainder is 0.',
        },
        {
          id: 'm2_q3',
          text: 'ഒരു പേനയ്ക്ക് 7 രൂപ. 8 പേനകൾക്ക് എത്ര രൂപയാകും?',
          textEn: 'A pen costs ₹7. How much will 8 pens cost?',
          options: [
            { id: 'a', text: '49', textEn: '₹49' },
            { id: 'b', text: '54', textEn: '₹54' },
            { id: 'c', text: '56', textEn: '₹56' },
            { id: 'd', text: '63', textEn: '₹63' },
          ],
          correct: 'c',
          explanation: '7 x 8 = 56 രൂപ.',
          explanationEn: '7 x 8 = ₹56.',
        },
        {
          id: 'm2_q4',
          text: '15 x 0 = ?',
          textEn: '15 x 0 = ?',
          options: [
            { id: 'a', text: '15', textEn: '15' },
            { id: 'b', text: '0', textEn: '0' },
            { id: 'c', text: '1', textEn: '1' },
            { id: 'd', text: '150', textEn: '150' },
          ],
          correct: 'b',
          explanation: 'ഏതൊരു സംഖ്യയെയും പൂജ്യം കൊണ്ട് ഗുണിച്ചാൽ പൂജ്യം ലഭിക്കും.',
          explanationEn: 'Any number multiplied by zero equals zero.',
        },
        {
          id: 'm2_q5',
          text: '72 മിഠായികൾ 8 കുട്ടികൾക്ക് തുല്യമായി വീതിച്ചാൽ ഒരാൾക്ക് എത്ര കിട്ടും?',
          textEn: 'If 72 sweets are distributed equally among 8 children, how many does each get?',
          options: [
            { id: 'a', text: '7', textEn: '7' },
            { id: 'b', text: '8', textEn: '8' },
            { id: 'c', text: '9', textEn: '9' },
            { id: 'd', text: '10', textEn: '10' },
          ],
          correct: 'c',
          explanation: '72 ÷ 8 = 9 മിഠായികൾ വീതം.',
          explanationEn: '72 ÷ 8 = 9 sweets each.',
        },
      ],
    },
    3: {
      title: 'ക്രമങ്ങളും പസിലുകളും (Patterns & Logic)',
      titleEn: 'Patterns & Logic',
      questions: [
        {
          id: 'm3_q1',
          text: 'തുടർസംഖ്യ കണ്ടെത്തുക: 3, 6, 9, 12, ___ ?',
          textEn: 'Find the next number in sequence: 3, 6, 9, 12, ___ ?',
          options: [
            { id: 'a', text: '14', textEn: '14' },
            { id: 'b', text: '15', textEn: '15' },
            { id: 'c', text: '16', textEn: '16' },
            { id: 'd', text: '18', textEn: '18' },
          ],
          correct: 'b',
          explanation: '3 വീതം കൂട്ടിവരുന്നു (3, 6, 9, 12, 15).',
          explanationEn: 'Add 3 each time: 3, 6, 9, 12, 15.',
        },
        {
          id: 'm3_q2',
          text: 'ഒരു വരിയിൽ മുന്നിൽ നിന്നും പിന്നിൽ നിന്നും രാഹുൽ 5-ാമനാണ്. വരിയിൽ ആകെ എത്ര കുട്ടികളുണ്ട്?',
          textEn: 'Rahul is 5th from the front and 5th from the back in a line. How many children are in the line?',
          options: [
            { id: 'a', text: '10', textEn: '10' },
            { id: 'b', text: '9', textEn: '9' },
            { id: 'c', text: '8', textEn: '8' },
            { id: 'd', text: '11', textEn: '11' },
          ],
          correct: 'b',
          explanation: 'മുന്നിൽ 4 പേർ, പിന്നിൽ 4 പേർ, നടുവിൽ രാഹുൽ = 4 + 4 + 1 = 9 കുട്ടികൾ.',
          explanationEn: '4 in front + 4 behind + Rahul in middle = 4 + 4 + 1 = 9 children.',
        },
        {
          id: 'm3_q3',
          text: 'തുടർസംഖ്യ ഏത്: 10, 20, 40, 80, ___ ?',
          textEn: 'What is the next number: 10, 20, 40, 80, ___ ?',
          options: [
            { id: 'a', text: '100', textEn: '100' },
            { id: 'b', text: '120', textEn: '120' },
            { id: 'c', text: '140', textEn: '140' },
            { id: 'd', text: '160', textEn: '160' },
          ],
          correct: 'd',
          explanation: 'ഓരോ സംഖ്യയും ഇരട്ടിയാകുന്നു. 80 x 2 = 160.',
          explanationEn: 'Each number doubles: 80 x 2 = 160.',
        },
        {
          id: 'm3_q4',
          text: 'ഒരു സമചതുരത്തിന് എത്ര വശങ്ങളുണ്ട്?',
          textEn: 'How many sides does a square have?',
          options: [
            { id: 'a', text: '3', textEn: '3' },
            { id: 'b', text: '4', textEn: '4' },
            { id: 'c', text: '5', textEn: '5' },
            { id: 'd', text: '6', textEn: '6' },
          ],
          correct: 'b',
          explanation: 'സമചതുരത്തിന് തുല്യമായ 4 വശങ്ങളുണ്ട്.',
          explanationEn: 'A square has 4 equal sides.',
        },
      ],
    },
    4: {
      title: 'അളവുകളും സമയവും (Measurements & Time)',
      titleEn: 'Measurements & Time',
      questions: [
        {
          id: 'm4_q1',
          text: '1 കിലോഗ്രാമിൽ എത്ര ഗ്രാം ഉണ്ട്?',
          textEn: 'How many grams are there in 1 kilogram?',
          options: [
            { id: 'a', text: '100', textEn: '100' },
            { id: 'b', text: '500', textEn: '500' },
            { id: 'c', text: '1000', textEn: '1000' },
            { id: 'd', text: '10000', textEn: '10000' },
          ],
          correct: 'c',
          explanation: '1 കിലോഗ്രാം = 1000 ഗ്രാം.',
          explanationEn: '1 kilogram = 1000 grams.',
        },
        {
          id: 'm4_q2',
          text: 'ഒരു ദിവസത്തിൽ എത്ര മണിക്കൂറുകൾ ഉണ്ട്?',
          textEn: 'How many hours are there in one day?',
          options: [
            { id: 'a', text: '12', textEn: '12' },
            { id: 'b', text: '24', textEn: '24' },
            { id: 'c', text: '48', textEn: '48' },
            { id: 'd', text: '60', textEn: '60' },
          ],
          correct: 'b',
          explanation: 'ഒരു ദിവസത്തിൽ 24 മണിക്കൂറുകൾ ഉണ്ട്.',
          explanationEn: 'There are 24 hours in one day.',
        },
        {
          id: 'm4_q3',
          text: 'അര മീറ്റർ എന്നാൽ എത്ര സെൻ്റീമീറ്റർ ആണ്?',
          textEn: 'How many centimetres are there in half a metre?',
          options: [
            { id: 'a', text: '25', textEn: '25' },
            { id: 'b', text: '50', textEn: '50' },
            { id: 'c', text: '75', textEn: '75' },
            { id: 'd', text: '100', textEn: '100' },
          ],
          correct: 'b',
          explanation: '1 മീറ്റർ = 100 സെ.മീ. അതിനാൽ അര മീറ്റർ = 50 സെ.മീ.',
          explanationEn: '1 metre = 100 cm, so half a metre = 50 cm.',
        },
      ],
    },
  },

  malayalam: {
    1: {
      title: 'മലയാളം അടിസ്ഥാനം (Malayalam Basics)',
      titleEn: 'Malayalam Basics',
      questions: [
        {
          id: 'mal1_q1',
          text: 'മലയാള ഭാഷയുടെ പിതാവ് എന്നറിയപ്പെടുന്നത് ആര്?',
          textEn: 'Who is revered as the Father of Malayalam Language?',
          options: [
            { id: 'a', text: 'കുഞ്ചൻ നമ്പ്യാർ', textEn: 'Kunchan Nambiar' },
            { id: 'b', text: 'തുഞ്ചത്ത് എഴുത്തച്ഛൻ', textEn: 'Thunchath Ezhuthachan' },
            { id: 'c', text: 'ചെറുശ്ശേരി', textEn: 'Cherusseri' },
            { id: 'd', text: 'കുമാരനാശാൻ', textEn: 'Kumaran Asan' },
          ],
          correct: 'b',
          explanation: 'ശരിയായ ഉത്തരം: തുഞ്ചത്ത് എഴുത്തച്ഛൻ',
          explanationEn: 'Correct answer: Thunchath Ezhuthachan',
        },
        {
          id: 'mal1_q2',
          text: "'മടിയിൽ + ഇരുത്തി' - ഇത് ചേർത്തെഴുതുമ്പോൾ കിട്ടുന്ന പദം ഏത്?",
          textEn: "Which is the correct single word formed by joining 'Madiyil + Iruthi'?",
          options: [
            { id: 'a', text: 'മടിയിരുത്തി', textEn: 'Madiyiruthi' },
            { id: 'b', text: 'മടിയിലുരുത്തി', textEn: 'Madiyiluruthi' },
            { id: 'c', text: 'മടിയലിരുത്തി', textEn: 'Madiyaliruthi' },
            { id: 'd', text: 'മടിയിലിരുത്തി', textEn: 'Madiyiliruthi' },
          ],
          correct: 'd',
          explanation: 'ശരിയായ ഉത്തരം: മടിയിലിരുത്തി',
          explanationEn: 'Correct answer: Madiyiliruthi',
        },
        {
          id: 'mal1_q3',
          text: "'സൂര്യൻ' എന്ന പദത്തിന് സമാനമായ അർത്ഥം വരുന്ന പദം (പര്യായം) ഏതാണ്?",
          textEn: "Which word is a synonym for 'Sooryan' (Sun)?",
          options: [
            { id: 'a', text: 'ഇന്ദു', textEn: 'Indu' },
            { id: 'b', text: 'ശശാങ്കൻ', textEn: 'Shashankan' },
            { id: 'c', text: 'ദിവാകരൻ', textEn: 'Divakaran' },
            { id: 'd', text: 'താരകം', textEn: 'Tharakam' },
          ],
          correct: 'c',
          explanation: 'ശരിയായ ഉത്തരം: ദിവാകരൻ',
          explanationEn: 'Correct answer: Divakaran means Sun.',
        },
        {
          id: 'mal1_q4',
          text: "വിപരീതപദം കണ്ടെത്തുക: 'പ്രകാശം'",
          textEn: "What is the opposite word for 'Prakasam' (Light)?",
          options: [
            { id: 'a', text: 'ശോഭ', textEn: 'Shobha' },
            { id: 'b', text: 'പകൽ', textEn: 'Pakal' },
            { id: 'c', text: 'വെളിച്ചം', textEn: 'Velicham' },
            { id: 'd', text: 'അന്ധകാരം', textEn: 'Andhakaram' },
          ],
          correct: 'd',
          explanation: 'ശരിയായ ഉത്തരം: അന്ധകാരം',
          explanationEn: 'Correct answer: Andhakaram means Darkness.',
        },
        {
          id: 'mal1_q5',
          text: "'മയൂരം' എന്ന വാക്കിന്റെ അർത്ഥം എന്ത്?",
          textEn: "What is the meaning of the word 'Mayooram'?",
          options: [
            { id: 'a', text: 'മയിൽ', textEn: 'Peacock' },
            { id: 'b', text: 'കുയിൽ', textEn: 'Cuckoo' },
            { id: 'c', text: 'കാക്ക', textEn: 'Crow' },
            { id: 'd', text: 'അരയന്നം', textEn: 'Swan' },
          ],
          correct: 'a',
          explanation: 'ശരിയായ ഉത്തരം: മയിൽ',
          explanationEn: 'Correct answer: Peacock (Mayil)',
        },
      ],
    },
    2: {
      title: 'സാഹിത്യവും കവികളും (Literature & Poets)',
      titleEn: 'Literature & Poets',
      questions: [
        {
          id: 'mal2_q1',
          text: "'ജ്ഞാനപ്പാന' രചിച്ചതാര്?",
          textEn: "Who composed the devotional work 'Jnanappana'?",
          options: [
            { id: 'a', text: 'എഴുത്തച്ഛൻ', textEn: 'Ezhuthachan' },
            { id: 'b', text: 'പൂന്താനം', textEn: 'Poonthanam' },
            { id: 'c', text: 'വള്ളത്തോൾ', textEn: 'Vallathol' },
            { id: 'd', text: 'ഉള്ളൂർ', textEn: 'Ulloor' },
          ],
          correct: 'b',
          explanation: 'ശരിയായ ഉത്തരം: പൂന്താനം നമ്പൂതിരി',
          explanationEn: 'Correct answer: Poonthanam Namboothiri',
        },
        {
          id: 'mal2_q2',
          text: "'കേരള വാൽമീകി' എന്നറിയപ്പെടുന്ന കവി ആര്?",
          textEn: "Which renowned poet is honoured as 'Kerala Valmiki'?",
          options: [
            { id: 'a', text: 'ഉള്ളൂർ പരമേശ്വരയ്യർ', textEn: 'Ulloor S. Parameswara Iyer' },
            { id: 'b', text: 'വള്ളത്തോൾ നാരായണമേനോൻ', textEn: 'Vallathol Narayana Menon' },
            { id: 'c', text: 'കുമാരനാശാൻ', textEn: 'Kumaran Asan' },
            { id: 'd', text: 'കുഞ്ചൻ നമ്പ്യാർ', textEn: 'Kunchan Nambiar' },
          ],
          correct: 'b',
          explanation: 'ശരിയായ ഉത്തരം: വള്ളത്തോൾ നാരായണമേനോൻ',
          explanationEn: 'Correct answer: Vallathol Narayana Menon',
        },
        {
          id: 'mal2_q3',
          text: 'തുള്ളൽ പ്രസ്ഥാനത്തിന്റെ ഉപജ്ഞാതാവ് ആര്?',
          textEn: 'Who is the founder of the performing art form Thullal?',
          options: [
            { id: 'a', text: 'കുഞ്ചൻ നമ്പ്യാർ', textEn: 'Kunchan Nambiar' },
            { id: 'b', text: 'ചെറുശ്ശേരി', textEn: 'Cherusseri' },
            { id: 'c', text: 'എഴുത്തച്ഛൻ', textEn: 'Ezhuthachan' },
            { id: 'd', text: 'ഉണ്ണായിവാര്യർ', textEn: 'Unnayi Warrier' },
          ],
          correct: 'a',
          explanation: 'ശരിയായ ഉത്തരം: കുഞ്ചൻ നമ്പ്യാർ',
          explanationEn: 'Correct answer: Kunchan Nambiar',
        },
        {
          id: 'mal2_q4',
          text: "'കുട്ടി' എന്ന പദത്തിന്റെ ബഹുവചനം ഏത്?",
          textEn: "What is the plural form of 'Kutti' (Child)?",
          options: [
            { id: 'a', text: 'കുട്ടിക്കൂട്ടം', textEn: 'Kuttikkoottam' },
            { id: 'b', text: 'കുട്ടിയമ്മ', textEn: 'Kuttiyamma' },
            { id: 'c', text: 'കുട്ടികൾ', textEn: 'Kuttikal' },
            { id: 'd', text: 'കുട്ടിമാർ', textEn: 'Kuttimar' },
          ],
          correct: 'c',
          explanation: 'ശരിയായ ഉത്തരം: കുട്ടികൾ',
          explanationEn: 'Correct answer: Kuttikal',
        },
      ],
    },
    3: {
      title: 'പഴഞ്ചൊല്ലും കടങ്കഥകളും (Riddles & Sayings)',
      titleEn: 'Riddles & Sayings',
      questions: [
        {
          id: 'mal3_q1',
          text: 'ഒരു കടങ്കഥ: "അങ്ങോട്ടും ഇങ്ങോട്ടും പോകും, വഴി കാണില്ല" - ഇതെന്താണ്?',
          textEn: 'Riddle: "Moves back and forth, but leaves no pathway behind" - What is it?',
          options: [
            { id: 'a', text: 'തീവണ്ടി', textEn: 'Train' },
            { id: 'b', text: 'തോണി (വള്ളം)', textEn: 'Boat (Vallam)' },
            { id: 'c', text: 'വിമാനം', textEn: 'Aeroplane' },
            { id: 'd', text: 'കാറ്റ്', textEn: 'Wind' },
          ],
          correct: 'b',
          explanation: 'ശരിയായ ഉത്തരം: തോണി (വള്ളം)',
          explanationEn: 'Correct answer: Boat (Vallam)',
        },
        {
          id: 'mal3_q2',
          text: "'മണ്ണും ചാരി നിന്നവൻ പെണ്ണും കൊണ്ടുപോയി' - ഇതൊരു ________ ആണ്.",
          textEn: "'Mannum chari ninnavan pennum kondupoyi' is a traditional ________.",
          options: [
            { id: 'a', text: 'കടങ്കഥ', textEn: 'Riddle' },
            { id: 'b', text: 'പഴഞ്ചൊല്ല്', textEn: 'Proverb' },
            { id: 'c', text: 'കവിത', textEn: 'Poem' },
            { id: 'd', text: 'ശൈലി', textEn: 'Idiom' },
          ],
          correct: 'b',
          explanation: 'ശരിയായ ഉത്തരം: പഴഞ്ചൊല്ല്',
          explanationEn: 'Correct answer: Proverb (Pazhanchollu)',
        },
        {
          id: 'mal3_q3',
          text: 'കടങ്കഥ: "പച്ചപ്പട്ടണിഞ്ഞ് പാറമേലിരിക്കും, ചൂണ്ടയിട്ടാൽ പിടികിട്ടില്ല" - ഇതാരാണ്?',
          textEn: 'Riddle: "Dressed in green, resting on rocks, cannot be caught with a fishing hook" - What is it?',
          options: [
            { id: 'a', text: 'തവള', textEn: 'Frog' },
            { id: 'b', text: 'പാമ്പ്', textEn: 'Snake' },
            { id: 'c', text: 'പായൽ', textEn: 'Moss (Paayal)' },
            { id: 'd', text: 'ഓന്ത്', textEn: 'Chameleon' },
          ],
          correct: 'c',
          explanation: 'ശരിയായ ഉത്തരം: പായൽ',
          explanationEn: 'Correct answer: Moss (Paayal)',
        },
      ],
    },
  },

  english: {
    1: {
      title: 'Unit 1: Beyond Fear (Multi-Format Discourses & Logic)',
      titleEn: 'Unit 1: Beyond Fear (Multi-Format Discourses & Logic)',
      questions: ENGLISH_UNIT_1_LEVEL_1_QUESTIONS,
    },
    2: {
      title: 'Grammar & Articles',
      titleEn: 'Grammar & Articles',
      questions: [
        {
          id: 'eng2_q1',
          text: "Fill in the blank: 'This is ___ apple.'",
          textEn: "Fill in the blank: 'This is ___ apple.'",
          options: [
            { id: 'a', text: 'a', textEn: 'a' },
            { id: 'b', text: 'an', textEn: 'an' },
            { id: 'c', text: 'the', textEn: 'the' },
            { id: 'd', text: 'two', textEn: 'two' },
          ],
          correct: 'b',
          explanation: "Before a vowel sound (a, e, i, o, u), we use 'an'.",
          explanationEn: "Before a vowel sound (a, e, i, o, u), we use 'an'.",
        },
        {
          id: 'eng2_q2',
          text: "Choose the correct pronoun: '___ is my sister.'",
          textEn: "Choose the correct pronoun: '___ is my sister.'",
          options: [
            { id: 'a', text: 'He', textEn: 'He' },
            { id: 'b', text: 'She', textEn: 'She' },
            { id: 'c', text: 'It', textEn: 'It' },
            { id: 'd', text: 'They', textEn: 'They' },
          ],
          correct: 'b',
          explanation: "For female individuals, we use 'She'.",
          explanationEn: "For female individuals, we use 'She'.",
        },
        {
          id: 'eng2_q3',
          text: "'The cat is sitting ___ the table.' (on top)",
          textEn: "'The cat is sitting ___ the table.' (on top)",
          options: [
            { id: 'a', text: 'on', textEn: 'on' },
            { id: 'b', text: 'in', textEn: 'in' },
            { id: 'c', text: 'at', textEn: 'at' },
            { id: 'd', text: 'between', textEn: 'between' },
          ],
          correct: 'a',
          explanation: "We use 'on' when something is resting on a surface.",
          explanationEn: "We use 'on' when something is resting on a surface.",
        },
      ],
    },
    3: {
      title: 'Rhyming & Riddle Fun',
      titleEn: 'Rhyming & Riddle Fun',
      questions: [
        {
          id: 'eng3_q1',
          text: "Which word rhymes with 'SUN'?",
          textEn: "Which word rhymes with 'SUN'?",
          options: [
            { id: 'a', text: 'Moon', textEn: 'Moon' },
            { id: 'b', text: 'Run', textEn: 'Run' },
            { id: 'c', text: 'Star', textEn: 'Star' },
            { id: 'd', text: 'Sky', textEn: 'Sky' },
          ],
          correct: 'b',
          explanation: 'Sun and Run have matching ending sounds.',
          explanationEn: 'Sun and Run have matching ending sounds.',
        },
        {
          id: 'eng3_q2',
          text: "Riddle: 'I have hands and a face, but I cannot walk. What am I?'",
          textEn: "Riddle: 'I have hands and a face, but I cannot walk. What am I?'",
          options: [
            { id: 'a', text: 'A tree', textEn: 'A tree' },
            { id: 'b', text: 'A clock', textEn: 'A clock' },
            { id: 'c', text: 'A car', textEn: 'A car' },
            { id: 'd', text: 'A book', textEn: 'A book' },
          ],
          correct: 'b',
          explanation: 'A clock has hour/minute hands and a dial face.',
          explanationEn: 'A clock has hour/minute hands and a dial face.',
        },
      ],
    },
  },

  evs: {
    1: {
      title: 'സസ്യലോകം (The World of Plants)',
      titleEn: 'The World of Plants',
      questions: [
        {
          id: 'evs1_q1',
          text: 'സസ്യങ്ങൾ ആഹാരം നിർമ്മിക്കുന്ന പ്രക്രിയ ഏതാണ്?',
          textEn: 'What is the process by which green plants manufacture their own food?',
          options: [
            { id: 'a', text: 'ശ്വസനം', textEn: 'Respiration' },
            { id: 'b', text: 'പ്രകാശസംശ്ലേഷണം', textEn: 'Photosynthesis' },
            { id: 'c', text: 'ബാഷ്പീകരണം', textEn: 'Evaporation' },
            { id: 'd', text: 'ദഹനം', textEn: 'Digestion' },
          ],
          correct: 'b',
          explanation:
            'സൂര്യപ്രകാശത്തിന്റെ സഹായത്തോടെ ഇലകളിൽ നടക്കുന്ന ആഹാര നിർമ്മാണമാണ് പ്രകാശസംശ്ലേഷണം (Photosynthesis).',
          explanationEn:
            'Photosynthesis is the process by which green plants prepare food using sunlight.',
        },
        {
          id: 'evs1_q2',
          text: 'ഇലകൾക്ക് പച്ചനിറം നൽകുന്ന വർണ്ണകം ഏത്?',
          textEn: 'Which pigment gives green colour to plant leaves?',
          options: [
            { id: 'a', text: 'ഹരിതകം (Chlorophyll)', textEn: 'Chlorophyll' },
            { id: 'b', text: 'കരോട്ടിൻ', textEn: 'Carotene' },
            { id: 'c', text: 'മെലാനിൻ', textEn: 'Melanin' },
            { id: 'd', text: 'ഹിമോഗ്ലോബിൻ', textEn: 'Haemoglobin' },
          ],
          correct: 'a',
          explanation: 'ഹരിതകം (ക്ലോറോഫിൽ) ആണ് ഇലകൾക്ക് പച്ച നിറം നൽകുന്നത്.',
          explanationEn: 'Chlorophyll is the green pigment in leaves.',
        },
        {
          id: 'evs1_q3',
          text: 'മണ്ണിൽ നിന്ന് വെള്ളവും ലവണങ്ങളും വലിച്ചെടുക്കുന്നത് ഏത് ഭാഗമാണ്?',
          textEn: 'Which part of the plant absorbs water and minerals from the soil?',
          options: [
            { id: 'a', text: 'തണ്ട്', textEn: 'Stem' },
            { id: 'b', text: 'ഇല', textEn: 'Leaf' },
            { id: 'c', text: 'വേര്', textEn: 'Root' },
            { id: 'd', text: 'പൂവ്', textEn: 'Flower' },
          ],
          correct: 'c',
          explanation: 'വേരുകളാണ് മണ്ണിൽ നിന്ന് ജലവും പോഷകങ്ങളും ആഗിരണം ചെയ്യുന്നത്.',
          explanationEn: 'Roots absorb water and nutrients from the soil.',
        },
      ],
    },
    2: {
      title: 'ജീവലോകം (Animal Kingdom)',
      titleEn: 'Animal Kingdom',
      questions: [
        {
          id: 'evs2_q1',
          text: 'കേരളത്തിന്റെ ഔദ്യോഗിക മൃഗം ഏതാണ്?',
          textEn: 'Which is the state animal of Kerala?',
          options: [
            { id: 'a', text: 'കടുവ', textEn: 'Tiger' },
            { id: 'b', text: 'സിംഹം', textEn: 'Lion' },
            { id: 'c', text: 'ആന', textEn: 'Indian Elephant' },
            { id: 'd', text: 'മാൻ', textEn: 'Deer' },
          ],
          correct: 'c',
          explanation: 'കേരളത്തിന്റെ സംസ്ഥാന മൃഗമാണ് ഇന്ത്യൻ ആന.',
          explanationEn: 'The Indian Elephant is the state animal of Kerala.',
        },
        {
          id: 'evs2_q2',
          text: 'ചിറകുകൾ ഉണ്ടെങ്കിലും പറക്കാൻ കഴിയാത്ത പക്ഷി ഏത്?',
          textEn: 'Which large bird cannot fly despite having wings?',
          options: [
            { id: 'a', text: 'ഒട്ടകപ്പക്ഷി', textEn: 'Ostrich' },
            { id: 'b', text: 'പ്രാവ്', textEn: 'Pigeon' },
            { id: 'c', text: 'മയിൽ', textEn: 'Peacock' },
            { id: 'd', text: 'പരുന്ത്', textEn: 'Eagle' },
          ],
          correct: 'a',
          explanation: 'ഒട്ടകപ്പക്ഷി (Ostrich) പറക്കാൻ കഴിയാത്ത വലിയ പക്ഷിയാണ്.',
          explanationEn: 'The Ostrich is a large flightless bird.',
        },
        {
          id: 'evs2_q3',
          text: 'ചെകിളകൾ ഉപയോഗിച്ച് ശ്വസിക്കുന്ന ജീവി ഏത്?',
          textEn: 'Which creature breathes oxygen using gills?',
          options: [
            { id: 'a', text: 'തവള', textEn: 'Frog' },
            { id: 'b', text: 'മത്സ്യം', textEn: 'Fish' },
            { id: 'c', text: 'ആമ', textEn: 'Turtle' },
            { id: 'd', text: 'മുതല', textEn: 'Crocodile' },
          ],
          correct: 'b',
          explanation: 'മത്സ്യങ്ങൾ ശ്വസിക്കാൻ ഗിൽസ് അഥവാ ചെകിളപ്പൂക്കൾ ഉപയോഗിക്കുന്നു.',
          explanationEn: 'Fish breathe through gills.',
        },
      ],
    },
    3: {
      title: 'പരിസ്ഥിതിയും ആരോഗ്യവും (Health & Nature)',
      titleEn: 'Health & Nature',
      questions: [
        {
          id: 'evs3_q1',
          text: 'നമുക്ക് കാഴ്ചശക്തി നൽകാൻ സഹായിക്കുന്ന ജീവകം (വിറ്റാമിൻ) ഏത്?',
          textEn: 'Which vitamin is essential for maintaining good eyesight?',
          options: [
            { id: 'a', text: 'വിറ്റാമിൻ A', textEn: 'Vitamin A' },
            { id: 'b', text: 'വിറ്റാമിൻ B', textEn: 'Vitamin B' },
            { id: 'c', text: 'വിറ്റാമിൻ C', textEn: 'Vitamin C' },
            { id: 'd', text: 'വിറ്റാമിൻ D', textEn: 'Vitamin D' },
          ],
          correct: 'a',
          explanation:
            'കണ്ണിന്റെ ആരോഗ്യത്തിനും കാഴ്ചയ്ക്കും വിറ്റാമിൻ A അത്യാവശ്യമാണ് (ഉദാ: കാരറ്റ്).',
          explanationEn:
            'Vitamin A is vital for healthy eyesight (found in carrots and papaya).',
        },
        {
          id: 'evs3_q2',
          text: 'ലോക പരിസ്ഥിതി ദിനം എന്ന്?',
          textEn: 'When is World Environment Day celebrated globally?',
          options: [
            { id: 'a', text: 'ജൂൺ 5', textEn: 'June 5' },
            { id: 'b', text: 'നവംബർ 14', textEn: 'November 14' },
            { id: 'c', text: 'ഓഗസ്റ്റ് 15', textEn: 'August 15' },
            { id: 'd', text: 'ജനുവരി 26', textEn: 'January 26' },
          ],
          correct: 'a',
          explanation: 'എല്ലാ വർഷവും ജൂൺ 5 ലോക പരിസ്ഥിതി ദിനമായി ആചരിക്കുന്നു.',
          explanationEn: 'World Environment Day is observed on June 5 every year.',
        },
      ],
    },
  },

  gk: {
    1: {
      title: 'നമ്മുടെ കേരളം (Our Kerala)',
      titleEn: 'Our Kerala',
      questions: [
        {
          id: 'gk1_q1',
          text: 'കേരളത്തിൽ എത്ര ജില്ലകളുണ്ട്?',
          textEn: 'How many districts are there in Kerala?',
          options: [
            { id: 'a', text: '12', textEn: '12' },
            { id: 'b', text: '14', textEn: '14' },
            { id: 'c', text: '16', textEn: '16' },
            { id: 'd', text: '15', textEn: '15' },
          ],
          correct: 'b',
          explanation: 'കേരളത്തിൽ ആകെ 14 ജില്ലകളുണ്ട്.',
          explanationEn: 'There are 14 districts in Kerala.',
        },
        {
          id: 'gk1_q2',
          text: 'കേരളത്തിലെ ഏറ്റവും നീളം കൂടിയ നദി ഏതാണ്?',
          textEn: 'Which is the longest river in Kerala?',
          options: [
            { id: 'a', text: 'ഭാരതപ്പുഴ', textEn: 'Bharathappuzha' },
            { id: 'b', text: 'പെരിയാർ', textEn: 'Periyar' },
            { id: 'c', text: 'പമ്പ', textEn: 'Pamba' },
            { id: 'd', text: 'ചാലിയാർ', textEn: 'Chaliyar' },
          ],
          correct: 'b',
          explanation: 'കേരളത്തിലെ ഏറ്റവും നീളം കൂടിയ നദി പെരിയാർ ആണ് (244 കി.മീ).',
          explanationEn: 'Periyar is the longest river in Kerala (244 km).',
        },
        {
          id: 'gk1_q3',
          text: 'കേരളത്തിന്റെ ഔദ്യോഗിക പക്ഷി ഏതാണ്?',
          textEn: 'Which is the official state bird of Kerala?',
          options: [
            { id: 'a', text: 'മയിൽ', textEn: 'Peacock' },
            { id: 'b', text: 'തത്ത', textEn: 'Parrot' },
            { id: 'c', text: 'വേഴാമ്പൽ (മലമുഴക്കി വേഴാമ്പൽ)', textEn: 'Great Hornbill' },
            { id: 'd', text: 'കുയിൽ', textEn: 'Cuckoo' },
          ],
          correct: 'c',
          explanation: 'കേരളത്തിന്റെ ഔദ്യോഗിക പക്ഷിയാണ് മലമുഴക്കി വേഴാമ്പൽ (Great Hornbill).',
          explanationEn: 'The Great Hornbill is the official state bird of Kerala.',
        },
        {
          id: 'gk1_q4',
          text: 'കേരളത്തിന്റെ തലസ്ഥാനം ഏതാണ്?',
          textEn: 'Which city is the capital of Kerala?',
          options: [
            { id: 'a', text: 'എറണാകുളം', textEn: 'Ernakulam' },
            { id: 'b', text: 'കോഴിക്കോട്', textEn: 'Kozhikode' },
            { id: 'c', text: 'തിരുവനന്തപുരം', textEn: 'Thiruvananthapuram' },
            { id: 'd', text: 'തൃശ്ശൂർ', textEn: 'Thrissur' },
          ],
          correct: 'c',
          explanation: 'കേരളത്തിന്റെ തലസ്ഥാനം തിരുവനന്തപുരം ആണ്.',
          explanationEn: 'Thiruvananthapuram is the capital city of Kerala.',
        },
      ],
    },
    2: {
      title: 'നമ്മുടെ ഭാരതം (Our India)',
      titleEn: 'Our India',
      questions: [
        {
          id: 'gk2_q1',
          text: 'നമ്മുടെ രാഷ്ട്രപിതാവ് ആര്?',
          textEn: 'Who is revered as the Father of our Nation?',
          options: [
            { id: 'a', text: 'ജവഹർലാൽ നെഹ്റു', textEn: 'Jawaharlal Nehru' },
            { id: 'b', text: 'മഹാത്മാഗാന്ധി', textEn: 'Mahatma Gandhi' },
            { id: 'c', text: 'സുഭാഷ് ചന്ദ്രബോസ്', textEn: 'Subhash Chandra Bose' },
            { id: 'd', text: 'ഡോ. ബി.ആർ. അംബേദ്കർ', textEn: 'Dr. B.R. Ambedkar' },
          ],
          correct: 'b',
          explanation: 'ഭാരതത്തിന്റെ രാഷ്ട്രപിതാവാണ് മഹാത്മാഗാന്ധി.',
          explanationEn: 'Mahatma Gandhi is known as the Father of the Nation.',
        },
        {
          id: 'gk2_q2',
          text: 'നമ്മുടെ ദേശീയ ഗാനം ഏത്?',
          textEn: 'Which is the National Anthem of India?',
          options: [
            { id: 'a', text: 'വന്ദേമാതരം', textEn: 'Vande Mataram' },
            { id: 'b', text: 'ജനഗണമന', textEn: 'Jana Gana Mana' },
            { id: 'c', text: 'സാരേ ജഹാം സെ അച്ഛാ', textEn: 'Saare Jahan Se Achha' },
            { id: 'd', text: 'മാതൃഭൂമി ഗീതം', textEn: 'Mathrubhumi Geetham' },
          ],
          correct: 'b',
          explanation: 'രവീന്ദ്രനാഥ ടാഗോർ രചിച്ച ജനഗണമന ആണ് നമ്മുടെ ദേശീയ ഗാനം.',
          explanationEn: 'Jana Gana Mana, written by Rabindranath Tagore, is India’s National Anthem.',
        },
        {
          id: 'gk2_q3',
          text: 'ഭാരതത്തിന്റെ ദേശീയ മൃഗം ഏതാണ്?',
          textEn: 'Which is the national animal of India?',
          options: [
            { id: 'a', text: 'സിംഹം', textEn: 'Asiatic Lion' },
            { id: 'b', text: 'കടുവ (റോയൽ ബംഗാൾ ടൈഗർ)', textEn: 'Royal Bengal Tiger' },
            { id: 'c', text: 'ആന', textEn: 'Elephant' },
            { id: 'd', text: 'ചിറ്റപ്പുലി', textEn: 'Leopard' },
          ],
          correct: 'b',
          explanation: 'റോയൽ ബംഗാൾ ടൈഗർ (കടുവ) ആണ് ഇന്ത്യയുടെ ദേശീയ മൃഗം.',
          explanationEn: 'The Royal Bengal Tiger is India’s national animal.',
        },
      ],
    },
    3: {
      title: 'ലോക വിജ്ഞാനം (General Science & Facts)',
      titleEn: 'General Science & Solar System',
      questions: [
        {
          id: 'gk3_q1',
          text: 'സൗരയൂഥത്തിലെ ഏറ്റവും വലിയ ഗ്രഹം ഏതാണ്?',
          textEn: 'Which is the largest planet in our solar system?',
          options: [
            { id: 'a', text: 'ഭൂമി', textEn: 'Earth' },
            { id: 'b', text: 'വ്യാഴം (Jupiter)', textEn: 'Jupiter' },
            { id: 'c', text: 'ശനി', textEn: 'Saturn' },
            { id: 'd', text: 'ചൊവ്വ', textEn: 'Mars' },
          ],
          correct: 'b',
          explanation: 'സൗരയൂഥത്തിലെ ഏറ്റവും വലിയ ഗ്രഹം വ്യാഴം (Jupiter) ആണ്.',
          explanationEn: 'Jupiter is the largest planet in our solar system.',
        },
        {
          id: 'gk3_q2',
          text: 'ഭൂമിയുടെ ഉപഗ്രഹം ഏതാണ്?',
          textEn: "Which celestial body is Earth's natural satellite?",
          options: [
            { id: 'a', text: 'ചന്ദ്രൻ', textEn: 'The Moon' },
            { id: 'b', text: 'സൂര്യൻ', textEn: 'The Sun' },
            { id: 'c', text: 'വ്യാഴം', textEn: 'Jupiter' },
            { id: 'd', text: 'ധ്രുവനക്ഷത്രം', textEn: 'The Pole Star' },
          ],
          correct: 'a',
          explanation: 'ഭൂമിയുടെ സ്വാഭാവിക ഉപഗ്രഹമാണ് ചന്ദ്രൻ.',
          explanationEn: 'The Moon is the natural satellite of planet Earth.',
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

// Format a level data object according to the selected medium
const localizeLevelData = (data, isEnglish) => {
  if (!data) return null;
  return {
    ...data,
    title: isEnglish && data.titleEn ? data.titleEn : data.title,
    questions: (data.questions || []).map((q) => {
      const base = { ...q };
      if (isEnglish && q.textEn) base.text = q.textEn;
      if (isEnglish && q.explanationEn) base.explanation = q.explanationEn;
      if (Array.isArray(q.options)) {
        base.options = q.options.map((opt) => {
          if (typeof opt === 'object' && opt !== null) {
            return {
              ...opt,
              text: isEnglish && opt.textEn ? opt.textEn : opt.text,
            };
          }
          return opt;
        });
      }
      return base;
    }),
  };
};

// Generates a dynamic Daily Mix quiz from across all categories
const getDailyMixQuestions = (isEnglish = false) => {
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

  const shuffled = [...allQuestions].sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, 5);

  return localizeLevelData(
    {
      title: 'ദിവസേനയുള്ള ചലഞ്ച് (Daily Mix)',
      titleEn: 'Daily Challenge',
      questions: selected,
    },
    isEnglish
  );
};

export const getQuestionsForLevel = (landId, levelId, medium = 'malayalam') => {
  const isEnglish = medium === 'english';

  // Support daily mix
  if (landId === 'daily' || levelId === 'mix') {
    return getDailyMixQuestions(isEnglish);
  }

  // Check custom teacher-created questions first
  const custom = getCustomQuestions(landId, levelId);
  if (custom) return custom;

  const landData = QUESTIONS_DATA[landId];
  if (!landData) return null;

  if (landData[levelId]) {
    return localizeLevelData(landData[levelId], isEnglish);
  }

  // Dynamic Challenge Level: pull from land's existing pool for higher levels
  const allLandQuestions = [];
  Object.values(landData).forEach((lvl) => {
    if (lvl.questions) allLandQuestions.push(...lvl.questions);
  });

  if (allLandQuestions.length > 0) {
    const shuffled = [...allLandQuestions].sort(() => 0.5 - Math.random());
    return localizeLevelData(
      {
        title: `മേഖലാ ചലഞ്ച് (Challenge Level ${levelId})`,
        titleEn: `Challenge Level ${levelId}`,
        questions: shuffled.slice(0, 4),
      },
      isEnglish
    );
  }

  return null;
};
