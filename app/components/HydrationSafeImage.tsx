'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

interface HydrationSafeImageProps {
  src: string
  alt: string
  className?: string
  fill?: boolean
  width?: number
  height?: number
}

export default function HydrationSafeImage({ src, alt, className = '', fill, width, height }: HydrationSafeImageProps) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  if (fill) {
    return (
      <Image
        src={src}
        alt={alt}
        className={className}
        fill
        sizes="100vw"
      />
    )
  }

  return (
    <Image
      src={src}
      alt={alt}
      className={className}
      width={width || 400}
      height={height || 300}
    />
  )
}
