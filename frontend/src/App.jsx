import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

export default function App() {
  const [messages, setMessages] = useState([
    { 
      role: 'assistant', 
      content: 'System initialized. Drop your analytical queries here. I can fetch schemas, execute raw SQL, or compile chart diagnostics instantly.', 
      chartData: null,
      chartType: 'bar' // tracking local component view states
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const toggleChartType = (index) => {
    setMessages(prev => prev.map((msg, i) => {
      if (i === index) {
        return { ...msg, chartType: msg.chartType === 'bar' ? 'line' : 'bar' };
      }
      return msg;
    }));
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = input;
    setInput('');
    setLoading(true);

    setMessages(prev => [...prev, { role: 'user', content: userMessage, chartData: null, chartType: 'bar' }]);

    try {
      const res = await axios.post('http://localhost:8000/api/chat', {
        message: userMessage,
        history: messages.map(m => ({ role: m.role, content: m.content }))
      });

      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: res.data.response,
        chartData: res.data.chart_data,
        chartType: 'bar'
      }]);
    } catch (error) {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'CRITICAL_ERROR: Connection to data engine failed. Verify FastAPI backend terminal availability.',
        chartData: null,
        chartType: 'bar'
      }]);
    } finally {
      setLoading(false);
    }
  };

  const renderChart = (msg, index) => {
    const { chartData, chartType } = msg;
    if (!chartData || !chartData.x || !chartData.y) return null;

    const formattedData = chartData.x.map((label, i) => ({
      name: String(chartData.x[i]),
      value: Number(chartData.y[i]) || 0
    }));

    return (
      <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', padding: '20px', borderRadius: '12px', marginTop: '16px', width: '100%', maxWidth: '500px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', borderBottom: '1px solid #1e293b', paddingBottom: '8px' }}>
          <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#3b82f6', letterSpacing: '0.05em' }}>{chartData.title || "DATA DIAGNOSTIC METRICS"}</span>
          
          {/* INTERACTIVE TOGGLE BUTTON */}
          <button 
            onClick={() => toggleChartType(index)}
            style={{ backgroundColor: '#1e293b', border: '1px solid #334155', color: '#94a3b8', fontSize: '10px', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            {chartType === 'bar' ? '📈 Switch to Line' : '📊 Switch to Bar'}
          </button>
        </div>
        
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', overflowX: 'auto' }}>
          {chartType === 'bar' ? (
            <BarChart width={440} height={220} data={formattedData} margin={{ top: 10, right: 15, left: -20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
              <XAxis dataKey="name" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} angle={-15} textAnchor="end" height={45} />
              <YAxis stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ backgroundColor: '#090d16', borderColor: '#1e293b', borderRadius: '6px', color: '#f8fafc', fontSize: '11px' }} cursor={{ fill: '#1e293b', opacity: 0.1 }} />
              <Bar dataKey="value" fill="#3b82f6" barSize={30} />
            </BarChart>
          ) : (
            <LineChart width={440} height={220} data={formattedData} margin={{ top: 10, right: 15, left: -20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
              <XAxis dataKey="name" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} angle={-15} textAnchor="end" height={45} />
              <YAxis stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ backgroundColor: '#090d16', borderColor: '#1e293b', borderRadius: '6px', color: '#f8fafc', fontSize: '11px' }} />
              <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={3} dot={{ fill: '#3b82f6', r: 4 }} activeDot={{ r: 6 }} />
            </LineChart>
          )}
        </div>
      </div>
    );
  };

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw', backgroundColor: '#030712', color: '#f3f4f6', fontFamily: 'sans-serif', overflow: 'hidden', margin: 0, padding: 0 }}>
      
      {/* LEFT SIDEBAR PANEL */}
      <aside style={{ width: '260px', backgroundColor: '#0b0f19', borderRight: '1px solid #111827', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '24px', boxSizing: 'border-box' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
            <div style={{ backgroundColor: '#2563eb', padding: '6px 12px', borderRadius: '8px', fontWeight: 'bold', fontSize: '14px' }}>iT</div>
            <div>
              <h2 style={{ fontSize: '15px', fontWeight: 'bold', margin: 0, color: '#f3f4f6' }}>iTech Agent</h2>
              <p style={{ fontSize: '10px', color: '#4b5563', textTransform: 'uppercase', letterSpacing: '0.05em', margin: 0 }}>BI Suite Console</p>
            </div>
          </div>
          
          <div style={{ marginTop: '24px' }}>
            <p style={{ fontSize: '10px', fontWeight: 'bold', color: '#4b5563', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}>Active Frameworks</p>
            <div style={{ fontSize: '12px', color: '#9ca3af', padding: '8px 12px', backgroundColor: '#030712', borderRadius: '6px', marginBottom: '6px', border: '1px solid #111827' }}>⚡ NL-to-SQL Engine v1.2</div>
            <div style={{ fontSize: '12px', color: '#9ca3af', padding: '8px 12px', backgroundColor: '#030712', borderRadius: '6px', border: '1px solid #111827' }}>📊 Chart Compiler Active</div>
          </div>

          <div style={{ marginTop: '24px' }}>
            <p style={{ fontSize: '10px', fontWeight: 'bold', color: '#4b5563', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}>Environments</p>
            <div style={{ fontSize: '11px', color: '#6b7280', fontFamily: 'monospace', paddingLeft: '4px' }}>📁 sample_ecommerce.db</div>
            <div style={{ fontSize: '11px', color: '#374151', fontFamily: 'monospace', paddingLeft: '4px', marginTop: '6px' }}>📁 production_warehouse.db (Lock)</div>
          </div>
        </div>

        <div style={{ fontSize: '11px', fontFamily: 'monospace', color: '#10b981', padding: '10px', backgroundColor: '#030712', borderRadius: '6px', border: '1px solid #111827', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#10b981' }}></span>
          SYS_CONNECTED
        </div>
      </aside>

      {/* MAIN WORKSPACE INTERFACE */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', backgroundColor: '#060a12', height: '100%' }}>
        
        {/* UPPER STATUS BAR */}
        <header style={{ height: '60px', borderBottom: '1px solid #111827', backgroundColor: '#0b0f19', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px', boxSizing: 'border-box' }}>
          <div style={{ fontSize: '12px', color: '#9ca3af' }}>
            Console / <span style={{ color: '#f3f4f6', fontWeight: '600' }}>Workspace Monitor Console</span>
          </div>
          <div style={{ display: 'flex', gap: '24px', fontFamily: 'monospace', fontSize: '11px' }}>
            <div><span style={{ color: '#4b5563' }}>ACCURACY:</span> <span style={{ color: '#3b82f6', fontWeight: 'bold' }}>98.4%</span></div>
            <div><span style={{ color: '#4b5563' }}>LATENCY:</span> <span style={{ color: '#10b981', fontWeight: 'bold' }}>14ms</span></div>
          </div>
        </header>

        {/* CHAT CHANNELS PANEL */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ maxWidth: '800px', width: '100%', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {messages.map((msg, index) => (
              <div key={index} style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
                <div style={{ 
                  maxWidth: '600px', 
                  width: '100%',
                  borderRadius: '12px', 
                  padding: '16px', 
                  fontSize: '13px', 
                  lineHeight: '1.6',
                  border: msg.role === 'user' ? '1px solid #2563eb' : '1px solid #111827',
                  backgroundColor: msg.role === 'user' ? '#2563eb' : '#0b0f19',
                  color: msg.role === 'user' ? '#ffffff' : '#d1d5db',
                  boxSizing: 'border-box'
                }}>
                  <p style={{ margin: 0, whiteSpace: 'pre-wrap' }}>
                    {msg.content.replace('### 📊 ', '').replace('### ', '')}
                  </p>
                  {renderChart(msg, index)}
                </div>
              </div>
            ))}

            {loading && (
              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <div style={{ padding: '12px 20px', backgroundColor: '#0b0f19', border: '1px solid #111827', borderRadius: '12px', fontSize: '11px', fontFamily: 'monospace', color: '#6b7280' }}>
                  ⏳ EXECUTING ANALYSIS QUERY AND COMPILING PLOTS...
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>
        </div>

        {/* ACTION TRAY FOOTER */}
        <footer style={{ padding: '20px 24px', borderTop: '1px solid #111827', backgroundColor: '#0b0f19' }}>
          <form onSubmit={handleSendMessage} style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', gap: '12px' }}>
            <div style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'center' }}>
              <span style={{ position: 'absolute', left: '16px', fontFamily: 'monospace', fontSize: '12px', color: '#4b5563', userSelect: 'none' }}>SQL_AGENT&gt;</span>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask your database a business query..."
                style={{ width: '100%', backgroundColor: '#030712', border: '1px solid #111827', borderRadius: '10px', padding: '14px 16px 14px 100px', fontSize: '13px', color: '#ffffff', outline: 'none', boxSizing: 'border-box' }}
              />
            </div>
            <button 
              type="submit" 
              disabled={loading || !input.trim()} 
              style={{ backgroundColor: loading || !input.trim() ? '#111827' : '#2563eb', color: '#ffffff', padding: '0 24px', borderRadius: '10px', fontSize: '13px', fontWeight: '600', border: 'none', cursor: 'pointer', transition: 'all 0.2s' }}
            >
              Execute
            </button>
          </form>
        </footer>
      </main>
    </div>
  );
}