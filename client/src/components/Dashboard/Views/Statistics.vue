<!-- ./src/components/Review.vue -->
<template>
  <div class="container">
    
    <h5 class="uppercase">List of reported incidents</h5>
   
    <div class="incident" v-for="i in incidents">

      <div class="panel panel-danger">
          <div class="panel-heading"><strong>Incodent Title: </strong> {{ i.title }}</div>
          <div class="panel-body"><strong>Incodent description: </strong> {{ i.description }}</div>
          <div class="panel-body"><strong>Date of report: </strong> {{ i.date }}</div>
          <div class="b"><router-link v-bind:to="{ name: 'Incident Detail', params: { id: i._id } }">More details</router-link> </div>
        </div>
    </div>
    

    <div class="incident-form" >
      <h5>Report new incident.</h5>
      <form @submit.prevent="addIncident">
          <label for="title">Title:</label>
          <textarea v-model="title" class="form-control" cols="30" rows="5"></textarea>
        
          <label for="description">Description:</label>
          <input v-model="description" class="form-control" type="text">
       
        <button :disabled="!title || !description" type="submit" class="btn btn-default">Submit</button>
      </form>

    </div>

  </div>
</template>

<script>
  import IncidentsService from '@/services/IncidentsService'
  import Pusher from 'pusher-js'
  export default {
    name: 'incidents',
    data () {
      return {
        incidents: [],
        title: '',
        description: '',
        timer: ''
        
      }
    },
    
    created: function() {

this.getIncidents();
this.timer = setInterval(this.getIncidents, 30)

},
  watch: {
    '$route': 'getIncidents'
  },
    methods: {
      async getIncidents () {
        const response = await IncidentsService.fetchAll()
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
          type: 'accident'
        })
 
        this.$router.go(this.$router.currentRoute)
        this.$router.push('')
        
    
  },
  subscribe () {
      let pusher = new Pusher('9fb83aabdb44fe9586d1', { cluster: 'eu' })
      pusher.subscribe('addIncident')
      
    }
    






    }
  }
</script>






  return res.json({ success: true, message: 'Thank you for voting' });
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
</style>


