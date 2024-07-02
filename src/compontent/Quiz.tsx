import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Question from './Question';
import Result from './Result';
import './styles.css';

interface QuizData {
  question: string;
  options: string[];
  answer: string;
}

const Quiz: React.FC = () => {
  const [quizData, setQuizData] = useState<QuizData[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get('https://opentdb.com/api.php?amount=10&type=multiple')
      .then((response) => {
        const formattedData = response.data.results.map((item: any) => {
          return {
            question: item.question,
            options: shuffleOptions([...item.incorrect_answers, item.correct_answer]),
            answer: item.correct_answer,
          };
        });
        setQuizData(formattedData);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching the quiz data', error);
      });
  }, []);

  const shuffleOptions = (options: string[]): string[] => {
    for (let i = options.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [options[i], options[j]] = [options[j], options[i]];
    }
    return options;
  };

  const handleAnswer = (answer: string) => {
    if (answer === quizData[currentQuestion].answer) {
      setScore(score + 1);
    } else {
      setShowCorrectAnswer(true);
    }
  };

  const handleNext = () => {
    setShowCorrectAnswer(false);
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < quizData.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowResult(true);
    }
  };

  if (loading) {
    return <div className='quiz-loading'>Loading...</div>;
  }

  return (
    <div className='quiz-container'>
      {showResult ? (
        <Result score={score} totalQuestions={quizData.length} />
      ) : (
        <Question 
          question={quizData[currentQuestion].question}
          options={quizData[currentQuestion].options}
          correctAnswer={quizData[currentQuestion].answer}
          handleAnswer={handleAnswer}
          handleNext={handleNext}
          showCorrectAnswer={showCorrectAnswer}
        />
      )}
    </div>
  );
};

export default Quiz;


