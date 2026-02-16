mapboxgl.accessToken = 'pk.eyJ1Ijoic3NyaWRoYXIiLCJhIjoiY21sb2prdWUxMHQ1ZjNkcHV3NmR5Z3p0MCJ9.f1LyZZncnU-kkIyOxqETng';

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/light-v11',
  center: [-77.0369, 38.9072],
  zoom: 11
});

map.on('load', () => {

  map.addSource('shortTrips', {
    type: 'geojson',
    data: 'data/short_trip_saturation.geojson'
  });

  map.addLayer({
    id: 'shortTrips-layer',
    type: 'circle',
    source: 'shortTrips',
    paint: {
      'circle-radius': [
        'interpolate',
        ['linear'],
        ['get', 'avg_daily_short_trips'],
        0, 3,
        40, 12
      ],
      'circle-color': [
        'interpolate',
        ['linear'],
        ['get', 'short_trip_share'],
        0, '#e5e7eb',
        0.5, '#60a5fa',
        0.8, '#1d4ed8'
      ],
      'circle-opacity': 0.85
    }
  });

});
