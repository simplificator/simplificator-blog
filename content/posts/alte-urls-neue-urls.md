---
title: "Alte URLs, neue URLs"
date: 2013-11-27
---

Neues CMS neue URLs und nichts mehr auffindbar?

Beim Technologiewechsel von unserem CMS wurde auch die URL generierung geändert. Somit sind gewisse URLs nicht mehr gültig.  
Um diesem Problem vorzubeugen, SEO und Benutzerfreundlichkeit lassen grüssen, verwenden wir [Rack::Rewrite](https://github.com/jtrupiano/rack-rewrite) um alte URLs mit einem 301 Status Code zu beantworten und gleich an den richtigen Ort weiterzuleiten.

    config.middleware.insert\_before(ActionDispatch::RequestId, Rack::Rewrite) do
      # company
      r301      '/de/firma',        '/de/company'
      # offers
      r301      '/de/angebote',     '/de/offers'
      # references
      r301      '/de/referenzen',   '/de/projects'
      r301      '/en/references',   '/en/projects'
      r301      %r{/de/referenzen/.\*}, '/de/projects'
      r301      %r{/en/references/.\*}, '/de/projects'
      ....
      ....
    end
