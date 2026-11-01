import React from 'react';
import DragAndDropView from './DragAndDropView';
import SequenceBuilderView from './SequenceBuilderView';
import MatchFollowingView from './MatchFollowingView';
import SpotErrorView from './SpotErrorView';
import WordScrambleView from './WordScrambleView';
import OddOneOutView from './OddOneOutView';
import WordMagnetsView from './WordMagnetsView';
import MissingLetterView from './MissingLetterView';
import SyllableClapsView from './SyllableClapsView';
import TrueFalseSwipeView from './TrueFalseSwipeView';
import ConversationBranchingView from './ConversationBranchingView';
import EmotionSliderView from './EmotionSliderView';
import StandardMcqView from './StandardMcqView';

export default function InteractiveQuestionRenderer({
  question,
  selectedOption,
  result,
  onAnswer,
  disabled,
}) {
  if (!question) return null;

  const qType = (question.type || 'mcq').toLowerCase();

  switch (qType) {
    case 'drag_and_drop':
      return <DragAndDropView question={question} onAnswer={onAnswer} disabled={disabled} />;

    case 'sequence_builder':
      return <SequenceBuilderView question={question} onAnswer={onAnswer} disabled={disabled} />;

    case 'match_the_following':
    case 'rhyme_connect':
      return <MatchFollowingView question={question} onAnswer={onAnswer} disabled={disabled} />;

    case 'spot_the_error':
      return <SpotErrorView question={question} onAnswer={onAnswer} disabled={disabled} />;

    case 'word_scramble':
      return <WordScrambleView question={question} onAnswer={onAnswer} disabled={disabled} />;

    case 'odd_one_out':
      return <OddOneOutView question={question} onAnswer={onAnswer} disabled={disabled} />;

    case 'word_magnets':
    case 'sentence_expanding':
    case 'train_carriage_sorter':
      return <WordMagnetsView question={question} onAnswer={onAnswer} disabled={disabled} />;

    case 'missing_letter':
      return <MissingLetterView question={question} onAnswer={onAnswer} disabled={disabled} />;

    case 'syllable_claps':
      return <SyllableClapsView question={question} onAnswer={onAnswer} disabled={disabled} />;

    case 'true_false_swipe':
      return <TrueFalseSwipeView question={question} onAnswer={onAnswer} disabled={disabled} />;

    case 'conversation_branching':
    case 'story_maze':
    case 'dialogue_sticker':
      return <ConversationBranchingView question={question} onAnswer={onAnswer} disabled={disabled} />;

    case 'emotion_slider':
      return <EmotionSliderView question={question} onAnswer={onAnswer} disabled={disabled} />;

    case 'mcq':
    case 'mcq_visual_or_logic':
    default:
      return (
        <StandardMcqView
          question={question}
          selectedOption={selectedOption}
          result={result}
          onAnswer={onAnswer}
          disabled={disabled}
        />
      );
  }
}
