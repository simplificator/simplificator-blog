module.exports = (config) => {
  config.addPassthroughCopy("content/images")

  return {
    dir: {
      input: "content",
    }
  }
}
