"use client"

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useTranslation } from '@/lib/translations'

const images = [
  '/love-story1.jpg',
  '/love-story2.jpg',
  '/love-story3.jpg',
]

export default function LoveStoryGallery() {
  const t = useTranslation()

  return (
    <section 
      className="relative py-0 px-2 sm:px-4 bg-gradient-to-b from-transparent via-accent/5 to-transparent overflow-visible"
      style={{
        clipPath: 'polygon(0 3%, 100% 0%, 100% 97%, 0% 100%)',
      }}
    >
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Animated Photo Gallery - Two above, one below */}
        <div className="relative w-full flex flex-col items-center justify-center gap-0 overflow-visible">
          {/* Top row - Two images */}
          <div className="flex items-center justify-center gap-0 sm:gap-1 md:gap-2 w-full px-2">
            {images.slice(0, 2).map((src, index) => {
              const delay = index * 0.5

              return (
                <motion.div
                  key={index}
                  className="relative flex-shrink-0"
                  initial={{ 
                    opacity: 0, 
                    scale: 0.8,
                  }}
                  whileInView={{ 
                    opacity: 1, 
                    scale: 1,
                  }}
                  viewport={{ once: true }}
                  animate={{
                    rotate: [
                      0,
                      25,
                      -25,
                      25,
                      -25,
                      0,
                    ],
                    opacity: 1,
                    scale: 1,
                  }}
                  transition={{
                    opacity: {
                      duration: 0.6,
                      delay: index * 0.15,
                      ease: [0.22, 1, 0.36, 1]
                    },
                    scale: {
                      duration: 0.6,
                      delay: index * 0.15,
                      ease: [0.22, 1, 0.36, 1]
                    },
                    rotate: {
                      duration: 12 + (index * 1.5),
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: delay,
                    },
                  }}
                >
                  {/* Circular Frame */}
                  <motion.div
                    className="relative w-52 h-52 sm:w-60 sm:h-60 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-full overflow-hidden shadow-2xl border-3 md:border-4 border-accent/50 bg-gradient-to-br from-accent/30 to-accent/10"
                    whileHover={{ 
                      scale: 1.05,
                      transition: { duration: 0.3 }
                    }}
                    style={{
                      clipPath: 'circle(50% at 50% 50%)',
                    }}
                  >
                    <Image
                      src={src}
                      alt={`Love story moment ${index + 1}`}
                      fill
                      className="object-cover"
                      style={index === 0 ? { objectPosition: 'center top' } : undefined}
                      sizes="(max-width: 640px) 208px, (max-width: 768px) 240px, (max-width: 1024px) 288px, 320px"
                    />
                    
                    {/* Decorative ring */}
                    <div className="absolute inset-0 rounded-full border-2 md:border-4 border-white/40 pointer-events-none" />
                  </motion.div>
                </motion.div>
              )
            })}
          </div>

          {/* Bottom row - One centered image */}
          <div className="flex items-center justify-center w-full px-2 -mt-16 sm:-mt-20 md:-mt-24 lg:-mt-28">
            {images.slice(2, 3).map((src, index) => {
              return (
                <motion.div
                  key={index + 2}
                  className="relative flex-shrink-0"
                  initial={{ 
                    opacity: 0, 
                    scale: 0.8,
                  }}
                  whileInView={{ 
                    opacity: 1, 
                    scale: 1,
                  }}
                  viewport={{ once: true }}
                  animate={{
                    rotate: [
                      0,
                      25,
                      -25,
                      25,
                      -25,
                      0,
                    ],
                    opacity: 1,
                    scale: 1,
                  }}
                  transition={{
                    opacity: {
                      duration: 0.6,
                      delay: 0.3,
                      ease: [0.22, 1, 0.36, 1]
                    },
                    scale: {
                      duration: 0.6,
                      delay: 0.3,
                      ease: [0.22, 1, 0.36, 1]
                    },
                    rotate: {
                      duration: 13,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1,
                    },
                  }}
                >
                  {/* Circular Frame */}
                  <motion.div
                    className="relative w-52 h-52 sm:w-60 sm:h-60 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-full overflow-hidden shadow-2xl border-3 md:border-4 border-accent/50 bg-gradient-to-br from-accent/30 to-accent/10"
                    whileHover={{ 
                      scale: 1.05,
                      transition: { duration: 0.3 }
                    }}
                    style={{
                      clipPath: 'circle(50% at 50% 50%)',
                    }}
                  >
                    <Image
                      src={src}
                      alt={`Love story moment ${index + 3}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 208px, (max-width: 768px) 240px, (max-width: 1024px) 288px, 320px"
                    />
                    
                    {/* Decorative ring */}
                    <div className="absolute inset-0 rounded-full border-2 md:border-4 border-white/40 pointer-events-none" />
                  </motion.div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

