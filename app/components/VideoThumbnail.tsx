'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface VideoThumbnailProps {
  id: string
  title: string
  thumbnail: string
  url: string
}

export default function VideoThumbnail({ id, title, thumbnail, url }: VideoThumbnailProps) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <div className="relative overflow-hidden rounded-lg shadow-md group">
      <img
        src={thumbnail}
        alt={title}
        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        onError={(e) => {
          const target = e.target as HTMLImageElement
          target.src = 'https://images.pexels.com/photos/274422/pexels-photo-274422.jpeg?auto=compress&cs=tinysrgb&w=400&h=225&dpr=1'
        }}
      />
      <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-60 transition-colors duration-300 flex items-center justify-center">
        <Link
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-primary-600 hover:bg-primary-700 text-white p-4 rounded-full transition-colors"
        >
          <svg className="w-8 h-8 ml-1" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z"/>
          </svg>
        </Link>
      </div>
    </div>
  )
}
