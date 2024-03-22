import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'DevToDo',
    short_name: 'DevToDo',
    theme_color: '#09090b',
    background_color: '#09090b',
    display: 'standalone',
    orientation: 'portrait',
    scope: '/',
    start_url: '/',
    icons: [
      {
        src: '/assets/images/favicon/favicon-192.png',
        type: 'image/png',
        sizes: '192x192',
      },
      {
        src: '/assets/images/favicon/favicon-256.png',
        type: 'image/png',
        sizes: '256x256',
      },
      {
        src: '/assets/images/favicon/favicon-512.png',
        type: 'image/png',
        sizes: '512x512',
      },
    ],
  }
}
