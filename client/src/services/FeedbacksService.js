import Api from '@/services/Api'

export default {
  fetchFeedbacks () {
    return Api().get('getAllFeedbacks')
  },
  fetchLastFeedback () {
    return Api().get('getLastFeedback')
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
  },
  deleteComment (idComment, idFeedback) {
    return Api().get('feedback/' + idFeedback + '/deleteComment/' + idComment)
  },
getCommentFromFeedback (idComment, idFeedback) {
  return Api().get('feedback/' + idFeedback + '/getComment/' + idComment)
},
  updateComment (idComment, idFeedback,content) {
    return Api().get('feedback/' + idFeedback + '/updateComment/' + idComment+'/'+content)
  }
}
