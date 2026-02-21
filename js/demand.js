mapboxgl.accessToken = 'pk.eyJ1Ijoic3NyaWRoYXIiLCJhIjoiY21sb2prdWUxMHQ1ZjNkcHV3NmR5Z3p0MCJ9.f1LyZZncnU-kkIyOxqETng';

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [-77.0369, 38.9072],
  zoom: 11
});
