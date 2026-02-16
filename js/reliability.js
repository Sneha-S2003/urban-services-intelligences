mapboxgl.accessToken = 'pk.eyJ1Ijoic3NyaWRoYXIiLCJhIjoiY21sb2prdWUxMHQ1ZjNkcHV3NmR5Z3p0MCJ9.f1LyZZncnU-kkIyOxqETng';

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/light-v11',
  center: [-77.0369, 38.9072],
  zoom: 11
});

map.on('load', () => {

  map.addSource('reliability', {
    type: 'geojson',
    data: 'data/everyday_service_index.geojson'
  });

  map.addLayer({
    id: 'reliability-layer',
    type: 'circle',
    source: 'reliability',
    paint: {
      'circle-radius': [
        'interpolate',
        ['linear'],
        ['get', 'avg_daily_trips'],
        0, 3,
        60, 14
      ],
      'circle-color': [
        'interpolate',
        ['linear'],
        ['get', 'service_index'],
        0, '#e5e7eb',
        1, '#111827'
      ],
      'circle-opacity': 0.85
    }
  });

});
