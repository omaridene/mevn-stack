<template>
  <div class="feedbacks">
    <div style="display: flex;flex-wrap: wrap;align-items: center;justify-content: center;margin-top:30px ">
    </div>
    <div v-if="feedbacks.length > 0" class="table-wrap">
      <div style="display: flex;flex-wrap: wrap;align-items: center;justify-content: center;margin-top:30px " v-if="token !=null">
        <router-link v-bind:to="{ name: 'New Feedback' }" class="add_post_link">Add Feedback</router-link>
      </div>
      <div style="display: flex;flex-wrap: wrap;align-items: center;justify-content: center;margin-top:30px ">
        <div  style="width: 400px">
          <stats-card>
            <div slot="header" class="icon-warning">
              <i class="fa fa-calendar-plus-o" ></i>

            </div>
            <div slot="content">
              <p class="card-category">The last feedback</p>
              <h4 class="card-title">{{lastFeedback.title}}</h4>
            </div>
            <div slot="footer">
              <router-link v-bind:to="{ name: 'Feedback Detail', params: { id: lastFeedback._id } }"><i class="fa fa-angle-right"></i>Go to ..
              </router-link>
            </div>
          </stats-card>
        </div>

        <div  style="width: 400px;margin-left:30px">
          <stats-card>
            <div slot="header" class="icon-success">
              <i class="fa fa-comments"></i>
            </div>
            <div slot="content">
              <p class="card-category">The most commented feedback</p>
              <h4 class="card-title">{{mostCommentedFeedback.title}}</h4>
            </div>
            <div slot="footer">
              <router-link v-bind:to="{ name: 'Feedback Detail', params: { id: mostCommentedFeedback._id } }"><i class="fa fa-angle-right"></i>Go to ..
              </router-link>
            </div>
          </stats-card>
        </div>
      </div>



      <table style="margin-top: 30px">
        <tr>
          <td width="120">Published by</td>
          <td width="300">Title</td>
          <td width="650">Description</td>
        </tr>
        <tr v-for="feedback in feedbacks" class="feedback" :title=feedback.date v-if="feedback.status === enabled">
          <td>{{feedback.user.firstName}} {{feedback.user.lastName}}</td>
          <td>
            <router-link v-bind:to="{ name: 'Feedback Detail', params: { id: feedback._id } }">{{feedback.title}}
            </router-link>
          </td>
          <td>{{ feedback.description }}</td>

        </tr>
      </table>
    </div>
    <div class="table-wrap" v-else>
      There are no feedbacks . Lets add one now <br/><br/>
      <router-link v-bind:to="{ name: 'New Feedback' }" class="add_post_link">Add Feedback</router-link>
    </div>
  </div>
</template>

<script>
  import FeedbacksService from '@/services/FeedbacksService'

  import ChartCard from 'src/components/UIComponents/Cards/ChartCard.vue'
  import StatsCard from 'src/components/UIComponents/Cards/StatsCard.vue'
  import Card from 'src/components/UIComponents/Cards/Card.vue'
  import LTable from 'src/components/UIComponents/Table.vue'
  import Checkbox from 'src/components/UIComponents/Inputs/Checkbox.vue'
  export default {
    components: {
      StatsCard
    },
    name: 'feedbacks',
    data() {
      return {
        feedbacks: [],
        lastFeedback: '',
        mostCommentedFeedback: '',
        token: localStorage.getItem('token'),
        user: JSON.parse(localStorage.getItem('user')),
        enabled : "enabled"
      }
    },
    mounted() {
      this.getFeedbacks(),
        this.getLastFeedback()
    },
    methods: {
      async getFeedbacks()
      {
        const response = await
          FeedbacksService.fetchFeedbacks()
        this.feedbacks = response.data.feedbacks
        var mostCommentedFeedback
        var test=false;
        var x=0;
        while (test === false && x<this.feedbacks.length){
          if  (this.feedbacks[x].status === "enabled") {
            mostCommentedFeedback=this.feedbacks[x]
            test = true
          }
          else x++
        }


        for (var i=1;i<this.feedbacks.length;i++){
          if(this.feedbacks[i].comments.length>mostCommentedFeedback.comments.length && this.feedbacks[i].status === "enabled")
            mostCommentedFeedback = this.feedbacks[i]
        }
        this.mostCommentedFeedback = mostCommentedFeedback
      },
      async getLastFeedback()
      {
        const response = await
          FeedbacksService.fetchLastFeedback()
        this.lastFeedback = response.data.feedbacks[0]
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
