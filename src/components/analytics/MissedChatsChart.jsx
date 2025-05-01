import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const MissedChatsChart = ({ data }) => {
  return (
    <div className="analytics-card">
      <h2 className="analytics-title">Missed Chats</h2>
      <div className="component-content">
        <div className="content-left">
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff', 
                    border: 'none', 
                    borderRadius: '8px',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.1)' 
                  }}
                  labelStyle={{ fontWeight: 'bold' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="missedChats" 
                  stroke="#00C851" 
                  strokeWidth={2} 
                  dot={{ r: 4, strokeWidth: 2 }}
                  activeDot={{ r: 6, strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MissedChatsChart;