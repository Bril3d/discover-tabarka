'use client';

import { PieChart as RechartsChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

// Sample data for the pie chart
const data = [
  { name: 'Google', value: 2100, color: 'var(--primary)' },
  { name: 'Direct', value: 1800, color: 'var(--blue)' },
  { name: 'Social Media', value: 1200, color: 'var(--green)' },
  { name: 'Referrals', value: 900, color: 'var(--amber)' },
  { name: 'Other', value: 400, color: 'var(--gray)' },
];

// Custom Tooltip Component
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background text-foreground p-2 border border-border rounded-md shadow-md">
        <p className="font-medium">{`${payload[0].name}: ${payload[0].value}`}</p>
        <p className="text-xs text-muted-foreground">
          {`${Math.round((payload[0].value / data.reduce((sum, entry) => sum + entry.value, 0)) * 100)}% of total traffic`}
        </p>
      </div>
    );
  }
  return null;
};

type PieChartProps = {
  period?: '7d' | '30d' | '90d' | '1y';
};

export function PieChart({ period = '30d' }: PieChartProps) {
  // In a real implementation, you would filter data based on the period
  
  return (
    <div className="h-full w-full">
      <ResponsiveContainer width="100%" height="100%">
        <RechartsChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            paddingAngle={2}
            dataKey="value"
            labelLine={false}
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend
            layout="vertical"
            verticalAlign="middle"
            align="right"
            wrapperStyle={{ right: 0, paddingLeft: '10px' }}
          />
        </RechartsChart>
      </ResponsiveContainer>
    </div>
  );
} 