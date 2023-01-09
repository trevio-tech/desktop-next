export const QUESTION_CARD = `
  id
  title
  user_id
  place_id
  travel_id
  cover_id
  text(words: 20)
  published_at(format: "d.m.Y")
  likes_count
  system_name
  created_at
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