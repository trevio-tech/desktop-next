import { PLACE_WITH_PARENTS_FIELDS } from '~/components/modules/places/graphql'

export const ALBUM_CARD = `
  id
  title
  place_id
  user_id
  travel_id
  cover_id
  text(words: 20)
  likes_count
  system_name
  can
  published_at
  bookmarks {
    category_id
  }
  cover {
    id
    url(presets: "default@resize:fill:560:320")
  }
  like {
    is_liked
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
  user {
    id
    name
    avatar
  }
`

export const ALBUM_CARD_RECTANGLE = `
  id
  user_id
  cover_id
  title
  text(words: 12)
  system_name
  created_at
  cover {
    id
    url(presets: "default@resize:fill:640:320")
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

export const ALBUM = `
  id
  user_id
  place_id
  travel_id
  title
  text
  is_draft
  image_order
  travel {
    id
    title
  }
  images {
    id
    url(presets: "default@resize:fill:126:126")
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
  place {
    ${PLACE_WITH_PARENTS_FIELDS}
  }
`

export const ALBUM_FORM = `
  id
  place_id
  travel_id
  title
  text
  is_draft
  image_order
  images {
    id
    url(presets: "default@resize:fill:126:126")
  }
  tags {
    id
    name
  }
  place {
    ${PLACE_WITH_PARENTS_FIELDS}
  }
`

export const CREATE_ALBUM = `
  mutation ($input: AlbumInput!) {
    albumForm: createAlbum(input: $input)
  }
`

export const UPDATE_ALBUM = `
  mutation ($id: ID!, $input: AlbumInput!) {
    albumForm: updateAlbum(id: $id, input: $input)
  }
`

export const DELETE_ALBUM = `
  mutation ($id: Int!) {
    deleteContent: deleteAlbum(id: $id)
  }
`