---
title: "Finding column names using DBI"
date: "2014-03-31"
---

A useful snippet, should you ever require to get the column names of a table that you are connecting through DBI:

> DBI.connect(something’) do |con|  
>   con.execute(“SELECT \* FROM FOO”).each do |row|  
>     p row.inspect  
>     p row.column\_names  
>   end  
> end
