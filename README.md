# The Simplificator blog

Production URL: <https://blog.simplificator.com>

## Provisioning and deployment

The blog is hosted on [ZEIT](https://zeit.co), which automatically deploys on every push. ZEIT also renews TLS certificates on its own.

The latest commit on the `master` branch is deployed to production (`blog.simplificator.com`).

Commits to other branches are also deployed, but each deployment has its own URL. Look at the environments and status checks assigned to your pull requests.

## Development setup

```
npm install
npm run serve
```

The blog is powered by [Eleventy](https://www.11ty.dev).

Please open pull requests for new blogs or features.

## Guidelines for a new blog post

### File name

The articles are Markdown files stored in `content/posts/`.

The name of the file is used in the article permalink:

- use dashes instead of spaces
- use lower case US ASCII characters (a-z) and numbers (0-9)

Example file name: `encoding-hell-part-2.md`.

### Article metadata

Even though the articles are in the Markdown format, they should contain a YAML front matter. That is a collection of keys and values describing metadata about the article.

For example:

```
---
title: "User story mapping: a retrospective"
date: 2017-03-30
language: en
author: Jane Appleseed
summary: We have been consistently making user story maps for the last 6 months. This is what we've learned.
---
```

The front matter should have these fields:

- `title`: the blog post title, preferably surrounded by quotes.
- `date`: the publication date in `YYYY-MM-DD` format. This is used in the permalink.
- `language`: `en` or `de`. This is used to tell the browser and search engines which language is used, so that they don't need to guess.
- `author`: your name :)
- `summary`: a summary/abstract/teaser of the article. This can be displayed in search results or previews on social media.

### Images

Images are stored in `content/images/`. Please resize the images to a reasonable size and optimize them with a tool like [ImageOptim](https://imageoptim.com/) or [Guetzli](https://github.com/google/guetzli).

You can include an image in a post using this format (Markdown): `![Alt Text](url)`. The alternative text is mandatory, as we want our content to be accessible to people who are using assistive technologies or who have disabled images. Use a URL relative to the root path. This means it should start with `/images/`.

Example image:

```markdown
![Early Sitincator wireframes](/images/sitincator-wireframes.png)
```

You have to use HTML if you want to include a caption for everyone:

```html
<figure>
  <img src="/images/first_website.png" alt="Screenshot of the first Simplificator website">
  <figcaption>Our website in 2007</figcaption>
</figure>
```

