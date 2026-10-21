export function parseGpx(text) {
  const document = new DOMParser().parseFromString(text, 'application/xml')
  if (document.querySelector('parsererror') || document.documentElement.localName !== 'gpx') {
    throw new Error('Die GPX-Datei enthält kein gültiges GPX-XML.')
  }

  const features = []
  const bounds = [[Infinity, Infinity], [-Infinity, -Infinity]]

  for (const track of document.getElementsByTagNameNS('*', 'trk')) {
    const name = Array.from(track.children).find((child) => child.localName === 'name')?.textContent
    for (const segment of Array.from(track.children).filter((child) => child.localName === 'trkseg')) {
      const coordinates = []
      for (const point of Array.from(segment.children).filter((child) => child.localName === 'trkpt')) {
        const latitude = point.getAttribute('lat')
        const longitude = point.getAttribute('lon')
        const lat = Number(latitude)
        const lon = Number(longitude)
        if (
          !latitude?.trim() || !longitude?.trim() ||
          !Number.isFinite(lat) || !Number.isFinite(lon) ||
          lat < -90 || lat > 90 || lon < -180 || lon > 180
        ) {
          throw new Error('Der GPX-Track enthält ungültige Koordinaten.')
        }
        coordinates.push([lon, lat])
        bounds[0][0] = Math.min(bounds[0][0], lon)
        bounds[0][1] = Math.min(bounds[0][1], lat)
        bounds[1][0] = Math.max(bounds[1][0], lon)
        bounds[1][1] = Math.max(bounds[1][1], lat)
      }
      if (coordinates.length < 2) {
        throw new Error('Ein GPX-Tracksegment enthält weniger als zwei Punkte.')
      }
      features.push({
        type: 'Feature',
        properties: { name: name?.trim() || 'GPX-Track' },
        geometry: { type: 'LineString', coordinates },
      })
    }
  }

  if (features.length === 0) {
    throw new Error('Die GPX-Datei enthält keine darstellbaren Tracksegmente.')
  }

  return { data: { type: 'FeatureCollection', features }, bounds }
}
