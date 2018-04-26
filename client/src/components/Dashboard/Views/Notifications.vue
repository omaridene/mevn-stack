<!-- ./src/components/Review.vue -->
<template>
  <div class="container">
    
    <h5 class="uppercase">List of reported incidents</h5>
  

    <div class="time-entries">
      <p v-if="!incidents.length"><strong>No report entries yet</strong></p>

      <div class="list-group">

        <a class="list-group-item" v-for="i in incidents">
          <div class="row">

            <div class="col-sm-2 user-details">
             
              <p class="text-center">
                <strong>
                  <br> <br>   Titre:<br> <router-link v-bind:to="{ name: 'incident Det', params: { id: i._id } }">{{ i.title }}</router-link> 
                  
                </strong>
              </p>
            </div>

            <div class="col-sm-2 text-center time-block">
              <h3 class="list-group-item-text total-time">
                <i class="glyphicon glyphicon-time"></i> 
                <span>{{ i.date | moment("from", "now", true) }}</span>
              </h3>
              <p class="label label-primary text-center">
                <i class="glyphicon glyphicon-calendar"></i> 
                {{ i.date | moment("dddd, MMMM Do YYYY") }}
                
              </p>
            </div>

            <div class="col-sm-7 comment-section">
             <p><strong>Description:</strong> {{i.description}}</p>
            </div>
            
          </div>        
        </a>

      </div>
      <!-- <v-pagination :total="3" v-model="currentPage"></v-pagination>  -->
      <!-- <pagination :current-page="currentPage"
            :total-items="totalItems"
            :items-per-page="itemsPerPage"
            @page-changed="handleIt">
</pagination> -->
    </div>   
   
  
    

    <div class="incident-form" >
      <h5>Report new incident.</h5>
      <form @submit.prevent="addIncident">
          <label for="title">Title:</label>
          <textarea v-model="title" class="form-control" cols="30" rows="5"></textarea>
        
          <label for="description">Description:</label>
          <input v-model="description" class="form-control" type="text">
       
        <button :disabled="!title || !description" type="submit" class="btn btn-default"  v-popover:foo>Submit</button>
        <popover name="foo" :width="120">
          <a href="#">Confirm report!</a>
      </popover>
      </form>

      <div class="search" hidden>
        <input type="text" v-model="searchAddressInput" v-on:change="searchLocation()"></input>
      </div>
      <hr>
      <div class="geolocation" v-on:click="geolocation()" hidden>
        <p>{{this.currentLocation.lat}}</p><br>
        <p>{{this.currentLocation.lng}}</p>
      </div>
     
          <div class="geolocation" v-on:click="geolocation()">
              
            </div>
            
    </div>

  </div>
</template>

<script>
  import IncidentsService from '@/services/IncidentsService'
  import Pusher from 'pusher-js'

 

  export default {

    name: 'incidents',
  
    props: {
    'name': String,
    'value': null,
    'id': String,
    'disabled': Boolean,
    'required': Boolean
  },
    
    data () {
      return {
        incidents: [],
        title: '',
        description: '',
        timer: '',
        totalTime: '',
        currentLocation : { lat : 0, lng : 0},
      searchAddressInput: 'esprit Tunis, Tunisia'
     
      }
    },
    
    created: function() {

this.getIncidents();
this.timer = setInterval(this.getIncidents, 30)

},
mounted : function() {
    this.geolocation();
 },

 

  watch: {
    '$route': 'getIncidents'
  },
    methods: {
    
      async getIncidents () {
        const response = await IncidentsService.fetchIncidents()
        this.incidents = response.data
      },
      addIncident () {
      if ( !this.title || !this.description) {
        alert('please make sure all fields are not empty')
        return
      }
     
           IncidentsService.addIncident({
          title: this.title,
          description: this.description,
          type: 'accident',
          address: {'lat':this.currentLocation.lat,'lng':this.currentLocation.lng }
        })
 
        this.$router.go(this.$router.currentRoute)
        this.$router.push('')
        
    
  },
  
  subscribe () {
      let pusher = new Pusher('9fb83aabdb44fe9586d1', { cluster: 'eu' })
      pusher.subscribe('addIncident')
      
    },
    geolocation : function() {
      navigator.geolocation.getCurrentPosition((position) => {
        this.currentLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
      });
    }
    //searchLocation: function() {
      //var geocoder = new google.maps.Geocoder();
      // geocoder.geocode({'address': this.searchAddressInput}, (results, status) => {
        // if (status === 'OK') {
          //   this.currentLocation.lat = results[0].geometry.location.lat();
          //  this.currentLocation.lng = results[0].geometry.location.lng();
          //   }
          //});
          //  }
    

    }
  }
</script>






  return res.json({ success: true, message: 'Thanks' });
});

<style scoped>
.container {
  padding: 0 20px;
}
.b{
  padding-left: 840px;
}

.incident {
  border:0px solid #ddd;
  font-size: 0.95em;
  padding-left: 100px;
  padding-right: 100px;
  margin: 15px 0 5px 0;
}
h5 {
  text-transform: uppercase;
  font-weight: bolder;
  text-align: center
}
.pull-right {
  float: right;
}
.incident-form {
  margin-top: 30px;
  border-top: 1px solid #ddd;
  padding-left: 150px;
  padding-right: 150px;
}
.avatar {
    height: 75px;
    margin: 0 auto;
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .user-details {
    background-color: #f5f5f5;
    border-right: 1px solid #ddd;
    margin: -10px 0;
  }
  .time-block {
    padding: 10px;
  }
  .comment-section {
    padding: 20px;
  }




</style>


