export default `
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