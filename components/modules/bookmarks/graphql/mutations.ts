export const CREATE_BOOKMARK_CATEGORY = `
mutation createBookmarkCategory($input: BookmarkCategoryInput!) {
  bookmarkCategory: createBookmarkCategory(input: $input) {
    id
    name
    content_count
    is_private
  }
}
`

export const UPDATE_BOOKMARK_CATEGORY = `
mutation updateBookmarkCategory($id: ID!, $input: BookmarkCategoryInput!) {
  bookmarkCategory: updateBookmarkCategory(id: $id, input: $input) {
    id
    name
    content_count
    is_private
  }
}
`