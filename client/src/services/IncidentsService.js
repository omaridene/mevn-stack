import Api from '@/services/Api'

export default {
  fetchAll() {
    return Api().get('incidents/getAllIncidents')
  },
  addIncident (params) {
    return Api().post('incidents/addIncident', params)
  },
  getIncidentDetails (params) {
    return Api().get('incidents/incident/' + params.id)
  }
  
}

