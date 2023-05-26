var map;

// Fonction d'initialisation de la carte
function initMap() {
  map = L.map('map').setView([51.505, -0.09], 13);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; OpenStreetMap contributors',
  }).addTo(map);

  // Appeler la fonction pour obtenir la position de l'utilisateur
  getUserLocation();
}

// Obtenir la position de l'utilisateur
function getUserLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var lat = position.coords.latitude;
      var lon = position.coords.longitude;
      
      updateMarker(lat, lon);
    }, function(error) {
      console.log(error);
    });
  } else {
    console.log("La géolocalisation n'est pas prise en charge par ce navigateur.");
  }
}

// Ajouter un marqueur à une position spécifique
var marker;

function addMarker(lat, lon) {
  if (marker) {
    marker.setLatLng([lat, lon]);
  } else {
    marker = L.marker([lat, lon]).addTo(map);
    marker.bindPopup("Marqueur de téléphone");
  }
}

// Mettre à jour la position du marqueur
function updateMarker(lat, lon) {
  addMarker(lat, lon);
  map.setView([lat, lon], map.getZoom());
}

// Appeler la fonction d'initialisation de la carte une fois que la page est chargée
window.addEventListener('load', initMap);