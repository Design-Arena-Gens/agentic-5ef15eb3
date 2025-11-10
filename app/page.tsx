'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type Scene = 'intro' | 'love' | 'conflict' | 'end'

export default function Home() {
  const [currentScene, setCurrentScene] = useState<Scene>('intro')
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    if (!isPlaying) return

    const timers: NodeJS.Timeout[] = []

    // Intro: 0-8 seconds
    timers.push(setTimeout(() => setCurrentScene('love'), 8000))

    // Love: 9-18 seconds
    timers.push(setTimeout(() => setCurrentScene('conflict'), 18000))

    // Conflict: 19-32 seconds
    timers.push(setTimeout(() => setCurrentScene('end'), 32000))

    // Reset after 60 seconds
    timers.push(setTimeout(() => {
      setCurrentScene('intro')
      setIsPlaying(false)
    }, 60000))

    return () => timers.forEach(timer => clearTimeout(timer))
  }, [isPlaying])

  const startReel = () => {
    setIsPlaying(true)
    setCurrentScene('intro')
  }

  return (
    <main className="relative w-full h-screen overflow-hidden bg-black">
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center z-50 bg-black">
          <button
            onClick={startReel}
            className="px-8 py-4 bg-amber-700 text-white text-2xl font-bold rounded-lg hover:bg-amber-600 transition-all shadow-2xl"
          >
            ▶ Play Reel
          </button>
        </div>
      )}

      <AnimatePresence mode="wait">
        {currentScene === 'intro' && isPlaying && <IntroScene key="intro" />}
        {currentScene === 'love' && <LoveScene key="love" />}
        {currentScene === 'conflict' && <ConflictScene key="conflict" />}
        {currentScene === 'end' && <EndScene key="end" />}
      </AnimatePresence>
    </main>
  )
}

function IntroScene() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="absolute inset-0 w-full h-full"
    >
      {/* Background: Campus at sunrise */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="w-full h-full bg-gradient-to-b from-orange-300 via-amber-200 to-yellow-100"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 30%, rgba(255,140,0,0.3) 0%, transparent 50%),
              radial-gradient(circle at 80% 70%, rgba(255,200,100,0.2) 0%, transparent 50%)
            `
          }}
        >
          {/* Silhouette of university building */}
          <div className="absolute bottom-0 w-full h-2/5 bg-gradient-to-t from-gray-900 to-transparent opacity-70">
            <svg className="absolute bottom-0 w-full" viewBox="0 0 1000 200" preserveAspectRatio="none">
              <path d="M0,200 L0,100 L200,100 L200,50 L250,50 L250,100 L400,100 L400,80 L500,80 L500,100 L700,100 L700,60 L750,60 L750,100 L1000,100 L1000,200 Z" fill="#1a1a1a" opacity="0.9"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Animated book pages */}
      <motion.div
        className="absolute top-1/4 right-1/4"
        animate={{
          rotate: [0, 5, -5, 0],
          y: [0, -10, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="relative w-32 h-40 bg-amber-100 shadow-2xl rounded border-2 border-amber-800 transform rotate-12">
          <div className="absolute inset-2 flex flex-col items-center justify-center text-amber-900">
            <p className="text-xs font-hindi text-center">गुनाहों का देवता</p>
            <p className="text-[8px] mt-2">धर्मवीर भारती</p>
          </div>
          <div className="absolute left-0 top-0 h-full w-1 bg-amber-900"></div>
        </div>
      </motion.div>

      {/* Text overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-center px-8"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-4 text-shadow-lg font-hindi text-amber-100">
            गुनाहों का देवता
          </h1>
          <p className="text-2xl md:text-3xl text-amber-200 text-shadow">The God of Sins</p>
        </motion.div>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 2, duration: 1.5 }}
          className="absolute bottom-1/3 text-xl md:text-2xl text-center px-8 text-amber-50 text-shadow max-w-2xl"
        >
          "In the lanes of Allahabad, where love met sacrifice, lived a man — <span className="font-bold text-amber-200">Chander</span>."
        </motion.p>
      </div>
    </motion.div>
  )
}

function LoveScene() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="absolute inset-0 w-full h-full"
    >
      {/* Background: College corridor with warm lighting */}
      <div className="absolute inset-0 bg-gradient-to-br from-rose-200 via-pink-100 to-amber-100">
        {/* Corridor perspective */}
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(90deg, rgba(139,69,19,0.1) 1px, transparent 1px),
            linear-gradient(rgba(139,69,19,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
          transform: 'perspective(500px) rotateX(20deg)',
          transformOrigin: 'center center'
        }}></div>
      </div>

      {/* Scattered books */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="absolute top-1/2 left-1/4 transform -translate-x-1/2"
      >
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="absolute w-16 h-20 bg-blue-400 shadow-lg rounded"
            style={{
              transform: `rotate(${i * 20 - 20}deg) translate(${i * 30}px, ${i * 20}px)`,
              background: `linear-gradient(135deg, ${['#3b82f6', '#8b5cf6', '#ec4899'][i]} 0%, ${['#60a5fa', '#a78bfa', '#f472b6'][i]} 100%)`
            }}
          >
            <div className="w-full h-full border-l-2 border-white/30"></div>
          </div>
        ))}
      </motion.div>

      {/* Characters */}
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Chander */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: -80, opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="relative"
        >
          <div className="w-32 h-48 bg-gradient-to-b from-gray-700 to-gray-900 rounded-t-full shadow-2xl">
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-amber-700 rounded-full"></div>
            <div className="absolute top-24 left-1/2 transform -translate-x-1/2 w-20 h-24 bg-blue-800 rounded"></div>
          </div>
        </motion.div>

        {/* Sudha */}
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 80, opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="relative"
        >
          <div className="w-32 h-48 bg-gradient-to-b from-pink-200 to-pink-400 rounded-t-full shadow-2xl">
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-amber-600 rounded-full"></div>
            <div className="absolute top-24 left-1/2 transform -translate-x-1/2 w-24 h-28 bg-rose-600 rounded-full"></div>
          </div>
        </motion.div>
      </div>

      {/* Dialogue */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute top-1/4 left-1/2 transform -translate-x-1/2 bg-white/90 px-6 py-4 rounded-lg shadow-2xl max-w-md"
      >
        <p className="text-lg font-hindi text-gray-800 text-center">
          "चंदर... तुम इतने चुप क्यों रहते हो?"
        </p>
        <p className="text-sm text-gray-600 text-center mt-2 italic">
          "Chander... why are you always so quiet?"
        </p>
      </motion.div>

      {/* Narration */}
      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 3.5, duration: 1.5 }}
        className="absolute bottom-1/4 left-1/2 transform -translate-x-1/2 text-2xl text-center px-8 text-gray-800 text-shadow max-w-2xl font-semibold"
      >
        He loved her — deeply, silently, purely...
      </motion.p>
    </motion.div>
  )
}

function ConflictScene() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="absolute inset-0 w-full h-full"
    >
      {/* Dark, rainy background */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-800 via-gray-900 to-black">
        {/* Rain effect */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-0.5 h-12 bg-blue-200/30"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * -20}%`,
              }}
              animate={{
                y: ['0vh', '120vh'],
              }}
              transition={{
                duration: 1 + Math.random(),
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: 'linear'
              }}
            />
          ))}
        </div>

        {/* Lightning flashes */}
        <motion.div
          className="absolute inset-0 bg-white"
          animate={{
            opacity: [0, 0.3, 0, 0, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            times: [0, 0.1, 0.2, 0.5, 1],
          }}
        />
      </div>

      {/* Chander writing a letter */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="relative"
        >
          {/* Desk */}
          <div className="w-80 h-64 bg-amber-900 rounded-lg shadow-2xl p-6 border-4 border-amber-950">
            {/* Letter paper */}
            <motion.div
              animate={{
                y: [0, -5, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
              className="w-full h-48 bg-amber-50 shadow-lg p-4 border border-amber-200"
            >
              <div className="space-y-2">
                <div className="h-1 bg-gray-400 w-3/4 rounded"></div>
                <div className="h-1 bg-gray-400 w-full rounded"></div>
                <div className="h-1 bg-gray-400 w-5/6 rounded"></div>
                <div className="h-1 bg-gray-400 w-2/3 rounded"></div>
                <motion.div
                  animate={{
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                  }}
                  className="h-1 bg-gray-600 w-1/3 rounded"
                ></motion.div>
              </div>

              {/* Pen */}
              <div className="absolute top-24 right-12 w-2 h-24 bg-blue-900 rounded-full transform rotate-45 shadow-lg">
                <div className="absolute top-0 w-2 h-6 bg-yellow-700 rounded-full"></div>
              </div>
            </motion.div>

            {/* Candle */}
            <div className="absolute -top-8 -right-8">
              <div className="w-6 h-16 bg-amber-100 rounded-t-full border-2 border-amber-200">
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.8, 1, 0.8],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                  }}
                  className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-orange-400 rounded-full blur-sm"
                ></motion.div>
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-4 h-6 bg-yellow-500 rounded-t-full"></div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Narration */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 2.5, duration: 1.5 }}
        className="absolute bottom-1/4 left-1/2 transform -translate-x-1/2 w-full px-8"
      >
        <p className="text-2xl md:text-3xl text-center text-blue-200 text-shadow-lg max-w-3xl mx-auto font-semibold">
          Words unspoken, letters unsent...
        </p>
        <p className="text-xl md:text-2xl text-center text-blue-300 text-shadow mt-4 max-w-3xl mx-auto">
          Love trapped between duty and desire
        </p>
      </motion.div>

      {/* Torn letter pieces */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4, duration: 1 }}
        className="absolute top-1/3 left-1/2 transform -translate-x-1/2"
      >
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-8 h-12 bg-amber-50 shadow-lg"
            initial={{ x: 0, y: 0, rotate: 0, opacity: 1 }}
            animate={{
              x: (i - 3) * 40,
              y: Math.random() * 100 + 50,
              rotate: Math.random() * 360,
              opacity: 0.3,
            }}
            transition={{
              duration: 2,
              ease: "easeOut"
            }}
            style={{
              clipPath: `polygon(${Math.random() * 20}% 0%, 100% ${Math.random() * 30}%, ${80 + Math.random() * 20}% 100%, 0% ${70 + Math.random() * 30}%)`
            }}
          />
        ))}
      </motion.div>
    </motion.div>
  )
}

function EndScene() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="absolute inset-0 w-full h-full"
    >
      {/* Fade to black with stars */}
      <div className="absolute inset-0 bg-black">
        {[...Array(100)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      {/* Final message */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1, duration: 2 }}
          className="text-center px-8"
        >
          <h2 className="text-5xl md:text-7xl font-bold mb-8 text-shadow-lg font-hindi text-amber-300">
            गुनाहों का देवता
          </h2>
          <p className="text-2xl md:text-3xl text-amber-200 mb-8">The God of Sins</p>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 2.5, duration: 1.5 }}
            className="space-y-4"
          >
            <p className="text-xl md:text-2xl text-blue-200 italic max-w-2xl mx-auto">
              "Some loves are destined to remain in silence..."
            </p>
            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mt-6">
              A tale of sacrifice, society, and the sins we commit in the name of love
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 4, duration: 2 }}
            className="mt-12"
          >
            <p className="text-md text-gray-500">By Dharamvir Bharati</p>
          </motion.div>
        </motion.div>

        {/* Decorative elements */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '300px' }}
          transition={{ delay: 3, duration: 2 }}
          className="absolute bottom-1/3 h-0.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent"
        />
      </div>

      {/* Book closing animation */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 6, duration: 2 }}
        className="absolute inset-0 bg-amber-900 origin-left"
        style={{
          background: 'linear-gradient(90deg, rgba(120,53,15,1) 0%, rgba(120,53,15,0) 100%)'
        }}
      />
    </motion.div>
  )
}
