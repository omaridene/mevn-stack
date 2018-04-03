<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <card>
            <template slot="header">
              <h4 class="card-title">{{title}}</h4>
              <p class="card-category">{{date}}</p>
            </template>
            <div class="typo-line">
              <h3><p class="category">Incident</p>{{incident.Title}}</h3>
            </div>

            <div class="typo-line">
              <h3><p class="category">Description</p>{{description}}</h3>
            </div>

            <div class="row">
              <div class="col-md-12">
                <div class="form-group">
                  <label>Your opinion</label>
                  <textarea  class="form-control border-input"
                            placeholder="Write a comment" v-model="comment" >
              </textarea>
                </div>
              </div>
            </div>
            <div class="text-center">
              <button type="submit" class="btn btn-info btn-fill float-right" @click="addComment">
                Comment it
              </button>
            </div>

            <div class="row col-md-12">
              <div class="col-md-12">
                <h5>Comments</h5>

                <div class="alert alert-info" v-for="commentt in comments">

                  <span >{{commentt.content}}</span>
                  <td style="position: absolute;right:20px;top:10px;">
                    <button type="button" class="btn-simple btn btn-xs btn-danger" >
                      <i class="fa fa-edit"></i>
                    </button>
                    <button type="button" class="btn-simple btn btn-xs btn-danger"  @click="deleteC(commentt._id)" >
                      <i class="fa fa-times"></i>
                    </button>
                  </td>
                </div>



              </div>
            </div>







          </card>

        </div>

      </div>
    </div>
  </div>
</template>
<script>
  import Card from 'src/components/UIComponents/Cards/Card.vue'
  import FeedbacksService from '@/services/FeedbacksService'

  export default {
    components: {
      Card
    },
    name: 'Feedback Detail',
    data () {
      return {
        title: '',
        description: '',
        date: '',
        incident: '',
        comment: '',
        comments: []
      }
    },
    mounted () {
      this.getFeedback(),
        this.getComments()
    },
    methods: {
      async getFeedback () {
        const response = await FeedbacksService.getFeedbackById({
          id: this.$route.params.id
        })
        this.title = response.data.title
        this.description = response.data.description
        this.date = response.data.date
        this.incident=response.data.incident
      },
      async addComment () {
        await FeedbacksService.addCommentToFeedback(this.$route.params.id,
        {
          content: this.comment
        }
        )
        this.getComments()
      },
      async getComments () {
        const response = await FeedbacksService.getFeedbackById({
          id: this.$route.params.id
        })
        this.comments = response.data.comments
      },
    async deleteC(idComment){
    console.log(idComment)

  const response = await FeedbacksService.deleteComment(idComment,this.$route.params.id);
    this.getComments()

      }
    }
  }

</script>
<style>

</style>
