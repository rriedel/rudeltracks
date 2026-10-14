import { Map, NavigationControl, setWorkerUrl } from 'maplibre-gl'
import maplibreWorker from 'maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url'
import 'maplibre-gl/dist/maplibre-gl.css'
import './prototype.css'
import trackGpx from '../2026-10-13_3345858628_Schrammstein-Aussicht und Gratweg nach Schmilka.gpx?raw'
import { parseGpx } from './gpx.js'

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
    style: buildStyleVectorStylesAPI(),
  })

  map.addControl(new NavigationControl({ visualizePitch: true }), 'top-right')

  map.on('load', () => {
    try {
      const { data, bounds } = parseGpx(trackGpx)
      map.addSource('gpx-track', { type: 'geojson', data })
      map.addLayer({
        id: 'gpx-track-outline',
        type: 'line',
        source: 'gpx-track',
        layout: { 'line-join': 'round', 'line-cap': 'round' },
        paint: { 'line-color': '#ffffff', 'line-width': 7 },
      })
      map.addLayer({
        id: 'gpx-track-line',
        type: 'line',
        source: 'gpx-track',
        layout: { 'line-join': 'round', 'line-cap': 'round' },
        paint: { 'line-color': '#d62828', 'line-width': 4 },
      })
      map.fitBounds(bounds, { padding: 48, maxZoom: 15, duration: 0 })
      setStatus('success', 'Atlas-Kartenstil und GPX-Track geladen.')
    } catch (error) {
      console.error('GPX-Track konnte nicht angezeigt werden.', error)
      const message = error instanceof Error ? error.message : 'Unbekannter Trackfehler.'
      setStatus('error', `Trackfehler: ${message}`)
    }
  })

  map.on('error', (event) => {
    const message = event.error?.message ?? 'Unbekannter Kartenfehler.'
    setStatus('error', `Ladefehler: ${message}`)
  })
}
