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
    data: 'short_trip_saturation.geojson'
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

  // Hover popup
 // Create ONE popup instance outside the hover event
const popup = new mapboxgl.Popup({
  closeButton: false,
  closeOnClick: false
});

map.on('mouseenter', 'shortTrips-layer', (e) => {

  map.getCanvas().style.cursor = 'pointer';

  const props = e.features[0].properties;

  popup
    .setLngLat(e.lngLat)
    .setHTML(`
      <div style="font-size: 13px; line-height: 1.4;">
        <strong>${props.start_station_name}</strong><br/><br/>
        Short-Trip Share: ${(props.short_trip_share * 100).toFixed(1)}%<br/>
        Avg Daily Short Trips: ${Math.round(props.avg_daily_short_trips)}<br/>
        Avg Daily Trips: ${Math.round(props.avg_daily_trips)}<br/>
        Peak-Hour Share: ${(props.peak_share * 100).toFixed(1)}%<br/>
        Member Share: ${(props.member_share * 100).toFixed(1)}%
      </div>
    `)
    .addTo(map);
});

map.on('mouseleave', 'shortTrips-layer', () => {
  map.getCanvas().style.cursor = '';
  popup.remove();
});

});
