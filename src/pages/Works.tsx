import GridBackgroundDemo from '@/components/ui/grid-background-demo'
import { LottieAnimation } from '@/components/LottieAnimation'
import { useTheme } from '@/contexts/ThemeContext'

export default function Works() {
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
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200 mb-4">
            Works
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            This is the Works page. Content coming soon...
          </p>
        </div>
      </div>
    </div>
  )
}