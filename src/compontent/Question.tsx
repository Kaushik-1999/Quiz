import React, { useState, FormEvent, ChangeEvent, useEffect } from "react";

interface QuestionProps {
  question: string;
  options: string[];
  correctAnswer: string;
  handleAnswer: (answer: string) => void;
  handleNext: () => void;
  showCorrectAnswer: boolean;
}

const Question: React.FC<QuestionProps> = ({
  question,
  options,
  correctAnswer,
  handleAnswer,
  handleNext,
  showCorrectAnswer,
}) => {
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showNextButton, setShowNextButton] = useState<boolean>(false);

  useEffect(() => {
    setSelectedOption("");
    setIsCorrect(null);
    setShowNextButton(false);
  }, [question]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (selectedOption === correctAnswer) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
    handleAnswer(selectedOption);
    setShowNextButton(true);
  };

  const handleOptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(e.target.value);
  };

  return (
    <div className="question-container">
      <div className="question">{question}</div>
      <form onSubmit={handleSubmit}>
        {options.map((option) => (
          <div key={option}>
            <label
              style={{
                color:
                  showCorrectAnswer && option === correctAnswer
                    ? "green"
                    : "black",
              }}
            >
              <input
                type="radio"
                value={option}
                checked={selectedOption === option}
                onChange={handleOptionChange}
                disabled={showCorrectAnswer}
              />
              {option}
            </label>
          </div>
        ))}
        <button type="submit" disabled={!selectedOption}>
          Submit
        </button>
        {showNextButton && (
          <button type="button" onClick={handleNext}>
            Next
          </button>
        )}
        {isCorrect === false && (
          <div className="incorrect">Incorrect answer, try again.</div>
        )}
      </form>
    </div>
  );
};

export default Question;
