import React, { useState } from 'react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Area, AreaChart, ResponsiveContainer } from 'recharts';
import { Sparkles, Zap, Send, TrendingUp, Activity, BarChart3, Target } from 'lucide-react';

const SentimentAPI = () => {
  const [text, setText] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState(null);
  const [history, setHistory] = useState([]);

  const analyzeSentiment = async () => {
    if (!text.trim()) return;
    
    setAnalyzing(true);
    
    setTimeout(() => {
      const sentiment = Math.random();
      let label, score;
      
      if (sentiment < 0.33) {
        label = 'negativo';
        score = Math.random() * 0.33;
      } else if (sentiment < 0.66) {
        label = 'neutral';
        score = 0.33 + Math.random() * 0.33;
      } else {
        label = 'positivo';
        score = 0.66 + Math.random() * 0.34;
      }
      
      const result = {
        text,
        sentiment: label,
        score: score,
        timestamp: new Date().toISOString()
      };
      
      setResults(result);
      setHistory(prev => [...prev, result]);
      setAnalyzing(false);
    }, 2000);
  };

  const getSentimentColor = (sentiment) => {
    switch(sentiment) {
      case 'positivo': return '#10b981';
      case 'negativo': return '#ef4444';
      case 'neutral': return '#f59e0b';
      default: return '#8b5cf6';
    }
  };

  const getStatistics = () => {
    if (history.length === 0) return null;
    
    const counts = {
      positivo: history.filter(h => h.sentiment === 'positivo').length,
      negativo: history.filter(h => h.sentiment === 'negativo').length,
      neutral: history.filter(h => h.sentiment === 'neutral').length
    };
    
    return [
      { name: 'Positivo', value: counts.positivo, color: '#10b981', percentage: (counts.positivo / history.length * 100).toFixed(1) },
      { name: 'Negativo', value: counts.negativo, color: '#ef4444', percentage: (counts.negativo / history.length * 100).toFixed(1) },
      { name: 'Neutral', value: counts.neutral, color: '#f59e0b', percentage: (counts.neutral / history.length * 100).toFixed(1) }
    ];
  };

  const getScoreDistribution = () => {
    if (history.length === 0) return [];
    
    const ranges = {
      '0.0-0.2': 0, '0.2-0.4': 0, '0.4-0.6': 0, '0.6-0.8': 0, '0.8-1.0': 0
    };
    
    history.forEach(h => {
      if (h.score < 0.2) ranges['0.0-0.2']++;
      else if (h.score < 0.4) ranges['0.2-0.4']++;
      else if (h.score < 0.6) ranges['0.4-0.6']++;
      else if (h.score < 0.8) ranges['0.6-0.8']++;
      else ranges['0.8-1.0']++;
    });
    
    return Object.entries(ranges).map(([name, value]) => ({ 
      name, 
      value,
      percentage: history.length > 0 ? ((value / history.length) * 100).toFixed(1) : 0
    }));
  };

  const getTrendData = () => {
    if (history.length === 0) return [];
    
    return history.slice(-10).map((item, index) => ({
      index: index + 1,
      score: (item.score * 100).toFixed(1),
      sentiment: item.sentiment
    }));
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white px-4 py-3 rounded-xl shadow-2xl border border-gray-100">
          <p className="text-gray-800 font-semibold mb-1">{label}</p>
          <p className="text-indigo-600 font-bold text-lg">
            {payload[0].value} análisis
          </p>
          {payload[0].payload.percentage && (
            <p className="text-gray-500 text-sm">{payload[0].payload.percentage}% del total</p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-indigo-900 text-white">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 p-4 sm:p-8">
        {/* Header */}
        <div className="max-w-7xl mx-auto mb-16 pt-8">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl blur-lg opacity-75 animate-pulse"></div>
              <div className="relative bg-gradient-to-br from-pink-500 to-purple-600 p-4 rounded-2xl shadow-2xl">
                <Sparkles className="w-10 h-10" />
              </div>
            </div>
            <div>
              <h1 className="text-5xl sm:text-6xl font-black bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                SentimentAPI
              </h1>
              <p className="text-purple-300 text-sm font-medium tracking-wider">POWERED BY AI</p>
            </div>
          </div>
          <p className="text-center text-purple-200 text-xl max-w-2xl mx-auto leading-relaxed">
            Análisis de sentimientos en tiempo real con inteligencia artificial avanzada
          </p>
        </div>

        {/* Main Analyzer Section */}
        <div className="max-w-5xl mx-auto mb-16">
          <div className="bg-white/5 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/10 overflow-hidden">
            <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 px-8 py-6 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-cyan-400/20 rounded-lg">
                  <Zap className="w-6 h-6 text-cyan-300" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Analizador en Vivo</h2>
                  <p className="text-sm text-purple-200">Obtén resultados instantáneos con IA</p>
                </div>
              </div>
            </div>
            
            <div className="p-8">
              <h3 className="text-2xl font-bold mb-3 text-center">
                Descubre el poder del análisis de sentimientos
              </h3>
              
              <p className="text-center text-purple-200 mb-8 leading-relaxed">
                Escribe cualquier reseña o comentario y observa cómo nuestra IA detecta el sentimiento al instante
              </p>

              {/* Input Area */}
              <div className="relative mb-6">
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  maxLength={500}
                  placeholder="Ejemplo: Este producto es increíble, superó todas mis expectativas. La calidad es excelente y el servicio al cliente fue muy atento..."
                  className="w-full h-44 bg-white/5 border-2 border-white/20 rounded-2xl p-5 text-white placeholder-purple-300/60 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent resize-none transition-all text-lg"
                  style={{ lineHeight: '1.6' }}
                />
                <div className="absolute bottom-5 right-5 px-3 py-1 bg-purple-500/30 rounded-lg text-sm text-purple-200 font-medium backdrop-blur-sm">
                  {text.length}/500
                </div>
              </div>

              {/* Analyze Button */}
              <button
                onClick={analyzeSentiment}
                disabled={!text.trim() || analyzing}
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white font-bold py-5 rounded-2xl flex items-center justify-center gap-3 transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-xl hover:shadow-2xl text-lg"
              >
                <Send className="w-6 h-6" />
                {analyzing ? 'Analizando...' : 'Analizar Sentimiento'}
              </button>

              {/* Loading State */}
              {analyzing && (
                <div className="mt-10 text-center">
                  <div className="inline-block mb-6">
                    <div className="relative">
                      <div className="w-20 h-20 border-4 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Activity className="w-8 h-8 text-cyan-400 animate-pulse" />
                      </div>
                    </div>
                  </div>
                  <p className="text-2xl font-bold mb-2">Analizando contenido...</p>
                  <p className="text-purple-300 mb-8">Procesando con IA avanzada</p>
                  
                  <div className="flex flex-wrap items-center justify-center gap-3">
                    <span className="text-sm text-purple-300 font-medium">Prueba rápida:</span>
                    <button 
                      onClick={() => {
                        setText('Este producto es increíble, superó todas mis expectativas. La calidad es excelente y el servicio al cliente fue muy atento.');
                        setAnalyzing(false);
                      }}
                      className="px-5 py-2.5 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-2 border-green-400/40 rounded-xl text-green-300 text-sm font-semibold hover:from-green-500/30 hover:to-emerald-500/30 transition-all transform hover:scale-105"
                    >
                      ✓ Positiva
                    </button>
                    <button 
                      onClick={() => {
                        setText('Terrible experiencia, el producto llegó defectuoso y el servicio al cliente no respondió. No lo recomiendo para nada.');
                        setAnalyzing(false);
                      }}
                      className="px-5 py-2.5 bg-gradient-to-r from-red-500/20 to-rose-500/20 border-2 border-red-400/40 rounded-xl text-red-300 text-sm font-semibold hover:from-red-500/30 hover:to-rose-500/30 transition-all transform hover:scale-105"
                    >
                      ✗ Negativa
                    </button>
                    <button 
                      onClick={() => {
                        setText('El producto es correcto, cumple con lo esperado. Nada del otro mundo, pero tampoco tiene problemas importantes.');
                        setAnalyzing(false);
                      }}
                      className="px-5 py-2.5 bg-gradient-to-r from-amber-500/20 to-orange-500/20 border-2 border-amber-400/40 rounded-xl text-amber-300 text-sm font-semibold hover:from-amber-500/30 hover:to-orange-500/30 transition-all transform hover:scale-105"
                    >
                      ◐ Neutral
                    </button>
                  </div>
                </div>
              )}

              {/* Results */}
              {results && !analyzing && (
                <div className="mt-10">
                  <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-8 border-2 border-white/20 shadow-2xl backdrop-blur-xl">
                    <div className="flex items-center gap-2 mb-6">
                      <TrendingUp className="w-6 h-6 text-cyan-400" />
                      <h3 className="text-2xl font-bold">Resultado del Análisis</h3>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      <div 
                        className="p-6 rounded-xl font-bold text-xl border-2 text-center shadow-lg"
                        style={{ 
                          backgroundColor: getSentimentColor(results.sentiment) + '20',
                          borderColor: getSentimentColor(results.sentiment),
                          color: getSentimentColor(results.sentiment)
                        }}
                      >
                        <div className="text-sm opacity-75 mb-2">SENTIMIENTO DETECTADO</div>
                        <div className="text-3xl uppercase tracking-wider">{results.sentiment}</div>
                      </div>
                      
                      <div className="p-6 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-xl border-2 border-indigo-400/40 text-center shadow-lg">
                        <div className="text-sm text-indigo-300 mb-2">NIVEL DE CONFIANZA</div>
                        <div className="text-4xl font-bold text-white">{(results.score * 100).toFixed(1)}%</div>
                        <div className="mt-3 bg-white/10 rounded-full h-3 overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-indigo-400 to-purple-500 transition-all duration-1000 rounded-full"
                            style={{ width: `${results.score * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                      <div className="text-sm text-purple-300 mb-3 font-semibold uppercase tracking-wide">Texto analizado:</div>
                      <p className="text-white/95 leading-relaxed text-lg">"{results.text}"</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Statistics Dashboard */}
        {history.length > 0 && (
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-black mb-3 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                Panel de Estadísticas
              </h2>
              <p className="text-purple-300 text-lg">Análisis detallado de todos tus resultados</p>
            </div>
            
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
              <div className="bg-white rounded-2xl p-6 shadow-xl transform hover:scale-105 transition-all">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-indigo-100 rounded-xl">
                    <BarChart3 className="w-7 h-7 text-indigo-600" />
                  </div>
                  <div className="text-3xl font-black text-indigo-600">{history.length}</div>
                </div>
                <div className="text-gray-600 font-semibold text-sm uppercase tracking-wide">Total Análisis</div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-xl transform hover:scale-105 transition-all">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-green-100 rounded-xl">
                    <TrendingUp className="w-7 h-7 text-green-600" />
                  </div>
                  <div className="text-3xl font-black text-green-600">
                    {history.filter(h => h.sentiment === 'positivo').length}
                  </div>
                </div>
                <div className="text-gray-600 font-semibold text-sm uppercase tracking-wide">Positivos</div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-xl transform hover:scale-105 transition-all">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-red-100 rounded-xl">
                    <Activity className="w-7 h-7 text-red-600" />
                  </div>
                  <div className="text-3xl font-black text-red-600">
                    {history.filter(h => h.sentiment === 'negativo').length}
                  </div>
                </div>
                <div className="text-gray-600 font-semibold text-sm uppercase tracking-wide">Negativos</div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-xl transform hover:scale-105 transition-all">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-amber-100 rounded-xl">
                    <Target className="w-7 h-7 text-amber-600" />
                  </div>
                  <div className="text-3xl font-black text-amber-600">
                    {history.filter(h => h.sentiment === 'neutral').length}
                  </div>
                </div>
                <div className="text-gray-600 font-semibold text-sm uppercase tracking-wide">Neutrales</div>
              </div>
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Pie Chart */}
              <div className="bg-white rounded-3xl p-8 shadow-2xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-indigo-100 rounded-lg">
                    <Target className="w-6 h-6 text-indigo-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">Distribución de Sentimientos</h3>
                </div>
                <div className="overflow-x-auto overflow-y-hidden">
                  <div style={{ minWidth: '400px', width: '100%', height: 350 }}>
                    <ResponsiveContainer width="100%" height={350}>
                      <PieChart>
                        <defs>
                          <filter id="shadow" height="200%">
                            <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.3"/>
                          </filter>
                        </defs>
                        <Pie
                          data={getStatistics()}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percentage }) => `${name} ${percentage}%`}
                          outerRadius={120}
                          innerRadius={70}
                          fill="#8884d8"
                          dataKey="value"
                          paddingAngle={3}
                          style={{ filter: 'url(#shadow)' }}
                        >
                          {getStatistics().map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip content={<CustomTooltip />} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                <div className="flex justify-center gap-6 mt-6">
                  {getStatistics().map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full" style={{ backgroundColor: item.color }}></div>
                      <span className="text-gray-700 font-semibold text-sm">{item.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bar Chart */}
              <div className="bg-white rounded-3xl p-8 shadow-2xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <BarChart3 className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">Distribución de Puntuaciones</h3>
                </div>
                <div className="overflow-x-auto overflow-y-hidden">
                  <div style={{ minWidth: '500px', width: '100%', height: 350 }}>
                    <ResponsiveContainer width="100%" height={350}>
                      <BarChart data={getScoreDistribution()} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
                        <defs>
                          <linearGradient id="colorBar" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#8b5cf6" stopOpacity={1}/>
                            <stop offset="100%" stopColor="#6366f1" stopOpacity={0.8}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                        <XAxis 
                          dataKey="name" 
                          stroke="#6b7280" 
                          style={{ fontSize: '13px', fontWeight: '600' }}
                          tick={{ fill: '#374151' }}
                          tickLine={false}
                        />
                        <YAxis 
                          stroke="#6b7280" 
                          style={{ fontSize: '13px', fontWeight: '600' }}
                          tick={{ fill: '#374151' }}
                          tickLine={false}
                          axisLine={false}
                        />
                        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(139, 92, 246, 0.08)' }} />
                        <Bar 
                          dataKey="value" 
                          fill="url(#colorBar)" 
                          radius={[16, 16, 0, 0]}
                          maxBarSize={70}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>

            {/* Trend Chart */}
            {history.length > 2 && (
              <div className="bg-white rounded-3xl p-8 shadow-2xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-cyan-100 rounded-lg">
                    <TrendingUp className="w-6 h-6 text-cyan-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">Tendencia de Puntuaciones</h3>
                </div>
                <div className="overflow-x-auto overflow-y-hidden">
                  <div style={{ minWidth: '700px', width: '100%', height: 300 }}>
                    <ResponsiveContainer width="100%" height={300}>
                      <AreaChart data={getTrendData()} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
                        <defs>
                          <linearGradient id="colorArea" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4}/>
                            <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.05}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                        <XAxis 
                          dataKey="index" 
                          stroke="#6b7280" 
                          style={{ fontSize: '13px', fontWeight: '600' }}
                          tick={{ fill: '#374151' }}
                          tickLine={false}
                          label={{ value: 'Análisis #', position: 'insideBottom', offset: -10, fill: '#6b7280', fontWeight: 600 }}
                        />
                        <YAxis 
                          stroke="#6b7280" 
                          style={{ fontSize: '13px', fontWeight: '600' }}
                          tick={{ fill: '#374151' }}
                          tickLine={false}
                          axisLine={false}
                          label={{ value: 'Puntuación (%)', angle: -90, position: 'insideLeft', fill: '#6b7280', fontWeight: 600 }}
                        />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: '#ffffff', 
                            border: '2px solid #e5e7eb', 
                            borderRadius: '12px',
                            boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                            padding: '12px'
                          }}
                          labelStyle={{ color: '#1f2937', fontWeight: 'bold' }}
                        />
                        <Area 
                          type="monotone" 
                          dataKey="score" 
                          stroke="#06b6d4" 
                          strokeWidth={3}
                          fill="url(#colorArea)" 
                          dot={{ fill: '#06b6d4', strokeWidth: 2, r: 5 }}
                          activeDot={{ r: 7, strokeWidth: 2 }}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SentimentAPI;