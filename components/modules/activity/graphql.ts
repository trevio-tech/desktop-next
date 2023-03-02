import {NOTE_CARD} from '~/components/modules/notes/graphql'
import {REVIEW_CARD} from '~/components/modules/reviews/graphql'
import {TRAVEL_CARD} from '~/components/modules/travels/graphql'
import {ALBUM_CARD} from '~/components/modules/albums/graphql'
import {QUESTION_CARD} from '~/components/modules/questions/graphql'

export const TIMELINE = `
    ... on Note {
        ${NOTE_CARD}
        system_name
    }
    ... on Review {
        ${REVIEW_CARD}
        system_name
    }
    ... on Travel {
        ${TRAVEL_CARD}
        system_name
    }
    ... on Question {
        ${QUESTION_CARD}
        system_name
    }
`

export const FEED = /* GraphQL */ `
        ...on Note {
            ${NOTE_CARD}
        }
        ...on Review {
            ${REVIEW_CARD}
        }
        ...on Travel {
            ${TRAVEL_CARD}
        }
        ...on Album {
            ${ALBUM_CARD}
        }
        ... on Question {
            ${QUESTION_CARD}
        }
`