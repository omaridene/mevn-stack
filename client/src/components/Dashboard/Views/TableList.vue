<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-2">
          <table class="table border">

            <tr v-for="alert in alerts">
              <td><button type="button" aria-hidden="true" class="close"@click="showdelegation(alert)">{{alert}}  </button>
              </td></tr>
          </table>
        </div>
        <div class="col-md-3">
          <table class="table border">

            <tr v-for="delegation in delegations">
         <td><div v-bind:class="{ active: TRUE }"> <button type="button" aria-hidden="true" class="close" @click="showalerts(delegation)" >{{delegation}} </button>
         </div></td>


            </tr>
          </table>
        </div>
        <div class="col-md-5">
          <table class="table border">
            <tr v-if="alertsbydelegation.length > 0" class="table-success"> <td>{{alertsbydelegation.length}}</td>
           </tr>
            <tr v-for="alert in alertsbydelegation">
              <td>{{alert.Title}}  </td></tr>
          </table>
        </div>



      </div>
    </div>
  </div>
</template>
<script>
  import LTable from 'src/components/UIComponents/Table.vue'
  import Card from 'src/components/UIComponents/Cards/Card.vue'
  import IncidentsService from "../../../services/IncidentsService";
  const tableColumns = ['Name']

  var tableData = [{
    id: 1,
    name: 'Dakota Rice',
    salary: '$36.738',
    country: 'Niger',
    city: 'Oud-Turnhout'
  }]
  export default {
    components: {
      LTable,
      Card
    },
    name: 'alerts',

    data () {
      return { alerts : [],
        delegations : [] ,
        alertsbydelegation : []
      }
    },
    mounted () {
     this.getgovernerats()

    },
    methods: {
      async getgovernerats () {
        const response = await IncidentsService.getgouvernerat()
        this.alerts = response.data
        console.log(response.data[0] + 'data')
      },
      async showdelegation(alert){
        const response = await IncidentsService.getdelegation(alert)
        this.delegations = response.data
      },
      async showalerts(delegation){
        const response = await IncidentsService.getalertsbydelegation(delegation)
        this.alertsbydelegation = response.data
      },
    }
  }
</script>
<style>
</style>
