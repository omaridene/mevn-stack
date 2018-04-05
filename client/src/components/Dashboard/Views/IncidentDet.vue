<template>
<div class="content">
  <div class="container-fluid">
    <div class="row">
        <div class="col-md-8">
  <gmap-map
    id="map"
    :center="center"
    :zoom="8"
    :options="options"
    map-type-id="roadmap"
  >
    <gmap-marker
      :key="index"
      v-for="(m, index) in markers"
      :position="m.position"
      :clickable="true"
      :draggable="true"
      @click="center=m.position"
    ></gmap-marker>
  </gmap-map>
        </div>
    </div>
    </div>
    </div>
</template>
<script>
  import {API_KEY} from './Maps/API_KEY'
  import Vue from 'vue'
  import * as VueGoogleMaps from 'vue2-google-maps'
  import IncidentsService from '@/services/IncidentsService'
  Vue.use(VueGoogleMaps, {
    load: {
      key: API_KEY
    }
  })
  export default {
    data () {
      return {
        center: {
          lat: 36.900,
          lng: 10.186
        },
        markers: []
        ,
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
    },
  mounted () {
      this.getIncidentId()
    },
  methods: {
      async getIncidentId () {
        const response = await IncidentsService.getIncidentById({
          id: this.$route.params.id
        })
        console.log(response.data.address.coordinates[0]+" / "+response.data.address.coordinates[1])
        this.markers.push({position: {lat: response.data.address.coordinates[0], lng: response.data.address.coordinates[1]}})
        
      }
  },
  }
</script>
<style>
  #map {
    min-height: calc(100vh - 123px);
  }
</style>
