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
  published_at(format: "d.m.Y")
  can
  cover {
    id
    url(presets: "default@resize:fill:560:320")
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
  bookmarks {
    category_id
  }
`

export const NOTE_CARD_RECTANGLE = `
  id
  user_id
  cover_id
  title
  text(words: 12)
  system_name
  published_at(format: "d.m.Y")
  cover(sizes: "default@resize:fill:160:160") {
    id
    model_id
    url
    sizes
  }
  user {
    id
    name
    avatar
  }
  bookmarks {
    category_id
  }
`

export const NOTE = `
  note(id: $id) {
    id
    user_id
    place_id
    title
    text
    can
    system_name
    images {
        id
        url
    }
    tags {
      id
      name
    }
    bookmarks {
      user_id
      model_id
      model_type
      category_id
    }
    user {
      id
      name
      avatar
      description
    }
  }
`

export const NOTE_FORM = `
  id
  place_id
  travel_id
  cover_id
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
  mutation ($id: ID!, $input: NoteInput!) {
    noteForm: updateNote(id: $id, input: $input)
  }
`

export const DELETE_NOTE = `
  mutation ($id: ID!) {
    deleteContent: deleteNote(id: $id)
  }
`