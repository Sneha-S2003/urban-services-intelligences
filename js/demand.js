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
    data: 'station_stress_mismatch.geojson'
  });

  map.addLayer({
    id: 'demand-layer',
    type: 'circle',
    source: 'demand',
    paint: {
      'circle-radius': 6,
      'circle-color': '#1d4ed8',
      'circle-opacity': 0.8
    }
  });

});
