import Api from '@/services/Api'

export default {
  fetchIncidents () {
    return Api().get('incidents/getAllIncidents')
  },
  fetchIncidentByTitle (title) {
    return Api().get('incidents/getIncidentByTitle/'+title)
  }
}
