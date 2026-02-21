mapboxgl.accessToken = 'pk.eyJ1Ijoic3NyaWRoYXIiLCJhIjoiY21sb2prdWUxMHQ1ZjNkcHV3NmR5Z3p0MCJ9.f1LyZZncnU-kkIyOxqETng';

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/light-v11',
  center: [-77.0369, 38.9072],
  zoom: 11
});

map.on('load', () => {

  map.addSource('demand', {
    type: 'geojson',
    data: 'station_stress_mismatch.geojson'  // confirm filename
  });

  // Heatmap Layer
  map.addLayer({
    id: 'demand-heat',
    type: 'heatmap',
    source: 'demand',
    paint: {

      // Weight heat by avg daily trips
      'heatmap-weight': [
        'interpolate',
        ['linear'],
        ['get', 'avg_daily_trips'],
        0, 0,
        60, 1
      ],

      // Increase intensity at higher zoom
      'heatmap-intensity': [
        'interpolate',
        ['linear'],
        ['zoom'],
        10, 1,
        15, 3
      ],

      // Color ramp
      'heatmap-color': [
        'interpolate',
        ['linear'],
        ['heatmap-density'],
        0, 'rgba(229,231,235,0)',
        0.2, '#bfdbfe',
        0.4, '#60a5fa',
        0.6, '#2563eb',
        0.8, '#1d4ed8',
        1, '#111827'
      ],

      'heatmap-radius': [
        'interpolate',
        ['linear'],
        ['zoom'],
        10, 15,
        15, 35
      ],

      'heatmap-opacity': 0.85
    }
  });

});
