export const NOTES = `
  notes {
    id
    title
    text
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