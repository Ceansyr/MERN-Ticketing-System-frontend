import React from 'react';

const TotalChats = ({ count = 0 }) => {
  return (
    <div className="analytics-card">
      <h2 className="analytics-title total-chats-title">Total Chats</h2>
      <div className="component-content">
        <div className="content-right">
          <p className="analytics-description">
            This metric Shows the total number of chats for all Channels for the selected the selected period
          </p>
        </div>
        <div className="content-left">
          <div className="metric-display">
            <span className="metric-value">{count} Chats</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TotalChats;