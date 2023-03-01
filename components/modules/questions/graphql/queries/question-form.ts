import {PLACE_WITH_PARENTS_FIELDS} from '~/components/modules/places/graphql';

export default `
  id
  place_id
  travel_id
  title
  text(raw: true)
  is_draft
  tags {
    id
    name
  }
  place {
    ${PLACE_WITH_PARENTS_FIELDS}
  }
`