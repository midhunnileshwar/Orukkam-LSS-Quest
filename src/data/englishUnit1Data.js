/**
 * Unit 1: Beyond Fear (Kerala Class 4 LSS English Curriculum)
 * Complete 200-Question Multi-Format Interactive Question Engine
 * Contains all 20 Types (10 questions each = 200 total), fully interleaved & mixed.
 */

// Helper to interleave arrays round-robin so user gets a varied game type on every question
function interleaveTypes(...arrays) {
  const result = [];
  const maxLen = Math.max(...arrays.map((a) => a.length));
  for (let i = 0; i < maxLen; i++) {
    for (const arr of arrays) {
      if (arr[i]) {
        result.push(arr[i]);
      }
    }
  }
  return result;
}

// -------------------------------------------------------------
// TYPE 1: DRAG_AND_DROP (10 Questions)
// -------------------------------------------------------------
const TYPE_1_DRAG_AND_DROP = [
  {
    type: 'drag_and_drop',
    id: 'u1_t1_q1',
    title: 'Emergency Helpline Call',
    instruction: 'Drag words into the correct blank slots:',
    text: 'Officer: "101, what\'s your (1)?" Dilna: "Hello, my name is Dilna. My mom is lying still on the (2). I can\'t wake her up." Officer: "Can you tell me your (3)?" Dilna: "I live at 1203, Ramnagar Street in (4)."',
    options: ['floor', 'Cheruvappadi', 'emergency', 'address', 'backyard'],
    correctAnswers: { 1: 'emergency', 2: 'floor', 3: 'address', 4: 'Cheruvappadi' },
    explanation: 'Officer asks for "emergency", Dilna says Mom is on the "floor", Officer asks "address", Dilna lives in "Cheruvappadi".',
  },
  {
    type: 'drag_and_drop',
    id: 'u1_t1_q2',
    title: 'Thanking the Fire Station Officer',
    instruction: 'Drag words into the correct blank slots:',
    text: 'Dilna: "Hello Madam, I am Dilna calling from (1)." Officer: "Oh! I remember you. What about your (2)? Is she ok now?" Dilna: "Yes, Madam, she is alright. I am very (3) to you." Officer: "It\'s our (4) to help others in emergency situations."',
    options: ['duty', 'thankful', 'Cheruvappadi', 'mother', 'scared'],
    correctAnswers: { 1: 'Cheruvappadi', 2: 'mother', 3: 'thankful', 4: 'duty' },
    explanation: 'Dilna calls from Cheruvappadi, asks about mother, expresses thankfulness, Officer says it is their duty.',
  },
  {
    type: 'drag_and_drop',
    id: 'u1_t1_q3',
    title: 'Dilna\'s Happy Diary Entry',
    instruction: 'Drag words into the correct blank slots:',
    text: 'Today was a very (1) day. I went to the (2) with Mom and Isaac. The firemen gave me an (3) for my bravery! When Mom was lying on the floor a few days ago, my hands were shaking, but I remembered Grandma\'s advice and dialled (4).',
    options: ['101', 'Fire Station', 'award', 'happy', 'kitchen'],
    correctAnswers: { 1: 'happy', 2: 'Fire Station', 3: 'award', 4: '101' },
    explanation: 'Happy day -> Fire Station visit -> Bravery award -> Dialled 101 helpline.',
  },
  {
    type: 'drag_and_drop',
    id: 'u1_t1_q4',
    title: 'Fire Station Award Notice',
    instruction: 'Drag words into the correct blank slots:',
    text: 'NOTICE: Celebrating Dilna\'s (1)! Date: 10th July 2025 | Time: 10 am (2): Cheruvappadi Fire Station Hall Dear Friends, Join us as we celebrate Dilna, a true (3)! The (4) will be our Chief Guest.',
    options: ['Venue', 'District Collector', 'Bravery', 'hero', 'Headmaster'],
    correctAnswers: { 1: 'Bravery', 2: 'Venue', 3: 'hero', 4: 'District Collector' },
    explanation: 'Celebrating Bravery -> Venue: Cheruvappadi Fire Station -> true hero -> District Collector.',
  },
  {
    type: 'drag_and_drop',
    id: 'u1_t1_q5',
    title: 'Chinnu\'s Barter at the Little Market',
    instruction: 'Drag words into the correct blank slots:',
    text: 'Chinnu: "Oh, my friend Kichu, my father doesn\'t have any (1) with him, but we want some (2)." Kichu: "What are you holding in your hand, Chinnu?" Chinnu: "Please keep this (3) with you and give me some pumpkins, carrots and beans. When my father gets money, I\'ll (4) you and take it back."',
    options: ['mirror', 'money', 'pay', 'vegetables', 'cookies'],
    correctAnswers: { 1: 'money', 2: 'vegetables', 3: 'mirror', 4: 'pay' },
    explanation: 'Father has no money -> want vegetables -> keep this mirror -> will pay you.',
  },
  {
    type: 'drag_and_drop',
    id: 'u1_t1_q6',
    title: 'Kichu\'s Clever Trick on Kunkan Wolf',
    instruction: 'Drag words into the correct blank slots:',
    text: 'Kunkan Wolf: "Hey Kichu, I\'ll (1) you and eat you up." Kichu Rabbit: "My friend, don\'t try your (2) on me. My friend (3), the wolf, is hiding inside my shop. He will smash you into (4)!"',
    options: ['Jiggu', 'crush', 'pieces', 'tricks', 'market'],
    correctAnswers: { 1: 'crush', 2: 'tricks', 3: 'Jiggu', 4: 'pieces' },
    explanation: 'Crush you -> don\'t try tricks -> friend Jiggu -> smash into pieces.',
  },
  {
    type: 'drag_and_drop',
    id: 'u1_t1_q7',
    title: 'Poem Description – Everyday Heroes',
    instruction: 'Drag words into the correct blank slots:',
    text: 'You might see everyday heroes in (1), or maybe not at all. They are always ready to (2) and serve when they get the call. Along with brave men and women, working (3) are heroes too. They help us in the darkest times and take away our (4).',
    options: ['uniform', 'protect', 'dogs', 'fear', 'capes'],
    correctAnswers: { 1: 'uniform', 2: 'protect', 3: 'dogs', 4: 'fear' },
    explanation: 'In uniform -> protect and serve -> working dogs -> take away our fear.',
  },
  {
    type: 'drag_and_drop',
    id: 'u1_t1_q8',
    title: 'Interview with the Janamaithri Police Officer',
    instruction: 'Drag words into the correct blank slots:',
    text: 'Student: "Good morning, Officer! Welcome to our school. What are the main (1) of a Janamaithri Police Officer?" Officer: "We work closely with people to keep our (2) safe and friendly." Student: "What kind of (3) did you have to go through to become a police officer?" Officer: "We had strict physical and mental training to help people in times of (4)."',
    options: ['responsibilities', 'community', 'training', 'emergency', 'market'],
    correctAnswers: { 1: 'responsibilities', 2: 'community', 3: 'training', 4: 'emergency' },
    explanation: 'Responsibilities -> community safe -> training -> times of emergency.',
  },
  {
    type: 'drag_and_drop',
    id: 'u1_t1_q9',
    title: 'Picture Story Description – Priya\'s First Day',
    instruction: 'Drag words into the correct blank slots:',
    text: 'Today is Priya\'s first day at (1) School. Miss (2) introduces Priya to her new classmates. During the break, a kind friend helps Priya eat her food and later passes her the ball to play (3). Priya throws the ball into the hoop, and the (4) honours her with a prize!',
    options: ['ABC', 'Neena', 'basketball', 'Headmaster', 'Collector'],
    correctAnswers: { 1: 'ABC', 2: 'Neena', 3: 'basketball', 4: 'Headmaster' },
    explanation: 'ABC School -> Miss Neena -> play basketball -> Headmaster honours her.',
  },
  {
    type: 'drag_and_drop',
    id: 'u1_t1_q10',
    title: 'Action Words in the Park and Home',
    instruction: 'Drag words into the correct blank slots:',
    text: 'Look at Dilna and Isaac\'s busy day! Dilna is sitting on a stool and (1) a book. Isaac is (2) up a tall tree. On the track, both of them are (3) fast. In the evening, they sit together (4) the TV.',
    options: ['reading', 'climbing', 'running', 'watching', 'sleeping'],
    correctAnswers: { 1: 'reading', 2: 'climbing', 3: 'running', 4: 'watching' },
    explanation: 'Reading a book -> climbing tree -> running fast -> watching TV.',
  },
];

// -------------------------------------------------------------
// TYPE 2: SEQUENCE_BUILDER (10 Questions)
// -------------------------------------------------------------
const TYPE_2_SEQUENCE_BUILDER = [
  {
    type: 'sequence_builder',
    id: 'u1_t2_q1',
    title: 'Rainy Day in the Backyard',
    instruction: 'Arrange these sentences in the correct story sequence:',
    items: [
      { id: 'A', text: 'They went straight to the kitchen and spotted a plate of cookies on the table.' },
      { id: 'B', text: 'Dilna and her little brother, Isaac, were playing in the backyard of their house.' },
      { id: 'C', text: '"Mom! it\'s raining!" Isaac shouted, but there was no reply.' },
      { id: 'D', text: 'Dilna looked up at the sky and said that they should go inside because it was going to rain.' },
    ],
    correctSequence: ['B', 'D', 'A', 'C'],
    explanation: 'Order: B (playing) -> D (noticed rain) -> A (ran inside) -> C (shouted mom).',
  },
  {
    type: 'sequence_builder',
    id: 'u1_t2_q2',
    title: 'Tears of Fear in the Living Room',
    instruction: 'Arrange these sentences in the correct story sequence:',
    items: [
      { id: 'A', text: 'Dilna rushed to her mother\'s side and shook her gently, begging her to wake up.' },
      { id: 'B', text: 'Dilna and Isaac ran to the living room and saw their mother lying on the floor.' },
      { id: 'C', text: 'Dilna tried again, shaking her a little harder, but she still didn\'t respond, and Isaac\'s eyes filled with tears.' },
      { id: 'D', text: '"Why is Mom lying on the floor? Is she sleeping?" Isaac asked his sister and cried.' },
    ],
    correctSequence: ['B', 'D', 'A', 'C'],
    explanation: 'Order: B -> D -> A -> C.',
  },
  {
    type: 'sequence_builder',
    id: 'u1_t2_q3',
    title: 'Remembering Grandma\'s Game',
    instruction: 'Arrange these sentences in the correct story sequence:',
    items: [
      { id: 'A', text: 'She ran to the phone with shaking hands and dialled 101, the helpline number.' },
      { id: 'B', text: 'Dilna felt scared, but as the elder child, she knew she had to stay calm.' },
      { id: 'C', text: 'Dilna realised this wasn\'t a game anymore and knew what she had to do.' },
      { id: 'D', text: 'Suddenly, she remembered the emergency game she used to play with her grandmother.' },
    ],
    correctSequence: ['B', 'D', 'C', 'A'],
    explanation: 'Order: B -> D -> C -> A.',
  },
  {
    type: 'sequence_builder',
    id: 'u1_t2_q4',
    title: 'Speaking to the Emergency Operator',
    instruction: 'Arrange these sentences in the correct story sequence:',
    items: [
      { id: 'A', text: 'The lady asked for her address, and Dilna clearly said, "I live at 1203, Ramnagar Street in Cheruvappadi."' },
      { id: 'B', text: 'A lady\'s voice came on the line and asked, "101, what\'s your emergency?"' },
      { id: 'C', text: 'The lady told Dilna to stay on the phone with her until the firemen arrived, and Dilna agreed.' },
      { id: 'D', text: 'Dilna took a deep breath and explained that her mom was lying still on the floor.' },
    ],
    correctSequence: ['B', 'D', 'A', 'C'],
    explanation: 'Order: B -> D -> A -> C.',
  },
  {
    type: 'sequence_builder',
    id: 'u1_t2_q5',
    title: 'Timely Help from the Firemen',
    instruction: 'Arrange these sentences in the correct story sequence:',
    items: [
      { id: 'A', text: 'The firemen checked her mother, gave her first aid, and gave her some water when she opened her eyes.' },
      { id: 'B', text: 'Dilna heard the siren of the approaching fire engine and a knock at the door.' },
      { id: 'C', text: 'One of the firemen praised Dilna and told her mother, "Your daughter did a great job. She is a hero."' },
      { id: 'D', text: 'Dilna opened the door, and two firemen rushed in and followed her to the living room.' },
    ],
    correctSequence: ['B', 'D', 'A', 'C'],
    explanation: 'Order: B -> D -> A -> C.',
  },
  {
    type: 'sequence_builder',
    id: 'u1_t2_q6',
    title: 'Full Story Summary – Little Hands, Big Courage',
    instruction: 'Arrange these summary points in order:',
    items: [
      { id: 'A', text: 'Dilna rushed to her mother and shook her gently.' },
      { id: 'B', text: 'Dilna and her little brother were playing in the backyard and spotted a plate of cookies inside.' },
      { id: 'C', text: 'Two firemen rushed into the house, helped the mother, and later invited Dilna to receive an award.' },
      { id: 'D', text: 'She ran to the phone and dialled 101.' },
    ],
    correctSequence: ['B', 'A', 'D', 'C'],
    explanation: 'Order: B -> A -> D -> C.',
  },
  {
    type: 'sequence_builder',
    id: 'u1_t2_q7',
    title: 'Chinnu Visits Kichu\'s Shop',
    instruction: 'Arrange these sentences in order:',
    items: [
      { id: 'A', text: 'Kichu took the mirror, placed it in a corner of the shop, and gave Chinnu all the vegetables she wanted.' },
      { id: 'B', text: 'Kichu the rabbit was a well-known vegetable merchant in the Little Market.' },
      { id: 'C', text: 'Later, Kichu looked into the mirror, admired his handsome image, and started dancing with joy.' },
      { id: 'D', text: 'One day, a little girl named Chinnu came to his shop with a mirror because her father had no money.' },
    ],
    correctSequence: ['B', 'D', 'A', 'C'],
    explanation: 'Order: B -> D -> A -> C.',
  },
  {
    type: 'sequence_builder',
    id: 'u1_t2_q8',
    title: 'Kichu Outsmarts Kunkan Wolf',
    instruction: 'Arrange these sentences in order:',
    items: [
      { id: 'A', text: 'Kichu picked up the mirror, held it to Kunkan\'s face, and said, "Look here; he is Jiggu."' },
      { id: 'B', text: 'Kunkan Wolf came to Kichu\'s shop and threatened to crush and eat him up.' },
      { id: 'C', text: 'Seeing his own reflection, Kunkan thought it was another wolf and ran away, never to return.' },
      { id: 'D', text: 'Clever Kichu told Kunkan that a fierce wolf named Jiggu was hiding inside his shop.' },
    ],
    correctSequence: ['B', 'D', 'A', 'C'],
    explanation: 'Order: B -> D -> A -> C.',
  },
  {
    type: 'sequence_builder',
    id: 'u1_t2_q9',
    title: 'Priya\'s First Day at School',
    instruction: 'Arrange these sentences in order:',
    items: [
      { id: 'A', text: 'Priya\'s new friend helped her eat lunch and passed her the ball on the basketball court.' },
      { id: 'B', text: 'Priya\'s mom dropped her at ABC School, and Miss Neena introduced her to the classmates.' },
      { id: 'C', text: 'The Headmaster honoured Priya with a prize for her wonderful performance.' },
      { id: 'D', text: 'Priya threw the basketball into the hoop and scored a point.' },
    ],
    correctSequence: ['B', 'A', 'D', 'C'],
    explanation: 'Order: B -> A -> D -> C.',
  },
  {
    type: 'sequence_builder',
    id: 'u1_t2_q10',
    title: 'Preparing a Programme Notice',
    instruction: 'Arrange the layout steps of a school notice in order:',
    items: [
      { id: 'A', text: 'Write the body of the notice inviting everyone and mentioning the Chief Guest.' },
      { id: 'B', text: 'Write the heading \'NOTICE\' and the main title of the programme at the top.' },
      { id: 'C', text: 'Put the place, date of issue, and the designation of the person issuing the notice at the bottom.' },
      { id: 'D', text: 'Mention the Date, Time, and Venue of the event clearly below the title.' },
    ],
    correctSequence: ['B', 'D', 'A', 'C'],
    explanation: 'Standard Notice structure: Header (B) -> Date/Time/Venue (D) -> Body (A) -> Signatory (C).',
  },
];

// -------------------------------------------------------------
// TYPE 3: MATCH_THE_FOLLOWING (10 Questions)
// -------------------------------------------------------------
const TYPE_3_MATCH_THE_FOLLOWING = [
  {
    type: 'match_the_following',
    id: 'u1_t3_q1',
    title: 'Characters and Their Dialogues (Little Hands, Big Courage)',
    pairs: [
      { left: 'Dilna', right: '"I live at 1203, Ramnagar Street in Cheruvappadi."' },
      { left: 'Isaac', right: '"Why is Mom lying on the floor? Is she sleeping?"' },
      { left: 'Emergency Lady Officer', right: '"101, what\'s your emergency?"' },
      { left: 'Fireman', right: '"Your daughter did a great job. She is a hero."' },
    ],
    explanation: 'Dilna gives address, Isaac asks about mom, Lady officer answers 101, Fireman praises Dilna.',
  },
  {
    type: 'match_the_following',
    id: 'u1_t3_q2',
    title: 'Characters and Dialogues (The Trick of Kichu)',
    pairs: [
      { left: 'Chinnu', right: '"Please keep this mirror and give me some pumpkins, carrots and beans."' },
      { left: 'Kichu Rabbit', right: '"My friend Jiggu, the wolf, is hiding inside my shop."' },
      { left: 'Kunkan Wolf (angry)', right: '"Hey Kichu, I\'ll crush you and eat you up."' },
      { left: 'Kunkan Wolf (terrified)', right: '"Oh! What a terrible fellow he is! If he comes out, he will finish me."' },
    ],
    explanation: 'Chinnu barters mirror, Kichu tricks wolf, Kunkan threatens then panics.',
  },
  {
    type: 'match_the_following',
    id: 'u1_t3_q3',
    title: 'Glossary Words and Meanings (Set 1)',
    pairs: [
      { left: 'Abroad', right: 'In a foreign country' },
      { left: 'Backyard', right: 'Area of land behind a building' },
      { left: 'Console', right: 'To comfort someone' },
      { left: 'Emergency', right: 'An urgent situation' },
    ],
    explanation: 'Abroad: foreign country; Backyard: behind house; Console: comfort; Emergency: urgent situation.',
  },
  {
    type: 'match_the_following',
    id: 'u1_t3_q4',
    title: 'Glossary Words and Meanings (Set 2)',
    pairs: [
      { left: 'Grab', right: 'To snatch something quickly' },
      { left: 'Approach', right: 'To come near' },
      { left: 'Spot', right: 'To see or notice something' },
      { left: 'Bravery', right: 'The quality of being fearless' },
    ],
    explanation: 'Grab: snatch; Approach: come near; Spot: notice; Bravery: fearlessness.',
  },
  {
    type: 'match_the_following',
    id: 'u1_t3_q5',
    title: 'Glossary Words and Meanings (Set 3)',
    pairs: [
      { left: 'Admit', right: 'To agree' },
      { left: 'Beg', right: 'To ask humbly for something' },
      { left: 'Pretend', right: 'To make others believe something' },
      { left: 'Realise', right: 'To understand a situation' },
    ],
    explanation: 'Admit: agree; Beg: ask humbly; Pretend: make believe; Realise: understand.',
  },
  {
    type: 'match_the_following',
    id: 'u1_t3_q6',
    title: 'Rhyming Words from the Poem \'Everyday Heroes\'',
    pairs: [
      { left: 'All', right: 'Call' },
      { left: 'Serve', right: 'Deserve' },
      { left: 'Hue', right: 'Too' },
      { left: 'Near', right: 'Fear' },
    ],
    explanation: 'All-Call, Serve-Deserve, Hue-Too, Near-Fear are the rhyming pairs.',
  },
  {
    type: 'match_the_following',
    id: 'u1_t3_q7',
    title: 'Heroes and Their Roles in Unit 1',
    pairs: [
      { left: 'Mahatma Gandhi', right: 'Inspired and led others in the struggle for independence' },
      { left: 'Firefighters', right: 'Gave first aid to Dilna\'s mother and helped her recover' },
      { left: 'Working Dogs', right: 'Everyday heroes who bring help and comfort in dark times' },
      { left: 'Kichu the Rabbit', right: 'Saved the animals in the Little Market using quick thinking' },
    ],
    explanation: 'Key characters and their heroic contributions in Unit 1.',
  },
  {
    type: 'match_the_following',
    id: 'u1_t3_q8',
    title: 'Notice Details – Honouring Our Little Hero (GLPS Sreepuram)',
    pairs: [
      { left: 'Recipient of Award', right: 'Shruthi' },
      { left: 'Name of Award', right: 'Ujwala Balyam Award' },
      { left: 'Venue of Programme', right: 'School Auditorium, GLPS Sreepuram' },
      { left: 'Inaugurated by', right: 'Honourable Minister for Education' },
    ],
    explanation: 'Notice conventions from the unit text.',
  },
  {
    type: 'match_the_following',
    id: 'u1_t3_q9',
    title: 'Naming Words and Their Categories',
    pairs: [
      { left: 'Cheruvappadi', right: 'Name of a place' },
      { left: 'Rabbit', right: 'Name of an animal' },
      { left: 'Cookie', right: 'Name of a thing' },
      { left: 'Grandmother', right: 'Name of a person' },
    ],
    explanation: 'Noun categorization: Place, Animal, Thing, Person.',
  },
  {
    type: 'match_the_following',
    id: 'u1_t3_q10',
    title: 'Opposite Meanings (Antonyms from Unit Context)',
    pairs: [
      { left: 'Fear', right: 'Courage / Bravery' },
      { left: 'Elder', right: 'Younger / Little' },
      { left: 'Safe', right: 'Dangerously / In danger' },
      { left: 'Gently', right: 'Harder / Roughly' },
    ],
    explanation: 'Fear-Courage, Elder-Younger, Safe-Danger, Gently-Roughly.',
  },
];

// -------------------------------------------------------------
// TYPE 4: MCQ_VISUAL_OR_LOGIC (10 Questions)
// -------------------------------------------------------------
const TYPE_4_MCQ = [
  {
    type: 'mcq',
    id: 'u1_t4_q1',
    text: 'According to Grandma\'s training, what are the two most important details you must speak clearly to the helpline operator?',
    options: [
      { id: 'a', text: 'Your favourite food and school name' },
      { id: 'b', text: 'Your full name and exact address' },
      { id: 'c', text: 'The colour of your house and pet name' },
      { id: 'd', text: 'Your friend\'s phone number' },
    ],
    correct: 'b',
    explanation: 'Name and exact address are essential so emergency responders can find the location immediately.',
  },
  {
    type: 'mcq',
    id: 'u1_t4_q2',
    text: 'Why couldn\'t Dilna\'s father come home immediately to help when Dilna\'s mother fell unconscious on the floor?',
    options: [
      { id: 'a', text: 'He was working at the Little Market' },
      { id: 'b', text: 'He was working abroad in a foreign country' },
      { id: 'c', text: 'He was visiting the Fire Station' },
      { id: 'd', text: 'He was sleeping in the backyard' },
    ],
    correct: 'b',
    explanation: 'Dilna\'s father is working abroad in a foreign country.',
  },
  {
    type: 'mcq',
    id: 'u1_t4_q3',
    text: 'When Kunkan Wolf looked into the mirror held by Kichu Rabbit, why did Kunkan scream and run away?',
    options: [
      { id: 'a', text: 'Kichu painted a scary monster on the glass' },
      { id: 'b', text: 'A real wolf named Jiggu jumped out' },
      { id: 'c', text: 'He had never seen a mirror before and mistook his own reflection for Jiggu Wolf' },
      { id: 'd', text: 'The mirror broke into sharp pieces' },
    ],
    correct: 'c',
    explanation: 'Kunkan had never seen a mirror before and mistook his angry face for another fierce wolf.',
  },
  {
    type: 'mcq',
    id: 'u1_t4_q4',
    text: '"Both of them quickly ran into the house and grabbed a cookie." Which word below means the exact same as "grabbed"?',
    options: [
      { id: 'a', text: 'Dropped slowly' },
      { id: 'b', text: 'Snatched quickly' },
      { id: 'c', text: 'Looked secretly' },
      { id: 'd', text: 'Asked humbly' },
    ],
    correct: 'b',
    explanation: '"Grabbed" means snatched or taken quickly with the hand.',
  },
  {
    type: 'mcq',
    id: 'u1_t4_q5',
    text: 'Look at the notice issued by the Headmaster of GLPS Sreepuram. Why was Shruthi selected for the Ujwala Balyam Award?',
    options: [
      { id: 'a', text: 'For winning a basketball match in a wheelchair' },
      { id: 'b', text: 'For calling 101 during a house fire' },
      { id: 'c', text: 'For developing a Learning App for self-study' },
      { id: 'd', text: 'For writing a poem about working dogs' },
    ],
    correct: 'c',
    explanation: 'Shruthi developed an educational Learning App for self-study.',
  },
  {
    type: 'mcq',
    id: 'u1_t4_q6',
    text: 'In Robert Longley\'s poem "Everyday Heroes", what does the line "You might see them in uniform / Or maybe not at all" mean?',
    options: [
      { id: 'a', text: 'Heroes are invisible ghosts' },
      { id: 'b', text: 'Only people in uniforms can be heroes' },
      { id: 'c', text: 'Some heroes wear uniforms, while many ordinary citizens and animals help without any uniform' },
      { id: 'd', text: 'Heroes only work at night' },
    ],
    correct: 'c',
    explanation: 'Everyday heroes include ordinary citizens and working animals alongside uniformed service personnel.',
  },
  {
    type: 'mcq',
    id: 'u1_t4_q7',
    text: '"Dilna rushed to her mother and shook her gently." Which pair of words from this sentence are ACTION words (verbs)?',
    options: [
      { id: 'a', text: 'Dilna, mother' },
      { id: 'b', text: 'rushed, shook' },
      { id: 'c', text: 'her, gently' },
      { id: 'd', text: 'to, and' },
    ],
    correct: 'b',
    explanation: '"Rushed" and "shook" are verbs depicting actions.',
  },
  {
    type: 'mcq',
    id: 'u1_t4_q8',
    text: 'In "The Trick of Kichu", Chinnu gives a mirror to Kichu until her father gets money. What does this show about Kichu?',
    options: [
      { id: 'a', text: 'Kichu is greedy and only wants mirrors' },
      { id: 'b', text: 'Kichu is a kind and trusting merchant who helps friends in need' },
      { id: 'c', text: 'Kichu does not like selling vegetables' },
      { id: 'd', text: 'Kichu wanted to trick Chinnu' },
    ],
    correct: 'b',
    explanation: 'Kichu is compassionate and trusts his neighbors in difficult times.',
  },
  {
    type: 'mcq',
    id: 'u1_t4_q9',
    text: 'On the opening page of Unit 1, a young boy is out in heavy rain while others watch. What heroic action is he doing?',
    options: [
      { id: 'a', text: 'Sailing paper boats in muddy water' },
      { id: 'b', text: 'Pushing a fallen tree off the road despite the rain' },
      { id: 'c', text: 'Looking for a lost puppy near a bus' },
      { id: 'd', text: 'Selling bananas at a roadside shop' },
    ],
    correct: 'b',
    explanation: 'He clears a fallen tree branch blocking the roadway, showing civic courage.',
  },
  {
    type: 'mcq',
    id: 'u1_t4_q10',
    text: 'Which character from Unit 1 proves Mahatma Gandhi\'s quote that intelligence and wit are stronger than physical force?',
    options: [
      { id: 'a', text: 'Kunkan Wolf' },
      { id: 'b', text: 'Kichu the Rabbit, who outsmarted the fierce wolf with a mirror' },
      { id: 'c', text: 'Isaac, who cried on the floor' },
      { id: 'd', text: 'The donkey who ran away' },
    ],
    correct: 'b',
    explanation: 'Kichu used a simple mirror and quick thinking to defeat the physically stronger wolf.',
  },
];

// -------------------------------------------------------------
// TYPE 5: SPOT_THE_ERROR (10 Questions)
// -------------------------------------------------------------
const TYPE_5_SPOT_ERROR = [
  {
    type: 'spot_the_error',
    id: 'u1_t5_q1',
    sentence: 'Dilna and her little brother were play in the backyard.',
    wrongWord: 'play',
    correctReplacement: 'playing',
    explanation: 'Past continuous takes -ing with were: "were playing".',
  },
  {
    type: 'spot_the_error',
    id: 'u1_t5_q2',
    sentence: 'They went straight to the kitchen and spoted a plate of cookies.',
    wrongWord: 'spoted',
    correctReplacement: 'spotted',
    explanation: 'Spelling rule: "spotted" has double \'t\'.',
  },
  {
    type: 'spot_the_error',
    id: 'u1_t5_q3',
    sentence: 'Mother were lying still on the living room floor.',
    wrongWord: 'were',
    correctReplacement: 'was',
    explanation: 'Singular subject "Mother" takes "was", not "were".',
  },
  {
    type: 'spot_the_error',
    id: 'u1_t5_q4',
    sentence: 'Dilna ran to the phone and dialled 101, the emargency helpline number.',
    wrongWord: 'emargency',
    correctReplacement: 'emergency',
    explanation: 'Correct spelling is E-M-E-R-G-E-N-C-Y.',
  },
  {
    type: 'spot_the_error',
    id: 'u1_t5_q5',
    sentence: 'Two fireman rushed into the house and gave her mother first aid.',
    wrongWord: 'fireman',
    correctReplacement: 'firemen',
    explanation: 'Plural of fireman is "firemen".',
  },
  {
    type: 'spot_the_error',
    id: 'u1_t5_q6',
    sentence: 'Dilna\'s father is working abrod in a foreign country.',
    wrongWord: 'abrod',
    correctReplacement: 'abroad',
    explanation: 'Correct spelling is A-B-R-O-A-D.',
  },
  {
    type: 'spot_the_error',
    id: 'u1_t5_q7',
    sentence: 'Kichu the rabbit was a well-known vegitable merchant in the Little Market.',
    wrongWord: 'vegitable',
    correctReplacement: 'vegetable',
    explanation: 'Correct spelling is V-E-G-E-T-A-B-L-E.',
  },
  {
    type: 'spot_the_error',
    id: 'u1_t5_q8',
    sentence: 'Kunkan Wolf see his own image in the mirror and ran away.',
    wrongWord: 'see',
    correctReplacement: 'saw',
    explanation: 'Past tense of see is "saw".',
  },
  {
    type: 'spot_the_error',
    id: 'u1_t5_q9',
    sentence: 'Isaac is climping the tree while Dilna is reading a book.',
    wrongWord: 'climping',
    correctReplacement: 'climbing',
    explanation: 'Correct spelling is C-L-I-M-B-I-N-G.',
  },
  {
    type: 'spot_the_error',
    id: 'u1_t5_q10',
    sentence: 'Everyday heroes are a simbol of devotion and respect that they deserve.',
    wrongWord: 'simbol',
    correctReplacement: 'symbol',
    explanation: 'Correct spelling is S-Y-M-B-O-L.',
  },
];

// -------------------------------------------------------------
// TYPE 6: WORD_SCRAMBLE (10 Questions)
// -------------------------------------------------------------
const TYPE_6_WORD_SCRAMBLE = [
  {
    type: 'word_scramble',
    id: 'u1_t6_q1',
    clue: 'An area of land behind a building where Dilna and Isaac played.',
    scrambled: ['K', 'C', 'A', 'B', 'D', 'R', 'A', 'Y'],
    correctWord: 'BACKYARD',
    explanation: 'B-A-C-K-Y-A-R-D.',
  },
  {
    type: 'word_scramble',
    id: 'u1_t6_q2',
    clue: 'In a foreign country, where Dilna\'s father is working.',
    scrambled: ['D', 'A', 'O', 'R', 'B', 'A'],
    correctWord: 'ABROAD',
    explanation: 'A-B-R-O-A-D.',
  },
  {
    type: 'word_scramble',
    id: 'u1_t6_q3',
    clue: 'To comfort someone when they are sad or crying.',
    scrambled: ['E', 'L', 'O', 'S', 'N', 'O', 'C'],
    correctWord: 'CONSOLE',
    explanation: 'C-O-N-S-O-L-E.',
  },
  {
    type: 'word_scramble',
    id: 'u1_t6_q4',
    clue: 'An urgent situation where you need to call 101 for help.',
    scrambled: ['Y', 'C', 'N', 'E', 'G', 'R', 'E', 'M', 'E'],
    correctWord: 'EMERGENCY',
    explanation: 'E-M-E-R-G-E-N-C-Y.',
  },
  {
    type: 'word_scramble',
    id: 'u1_t6_q5',
    clue: 'The quality of being fearless like a true hero.',
    scrambled: ['Y', 'R', 'E', 'V', 'A', 'R', 'B'],
    correctWord: 'BRAVERY',
    explanation: 'B-R-A-V-E-R-Y.',
  },
  {
    type: 'word_scramble',
    id: 'u1_t6_q6',
    clue: 'People who fight fires and rescue others in emergencies.',
    scrambled: ['N', 'E', 'M', 'E', 'R', 'I', 'F'],
    correctWord: 'FIREMEN',
    explanation: 'F-I-R-E-M-E-N.',
  },
  {
    type: 'word_scramble',
    id: 'u1_t6_q7',
    clue: 'Special clothes worn by everyday heroes like police and firefighters.',
    scrambled: ['M', 'R', 'O', 'F', 'I', 'N', 'U'],
    correctWord: 'UNIFORM',
    explanation: 'U-N-I-F-O-R-M.',
  },
  {
    type: 'word_scramble',
    id: 'u1_t6_q8',
    clue: 'The shiny glass object Chinnu gave to Kichu Rabbit to keep.',
    scrambled: ['R', 'O', 'R', 'R', 'I', 'M'],
    correctWord: 'MIRROR',
    explanation: 'M-I-R-R-O-R.',
  },
  {
    type: 'word_scramble',
    id: 'u1_t6_q9',
    clue: 'A person who sells goods, like Kichu who sold vegetables in the market.',
    scrambled: ['T', 'N', 'A', 'H', 'C', 'R', 'E', 'M'],
    correctWord: 'MERCHANT',
    explanation: 'M-E-R-C-H-A-N-T.',
  },
  {
    type: 'word_scramble',
    id: 'u1_t6_q10',
    clue: 'Great love, loyalty, and dedication shown by everyday heroes.',
    scrambled: ['N', 'O', 'I', 'T', 'O', 'V', 'E', 'D'],
    correctWord: 'DEVOTION',
    explanation: 'D-E-V-O-T-I-O-N.',
  },
];

// -------------------------------------------------------------
// TYPE 7: ODD_ONE_OUT (10 Questions)
// -------------------------------------------------------------
const TYPE_7_ODD_ONE_OUT = [
  {
    type: 'odd_one_out',
    id: 'u1_t7_q1',
    words: ['Carrot', 'Cabbage', 'Pumpkin', 'Cookie'],
    oddOne: 'Cookie',
    instruction: 'Find the ODD ONE OUT:',
    explanation: 'Carrot, cabbage, and pumpkin are vegetables; cookie is a baked snack.',
  },
  {
    type: 'odd_one_out',
    id: 'u1_t7_q2',
    words: ['Playing', 'Running', 'Climbing', 'Backyard'],
    oddOne: 'Backyard',
    instruction: 'Find the ODD ONE OUT:',
    explanation: 'Playing, running, and climbing are verbs; backyard is a noun.',
  },
  {
    type: 'odd_one_out',
    id: 'u1_t7_q3',
    words: ['Dilna', 'Isaac', 'Cheruvappadi', 'Shruthi'],
    oddOne: 'Cheruvappadi',
    instruction: 'Find the ODD ONE OUT:',
    explanation: 'Dilna, Isaac, and Shruthi are names of people; Cheruvappadi is a place.',
  },
  {
    type: 'odd_one_out',
    id: 'u1_t7_q4',
    words: ['Deer', 'Rabbit', 'Donkey', 'Mirror'],
    oddOne: 'Mirror',
    instruction: 'Find the ODD ONE OUT:',
    explanation: 'Deer, rabbit, and donkey are living animals; mirror is a non-living object.',
  },
  {
    type: 'odd_one_out',
    id: 'u1_t7_q5',
    words: ['Backyard', 'Kitchen', 'Living room', 'Siren'],
    oddOne: 'Siren',
    instruction: 'Find the ODD ONE OUT:',
    explanation: 'Backyard, kitchen, and living room are rooms/areas; siren is a sound.',
  },
  {
    type: 'odd_one_out',
    id: 'u1_t7_q6',
    words: ['Scared', 'Terrified', 'Frightened', 'Brave'],
    oddOne: 'Brave',
    instruction: 'Find the ODD ONE OUT:',
    explanation: 'Scared, terrified, and frightened describe fear; brave means fearless.',
  },
  {
    type: 'odd_one_out',
    id: 'u1_t7_q7',
    words: ['Firefighters', 'Police officers', 'Doctors', 'Kunkan Wolf'],
    oddOne: 'Kunkan Wolf',
    instruction: 'Find the ODD ONE OUT:',
    explanation: 'Firefighters, police, and doctors are community helpers; Kunkan Wolf is a villain.',
  },
  {
    type: 'odd_one_out',
    id: 'u1_t7_q8',
    words: ['Grab', 'Shake', 'Dial', 'Door'],
    oddOne: 'Door',
    instruction: 'Find the ODD ONE OUT:',
    explanation: 'Grab, shake, and dial are verbs; door is a noun.',
  },
  {
    type: 'odd_one_out',
    id: 'u1_t7_q9',
    words: ['All', 'Call', 'Fear', 'Fall'],
    oddOne: 'Fear',
    instruction: 'Find the ODD ONE OUT:',
    explanation: 'All, call, and fall rhyme (-all); fear has a different ending sound.',
  },
  {
    type: 'odd_one_out',
    id: 'u1_t7_q10',
    words: ['Spinach', 'Bitter gourd', 'Beans', 'Wheelchair'],
    oddOne: 'Wheelchair',
    instruction: 'Find the ODD ONE OUT:',
    explanation: 'Spinach, bitter gourd, and beans are vegetables; wheelchair is mobility equipment.',
  },
];

// -------------------------------------------------------------
// TYPE 8: WORD_MAGNETS (10 Questions)
// -------------------------------------------------------------
const TYPE_8_WORD_MAGNETS = [
  {
    type: 'word_magnets',
    id: 'u1_t8_q1',
    jumbled: ['playing', 'backyard', 'in', 'were', 'the', 'Dilna', 'and', 'Isaac'],
    correctSentence: 'Dilna and Isaac were playing in the backyard.',
    explanation: 'Dilna and Isaac were playing in the backyard.',
  },
  {
    type: 'word_magnets',
    id: 'u1_t8_q2',
    jumbled: ['spotted', 'table', 'cookies', 'a', 'They', 'of', 'plate', 'on', 'the'],
    correctSentence: 'They spotted a plate of cookies on the table.',
    explanation: 'They spotted a plate of cookies on the table.',
  },
  {
    type: 'word_magnets',
    id: 'u1_t8_q3',
    jumbled: ['lying', 'floor', 'Mother', 'on', 'was', 'the'],
    correctSentence: 'Mother was lying on the floor.',
    explanation: 'Mother was lying on the floor.',
  },
  {
    type: 'word_magnets',
    id: 'u1_t8_q4',
    jumbled: ['dialled', 'ran', 'She', 'the', 'to', 'phone', 'and', '101'],
    correctSentence: 'She ran to the phone and dialled 101.',
    explanation: 'She ran to the phone and dialled 101.',
  },
  {
    type: 'word_magnets',
    id: 'u1_t8_q5',
    jumbled: ['abroad', 'working', 'He', 'is'],
    correctSentence: 'He is working abroad.',
    explanation: 'He is working abroad.',
  },
  {
    type: 'word_magnets',
    id: 'u1_t8_q6',
    jumbled: ['rushed', 'house', 'Two', 'the', 'firemen', 'into'],
    correctSentence: 'Two firemen rushed into the house.',
    explanation: 'Two firemen rushed into the house.',
  },
  {
    type: 'word_magnets',
    id: 'u1_t8_q7',
    jumbled: ['gave', 'first', 'mother', 'The', 'her', 'firemen', 'aid'],
    correctSentence: 'The firemen gave her mother first aid.',
    explanation: 'The firemen gave her mother first aid.',
  },
  {
    type: 'word_magnets',
    id: 'u1_t8_q8',
    jumbled: ['invited', 'Station', 'Dilna', 'Fire', 'was', 'the', 'to'],
    correctSentence: 'Dilna was invited to the Fire Station.',
    explanation: 'Dilna was invited to the Fire Station.',
  },
  {
    type: 'word_magnets',
    id: 'u1_t8_q9',
    jumbled: ['mirror', 'Kichu', 'from', 'the', 'took', 'her'],
    correctSentence: 'Kichu took the mirror from her.',
    explanation: 'Kichu took the mirror from her.',
  },
  {
    type: 'word_magnets',
    id: 'u1_t8_q10',
    jumbled: ['introduces', 'classmates', 'Miss Neena', 'her', 'to', 'Priya'],
    correctSentence: 'Miss Neena introduces Priya to her classmates.',
    explanation: 'Miss Neena introduces Priya to her classmates.',
  },
];

// -------------------------------------------------------------
// TYPE 9: MISSING_LETTER (10 Questions)
// -------------------------------------------------------------
const TYPE_9_MISSING_LETTER = [
  {
    type: 'missing_letter',
    id: 'u1_t9_q1',
    incompleteWord: 'C O _ K I E S',
    missingLetter: 'O',
    options: ['O', 'A', 'E', 'U'],
    explanation: 'C-O-O-K-I-E-S.',
  },
  {
    type: 'missing_letter',
    id: 'u1_t9_q2',
    incompleteWord: 'K I T C _ E N',
    missingLetter: 'H',
    options: ['H', 'K', 'S', 'T'],
    explanation: 'K-I-T-C-H-E-N.',
  },
  {
    type: 'missing_letter',
    id: 'u1_t9_q3',
    incompleteWord: 'B R A V _ R Y',
    missingLetter: 'E',
    options: ['E', 'A', 'I', 'O'],
    explanation: 'B-R-A-V-E-R-Y.',
  },
  {
    type: 'missing_letter',
    id: 'u1_t9_q4',
    incompleteWord: 'S I R _ N',
    missingLetter: 'E',
    options: ['E', 'A', 'U', 'O'],
    explanation: 'S-I-R-E-N.',
  },
  {
    type: 'missing_letter',
    id: 'u1_t9_q5',
    incompleteWord: 'A D D R _ S S',
    missingLetter: 'E',
    options: ['E', 'I', 'A', 'U'],
    explanation: 'A-D-D-R-E-S-S.',
  },
  {
    type: 'missing_letter',
    id: 'u1_t9_q6',
    incompleteWord: 'U N I F _ R M',
    missingLetter: 'O',
    options: ['O', 'A', 'E', 'U'],
    explanation: 'U-N-I-F-O-R-M.',
  },
  {
    type: 'missing_letter',
    id: 'u1_t9_q7',
    incompleteWord: 'R E S P _ C T',
    missingLetter: 'E',
    options: ['E', 'A', 'I', 'O'],
    explanation: 'R-E-S-P-E-C-T.',
  },
  {
    type: 'missing_letter',
    id: 'u1_t9_q8',
    incompleteWord: 'M I R R _ R',
    missingLetter: 'O',
    options: ['O', 'E', 'A', 'U'],
    explanation: 'M-I-R-R-O-R.',
  },
  {
    type: 'missing_letter',
    id: 'u1_t9_q9',
    incompleteWord: 'P U M P _ I N',
    missingLetter: 'K',
    options: ['K', 'C', 'G', 'T'],
    explanation: 'P-U-M-P-K-I-N.',
  },
  {
    type: 'missing_letter',
    id: 'u1_t9_q10',
    incompleteWord: 'M A R _ E T',
    missingLetter: 'K',
    options: ['K', 'C', 'Q', 'T'],
    explanation: 'M-A-R-K-E-T.',
  },
];

// -------------------------------------------------------------
// TYPE 10: SYLLABLE_CLAPS (10 Questions)
// -------------------------------------------------------------
const TYPE_10_SYLLABLE_CLAPS = [
  {
    type: 'syllable_claps',
    id: 'u1_t10_q1',
    word: 'Fear',
    syllableBreakdown: 'Fear (1)',
    syllablesCount: 1,
    explanation: 'Fear has 1 syllable.',
  },
  {
    type: 'syllable_claps',
    id: 'u1_t10_q2',
    word: 'Grab',
    syllableBreakdown: 'Grab (1)',
    syllablesCount: 1,
    explanation: 'Grab has 1 syllable.',
  },
  {
    type: 'syllable_claps',
    id: 'u1_t10_q3',
    word: 'Backyard',
    syllableBreakdown: 'Back - yard (2)',
    syllablesCount: 2,
    explanation: 'Back-yard has 2 syllables.',
  },
  {
    type: 'syllable_claps',
    id: 'u1_t10_q4',
    word: 'Cookie',
    syllableBreakdown: 'Cook - ie (2)',
    syllablesCount: 2,
    explanation: 'Cook-ie has 2 syllables.',
  },
  {
    type: 'syllable_claps',
    id: 'u1_t10_q5',
    word: 'Mirror',
    syllableBreakdown: 'Mir - ror (2)',
    syllablesCount: 2,
    explanation: 'Mir-ror has 2 syllables.',
  },
  {
    type: 'syllable_claps',
    id: 'u1_t10_q6',
    word: 'Carrot',
    syllableBreakdown: 'Car - rot (2)',
    syllablesCount: 2,
    explanation: 'Car-rot has 2 syllables.',
  },
  {
    type: 'syllable_claps',
    id: 'u1_t10_q7',
    word: 'Bravery',
    syllableBreakdown: 'Bra - ve - ry (3)',
    syllablesCount: 3,
    explanation: 'Bra-ve-ry has 3 syllables.',
  },
  {
    type: 'syllable_claps',
    id: 'u1_t10_q8',
    word: 'Uniform',
    syllableBreakdown: 'U - ni - form (3)',
    syllablesCount: 3,
    explanation: 'U-ni-form has 3 syllables.',
  },
  {
    type: 'syllable_claps',
    id: 'u1_t10_q9',
    word: 'Grandmother',
    syllableBreakdown: 'Grand - moth - er (3)',
    syllablesCount: 3,
    explanation: 'Grand-moth-er has 3 syllables.',
  },
  {
    type: 'syllable_claps',
    id: 'u1_t10_q10',
    word: 'Emergency',
    syllableBreakdown: 'E - mer - gen - cy (4)',
    syllablesCount: 4,
    explanation: 'E-mer-gen-cy has 4 syllables.',
  },
];

// -------------------------------------------------------------
// TYPE 11: RHYME_CONNECT (10 Questions)
// -------------------------------------------------------------
const TYPE_11_RHYME_CONNECT = [
  {
    type: 'rhyme_connect',
    id: 'u1_t11_q1',
    title: 'Everyday Heroes Rhymes',
    pairs: [
      { left: 'All', right: 'Call' },
      { left: 'Serve', right: 'Deserve' },
      { left: 'Hue', right: 'Too' },
      { left: 'Near', right: 'Fear' },
    ],
    explanation: 'All-Call, Serve-Deserve, Hue-Too, Near-Fear.',
  },
  {
    type: 'rhyme_connect',
    id: 'u1_t11_q2',
    title: 'Fun Time Rhymes',
    pairs: [
      { left: 'Rain', right: 'Train' },
      { left: 'Sky', right: 'High' },
      { left: 'House', right: 'Mouse' },
      { left: 'Plate', right: 'Late' },
    ],
    explanation: 'Rain-Train, Sky-High, House-Mouse, Plate-Late.',
  },
  {
    type: 'rhyme_connect',
    id: 'u1_t11_q3',
    title: 'Tears of Fear Rhymes',
    pairs: [
      { left: 'Floor', right: 'Door' },
      { left: 'Side', right: 'Hide' },
      { left: 'Cry', right: 'Try' },
      { left: 'Move', right: 'Prove' },
    ],
    explanation: 'Floor-Door, Side-Hide, Cry-Try, Move-Prove.',
  },
  {
    type: 'rhyme_connect',
    id: 'u1_t11_q4',
    title: 'Call for Help Rhymes',
    pairs: [
      { left: 'Line', right: 'Fine' },
      { left: 'Street', right: 'Meet' },
      { left: 'Stay', right: 'Day' },
      { left: 'Phone', right: 'Alone' },
    ],
    explanation: 'Line-Fine, Street-Meet, Stay-Day, Phone-Alone.',
  },
  {
    type: 'rhyme_connect',
    id: 'u1_t11_q5',
    title: 'Timely Help Rhymes',
    pairs: [
      { left: 'Water', right: 'Daughter' },
      { left: 'Joy', right: 'Boy' },
      { left: 'Best', right: 'Rest' },
      { left: 'Few', right: 'New' },
    ],
    explanation: 'Water-Daughter, Joy-Boy, Best-Rest, Few-New.',
  },
  {
    type: 'rhyme_connect',
    id: 'u1_t11_q6',
    title: 'The Trick of Kichu Rhymes (Part 1)',
    pairs: [
      { left: 'Shop', right: 'Top' },
      { left: 'Keep', right: 'Deep' },
      { left: 'Back', right: 'Sack' },
      { left: 'Face', right: 'Place' },
    ],
    explanation: 'Shop-Top, Keep-Deep, Back-Sack, Face-Place.',
  },
  {
    type: 'rhyme_connect',
    id: 'u1_t11_q7',
    title: 'The Trick of Kichu Rhymes (Part 2)',
    pairs: [
      { left: 'Way', right: 'Day' },
      { left: 'Eat', right: 'Neat' },
      { left: 'Live', right: 'Give' },
      { left: 'Fast', right: 'Last' },
    ],
    explanation: 'Way-Day, Eat-Neat, Live-Give, Fast-Last.',
  },
  {
    type: 'rhyme_connect',
    id: 'u1_t11_q8',
    title: 'Word Grid Rhymes',
    pairs: [
      { left: 'Fit', right: 'Sit' },
      { left: 'Fear', right: 'Hear' },
      { left: 'Dog', right: 'Log' },
      { left: 'Men', right: 'Ten' },
    ],
    explanation: 'Fit-Sit, Fear-Hear, Dog-Log, Men-Ten.',
  },
  {
    type: 'rhyme_connect',
    id: 'u1_t11_q9',
    title: 'Action and Naming Word Rhymes',
    pairs: [
      { left: 'Run', right: 'Sun' },
      { left: 'Book', right: 'Look' },
      { left: 'Tree', right: 'See' },
      { left: 'Ball', right: 'Call' },
    ],
    explanation: 'Run-Sun, Book-Look, Tree-See, Ball-Call.',
  },
  {
    type: 'rhyme_connect',
    id: 'u1_t11_q10',
    title: 'Mixed Vocabulary Rhymes',
    pairs: [
      { left: 'Name', right: 'Game' },
      { left: 'Spot', right: 'Pot' },
      { left: 'Beg', right: 'Leg' },
      { left: 'Glad', right: 'Sad' },
    ],
    explanation: 'Name-Game, Spot-Pot, Beg-Leg, Glad-Sad.',
  },
];

// -------------------------------------------------------------
// TYPE 12: PUNCTUATION_DROP (10 Questions)
// -------------------------------------------------------------
const TYPE_12_PUNCTUATION = [
  {
    type: 'mcq',
    id: 'u1_t12_q1',
    text: 'Choose the correct punctuation: "Mom! it\'s raining___"',
    options: [{ id: 'a', text: '.' }, { id: 'b', text: '?' }, { id: 'c', text: '!' }, { id: 'd', text: ',' }],
    correct: 'c',
    explanation: 'Expresses sudden excitement/alarm: "Mom! it\'s raining!"',
  },
  {
    type: 'mcq',
    id: 'u1_t12_q2',
    text: 'Choose the correct punctuation: "Why is Mom lying on the floor___"',
    options: [{ id: 'a', text: '?' }, { id: 'b', text: '.' }, { id: 'c', text: '!' }, { id: 'd', text: ',' }],
    correct: 'a',
    explanation: 'Question asking for a reason: "Why is Mom lying on the floor?"',
  },
  {
    type: 'mcq',
    id: 'u1_t12_q3',
    text: 'Choose the correct punctuation: "101, what\'s your emergency___"',
    options: [{ id: 'a', text: '?' }, { id: 'b', text: '.' }, { id: 'c', text: '!' }, { id: 'd', text: ',' }],
    correct: 'a',
    explanation: 'Direct question from operator: "101, what\'s your emergency?"',
  },
  {
    type: 'mcq',
    id: 'u1_t12_q4',
    text: 'Choose the correct punctuation: "Can you tell me your address___"',
    options: [{ id: 'a', text: '?' }, { id: 'b', text: '.' }, { id: 'c', text: '!' }, { id: 'd', text: ',' }],
    correct: 'a',
    explanation: 'Request/question: "Can you tell me your address?"',
  },
  {
    type: 'mcq',
    id: 'u1_t12_q5',
    text: 'Choose the correct punctuation: "I live at 1203, Ramnagar Street in Cheruvappadi___"',
    options: [{ id: 'a', text: '.' }, { id: 'b', text: '?' }, { id: 'c', text: '!' }, { id: 'd', text: ',' }],
    correct: 'a',
    explanation: 'Statement ends with a full stop (.).',
  },
  {
    type: 'mcq',
    id: 'u1_t12_q6',
    text: 'Choose the correct punctuation: "Two firemen rushed into the house___"',
    options: [{ id: 'a', text: '.' }, { id: 'b', text: '?' }, { id: 'c', text: '!' }, { id: 'd', text: ',' }],
    correct: 'a',
    explanation: 'Declarative sentence ends with full stop (.).',
  },
  {
    type: 'mcq',
    id: 'u1_t12_q7',
    text: 'Choose the correct punctuation: "Am I so handsome___"',
    options: [{ id: 'a', text: '?' }, { id: 'b', text: '.' }, { id: 'c', text: '!' }, { id: 'd', text: ',' }],
    correct: 'a',
    explanation: 'Asking oneself a question: "Am I so handsome?"',
  },
  {
    type: 'mcq',
    id: 'u1_t12_q8',
    text: 'Choose the correct punctuation: "He will smash you into pieces___"',
    options: [{ id: 'a', text: '!' }, { id: 'b', text: '?' }, { id: 'c', text: '.' }, { id: 'd', text: ',' }],
    correct: 'a',
    explanation: 'Strong warning/threat: "He will smash you into pieces!"',
  },
  {
    type: 'mcq',
    id: 'u1_t12_q9',
    text: 'Choose the correct punctuation: "Yes, show me your Jiggu___"',
    options: [{ id: 'a', text: '!' }, { id: 'b', text: '?' }, { id: 'c', text: '.' }, { id: 'd', text: ',' }],
    correct: 'a',
    explanation: 'Aggressive command: "Yes, show me your Jiggu!"',
  },
  {
    type: 'mcq',
    id: 'u1_t12_q10',
    text: 'Choose the correct punctuation: "Oh! What a terrible fellow he is___"',
    options: [{ id: 'a', text: '!' }, { id: 'b', text: '?' }, { id: 'c', text: '.' }, { id: 'd', text: ',' }],
    correct: 'a',
    explanation: 'Exclamatory reaction of fear: "What a terrible fellow he is!"',
  },
];

// -------------------------------------------------------------
// TYPE 13: PRONOUN_SWAP (10 Questions)
// -------------------------------------------------------------
const TYPE_13_PRONOUN_SWAP = [
  {
    type: 'mcq',
    id: 'u1_t13_q1',
    text: 'Replace the underlined word with a pronoun: "Dilna ran to the phone and dialled 101."',
    options: [{ id: 'a', text: 'She' }, { id: 'b', text: 'He' }, { id: 'c', text: 'It' }, { id: 'd', text: 'They' }],
    correct: 'a',
    explanation: 'Dilna is female singular -> "She".',
  },
  {
    type: 'mcq',
    id: 'u1_t13_q2',
    text: 'Replace the underlined word with a pronoun: "Isaac grabbed a cookie with a big smile."',
    options: [{ id: 'a', text: 'He' }, { id: 'b', text: 'She' }, { id: 'c', text: 'It' }, { id: 'd', text: 'They' }],
    correct: 'a',
    explanation: 'Isaac is male singular -> "He".',
  },
  {
    type: 'mcq',
    id: 'u1_t13_q3',
    text: 'Replace: "Dilna and Isaac went straight to the kitchen."',
    options: [{ id: 'a', text: 'They' }, { id: 'b', text: 'He' }, { id: 'c', text: 'She' }, { id: 'd', text: 'It' }],
    correct: 'a',
    explanation: 'Dilna and Isaac are third-person plural -> "They".',
  },
  {
    type: 'mcq',
    id: 'u1_t13_q4',
    text: 'Replace: "Mother didn\'t answer when Dilna called."',
    options: [{ id: 'a', text: 'She' }, { id: 'b', text: 'He' }, { id: 'c', text: 'They' }, { id: 'd', text: 'It' }],
    correct: 'a',
    explanation: 'Mother -> "She".',
  },
  {
    type: 'mcq',
    id: 'u1_t13_q5',
    text: 'Replace: "Dilna\'s father is working abroad."',
    options: [{ id: 'a', text: 'He' }, { id: 'b', text: 'She' }, { id: 'c', text: 'They' }, { id: 'd', text: 'It' }],
    correct: 'a',
    explanation: 'Father -> "He".',
  },
  {
    type: 'mcq',
    id: 'u1_t13_q6',
    text: 'Replace: "The firemen gave her some water."',
    options: [{ id: 'a', text: 'They' }, { id: 'b', text: 'He' }, { id: 'c', text: 'She' }, { id: 'd', text: 'It' }],
    correct: 'a',
    explanation: 'Firemen is plural -> "They".',
  },
  {
    type: 'mcq',
    id: 'u1_t13_q7',
    text: 'Replace: "Kichu the rabbit gave Chinnu all the vegetables."',
    options: [{ id: 'a', text: 'He' }, { id: 'b', text: 'She' }, { id: 'c', text: 'They' }, { id: 'd', text: 'It' }],
    correct: 'a',
    explanation: 'Kichu the rabbit -> "He".',
  },
  {
    type: 'mcq',
    id: 'u1_t13_q8',
    text: 'Replace: "Chinnu promised to pay Kichu."',
    options: [{ id: 'a', text: 'She' }, { id: 'b', text: 'He' }, { id: 'c', text: 'It' }, { id: 'd', text: 'They' }],
    correct: 'a',
    explanation: 'Chinnu -> "She".',
  },
  {
    type: 'mcq',
    id: 'u1_t13_q9',
    text: 'Replace: "Kichu placed the mirror in a corner of the shop."',
    options: [{ id: 'a', text: 'it' }, { id: 'b', text: 'him' }, { id: 'c', text: 'her' }, { id: 'd', text: 'them' }],
    correct: 'a',
    explanation: 'The mirror (thing) -> "it".',
  },
  {
    type: 'mcq',
    id: 'u1_t13_q10',
    text: 'Replace: "Kunkan Wolf attacked all the animals in the market."',
    options: [{ id: 'a', text: 'He' }, { id: 'b', text: 'She' }, { id: 'c', text: 'It' }, { id: 'd', text: 'They' }],
    correct: 'a',
    explanation: 'Kunkan Wolf -> "He".',
  },
];

// -------------------------------------------------------------
// TYPE 14: SENTENCE_EXPANDING (10 Questions)
// -------------------------------------------------------------
const TYPE_14_SENTENCE_EXPANDING = [
  {
    type: 'word_magnets',
    id: 'u1_t14_q1',
    instruction: 'Expand: "The children ran into the house." with brave and quickly:',
    jumbled: ['The', 'brave', 'children', 'quickly', 'ran', 'into', 'the', 'house.'],
    correctSentence: 'The brave children quickly ran into the house.',
    explanation: 'The brave children quickly ran into the house.',
  },
  {
    type: 'word_magnets',
    id: 'u1_t14_q2',
    instruction: 'Expand: "Dilna shook her mother." with Eight-year-old and gently:',
    jumbled: ['Eight-year-old', 'Dilna', 'shook', 'her', 'mother', 'gently.'],
    correctSentence: 'Eight-year-old Dilna shook her mother gently.',
    explanation: 'Eight-year-old Dilna shook her mother gently.',
  },
  {
    type: 'word_magnets',
    id: 'u1_t14_q3',
    instruction: 'Expand: "The lady spoke on the phone." with nice and softly:',
    jumbled: ['The', 'nice', 'lady', 'spoke', 'softly', 'on', 'the', 'phone.'],
    correctSentence: 'The nice lady spoke softly on the phone.',
    explanation: 'The nice lady spoke softly on the phone.',
  },
  {
    type: 'word_magnets',
    id: 'u1_t14_q4',
    instruction: 'Expand: "Dilna spoke her address." with Brave and clearly:',
    jumbled: ['Brave', 'Dilna', 'spoke', 'her', 'address', 'clearly.'],
    correctSentence: 'Brave Dilna spoke her address clearly.',
    explanation: 'Brave Dilna spoke her address clearly.',
  },
  {
    type: 'word_magnets',
    id: 'u1_t14_q5',
    instruction: 'Expand: "The mother opened her eyes." with sick and slowly:',
    jumbled: ['The', 'sick', 'mother', 'slowly', 'opened', 'her', 'eyes.'],
    correctSentence: 'The sick mother slowly opened her eyes.',
    explanation: 'The sick mother slowly opened her eyes.',
  },
  {
    type: 'word_magnets',
    id: 'u1_t14_q6',
    instruction: 'Expand: "The mother thanked the firemen." with happy and softly:',
    jumbled: ['The', 'happy', 'mother', 'thanked', 'the', 'firemen', 'softly.'],
    correctSentence: 'The happy mother thanked the firemen softly.',
    explanation: 'The happy mother thanked the firemen softly.',
  },
  {
    type: 'word_magnets',
    id: 'u1_t14_q7',
    instruction: 'Expand: "Kichu placed the mirror in the shop." with Kind and carefully:',
    jumbled: ['Kind', 'Kichu', 'carefully', 'placed', 'the', 'mirror', 'in', 'the', 'shop.'],
    correctSentence: 'Kind Kichu carefully placed the mirror in the shop.',
    explanation: 'Kind Kichu carefully placed the mirror in the shop.',
  },
  {
    type: 'word_magnets',
    id: 'u1_t14_q8',
    instruction: 'Expand: "The girl went back home." with little and happily:',
    jumbled: ['The', 'little', 'girl', 'went', 'back', 'home', 'happily.'],
    correctSentence: 'The little girl went back home happily.',
    explanation: 'The little girl went back home happily.',
  },
  {
    type: 'word_magnets',
    id: 'u1_t14_q9',
    instruction: 'Expand: "Kichu got an idea." with clever and Suddenly:',
    jumbled: ['Suddenly,', 'clever', 'Kichu', 'got', 'an', 'idea.'],
    correctSentence: 'Suddenly, clever Kichu got an idea.',
    explanation: 'Suddenly, clever Kichu got an idea.',
  },
  {
    type: 'word_magnets',
    id: 'u1_t14_q10',
    instruction: 'Expand: "The children are running on the track." with little and fast:',
    jumbled: ['The', 'little', 'children', 'are', 'running', 'fast', 'on', 'the', 'track.'],
    correctSentence: 'The little children are running fast on the track.',
    explanation: 'The little children are running fast on the track.',
  },
];

// -------------------------------------------------------------
// TYPE 15: TRAIN_CARRIAGE_SORTER (10 Questions)
// -------------------------------------------------------------
const TYPE_15_TRAIN_SORTER = [
  {
    type: 'mcq',
    id: 'u1_t15_q1',
    text: 'Statement: "She is sleeping." Turn into Question form:',
    options: [{ id: 'a', text: 'Is she sleeping?' }, { id: 'b', text: 'She sleeping is?' }, { id: 'c', text: 'Was she sleep?' }, { id: 'd', text: 'Does she sleep?' }],
    correct: 'a',
    explanation: 'Invert auxiliary verb: "Is she sleeping?"',
  },
  {
    type: 'mcq',
    id: 'u1_t15_q2',
    text: 'Statement: "He is a real hero." Turn into Question form:',
    options: [{ id: 'a', text: 'Is he a real hero?' }, { id: 'b', text: 'He is hero a real?' }, { id: 'c', text: 'A real hero is he?' }, { id: 'd', text: 'Was he hero?' }],
    correct: 'a',
    explanation: '"Is he a real hero?"',
  },
  {
    type: 'mcq',
    id: 'u1_t15_q3',
    text: 'Statement: "She is a hero." Turn into Question form:',
    options: [{ id: 'a', text: 'Is she a hero?' }, { id: 'b', text: 'A hero is she?' }, { id: 'c', text: 'She hero is?' }, { id: 'd', text: 'Does she hero?' }],
    correct: 'a',
    explanation: '"Is she a hero?"',
  },
  {
    type: 'mcq',
    id: 'u1_t15_q4',
    text: 'Statement: "I am so handsome." Turn into Question form:',
    options: [{ id: 'a', text: 'Am I so handsome?' }, { id: 'b', text: 'I am handsome so?' }, { id: 'c', text: 'Handsome am I?' }, { id: 'd', text: 'So handsome I am?' }],
    correct: 'a',
    explanation: '"Am I so handsome?"',
  },
  {
    type: 'mcq',
    id: 'u1_t15_q5',
    text: 'Statement: "She is ok now." Turn into Question form:',
    options: [{ id: 'a', text: 'Is she ok now?' }, { id: 'b', text: 'She is now ok?' }, { id: 'c', text: 'Now ok is she?' }, { id: 'd', text: 'Was she ok?' }],
    correct: 'a',
    explanation: '"Is she ok now?"',
  },
  {
    type: 'mcq',
    id: 'u1_t15_q6',
    text: 'Statement: "He is afraid of the rain." Turn into Question form:',
    options: [{ id: 'a', text: 'Is he afraid of the rain?' }, { id: 'b', text: 'He is afraid rain?' }, { id: 'c', text: 'Afraid of rain is he?' }, { id: 'd', text: 'Does he afraid?' }],
    correct: 'a',
    explanation: '"Is he afraid of the rain?"',
  },
  {
    type: 'mcq',
    id: 'u1_t15_q7',
    text: 'Statement: "Dilna and Isaac are happy." Turn into Question form:',
    options: [{ id: 'a', text: 'Are Dilna and Isaac happy?' }, { id: 'b', text: 'Dilna and Isaac are happy?' }, { id: 'c', text: 'Happy are Dilna?' }, { id: 'd', text: 'Is Dilna happy?' }],
    correct: 'a',
    explanation: '"Are Dilna and Isaac happy?"',
  },
  {
    type: 'mcq',
    id: 'u1_t15_q8',
    text: 'Statement: "The farmer is a hero." Turn into Question form:',
    options: [{ id: 'a', text: 'Is the farmer a hero?' }, { id: 'b', text: 'Farmer is hero?' }, { id: 'c', text: 'A hero the farmer is?' }, { id: 'd', text: 'Was farmer hero?' }],
    correct: 'a',
    explanation: '"Is the farmer a hero?"',
  },
  {
    type: 'mcq',
    id: 'u1_t15_q9',
    text: 'Statement: "Kichu is a rabbit." Turn into Question form:',
    options: [{ id: 'a', text: 'Is Kichu a rabbit?' }, { id: 'b', text: 'A rabbit Kichu is?' }, { id: 'c', text: 'Kichu rabbit is?' }, { id: 'd', text: 'Was Kichu rabbit?' }],
    correct: 'a',
    explanation: '"Is Kichu a rabbit?"',
  },
  {
    type: 'mcq',
    id: 'u1_t15_q10',
    text: 'Statement: "Priya is happy." Turn into Question form:',
    options: [{ id: 'a', text: 'Is Priya happy?' }, { id: 'b', text: 'Happy Priya is?' }, { id: 'c', text: 'Priya happy is?' }, { id: 'd', text: 'Does Priya happy?' }],
    correct: 'a',
    explanation: '"Is Priya happy?"',
  },
];

// -------------------------------------------------------------
// TYPE 16: TRUE_FALSE_SWIPE (10 Questions)
// -------------------------------------------------------------
const TYPE_16_TRUE_FALSE = [
  {
    type: 'true_false_swipe',
    id: 'u1_t16_q1',
    speaker: 'Dilna',
    statement: '"Isaac and I were playing in the living room when it started to rain."',
    isTrue: false,
    explanation: 'False: Dilna and Isaac were playing in the backyard of their house.',
  },
  {
    type: 'true_false_swipe',
    id: 'u1_t16_q2',
    speaker: 'The Fireman',
    statement: '"We gave Dilna\'s mother some water first to wake her up."',
    isTrue: false,
    explanation: 'False: The firemen gave her first aid first, and then gave her water.',
  },
  {
    type: 'true_false_swipe',
    id: 'u1_t16_q3',
    speaker: 'Dilna',
    statement: '"I remembered the emergency game I used to play with my mother."',
    isTrue: false,
    explanation: 'False: Dilna remembered the game she played with her grandmother.',
  },
  {
    type: 'true_false_swipe',
    id: 'u1_t16_q4',
    speaker: 'Dilna',
    statement: '"I was invited to the Fire Station to receive an award for my bravery."',
    isTrue: true,
    explanation: 'True: Dilna received an award for her courage at the Fire Station.',
  },
  {
    type: 'true_false_swipe',
    id: 'u1_t16_q5',
    speaker: 'Dilna',
    statement: '"My father could not come home immediately because he is working abroad."',
    isTrue: true,
    explanation: 'True: Dilna\'s father is working abroad in a foreign country.',
  },
  {
    type: 'true_false_swipe',
    id: 'u1_t16_q6',
    speaker: 'Kichu the Rabbit',
    statement: '"I am a well-known vegetable merchant in the Little Market."',
    isTrue: true,
    explanation: 'True: Kichu is a well-known vegetable merchant in the Little Market.',
  },
  {
    type: 'true_false_swipe',
    id: 'u1_t16_q7',
    speaker: 'Chinnu',
    statement: '"I gave Kichu a bag of gold coins to buy pumpkins, carrots, and beans."',
    isTrue: false,
    explanation: 'False: Her father had no money, so Chinnu gave Kichu a mirror to keep.',
  },
  {
    type: 'true_false_swipe',
    id: 'u1_t16_q8',
    speaker: 'Kichu the Rabbit',
    statement: '"A real wolf named Jiggu was hiding inside my vegetable shop."',
    isTrue: false,
    explanation: 'False: Kichu tricked Kunkan by showing his reflection in the mirror.',
  },
  {
    type: 'true_false_swipe',
    id: 'u1_t16_q9',
    speaker: 'Robert Longley',
    statement: '"Working dogs are everyday heroes too, just like brave men and women."',
    isTrue: true,
    explanation: 'True: In the poem Everyday Heroes, working dogs are celebrated as heroes.',
  },
  {
    type: 'true_false_swipe',
    id: 'u1_t16_q10',
    speaker: 'Priya',
    statement: '"On my first day at ABC School, my friend passed me the ball and I scored a point in basketball."',
    isTrue: true,
    explanation: 'True: Priya threw the basketball into the hoop and scored.',
  },
];

// -------------------------------------------------------------
// TYPE 17: CONVERSATION_BRANCHING (10 Questions)
// -------------------------------------------------------------
const TYPE_17_CONVERSATION = [
  {
    type: 'conversation_branching',
    id: 'u1_t17_q1',
    speaker: 'Dilna',
    prompt: 'Dilna looks up at the dark sky and says: "Isaac, we should go inside. I think it\'s going to rain."',
    options: [
      { id: 'a', text: '"Yes, let\'s go!"' },
      { id: 'b', text: '"No, I want to sleep in the backyard."' },
    ],
    correct: 'a',
    explanation: 'Isaac agrees to go inside from the rain.',
  },
  {
    type: 'conversation_branching',
    id: 'u1_t17_q2',
    speaker: 'Isaac',
    prompt: 'Isaac sees his mother on the floor and cries: "Why is Mom lying on the floor? Is she sleeping? Mom, wake up!"',
    options: [
      { id: 'a', text: '"Run away from the house, Isaac!"' },
      { id: 'b', text: '"Don\'t worry, Isaac. She will be okay."' },
    ],
    correct: 'b',
    explanation: 'Dilna consoles Isaac by telling him Mom will be okay.',
  },
  {
    type: 'conversation_branching',
    id: 'u1_t17_q3',
    speaker: '101 Emergency Officer',
    prompt: 'The 101 Emergency Officer answers: "101, what\'s your emergency?"',
    options: [
      { id: 'a', text: '"Hello, my name is Dilna. My mom is lying still on the floor. But I can\'t wake her up."' },
      { id: 'b', text: '"Hello, can you please bring some cookies to my kitchen?"' },
    ],
    correct: 'a',
    explanation: 'Dilna reports her emergency calmly and clearly.',
  },
  {
    type: 'conversation_branching',
    id: 'u1_t17_q4',
    speaker: 'Emergency Officer',
    prompt: 'The Emergency Officer speaks softly: "Okay, Dilna, you\'re doing a great job. Can you tell me your address?"',
    options: [
      { id: 'a', text: '"I don\'t know where I live."' },
      { id: 'b', text: '"I live at 1203, Ramnagar Street in Cheruvappadi."' },
    ],
    correct: 'b',
    explanation: 'Dilna speaks her exact address clearly.',
  },
  {
    type: 'conversation_branching',
    id: 'u1_t17_q5',
    speaker: 'Dilna',
    prompt: 'After the firemen help her, Mom opens her eyes and Dilna says: "Mom, these people helped us." What does Mom say?',
    options: [
      { id: 'a', text: '"Thank you."' },
      { id: 'b', text: '"Why did you come inside my living room?"' },
    ],
    correct: 'a',
    explanation: 'Mother thanks the firemen who saved her.',
  },
  {
    type: 'conversation_branching',
    id: 'u1_t17_q6',
    speaker: 'Fireman',
    prompt: 'One of the firemen praises Dilna: "Your daughter did a great job. She is a hero." How does Dilna reply?',
    options: [
      { id: 'a', text: '"Actually, I was scared. I just did what I had to do."' },
      { id: 'b', text: '"Yes, I am the strongest hero in the world!"' },
    ],
    correct: 'a',
    explanation: 'Dilna is humble and admits she was scared.',
  },
  {
    type: 'conversation_branching',
    id: 'u1_t17_q7',
    speaker: 'Dilna',
    prompt: 'Dilna calls the Fire Station: "Yes, Madam, she is alright. I am very thankful to you." How does Officer reply?',
    options: [
      { id: 'a', text: '"It\'s our duty to help others in emergency situations."' },
      { id: 'b', text: '"Please do not call this number again."' },
    ],
    correct: 'a',
    explanation: 'The Officer says it is their duty to help in emergencies.',
  },
  {
    type: 'conversation_branching',
    id: 'u1_t17_q8',
    speaker: 'Dilna',
    prompt: 'Dilna tells Isaac: "In an emergency, it\'s important to know what to do. I\'ll teach you, just like grandma taught me."',
    options: [
      { id: 'a', text: '"Thanks, Dilna. You\'re the best."' },
      { id: 'b', text: '"I don\'t want to learn anything."' },
    ],
    correct: 'a',
    explanation: 'Isaac thanks Dilna warmly.',
  },
  {
    type: 'conversation_branching',
    id: 'u1_t17_q9',
    speaker: 'Chinnu',
    prompt: 'Chinnu tells Kichu: "My father has no money, but we want vegetables. Please keep this mirror and give me pumpkins and carrots."',
    options: [
      { id: 'a', text: 'Kichu kindly takes the mirror and gives her all the vegetables she wants.' },
      { id: 'b', text: '"No! Go away, I only sell vegetables for money."' },
    ],
    correct: 'a',
    explanation: 'Kichu is kind and accepts the barter.',
  },
  {
    type: 'conversation_branching',
    id: 'u1_t17_q10',
    speaker: 'Kichu',
    prompt: 'Kichu tells Kunkan: "My friend Jiggu Wolf is hiding inside! He will smash you into pieces! Would you like to see him?"',
    options: [
      { id: 'a', text: '"Yes, show me your Jiggu!"' },
      { id: 'b', text: '"No thank you, please give me cabbage."' },
    ],
    correct: 'a',
    explanation: 'Kunkan boldly demands: "Yes, show me your Jiggu!"',
  },
];

// -------------------------------------------------------------
// TYPE 18: EMOTION_SLIDER (10 Questions)
// -------------------------------------------------------------
const TYPE_18_EMOTION_SLIDER = [
  {
    type: 'emotion_slider',
    id: 'u1_t18_q1',
    sentence: '"\'Cookies!\' Isaac said with a big smile as he grabbed one."',
    emotions: [
      { id: 'happy', label: 'Happy & Joyful', emoji: '😄' },
      { id: 'sad', label: 'Sad & Worried', emoji: '😢' },
      { id: 'angry', label: 'Angry & Fierce', emoji: '😠' },
      { id: 'scared', label: 'Scared & Terrified', emoji: '😨' },
    ],
    correct: 'happy',
    explanation: 'Isaac smiles happily when spotting the cookies.',
  },
  {
    type: 'emotion_slider',
    id: 'u1_t18_q2',
    sentence: '"Dilna tried shaking her harder, but she didn\'t respond. Isaac\'s eyes filled with tears."',
    emotions: [
      { id: 'sad', label: 'Sad & Worried', emoji: '😢' },
      { id: 'happy', label: 'Happy & Proud', emoji: '😄' },
      { id: 'angry', label: 'Angry & Fierce', emoji: '😠' },
      { id: 'scared', label: 'Scared & Terrified', emoji: '😨' },
    ],
    correct: 'sad',
    explanation: 'Isaac cries in sadness and deep worry for his mother.',
  },
  {
    type: 'emotion_slider',
    id: 'u1_t18_q3',
    sentence: '"She ran to the phone and dialled 101. Her hands were shaking."',
    emotions: [
      { id: 'scared', label: 'Scared & Anxious', emoji: '😨' },
      { id: 'happy', label: 'Joyful & Glad', emoji: '😄' },
      { id: 'angry', label: 'Angry', emoji: '😠' },
      { id: 'bored', label: 'Bored & Sleepy', emoji: '😴' },
    ],
    correct: 'scared',
    explanation: 'Dilna\'s shaking hands reveal that she felt scared during the emergency.',
  },
  {
    type: 'emotion_slider',
    id: 'u1_t18_q4',
    sentence: '"Slowly, she opened her eyes. \'Mom!\' Isaac shouted with joy."',
    emotions: [
      { id: 'relieved', label: 'Happy & Relieved', emoji: '🥳' },
      { id: 'terrified', label: 'Terrified', emoji: '😨' },
      { id: 'angry', label: 'Angry', emoji: '😠' },
      { id: 'confused', label: 'Confused', emoji: '🤔' },
    ],
    correct: 'relieved',
    explanation: 'Isaac shouts with relief and joy as Mom awakens.',
  },
  {
    type: 'emotion_slider',
    id: 'u1_t18_q5',
    sentence: '"The firemen gave me an award! Getting this award made me feel special."',
    emotions: [
      { id: 'proud', label: 'Happy & Proud', emoji: '🏆' },
      { id: 'sad', label: 'Sad & Gloomy', emoji: '😢' },
      { id: 'frightened', label: 'Frightened', emoji: '😨' },
      { id: 'angry', label: 'Angry', emoji: '😠' },
    ],
    correct: 'proud',
    explanation: 'Receiving the award made Dilna feel proud and special.',
  },
  {
    type: 'emotion_slider',
    id: 'u1_t18_q6',
    sentence: '"He saw his image in the mirror. \'Am I so handsome?\' He danced with joy."',
    emotions: [
      { id: 'pleased', label: 'Pleased & Joyful', emoji: '🕺' },
      { id: 'terrified', label: 'Terrified', emoji: '😨' },
      { id: 'worried', label: 'Worried', emoji: '😟' },
      { id: 'angry', label: 'Angry', emoji: '😠' },
    ],
    correct: 'pleased',
    explanation: 'Kichu dances with joy upon seeing his handsome reflection.',
  },
  {
    type: 'emotion_slider',
    id: 'u1_t18_q7',
    sentence: '"Kunkan Wolf attacked all the animals. The deer, rabbit, and donkey were terrified."',
    emotions: [
      { id: 'terrified', label: 'Terrified & Scared', emoji: '😨' },
      { id: 'happy', label: 'Happy', emoji: '😄' },
      { id: 'proud', label: 'Proud', emoji: '🦁' },
      { id: 'calm', label: 'Calm', emoji: '😌' },
    ],
    correct: 'terrified',
    explanation: 'The animals in the market felt terrified of Kunkan Wolf.',
  },
  {
    type: 'emotion_slider',
    id: 'u1_t18_q8',
    sentence: '"Kunkan came to Kichu\'s shop: \'Hey Kichu, I\'ll crush you and eat you up.\'"',
    emotions: [
      { id: 'angry', label: 'Angry & Fierce', emoji: '😠' },
      { id: 'kind', label: 'Kind & Polite', emoji: '😇' },
      { id: 'sad', label: 'Sad', emoji: '😢' },
      { id: 'joyful', label: 'Joyful', emoji: '😄' },
    ],
    correct: 'angry',
    explanation: 'Kunkan speaks in an angry and fierce tone.',
  },
  {
    type: 'emotion_slider',
    id: 'u1_t18_q9',
    sentence: '"\'Oh! What a terrible fellow he is!\' Seeing his image, Kunkan ran away as fast as he could."',
    emotions: [
      { id: 'frightened', label: 'Frightened & Panicked', emoji: '😱' },
      { id: 'proud', label: 'Proud', emoji: '😎' },
      { id: 'calm', label: 'Calm', emoji: '😌' },
      { id: 'happy', label: 'Happy', emoji: '😄' },
    ],
    correct: 'frightened',
    explanation: 'Kunkan was panicked and frightened by his own reflection.',
  },
  {
    type: 'emotion_slider',
    id: 'u1_t18_q10',
    sentence: '"Priya scores a point in basketball and the Headmaster honours her with a prize."',
    emotions: [
      { id: 'proud', label: 'Happy & Proud', emoji: '🌟' },
      { id: 'sad', label: 'Sad', emoji: '😢' },
      { id: 'scared', label: 'Scared', emoji: '😨' },
      { id: 'angry', label: 'Angry', emoji: '😠' },
    ],
    correct: 'proud',
    explanation: 'Priya feels happy and proud receiving the prize.',
  },
];

// -------------------------------------------------------------
// TYPE 19: STORY_MAZE (10 Questions)
// -------------------------------------------------------------
const TYPE_19_STORY_MAZE = [
  {
    type: 'conversation_branching',
    id: 'u1_t19_q1',
    speaker: 'Story Path Choice',
    prompt: 'Dilna and Isaac were playing in the backyard when it started to rain. What happened next?',
    options: [
      { id: 'a', text: 'They stayed outside to dance in the rain.' },
      { id: 'b', text: 'They ran into the house, went to the kitchen, and spotted cookies.' },
    ],
    correct: 'b',
    explanation: 'They ran inside and spotted the cookies on the kitchen table.',
  },
  {
    type: 'conversation_branching',
    id: 'u1_t19_q2',
    speaker: 'Story Path Choice',
    prompt: 'In the kitchen, Isaac grabbed a cookie and shouted "Mom!", but there was no reply. What happened next?',
    options: [
      { id: 'a', text: 'They ran to the living room and saw Mom lying still on the floor.' },
      { id: 'b', text: 'They went back to the backyard to look for her.' },
    ],
    correct: 'a',
    explanation: 'They discovered Mom lying motionless on the living room floor.',
  },
  {
    type: 'conversation_branching',
    id: 'u1_t19_q3',
    speaker: 'Story Path Choice',
    prompt: 'Dilna shook her mother, but she didn\'t move. What did Dilna do next?',
    options: [
      { id: 'a', text: 'She remembered Grandma\'s emergency game and dialled 101 on the phone.' },
      { id: 'b', text: 'Dilna and Isaac went to sleep on the sofa.' },
    ],
    correct: 'a',
    explanation: 'Dilna remembered Grandma\'s emergency training and dialled 101.',
  },
  {
    type: 'conversation_branching',
    id: 'u1_t19_q4',
    speaker: 'Story Path Choice',
    prompt: 'Dilna told the 101 operator her name and address clearly. What happened next?',
    options: [
      { id: 'a', text: 'Dilna disconnected and ran outside in the rain.' },
      { id: 'b', text: 'She stayed on the phone until she heard the siren and firemen knocked.' },
    ],
    correct: 'b',
    explanation: 'She stayed on the phone until the firemen arrived.',
  },
  {
    type: 'conversation_branching',
    id: 'u1_t19_q5',
    speaker: 'Story Path Choice',
    prompt: 'Dilna opened the door and led the firemen to the living room. What did the firemen do?',
    options: [
      { id: 'a', text: 'They gave her mother first aid and water, and Mom opened her eyes.' },
      { id: 'b', text: 'They ate the cookies on the kitchen table.' },
    ],
    correct: 'a',
    explanation: 'The firemen gave first aid and water to restore her mother.',
  },
  {
    type: 'conversation_branching',
    id: 'u1_t19_q6',
    speaker: 'Story Path Choice',
    prompt: 'A few days later, the family was invited to the Fire Station. What happened next?',
    options: [
      { id: 'a', text: 'They gave Dilna an award for her bravery.' },
      { id: 'b', text: 'They asked Dilna to wash the fire engines.' },
    ],
    correct: 'a',
    explanation: 'Dilna was honored with a bravery award.',
  },
  {
    type: 'conversation_branching',
    id: 'u1_t19_q7',
    speaker: 'Story Path Choice',
    prompt: 'Chinnu came to Kichu\'s shop, but had no money for vegetables. What happened next?',
    options: [
      { id: 'a', text: 'Chinnu bartered a mirror, and Kichu gave her pumpkins, carrots, and beans.' },
      { id: 'b', text: 'Kichu sent her away angrily.' },
    ],
    correct: 'a',
    explanation: 'Kichu agreed to keep the mirror and gave her vegetables.',
  },
  {
    type: 'conversation_branching',
    id: 'u1_t19_q8',
    speaker: 'Story Path Choice',
    prompt: 'After Chinnu left, Kichu looked into the mirror. What happened next?',
    options: [
      { id: 'a', text: 'He was pleased with his reflection and danced with joy.' },
      { id: 'b', text: 'He accidentally dropped the mirror and broke it.' },
    ],
    correct: 'a',
    explanation: 'Kichu danced with joy admiring his reflection.',
  },
  {
    type: 'conversation_branching',
    id: 'u1_t19_q9',
    speaker: 'Story Path Choice',
    prompt: 'Kunkan Wolf threatened to eat Kichu and demanded to see Jiggu Wolf. What happened next?',
    options: [
      { id: 'a', text: 'Kichu held the mirror to Kunkan\'s face and said "Look here; he is Jiggu".' },
      { id: 'b', text: 'Kichu threw pumpkins at Kunkan.' },
    ],
    correct: 'a',
    explanation: 'Kichu tricked Kunkan using the mirror.',
  },
  {
    type: 'conversation_branching',
    id: 'u1_t19_q10',
    speaker: 'Story Path Choice',
    prompt: 'On Priya\'s first day, a friend passed her the basketball on court. What happened next?',
    options: [
      { id: 'a', text: 'Priya scored a point in the hoop and was honoured with a prize.' },
      { id: 'b', text: 'It rained and everyone ran inside.' },
    ],
    correct: 'a',
    explanation: 'Priya threw the ball in the hoop and won a prize.',
  },
];

// -------------------------------------------------------------
// TYPE 20: DIALOGUE_STICKER_DROP (10 Questions)
// -------------------------------------------------------------
const TYPE_20_DIALOGUE_STICKER = [
  {
    type: 'conversation_branching',
    id: 'u1_t20_q1',
    speaker: 'Isaac',
    prompt: 'Situation: Isaac runs into the kitchen and spots a plate of treats on the table with a big smile.',
    options: [{ id: 'a', text: '"Cookies!"' }, { id: 'b', text: '"Oh no!"' }, { id: 'c', text: '"Go away!"' }],
    correct: 'a',
    explanation: 'Isaac happily shouts "Cookies!"',
  },
  {
    type: 'conversation_branching',
    id: 'u1_t20_q2',
    speaker: 'Isaac',
    prompt: 'Situation: Dilna and Isaac run into the living room and see their mother lying motionless on the floor.',
    options: [{ id: 'a', text: '"Mom, wake up!"' }, { id: 'b', text: '"Hurray!"' }, { id: 'c', text: '"Good night!"' }],
    correct: 'a',
    explanation: 'Isaac pleads: "Mom, wake up!"',
  },
  {
    type: 'conversation_branching',
    id: 'u1_t20_q3',
    speaker: 'Dilna',
    prompt: 'Situation: Isaac starts crying in fear, and Dilna comforts him.',
    options: [{ id: 'a', text: '"Don\'t worry, Isaac."' }, { id: 'b', text: '"Let\'s play cricket!"' }, { id: 'c', text: '"Give me the mirror!"' }],
    correct: 'a',
    explanation: 'Dilna comforts him: "Don\'t worry, Isaac."',
  },
  {
    type: 'conversation_branching',
    id: 'u1_t20_q4',
    speaker: '101 Emergency Operator',
    prompt: 'Situation: Dilna dials 101, and the lady officer answers at the emergency control room.',
    options: [{ id: 'a', text: '"101, what\'s your emergency?"' }, { id: 'b', text: '"Do you want vegetables?"' }, { id: 'c', text: '"Happy Birthday!"' }],
    correct: 'a',
    explanation: 'Standard emergency response: "101, what\'s your emergency?"',
  },
  {
    type: 'conversation_branching',
    id: 'u1_t20_q5',
    speaker: 'Isaac',
    prompt: 'Situation: The firemen give first aid to Mom, and she slowly opens her eyes! Isaac jumps with joy.',
    options: [{ id: 'a', text: '"Mom!"' }, { id: 'b', text: '"Alas!"' }, { id: 'c', text: '"Ouch!"' }],
    correct: 'a',
    explanation: 'Isaac shouts with joy: "Mom!"',
  },
  {
    type: 'conversation_branching',
    id: 'u1_t20_q6',
    speaker: 'Mom',
    prompt: 'Situation: Dilna\'s mother wakes up, smiles softly at the firemen, and expresses gratitude.',
    options: [{ id: 'a', text: '"Thank you."' }, { id: 'b', text: '"Who are you?"' }, { id: 'c', text: '"Stop there!"' }],
    correct: 'a',
    explanation: 'Mother expresses gratitude: "Thank you."',
  },
  {
    type: 'conversation_branching',
    id: 'u1_t20_q7',
    speaker: 'Isaac',
    prompt: 'Situation: As they leave the Fire Station, Dilna promises to teach Isaac what to do in an emergency.',
    options: [{ id: 'a', text: '"Thanks, Dilna. You\'re the best."' }, { id: 'b', text: '"I am very angry!"' }, { id: 'c', text: '"It\'s raining!"' }],
    correct: 'a',
    explanation: 'Isaac smiles and says: "Thanks, Dilna. You\'re the best."',
  },
  {
    type: 'conversation_branching',
    id: 'u1_t20_q8',
    speaker: 'Kichu the Rabbit',
    prompt: 'Situation: Kichu looks into Chinnu\'s mirror, sees his reflection, and dances with joy.',
    options: [{ id: 'a', text: '"Am I so handsome?"' }, { id: 'b', text: '"Help! Save me!"' }, { id: 'c', text: '"Oh no!"' }],
    correct: 'a',
    explanation: 'Kichu admires himself: "Am I so handsome?"',
  },
  {
    type: 'conversation_branching',
    id: 'u1_t20_q9',
    speaker: 'Kichu the Rabbit',
    prompt: 'Situation: Clever Kichu holds the mirror right in front of Kunkan Wolf\'s face to trick him.',
    options: [{ id: 'a', text: '"Look here; he is Jiggu."' }, { id: 'b', text: '"Please pay me money."' }, { id: 'c', text: '"Where is my carrot?"' }],
    correct: 'a',
    explanation: 'Kichu says: "Look here; he is Jiggu."',
  },
  {
    type: 'conversation_branching',
    id: 'u1_t20_q10',
    speaker: 'Kunkan Wolf',
    prompt: 'Situation: Kunkan Wolf sees his own fierce reflection, mistakes it for Jiggu, and screams in terror.',
    options: [{ id: 'a', text: '"Oh! What a terrible fellow he is!"' }, { id: 'b', text: '"What a tasty soup!"' }, { id: 'c', text: '"Nice to meet you!"' }],
    correct: 'a',
    explanation: 'Kunkan cries in terror: "Oh! What a terrible fellow he is!"',
  },
];

// -------------------------------------------------------------
// MASTER INTERLEAVED & MIXED ARRAY (ALL 200 QUESTIONS)
// Alternated so every single question is a completely different game style
// -------------------------------------------------------------
export const ENGLISH_UNIT_1_LEVEL_1_QUESTIONS = interleaveTypes(
  TYPE_1_DRAG_AND_DROP,        // 1: drag_and_drop
  TYPE_5_SPOT_ERROR,          // 2: spot_the_error
  TYPE_10_SYLLABLE_CLAPS,     // 3: syllable_claps
  TYPE_2_SEQUENCE_BUILDER,    // 4: sequence_builder
  TYPE_6_WORD_SCRAMBLE,       // 5: word_scramble
  TYPE_16_TRUE_FALSE,         // 6: true_false_swipe
  TYPE_7_ODD_ONE_OUT,         // 7: odd_one_out
  TYPE_8_WORD_MAGNETS,        // 8: word_magnets
  TYPE_12_PUNCTUATION,        // 9: mcq
  TYPE_17_CONVERSATION,       // 10: conversation_branching
  TYPE_9_MISSING_LETTER,      // 11: missing_letter
  TYPE_3_MATCH_THE_FOLLOWING, // 12: match_the_following
  TYPE_13_PRONOUN_SWAP,       // 13: mcq
  TYPE_18_EMOTION_SLIDER,     // 14: emotion_slider
  TYPE_14_SENTENCE_EXPANDING, // 15: word_magnets
  TYPE_19_STORY_MAZE,         // 16: conversation_branching
  TYPE_15_TRAIN_SORTER,       // 17: mcq
  TYPE_11_RHYME_CONNECT,      // 18: rhyme_connect
  TYPE_20_DIALOGUE_STICKER,   // 19: conversation_branching
  TYPE_4_MCQ                  // 20: mcq
);
