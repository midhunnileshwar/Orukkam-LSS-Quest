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
  malayalam: {},
  english: {},
  evs: {},
  gk: {},
};

export const getQuestionsForLevel = (landId, levelId) => {
  const landData = QUESTIONS_DATA[landId];
  if (!landData) return null;
  return landData[levelId];
};
