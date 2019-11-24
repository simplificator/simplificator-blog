---
title: "Setting up Cypress with Rails"
date: "2019-10-11"
---

[Cypress.io](https://cypress.io) has very nice tooling for testing. We have been experimenting with it in various projects, one of which is a Rails application.

Cypress is not the obvious choice for Rails, since Rails comes with [system tests](https://guides.rubyonrails.org/testing.html#system-testing) out of the box since version 5.1. Before that Capybara was also not hard to set up.

Over the years we've gone back and forth on Selenium-based tests mainly due to how easily they can become slow and flaky. We're now trying to see if Cypress can help in this aspect.

There are a few subtleties about integrating Rails with Cypress.

First of all, if your frontend communicates with the backend through an API, Cypress makes it easy to test the frontend in complete isolation. In this application however we are dealing with a classic server-rendered user interface that achieves some of the interactivity with "sprinkles" of JavaScript. That means that we have to run the Rails server in order to test the UI.

I first looked at the [cypress-on-rails gem](https://github.com/shakacode/cypress-on-rails), but it permits [running arbitrary code](https://github.com/shakacode/cypress-on-rails/tree/b9756d6f4bee0ae0d046271d4a1e0534c202e79d#warning) (!) and generally seems to do too much. Manual setup it is then.

### Running Rails during Cypress tests

Cypress knows nothing about the backend and expects it to be running already. We can get there with a helper script:

\[code lang=bash\] #!/usr/bin/env bash

RAILS\_ENV=test bundle exec rake db:environment:set db:create db:schema:load bundle exec rails server -e test -p 5002 \[/code\]

Then we tell ypress how to find it using the `baseUrl` setting in `cypress.json`:

\[code lang=javascript\] { "baseUrl": "http://localhost:5002" } \[/code\]

### Cleaning up between tests

Because the test backend is a long-running process and the tests can (indirectly) modify the database, we need to make sure every test starts with a clean slate.

One way to do it is to expose an API that is only available during tests.

\[code lang=ruby\] # config/routes.rb

Rails.application.routes.draw do # ... if Rails.env.test? require 'test\_routes' define\_test\_routes end end \[/code\]

The necessary routes are defined in a separate file on purpose. First, the file name itself warns that they are for the test environment. Second, the conditional inclusion in the router is easy to scan and there's no chance to accidentally define test routes outside this conditional, no matter how many there are.

Let's define a route for the database cleanup:

\[code lang=ruby\] # lib/test\_routes.rb

def define\_test\_routes Rails.logger.info 'Loading routes meant only for testing purposes'

namespace :cypress do delete 'cleanup', to: 'cleanup#destroy' end end \[/code\]

The controller contains this:

\[code lang=ruby\] # app/controllers/cypress/cleanup\_controller.rb

class Cypress::CleanupController < ActionController::Base def destroy if !Rails.env.test? return head(:bad\_request) end

tables = ActiveRecord::Base.connection.tables tables.delete 'schema\_migrations' tables.each do |t| ActiveRecord::Base.connection.execute("TRUNCATE #{t} CASCADE") end

head :ok end end \[/code\]

The guard clause is there to be extra careful, because we then truncate all application-defined tables! We keep the migrations information intact and remove the data from all other tables. No need for a gem like datbase\_cleaner.

Now that the API endpoint is there we can wrap it in a [custom Cypress command](https://docs.cypress.io/api/cypress-api/custom-commands.html#Parent-Commands).

\[code lang=javascript\] // cypress/support/commands.js

Cypress.Commands.add("resetDatabase", () => { cy.request('DELETE', '/cypress/cleanup').as('cleanup') }) \[/code\]

We clean up before each test and once after the entire test suite:

\[code lang=javascript\] // cypress/support/index.js

import './commands'

beforeEach(() => { cy.resetDatabase() })

after(() => { cy.resetDatabase() }) \[/code\]

### Populating the database with test data

This particular project is using [factory\_bot](https://github.com/thoughtbot/factory_bot) which turned out to be a good companion to Cypress.

Let's add an endpoint for creating data.

\[code lang=ruby\] # lib/test\_routes.rb

def test\_routes namespace :cypress do delete 'cleanup', to: 'cleanup#destroy'

resource :factories, only: %i\[create\] end end \[/code\]

\[code lang=ruby\] # app/controllers/cypress/factories\_controller.rb

class Cypress::FactoriesController < ActionController::Base def create factory = FactoryBot.create(factory\_name, factory\_attributes) render json: factory end

private

def factory\_name params.fetch(:name) end

def factory\_attributes params.fetch(:attributes).permit!.to\_h end end \[/code\]

The idea is to send the factory name and attributes in the request body:

\[code lang=javascript\] # cypress/support/commands.js

Cypress.Commands.add("factory", (name, attributes) => { cy.request('POST', '/cypress/factories', { name: name, attributes: attributes || {} }).as('test data') }) \[/code\]

This allows us to invoke factories from tests. For example:

\[code lang=javascript\] describe('Login', () => { it('is successful', () => { cy.factory('user', {username: 'jane', password: 'janespassword'}) cy.visit('/') cy.get('\[data-cy=username\]').type('jane') cy.get('\[data-cy=password\]').type('janespassword') cy.get('\[data-cy=submit\]').click() cy.contains('Welcome back!') }) }) \[/code\]

Speaking about logging in, Cypress encourages you to "cheat" as much as possible in the test setup phase. (See [Cypress best practices](https://docs.cypress.io/guides/references/best-practices.html)) Logging in using through the user interface is reserved for those tests that actually verify the login flow. Every other test can use a backdoor.

### Login helper

\[code lang=ruby\] # lib/test\_routes.rb

def test\_routes namespace :cypress do # ... resource :sessions, only: %i\[create\] end end \[/code\]

\[code lang=ruby\] # app/controllers/cypress/sessions\_controller.rb

class Cypress::SessionsController { cy.request('POST', '/cypress/sessions', { username: username }) }) \[/code\]

Now we can quickly login in tests with `cy.login()` (or `cy.login('billie')` to log in as 'billie').

### Additional tips

You may have noticed that the `/cypress/factories` endpoint returns a JSON representation of created record. This makes it easier to inspect the data in the Cypress test runner interface (open the developer tools, and expand the response logged in the console).

It also allows you to use the returned data in the test, e.g.:

\[code lang=javascript\] cy.factory('user').then((response) => { cy.factory('appointment', { user\_id: response.body.id }) }) \[/code\]

Another thing that makes testing smoother is configuring the Rails server to reload code on every request in the test environment. By default code caching is enabled and speeds up the test suite. However, if you are also changing backend code while writing Cypress tests, you'd have to manually restart the server on every change. We use the configuration below to get the best of both.

\[code lang=ruby\] # config/environments/test.rb

Rails.application.configure do config.cache\_classes = !ENV\['CYPRESS\_DEV'\] end \[/code\]

During test driven development, we can get code reloading with `CYPRESS_DEV=yes bin/test_server`. On CI and when running tests locally, we omit the environment variable which leads to the default Rails test behaviour.
