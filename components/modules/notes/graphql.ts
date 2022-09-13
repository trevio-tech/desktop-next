export const NOTE_CARD = `
  id
  title
  text(words: 10)
  likes_count
  can
  tags {
    id
    name
  }
`

export const NOTES = `
  notes {
    ${NOTE_CARD}
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