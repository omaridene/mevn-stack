import Api from '@/services/Api'

export default {
  fetchIncidents () {
    return Api().get('incidents/getAllIncidents')
  },
  getInidents () {
    return Api().get('incident')
  },
  getNearestInidents () {
    return Api().get('incident/nearest')
  },
  getIncidentById (params) {
    return Api().get('incident/current/' + params.id)
  },
  fetchByUser (params) {
    return Api().get('incident/own/' + params.id)
  },
  deleteAlertById (id) {
    return Api().delete('incident/delete/' + id)
  },
}
