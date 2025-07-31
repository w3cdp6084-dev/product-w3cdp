import React from 'react'
import { useTheme } from '@/contexts/ThemeContext'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="fixed top-4 right-4 z-50">
      <button
        onClick={toggleTheme}
        className={`relative w-[90px] h-[40px] rounded-full p-1 transition-colors duration-500 ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-blue-500'
        }`}
        aria-label="Toggle theme"
      >
        {/* Toggle circle */}
        <div
          className={`absolute w-[32px] h-[32px] bg-white rounded-full transition-all duration-500 flex items-center justify-center ${
            theme === 'dark' ? 'translate-x-[46px]' : 'translate-x-0'
          }`}
        >
          {/* Sun */}
          <div className={`absolute ${theme === 'dark' ? 'opacity-0 scale-50' : 'opacity-100 scale-100'} transition-all duration-500`}>
            {/* Sun rays */}
            <div className="absolute inset-0 flex items-center justify-center">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-[2px] h-[6px] bg-yellow-500"
                  style={{
                    transform: `rotate(${i * 45}deg) translateY(-12px)`,
                  }}
                />
              ))}
            </div>
            {/* Sun center */}
            <div className="relative w-[16px] h-[16px] bg-yellow-400 rounded-full" />
          </div>

          {/* Moon */}
          <div className={`absolute flex items-center justify-center ${theme === 'dark' ? 'opacity-100 scale-100' : 'opacity-0 scale-50'} transition-all duration-500`}>
            <div className="relative w-[18px] h-[18px]">
              <div className="absolute inset-0 bg-gray-300 rounded-full" />
              <div className="absolute w-[14px] h-[14px] bg-gray-800 rounded-full -top-[3px] -right-[3px]" />
            </div>
          </div>
        </div>

        {/* Clouds */}
        <div className="absolute inset-0 overflow-hidden rounded-full">
          {/* Day clouds */}
          <div className={`absolute transition-all duration-500 ${theme === 'dark' ? 'opacity-0 translate-x-8' : 'opacity-100 translate-x-0'}`}>
            <div className="absolute w-[15px] h-[15px] bg-white/30 rounded-full top-[8px] left-[15px]" />
            <div className="absolute w-[10px] h-[10px] bg-white/30 rounded-full top-[12px] left-[25px]" />
            <div className="absolute w-[12px] h-[12px] bg-white/30 rounded-full bottom-[10px] left-[20px]" />
          </div>

          {/* Night stars */}
          <div className={`absolute transition-all duration-500 ${theme === 'dark' ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            <div className="absolute w-[2px] h-[2px] bg-white rounded-full top-[10px] left-[20px] animate-pulse" />
            <div className="absolute w-[2px] h-[2px] bg-white rounded-full top-[15px] left-[30px] animate-pulse delay-75" />
            <div className="absolute w-[2px] h-[2px] bg-white rounded-full bottom-[12px] left-[25px] animate-pulse delay-150" />
            <div className="absolute w-[3px] h-[3px] bg-white rounded-full top-[20px] left-[15px] animate-pulse delay-300" />
          </div>
        </div>
      </button>
    </div>
  )
}