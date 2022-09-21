import {NOTE_CARD} from '~/components/modules/notes/graphql'
import {REVIEW_CARD} from '~/components/modules/reviews/graphql'
import {TRAVEL_CARD} from '~/components/modules/travels/graphql'

export const TIMELINE = `
    ... on Note {
        ${NOTE_CARD}
        system_name
        created_at
      }
      ... on Review {
        ${REVIEW_CARD}
        system_name
        created_at
      }
      ... on Travel {
        ${TRAVEL_CARD}
        system_name
        created_at
      }
`

export const FEED = `
    page
    items {
      ... on Note {
        ${NOTE_CARD}
        system_name
        created_at
        whoShared {
          id
          name
        }
      }
      ... on Review {
        ${REVIEW_CARD}
        system_name
        created_at
        whoShared {
          id
          name
        }
      }
      ... on Travel {
        ${TRAVEL_CARD}
        system_name
        created_at
        whoShared {
          id
          name
        }
      }
    }
`