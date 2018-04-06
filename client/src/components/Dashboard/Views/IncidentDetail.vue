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
                              <p class="card-text"><strong>Date of report: </strong>{{date}}
                                </p>
                              <p class="card-text"><strong>Description: </strong> {{description}}.</p>
                              <p class="card-text"><strong>Type: </strong> {{type}}.</p>

                             
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
            }
          }
        }
      
      </script>
      
      