---
title: 'Shut Up: Comment Blocker'
description: 'I expanded an open-source comment blocking stylesheet into a suite of extensions for all major browsers.'
preview: 'shut-up.jpg'
baseColor: '#0070e0'
grid: 8
---

[Shut Up](https://rickyromero.com/shutup/) is an [open source project](https://github.com/RickyRomero/shut-up-webextension) to hide user comments on all websites by default. I've been steadily improving it in my spare time since 2010.

There are lots of valid reasons to hide comments on the web. Some people simply want to enjoy their favorite sites without distractions. Others don't want to see arguments, or be exposed to statements that instill anger or sadness in them. As society becomes more polarized, these reasons gain importance.

The core of Shut Up is an open source stylesheet called [shutup.css](https://github.com/panicsteve/shutup-css) by [Steven Frank.](https://stevenf.com) Created in 2010, shutup.css acts as a user stylesheet to block comments on all websites. Because it's open source, anyone can contribute bug fixes or block comments on new websites. In fact, I continue to push fixes to this stylesheet 12 years later.

Shortly after Steven introduced shutup.css, I created my first browser extension for Safari based on the stylesheet (with permission). Safari extensions were pretty simple at the time, and so was mine: all it did was wrapped Steven's stylesheet in a convenient toolbar button that you could use to show comments. Later on I added features for remembering where users show comments and automatically updating the stylesheet.

In 2011, I ported this extension to Google Chrome, further refining it and adding some nice UI enhancements.

![An archived promotional image of Shut Up hiding comments on Yahoo! News in Chrome.](projects/shut-up/old-shut-up-promo.png "5600x2240")

In 2015, iOS 9 added a content blocker API for Safari. This API let me [bring Shut Up to iPhone and iPad](https://github.com/RickyRomero/shut-up-ios) [mere days after iOS 9 launched.](https://www.macstories.net/ios/shut-up-is-an-ios-9-content-blocker-to-hide-comments-on-the-web/) This was also my very first iPhone app!

![A screenshot depicting Shut Up's landing page when it launched on iPhone in 2015. The screenshot itself is depicted on an iPhone.](projects/shut-up/ios-launch-landing-page.png "4809x2365xno-rounding")

Two years later, I wrote what became the foundations for Shut Up on most major browsers. I'd learned a lot about JavaScript in the 7 years since I'd released Shut Up 1.0. Version 3.0 was a complete overhaul which retained all the features users like about the extension, added new features like a configurable keyboard shortcut and localizations, and dramatically improved reliability when hiding and showing comments.

Today, [Shut Up 7](https://github.com/RickyRomero/shut-up-webextension) runs in Chrome, Edge, Firefox, Opera, Brave, and other browsers which use the WebExtensions API. It continues to use the same foundations as its 5-years-ago rewrite.

![Screenshot gallery of Edge, Opera, Chrome, Firefox and Brave all hiding comments on YouTube using Shut Up.](projects/shut-up/browser-spread.png "4000x2250")

But there was one browser left...

![3D render of a red cloth draped over a squircle icon.](projects/shut-up/shut-up-mac-teaser.png "7680x4320")

In 2019, Safari 13 dropped support for its legacy extension format. Apple replaced it with a new format which required all extensions to go through the App Store. I had to rewrite Shut Up from scratch, custom for Safari, and distribute it inside a native Mac app.

I spent a few months [completing a course on iOS and Swift development,](https://www.udemy.com/course/ios-13-app-development-bootcamp/) with the goal of becoming skilled enough with Swift to write a first-class Mac app. Then, in 2020, Safari got its long-awaited update to Shut Up: [Shut Up for Mac.](https://github.com/RickyRomero/shut-up-native)

![A screenshot of Shut Up for Mac showing its main app window and allowlist. The app's icon, a speech bubble with a minus carved out, is superimposed.](projects/shut-up/shut-up-mac.png "2650x1673xno-rounding")

Ever since I started using Macs in school, I always wanted to make a Mac app. Thanks to my extensive background in JavaScript, I was able to make the leap to Swift and finally make that dream come true. [You can find Shut Up on the App Store here.](https://apps.apple.com/app/id1015043880)

This project has been a long labor of love for me, and I plan to continue improving it for many years to come. I've used it to test out new technologies from time to time, like ES6+, Mutation Observers, continuous deployment, and more. So, if you're looking for a designer with a wealth of development expertise, [please get in touch!](mailto "I've got a comment about your comment blocker!")
