import Api from '@/services/Api'

export default {
  fetchIncidents () {
    return Api().get('incidents/getAllIncidents')
  },
  getInidents () {
    return Api().get('incident')
  }
}
