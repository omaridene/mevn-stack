<!--<template>
  <gmap-map
    id="map"
    :center="center"
    :zoom="13"
    :options="options"
    map-type-id="terrain"
  >
    <gmap-marker :position="center">
    </gmap-marker>
  </gmap-map>
</template>
<script>
  import {API_KEY} from './Maps/API_KEY'
  import Vue from 'vue'
  import * as VueGoogleMaps from 'vue2-google-maps'
  Vue.use(VueGoogleMaps, {
    load: {
      key: API_KEY
    }
  })
  export default {
    data () {
      return {
        center: {
          lat: 40.748817,
          lng: -73.985428
        },
        options: {
          styles: [{
            'featureType': 'water',
            'stylers': [{'saturation': 43}, {'lightness': -11}, {'hue': '#0088ff'}]
          }, {
            'featureType': 'road',
            'elementType': 'geometry.fill',
            'stylers': [{'hue': '#ff0000'}, {'saturation': -100}, {'lightness': 99}]
          }, {
            'featureType': 'road',
            'elementType': 'geometry.stroke',
            'stylers': [{'color': '#808080'}, {'lightness': 54}]
          }, {
            'featureType': 'landscape.man_made',
            'elementType': 'geometry.fill',
            'stylers': [{'color': '#ece2d9'}]
          }, {
            'featureType': 'poi.park',
            'elementType': 'geometry.fill',
            'stylers': [{'color': '#ccdca1'}]
          }, {
            'featureType': 'road',
            'elementType': 'labels.text.fill',
            'stylers': [{'color': '#767676'}]
          }, {
            'featureType': 'road',
            'elementType': 'labels.text.stroke',
            'stylers': [{'color': '#ffffff'}]
          }, {'featureType': 'poi', 'stylers': [{'visibility': 'off'}]}, {
            'featureType': 'landscape.natural',
            'elementType': 'geometry.fill',
            'stylers': [{'visibility': 'on'}, {'color': '#b8cb93'}]
          }, {'featureType': 'poi.park', 'stylers': [{'visibility': 'on'}]}, {
            'featureType': 'poi.sports_complex',
            'stylers': [{'visibility': 'on'}]
          }, {'featureType': 'poi.medical', 'stylers': [{'visibility': 'on'}]}, {
            'featureType': 'poi.business',
            'stylers': [{'visibility': 'simplified'}]
          }]
        }
      }
    }
  }
</script>
<style>
  #map {
    min-height: calc(100vh - 123px);
  }
</style>-->
<template>
  <vue-google-heatmap :points="points" :width="500" :height="300" />
</template>
<script>
import axios from 'axios'
export default {
  name: 'HelloWorld',
  data () {
    return {
      points: [
        // {location: new VueGoogleHeatmap.maps.LatLng(37.782, -122.447), weight: 0.5},
        // {location: new VueGoogleHeatmap.maps.LatLng(37.782, -122.443), weight: 2},
        // {location: new VueGoogleHeatmap.maps.LatLng(37.782, -122.441), weight: 3},
        // {location: new VueGoogleHeatmap.maps.LatLng(37.782, -122.439), weight: 2},
        // {location: new VueGoogleHeatmap.maps.LatLng(37.782, -122.435), weight: 0.5},
        // {location: new VueGoogleHeatmap.maps.LatLng(37.785, -122.447), weight: 3},
        // {location: new VueGoogleHeatmap.maps.LatLng(37.785, -122.445), weight: 2},2
        // {location: new VueGoogleHeatmap.maps.LatLng(37.785, -122.441), weight: 0.5},
        // {location: new VueGoogleHeatmap.maps.LatLng(37.785, -122.437), weight: 2},
        // {location: new VueGoogleHeatmap.maps.LatLng(37.785, -122.435), weight: 3}
        // {lat: 36.425752, lng: 10.531763}
        // {lat: 37.786564, lng: -122.440209},
        // {lat: 37.786905, lng: -122.440270},
        // {lat: 37.786956, lng: -122.440279},
        // {lat: 37.800224, lng: -122.433520},
        // {lat: 37.800155, lng: -122.434101},
        // {lat: 37.800160, lng: -122.434430},
        // {lat: 37.800378, lng: -122.434527},
        // {lat: 37.800738, lng: -122.434598},
        // {lat: 37.800938, lng: -122.434650},
        // {lat: 37.801024, lng: -122.434889},
        // {lat: 37.800955, lng: -122.435392},
        // {lat: 37.800886, lng: -122.435959}
      ]
    }
  },
  created () {
    axios.get(`http://localhost:8001/incident`)
      .then(response => {
        // JSON responses are automatically parsed.
        // console.log(response.data[0].address)
        for (let i = 0; i < response.data.length; i++) {
          console.log(response.data[i].address.coordinates[0])
          this.points.push({lat: response.data[i].address.coordinates[0], lng: response.data[i].address.coordinates[1]})
        }
        // console.log(this.points.length)
      })
      .catch(e => {
        this.errors.push(e)
      })
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

