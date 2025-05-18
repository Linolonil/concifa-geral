"use client"

import Image from "next/image"

export default function HeroBanner() {
  return (
    <div className="relative w-full ">
      {/* Imagem responsiva, no fluxo do layout */}
      <Image
        src="/images/bg-hero.png"
        alt="Background do Congresso"
        width={1920}
        height={1080}
        className="w-full h-auto object-contain"
        quality={100}
        priority
      />

   
    </div>
  )
}
