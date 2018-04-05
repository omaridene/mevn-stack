import Api from '@/services/Api'

export default {
  fetchIncidents () {
    return Api().get('incidents/getAllIncidents')
  },
  getInidents () {
    return Api().get('incident')
  },
  getNearestInidents () {
    return Api().get('incident/current')
  },
  getIncidentById (params) {
    return Api().get('incident/current/' + params.id)
  }
}
