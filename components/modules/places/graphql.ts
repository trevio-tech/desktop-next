export const PLACE_WITH_PARENTS_FIELDS = `
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
`