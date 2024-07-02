import React from 'react';

interface ResultProps {
  score: number;
  totalQuestions: number;
}

const Result: React.FC<ResultProps> = ({ score, totalQuestions }) => {
  return (
    <div className='result'>
      <div className='score'>Quiz Completed!</div>
        Your Score: <span className='score'>{score}</span> out of <span className='score'>{totalQuestions}</span>
    </div>
  );
}

export default Result;


