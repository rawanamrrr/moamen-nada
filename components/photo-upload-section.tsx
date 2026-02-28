"use client"

import { motion, Variants } from "framer-motion"
import { useTranslation } from "@/lib/translations"
import { useLanguage } from "@/contexts/LanguageContext"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Camera, Upload } from "lucide-react"

// Professional animation variants matching the main page
const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { 
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] as const
    }
  }
}

const scaleIn: Variants = {
  hidden: { scale: 0.98, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] as const
    }
  }
}

const flyFromLeft: Variants = {
  hidden: { x: -200, opacity: 0, scale: 0.8, rotate: -5 },
  visible: {
    x: 0,
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { 
      duration: 1.4, 
      ease: [0.16, 1, 0.3, 1] as const,
      type: "spring",
      stiffness: 60,
      damping: 18
    }
  }
}

const flyFromRight: Variants = {
  hidden: { x: 200, opacity: 0, scale: 0.8, rotate: 5 },
  visible: {
    x: 0,
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { 
      duration: 1.4, 
      ease: [0.16, 1, 0.3, 1] as const,
      type: "spring",
      stiffness: 60,
      damping: 18
    }
  }
}

const fastStaggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.05 }
  }
}

export default function PhotoUploadSection() {
  const t = useTranslation()
  const { language } = useLanguage()
  
  const driveLink = "https://drive.google.com/drive/folders/1A0vbEcDKVbrnZDW5n4V64knD01493Dkd"

  const handleUploadClick = () => {
    window.open(driveLink, "_blank")
  }

  return (
    <motion.section 
      className="relative py-20 px-4 md:py-32 bg-gradient-to-b from-transparent via-accent/5 to-transparent overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={fastStaggerContainer}
    >
      {/* Animated Decorative Elements */}
      <motion.div 
        className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl"
        initial={{ x: 300, opacity: 0, scale: 0.5 }}
        whileInView={{ x: 0, opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.8, ease: "easeOut" }}
      />
      <motion.div 
        className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl"
        initial={{ x: -300, opacity: 0, scale: 0.5 }}
        whileInView={{ x: 0, opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.8, ease: "easeOut", delay: 0.2 }}
      />

      <div className="relative max-w-6xl mx-auto">
        <motion.div 
          className="text-center mb-20"
          variants={fastStaggerContainer}
        >
          <motion.div className="flex items-center justify-center gap-4 mb-8" variants={flyFromLeft}>
            <motion.div 
              className="w-32 h-px bg-gradient-to-r from-transparent via-accent to-transparent"
              initial={{ scaleX: 0, originX: 1 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.2 }}
            />
            <motion.div 
              className="relative"
              initial={{ scale: 0, rotate: -180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4, type: "spring" }}
            >
              <Camera className="w-6 h-6 text-accent" />
            </motion.div>
            <motion.div 
              className="w-32 h-px bg-gradient-to-r from-transparent via-accent to-transparent"
              initial={{ scaleX: 0, originX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.2 }}
            />
          </motion.div>
          <motion.h2 
            className="font-luxury text-5xl md:text-6xl lg:text-7xl text-foreground leading-tight mb-4 tracking-wide" 
            variants={flyFromRight}
          >
            {t('sharePhotosTitle')}
          </motion.h2>
          <motion.p 
            className="font-luxury text-xl md:text-2xl text-muted-foreground font-light max-w-3xl mx-auto italic" 
            variants={scaleIn}
          >
            {t('sharePhotosDescription')}
          </motion.p>
        </motion.div>

        <motion.div 
          className="max-w-3xl mx-auto"
          variants={scaleIn}
        >
          <motion.div 
            className="relative bg-gradient-to-br from-card via-card/95 to-card/90 backdrop-blur-md border-2 border-accent/20 rounded-3xl p-10 md:p-14 shadow-2xl overflow-hidden"
            initial={{ scale: 0.9, opacity: 0, y: 50 }}
            whileInView={{ scale: 1, opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Animated Decorative corner elements */}
            <motion.div 
              className="absolute top-0 left-0 w-32 h-32 border-l-2 border-t-2 border-accent/30 rounded-tl-3xl"
              initial={{ x: -50, y: -50, opacity: 0 }}
              whileInView={{ x: 0, y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3 }}
            />
            <motion.div 
              className="absolute bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 border-accent/30 rounded-br-3xl"
              initial={{ x: 50, y: 50, opacity: 0 }}
              whileInView={{ x: 0, y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3 }}
            />
            
            <div className="relative z-10">
              {/* QR Code Section */}
              <motion.div 
                className="flex flex-col items-center mb-10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <div className="bg-white p-6 rounded-2xl shadow-lg mb-6 border-2 border-accent/10">
                  <Image 
                    src="/qr-code-img.png" 
                    alt="QR Code" 
                    width={200} 
                    height={200}
                    className="w-[200px] h-[200px]"
                  />
                </div>
                <p className="font-luxury text-lg md:text-xl text-foreground text-center mb-2 font-medium">
                  {t('scanQRCode')}
                </p>
                <p className="font-luxury text-base text-muted-foreground text-center italic">
                  {t('orUploadDirectly')}
                </p>
              </motion.div>

              {/* Divider */}
              <motion.div 
                className="flex items-center gap-4 my-10"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-accent/30 to-accent/30" />
                <span className="text-muted-foreground font-luxury text-sm uppercase tracking-wider">
                  {language === 'ar' ? 'أو' : 'OR'}
                </span>
                <div className="flex-1 h-px bg-gradient-to-l from-transparent via-accent/30 to-accent/30" />
              </motion.div>

              {/* Upload Button */}
              <motion.div
                className="flex justify-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <Button
                  onClick={handleUploadClick}
                  className="group relative px-10 py-7 text-lg md:text-xl font-luxury bg-accent hover:bg-accent/90 text-white rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                >
                  <Upload className="w-6 h-6 mr-3 group-hover:animate-bounce" />
                  {t('uploadButton')}
                </Button>
              </motion.div>

              {/* Additional Info */}
              <motion.div
                className="mt-10 pt-8 border-t-2 border-accent/20"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.7 }}
              >
                <div className="flex items-center justify-center gap-3 text-muted-foreground">
                  <svg className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                  </svg>
                  <p className="font-luxury text-sm md:text-base text-center italic">
                    {language === 'ar' 
                      ? 'التقطوا صوراً خلال الحفل وارفعوها هنا' 
                      : 'Take photos during the event and upload them here'}
                  </p>
                  <svg className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                  </svg>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  )
}
