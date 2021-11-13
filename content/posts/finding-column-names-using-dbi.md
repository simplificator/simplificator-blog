---
title: "Finding column names using DBI"
date: 2014-03-31
language: en
author: Simplificator
tags:
  - database
  - ruby
---

A useful snippet, should you ever require to get the column names of a table that you are connecting through DBI:

``ruby
DBI.connect('something') do |con|
  con.execute("SELECT * FROM FOO").each do |row|
    p row.inspect
    p row.column_names
  end
end
```
