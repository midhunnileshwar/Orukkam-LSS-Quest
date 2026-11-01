/**
 * Unit 1: Beyond Fear (Kerala Class 4 LSS English Curriculum)
 * Multi-Format Interactive Question Engine Data
 * Supports 20 Unique Interactive Question Styles:
 * - Drag & Drop Blanks
 * - Sequence Builder
 * - Match the Following & Rhyme Connect
 * - Spot the Error (Bubble Pop)
 * - Word Scramble (Train Bogies)
 * - Odd One Out (Swipe Away)
 * - Word Magnets (Sentence Builder)
 * - Missing Letter (Whack-a-Mole)
 * - Syllable Claps
 * - Punctuation Drop
 * - Pronoun Swap
 * - Sentence Expanding
 * - Train Carriage Question Sorter
 * - True / False Statement Slasher
 * - Conversation Branching
 * - Emotion Slider
 * - Story Maze
 * - Dialogue Sticker Drop
 * - MCQ Visual & Logic
 */

export const ENGLISH_UNIT_1_LEVEL_1_QUESTIONS = [
  // --- TYPE 1: DRAG_AND_DROP ---
  {
    type: 'drag_and_drop',
    id: 'eng1_dd1',
    title: 'Emergency Helpline Call',
    text: 'Officer: "101, what\'s your (1)?" Dilna: "Hello, my name is Dilna. My mom is lying still on the (2). I can\'t wake her up." Officer: "Can you tell me your (3)?" Dilna: "I live at 1203, Ramnagar Street in (4)."',
    options: ['floor', 'Cheruvappadi', 'emergency', 'address', 'backyard'],
    correctAnswers: {
      1: 'emergency',
      2: 'floor',
      3: 'address',
      4: 'Cheruvappadi',
    },
    explanation: 'Officer asks for "emergency", Dilna says Mom is on the "floor", Officer asks "address", Dilna lives in "Cheruvappadi".',
  },
  {
    type: 'drag_and_drop',
    id: 'eng1_dd2',
    title: 'Thanking the Fire Station Officer',
    text: 'Dilna: "Hello Madam, I am Dilna calling from (1)." Officer: "Oh! I remember you. What about your (2)? Is she ok now?" Dilna: "Yes, Madam, she is alright. I am very (3) to you." Officer: "It\'s our (4) to help others in emergency situations."',
    options: ['duty', 'thankful', 'Cheruvappadi', 'mother', 'scared'],
    correctAnswers: {
      1: 'Cheruvappadi',
      2: 'mother',
      3: 'thankful',
      4: 'duty',
    },
    explanation: 'Dilna calls from Cheruvappadi, asks about mother, expresses thankfulness, Officer says it is their duty.',
  },
  {
    type: 'drag_and_drop',
    id: 'eng1_dd3',
    title: 'Dilna\'s Happy Diary Entry',
    text: 'Today was a very (1) day. I went to the (2) with Mom and Isaac. The firemen gave me an (3) for my bravery! When Mom was lying on the floor a few days ago, my hands were shaking, but I remembered Grandma\'s advice and dialled (4).',
    options: ['101', 'Fire Station', 'award', 'happy', 'kitchen'],
    correctAnswers: {
      1: 'happy',
      2: 'Fire Station',
      3: 'award',
      4: '101',
    },
    explanation: 'Happy day -> Fire Station visit -> Bravery award -> Dialled 101 helpline.',
  },

  // --- TYPE 2: SEQUENCE_BUILDER ---
  {
    type: 'sequence_builder',
    id: 'eng1_seq1',
    title: 'Rainy Day in the Backyard',
    instruction: 'Arrange these story sentences in the correct order:',
    items: [
      { id: 'A', text: 'They went straight to the kitchen and spotted a plate of cookies on the table.' },
      { id: 'B', text: 'Dilna and her little brother, Isaac, were playing in the backyard of their house.' },
      { id: 'C', text: '"Mom! it\'s raining!" Isaac shouted, but there was no reply.' },
      { id: 'D', text: 'Dilna looked up at the sky and said that they should go inside because it was going to rain.' },
    ],
    correctSequence: ['B', 'D', 'A', 'C'],
    explanation: 'Order: B (playing in backyard) -> D (noticed rain) -> A (ran to kitchen for cookies) -> C (shouted mom it\'s raining).',
  },
  {
    type: 'sequence_builder',
    id: 'eng1_seq2',
    title: 'Tears of Fear in the Living Room',
    instruction: 'Arrange these events in the correct sequence:',
    items: [
      { id: 'A', text: 'Dilna rushed to her mother\'s side and shook her gently, begging her to wake up.' },
      { id: 'B', text: 'Dilna and Isaac ran to the living room and saw their mother lying on the floor.' },
      { id: 'C', text: 'Dilna tried again, shaking her harder, but she still didn\'t respond, and Isaac\'s eyes filled with tears.' },
      { id: 'D', text: '"Why is Mom lying on the floor? Is she sleeping?" Isaac asked his sister and cried.' },
    ],
    correctSequence: ['B', 'D', 'A', 'C'],
    explanation: 'Order: B (ran to living room) -> D (Isaac asked why mom is on floor) -> A (Dilna shook her gently) -> C (shook harder, Isaac cried).',
  },

  // --- TYPE 3: MATCH_THE_FOLLOWING ---
  {
    type: 'match_the_following',
    id: 'eng1_mat1',
    title: 'Characters and Their Dialogues',
    instruction: 'Connect each character with their dialogue:',
    pairs: [
      { left: 'Dilna', right: '"I live at 1203, Ramnagar Street in Cheruvappadi."' },
      { left: 'Isaac', right: '"Why is Mom lying on the floor? Is she sleeping?"' },
      { left: 'Emergency Officer', right: '"101, what\'s your emergency?"' },
      { left: 'Fireman', right: '"Your daughter did a great job. She is a hero."' },
    ],
    explanation: 'Dilna gave address, Isaac asked about mom, Officer answered 101, Fireman praised Dilna as a hero.',
  },
  {
    type: 'match_the_following',
    id: 'eng1_mat2',
    title: 'The Trick of Kichu Dialogues',
    instruction: 'Connect characters with their dialogue:',
    pairs: [
      { left: 'Chinnu', right: '"Please keep this mirror and give me some pumpkins, carrots and beans."' },
      { left: 'Kichu Rabbit', right: '"My friend Jiggu, the wolf, is hiding inside my shop."' },
      { left: 'Kunkan Wolf (angry)', right: '"Hey Kichu, I\'ll crush you and eat you up."' },
      { left: 'Kunkan Wolf (terrified)', right: '"Oh! What a terrible fellow he is! If he comes out, he will finish me."' },
    ],
    explanation: 'Chinnu gave mirror for vegetables, Kichu tricked wolf, Kunkan threatened then fled terrified.',
  },
  {
    type: 'match_the_following',
    id: 'eng1_mat3',
    title: 'Glossary Words & Meanings',
    instruction: 'Connect each word with its meaning:',
    pairs: [
      { left: 'Abroad', right: 'In a foreign country' },
      { left: 'Backyard', right: 'Area of land behind a building' },
      { left: 'Console', right: 'To comfort someone who is sad' },
      { left: 'Emergency', right: 'An urgent situation needing quick help' },
    ],
    explanation: 'Abroad = foreign country, Backyard = behind house, Console = comfort, Emergency = urgent.',
  },

  // --- TYPE 5: SPOT_THE_ERROR (BUBBLE POP) ---
  {
    type: 'spot_the_error',
    id: 'eng1_err1',
    sentence: 'Dilna and her little brother were play in the backyard.',
    wrongWord: 'play',
    correctReplacement: 'playing',
    explanation: 'Continuous past tense with "were": verb takes -ing -> "were playing".',
  },
  {
    type: 'spot_the_error',
    id: 'eng1_err2',
    sentence: 'They went straight to the kitchen and spoted a plate of cookies.',
    wrongWord: 'spoted',
    correctReplacement: 'spotted',
    explanation: 'Spelling rule: single consonant after short vowel doubles -> "spotted".',
  },
  {
    type: 'spot_the_error',
    id: 'eng1_err3',
    sentence: 'Dilna ran to the phone and dialled 101, the emargency helpline number.',
    wrongWord: 'emargency',
    correctReplacement: 'emergency',
    explanation: 'Correct spelling is E-M-E-R-G-E-N-C-Y.',
  },
  {
    type: 'spot_the_error',
    id: 'eng1_err4',
    sentence: 'Kunkan Wolf see his own image in the mirror and ran away.',
    wrongWord: 'see',
    correctReplacement: 'saw',
    explanation: 'Past tense of see is "saw": "Kunkan Wolf saw his own image".',
  },

  // --- TYPE 6: WORD_SCRAMBLE (TRAIN BOGIES) ---
  {
    type: 'word_scramble',
    id: 'eng1_scram1',
    clue: 'An area of land behind a building where Dilna and Isaac were playing.',
    scrambled: ['K', 'C', 'A', 'B', 'D', 'R', 'A', 'Y'],
    correctWord: 'BACKYARD',
    explanation: 'B-A-C-K-Y-A-R-D: The area of land behind a building.',
  },
  {
    type: 'word_scramble',
    id: 'eng1_scram2',
    clue: 'The quality of being fearless like a true hero.',
    scrambled: ['Y', 'R', 'E', 'V', 'A', 'R', 'B'],
    correctWord: 'BRAVERY',
    explanation: 'B-R-A-V-E-R-Y: Courage and fearlessness.',
  },
  {
    type: 'word_scramble',
    id: 'eng1_scram3',
    clue: 'Special clothes worn by everyday heroes like police and firefighters.',
    scrambled: ['M', 'R', 'O', 'F', 'I', 'N', 'U'],
    correctWord: 'UNIFORM',
    explanation: 'U-N-I-F-O-R-M: Distinctive clothing worn by members of a service.',
  },
  {
    type: 'word_scramble',
    id: 'eng1_scram4',
    clue: 'The shiny glass object Chinnu gave to Kichu Rabbit to keep.',
    scrambled: ['R', 'O', 'R', 'R', 'I', 'M'],
    correctWord: 'MIRROR',
    explanation: 'M-I-R-R-O-R: Reflective glass surface.',
  },

  // --- TYPE 7: ODD_ONE_OUT (SWIPE AWAY) ---
  {
    type: 'odd_one_out',
    id: 'eng1_odd1',
    words: ['Carrot', 'Cabbage', 'Pumpkin', 'Cookie'],
    oddOne: 'Cookie',
    instruction: 'Find the ODD ONE OUT:',
    explanation: 'Carrot, cabbage, and pumpkin are fresh vegetables, while a cookie is a baked snack.',
  },
  {
    type: 'odd_one_out',
    id: 'eng1_odd2',
    words: ['Playing', 'Running', 'Climbing', 'Backyard'],
    oddOne: 'Backyard',
    instruction: 'Find the ODD ONE OUT:',
    explanation: 'Playing, running, and climbing are action words (verbs), while backyard is a naming word (noun).',
  },
  {
    type: 'odd_one_out',
    id: 'eng1_odd3',
    words: ['Scared', 'Terrified', 'Frightened', 'Brave'],
    oddOne: 'Brave',
    instruction: 'Find the ODD ONE OUT:',
    explanation: 'Scared, terrified, and frightened describe fear, while brave means fearless.',
  },

  // --- TYPE 8: WORD_MAGNETS (SENTENCE BUILDER) ---
  {
    type: 'word_magnets',
    id: 'eng1_mag1',
    jumbled: ['playing', 'backyard', 'in', 'were', 'the', 'Dilna', 'and', 'Isaac'],
    correctSentence: 'Dilna and Isaac were playing in the backyard.',
    explanation: 'Subject + Verb + Place: Dilna and Isaac were playing in the backyard.',
  },
  {
    type: 'word_magnets',
    id: 'eng1_mag2',
    jumbled: ['spotted', 'table', 'cookies', 'a', 'They', 'of', 'plate', 'on', 'the'],
    correctSentence: 'They spotted a plate of cookies on the table.',
    explanation: 'They spotted a plate of cookies on the table.',
  },
  {
    type: 'word_magnets',
    id: 'eng1_mag3',
    jumbled: ['dialled', 'ran', 'She', 'the', 'to', 'phone', 'and', '101'],
    correctSentence: 'She ran to the phone and dialled 101.',
    explanation: 'She ran to the phone and dialled 101.',
  },

  // --- TYPE 9: MISSING_LETTER (WHACK-A-MOLE) ---
  {
    type: 'missing_letter',
    id: 'eng1_mole1',
    incompleteWord: 'C O _ K I E S',
    missingLetter: 'O',
    options: ['O', 'A', 'E', 'U'],
    explanation: 'C-O-O-K-I-E-S: The missing letter is O.',
  },
  {
    type: 'missing_letter',
    id: 'eng1_mole2',
    incompleteWord: 'B R A V _ R Y',
    missingLetter: 'E',
    options: ['A', 'E', 'I', 'O'],
    explanation: 'B-R-A-V-E-R-Y: The missing letter is E.',
  },
  {
    type: 'missing_letter',
    id: 'eng1_mole3',
    incompleteWord: 'M I R R _ R',
    missingLetter: 'O',
    options: ['E', 'A', 'O', 'U'],
    explanation: 'M-I-R-R-O-R: The missing letter is O.',
  },

  // --- TYPE 10: SYLLABLE_CLAPS ---
  {
    type: 'syllable_claps',
    id: 'eng1_clap1',
    word: 'Emergency',
    syllableBreakdown: 'E - mer - gen - cy',
    syllablesCount: 4,
    explanation: 'E-mer-gen-cy has 4 syllables: E (1), mer (2), gen (3), cy (4).',
  },
  {
    type: 'syllable_claps',
    id: 'eng1_clap2',
    word: 'Bravery',
    syllableBreakdown: 'Bra - ve - ry',
    syllablesCount: 3,
    explanation: 'Bra-ve-ry has 3 syllables: Bra (1), ve (2), ry (3).',
  },
  {
    type: 'syllable_claps',
    id: 'eng1_clap3',
    word: 'Backyard',
    syllableBreakdown: 'Back - yard',
    syllablesCount: 2,
    explanation: 'Back-yard has 2 syllables: Back (1), yard (2).',
  },

  // --- TYPE 11: RHYME_CONNECT ---
  {
    type: 'rhyme_connect',
    id: 'eng1_rhyme1',
    title: 'Poem Rhymes – Everyday Heroes',
    instruction: 'Connect the rhyming word pairs from the poem:',
    pairs: [
      { left: 'All', right: 'Call' },
      { left: 'Serve', right: 'Deserve' },
      { left: 'Hue', right: 'Too' },
      { left: 'Near', right: 'Fear' },
    ],
    explanation: 'All rhymes with Call, Serve with Deserve, Hue with Too, Near with Fear.',
  },

  // --- TYPE 16: TRUE_FALSE_SWIPE (STATEMENT SLASHER) ---
  {
    type: 'true_false_swipe',
    id: 'eng1_tf1',
    speaker: 'Dilna',
    statement: '"Isaac and I were playing in the living room when it started to rain."',
    isTrue: false,
    explanation: 'False: Dilna and Isaac were playing in the backyard of their house.',
  },
  {
    type: 'true_false_swipe',
    id: 'eng1_tf2',
    speaker: 'Dilna',
    statement: '"My father could not come home immediately because he is working abroad."',
    isTrue: true,
    explanation: 'True: Dilna\'s father is working abroad in a foreign country.',
  },
  {
    type: 'true_false_swipe',
    id: 'eng1_tf3',
    speaker: 'Fireman',
    statement: '"We gave Dilna\'s mother some water first to wake her up."',
    isTrue: false,
    explanation: 'False: The firemen gave her first aid to wake her up, and then gave her water.',
  },
  {
    type: 'true_false_swipe',
    id: 'eng1_tf4',
    speaker: 'Robert Longley',
    statement: '"Working dogs are everyday heroes too, just like brave men and women."',
    isTrue: true,
    explanation: 'True: In the poem Everyday Heroes, working dogs bring comfort and aid.',
  },

  // --- TYPE 17: CONVERSATION_BRANCHING ---
  {
    type: 'conversation_branching',
    id: 'eng1_branch1',
    speaker: '101 Emergency Lady Officer',
    prompt: 'The 101 Emergency Officer answers the phone: "101, what\'s your emergency?" What is Dilna\'s best reply?',
    options: [
      { id: 'a', text: '"Hello, my name is Dilna. My mom is lying still on the floor. I can\'t wake her up."' },
      { id: 'b', text: '"Hello, can you please bring some cookies to my kitchen?"' },
    ],
    correct: 'a',
    explanation: 'Dilna states her name and calmly explains that her mother is lying motionless.',
  },
  {
    type: 'conversation_branching',
    id: 'eng1_branch2',
    speaker: 'Fireman Officer',
    prompt: 'One of the firemen praises Dilna: "Your daughter did a great job. She is a hero." How does humble Dilna reply?',
    options: [
      { id: 'a', text: '"Actually, I was scared. I just did what I had to do."' },
      { id: 'b', text: '"Yes, I am the strongest person in the whole world!"' },
    ],
    correct: 'a',
    explanation: 'Dilna humbly replies: "Actually, I was scared. I just did what I had to do."',
  },

  // --- TYPE 18: EMOTION_SLIDER ---
  {
    type: 'emotion_slider',
    id: 'eng1_emo1',
    sentence: '"\'Cookies!\' Isaac said with a big smile as he grabbed one from the plate."',
    emotions: [
      { id: 'happy', label: 'Happy & Joyful', emoji: '😄' },
      { id: 'sad', label: 'Sad & Worried', emoji: '😢' },
      { id: 'scared', label: 'Scared & Terrified', emoji: '😨' },
      { id: 'angry', label: 'Angry & Fierce', emoji: '😠' },
    ],
    correct: 'happy',
    explanation: 'Isaac smiles with joy when he sees the cookies on the table.',
  },
  {
    type: 'emotion_slider',
    id: 'eng1_emo2',
    sentence: '"Dilna shook her a little harder, but she didn\'t respond. Isaac\'s eyes filled with tears."',
    emotions: [
      { id: 'happy', label: 'Happy & Excited', emoji: '😄' },
      { id: 'sad', label: 'Sad & Worried', emoji: '😢' },
      { id: 'scared', label: 'Scared & Terrified', emoji: '😨' },
      { id: 'angry', label: 'Angry & Fierce', emoji: '😠' },
    ],
    correct: 'sad',
    explanation: 'Isaac tears up in deep sadness and worry because his mother will not wake up.',
  },

  // --- TYPE 4: MCQ_VISUAL_OR_LOGIC ---
  {
    type: 'mcq',
    id: 'eng1_mcq1',
    text: 'According to Grandma\'s training, what two details must you speak clearly to the 101 helpline operator?',
    options: [
      { id: 'a', text: 'Favourite food and pet\'s name' },
      { id: 'b', text: 'Your full name and exact address' },
      { id: 'c', text: 'School timetable and age' },
      { id: 'd', text: 'Mother\'s favourite dress colour' },
    ],
    correct: 'b',
    explanation: 'Emergency responders need your name and exact address to locate your house.',
  },
  {
    type: 'mcq',
    id: 'eng1_mcq2',
    text: 'In "The Trick of Kichu", why did Kunkan Wolf scream and run away after looking into the mirror?',
    options: [
      { id: 'a', text: 'A real wolf named Jiggu jumped out' },
      { id: 'b', text: 'Kichu threw pumpkins at him' },
      { id: 'c', text: 'He mistook his own reflection for a fierce wolf named Jiggu' },
      { id: 'd', text: 'The mirror broke into pieces' },
    ],
    correct: 'c',
    explanation: 'Kunkan had never seen a mirror before and thought his own reflection was a ferocious wolf.',
  },
  {
    type: 'mcq',
    id: 'eng1_mcq3',
    text: '"Both of them quickly ran into the house and grabbed a cookie." Which word below means the exact same as "grabbed"?',
    options: [
      { id: 'a', text: 'Dropped slowly' },
      { id: 'b', text: 'Snatched quickly' },
      { id: 'c', text: 'Looked secretly' },
      { id: 'd', text: 'Asked humbly' },
    ],
    correct: 'b',
    explanation: '"Grabbed" means to snatch or take hold of something quickly.',
  },
];
