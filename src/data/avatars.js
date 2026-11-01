export const AVATAR_LIST = [
  {
    id: 'tiger',
    name: 'Tiger',
    mlName: 'വേഗൻ (Tiger)',
    emoji: '🐯',
    color: 'bg-orange-100',
    accent: 'bg-orange-400',
  },
  {
    id: 'deer',
    name: 'Deer',
    mlName: 'പുള്ളി (Deer)',
    emoji: '🦌',
    color: 'bg-amber-100',
    accent: 'bg-amber-400',
  },
  {
    id: 'robot',
    name: 'Robo',
    mlName: 'റോബോ (Robot)',
    emoji: '🤖',
    color: 'bg-blue-100',
    accent: 'bg-blue-400',
  },
  {
    id: 'hero',
    name: 'Super Kid',
    mlName: 'വീരൻ (Super-Kid)',
    emoji: '🦸',
    color: 'bg-red-100',
    accent: 'bg-red-400',
  },
  {
    id: 'boy',
    name: 'Raju',
    mlName: 'രാജു (Raju)',
    emoji: '👦',
    color: 'bg-sky-100',
    accent: 'bg-sky-400',
  },
  {
    id: 'girl',
    name: 'Meenu',
    mlName: 'മീനു (Meenu)',
    emoji: '👧',
    color: 'bg-pink-100',
    accent: 'bg-pink-400',
  },
];

export const AVATAR_MAP = AVATAR_LIST.reduce(
  (acc, avi) => {
    acc[avi.id] = avi;
    return acc;
  },
  {
    super: {
      id: 'super',
      name: 'Super Kid',
      mlName: 'വീരൻ (Super-Kid)',
      emoji: '🦸',
      color: 'bg-red-100',
      accent: 'bg-red-400',
    },
  }
);

export const getAvatarEmoji = (id) => {
  return AVATAR_MAP[id]?.emoji || '👦';
};

export const getAvatarName = (id, isEnglish = false) => {
  const avi = AVATAR_MAP[id] || AVATAR_LIST[0];
  return isEnglish ? avi.name : avi.mlName;
};
