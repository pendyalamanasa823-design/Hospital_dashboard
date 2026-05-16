import { motion } from 'framer-motion';
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import { patientChartData, appointmentChartData, revenueChartData, departmentData } from '../data/dashboardStats';
import './Analytics.css';

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function Analytics() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="page-header">
        <div>
          <h1>Analytics & Reports</h1>
          <p>Comprehensive hospital analytics overview</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="analytics-summary">
        {[
          { label: 'Total Admissions', value: '2,160', icon: '🏥', color: '#1B6FE3' },
          { label: 'Total Discharges', value: '1,916', icon: '✅', color: '#10B981' },
          { label: 'Avg Stay (days)', value: '4.2', icon: '📊', color: '#8B5CF6' },
          { label: 'Total Revenue', value: '$3.4M', icon: '💰', color: '#F59E0B' },
        ].map((item, i) => (
          <motion.div className="analytics-card card" key={i} variants={cardVariants} initial="hidden" animate="visible"
            transition={{ delay: i * 0.1 }}>
            <div className="analytics-card-icon" style={{ background: `${item.color}15`, color: item.color }}>{item.icon}</div>
            <div>
              <p className="analytics-card-label">{item.label}</p>
              <h2 className="analytics-card-value">{item.value}</h2>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="analytics-grid">
        <motion.div className="chart-card" variants={cardVariants} initial="hidden" animate="visible">
          <div className="chart-header">
            <h3>Patient Admissions Trend</h3>
            <span className="chart-period">12 months</span>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={patientChartData}>
              <defs>
                <linearGradient id="admitGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1B6FE3" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#1B6FE3" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="dischargeGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="month" stroke="var(--text-tertiary)" fontSize={12} />
              <YAxis stroke="var(--text-tertiary)" fontSize={12} />
              <Tooltip contentStyle={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '8px' }} />
              <Legend />
              <Area type="monotone" dataKey="admitted" stroke="#1B6FE3" fill="url(#admitGrad)" strokeWidth={2} />
              <Area type="monotone" dataKey="discharged" stroke="#10B981" fill="url(#dischargeGrad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div className="chart-card" variants={cardVariants} initial="hidden" animate="visible" transition={{ delay: 0.1 }}>
          <div className="chart-header">
            <h3>Department Distribution</h3>
            <span className="chart-period">Current</span>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={departmentData} cx="50%" cy="50%" innerRadius={70} outerRadius={110}
                paddingAngle={4} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                {departmentData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '8px' }} />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      <div className="analytics-grid">
        <motion.div className="chart-card" variants={cardVariants} initial="hidden" animate="visible" transition={{ delay: 0.2 }}>
          <div className="chart-header">
            <h3>Appointment Trends</h3>
            <span className="chart-period">Weekly</span>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={appointmentChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="day" stroke="var(--text-tertiary)" fontSize={12} />
              <YAxis stroke="var(--text-tertiary)" fontSize={12} />
              <Tooltip contentStyle={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '8px' }} />
              <Legend />
              <Bar dataKey="appointments" fill="#1B6FE3" radius={[4, 4, 0, 0]} />
              <Bar dataKey="completed" fill="#10B981" radius={[4, 4, 0, 0]} />
              <Bar dataKey="cancelled" fill="#EF4444" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div className="chart-card" variants={cardVariants} initial="hidden" animate="visible" transition={{ delay: 0.3 }}>
          <div className="chart-header">
            <h3>Revenue vs Expenses</h3>
            <span className="chart-period">Monthly</span>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="month" stroke="var(--text-tertiary)" fontSize={12} />
              <YAxis stroke="var(--text-tertiary)" fontSize={12} tickFormatter={(v) => `$${(v / 1000)}k`} />
              <Tooltip contentStyle={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '8px' }}
                formatter={(value) => [`$${value.toLocaleString()}`]} />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="#8B5CF6" strokeWidth={2.5} dot={{ r: 4, fill: '#8B5CF6' }} />
              <Line type="monotone" dataKey="expenses" stroke="#EF4444" strokeWidth={2} dot={{ r: 3, fill: '#EF4444' }} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </motion.div>
  );
}
