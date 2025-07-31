import GridBackgroundDemo from '@/components/ui/grid-background-demo'
import { RetroPixelArt, retroPatterns } from '@/components/RetroPixelArt'
import { ContactForm } from '@/components/ContactForm'
import { LottieAnimation } from '@/components/LottieAnimation'
import { useTheme } from '@/contexts/ThemeContext'

export default function Contact() {
  const { toggleTheme } = useTheme()
  return (
    <div className="relative min-h-screen">
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
      <div className="absolute inset-0 overflow-y-auto">
        <div className="max-w-6xl mx-auto px-4 py-16">
          {/* タイトルとメールアイコン */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <RetroPixelArt 
              gridX={10} 
              gridY={5} 
              pixels={retroPatterns.mail}
              movement={{
                pattern: 'bounce',
                interval: 600,
              }}
            />
            <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200">
              CONTACT
            </h1>
          </div>

          {/* 説明文 */}
          <div className="text-center mb-12">
            <p className="text-gray-600 dark:text-gray-400 mb-2">
              ご依頼・その他のお問い合わせは下記のアドレスまでメッセージをお願いいたします。
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-2">
              12営業日以内にはご返信させていただきます。
            </p>
            
            {/* メールアドレス */}
            <div className="mt-8 mb-12">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                address
              </p>
              <a 
                href="mailto:w3cdp6084@gmail.com" 
                className="text-lg text-gray-800 dark:text-gray-200 hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors"
              >
                w3cdp6084@gmail.com
              </a>
            </div>
          </div>

          {/* コンタクトフォーム */}
          <ContactForm className="mb-24" />
        </div>
      </div>
    </div>
  )
}