import { computed } from 'vue'

export default (props) => {
  const { id, system_name } = props.entry

  const to = computed(() => {
    if (system_name === 'notes') {
      return {name: 'notes.show', params: {noteId: id}}
    } else if (system_name === 'travels') {
      return {name: 'travels.show', params: {travelId: id}}
    } else if (system_name === 'albums') {
      return {name: 'albums.show', params: {albumId: id}}
    } else if (system_name === 'reviews') {
      return {name: 'reviews.show', params: {reviewId: id}}
    } else if (system_name === 'questions') {
      return {name: 'questions.show', params: {questionId: id}}
    }
  })

  const label = {
    notes: 'Заметка',
    posts: 'Блог компании',
    questions: 'Вопрос',
    reviews: 'Отзыв',
    travels: 'Путешествие',
    albums: 'Фотоальбом'
  }

  return {
    label: label[system_name],
    to
  }
}
