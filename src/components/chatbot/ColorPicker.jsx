import React from 'react';

const ColorPicker = ({ label, value, onChange, presetColors = ['#FFFFFF', '#000000', '#334758'] }) => {
  return (
    <div className="setting-group">
      <label>{label}</label>
      <div className="color-picker-container">
        <div className="color-options">
          {presetColors.map(color => (
            <button 
              key={color}
              className={`color-option ${value === color ? 'active' : ''}`}
              style={{ backgroundColor: color }}
              onClick={() => onChange(color)}
              aria-label={`Select color ${color}`}
            />
          ))}
        </div>
        <input 
          type="text" 
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="color-hex-input"
          aria-label={`${label} hex value`}
        />
      </div>
    </div>
  );
};

export default ColorPicker;