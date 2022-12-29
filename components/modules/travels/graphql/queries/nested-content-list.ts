export default `
  query getTravelContentList ($travelId: Int!, $offset: String!, $filter: TravelContentListFilterInput) {
    travelContentList(travelId: $travelId, offset: $offset, filter: $filter) {
      items {
        ...on Note {
          id
          cover_id
          title(words: 7)
          text(words: 10)
          cover(sizes: "default@resize:fill:200:200") {
            id
            model_id
            url
            sizes
          }
          system_name
        }
        ...on Review {
          id
          title
          cover_id
          cover(sizes: "default@resize:fill:200:200") {
            id
            model_id
            url
            sizes
          }
          system_name
        }
        ...on Question {
          id
          title
          cover_id
          cover(sizes: "default@resize:fill:200:200") {
            id
            model_id
            url
            sizes
          }
          system_name
        }
        ...on Album {
          id
          title
          cover_id
          cover(sizes: "default@resize:fill:200:200") {
            id
            model_id
            url
            sizes
          }
          system_name
        }
      }
      offset
    }
  }
`