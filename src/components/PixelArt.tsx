import React, { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

interface PixelArtProps {
  // グリッド上の位置（8pxグリッドの何番目か）
  gridX: number
  gridY: number
  // ピクセルアートのデータ（2次元配列）
  pixels: string[][] | string[][][]  // 単一フレームまたは複数フレーム
  // 1ピクセルのサイズ（デフォルトは8px）
  pixelSize?: number
  // アニメーション設定
  animation?: {
    type: 'bounce' | 'float' | 'shake' | 'rotate' | 'blink' | 'move' | 'frame'
    duration?: number  // ミリ秒
    distance?: number  // グリッド単位での移動距離
    direction?: 'horizontal' | 'vertical' | 'both'
    loop?: boolean
  }
  className?: string
}

export function PixelArt({ 
  gridX, 
  gridY, 
  pixels, 
  pixelSize = 8, 
  animation,
  className 
}: PixelArtProps) {
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const [rotation, setRotation] = useState(0)
  const [opacity, setOpacity] = useState(1)
  const [currentFrame, setCurrentFrame] = useState(0)
  
  // フレームアニメーション用
  const isFrameAnimation = Array.isArray(pixels[0]) && Array.isArray(pixels[0][0])
  const frames = isFrameAnimation ? pixels as string[][][] : [pixels as string[][]]
  const currentPixels = frames[currentFrame]

  useEffect(() => {
    if (!animation) return

    const { type, duration = 1000, distance = 2, direction = 'vertical', loop = true } = animation
    let animationFrame: number
    let startTime = Date.now()

    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = (elapsed % duration) / duration
      const easeInOut = progress < 0.5 
        ? 2 * progress * progress 
        : 1 - Math.pow(-2 * progress + 2, 2) / 2

      switch (type) {
        case 'bounce':
          setOffset({
            x: 0,
            y: direction === 'horizontal' ? 0 : -Math.abs(Math.sin(progress * Math.PI)) * distance
          })
          break
          
        case 'float':
          setOffset({
            x: direction === 'vertical' ? 0 : Math.sin(progress * Math.PI * 2) * distance,
            y: direction === 'horizontal' ? 0 : Math.sin(progress * Math.PI * 2) * distance
          })
          break
          
        case 'shake':
          setOffset({
            x: (Math.random() - 0.5) * distance * 0.5,
            y: (Math.random() - 0.5) * distance * 0.5
          })
          break
          
        case 'rotate':
          setRotation(progress * 360)
          break
          
        case 'blink':
          setOpacity(progress < 0.5 ? 1 : 0.3)
          break
          
        case 'move':
          const moveProgress = loop ? easeInOut : Math.min(progress, 1)
          setOffset({
            x: direction !== 'vertical' ? moveProgress * distance : 0,
            y: direction !== 'horizontal' ? moveProgress * distance : 0
          })
          if (!loop && progress >= 1) return
          break
          
        case 'frame':
          if (isFrameAnimation) {
            const frameIndex = Math.floor(progress * frames.length)
            setCurrentFrame(frameIndex % frames.length)
          }
          break
      }

      animationFrame = requestAnimationFrame(animate)
    }

    animate()
    return () => cancelAnimationFrame(animationFrame)
  }, [animation, isFrameAnimation, frames.length])

  return (
    <div
      className={cn("absolute transition-opacity", className)}
      style={{
        left: `${(gridX + offset.x) * pixelSize}px`,
        top: `${(gridY + offset.y) * pixelSize}px`,
        transform: `rotate(${rotation}deg)`,
        opacity,
        transformOrigin: 'center',
      }}
    >
      {currentPixels.map((row, y) => (
        <div key={y} className="flex">
          {row.map((color, x) => (
            <div
              key={`${x}-${y}`}
              className="pixel"
              style={{
                width: `${pixelSize}px`,
                height: `${pixelSize}px`,
                backgroundColor: color === '.' ? 'transparent' : color,
              }}
            />
          ))}
        </div>
      ))}
    </div>
  )
}

// プリセットのドット絵パターン
export const pixelPatterns = {
  // シンプルなハート
  heart: [
    ['.', '#ff0066', '.', '.', '.', '#ff0066', '.'],
    ['#ff0066', '#ff0066', '#ff0066', '.', '#ff0066', '#ff0066', '#ff0066'],
    ['#ff0066', '#ff0066', '#ff0066', '#ff0066', '#ff0066', '#ff0066', '#ff0066'],
    ['#ff0066', '#ff0066', '#ff0066', '#ff0066', '#ff0066', '#ff0066', '#ff0066'],
    ['.', '#ff0066', '#ff0066', '#ff0066', '#ff0066', '#ff0066', '.'],
    ['.', '.', '#ff0066', '#ff0066', '#ff0066', '.', '.'],
    ['.', '.', '.', '#ff0066', '.', '.', '.'],
  ],
  
  // スター
  star: [
    ['.', '.', '.', '#ffd700', '.', '.', '.'],
    ['.', '.', '#ffd700', '#ffd700', '#ffd700', '.', '.'],
    ['#ffd700', '#ffd700', '#ffd700', '#ffd700', '#ffd700', '#ffd700', '#ffd700'],
    ['.', '#ffd700', '#ffd700', '#ffd700', '#ffd700', '#ffd700', '.'],
    ['.', '#ffd700', '#ffd700', '.', '#ffd700', '#ffd700', '.'],
    ['#ffd700', '#ffd700', '.', '.', '.', '#ffd700', '#ffd700'],
  ],
  
  // スマイル
  smile: [
    ['.', '#ffeb3b', '#ffeb3b', '#ffeb3b', '#ffeb3b', '#ffeb3b', '.'],
    ['#ffeb3b', '#ffeb3b', '#ffeb3b', '#ffeb3b', '#ffeb3b', '#ffeb3b', '#ffeb3b'],
    ['#ffeb3b', '#000', '#ffeb3b', '#ffeb3b', '#ffeb3b', '#000', '#ffeb3b'],
    ['#ffeb3b', '#ffeb3b', '#ffeb3b', '#ffeb3b', '#ffeb3b', '#ffeb3b', '#ffeb3b'],
    ['#ffeb3b', '#000', '#ffeb3b', '#ffeb3b', '#ffeb3b', '#000', '#ffeb3b'],
    ['#ffeb3b', '#ffeb3b', '#000', '#000', '#000', '#ffeb3b', '#ffeb3b'],
    ['.', '#ffeb3b', '#ffeb3b', '#ffeb3b', '#ffeb3b', '#ffeb3b', '.'],
  ],
  
  // 矢印
  arrow: [
    ['.', '.', '#2196f3', '#2196f3', '.', '.', '.'],
    ['.', '#2196f3', '#2196f3', '#2196f3', '#2196f3', '.', '.'],
    ['#2196f3', '#2196f3', '#2196f3', '#2196f3', '#2196f3', '#2196f3', '.'],
    ['.', '.', '#2196f3', '#2196f3', '.', '.', '.'],
    ['.', '.', '#2196f3', '#2196f3', '.', '.', '.'],
    ['.', '.', '#2196f3', '#2196f3', '.', '.', '.'],
  ],
  
  // ドット
  dot: [
    ['#4caf50', '#4caf50'],
    ['#4caf50', '#4caf50'],
  ],
  
  // 十字
  cross: [
    ['.', '#e91e63', '.'],
    ['#e91e63', '#e91e63', '#e91e63'],
    ['.', '#e91e63', '.'],
  ],
}

// アニメーション用のフレームパターン
export const animatedPixelPatterns = {
  // 歩く人（2フレーム）
  walkingPerson: [
    // フレーム1
    [
      ['.', '.', '#333', '#333', '.', '.'],
      ['.', '#333', '#fdbcb4', '#fdbcb4', '#333', '.'],
      ['.', '.', '#333', '#333', '.', '.'],
      ['.', '#333', '#4169e1', '#4169e1', '#333', '.'],
      ['#333', '.', '#4169e1', '#4169e1', '.', '#333'],
      ['.', '.', '#333', '#333', '.', '.'],
      ['.', '#333', '.', '.', '#333', '.'],
    ],
    // フレーム2
    [
      ['.', '.', '#333', '#333', '.', '.'],
      ['.', '#333', '#fdbcb4', '#fdbcb4', '#333', '.'],
      ['.', '.', '#333', '#333', '.', '.'],
      ['.', '#333', '#4169e1', '#4169e1', '#333', '.'],
      ['.', '#333', '#4169e1', '#4169e1', '#333', '.'],
      ['.', '#333', '.', '.', '#333', '.'],
      ['#333', '.', '.', '.', '.', '#333'],
    ],
  ],
  
  // 点滅する星（3フレーム）
  blinkingStar: [
    // 明るい
    [
      ['.', '.', '#fff700', '.', '.'],
      ['.', '#fff700', '#fff700', '#fff700', '.'],
      ['#fff700', '#fff700', '#fff700', '#fff700', '#fff700'],
      ['.', '#fff700', '#fff700', '#fff700', '.'],
      ['.', '.', '#fff700', '.', '.'],
    ],
    // 中間
    [
      ['.', '.', '#ffeb3b', '.', '.'],
      ['.', '#ffeb3b', '#ffeb3b', '#ffeb3b', '.'],
      ['#ffeb3b', '#ffeb3b', '#ffeb3b', '#ffeb3b', '#ffeb3b'],
      ['.', '#ffeb3b', '#ffeb3b', '#ffeb3b', '.'],
      ['.', '.', '#ffeb3b', '.', '.'],
    ],
    // 暗い
    [
      ['.', '.', '#ffd700', '.', '.'],
      ['.', '#ffd700', '#ffd700', '#ffd700', '.'],
      ['#ffd700', '#ffd700', '#ffd700', '#ffd700', '#ffd700'],
      ['.', '#ffd700', '#ffd700', '#ffd700', '.'],
      ['.', '.', '#ffd700', '.', '.'],
    ],
  ],
}