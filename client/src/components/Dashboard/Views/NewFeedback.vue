<template>
  <div class="feedback">
    <div class="form">
      <h1>Add Feedback</h1>

        <p v-if="errors.length">
          <b>Please correct the following error(s):</b>
          <p v-for="error in errors">{{ error }}</p>





        <div>
        <input type="text" name="title" placeholder="TITLE" v-model="title">
      </div>
<div>
      <select v-model="selected" style="width:47%">
        <option  v-for="(incident, index) in incidents" v-bind:selected="index === 0">{{incident.Title}}</option>
      </select>

</div>
      <div>
        <textarea rows="15" cols="15" placeholder="DESCRIPTION" v-model="description" name="description"></textarea>
      </div>

      <div>
        <button class="app_post_btn" @click="addFeedback" >Add</button>
      </div>


    </div>
  </div>
</template>

<script>
  import FeedbacksService from '@/services/FeedbacksService'
  import IncidentsService from '@/services/IncidentsService'

  export default {
    name: 'NewFeedback',
    data () {
      return {
        title: '',
        description: '',
        errors: [],
        incidents: [],
        selected: ''
      }
    },
    mounted () {
      this.getAllIncidents()
    },
    methods: {
      async addFeedback () {
        this.errors = []
        if (!this.title) this.errors.push('Title required.')
        if (!this.description) this.errors.push('Description required.')
        if (this.errors.length <= 0) {
          await FeedbacksService.addFeedback({
          title: this.title,
          description: this.description,
            incident : this.selected
        })
          this.$swal(
            'Great!',
            `Your feedback has been added!`,
            'success'
          )
          this.$router.push({ name: 'Feedbacks' })
        this.$router.push('feedbacks')
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
