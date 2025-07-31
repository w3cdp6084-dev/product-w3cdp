import { useEffect, useRef, useState } from 'react'
import { useTheme } from '@/contexts/ThemeContext'

interface LottieAnimationProps {
  src: string
  width?: string
  height?: string
  speed?: number
  autoplay?: boolean
  loop?: boolean
  className?: string
  onClick?: () => void
}

export function LottieAnimation({
  src,
  width = '300px',
  height = '300px',
  speed = 1,
  autoplay = true,
  loop = true,
  className = '',
  onClick
}: LottieAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()
  const [isPlaying, setIsPlaying] = useState(false)
  const [key, setKey] = useState(0)

  const handleClick = () => {
    if (onClick && !isPlaying) {
      setIsPlaying(true)
      // コンポーネントを再マウントして最初から再生
      setKey(prev => prev + 1)
      
      // アニメーション後にテーマ変更
      setTimeout(() => {
        onClick()
        setIsPlaying(false)
      }, 1500)
    }
  }

  useEffect(() => {
    if (!containerRef.current) return

    const script = document.createElement('script')
    script.src = 'https://unpkg.com/@lottiefiles/dotlottie-wc@0.6.2/dist/dotlottie-wc.js'
    script.type = 'module'
    
    const loadLottie = () => {
      const lottieElement = document.createElement('dotlottie-wc')
      lottieElement.setAttribute('src', src)
      lottieElement.setAttribute('speed', speed.toString())
      
      // クリック時は常に自動再生、ループなし
      if (onClick && isPlaying) {
        lottieElement.setAttribute('autoplay', '')
      } else if (autoplay && !onClick) {
        lottieElement.setAttribute('autoplay', '')
      }
      
      if (loop && !onClick) {
        lottieElement.setAttribute('loop', '')
      }
      
      lottieElement.style.width = width
      lottieElement.style.height = height
      
      if (theme === 'dark') {
        lottieElement.style.filter = 'invert(1) hue-rotate(180deg)'
        lottieElement.style.opacity = '0.8'
      }
      
      containerRef.current!.innerHTML = ''
      containerRef.current!.appendChild(lottieElement)
    }

    if (document.querySelector('script[src*="dotlottie-wc"]')) {
      loadLottie()
    } else {
      script.onload = loadLottie
      document.head.appendChild(script)
    }

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = ''
      }
    }
  }, [src, width, height, speed, autoplay, loop, theme, key, isPlaying])

  return (
    <div 
      ref={containerRef} 
      className={`lottie-container ${className} ${onClick ? 'cursor-pointer hover:scale-110 active:scale-95' : ''}`}
      style={{
        transition: 'filter 0.3s ease-in-out, opacity 0.3s ease-in-out, transform 0.2s ease-in-out'
      }}
      onClick={handleClick}
    />
  )
}