<template>
  <div class="feedbacks">
    <h1 class="table-wrap">Feedback</h1>
    <div v-if="feedbacks.length > 0" class="table-wrap">
      <div>
        <router-link v-bind:to="{ name: 'New Feedback' }" class="">Add Feedback</router-link>
      </div>
      <table>
        <tr>
          <td width="300">Title</td>
          <td width="650">Description</td>
          <td width="200" align="center">Action</td>
        </tr>
        <tr v-for="feedback in feedbacks">
          <td><router-link v-bind:to="{ name: 'Feedback Detail', params: { id: feedback._id } }">{{feedback.title}}</router-link> </td>
          <td>{{ feedback.description }}</td>
          <td align="center">
            <button type="button" aria-hidden="true" class="close"@click="deleteFeedback(feedback._id)">Delete</button>
            <button type="button" aria-hidden="true" class="close"> <router-link v-bind:to="{ name: 'Edit Feedback', params: { id: feedback._id } }">Edit|</router-link> </button>

          </td>
        </tr>
      </table>
    </div>
    <div class="table-wrap" v-else>
      There are no feedbacks . Lets add one now <br /><br />
      <router-link v-bind:to="{ name: 'New Feedback' }" class="add_post_link">Add Feedback</router-link>
    </div>
  </div>
</template>

<script>
  import FeedbacksService from '@/services/FeedbacksService'
  export default {
    name: 'feedbacks',
    data () {
      return {
        feedbacks: []
      }
    },
    mounted () {
      this.getFeedbacks()
    },
    methods: {
      async getFeedbacks () {
        const response = await FeedbacksService.fetchFeedbacks()
        this.feedbacks = response.data.feedbacks
  },
      async deleteFeedback (id) {
        const $this = this
        $this.$swal({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        }).then(function (res) {
          if (res.dismiss !== 'cancel') {
            FeedbacksService.deleteFeedbackById(id)
          }
          $this.$router.go({
            path: '/feedbacks'
          })
        })
      }
    }
  }
</script>





<style type="text/css">
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
