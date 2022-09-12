export const NOTES = `
  notes {
    id
    title
    text(words: 10)
    likes_count
    can
    tags {
      id
      name
    }
  }
`

export const NOTE = `
  note(id: $id) {
    id
    title
    text
    can
  }
`