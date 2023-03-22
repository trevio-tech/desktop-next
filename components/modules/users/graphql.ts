export const USER = `
  id
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
    id
    parent_id
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
  interests {
    id
    name
  }
  selectedPlaces {
    id
    parent_id
    name
    full_name
    parent_names
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
  friends {
    id
    name
    avatar
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
export const UPDATE_USER_PASSWORD = `
  mutation updateUserPassword ($password_old: String!, $password: String!, $password_confirmation: String!) {
    updateUserPassword(password_old: $password_old, password: $password, password_confirmation: $password_confirmation)
  }
`