export const NOTE_CARD = `
  id
  title
  user_id
  place_id
  travel_id
  cover_id
  text(words: 20)
  likes_count
  system_name
  messages_count
  can
  cover {
    id
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
  user {
    id
    name
    avatar
  }
  tags {
    id
    name
  }
  like {
    is_liked
  }
`

export const NOTE = `
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
    tags {
      id
      name
    }
  }
`

export const NOTE_FORM = `
  id
  place_id
  travel_id
  title
  text(raw: true)
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

export const CREATE_NOTE = `
  mutation ($input: NoteInput!) {
    noteForm: createNote(input: $input)
  }
`

export const UPDATE_NOTE = `
  mutation ($id: Int!, $input: NoteInput!) {
    noteForm: updateNote(id: $id, input: $input)
  }
`

export const DELETE_NOTE = `
  mutation ($id: Int!) {
    deleteContent: deleteNote(id: $id)
  }
`