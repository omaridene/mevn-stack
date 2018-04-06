<template>
<div class="content">
  <div class="container-fluid">
    <div class="row">
        <div class="col-md-7">
          <vue-google-heatmap :points="points" />
          <!-- :width="600" :height="600" -->
        </div>
        <div class="col-md-5">
          <!-- <card>
            <template slot="header">
              <h5 class="title">Nearest incidents</h5>
              <p class="category">Incidents near to that place</p>
            </template> -->
              

          <table>
            <tr>
              <td> nearest alerts to your</td>
              <td>current position</td>
              <td><toggle-button
            :value="false"
            @change="updateValue"/>
</td>
              
            </tr>
            <tr v-for="i in incidents">
              <td><router-link v-bind:to="{ name: 'incident Detail', params: { id: i._id } }">{{i.Title}}</router-link></td>
              <td>{{ i.Description }}</td>
              <td>{{ i.distance }} km</td>
            </tr>
          </table>
               
              
            <!-- <div class="footer">
              <hr>
              <div class="stats">
                <i class="fa fa-history"></i> Updated 3 minutes ago
              </div>
            </div>
          </card> -->
        </div>
    <!-- <div class="feedbacks">
      <h1 class="table-wrap">Feedback</h1>
      <div v-if="incidents.length > 0" class="table-wrap">
        <table>
          <tr>
            <td width="300">Title</td>
            <td width="650">Description</td>
          </tr>
          <tr v-for="i in incidents">
            <td>{{i.Title}} </td>
            <td>{{ i.Description }}</td>
          </tr>
        </table>
      </div>
    </div> -->
    </div>
  </div>
</div>
</template>
<script>
import {API_KEY} from './Maps/API_KEY'
  import Vue from 'vue'
  import VueGoogleHeatmap from 'vue-google-heatmap'
 Vue.use(VueGoogleHeatmap, {
  apiKey: API_KEY
})
import ChartCard from 'src/components/UIComponents/Cards/ChartCard.vue'
  import StatsCard from 'src/components/UIComponents/Cards/StatsCard.vue'
  import Card from 'src/components/UIComponents/Cards/Card.vue'
  import LTable from 'src/components/UIComponents/Table.vue'
  import Checkbox from 'src/components/UIComponents/Inputs/Checkbox.vue'
import axios from 'axios'
import VueGoogleHeatmapVue from 'vue-google-heatmap/src/VueGoogleHeatmap.vue'
import IncidentsService from '@/services/IncidentsService'
export default {
  name: 'HelloWorld',
  components: {
      Checkbox,
      Card,
      LTable,
      ChartCard,
      StatsCard
    },
  data () {
    return {
      points: [
        // {lat: response.data[i].address.coordinates[0], lng: response.data[i].address.coordinates[1]}
        // {location: new VueGoogleHeatmap.maps.LatLng(37.782, -122.447), weight: 0.5},
        // {lat: 37.800886, lng: -122.435959}
      ],
      
        incidents: []
      
    }
  },
  mounted () {
      this.getNearest()
    },
    computed: {
            appointments() {
              return this.incidents.slice(0).sort((a, b) => a.distance > b.distance ? this.sorting : -this.sorting )
            }
        },
  methods: {
      async getNearest () {
        const response = await IncidentsService.getNearestInidents()
        this.incidents = response.data
      },
      updateValue (event) {
        // console.log(event.value)
        if (event.value ==true) {
          this.incidents.sort((a, b) => a.distance > b.distance)
          console.log("true")
        }else{
          this.incidents.sort((a, b) => a.distance < b.distance)
          console.log("false")
        }
  // event.value - is a current state of the component (true/false)
}
  },
  created () {
    axios.get(`http://localhost:8001/incident`)
      .then(response => {
        // JSON responses are automatically parsed.
        // console.log(response.data[0].address)
        for (let i = 0; i < response.data.length; i++) {
          // console.log(response.data[i].address.coordinates[0])
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
.table-wrap {
    width: 90%;
    margin: 0 auto;
    text-align: center;
    alignment: center;
  }
  table th, table tr {
    text-align: left;
  }
  table thead {
    background: #f2f2f2;
  }
  table tr td {
    padding: 10px;
  }
  table tr:nth-child(odd) {
    background: #f2f2f2;
  }
  table tr:nth-child(1) {
    background: #4d7ef7;
    color: #fff;
  }
  a {
    color: #4d7ef7;
    text-decoration: none;
  }
  a.add_post_link {
    background: #4d7ef7;
    color: #fff;
    padding: 10px 80px;
    text-transform: uppercase;
    font-size: 12px;
    font-weight: bold;
  }
</style>

