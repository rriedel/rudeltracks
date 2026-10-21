import { Map, NavigationControl, LngLatBounds, setWorkerUrl } from 'maplibre-gl'
import maplibreWorker from 'maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url'
import 'maplibre-gl/dist/maplibre-gl.css'
import './prototype.css'
import { parseGpx } from './gpx.js'

const gpxFiles = import.meta.glob('../tracks/*.gpx', {
  query: '?raw',
  import: 'default',
  eager: true,
})
const trackColors = ['#d62828', '#2563eb', '#15803d', '#9333ea', '#f59e0b', '#8b5cf6', '#00bcd4', '#ff69b4']

setWorkerUrl(maplibreWorker)

const apiKey = import.meta.env.VITE_THUNDERFOREST_API_KEY?.trim()
const status = document.querySelector('#connection-status')
const statusText = document.querySelector('#connection-message')

function setStatus(state, message) {
  status.dataset.state = state
  statusText.textContent = message
}

// MapLibre style builder function, uses the Thunderforest Vector Styles API
// https://www.thunderforest.com/docs/vector-styles-api
// currently no support for outdoor style maps
function buildStyleVectorStylesAPI() {
  const thunderforestMapStyle = 'atlas'
  return `https://api.thunderforest.com/styles/${thunderforestMapStyle}/style.json?apikey=${encodeURIComponent(apiKey)}`
}

if (!apiKey) {
  setStatus('error', 'API-Key fehlt. Lokal in .env.local eintragen und neu starten.')
} else {
  const attribution =
    'Maps © <a href="https://www.thunderforest.com/" target="_blank" rel="noreferrer">Thunderforest</a>, Data © <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">OpenStreetMap contributors</a>'

  const map = new Map({
    container: 'map',
    center: [14.138537540845098, 50.95604342599875],
    zoom: 9,
    minZoom: 2,
    maxZoom: 18,
    attributionControl: { compact: false, customAttribution: attribution },
    // style: buildStyleVectorStylesAPI(), // thunderforest vector styles API
    style: 'https://tiles.stadiamaps.com/styles/outdoors.json' // stadiamaps outdoors style
  })

  map.addControl(new NavigationControl({ visualizePitch: true }), 'top-right')

  map.on('load', () => {
    try {
      const files = Object.entries(gpxFiles).sort(([left], [right]) => left.localeCompare(right))
      if (files.length === 0) {
        throw new Error('Im Track-Ordner wurden keine GPX-Dateien gefunden.')
      }
      const tracks = files.map(([path, gpx], index) => {
        try {
          return { ...parseGpx(gpx), color: trackColors[index % trackColors.length] }
        } catch (error) {
          const message = error instanceof Error ? error.message : 'Unbekannter Trackfehler.'
          throw new Error(`${path}: ${message}`, { cause: error })
        }
      })
      const bounds = new LngLatBounds()

      tracks.forEach(({ data, bounds: trackBounds, color }, index) => {
        const source = `gpx-track-${index + 1}`
        bounds.extend(trackBounds)
        map.addSource(source, { type: 'geojson', data })
        map.addLayer({
          id: `${source}-outline`,
          type: 'line',
          source,
          layout: { 'line-join': 'round', 'line-cap': 'round' },
          paint: { 'line-color': '#ffffff', 'line-width': 7 },
        })
        map.addLayer({
          id: `${source}-line`,
          type: 'line',
          source,
          layout: { 'line-join': 'round', 'line-cap': 'round' },
          paint: { 'line-color': color, 'line-width': 4 },
        })
      })
      map.fitBounds(bounds, { padding: 48, maxZoom: 15, duration: 0 })
      setStatus('success', `Kartenstil und ${tracks.length} GPX-Tracks geladen.`)
    } catch (error) {
      console.error('GPX-Tracks konnten nicht angezeigt werden.', error)
      const message = error instanceof Error ? error.message : 'Unbekannter Trackfehler.'
      setStatus('error', `Trackfehler: ${message}`)
    }
  })

  map.on('error', (event) => {
    const message = event.error?.message ?? 'Unbekannter Kartenfehler.'
    setStatus('error', `Ladefehler: ${message}`)
  })
}
