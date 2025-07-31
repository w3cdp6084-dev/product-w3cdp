import React, { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

interface RetroPixelArtProps {
  gridX: number
  gridY: number
  pixels: string[][]
  pixelSize?: number
  // レトロゲーム風のシンプルな動き
  movement?: {
    pattern: 'patrol' | 'bounce' | 'idle' | 'wiggle'
    steps?: number  // 移動するグリッド数
    interval?: number  // フレーム更新間隔（ミリ秒）
  }
  className?: string
}

export function RetroPixelArt({ 
  gridX, 
  gridY, 
  pixels, 
  pixelSize = 8,
  movement,
  className 
}: RetroPixelArtProps) {
  const [position, setPosition] = useState({ x: gridX, y: gridY })
  const [frame, setFrame] = useState(0)

  useEffect(() => {
    if (!movement) return

    const { pattern, steps = 2, interval = 500 } = movement
    
    const timer = setInterval(() => {
      setFrame(prev => prev + 1)
      
      switch (pattern) {
        case 'patrol':
          // 左右にカクカク移動（2歩右、2歩左の繰り返し）
          setPosition(prev => {
            const step = frame % (steps * 4)
            if (step < steps * 2) {
              // 右へ
              return { x: gridX + (step < steps ? 1 : 2), y: gridY }
            } else {
              // 左へ
              return { x: gridX + (step < steps * 3 ? 1 : 0), y: gridY }
            }
          })
          break
          
        case 'bounce':
          // 上下にカクカク跳ねる
          setPosition(prev => {
            const step = frame % 4
            const yOffset = step === 1 || step === 2 ? -1 : 0
            return { x: gridX, y: gridY + yOffset }
          })
          break
          
        case 'wiggle':
          // その場で左右に震える
          setPosition(prev => {
            const wiggle = frame % 2 === 0 ? 0 : 1
            return { x: gridX + wiggle, y: gridY }
          })
          break
          
        case 'idle':
          // その場でピクセルの点滅など（位置は変わらない）
          break
      }
    }, interval)

    return () => clearInterval(timer)
  }, [movement, gridX, gridY, frame])

  return (
    <div
      className={cn("absolute", className)}
      style={{
        left: `${position.x * pixelSize}px`,
        top: `${position.y * pixelSize}px`,
        imageRendering: 'pixelated',
        transition: 'none', // カクカクした動きのためtransitionなし
      }}
    >
      {pixels.map((row, y) => (
        <div key={y} className="flex">
          {row.map((color, x) => (
            <div
              key={`${x}-${y}`}
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

// 8ビット風のシンプルなキャラクター
export const retroPatterns = {
  // マリオ風
  mushroom: [
    ['.', '.', '#ff0000', '#ff0000', '#ff0000', '#ff0000', '.', '.'],
    ['.', '#ff0000', '#ffffff', '#ff0000', '#ff0000', '#ffffff', '#ff0000', '.'],
    ['#ff0000', '#ffffff', '#ffffff', '#ff0000', '#ff0000', '#ffffff', '#ffffff', '#ff0000'],
    ['#ff0000', '#ff0000', '#ff0000', '#ff0000', '#ff0000', '#ff0000', '#ff0000', '#ff0000'],
    ['.', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '.'],
    ['.', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '.'],
    ['.', '.', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '.', '.'],
    ['.', '.', '#ffffff', '.', '.', '#ffffff', '.', '.'],
  ],
  
  // スペースインベーダー風
  invader: [
    ['.', '.', '#00ff00', '.', '.', '#00ff00', '.', '.'],
    ['.', '#00ff00', '#00ff00', '#00ff00', '#00ff00', '#00ff00', '#00ff00', '.'],
    ['#00ff00', '#00ff00', '#000000', '#00ff00', '#00ff00', '#000000', '#00ff00', '#00ff00'],
    ['#00ff00', '#00ff00', '#00ff00', '#00ff00', '#00ff00', '#00ff00', '#00ff00', '#00ff00'],
    ['.', '.', '#00ff00', '.', '.', '#00ff00', '.', '.'],
    ['.', '#00ff00', '.', '#00ff00', '#00ff00', '.', '#00ff00', '.'],
  ],
  
  // パックマン風
  pacman: [
    ['.', '#ffff00', '#ffff00', '#ffff00', '#ffff00', '.'],
    ['#ffff00', '#ffff00', '#ffff00', '#ffff00', '#ffff00', '#ffff00'],
    ['#ffff00', '#ffff00', '#ffff00', '.', '.', '.'],
    ['#ffff00', '#ffff00', '#ffff00', '#ffff00', '.', '.'],
    ['#ffff00', '#ffff00', '#ffff00', '#ffff00', '#ffff00', '#ffff00'],
    ['.', '#ffff00', '#ffff00', '#ffff00', '#ffff00', '.'],
  ],
  
  // ブロック
  brick: [
    ['#8b4513', '#8b4513', '#8b4513', '#8b4513'],
    ['#8b4513', '#d2691e', '#d2691e', '#8b4513'],
    ['#8b4513', '#d2691e', '#d2691e', '#8b4513'],
    ['#8b4513', '#8b4513', '#8b4513', '#8b4513'],
  ],
  
  // コイン
  coin: [
    ['.', '#ffd700', '#ffd700', '.'],
    ['#ffd700', '#ffff00', '#ffff00', '#ffd700'],
    ['#ffd700', '#ffff00', '#ffff00', '#ffd700'],
    ['.', '#ffd700', '#ffd700', '.'],
  ],
  
  // メール封筒
  mail: [
    ['#ffd700', '#ffd700', '#ffd700', '#ffd700', '#ffd700', '#ffd700', '#ffd700', '#ffd700'],
    ['#ffd700', '#ffeb3b', '#ffeb3b', '#ffeb3b', '#ffeb3b', '#ffeb3b', '#ffeb3b', '#ffd700'],
    ['#ffd700', '#ffeb3b', '#ffd700', '#ffeb3b', '#ffeb3b', '#ffd700', '#ffeb3b', '#ffd700'],
    ['#ffd700', '#ffeb3b', '#ffeb3b', '#ffd700', '#ffd700', '#ffeb3b', '#ffeb3b', '#ffd700'],
    ['#ffd700', '#ffeb3b', '#ffeb3b', '#ffeb3b', '#ffeb3b', '#ffeb3b', '#ffeb3b', '#ffd700'],
    ['#ffd700', '#ffd700', '#ffd700', '#ffd700', '#ffd700', '#ffd700', '#ffd700', '#ffd700'],
  ],
}