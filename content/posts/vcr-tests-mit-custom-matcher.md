---
title: "VCR Tests mit Custom matcher"
date: 2014-03-05
---

[VCR](https://relishapp.com/vcr/vcr/v/2-8-0/docs) ist ein Library um Tests zu schreiben welche HTTP Requests auf externe Services machen.

VCR nimmt die Anfragen an den Service auf und spielt die Antworten bei bedarf wieder ab. Somit können Tests beschleunigt und unabhängig von externen Diensten gemacht werden.

Um zu bestimmen ob eine aufgenommene Antwort wieder abgespielt werden soll, greift VCR auf R[equest Matchers](https://relishapp.com/vcr/vcr/v/2-8-0/docs/request-matching) zurück. Nebst diversen bereits vorhandenen Matchern kann VCR um [eigene Matchers](https://relishapp.com/vcr/vcr/docs/request-matching/register-and-use-a-custom-matcher) erweitert werden.

Ein Matcher ist ein “callable” welches zwei Argumente nimmt (zwei Requests welche verglichen werden müssen) und ein Boolean wert zurückgibt.

```ruby
do |a, b|
  true
end
```

### Ein einfacher (und nutzloser) Matcher.

Man kann Custom Matcher einsetzen um z.B. bestimmte Parameter zu ignorieren oder Host Name basiertes loadbalancing (api1.foo.com, api2.foo.com…) abzudecken.
