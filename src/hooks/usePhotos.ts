import { useEffect, useState } from 'react'

const EXTS = ['jpg', 'jpeg', 'png', 'webp'] as const
const PHOTO_COUNT = 8

function probeImage(src: string): Promise<boolean> {
  return new Promise((resolve) => {
    const img = new Image()
    img.onload = () => resolve(true)
    img.onerror = () => resolve(false)
    img.src = src
  })
}

export async function resolvePhotoPaths(): Promise<string[]> {
  const found: string[] = []

  for (let n = 1; n <= PHOTO_COUNT; n += 1) {
    for (const ext of EXTS) {
      const path = `/photos/${n}.${ext}`
      if (await probeImage(path)) {
        found.push(path)
        break
      }
    }
  }

  return found
}

export function usePhotos(): string[] {
  const [photos, setPhotos] = useState<string[]>([])

  useEffect(() => {
    let live = true

    resolvePhotoPaths().then((found) => {
      if (live) setPhotos(found)
    })

    return () => {
      live = false
    }
  }, [])

  return photos
}

export { probeImage }
