import { PLACE_WITH_PARENTS_FIELDS } from '~/components/modules/places/graphql'
import { LINK } from '~/components/modules/links/graphql'

export const USER = `
  id
  place_id
  name
  avatar
  banner
  description
  birthday(format: "d.m.Y")
  gender
  subscribers_count
  subscriptions_count
  travels_count
  created_at(format: "relative")
  place {
    ${PLACE_WITH_PARENTS_FIELDS}
  }
  links {
    ${LINK}
  }
`

export const NESTED_USER_CONTENT = `
    ...on Travel {
      id
      title(words: 7)
      text(words: 10)
      cover {
        id
        url(presets: "default@resize:fill:200:200")
      }
      system_name
    }
    ...on Note {
      id
      cover_id
      title(words: 7)
      text(words: 10)
      cover {
        id
        url(presets: "default@resize:fill:200:200")
      }
      system_name
    }
    ...on Review {
      id
      title
      cover_id
      cover {
        id
        url(presets: "default@resize:fill:200:200")
      }
      system_name
    }
    ...on Question {
      id
      title
      cover_id
      cover {
        id
        url(presets: "default@resize:fill:200:200")
      }
      system_name
    }
    ...on Album {
      id
      title
      cover_id
      cover {
        id
        url(presets: "default@resize:fill:200:200")
      }
      system_name
    }
`
export const UPDATE_USER = `
  mutation updateUser ($id: ID!, $input: UserInput!) {
    updateUser(id: $id, input: $input)
  }
`
export const UPDATE_PASSWORD = `
  mutation updatePassword($input: UpdatePasswordInput!) {
    updatePassword(input: $input)
  }
`