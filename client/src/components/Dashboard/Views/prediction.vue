<template>
  <div class="content">
    <div class="row" style="display: block">
 <button @click="valid=!valid">show pridection</button>
      <div class="col-md-8">
        <chart-card :chart-data="lineChart.data"
                    :chart-options="lineChart.options"
                    :responsive-options="lineChart.responsiveOptions" v-if="valid===true">
          <template slot="header">
            <h4 class="card-title">Users Behavior</h4>
            <p class="card-category">24 Hours performance</p>
          </template>
          <template slot="footer">
            <div class="legend">
              <i class="fa fa-circle text-info"></i> braquage
              <i class="fa fa-circle text-danger"></i> accident
              <i class="fa fa-circle text-warning"></i> Crime
            </div>
            <hr>
            <div class="stats">
              <i class="fa fa-history"></i> Updated 3 minutes ago
            </div>
          </template>
        </chart-card>
      </div>
      <div>
        <select name="mounth" id="mounth" v-model="mounth" @click="onloade">
          <option value="0">JAN</option>
          <option value="1">FEV</option>
          <option value="2">MAR</option>
          <option value="3">AVR</option>
          <option value="4">MAY</option>
          <option value="5">JUI</option>
          <option value="6">JUILLY</option>
          <option value="7">AUGUST</option>
          <option value="8">SEP</option>
          <option value="9">OCT</option>
          <option value="10">NOV</option>
          <option value="11">DEC</option>

        </select>
      </div>
    <div class="container-fluid">
      <card>
        <template slot="header">
          <h4 class="card-title">Notifications</h4>
          <p class="card-category">Handcrafted by our friend <a target="_blank" href="https://github.com/cristijora">Cristi Jora</a>. Please checkout the <a
            href="https://github.com/cristijora/vue-notifyjs" target="_blank">full documentation.</a></p>

        </template>
        <div class="row">
          <div class="col-md-6">
            <h5>Notifications Style</h5>
            <div class="alert alert-info">
              <span>This is a plain notification</span>
            </div>
            <div class="alert alert-info">
              <button type="button" aria-hidden="true" class="close">×</button>
              <span>This is a notification with close button.</span>
            </div>
            <div class="alert alert-info alert-with-icon" data-notify="container">
              <button type="button" aria-hidden="true" class="close">×</button>
              <span data-notify="icon" class="nc-icon nc-app"></span>
              <span data-notify="message">This is a notification with close button and icon.</span>
            </div>
            <div class="alert alert-info alert-with-icon" data-notify="container">
              <button type="button" aria-hidden="true" class="close">×</button>
              <span data-notify="icon" class="nc-icon nc-app"></span>
              <span data-notify="message">This is a notification with close button and icon and have many lines. You can see that the icon and the close button are always vertically aligned. This is a beautiful notification. So you don't have to worry about the style.</span>
            </div>
          </div>
          <div class="col-md-6">
            <h5>Notification states</h5>
            <div class="alert alert-info">
              <button type="button" aria-hidden="true" class="close">×</button>
              <span><b> Info - </b> This is a regular notification made with ".alert-info"</span>
            </div>
            <div class="alert alert-success">
              <button type="button" aria-hidden="true" class="close">×</button>
              <span><b> Success - </b> This is a regular notification made with ".alert-success"</span>
            </div>
            <div class="alert alert-warning">
              <button type="button" aria-hidden="true" class="close">×</button>
              <span><b> Warning - </b> This is a regular notification made with ".alert-warning"</span>
            </div>
            <div class="alert alert-danger">
              <button type="button" aria-hidden="true" class="close">×</button>
              <span><b> Danger - </b> This is a     {{braquage}}
</span>
            </div>
          </div>
        </div>
        <br>
        <br>
        <div class="places-buttons">
          <div class="row justify-content-center">
            <div class="col-6 text-center">
              <h5>Notifications Places
                <p class="category">Click to view notifications</p>
              </h5>
            </div>
          </div>
          <div class="row justify-content-center">
            <div class="col-md-3 col-md-offset-1">
              <button class="btn btn-default btn-block" @click="notifyVue('top', 'left')">Top Left</button>
            </div>
            <div class="col-md-3">
              <button class="btn btn-default btn-block" @click="notifyVue('top', 'center')">Top Center</button>
            </div>
            <div class="col-md-3">
              <button class="btn btn-default btn-block" @click="notifyVue('top', 'right')">Top Right</button>
            </div>
          </div>
          <div class="row justify-content-center">
            <div class="col-md-3 col-md-offset-1">
              <button class="btn btn-default btn-block" @click="notifyVue('bottom', 'left')">Bottom Left</button>
            </div>
            <div class="col-md-3">
              <button class="btn btn-default btn-block" @click="notifyVue('bottom', 'center')">Bottom Center</button>
            </div>
            <div class="col-md-3">
              <button class="btn btn-default btn-block" @click="notifyVue('bottom', 'right')">Bottom Right</button>
            </div>

          </div>
        </div>
      </card>




      </div>
    </div>
  </div>
</template>
<script>
  import Card from 'src/components/UIComponents/Cards/Card.vue'
  import IncidentsService from "../../../services/IncidentsService"
  import StatsCard from 'src/components/UIComponents/Cards/StatsCard.vue'
  import ChartCard from 'src/components/UIComponents/Cards/ChartCard.vue'
  export default {
    components: {
      Card  ,
      ChartCard,
      StatsCard
    },
    data () {
      return {
        alerts : [],
        valid : false,
        mounth : 0,
        lineChart: {
          data: {
            labels: ['9:00AM', '12:00AM', '3:00PM', '6:00PM', '9:00PM', '12:00PM', '3:00AM', '6:00AM'],
            series: [
              [287, 385, 490, 492, 554, 586, 698, 695],
              [67, 152, 143, 240, 287, 335, 435, 437],
              [23, 113, 67, 108, 190, 239, 307, 308]
            ]
          },
          options: {
            low: 0,
            high: 20,
            showArea: false,
            height: '245px',
            axisX: {
              showGrid: false
            },
            lineSmooth: true,
            showLine: true,
            showPoint: true,
            fullWidth: true,
            chartPadding: {
              right: 50
            }
          },
          responsiveOptions: [
            ['screen and (max-width: 640px)', {
              axisX: {
                labelInterpolationFnc (value) {
                  return value[0]
                }
              }
            }]
          ]
        },
        braquage : 'azer',
        type: ['', 'info', 'success', 'warning', 'danger'],
        notifications: {
          topCenter: false
        }
      }
    },
    mounted(){
      this.onloade()
    },
    methods: {
      notifyVue (verticalAlign, horizontalAlign) {
        const notification = {
          template: `<span>Welcome to <b>Light Bootstrap Dashboard</b> - a beautiful freebie for every web developer.</span>`
        }

        const color = Math.floor((Math.random() * 4) + 1)
        this.$notifications.notify(
          {
            component: notification,
            icon: 'nc-icon nc-app',
            horizontalAlign: horizontalAlign,
            verticalAlign: verticalAlign,
            type: this.type[color]
          })
      },

      async onloade(){
        const response = await IncidentsService.getalertsbydelegation(this.$route.params.id)
        this.alerts = response.data
        for (var i= 0 ; i<30 ; i++){
        console.log(  this.alerts.filter((a)=>new Date(a.Date).getDay()===i && a.type==="braquage").length)

if (this.alerts.filter((a)=>new Date(a.Date).getDay()===i && a.type==="braquage" && new Date(a.Date).getMonth()===0 ).length >5) {
  this.braquage =this.braquage+"\n danger day " + i+1 + " mounth 1  \n"
}
        }
        this.lineChart.data.series=[
          [
            this.alerts.filter((a)=>new Date(a.Date).getHours()>9 && a.type==="braquage"&& new Date(a.Date).getHours()<12 && new Date(a.Date).getMonth() ===this.mounth ).length,
            this.alerts.filter((a)=>new Date(a.Date).getHours()>12 && a.type==="braquage"&& new Date(a.Date).getHours()<15&& new Date(a.Date).getMonth() ===this.mounth).length,
            this.alerts.filter((a)=>new Date(a.Date).getHours()>15 && a.type==="braquage"&& new Date(a.Date).getHours()<18&& new Date(a.Date).getMonth() ===this.mounth).length,
            this.alerts.filter((a)=>new Date(a.Date).getHours()>18 && a.type==="braquage"&& new Date(a.Date).getHours()<21&& new Date(a.Date).getMonth() ===this.mounth).length,
            this.alerts.filter((a)=>new Date(a.Date).getHours()>21 && a.type==="braquage"&& new Date(a.Date).getHours()<24&& new Date(a.Date).getMonth() ===this.mounth).length,
            this.alerts.filter((a)=>new Date(a.Date).getHours()>0 && a.type==="braquage"&& new Date(a.Date).getHours()<3&& new Date(a.Date).getMonth() ===this.mounth).length,
            this.alerts.filter((a)=>new Date(a.Date).getHours()>3 && a.type==="braquage"&& new Date(a.Date).getHours()<6&& new Date(a.Date).getMonth() ===this.mounth).length,
            this.alerts.filter((a)=>new Date(a.Date).getHours()>6 && a.type==="braquage"&& new Date(a.Date).getHours()<9&& new Date(a.Date).getMonth() ===this.mounth).length

          ],[
            this.alerts.filter((a)=>new Date(a.Date).getHours()>9 && a.type==="accident"&& new Date(a.Date).getHours()<12&& new Date(a.Date).getMonth() ===this.mounth).length,
            this.alerts.filter((a)=>new Date(a.Date).getHours()>12 && a.type==="accident"&& new Date(a.Date).getHours()<15&& new Date(a.Date).getMonth() ===this.mounth).length,
            this.alerts.filter((a)=>new Date(a.Date).getHours()>15 && a.type==="accident"&& new Date(a.Date).getHours()<18&& new Date(a.Date).getMonth() ===this.mounth).length,
            this.alerts.filter((a)=>new Date(a.Date).getHours()>18 && a.type==="accident"&& new Date(a.Date).getHours()<21&& new Date(a.Date).getMonth() ===this.mounth).length,
            this.alerts.filter((a)=>new Date(a.Date).getHours()>21 && a.type==="accident"&& new Date(a.Date).getHours()<24&& new Date(a.Date).getMonth() ===this.mounth).length,
            this.alerts.filter((a)=>new Date(a.Date).getHours()>0 && a.type==="accident"&& new Date(a.Date).getHours()<3&& new Date(a.Date).getMonth() ===this.mounth).length,
            this.alerts.filter((a)=>new Date(a.Date).getHours()>3 && a.type==="accident"&& new Date(a.Date).getHours()<6&& new Date(a.Date).getMonth() ===this.mounth).length,
            this.alerts.filter((a)=>new Date(a.Date).getHours()>6 && a.type==="accident"&& new Date(a.Date).getHours()<9&& new Date(a.Date).getMonth() ===this.mounth).length

          ],[
            this.alerts.filter((a)=>new Date(a.Date).getHours()>9 && a.type==="crime"&& new Date(a.Date).getHours()<12).length,
            this.alerts.filter((a)=>new Date(a.Date).getHours()>12 && a.type==="crime"&& new Date(a.Date).getHours()<15).length,
            this.alerts.filter((a)=>new Date(a.Date).getHours()>15 && a.type==="crime"&& new Date(a.Date).getHours()<18).length,
            this.alerts.filter((a)=>new Date(a.Date).getHours()>18 && a.type==="crime"&& new Date(a.Date).getHours()<21).length,
            this.alerts.filter((a)=>new Date(a.Date).getHours()>21 && a.type==="crime"&& new Date(a.Date).getHours()<24).length,
            this.alerts.filter((a)=>new Date(a.Date).getHours()>0 && a.type==="crime"&& new Date(a.Date).getHours()<3).length,
            this.alerts.filter((a)=>new Date(a.Date).getHours()>3 && a.type==="crime"&& new Date(a.Date).getHours()<6).length,
            this.alerts.filter((a)=>new Date(a.Date).getHours()>6 && a.type==="crime"&& new Date(a.Date).getHours()<9).length
          ]]



      }
    }
  }

</script>
<style lang="scss">

</style>
