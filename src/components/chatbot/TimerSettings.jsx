import React from 'react';

const TimerSettings = ({ timer, onTimerChange }) => {
  return (
    <div className="settings-section">
      <h2>Missed chat timer</h2>
      
      <div className="timer-container">
        <div className="timer-input-group">
          <input 
            type="number" 
            min="0" 
            max="59"
            value={timer.minutes}
            onChange={(e) => onTimerChange('minutes', e.target.value)}
            className="timer-input"
            aria-label="Minutes"
          />
          <span className="timer-label">:</span>
          <input 
            type="number" 
            min="0" 
            max="59"
            value={timer.seconds}
            onChange={(e) => onTimerChange('seconds', e.target.value)}
            className="timer-input"
            aria-label="Seconds"
          />
        </div>
      </div>
    </div>
  );
};

export default TimerSettings;