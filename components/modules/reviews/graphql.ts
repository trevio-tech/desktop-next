export const REVIEW_CARD = `
  id
  user_id
  title
  text(words: 12)
  likes_count
  can
  system_name
  published_at
  cover(sizes: "default@resize:fill:640:320") {
    id
    model_id
    url
    sizes
  }
  tags {
    id
    name
  }
  user {
    id
    name
    avatar
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