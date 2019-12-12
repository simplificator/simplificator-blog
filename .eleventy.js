const CleanCSS = require("clean-css")

module.exports = (config) => {
  config.addPassthroughCopy("content/images")

  config.addShortcode('embeddedStyle', (path) => {
    let completePath = `content/_includes/${path}`
    return new CleanCSS({}).minify([completePath]).styles
  })

  return {
    dir: {
      input: "content",
    }
  }
}
