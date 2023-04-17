import {PLACE_WITH_PARENTS_FIELDS} from '~/components/modules/places/graphql';

export const REVIEW_CARD = `
  id
  user_id
  cover_id
  title
  text(words: 12)
  likes_count
  can
  system_name
  published_at(format: "d.m.Y")
  like {
    is_liked
  }
  cover {
    id
    url(presets: "default@resize:fill:640:320")
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
  bookmarks {
    category_id
  }
`

export const REVIEW_FORM = `
  id
  place_id
  travel_id
  title
  text(raw: true)
  is_draft
  stars
  tags {
    id
    name
  }
  place {
    ${PLACE_WITH_PARENTS_FIELDS}
  }
`

export const REVIEW = /* GraphQL */`
  id
  user_id
  place_id
  system_name
  title
  text
  can
  stars
  user {
    id
    name
    avatar
  }
  tags {
    id
    name
  }
  place {
    ${PLACE_WITH_PARENTS_FIELDS}
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
  mutation ($id: ID!) {
    deleteContent: deleteReview(id: $id)
  }
`