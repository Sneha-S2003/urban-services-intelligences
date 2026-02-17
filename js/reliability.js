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
    data: 'everyday_service_index.geojson'
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
const popup = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false
  });

  map.on('mouseenter', 'reliability-layer', (e) => {

    map.getCanvas().style.cursor = 'pointer';

    const props = e.features[0].properties;

    popup
      .setLngLat(e.lngLat)
      .setHTML(`
        <div style="font-size: 13px; line-height: 1.4;">
          <strong>${props.start_station_name}</strong><br/><br/>
          Everyday Service Index: ${props.service_index.toFixed(2)}<br/>
          Avg Daily Trips: ${Math.round(props.avg_daily_trips)}<br/>
          Stability Score: ${props.stability_score ? props.stability_score.toFixed(2) : 'N/A'}<br/>
          Peak Consistency: ${(props.peak_consistency * 100).toFixed(1)}%<br/>
          Member Consistency: ${(props.member_consistency * 100).toFixed(1)}%
        </div>
      `)
      .addTo(map);
  });

  map.on('mouseleave', 'reliability-layer', () => {
    map.getCanvas().style.cursor = '';
    popup.remove();
  });

});
