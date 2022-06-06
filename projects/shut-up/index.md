---
title: 'Shut Up: Comment Blocker'
description: 'I expanded an open-source comment blocking stylesheet into a suite of extensions for all major browsers.'
preview: 'shut-up.jpg'
baseColor: '#0070e0'
grid: 8
---

[Shut Up](https://rickyromero.com/shutup/) is an open source project to hide user comments on all websites by default. I've been steadily improving it in my spare time since 2010.

There are lots of valid reasons to hide comments on the web. Some people simply want to enjoy their favorite sites without distractions. Others don't want to see arguments, or be exposed to statements that instill anger or sadness in them. As society becomes more polarized, these reasons gain importance.

The core of Shut Up is an open source stylesheet called [shutup.css](https://github.com/panicsteve/shutup-css) by [Steven Frank](https://stevenf.com). Created in 2010, shutup.css acts as a user stylesheet to block comments on all websites. Because it's open source, anyone can contribute bug fixes or block comments on new websites.

Shortly after Steven introduced shutup.css, I created my first browser extension for Safari based on the stylesheet (with permission). Safari extensions were pretty simple at the time, and so was mine: all it did was wrapped Steven's stylesheet in a convenient toolbar button that you could use to show comments. Later on I added features for remembering where users show comments and automatically updating the stylesheet.

In 2011, I ported this extension to Google Chrome, further refining it and adding some nice UI enhancements.

(screenshot of Shut Up 2.5's options page)

In 2015, iOS 9 added a content blocker API for Safari. This API let me [bring Shut Up to iPhone and iPad](https://www.macstories.net/ios/shut-up-is-an-ios-9-content-blocker-to-hide-comments-on-the-web/) mere days after iOS 9 launched. This was also my very first iPhone app!

(screenshot of rickyromero.com after launching Shut Up for iOS)

Two years later, I wrote what became the foundations for Shut Up on most major browsers. I'd learned a lot about JavaScript in the 7 years since I'd released Shut Up 1.0. Shut Up 3.0 was a complete overhaul which retained all the features users like about the extension, added new features like a configurable keyboard shortcut and localizations, and dramatically improved reliability when hiding and showing comments.

This version runs in Chrome, Edge, Firefox, Opera, Brave, and other browsers which use the WebExtensions API. Today, Shut Up 7.0 continues to use the same foundations as its 5-years-ago rewrite.

(screenshot gallery of Shut Up running in Chrome, Edge, Firefox, Opera, and Brave)

But there was one browser left...

(Shut Up for Mac teaser)

In 2019, Safari 13 dropped support for its legacy extension format. Apple replaced it with a new format which required all extensions to go through the App Store. I had to rewrite Shut Up from scratch, custom for Safari, and distribute it inside a native Mac app.

I spent a few months [completing a course on iOS and Swift development,](https://www.udemy.com/course/ios-13-app-development-bootcamp/) with the goal of becoming skilled enough with Swift to write a first-class Mac app. Then, in 2020, Safari got its long-awaited update to Shut Up: Shut Up for Mac.

(screenshot of Shut Up for Mac)

(write about the Mac app for a bit)

(write some closing summary here)
