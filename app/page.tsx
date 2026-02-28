"use client"

import { useState, useEffect, useCallback } from "react"
import dynamic from "next/dynamic"


// Dynamically import the VideoIntro component with no SSR to prevent hydration issues
const VideoIntro = dynamic(() => import("@/components/video-intro"), {
  ssr: false,
  loading: () => <div className="fixed inset-0 bg-black flex items-center justify-center"><div className="text-white">Loading video...</div></div>,
})

// Dynamically import the main content to ensure it's loaded only when needed
const ProAnimatedEngagementPage = dynamic(
  () => import("@/components/pro-animated-engagement-page"),
  { 
    ssr: false,
    loading: () => <div className="min-h-screen bg-background flex items-center justify-center"><div className="text-foreground">Loading...</div></div>
  }
)

export default function Home() {
  const [introFinished, setIntroFinished] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleIntroFinish = useCallback(() => {
    setIntroFinished(true);
  }, []);

  const handleImageLoad = useCallback(() => {
    setIsImageLoaded(true)
  }, [])

  // Preload the main video and image for a smoother transition
  useEffect(() => {
    if (mounted) {
      // Preload image
      const img = new Image()
      img.src = "/invitation-design.png?v=2"
      img.onload = handleImageLoad

      // Preload the main invitation video
      const videoLink = document.createElement("link")
      videoLink.rel = "preload"
      videoLink.as = "video"
      videoLink.href = "/invitation-design.mp4"
      document.head.appendChild(videoLink)
    }
  }, [mounted, handleImageLoad])

  if (!mounted) {
    return (
      <main className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </main>
    )
  }

  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Video Intro */}
      {!introFinished && (
        <div className="fixed inset-0 z-[9999] bg-black">
          <VideoIntro 
            onComplete={handleIntroFinish} 
            onSkip={handleIntroFinish} 
          />
        </div>
      )}
      
      {/* Main Content */}
      <div className={`w-full transition-opacity duration-500 ${introFinished ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <ProAnimatedEngagementPage onImageLoad={handleImageLoad} introFinished={introFinished} />
      </div>
    </main>
  )
}