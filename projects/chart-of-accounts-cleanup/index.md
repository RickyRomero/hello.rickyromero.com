---
title: 'Chart of Accounts Cleanup'
tagline: 'Interaction and visual design'
summary: "Understanding accountants' workflows is crucial in helping them clean up their clients' books."
previews:
  - 'coa-cleanup-a.png'
  - 'coa-cleanup-b.png'
  - 'coa-cleanup-c.png'
  - 'coa-cleanup-d.png'
---

Backslash \*prevents\* these asterisks from causing formatting.  Backslash is the \`escape\` character.

Bare URLs are auto-linked by only some parsers.  http://example.com

regular text, **bold** text, *italic* text, `code` text

* Unordered List
    * With nesting
    * Always use 4 spaces per indent
        - Can also use hyphen instead of asterisk
        - Like this
* Some parsers work with other spacing, but all work with 4

1. Ordered List
    1. With nesting
    1. Always use 4 spaces per indent
1. Some parsers work with other spacing, but all work with 4
2. Try to keep your numbers sequential, but it isn't really necessary

# Header Level 1 - document title

Although you can follow the header immediately with text, it is safest to wrap it with blank lines.  Must put blank line BEFORE any header.  Must separate the # from the text with a space.  They do not necessarily proceed from largest to smallest. (e.g. Jekyll renders level 1 as smaller, red text, when compared with level 2.)

## Header Level 2 - Chapter/Section title

Text goes here.

### Header Level 3 - Not yet defined

Text goes here.

#### Header Level 4 - Not yet defined

Text goes here.

##### Header Level 5 - Not yet defined

Text goes here.

###### Header Level 6 - Not yet defined.  This is the lowest level supported.

Text goes here.

ordinary text

  > These lines will get joined into one block quoted line by SOME dialects but not all.
  > block quote line 1.
  > block quote line 2.

ordinary text

    preformatted text
    is rendered in fixed-width font
    and retaining your line breaks
    if you begin the line with four spaces.
    two spaces works with only some parsers.
    you may need to wrap with blank lines for some parsers.


```
Desired form.
fenced code block line 1
fenced code block line 2
Use backticks, where possible.  They are more portable than tilde fences.
```

~~~
Alternate form, to be avoided where possible.
fenced code block line 1
fenced code block line 2
Use backticks, where possible.  They are more portable than tilde fences.
~~~

horizontal rule below.
3 dashes is sufficient.  I use 5 dashes because I think it reads better.  Wrap with blank line above and below.

-----

and

---

horizontal rule above.

[human link description](http://example.com "optional flyover title")

![image alt descsription](https://www.w3schools.com/images/colorpicker.png "optional flyover title")

| Left-aligned | Center-aligned | Right-aligned |
| :---         |     :---:      |          ---: |
| git status   | git status     | git status    |
| git diff     | git diff       | git diff      |

# GFM

## Autolink literals

www.example.com, https://example.com, and contact@example.com.

## Footnote

A note[^1]

[^1]: Big note.

## Strikethrough

~one~ or ~~two~~ tildes.

## Table

| a | b  |  c |  d  |
| - | :- | -: | :-: |

## Tasklist

* [ ] to do
* [x] done
