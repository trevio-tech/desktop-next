import { PLACE_WITH_PARENTS_FIELDS } from '~/components/modules/places/graphql'

export const ALBUM_CARD = `
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

export const ALBUM = `
  id
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
  images(sizes: "default@resize:fill:126:126") {
    id
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
    description
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
  images(sizes: "default@resize:fill:126:126") {
    id
    url
    sizes
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
  mutation ($id: Int!, $input: AlbumInput!) {
    albumForm: updateAlbum(id: $id, input: $input)
  }
`

export const DELETE_ALBUM = `
  mutation ($id: Int!) {
    deleteContent: deleteAlbum(id: $id)
  }
`