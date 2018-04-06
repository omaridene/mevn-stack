<template>
  <div class="incidents">
    <div class="form">
      <h1>Add Incident</h1>
        <p v-if="errors.length">
          <b>Please correct the following error(s):</b>
          <p v-for="error in errors">{{ error }}</p>
        <div>
        <input type="text" name="title" placeholder="TITLE" v-model="title">
      </div>
      <div>
        <textarea rows="15" cols="15" placeholder="DESCRIPTION" v-model="description" name="description"></textarea>
      </div>
      <div>
        <select> <option>Accident</option>
          <option>Roberry</option>
         
        </select>
      </div>

      <div>
        <button class="app_post_btn" @click="addIncident">Add</button>
      </div>
      


    </div>
  </div>
</template>

<script>
  
  import IncidentsService from '@/services/IncidentsService'

  export default {
    name: 'New Incident',
    data () {
      return {
        title: '',
        description: '',
        type: '',
        errors: [],
      }
    },
    mounted () {
      this.getAllIncidents()
    },
    methods: {
      async addIncident () {
        this.errors = []
        if (!this.title) this.errors.push('Title required.')
        if (!this.description) this.errors.push('Description required.')
        if (this.errors.length <= 0) {
          await IncidentsService.addIncident({
          title: this.title,
          description: this.description,
          type: 'accident'
        })
          this.$swal(
            'Great!',
            `Your report has been added!`,
            'success'
          )
          this.$router.push({ name: 'Notifications' })
        this.$router.push('notifications')
        }
      },
      async getAllIncidents () {
        this.incidents = []
        const response = await IncidentsService.fetchIncidents()
        this.incidents = response.data.incidents
        }
    }
  }
 


</script>
<style type="text/css">
  .form input, .form textarea {
    width: 500px;
    padding: 10px;
    border: 1px solid #e0dede;
    outline: none;
    font-size: 12px;
  }

  .form{
    text-align: center;
  }
  .form div {
    margin: 20px;
  }
  .app_post_btn {
    background: #4d7ef7;
    color: #fff;
    padding: 10px 80px;
    text-transform: uppercase;
    font-size: 12px;
    font-weight: bold;
    width: 520px;
    border: none;
    cursor: pointer;
  }
</style>
