# The Simplificator blog

Production URL: <https://blog.simplificator.com>

## Provisioning and deployment

The blog is hosted on [ZEIT](https://zeit.co), which automatically deploys on every push. ZEIT also renews TLS certificates on its own.

The latest commit on the `master` branch is deployed to production (`blog.simplificator.com`).

Commits to other branches are also deployed, but each deployment has its own URL. Look at the environments and status checks assigned to your pull requests.

## Development/writing workflow

```
npm install
npm run serve
```

The blog is powered by [Eleventy](https://www.11ty.dev).

The articles are written as Markdown in `content/posts/`. Images are in `content/images`.

Please open pull requests for new blog posts and feature development.
