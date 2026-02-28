"use client"

import { useEffect, useState } from "react"
import CountdownTimer from "@/components/countdown-timer"
import VenueMap from "@/components/venue-map"
import HandwrittenMessage from '@/components/handwritten-message';


export default function EngagementPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-background">
      <section className="relative flex items-center justify-center px-4 py-8 md:py-12">
        <div className="w-full max-w-md mx-auto">
          <video
            src="/invitation-design.mp4"
            className="w-full h-auto"
            autoPlay
            muted
            playsInline
            poster="/invitation-design.png"
          />
        </div>
      </section>

      <section className="relative py-16 px-4 md:py-24 overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 bg-gradient-to-b from-accent/5 via-background to-accent/5" />
        <div className="absolute top-10 left-10 w-32 h-32 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-accent/10 rounded-full blur-3xl" />

        <div className="relative max-w-5xl mx-auto">
          <div className="text-center space-y-8 mb-12">
            <div className="inline-block">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-12 bg-accent/30" />
                <svg className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6z" />
                </svg>
                <div className="h-px w-12 bg-accent/30" />
              </div>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground text-balance leading-tight">
                Our Special Day
              </h2>
              <p className="mt-4 text-lg md:text-xl text-muted-foreground font-light italic">
                Counting every moment until we celebrate together
              </p>
            </div>
          </div>

          <CountdownTimer targetDate={new Date("2026-01-23T19:00:00")} />
        </div>
      </section>

      <section className="relative py-16 px-4 md:py-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-6 mb-16">
            <div className="inline-block">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-12 bg-accent/30" />
                <svg className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                </svg>
                <div className="h-px w-12 bg-accent/30" />
              </div>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground text-balance leading-tight">
                Join Us At
              </h2>
            </div>

            <div className="max-w-2xl mx-auto space-y-6 mt-8">
              <div className="bg-card/50 backdrop-blur-sm border border-accent/20 rounded-2xl p-8 md:p-10 shadow-xl">
                <p className="text-3xl md:text-4xl font-serif text-accent mb-3">Ramage - Volaré Venue</p>
                <p className="text-xl md:text-2xl text-muted-foreground mb-6">Fifth settlement</p>

                <div className="flex flex-col md:flex-row items-center justify-center gap-6 pt-6 border-t border-accent/10">
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <span className="text-lg text-foreground">January 23, 2026</span>
                  </div>
                  <div className="hidden md:block w-px h-6 bg-accent/20" />
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span className="text-lg text-foreground">7:00 PM</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <VenueMap />
        </div>
      </section>


      <footer className="relative py-16 text-center border-t border-accent/10">
        <div className="max-w-2xl mx-auto px-4 space-y-4">
          <p className="font-serif text-2xl md:text-3xl text-foreground italic">It was always you ♥️</p>
          <div className="flex items-center justify-center gap-2 text-accent">
            <div className="w-8 h-px bg-accent/30" />
            <span className="text-2xl">♥</span>
            <div className="w-8 h-px bg-accent/30" />
          </div>
        </div>
      </footer>
    </div>
  )
}
