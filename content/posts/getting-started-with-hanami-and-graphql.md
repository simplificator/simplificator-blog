---
title: "Getting Started with Hanami and GraphQL"
date: "2016-12-07"
---

## What is GraphQL?

GraphQL is a query language for APIs and a runtime for fulfilling those queries with your existing data. GraphQL provides a complete and understandable description of the data in your API, it gives clients the power to ask for exactly what they need and nothing more, makes it easier to evolve APIs over time, and enables powerful developer tools.

## What is Hanami?

Hanami is a Ruby MVC web framework comprised of many micro-libraries. It has a simple, stable API, a minimal DSL, and prioritises the use of plain objects over magical, over-complicated classes with too much responsibility.

The natural repercussion of using simple objects with clear responsibilities is more boilerplate code. Hanami provides ways to mitigate this extra legwork while maintaining the underlying implementation.

### Project setup

If you haven't already done so, install hanami.

\[code lang="bash"\]gem install hanami\[/code\]

After hanami is installed on your machine, you can create a new project. Feel free to chose another database or test framework if you like.

\[code lang="bash"\] hanami new blogs --database=postgres --application-name=api --test=rspec cd blogs \[/code\]

### Define entities

Before we do anything at all, we need entities we can query over our API. Hanami offers a generator for entities which can be invoked by the following command:

\[code lang="bash"\]hanami generate model author\[/code\] This will generate an entity and the corresponding test. In this tutorial tests are omitted for brevity but you are encouraged to implement them on your own.

We start out with our author as it's a very simple model. It has a single attribute 'name'.

\[code lang="ruby" title="lib/blogs/entities/author.rb"\] class Author include Hanami::Entity

attributes :name end \[/code\]

Next we're going to generate another model. A blog.

\[code lang="bash"\]hanami generate model blog\[/code\]

For our blog, we want a title, content and an author\_id to reference the author.

\[code lang="ruby" title="lib/blogs/entities/blog.rb"\] class Blog include Hanami::Entity

attributes :title, :content, :author\_id end \[/code\]

### Update database

To be able to store entities, we need to define database tables to hold data. Create a migration for the author model first:

\[code lang="bash"\] hanami generate migration create\_authors \[/code\]

Hanami will generate a migration file with a current timestamp for you under db/migrations. Open the file and add the following:

\[code lang="ruby"\] Hanami::Model.migration do change do create\_table :authors do primary\_key :id column :name, String, null: false end end end \[/code\]

For blogs, we create another migration named create\_blog.

\[code lang="bash"\]hanami generate migration create\_blogs\[/code\]

Inside the migration create another table with columns for our blog:

\[code lang="ruby"\] Hanami::Model.migration do change do create\_table :blogs do primary\_key :id column :title, String, null: false column :content, String, null: false foreign\_key :author\_id, :authors end end end \[/code\]

To get the changes to our database, execute

\[code lang="bash"\] hanami db create hanami db migrate \[/code\]

In order to be able to run database-backed tests, we need to ensure that the test database uses the same schema as our development database. Update the schema by setting HANAMI\_ENV to 'test' explicitly:

\[code lang="bash"\] HANAMI\_ENV=test hanami db create HANAMI\_ENV=test hanami db migrate \[/code\]

Now that our database is ready, we can go ahead and define mappings for author and blog. Go to lib/blogs.rb, find the mapping section and add mappings for the new entities.

\[code lang="ruby" title="lib/blogs.rb"\] ## # Database mapping # # Intended for specifying application wide mappings. # mapping do collection :blogs do entity Blog repository BlogRepository

attribute :id, Integer attribute :title, String attribute :content, String attribute :author\_id, Integer end

collection :authors do entity Author repository AuthorRepository

attribute :id, Integer attribute :name, String end end \[/code\]

### Introducing Types

After having defined our entities, we can now move on to create GraphQL types. First update your Gemfile and add the following line:

\[code lang="ruby" title="Gemfile"\]gem 'graphql'\[/code\] and then run

\[code lang="bash"\]bundle install\[/code\]

We're going to place type definitions in a dedicated directory to keep them separate from our entities. Furthermore those types are relevant for our web API only and not for the whole application. Create a directory in apps/api/ named 'types'

\[code lang="bash"\] mkdir -p apps/api/types\[/code\]

and update your web app's application.rb file to include type definitions in the load path.

\[code lang="ruby" title="application.rb"\] load\_paths < (obj, \_, \_) { AuthorRepository.find(obj.author\_id) } end end \[/code\]

\[code lang="ruby" title="apps/api/types/query\_type.rb"\] require\_relative 'author\_type' require\_relative 'blog\_type'

QueryType = GraphQL::ObjectType.define do name 'Query' description 'The query root for this schema'

field :blog do type BlogType argument :id, !types.ID resolve -> (\_, args, \_) { BlogRepository.find(args\[:id\]) } end

field :author do type AuthorType argument :id, !types.ID resolve -> (\_, args, \_) { AuthorRepository.find(args\[:id\]) } end end \[/code\]

\[code lang="ruby" title="apps/api/types/blog\_schema.rb"\] require\_relative 'query\_type'

BlogSchema = GraphQL::Schema.define(query: QueryType) \[/code\]

Notice the 'require\_relative' statements at the beginning of some files. This is a workaround because, even though defined in the load\_path, types don't seem to be auto loaded inside a type definition file.

### ... and Action

Now that the schema definitions and load path are set up correctly, it is time to create the action that will serve query requests. To generate a new action invoke the following command:

\[code lang="bash"\]hanami generate action api graphql#show --skip-view\[/code\] Since we're providing the --skip-view flag hanami will not generate a view class and template for this action. The above command will generate a new action where we place query logic.

\[code lang="ruby" title="apps/api/controllers/graphql/show.rb"\] module Api::Controllers::Graphql class Show include Api::Action

def call(params) query\_variables = params\[:vairables\] || {} self.body = JSON.generate(BlogSchema.execute(params\[:query\], variables: query\_variables)) end end end \[/code\] To let hanami know that it shouldn't render a view, we set self.body directly inside the action.

### Query the API

In order to see the API working, we need data! Fire up your hanami console and create some author and blogs.

\[code lang="bash"\] hanami c \[/code\]

Now create one or more authors and save it to database via AuthorRepository:

\[code lang="ruby"\] author = Author.new(name: 'John Wayne') AuthorRepository.persist author \[/code\]

Do the same for Blogs

\[code lang="ruby"\] blog = Blog.new(title: 'first blog', content: 'lorem ipsum dolor sit met', author\_id: 1) BlogRepository.persist blog \[/code\] As soon as we have our data in place, we can use cURL to query our API.

\[code lang="bash"\]curl -XGET -d 'query={ blog(id: 1) { title author { name } }}' http://localhost:2300/graphql\[/code\]

If all goes well you should see a response looking something like this:

\[code lang="javascript"\] {"data":{"blog":{"title":"first blog","author":{"name":"John Wayne"}}}}\[/code\] Go ahead and play around with the query. If you look at the type definition for QueryType you'll notice, that it should be possible to query for authors, too. Can you get the API to list all blog titles for a given author?

That's it. This introduction should give you a glimpse into Hanami and GraphQL. You can find more information in the section below.

## Links and references

More information about [GraphQL](http://graphql.org) The [Hanami](http://hanamirb.org) homepage Github repository for [GraphQL-Ruby](https://github.com/rmosolgo/graphql-ruby) [Marc-André Giroux'](https://plus.google.com/103412889445491341044?rel=author) [Blogpost](http://mgiroux.me/2015/getting-started-with-rails-graphql-relay/) this article is based upon [Source Code](https://github.com/cedricwider/graphql-hanami-poc) from this article.
