import React from 'react';

interface LogoProps {
  size?: number;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ size = 60, className = '' }) => {
  return (
    <div className={`inline-flex items-center ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="10"
          y="20"
          width="80"
          height="60"
          rx="5"
          fill="#e4ecff"
          stroke="#4f46e5"
          strokeWidth="4"
        />
        <text x="20" y="45" fontSize="16" fontWeight="bold" fill="#4f46e5">
          CSV
        </text>
        <path d="M50 40 L70 60" stroke="#4f46e5" strokeWidth="3" strokeLinecap="round" />
        <path d="M50 60 L70 40" stroke="#4f46e5" strokeWidth="3" strokeLinecap="round" />
        <text x="20" y="75" fontSize="16" fontWeight="bold" fill="#4f46e5">
          JSONL
        </text>
      </svg>
    </div>
  );
};

export default Logo;
