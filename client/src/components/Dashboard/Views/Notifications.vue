
<template>
    <div class="incidents">
      <h1 class="table-wrap">List of reported incidents </h1>
      <div v-if="incidents.length  > 0" class="table-wrap">
        <div>
          <router-link v-bind:to="{ name: 'New Incident' }" class="">Report</router-link>
        </div>
        <table>
          <tr>
            <td width="350">Title</td>
            <td width="350">Description</td>
            <td width="350">Type</td>
            <td width="350">Date</td>
          </tr>
          <tr v-for="i in incidents">
            <td>{{i.title}} </td>
            <td>{{i.description}}</td>
            <td>{{i.type}}</td>
            <td>{{i.date}}</td>
          </tr>
        </table>
      </div>
      <div class="table-wrap" v-else>
        There is no reported incident <br /><br />
        <router-link v-bind:to="{ name: 'New Incident' }" class="add_post_link">Report incident</router-link>
      </div>
    </div>
  </template>
  
 <script>
    import IncidentsService from '@/services/IncidentsService'
    export default {
      name: 'incidents',
      data () {
        return {
          incidents: []
        }
      },
      mounted () {
        this.getIncidents()
      },
      methods: {
        async getIncidents () {
          const response = await IncidentsService.fetchAll()
          this.incidents = response.data
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
  