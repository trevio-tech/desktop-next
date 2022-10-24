export const REVIEW_CARD = `
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

export const REVIEW_FORM = `
  id
  place_id
  travel_id
  title
  text
  is_draft
  stars
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

export const CREATE_REVIEW = `
  mutation ($input: ReviewInput!) {
    reviewForm: createReview(input: $input)
  }
`

export const UPDATE_REVIEW = `
  mutation ($id: ID!, $input: ReviewInput!) {
    reviewForm: updateReview(id: $id, input: $input)
  }
`

export const DELETE_REVIEW = `
  mutation ($id: Int!) {
    deleteContent: deleteReview(id: $id)
  }
`