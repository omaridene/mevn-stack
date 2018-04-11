<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12 ">
          <card>
            <h4 slot="header" class="card-title">Login</h4>
            <form id="loginform" @submit.prevent="onSubmit">


              <div class="row">
                <div class="col-md-6">
                  <fg-input
                    label="Email"
                    placeholder="Email"
                    type="email" id="email"
                    v-model="email">
                  </fg-input>
                </div>
                <div class="col-md-6">
                  <fg-input  type="password" id="password"
                             label="Password"
                             placeholder="Password"
                             v-model="password">
                  </fg-input>
                </div>
              </div>






              <div class="text-center">
                <button type="submit" class="btn btn-info btn-fill float-right">
                  Login
                </button>
              </div>
              <div class="clearfix"></div>
            </form>
          </card>
        </div>

      </div>
    </div>
  </div>
</template>
<script>
  import EditProfileForm from './UserProfile/EditProfileForm.vue'
  import UserCard from './UserProfile/UserCard.vue'
  import Card from 'src/components/UIComponents/Cards/Card.vue'
  import axios from 'axios'


  export default {
    name: 'login',
    components: {
      EditProfileForm,
      UserCard,
      Card
    },

    data () {
      return {
        email: '',
        password: ''
      }
    },
/*    beforeRouteEnter (to, from, next) {
      if (localStorage.getItem('token') !== null) {
        next({ path: '/' })
      } else {
        next()
      }
    },*/
    methods: {
      onSubmit () {
        const formData = {
          Email: this.email,
          password: this.password
        }
        const BASE_URL = 'http://localhost:8001/user/login'

        axios.post(BASE_URL , {
          Email: this.email,
          password: this.password
        })
          .then(response => {
          //console.log(response.data.tokens[response.data.tokens.length - 1].token)
          localStorage.setItem('user', JSON.stringify(response.data))
        // localStorage.setItem('token', response.data.tokens[data.tokens.length - 1].token)
        localStorage.setItem('token',response.data.tokens[response.data.tokens.length - 1].token)
        this.$router.go({
          path: '/feedbacks'
        })
      })
        // .then(data => {
        //   localStorage.setItem('user', JSON.stringify(data))
        //   localStorage.setItem('token', data.tokens[data.tokens.length - 1].token)
        //   console.log(data)
        //    this.$router.push('/')
        // })
      .catch(error => {
          console.log(error)
      })
      }
    }
  }

</script>
<style>

</style>
