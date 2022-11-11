export const QUESTION_CARD = `
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

export const QUESTION_FIELDS = `
    id
    place_id
    title
    text
    can
    images {
        id
        url
    }
`

export const QUESTION_FORM = `
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

export const CREATE_QUESTION = `
  mutation ($input: QuestionInput!) {
    questionForm: createQuestion(input: $input)
  }
`

export const UPDATE_QUESTION = `
  mutation ($id: Int!, $input: QuestionInput!) {
    questionForm: updateQuestion(id: $id, input: $input)
  }
`

export const DELETE_QUESTION = `
  mutation ($id: Int!) {
    deleteContent: deleteQuestion(id: $id)
  }
`