"use client"

import { motion } from "framer-motion"

export default function MessageSection() {
  return (
    <section id="message" className="py-16 px-4 md:py-24 bg-gradient-to-b from-background to-accent/5">
      <div className="max-w-2xl mx-auto">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="text-3xl md:text-4xl font-serif font-medium mb-6">Leave Us a Message</h2>
          <div className="w-20 h-1 bg-accent mx-auto mb-8"></div>
          
          <div className="bg-white/90 p-8 md:p-10 rounded-lg shadow-lg max-w-2xl mx-auto">
            <div className="relative">
              <div className="absolute top-0 left-0 w-full h-full bg-[url('/paper-texture.png')] opacity-10 rounded-lg pointer-events-none"></div>
              <div className="relative z-10">
                <p className="text-gray-700 text-lg md:text-xl leading-relaxed mb-6 font-serif italic">
                  Dear Zeyad & Rawan,
                </p>
                <p className="text-gray-700 text-lg md:text-xl leading-relaxed mb-6 font-handwritten">
                  Wishing you both a lifetime of love and happiness together!
                </p>
                <p className="text-gray-700 text-lg md:text-xl leading-relaxed mb-6 font-handwritten">
                  We're so happy for you both and can't wait to celebrate your special day.
                </p>
                <div className="mt-10">
                  <p className="text-right text-gray-700 text-lg md:text-xl font-handwritten">
                    With love,
                  </p>
                  <div className="w-32 h-1 bg-accent/30 my-4 ml-auto"></div>
                  <p className="text-right text-gray-600">
                    Your friends & family
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-10 text-center">
              <p className="text-muted-foreground mb-4">
                Send us your message at:
              </p>
              <a 
                href="mailto:engagementzeyadrawan@gmail.com" 
                className="inline-block px-4 py-3 md:px-6 bg-accent text-white rounded-full hover:bg-accent/90 transition-colors duration-300 text-sm md:text-base break-all max-w-full"
              >
                engagementzeyadrawan@gmail.com
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
