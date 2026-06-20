import React from 'react';

interface CrestLogoProps {
  className?: string;
  size?: number;
}

export default function CrestLogo({ className = '', size = 64 }: CrestLogoProps) {
  return (
    <svg 
      id="school-crest-logo"
      className={`${className} overflow-visible`} 
      width={size} 
      height={size} 
      viewBox="0 0 200 200" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer circular badge */}
      <circle cx="100" cy="100" r="92" stroke="#4f46e5" strokeWidth="6" fill="#ffffff" />
      <circle cx="100" cy="100" r="82" stroke="#d4af37" strokeWidth="2" fill="none" />
      
      {/* Blue inner circle containing crest details */}
      <circle cx="100" cy="100" r="62" fill="#eef2f3" stroke="#4f46e5" strokeWidth="2" />
      
      {/* Crown / Torse design on top inside seal */}
      <path d="M 75 75 L 85 62 L 100 70 L 115 62 L 125 75 Z" fill="#d4af37" stroke="#4f46e5" strokeWidth="1.5" />
      <circle cx="75" cy="75" r="2.5" fill="#4f46e5" />
      <circle cx="85" cy="62" r="2.5" fill="#4f46e5" />
      <circle cx="100" cy="70" r="2.5" fill="#4f46e5" />
      <circle cx="115" cy="62" r="2.5" fill="#4f46e5" />
      <circle cx="125" cy="75" r="2.5" fill="#4f46e5" />
      
      {/* Laurel Wreath sides */}
      <path d="M 45 100 Q 42 140 75 160 Q 82 163 85 158 Q 80 148 55 125 Z" fill="#2d8a4e" opacity="0.8" />
      <path d="M 155 100 Q 158 140 125 160 Q 118 163 115 158 Q 120 148 145 125 Z" fill="#2d8a4e" opacity="0.8" />
      
      {/* Rising Sun and Rays center */}
      <circle cx="100" cy="105" r="16" fill="#f39c12" />
      {/* Sun rays */}
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 332].map((angle, idx) => {
        const rad = (angle * Math.PI) / 180;
        const x1 = 100 + Math.cos(rad) * 16;
        const y1 = 105 + Math.sin(rad) * 16;
        const x2 = 100 + Math.cos(rad) * 25;
        const y2 = 105 + Math.sin(rad) * 25;
        return (
          <line 
            key={idx} 
            x1={x1} 
            y1={y1} 
            x2={x2} 
            y2={y2} 
            stroke="#f1c40f" 
            strokeWidth="2" 
            strokeLinecap="round" 
          />
        );
      })}

      {/* Open Book */}
      <path 
        d="M 72 132 C 85 124 100 129 100 129 C 100 129 115 124 128 132 L 128 112 C 115 104 100 109 100 109 C 100 109 85 104 72 112 Z" 
        fill="#ffffff" 
        stroke="#4f46e5" 
        strokeWidth="2" 
        strokeLinejoin="round" 
      />
      {/* Center line of book and pages */}
      <line x1="100" y1="109" x2="100" y2="129" stroke="#4f46e5" strokeWidth="2" />
      <line x1="78" y1="116" x2="94" y2="114" stroke="#7f8c8d" strokeWidth="1" />
      <line x1="78" y1="121" x2="94" y2="119" stroke="#7f8c8d" strokeWidth="1" />
      <line x1="78" y1="126" x2="94" y2="124" stroke="#7f8c8d" strokeWidth="1" />
      <line x1="106" y1="114" x2="122" y2="116" stroke="#7f8c8d" strokeWidth="1" />
      <line x1="106" y1="119" x2="122" y2="121" stroke="#7f8c8d" strokeWidth="1" />
      <line x1="106" y1="124" x2="122" y2="126" stroke="#7f8c8d" strokeWidth="1" />

      {/* School Name text on outer ring */}
      <path 
        id="curve-top" 
        d="M 30,100 A 70,70 0 1,1 170,100" 
        fill="none" 
      />
      <text fill="#4f46e5" fontSize="12" fontWeight="800" letterSpacing="1.2">
        <textPath href="#curve-top" startOffset="50%" textAnchor="middle">
          SHREE PHULESHWAR SEC. BOARDING SCHOOL
        </textPath>
      </text>

      {/* Saptari Nepal text on lower outer ring */}
      <path 
        id="curve-bottom" 
        d="M 170,100 A 70,70 0 0,1 30,100" 
        fill="none" 
      />
      <text fill="#d4af37" fontSize="11" fontWeight="700" letterSpacing="1.5">
        <textPath href="#curve-bottom" startOffset="50%" textAnchor="middle">
          KALYANPUR, SAPTARI • NEPAL •
        </textPath>
      </text>
    </svg>
  );
}
