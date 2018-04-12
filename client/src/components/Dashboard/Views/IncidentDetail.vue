<template>
        <div class="content">
          <div class="container-fluid">
            <div class="row">
              <div class="col-12">
                
                <div class="row">
                        <div class="col-sm-6">
                          <div class="card">
                            <div class="card-body">
                                    
                              <h5 class="card-title"><strong>Title: </strong>{{title}}</h5>
                              <p class="card-text"><strong>Date of report: </strong>{{date | moment("dddd, MMMM Do YYYY")}}
                                </p>
                              <p class="card-text"><strong>Description: </strong> {{description}}.</p>
                              <p class="card-text"><strong>Type: </strong> {{type}}.</p>
                              <p class="card-text"><strong>Lat: </strong> {{lat}}.</p>
                              <p class="card-text"><strong>lng: </strong> {{lng}}.</p>

                             
                              <a href="#" class="btn btn-primary">Show on map</a>
                              <a href="#" class="btn btn-primary">Go to rescue</a>
                            </div>
                          </div>
                        </div>
                      </div>
      
              </div>
      
            </div>
          </div>
        </div>
      
      </template>
      <script>
        
        import IncidentsService from '@/services/IncidentsService'

  
        export default {
          
          name: 'Detail',
          data () {
            return {
              title: '',
              description: '',
              date: '',
              type: '',
              lat:'',
              lng:''
        
            }
          },
          mounted () {
            this.getIncident()
              
          },
  
          methods: {
            async getIncident() {
              const response = await IncidentsService.getIncidentDetails({
                id: this.$route.params.id
              })
              this.title = response.data.title
              this.description = response.data.description
              this.date = response.data.date
              this.type=response.data.type
              this.lat=response.data.address.lat
              this.lng=response.data.address.lng
            }
          }
        }
      
      </script>
      
      <style>
        #map {
          min-height: calc(100vh - 123px);
        }
      </style>