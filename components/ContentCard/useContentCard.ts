import {computed, shallowRef} from 'vue'

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

  // Если в ленте добавить в закладки, потом перейти на другую страницу и снова вернуться в ленту,
  // то лента не будет отображать что карточка в закладках, потому что BookmarkButton обновляет локальную модель,
  // состояние карточки в сторе остаеться старое.
  const bookmarks = shallowRef(props.entry.bookmarks?.map((bookmark) => bookmark.category_id))

  return {
    label: label[system_name],
    to,
    bookmarks
  }
}
