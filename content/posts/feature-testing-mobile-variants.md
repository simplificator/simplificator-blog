---
title: Feature testing mobile variants
date: 2015-12-18
language: en
---

For a project, we wanted to write a feature spec for the [mobile variant](http://guides.rubyonrails.org/4_1_release_notes.html#action-pack-variants) of the site. Instinctively, the first thing I did was google. I found nothing. The next thing I did was think. I came up with this, which worked:

```ruby
require 'rails_helper'

feature 'Mobile variant' do
  before do
    allow_any_instance_of(ActionDispatch::Request).to receive(:variant).and_return([:mobile])
  end

  scenario 'Look at customer information' do
    # your test here!
  end
end
```

Happy testing!
