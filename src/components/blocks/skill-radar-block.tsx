"use client";

import { motion } from "framer-motion";
import { Radar } from "lucide-react";
import { BentoCard } from "../bento-card";

interface Skill {
  label: string;
  value: number; // 0-100
  color: string;
}

const SKILLS: Skill[] = [
  { label: "Red Team", value: 85, color: "#FF003C" },
  { label: "Blue Team", value: 75, color: "#00D4FF" },
  { label: "Dev", value: 90, color: "#00FF41" },
  { label: "Network", value: 80, color: "#00D4FF" },
  { label: "OSINT", value: 70, color: "#A78BFA" },
  { label: "Cloud", value: 65, color: "#F59E0B" },
];

const CENTER = 150;
const RADIUS = 100;
const RINGS = 4;

function polarToCartesian(
  angle: number,
  radius: number,
): { x: number; y: number } {
  // Start from top (-90 degrees)
  const rad = ((angle - 90) * Math.PI) / 180;
  return {
    x: CENTER + radius * Math.cos(rad),
    y: CENTER + radius * Math.sin(rad),
  };
}

function getPolygonPoints(skills: Skill[], maxRadius: number): string {
  const angleStep = 360 / skills.length;
  return skills
    .map((skill, i) => {
      const r = (skill.value / 100) * maxRadius;
      const { x, y } = polarToCartesian(i * angleStep, r);
      return `${x},${y}`;
    })
    .join(" ");
}

function getPolygonPath(skills: Skill[], maxRadius: number): string {
  const angleStep = 360 / skills.length;
  const points = skills.map((skill, i) => {
    const r = (skill.value / 100) * maxRadius;
    return polarToCartesian(i * angleStep, r);
  });

  return (
    points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ") +
    " Z"
  );
}

export function SkillRadarBlock() {
  const angleStep = 360 / SKILLS.length;

  return (
    <BentoCard className="col-span-1 md:col-span-2">
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Radar className="h-4 w-4 text-brand-blue" />
          <h3 className="text-sm font-medium text-brand-text-secondary">
            Skill Radar
          </h3>
        </div>
        <span className="font-mono text-[10px] uppercase tracking-wider text-brand-text-secondary">
          Proficiency
        </span>
      </div>

      <div className="flex items-center justify-center">
        <svg viewBox="0 0 300 300" className="h-full w-full max-w-[280px]">
          <defs>
            <radialGradient id="radarGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#00D4FF" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#00D4FF" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="radarFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#00D4FF" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#00D4FF" stopOpacity="0.05" />
            </linearGradient>
          </defs>

          {/* Background ambient glow */}
          <circle
            cx={CENTER}
            cy={CENTER}
            r={RADIUS + 10}
            fill="url(#radarGlow)"
          />

          {/* Concentric rings */}
          {Array.from({ length: RINGS }, (_, i) => {
            const r = ((i + 1) / RINGS) * RADIUS;
            return (
              <motion.circle
                key={`ring-${i}`}
                cx={CENTER}
                cy={CENTER}
                r={r}
                fill="none"
                stroke="#1A1A1A"
                strokeWidth={0.8}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                style={{ transformOrigin: `${CENTER}px ${CENTER}px` }}
              />
            );
          })}

          {/* Axis lines */}
          {SKILLS.map((_, i) => {
            const { x, y } = polarToCartesian(i * angleStep, RADIUS);
            return (
              <motion.line
                key={`axis-${i}`}
                x1={CENTER}
                y1={CENTER}
                x2={x}
                y2={y}
                stroke="#1A1A1A"
                strokeWidth={0.8}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.05 }}
              />
            );
          })}

          {/* Data polygon — filled area */}
          <motion.path
            d={getPolygonPath(SKILLS, RADIUS)}
            fill="url(#radarFill)"
            stroke="#00D4FF"
            strokeWidth={1.5}
            strokeLinejoin="round"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
            style={{ transformOrigin: `${CENTER}px ${CENTER}px` }}
          />

          {/* Data points on polygon vertices */}
          {SKILLS.map((skill, i) => {
            const r = (skill.value / 100) * RADIUS;
            const { x, y } = polarToCartesian(i * angleStep, r);
            return (
              <motion.g key={`point-${i}`}>
                {/* Outer glow */}
                <motion.circle
                  cx={x}
                  cy={y}
                  r={6}
                  fill={skill.color}
                  opacity={0.15}
                  initial={{ scale: 0 }}
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{
                    duration: 2,
                    delay: 0.8 + i * 0.1,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                {/* Main dot */}
                <motion.circle
                  cx={x}
                  cy={y}
                  r={3}
                  fill={skill.color}
                  stroke="#000"
                  strokeWidth={1}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.8 + i * 0.1 }}
                />
              </motion.g>
            );
          })}

          {/* Labels */}
          {SKILLS.map((skill, i) => {
            const labelR = RADIUS + 22;
            const { x, y } = polarToCartesian(i * angleStep, labelR);
            return (
              <motion.text
                key={`label-${i}`}
                x={x}
                y={y}
                textAnchor="middle"
                dominantBaseline="middle"
                className="fill-brand-text-secondary text-[9px] font-medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 1 + i * 0.05 }}
              >
                {skill.label}
              </motion.text>
            );
          })}

          {/* Value labels next to dots */}
          {SKILLS.map((skill, i) => {
            const r = (skill.value / 100) * RADIUS;
            const valR = r - 12;
            const { x, y } = polarToCartesian(i * angleStep, valR);
            return (
              <motion.text
                key={`val-${i}`}
                x={x}
                y={y}
                textAnchor="middle"
                dominantBaseline="middle"
                className="fill-brand-blue font-mono text-[8px] font-bold"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                transition={{ duration: 0.4, delay: 1.2 + i * 0.05 }}
              >
                {skill.value}
              </motion.text>
            );
          })}
        </svg>
      </div>

      {/* Skill legend */}
      <div className="mt-2 flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
        {SKILLS.map((skill) => (
          <div key={skill.label} className="flex items-center gap-1.5">
            <span
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: skill.color }}
            />
            <span className="text-[10px] text-brand-text-secondary">
              {skill.label}
            </span>
          </div>
        ))}
      </div>
    </BentoCard>
  );
}
