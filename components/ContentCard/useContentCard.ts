import { computed } from 'vue'

export default (props) => {
  const to = computed(() => {
    const { id, system_name } = props.entry

    if (system_name === 'notes') {
      return {name: 'notes.show', params: {noteId: id}}
    } else if (system_name === 'travels') {
      return {name: 'travels.show', params: {travelId: id}}
    } else if (system_name === 'albums') {
      return {name: 'albums.show', params: {albumId: id}}
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
    label,
    to
  }
}
