---
title: A subtle change in PDF output
date: 2021-07-05
language: en
author: Dimiter Petrov
summary: How a fallback font was breaking an integration test
---

## The problem

I had dockerized a Rails application, but a test was failing when run within the Docker container. The relevant code is:

```ruby
pdf_string = PdfGenerator.new(input).generate
pdf_pages = parse_pdf(pdf_string)

expect(pdf_pages[2]).to include(
  'A rather long line from the PDF that was in the original test, ' \
  'but which I have substituted for the purposes of this example'
)
```

It renders a PDF, then parses it with [pdf-reader](https://github.com/yob/pdf-reader) and asserts that some text is on page 3 of the document.

The expectation failed, but the diff showed that the text *was* on the page. However it was on two lines instead of one.

Sure, one could put a line break in the test and call it a day:

```ruby
expect(pdf_pages[2]).to include(
  "A rather long line from the PDF that was in the original test, " \
  "but which I have substituted for the purposes of this\nexample" # Note the \n
)
```

I didn't give up so easily.

## The motivation

As an agency, we have our set of practices and documentation about running software. That makes provisioning, monitoring, backups, knowledge sharing, etc. easier. The application in question was an exception. It had been built by someone else and had been in production for years before Simplificator took over development and maintenance. We wanted to move it to our infrastructure eventually, but we had decided to get familiar with the code first.

After a few months of developing new features and fixing bugs, we knew enough to migrate to a new server with more confidence. Running the application in Docker was one step of the process and this is when I ran into the test failure above.

I did not cheat and change the test, because even though it looked like an insignificant detail, it *could* be something more. Whenever you make an infrastructure change you find things that were assumed, but undocumented, things that were done once manually and forgotten. We had written the PDF generation test in the phase when we were getting to know the codebase. Now this test was helping us consistently observe a difference in behaviour between two environments (Docker and no Docker). A rare chance!

## The search

The application generates PDF files using wkthmltopdf. That is, Rails renders an HTML template, then wkhtmltopdf converts the HTML document into a PDF. The problem could be in any of these, so I tried to narrow it down.

First, I checked the page dimensions. A narrower page would have shorter lines. That was not it. wkhtmltopdf saves A4-formatted pages by default. The page margins were also expressed as absolute numbers.

Then I tried to open the PDF generated withing Docker with the PDF viewer on my host. I wanted to get the PDF from the test. The test has everything set up to render the exact document that reproduces the bug. In the application I would have to fill out some forms, which takes much longer. I ran into some [permissions problems](https://github.com/moby/moby/issues/2259) getting the file out of the container. I went down that rabbit hole for longer than expected (as one does).

Frustrated, I tried at least generating the PDF from outside a container and copying it into the container for comparison. I ran the test outside Docker, opened the PDF and knew immediately what the problem was.

## The realization

The font in the PDF I had just built looked slightly different from the font I'd seen in documents generated in production.

I found the CSS rule:

```css
font-family: Helvetica, Arial, sans-serif;
```

The developer who wrote the test was using macOS, so the Helvetica font was present.

The production Linux server had neither Helvetica nor Arial. It did have a different replacement font that was apparently close enough in dimensions:

```
$ fc-match Helvetica
DejaVuSans.ttf: "DejaVu Sans" "Book"
```

The tests had so far been running on the default image provided by the continuous integration service. That image is based on Ubuntu and has many packages pre-installed, so it probably also had a close-enough fallback.

The new Docker image, though, only had the bare minimum needed to run the application. It didn't even have Deja Vu Sans. So it must have been using a different sans serif font, which has wider shapes, making less text fit on a line.

Sure enough, including [Nimbus Sans](https://en.wikipedia.org/wiki/Nimbus_Sans) in the Docker image as a fallback for Helvetica fixed the test.
