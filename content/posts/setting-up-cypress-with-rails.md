---
title: "Setting up Cypress with Rails"
date: 2019-10-11
language: en
author: Dimiter Petrov
tags:
  - rails
  - ruby
  - testing
---

[Cypress.io](https://cypress.io) has very nice tooling for testing. We have been experimenting with it in various projects, one of which is a Rails application.

Cypress is not the obvious choice for Rails, since Rails comes with [system tests](https://guides.rubyonrails.org/testing.html#system-testing) out of the box since version 5.1. Before that Capybara was also not hard to set up.

Over the years we've gone back and forth on Selenium-based tests mainly due to how easily they can become slow and flaky. We're now trying to see if Cypress can help in this aspect.

There are a few subtleties about integrating Rails with Cypress.

First of all, if your frontend communicates with the backend through an API, Cypress makes it easy to test the frontend in complete isolation. In this application however we are dealing with a classic server-rendered user interface that achieves some of the interactivity with "sprinkles" of JavaScript. That means that we have to run the Rails server in order to test the UI.

I first looked at the [cypress-on-rails gem](https://github.com/shakacode/cypress-on-rails), but it permits [running arbitrary code](https://github.com/shakacode/cypress-on-rails/tree/b9756d6f4bee0ae0d046271d4a1e0534c202e79d#warning) (!) and generally seems to do too much. Manual setup it is then.

### Running Rails during Cypress tests

Cypress knows nothing about the backend and expects it to be running already. We can get there with a helper script:

```bash
#!/usr/bin/env bash

RAILS_ENV=test bundle exec rake db:environment:set db:create db:schema:load
bundle exec rails server -e test -p 5002
```

Then we tell Cypress how to find it using the `baseUrl` setting in `cypress.json`:

```javascript
{ "baseUrl": "http://localhost:5002" }
```

### Cleaning up between tests

Because the test backend is a long-running process and the tests can (indirectly) modify the database, we need to make sure every test starts with a clean slate.

One way to do it is to expose an API that is only available during tests.

```ruby
# config/routes.rb

Rails.application.routes.draw do
  # ...
  if Rails.env.test?
    require 'test_routes'
    define_test_routes
  end
end
```

The necessary routes are defined in a separate file on purpose. First, the file name itself warns that they are for the test environment. Second, the conditional inclusion in the router is easy to scan and there's no chance to accidentally define test routes outside this conditional, no matter how many there are.

Let's define a route for the database cleanup:

```ruby
# lib/test_routes.rb

def define_test_routes
  Rails.logger.info 'Loading routes meant only for testing purposes'

  namespace :cypress do
    delete 'cleanup', to: 'cleanup#destroy'
  end
end
```

The controller contains this:

```ruby
# app/controllers/cypress/cleanup_controller.rb

class Cypress::CleanupController < ActionController::Base
  def destroy
    if !Rails.env.test?
      return head(:bad_request)
    end

    tables = ActiveRecord::Base.connection.tables
    tables.delete 'schema_migrations'
    tables.each do |t|
      ActiveRecord::Base.connection.execute("TRUNCATE #{t} CASCADE")
    end

    head :ok
  end
end
```

The guard clause is there to be extra careful, because we then truncate all application-defined tables! We keep the migrations information intact and remove the data from all other tables. No need for a gem like database\_cleaner.

Now that the API endpoint is there we can wrap it in a [custom Cypress command](https://docs.cypress.io/api/cypress-api/custom-commands.html#Parent-Commands).

```javascript
// cypress/support/commands.js

Cypress.Commands.add("resetDatabase", () => {
  cy.request('DELETE', '/cypress/cleanup').as('cleanup')
})
```

We clean up before each test and once after the entire test suite:

```javascript
// cypress/support/index.js

import './commands'

beforeEach(() => {
  cy.resetDatabase()
})

after(() => {
  cy.resetDatabase()
})
```

### Populating the database with test data

This particular project is using [factory\_bot](https://github.com/thoughtbot/factory_bot) which turned out to be a good companion to Cypress.

Let's add an endpoint for creating data.

```ruby
# lib/test_routes.rb

def test_routes
  namespace :cypress do
    delete 'cleanup', to: 'cleanup#destroy'

    resource :factories, only: %i[create]
  end
end
```

```ruby
# app/controllers/cypress/factories_controller.rb

class Cypress::FactoriesController < ActionController::Base
  def create
    factory = FactoryBot.create(factory_name, factory_attributes)
    render json: factory
  end

  private

  def factory_name
    params.fetch(:name)
  end

  def factory_attributes
    params.fetch(:attributes).permit!.to_h
  end
end
```

The idea is to send the factory name and attributes in the request body:

```javascript
// cypress/support/commands.js

Cypress.Commands.add("factory", (name, attributes) => {
  cy.request('POST', '/cypress/factories', {
    name: name,
     attributes: attributes || {}
  }).as('test data')
})
```

This allows us to invoke factories from tests. For example:

```javascript
describe('Login', () => {
  it('is successful', () => {
    cy.factory('user', {username: 'jane', password: 'janespassword'})

    cy.visit('/')
    cy.get('[data-cy=username]').type('jane')
    cy.get('[data-cy=password]').type('janespassword')
    cy.get('[data-cy=submit]').click()

    cy.contains('Welcome back!')
  })
})
```

Speaking about logging in, Cypress encourages you to "cheat" as much as possible in the test setup phase. (See [Cypress best practices](https://docs.cypress.io/guides/references/best-practices.html)) Logging in using through the user interface is reserved for those tests that actually verify the login flow. Every other test can use a backdoor.

### Login helper

```ruby
# lib/test_routes.rb

def test_routes
  namespace :cypress do
    # ...
    resource :sessions, only: %i[create]
  end
end
```

```ruby
# app/controllers/cypress/sessions_controller.rb

class Cypress::SessionsController < ActionController::Base
  def create
    sign_in(user)
    render json: user
  end

  private

  def user
    if params[:username]
      User.find_by!(username: params.fetch(:username))
    else
      User.first!
    end
  end
end
```

The corresponding command can be defined as follows:

```javascript
// cypress/support/commands.js

Cypress.Commands.add("login", (username) => {
  cy.request('POST', '/cypress/sessions', {
    username: username
  })
})
```

Now we can quickly login in tests with `cy.login()` (or `cy.login('billie')` to log in as 'billie').

### Additional tips

You may have noticed that the `/cypress/factories` endpoint returns a JSON representation of created record. This makes it easier to inspect the data in the Cypress test runner interface (open the developer tools, and expand the response logged in the console).

It also allows you to use the returned data in the test, e.g.:

```javascript
cy.factory('user').then((response) => {
  cy.factory('appointment', {
    user_id: response.body.id
  })
})
```

Another thing that makes testing smoother is configuring the Rails server to reload code on every request in the test environment. By default code caching is enabled and speeds up the test suite. However, if you are also changing backend code while writing Cypress tests, you'd have to manually restart the server on every change. We use the configuration below to get the best of both.

```ruby
# config/environments/test.rb

Rails.application.configure do
  config.cache_classes = !ENV['CYPRESS_DEV']
end
```

During test driven development, we can get code reloading with `CYPRESS_DEV=yes bin/test_server`. On CI and when running tests locally, we omit the environment variable which leads to the default Rails test behaviour.
