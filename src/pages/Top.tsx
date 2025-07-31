import GridBackgroundDemo from '@/components/ui/grid-background-demo'
import { RetroPixelArt, retroPatterns } from '@/components/RetroPixelArt'
import { PixelArt, pixelPatterns } from '@/components/PixelArt'
import { LottieAnimation } from '@/components/LottieAnimation'
import { useTheme } from '@/contexts/ThemeContext'

export default function Top() {
  const { toggleTheme } = useTheme()
  return (
    <div className="relative">
      <GridBackgroundDemo />
      {/* ダークモードトグル */}
      <div className="absolute top-4 right-4 z-20">
        <LottieAnimation 
          src="https://lottie.host/2653e276-d939-40e6-839b-d544db38ee96/XDpRrHGJIw.lottie"
          width="40px"
          height="40px"
          onClick={toggleTheme}
        />
      </div>
      <div className="absolute inset-0">
        {/* レトロゲーム風ドット絵 */}
        
        {/* パトロールするインベーダー */}
        <RetroPixelArt 
          gridX={10} 
          gridY={10} 
          pixels={retroPatterns.invader}
          movement={{
            pattern: 'patrol',
            steps: 3,
            interval: 300,
          }}
        />
        
        {/* 跳ねるマッシュルーム */}
        <RetroPixelArt 
          gridX={30} 
          gridY={20} 
          pixels={retroPatterns.mushroom}
          movement={{
            pattern: 'bounce',
            interval: 400,
          }}
        />
        
        {/* ガタガタ震えるパックマン */}
        <RetroPixelArt 
          gridX={50} 
          gridY={15} 
          pixels={retroPatterns.pacman}
          movement={{
            pattern: 'wiggle',
            interval: 100,
          }}
        />
        
        {/* 静止したブロック */}
        <RetroPixelArt 
          gridX={20} 
          gridY={30} 
          pixels={retroPatterns.brick}
        />
        
        {/* 跳ねるコイン */}
        <RetroPixelArt 
          gridX={40} 
          gridY={25} 
          pixels={retroPatterns.coin}
          movement={{
            pattern: 'bounce',
            interval: 500,
          }}
        />
        
        {/* 静止したハート */}
        <PixelArt 
          gridX={60} 
          gridY={30} 
          pixels={pixelPatterns.heart}
        />
        
        {/* 中央のテキスト */}
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200 z-10">
            Portfolio
          </h1>
        </div>
      </div>
    </div>
  )
}