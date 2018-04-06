import Api from '@/services/Api'

export default {
  fetchFeedbacks () {
    return Api().get('getAllFeedbacks')
  },

  addFeedback (params) {
    return Api().post('addFeedback', params)
  },

  updateFeedbackById (params) {
    return Api().put('feedback/' + params.id, params)
  },

  getFeedbackById (params) {
    return Api().get('feedback/' + params.id)
  },

  deleteFeedbackById (id) {
    return Api().delete('feedback/' + id)
  },
  addCommentToFeedback (id, params) {
    return Api().put('/feedback/' + id + '/addComment', params)
  }
}
