---
title: "Getting Started with Hanami and GraphQL"
date: 2016-12-07
language: en
---

## What is GraphQL?

GraphQL is a query language for APIs and a runtime for fulfilling those queries with your existing data. GraphQL provides a complete and understandable description of the data in your API, it gives clients the power to ask for exactly what they need and nothing more, makes it easier to evolve APIs over time, and enables powerful developer tools.

## What is Hanami?

Hanami is a Ruby MVC web framework comprised of many micro-libraries. It has a simple, stable API, a minimal DSL, and prioritises the use of plain objects over magical, over-complicated classes with too much responsibility.

The natural repercussion of using simple objects with clear responsibilities is more boilerplate code. Hanami provides ways to mitigate this extra legwork while maintaining the underlying implementation.

### Project setup

If you haven't already done so, install hanami.

```bash
gem install hanami
```

After hanami is installed on your machine, you can create a new project. Feel free to chose another database or test framework if you like.

```bash
hanami new blogs --database=postgres --application-name=api --test=rspec
cd blogs
```

### Define entities

Before we do anything at all, we need entities we can query over our API. Hanami offers a generator for entities which can be invoked by the following command:

```bash
hanami generate model author
```

This will generate an entity and the corresponding test. In this tutorial tests are omitted for brevity but you are encouraged to implement them on your own.

We start out with our author as it's a very simple model. It has a single attribute 'name'.

```ruby
# lib/blogs/entities/author.rb

class Author
  include Hanami::Entity

  attributes :name
end
```

Next we're going to generate another model. A blog.

```bash
hanami generate model blog
```

For our blog, we want a title, content and an author\_id to reference the author.

```ruby
# lib/blogs/entities/blog.rb

class Blog
  include Hanami::Entity

  attributes :title, :content, :author_id
end
```

### Update database

To be able to store entities, we need to define database tables to hold data. Create a migration for the author model first:

```bash
hanami generate migration create_authors
```

Hanami will generate a migration file with a current timestamp for you under `db/migrations`. Open the file and add the following:

```ruby
Hanami::Model.migration do
  change do
    create_table :authors do
      primary_key :id
      column :name, String, null: false
    end
  end
end
```

For blogs, we create another migration named `create_blog`.

```bash
hanami generate migration create_blogs
```

Inside the migration create another table with columns for our blog:

```ruby
Hanami::Model.migration do
  change do
    create_table :blogs do
      primary_key :id
      column :title, String, null: false
      column :content, String, null: false
      foreign_key :author_id, :authors
    end 
  end
end
```

To get the changes to our database, execute

```bash
hanami db create hanami db migrate
```

In order to be able to run database-backed tests, we need to ensure that the test database uses the same schema as our development database. Update the schema by setting `HANAMI_ENV` to `test` explicitly:

```bash
HANAMI_ENV=test hanami db create
HANAMI_ENV=test hanami db migrate
```

Now that our database is ready, we can go ahead and define mappings for author and blog. Go to `lib/blogs.rb`, find the mapping section and add mappings for the new entities.

```ruby
##
# Database mapping
#
# Intended for specifying application wide mappings.
#
mapping do
  collection :blogs do
    entity Blog
    repository BlogRepository

    attribute :id, Integer
    attribute :title, String
    attribute :content, String
    attribute :author_id, Integer
  end

  collection :authors do
    entity Author
    repository AuthorRepository

    attribute :id, Integer
    attribute :name, String
  end
end
```

### Introducing Types

After having defined our entities, we can now move on to create GraphQL types. First update your Gemfile and add the following line:

```ruby
gem 'graphql'
```

and then run

```bash
bundle install
```

We're going to place type definitions in a dedicated directory to keep them separate from our entities. Furthermore those types are relevant for our web API only and not for the whole application. Create a directory in `apps/api/` named `types`

```bash
mkdir -p apps/api/types
```

and update your web app's `application.rb` file to include type definitions in the load path.

```ruby
load_paths < 'apps/api/types'
```

```ruby
# apps/api/types/query_type.rb

require_relative 'author_type'
require_relative 'blog_type'

QueryType = GraphQL::ObjectType.define do
  name 'Query'
  description 'The query root for this schema'

  field :blog do
    type BlogType
    argument :id, !types.ID
    resolve -> (_, args, _) {
      BlogRepository.find(args[:id])
    }
  end

  field :author do
    type AuthorType
    argument :id, !types.ID
    resolve -> (_, args, _) {
      AuthorRepository.find(args[:id])
    }
  end
end
```

```ruby
# apps/api/types/blog_schema.rb

require_relative 'query_type'

BlogSchema = GraphQL::Schema.define(query: QueryType)
```

Notice the `require_relative` statements at the beginning of some files. This is a workaround because, even though defined in the load path, types don't seem to be auto loaded inside a type definition file.

### ... and Action

Now that the schema definitions and load path are set up correctly, it is time to create the action that will serve query requests. To generate a new action invoke the following command:

```bash
hanami generate action api graphql#show --skip-view
```

Since we're providing the `--skip-view` flag Hanami will not generate a view class and template for this action. The above command will generate a new action where we place query logic.

```ruby
# apps/api/controllers/graphql/show.rb

module Api::Controllers::Graphql
  class Show
    include Api::Action

    def call(params)
      query_variables = params[:vairables] || {}
      self.body = JSON.generate(
        BlogSchema.execute(
          params[:query],
          variables: query_variables
        )
      )
    end
  end
end
```

To let Hanami know that it shouldn't render a view, we set `self.body` directly inside the action.

### Query the API

In order to see the API working, we need data! Fire up your hanami console and create some author and blogs.

```bash
hanami c
```

Now create one or more authors and save it to database via AuthorRepository:

```ruby
author = Author.new(name: 'John Wayne')
AuthorRepository.persist author
```

Do the same for Blogs

```ruby
blog = Blog.new(title: 'first blog', content: 'lorem ipsum dolor sit met', author_id: 1)
BlogRepository.persist blog
```

As soon as we have our data in place, we can use cURL to query our API.

```bash
curl -XGET -d 'query={ blog(id: 1) { title author { name } }}' http://localhost:2300/graphql
```

If all goes well you should see a response looking something like this:

```json
{"data":{"blog":{"title":"first blog","author":{"name":"John Wayne"}}}}
```

Go ahead and play around with the query. If you look at the type definition for `QueryType` you'll notice, that it should be possible to query for authors, too. Can you get the API to list all blog titles for a given author?

That's it. This introduction should give you a glimpse into Hanami and GraphQL. You can find more information in the section below.

## Links and references

- More information about [GraphQL](http://graphql.org)
- The [Hanami](http://hanamirb.org) homepage
- Github repository for [GraphQL-Ruby](https://github.com/rmosolgo/graphql-ruby)
- Marc-André Giroux's [blogpost](http://mgiroux.me/2015/getting-started-with-rails-graphql-relay/) this article is based upon
- [Source code](https://github.com/cedricwider/graphql-hanami-poc) from this article.
