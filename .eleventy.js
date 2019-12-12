const CleanCSS = require("clean-css")
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight')
const lazyImagesPlugin = require('eleventy-plugin-lazyimages');

module.exports = (config) => {
  config.addPassthroughCopy("content/images")

  config.addShortcode('embeddedStyle', (path) => {
    let completePath = `content/_includes/${path}`
    return new CleanCSS({}).minify([completePath]).styles
  })

  config.addPlugin(syntaxHighlight)
  config.addPlugin(lazyImagesPlugin)

  return {
    dir: {
      input: "content",
    }
  }
}
