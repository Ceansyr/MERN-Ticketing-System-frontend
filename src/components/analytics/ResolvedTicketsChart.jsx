import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const ResolvedTicketsChart = ({ resolved, total }) => {
  const percentage = total > 0 ? Math.round((resolved / total) * 100) : 0;
  
  const data = [
    { name: 'Resolved', value: percentage },
    { name: 'Unresolved', value: 100 - percentage }
  ];
  
  const COLORS = ['#00C851', '#EEEEEE'];
  
  return (
    <div className="analytics-card">
      <h2 className="analytics-title">Resolved Tickets</h2>
      <div className="component-content">
        <div className="content-right">
          <p className="analytics-description">
            A callback system on a website, as well as proactive invitations, help to attract even more customers. A
            separate round button for ordering a call with a small animation helps to motivate more
            customers to make calls.
          </p>
        </div>
        <div className="content-left">
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={0}
                  dataKey="value"
                  startAngle={90}
                  endAngle={-270}
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="percentage-display">
              <span className="percentage-value">{percentage}%</span>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default ResolvedTicketsChart;