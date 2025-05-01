'use client';

import { useState } from 'react';
import { Line, LineChart, ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

// Sample data for the chart
const data = [
  { date: '2023-04-01', visitors: 1200, pageViews: 3400 },
  { date: '2023-04-02', visitors: 1300, pageViews: 3600 },
  { date: '2023-04-03', visitors: 1400, pageViews: 4000 },
  { date: '2023-04-04', visitors: 1100, pageViews: 3200 },
  { date: '2023-04-05', visitors: 1500, pageViews: 4200 },
  { date: '2023-04-06', visitors: 1700, pageViews: 4800 },
  { date: '2023-04-07', visitors: 1600, pageViews: 4600 },
  { date: '2023-04-08', visitors: 1800, pageViews: 5000 },
  { date: '2023-04-09', visitors: 2000, pageViews: 5500 },
  { date: '2023-04-10', visitors: 2200, pageViews: 6000 },
  { date: '2023-04-11', visitors: 1900, pageViews: 5200 },
  { date: '2023-04-12', visitors: 2100, pageViews: 5700 },
  { date: '2023-04-13', visitors: 2300, pageViews: 6200 },
  { date: '2023-04-14', visitors: 2400, pageViews: 6500 },
];

type DashboardChartProps = {
  period?: '7d' | '30d' | '90d' | '1y';
};

export function DashboardChart({ period = '30d' }: DashboardChartProps) {
  const [activeMetric, setActiveMetric] = useState<'visitors' | 'pageViews'>('pageViews');
  
  // In a real implementation, you would filter data based on the period
  const chartData = data.slice(-7); // Just show the last 7 days for this demo
  
  return (
    <div className="h-full w-full">
      <div className="mb-4 flex items-center space-x-2">
        <button
          onClick={() => setActiveMetric('pageViews')}
          className={`text-xs px-2 py-1 rounded-full ${
            activeMetric === 'pageViews' 
              ? 'bg-primary text-primary-foreground' 
              : 'bg-muted text-muted-foreground'
          }`}
        >
          Page Views
        </button>
        <button
          onClick={() => setActiveMetric('visitors')}
          className={`text-xs px-2 py-1 rounded-full ${
            activeMetric === 'visitors' 
              ? 'bg-primary text-primary-foreground' 
              : 'bg-muted text-muted-foreground'
          }`}
        >
          Unique Visitors
        </button>
      </div>

      <ResponsiveContainer width="100%" height="90%">
        <LineChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
          <XAxis 
            dataKey="date" 
            stroke="var(--muted-foreground)" 
            tickFormatter={(value) => {
              const date = new Date(value);
              return `${date.getDate()}/${date.getMonth() + 1}`;
            }}
          />
          <YAxis stroke="var(--muted-foreground)" />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'var(--background)', 
              border: '1px solid var(--border)',
              borderRadius: '6px' 
            }}
          />
          <Line 
            type="monotone" 
            dataKey={activeMetric} 
            stroke="var(--primary)" 
            strokeWidth={2} 
            dot={{ r: 4 }} 
            activeDot={{ r: 6 }} 
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
} 