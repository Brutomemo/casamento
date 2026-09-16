import { useEffect, useState } from 'react'
import { probeImage, usePhotos } from '../hooks/usePhotos'

const ASSET_CANDIDATES = [
  '/assets/selo.webp',
  '/assets/floral-top.webp',
  '/assets/floral-bottom.webp',
  '/assets/floral-vine-left.webp',
  '/assets/floral-vine-right.webp',
  '/assets/floral-corner.webp',
  '/assets/bg-silk.webp',
  '/assets/envelope.webp',
  '/assets/envelope-mobile.webp',
]

function fileName(path: string) {
  return path.split('/').pop() ?? path
}

export default function AssetsPage() {
  const photos = usePhotos()
  const [assets, setAssets] = useState<string[]>([])

  useEffect(() => {
    let live = true

    Promise.all(
      ASSET_CANDIDATES.map(async (path) => ((await probeImage(path)) ? path : null)),
    ).then((results) => {
      if (live) setAssets(results.filter((path): path is string => Boolean(path)))
    })

    return () => {
      live = false
    }
  }, [])

  const groups = [
    { title: 'public/assets', items: assets },
    { title: 'public/photos', items: photos },
  ]

  return (
    <main className="assets-page">
      <header className="assets-header">
        <p className="eyebrow">Desenvolvimento</p>
        <h1 className="assets-title">Assets</h1>
        <a className="assets-back" href="/">
          ← voltar ao convite
        </a>
      </header>

      {groups.map((group) => (
        <section key={group.title} className="assets-group">
          <h2 className="assets-group-title">{group.title}</h2>
          {group.items.length === 0 ? (
            <p className="assets-empty">Nenhuma imagem encontrada.</p>
          ) : (
            <ul className="assets-grid">
              {group.items.map((src) => (
                <li className="assets-item" key={src}>
                  <div className="assets-thumb">
                    <img src={src} alt={fileName(src)} />
                  </div>
                  <p className="assets-name">{fileName(src)}</p>
                </li>
              ))}
            </ul>
          )}
        </section>
      ))}
    </main>
  )
}
