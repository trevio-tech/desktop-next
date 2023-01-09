import {NOTE_CARD} from '~/components/modules/notes/graphql'
import {REVIEW_CARD} from '~/components/modules/reviews/graphql'
import {TRAVEL_CARD} from '~/components/modules/travels/graphql'
import {ALBUM_CARD} from '~/components/modules/albums/graphql'
import {QUESTION_CARD} from '~/components/modules/questions/graphql'

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
    ... on Question {
        ${QUESTION_CARD}
        system_name
        created_at
    }
`

export const FEED = `
      ...on Note {
        ${NOTE_CARD}
        system_name
        rating1
        created_at
        whoShared {
          id
          name
        }
      }
      ...on Review {
        ${REVIEW_CARD}
        system_name
        created_at
        whoShared {
          id
          name
        }
      }
      ...on Travel {
        ${TRAVEL_CARD}
        system_name
        created_at
        whoShared {
          id
          name
        }
      }
      ...on Album {
        ${ALBUM_CARD}
        system_name
        created_at
        rating1
        whoShared {
          id
          name
        }
      }
      ... on Question {
        ${QUESTION_CARD}
        system_name
        created_at
    }
`