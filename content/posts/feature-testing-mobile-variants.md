---
title: "Feature testing mobile variants"
date: "2015-12-18"
---

For a project, we wanted to write a feature spec for the [mobile variant](http://guides.rubyonrails.org/4_1_release_notes.html#action-pack-variants) of the site. Instinctively, the first thing I did was google. I found nothing. The next thing I did was think. I came up with this, which worked:

\[code language="ruby"\] require 'rails\_helper'

feature 'Mobile variant' do before do allow\_any\_instance\_of(ActionDispatch::Request).to receive(:variant).and\_return(\[:mobile\]) end

scenario 'Look at customer information' do # your test here! end end \[/code\]

Happy testing!
