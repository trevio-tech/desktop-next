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
  travels_count,
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
  links {
    id
    name
    url
    title
    host
  }
  premium {
    user_id
    color
  }
`