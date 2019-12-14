class SearchIndex {
  data() {
    return {
      permalink: "/posts.json"
    }
  }

  render(data) {
    // TODO: build a lunr index
    const index = data.collections.post.map(post => {
      return {
        title: post.data.title,
        url: post.url,
        content: post.templateContent
      }
    })

    return JSON.stringify(index)
  }
}

module.exports = SearchIndex
