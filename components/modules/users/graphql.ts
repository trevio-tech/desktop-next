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
    full_name
  }
  interests {
    id
    name
  }
  selectedPlaces {
    id
    full_name
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