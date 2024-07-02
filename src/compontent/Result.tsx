import React from 'react';

interface ResultProps {
  score: number;
  totalQuestions: number;
}

const Result: React.FC<ResultProps> = ({ score, totalQuestions }) => {
  return (
    <div className='result'>
      <div className='score'>Quiz Completed!</div>
        Your Score: {score} out of {totalQuestions}
    </div>
    //  <button className='try-again' onClick={() => window.location.reload()}>Try Again</button>
    //  </div>
      // <button className='try-again' onClick={() => window.location.reload()}>Try Again</button>
    
  );
}

export default Result;


