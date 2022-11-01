export const ALBUM_CARD = `
  id
  title
  place_id
  travel_id
  cover_id
  text(words: 20)
  likes_count
  can
  cover {
    url
  }
  travel {
    id
    place_id
    title
    place {
      id
      name
    }
  }
  tags {
    id
    name
  }
`

export const ALBUMS = `
  notes {
    ${ALBUM_CARD}
  }
`

export const ALBUM = `
  note(id: $id) {
    id
    place_id
    title
    text
    can
    images {
        id
        url
    }
  }
`

export const ALBUM_FORM = `
  id
  place_id
  travel_id
  title
  text
  is_draft
  tags {
    id
    name
  }
  place {
    id
    parent_id
    name
    full_name
    parent {
        id
        parent_id
        name
        parent {
            id
            parent_id
            name
            parent {
                id
                parent_id
                name
            }
        }
    }
  }
`

export const CREATE_ALBUM = `
  mutation ($input: NoteInput!) {
    noteForm: createNote(input: $input)
  }
`

export const UPDATE_ALBUM = `
  mutation ($id: Int!, $input: NoteInput!) {
    noteForm: updateNote(id: $id, input: $input)
  }
`

export const DELETE_ALBUM = `
  mutation ($id: Int!) {
    deleteContent: deleteNote(id: $id)
  }
`