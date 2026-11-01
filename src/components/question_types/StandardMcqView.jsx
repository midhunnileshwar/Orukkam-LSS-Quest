import React from 'react';
import GearButton from '../GearButton';

export default function StandardMcqView({ question, selectedOption, result, onAnswer, disabled }) {
  const handleClick = (optId, e) => {
    if (disabled || selectedOption) return;
    const isCorrect = optId === question.correct;
    onAnswer(isCorrect, optId, e);
  };

  return (
    <div className="grid grid-cols-2 gap-4 sm:gap-6 w-full place-items-center">
      {(question.options || []).map((option) => (
        <GearButton
          key={option.id}
          option={option.id.toUpperCase()}
          text={option.text}
          isSelected={selectedOption === option.id}
          result={selectedOption === option.id ? result : null}
          onClick={(e) => handleClick(option.id, e)}
          disabled={disabled || !!selectedOption}
        />
      ))}
    </div>
  );
}
