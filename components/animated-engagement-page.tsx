"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence, type Variants } from "framer-motion"
import CountdownTimer from "@/components/countdown-timer"
import VenueMap from "@/components/venue-map"
import Image from "next/image"

// Enhanced Animation variants
const fadeInUp: Variants = {
  hidden: { y: 40, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
}

const fadeInScale: Variants = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
}

const slideInFromLeft: Variants = {
  hidden: { x: -60, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
}

const slideInFromRight: Variants = {
  hidden: { x: 60, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.3, delayChildren: 0.4 },
  },
}

const scaleIn: Variants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
}

const floatingAnimation = {
  y: [-10, 10, -10] as [number, number, number],
  transition: {
    duration: 4,
    repeat: Infinity,
    ease: "easeInOut"
  }
};

export default function AnimatedEngagementPage() {
  const [mounted, setMounted] = useState(false)
  const [activeSection, setActiveSection] = useState("hero")

  useEffect(() => {
    setMounted(true)
    
    const handleScroll = () => {
      const sections = ["hero", "countdown", "venue", "rsvp"]
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element && scrollPosition >= element.offsetTop) {
          setActiveSection(section)
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Navigation Dots */}
      <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50 hidden lg:block">
        <div className="flex flex-col gap-4">
          {["hero", "countdown", "venue", "rsvp"].map((section) => (
            <motion.button
              key={section}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                activeSection === section 
                  ? "bg-accent scale-125" 
                  : "bg-accent/30 hover:bg-accent/50"
              }`}
              whileHover={{ scale: 1.2 }}
              onClick={() => {
                document.getElementById(section)?.scrollIntoView({ behavior: "smooth" })
              }}
            />
          ))}
        </div>
      </div>

      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <AnimatePresence>
          <motion.div
            className="relative w-full max-w-6xl mx-auto px-4"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            {/* Background Elements */}
            <motion.div
              className="absolute -top-40 -left-40 w-80 h-80 bg-accent/5 rounded-full blur-3xl"
              animate={{
                y: [-10, 10, -10],
                transition: {
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
            />
            <motion.div
              className="absolute -bottom-40 -right-40 w-96 h-96 bg-accent/10 rounded-full blur-3xl"
              animate={{
                y: [-10, 10, -10],
                transition: {
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 2
                }
              }}
            />

            {/* Main Content */}
            <div className="relative z-10 text-center space-y-12">
              {/* Couple Names */}
              <motion.div
                className="space-y-6"
                variants={fadeInUp}
              >
                <motion.div
                  className="flex items-center justify-center gap-8 mb-8"
                  variants={fadeInUp}
                >
                  <motion.div
                    className="h-px w-20 bg-accent/40"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                  />
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.7, type: "spring", stiffness: 200 }}
                    className="text-accent"
                  >
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                    </svg>
                  </motion.div>
                  <motion.div
                    className="h-px w-20 bg-accent/40"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 1, delay: 0.9 }}
                  />
                </motion.div>

                <motion.h1
                  className="font-serif text-5xl md:text-7xl lg:text-8xl text-foreground leading-tight"
                  variants={fadeInScale}
                >
                  <span className="block">Mahmoud</span>
                  <span className="block text-3xl md:text-5xl lg:text-6xl text-accent font-light mx-4">&</span>
                  <span className="block">Farah</span>
                </motion.h1>

                <motion.div
                  className="flex items-center justify-center gap-8 mt-8"
                  variants={fadeInUp}
                >
                  <motion.div
                    className="h-px w-12 bg-accent/30"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 1.1 }}
                  />
                  <motion.p
                    className="text-xl md:text-2xl text-muted-foreground font-light italic tracking-wide"
                    variants={fadeInUp}
                  >
                    Are Getting Engaged
                  </motion.p>
                  <motion.div
                    className="h-px w-12 bg-accent/30"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 1.3 }}
                  />
                </motion.div>
              </motion.div>

              {/* Date & Location */}
              <motion.div
                className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto"
                variants={staggerContainer}
              >
                <motion.div
                  className="bg-card/60 backdrop-blur-sm border border-accent/20 rounded-2xl p-6 shadow-2xl"
                  variants={slideInFromLeft}
                >
                  <div className="flex items-center gap-4">
                    <motion.div
                      className="p-3 bg-accent/10 rounded-xl"
                      whileHover={{ scale: 1.1 }}
                    >
                      <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </motion.div>
                    <div className="text-left">
                      <p className="text-sm text-muted-foreground">Date</p>
                      <p className="text-lg font-semibold text-foreground">January 23, 2026</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  className="bg-card/60 backdrop-blur-sm border border-accent/20 rounded-2xl p-6 shadow-2xl"
                  variants={slideInFromRight}
                >
                  <div className="flex items-center gap-4">
                    <motion.div
                      className="p-3 bg-accent/10 rounded-xl"
                      whileHover={{ scale: 1.1 }}
                    >
                      <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </motion.div>
                    <div className="text-left">
                      <p className="text-sm text-muted-foreground">Location</p>
                      <p className="text-lg font-semibold text-foreground">Ramage - Volaré Venue - Fifth settlement</p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Scroll Indicator */}
              <motion.div
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2 }}
              >
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="flex flex-col items-center gap-2 text-accent/60"
                >
                  <span className="text-sm font-light">Scroll Down</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </section>

      {/* Countdown Section */}
      <section id="countdown" className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-b from-background to-accent/5">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent/10 via-background to-background" />
        
        <motion.div
          className="relative max-w-6xl mx-auto px-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          {/* Section Header */}
          <motion.div
            className="text-center space-y-8 mb-16"
            variants={fadeInUp}
          >
            <motion.div className="inline-block" variants={fadeInUp}>
              <motion.div
                className="flex items-center justify-center gap-4 mb-6"
                variants={fadeInUp}
              >
                <motion.div
                  className="h-px w-16 bg-accent/40"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                />
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                >
                  <svg className="w-8 h-8 text-accent" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6z" />
                  </svg>
                </motion.div>
                <motion.div
                  className="h-px w-16 bg-accent/40"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                />
              </motion.div>
              <motion.h2
                className="font-serif text-5xl md:text-6xl lg:text-7xl text-foreground mb-6"
                variants={fadeInUp}
              >
                Counting Down
              </motion.h2>
              <motion.p
                className="text-xl md:text-2xl text-muted-foreground font-light max-w-2xl mx-auto leading-relaxed"
                variants={fadeInUp}
              >
                Every moment brings us closer to celebrating our special day together
              </motion.p>
            </motion.div>
          </motion.div>

          {/* Countdown Timer */}
          <motion.div
            variants={scaleIn}
            className="relative"
          >
            <CountdownTimer targetDate={new Date("2026-01-23T19:00:00")} />
          </motion.div>
        </motion.div>
      </section>

      {/* Venue & RSVP Section */}
      <section id="venue" className="relative py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center space-y-16 mb-20"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {/* Venue Information */}
            <motion.div variants={fadeInUp}>
              <motion.div
                className="flex items-center justify-center gap-4 mb-8"
                variants={fadeInUp}
              >
                <motion.div
                  className="h-px w-16 bg-accent/40"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                />
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" />
                  </svg>
                </motion.div>
                <motion.div
                  className="h-px w-16 bg-accent/40"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                />
              </motion.div>
              
              <motion.h2
                className="font-serif text-5xl md:text-6xl lg:text-7xl text-foreground mb-8"
                variants={fadeInUp}
              >
                The Venue
              </motion.h2>

              <motion.div
                className="max-w-4xl mx-auto"
                variants={scaleIn}
              >
                <div className="bg-card/80 backdrop-blur-sm border border-accent/20 rounded-3xl p-12 shadow-2xl relative overflow-hidden">
                  {/* Background Pattern */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,_rgba(120,113,108,0.1)_1px,_transparent_0)] bg-[length:20px_20px]" />
                  
                  <div className="relative z-10">
                    <motion.h3
                      className="text-4xl md:text-5xl font-serif text-accent mb-4"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 }}
                    >
                      Ramage - Volaré Venue
                    </motion.h3>
                    <motion.p
                      className="text-2xl md:text-3xl text-muted-foreground mb-8 font-light"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 }}
                    >
                      Fifth settlement
                    </motion.p>

                    <motion.div
                      className="flex flex-col md:flex-row items-center justify-center gap-8 pt-8 border-t border-accent/10"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 }}
                    >
                      <div className="flex items-center gap-4 text-lg">
                        <motion.div
                          className="p-2 bg-accent/10 rounded-lg"
                          whileHover={{ scale: 1.1 }}
                        >
                          <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </motion.div>
                        <span className="text-xl font-medium text-foreground">January 23, 2026</span>
                      </div>
                      <div className="hidden md:block w-px h-8 bg-accent/20" />
                      <div className="flex items-center gap-4 text-lg">
                        <motion.div
                          className="p-2 bg-accent/10 rounded-lg"
                          whileHover={{ scale: 1.1 }}
                        >
                          <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </motion.div>
                        <span className="text-xl font-medium text-foreground">7:00 PM</span>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Map */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="rounded-3xl overflow-hidden shadow-2xl border border-accent/20"
            >
              <VenueMap />
            </motion.div>

            {/* Love Story Section */}
            <motion.div 
              className="mt-24 max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="text-center mb-12">
                <motion.div
                  className="flex items-center justify-center gap-4 mb-6"
                  variants={fadeInUp}
                >
                  <motion.div
                    className="h-px w-16 bg-accent/40"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                  />
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </motion.div>
                  <motion.div
                    className="h-px w-16 bg-accent/40"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  />
                </motion.div>
                
                <motion.h2
                  className="font-serif text-5xl md:text-6xl lg:text-7xl text-foreground mb-8"
                  variants={fadeInUp}
                >
                  Our Love Story
                </motion.h2>
              </div>

              <div className="bg-card/80 backdrop-blur-sm border border-accent/20 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
                {/* Decorative Elements */}
                <div className="absolute top-0 left-0 w-32 h-32 -mt-16 -ml-16 bg-accent/5 rounded-full filter blur-3xl"></div>
                <div className="absolute bottom-0 right-0 w-48 h-48 -mb-24 -mr-24 bg-accent/5 rounded-full filter blur-3xl"></div>
                
                <div className="relative z-10 space-y-6 text-lg leading-relaxed">
                  <motion.p 
                    className="text-muted-foreground"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                  >
                    It all began on May 16, 2022 in our basic university food court. From the very first moment, surrounded by the unacceptable in the food court, our eyes met and that's when we both knew it was meant to be.
                  </motion.p>
                  
                  <motion.p 
                    className="text-muted-foreground"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                  >
                    Over the past 3 years and half, our love story wasn't simple or easy. We went through ups and downs together, even parted ways at some point, but in the end we found our way back to each other but this time stronger than ever. In a blink of an eye and with a full heart we found ourselves starting the year together picking our rings for a new chapter of our lives.
                  </motion.p>
                  
                  <motion.p 
                    className="text-muted-foreground"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                  >
                    This is only the beginning of our fairytale and we have a long road ahead of us. We can't wait to spend it all together and share it with each one of you ♥️
                  </motion.p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* RSVP Section */}
          <motion.div
            id="rsvp"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="max-w-4xl mx-auto"
          >
            <motion.div
              className="text-center mb-12"
              variants={fadeInUp}
            >
              <motion.div
                className="flex items-center justify-center gap-4 mb-6"
                variants={fadeInUp}
              >
                <motion.div
                  className="h-px w-16 bg-accent/40"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                />
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </motion.div>
                <motion.div
                  className="h-px w-16 bg-accent/40"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                />
              </motion.div>
              <motion.h2
                className="font-serif text-5xl md:text-6xl text-foreground mb-4"
                variants={fadeInUp}
              >
                Will You Join Us?
              </motion.h2>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <motion.footer
        className="relative py-20 text-center bg-gradient-to-t from-background to-accent/5 border-t border-accent/10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-2xl mx-auto px-4 space-y-6">
          <motion.p
            className="font-serif text-3xl md:text-4xl text-foreground italic leading-relaxed"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            "Our greatest adventure begins with you by our side"
          </motion.p>
          <motion.div
            className="flex items-center justify-center gap-4 text-accent"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <div className="w-12 h-px bg-accent/30" />
            <motion.span
              className="text-3xl"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ♥
            </motion.span>
            <div className="w-12 h-px bg-accent/30" />
          </motion.div>
          <motion.p
            className="text-lg text-muted-foreground font-light pt-8 border-t border-accent/10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            With love, Mahmoud & Farah
          </motion.p>
        </div>
      </motion.footer>
    </div>
  )
}