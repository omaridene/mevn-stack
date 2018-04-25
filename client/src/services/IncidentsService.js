import Api from '@/services/Api'

export default {
  fetchIncidents () {
    return Api().get('incidents/getAllIncidents')
  },
  getalerts () {
    return Api().get('alerts/')
  },
  getgouvernerat () {
    return Api().get('alerts/Gouvernerat')
  },
  getdelegation (params) {
    return Api().get('alerts/delegation/' + params)
  },
  getalertsbydelegation (params) {
    return Api().get('alerts/alerts/' + params)
  },
  fetchIncidentByTitle (title) {
    return Api().get('incidents/getIncidentByTitle/'+title)
  }

}
