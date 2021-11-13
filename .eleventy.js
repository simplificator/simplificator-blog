const CleanCSS = require("clean-css")
const path = require("path")
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight')
const Image = require('@11ty/eleventy-img')

function extension(filepath) {
  const extensionWithDot = path.extname(filepath)
  return extensionWithDot.substring(extensionWithDot.indexOf(".") + 1)
}

function normalizedExtension(extension) {
  return extension == 'jpg' ? 'jpeg' : extension;
}

module.exports = (config) => {
  config.addPassthroughCopy("content/images")

  config.addCollection("posts", (collectionApi) => {
    return collectionApi.getFilteredByGlob(["content/posts/*.md"])
  })

  config.addShortcode('embeddedStyle', (path) => {
    let completePath = `content/_includes/${path}`
    return new CleanCSS({}).minify([completePath]).styles
  })

  config.addPlugin(syntaxHighlight)

  config.addShortcode("image", async function(src, alt) {
    if(alt === undefined) {
      throw new Error(`Missing \`alt\` on image from: ${src}`);
    }

    const outputFormat = normalizedExtension(extension(src) || "jpeg")

    const stats = await Image(src, {
      widths: [400, 850, 1200],
      formats: [outputFormat],
      urlPath: "/images/",
      outputDir: "./_site/images/",
    })
    const fallbackSrc = stats[outputFormat][stats[outputFormat].length > 1 ? 1 : 0]
    const sizes = "(max-width: 1200px) 100vw, 1200px"

    return `<img
          srcset="${stats[outputFormat].map(entry => `${entry.url} ${entry.width}w`).join(", ")}"
          src="${fallbackSrc.url}"
          sizes="${sizes}"
          width="${fallbackSrc.width}"
          height="${fallbackSrc.height}"
          alt="${alt}"
          loading="lazy">`
  });

  return {
    dir: {
      input: "content",
    }
  }
}
