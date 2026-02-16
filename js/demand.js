mapboxgl.accessToken = 'YOUR_MAPBOX_TOKEN';

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/light-v11',
  center: [-77.0369, 38.9072],
  zoom: 11
});

map.on('load', () => {

  map.addSource('demand', {
    type: 'geojson',
    data: 'data/station_demand_index.geojson'
  });

  map.addLayer({
    id: 'demand-layer',
    type: 'circle',
    source: 'demand',
    paint: {
      'circle-radius': [
        'interpolate',
        ['linear'],
        ['get', 'avg_daily_trips'],
        0, 3,
        60, 14
      ],
      'circle-color': '#1f2937',
      'circle-opacity': 0.85
    }
  });

});
