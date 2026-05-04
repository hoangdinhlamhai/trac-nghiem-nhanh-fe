'use client';

import { motion } from 'framer-motion';
import { Brain, TrendingUp, TrendingDown, Briefcase } from 'lucide-react';
import type { MBTIDetail } from '@/types';

interface MBTIResultProps {
  mbtiDetail: MBTIDetail;
}

interface DimensionBarProps {
  leftLabel: string;
  rightLabel: string;
  leftValue: number;
  rightValue: number;
  delay: number;
}

function DimensionBar({ leftLabel, rightLabel, leftValue, rightValue, delay }: DimensionBarProps) {
  const total = leftValue + rightValue;
  const leftPercent = total > 0 ? Math.round((leftValue / total) * 100) : 50;
  const rightPercent = 100 - leftPercent;
  const isLeftDominant = leftPercent >= rightPercent;

  return (
    <div className="mb-4">
      <div className="flex justify-between text-sm font-medium mb-1.5">
        <span className={isLeftDominant ? 'text-primary' : ''} style={!isLeftDominant ? { color: 'var(--text-muted)' } : undefined}>
          {leftLabel} ({leftPercent}%)
        </span>
        <span className={!isLeftDominant ? 'text-primary' : ''} style={isLeftDominant ? { color: 'var(--text-muted)' } : undefined}>
          {rightLabel} ({rightPercent}%)
        </span>
      </div>
      <div className="h-3 rounded-full overflow-hidden flex" style={{ backgroundColor: 'var(--glass-bg)' }}>
        <motion.div
          className="h-full bg-primary rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${leftPercent}%` }}
          transition={{ duration: 0.8, delay, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}

export default function MBTIResult({ mbtiDetail }: MBTIResultProps) {
  const { type, name, description, strengths, weaknesses, careers, dimensions } = mbtiDetail;

  return (
    <div className="space-y-6">
      {/* Type header */}
      <motion.div
        className="glass-panel-dark rounded-2xl p-8 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="inline-flex items-center gap-2 mb-3">
          <Brain className="w-5 h-5 text-primary" />
          <span className="text-sm font-medium" style={{ color: 'var(--text-muted)' }}>Loại tính cách của bạn</span>
        </div>
        <h2 className="font-heading text-3xl md:text-4xl font-bold mb-2" style={{ color: 'var(--text-main)' }}>
          {type} — {name}
        </h2>
        <p className="max-w-2xl mx-auto leading-relaxed" style={{ color: 'var(--text-muted)' }}>
          {description}
        </p>
      </motion.div>

      {/* Dimensions */}
      <motion.div
        className="glass-panel-dark rounded-2xl p-6 md:p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <h3 className="font-heading text-lg font-semibold mb-5" style={{ color: 'var(--text-main)' }}>
          Phân tích 4 chiều tính cách
        </h3>
        <DimensionBar
          leftLabel="Hướng ngoại (E)"
          rightLabel="Hướng nội (I)"
          leftValue={dimensions.EI.E}
          rightValue={dimensions.EI.I}
          delay={0.2}
        />
        <DimensionBar
          leftLabel="Giác quan (S)"
          rightLabel="Trực giác (N)"
          leftValue={dimensions.SN.S}
          rightValue={dimensions.SN.N}
          delay={0.4}
        />
        <DimensionBar
          leftLabel="Lý trí (T)"
          rightLabel="Cảm xúc (F)"
          leftValue={dimensions.TF.T}
          rightValue={dimensions.TF.F}
          delay={0.6}
        />
        <DimensionBar
          leftLabel="Nguyên tắc (J)"
          rightLabel="Linh hoạt (P)"
          leftValue={dimensions.JP.J}
          rightValue={dimensions.JP.P}
          delay={0.8}
        />
      </motion.div>

      {/* Strengths & Weaknesses */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          className="glass-panel-dark rounded-2xl p-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-green-500" />
            <h3 className="font-heading text-lg font-semibold" style={{ color: 'var(--text-main)' }}>Điểm mạnh</h3>
          </div>
          <ul className="space-y-2">
            {strengths.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm" style={{ color: 'var(--text-main)' }}>
                <span className="text-green-500 mt-0.5">•</span>
                {item}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          className="glass-panel-dark rounded-2xl p-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <TrendingDown className="w-5 h-5 text-amber-500" />
            <h3 className="font-heading text-lg font-semibold" style={{ color: 'var(--text-main)' }}>Điểm yếu</h3>
          </div>
          <ul className="space-y-2">
            {weaknesses.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm" style={{ color: 'var(--text-main)' }}>
                <span className="text-amber-500 mt-0.5">•</span>
                {item}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* Careers */}
      <motion.div
        className="glass-panel-dark rounded-2xl p-6 md:p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <div className="flex items-center gap-2 mb-4">
          <Briefcase className="w-5 h-5 text-primary" />
          <h3 className="font-heading text-lg font-semibold" style={{ color: 'var(--text-main)' }}>Nghề nghiệp phù hợp</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {careers.map((career, idx) => (
            <span
              key={idx}
              className="px-3 py-1.5 text-primary text-sm rounded-lg font-medium"
              style={{ backgroundColor: 'var(--glass-bg)' }}
            >
              {career}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
