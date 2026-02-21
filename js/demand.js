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

  // Heatmap Layer
  map.addLayer({
    id: 'demand-heat',
    type: 'heatmap',
    source: 'demand',
    paint: {
      'heatmap-weight': [
        'interpolate',
        ['linear'],
        ['get', 'station_stress_mismatch.geojson'],
        0, 0,
        60, 1
      ],
      'heatmap-intensity': 1.5,
      'heatmap-color': [
        'interpolate',
        ['linear'],
        ['heatmap-density'],
        0, 'rgba(0,0,0,0)',
        0.3, '#bfdbfe',
        0.5, '#60a5fa',
        0.7, '#2563eb',
        1, '#111827'
      ],
      'heatmap-radius': 30,
      'heatmap-opacity': 0.9
    }
  });

  // Invisible circle layer for hover
  map.addLayer({
    id: 'demand-hover',
    type: 'circle',
    source: 'demand',
    paint: {
      'circle-radius': 8,
      'circle-color': '#000000',
      'circle-opacity': 0  // invisible
    }
  });

  // Single popup instance
  const popup = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false
  });

  map.on('mouseenter', 'demand-hover', (e) => {
    map.getCanvas().style.cursor = 'pointer';

    const props = e.features[0].properties;

    popup
      .setLngLat(e.lngLat)
      .setHTML(`
        <div style="font-size: 13px; line-height: 1.4;">
          <strong>${props.start_station_name}</strong><br/><br/>
          Avg Daily Trips: ${Math.round(props.avg_daily_trips)}<br/>
          Peak-Hour Share: ${(props.peak_share * 100).toFixed(1)}%<br/>
          Member Share: ${(props.member_share * 100).toFixed(1)}%
        </div>
      `)
      .addTo(map);
  });

  map.on('mouseleave', 'demand-hover', () => {
    map.getCanvas().style.cursor = '';
    popup.remove();
  });

});
