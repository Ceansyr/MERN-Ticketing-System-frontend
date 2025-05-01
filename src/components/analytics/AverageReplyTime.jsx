import React from 'react';

const AverageReplyTime = ({ time = 0 }) => {
  const hours = Math.floor(time);
  const minutes = Math.round((time - hours) * 60);
  
  const formattedTime = hours > 0 
    ? `${hours}hr ${minutes}min` 
    : `${minutes}min`;
  
  return (
    <div className="analytics-card">
      <h2 className="analytics-title">Average Reply time</h2>
      <div className="component-content">
        <div className="content-right">
          <p className="analytics-description">
            For highest customer satisfaction rates you should aim to reply to an incoming customer's message in 15
            seconds or less. Quick responses will get you more conversations, help you earn customers trust and
            make more sales.
          </p>
        </div>
        <div className="content-left">
          <div className="metric-display">
            <span className="metric-value">{formattedTime}</span>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default AverageReplyTime;