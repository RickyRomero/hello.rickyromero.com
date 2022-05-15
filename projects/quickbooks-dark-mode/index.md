---
title: 'QuickBooks: Dark Mode'
description: "I built dark mode for QuickBooks Online primarily on my own. Here's how I did it."
preview: 'quickbooks-dark-mode.jpg'
baseColor: '#8d0089'
grid: 8
---

At the end of 2018, UI customization started hitting the mainstream. Apple launched [macOS Mojave](https://en.wikipedia.org/wiki/MacOS_Mojave) at the end of the year [with a system-wide dark mode.](https://www.macrumors.com/roundup/macos-10-14/#dark_mode) Rumors had it that [iOS 13](https://en.wikipedia.org/wiki/IOS_13) would follow suit in 2019 [(and it did).](https://www.macrumors.com/roundup/ios-13/#dark_mode) The design team had explored dark mode before in bits and pieces, but never at scale. So, in the spring of 2019, before iOS 13 launched, I started thinking about how this accessibility mode might apply to QuickBooks.

![Five stacked screenshots showing off various screens with dark mode turned on.](projects/quickbooks-dark-mode/collage.png "5424x3489")

I considered this an accessibility mode because, like high-contrast mode, it makes products usable for more people. For example, [my partner Heather](https://heatherromero.com) suffers from [chronic photosensitive migraines.](https://en.wikipedia.org/wiki/Photophobia) Today, she uses dark mode on all her devices in part because of that.

Before this, our prototyping team at Intuit built something we called the end-to-end prototype. It sat outside of production so we could test and iterate quickly. We meant it to represent many screens in the user's experience of signing up for and using QuickBooks, and we frequently used it to try out new UI concepts. This turned out to be a great proving ground for my dark mode concept.

(video of end-to-end prototype)

I started by deconstructing how Apple applied dark mode to macOS. By exploring different palettes and UI elements, I immediately learned that it wasn't a simple inversion. We couldn't simply plop `filter: invert(100%)` on the `body` element and call it a day. Everything needed consideration, from how background layers interact to how hover states and shadows work.

(Image of some of my macOS explorations)

The main thing I took away from my reverse engineering is that turning on dark mode is like turning the lights off. Light and dark things darken, but light things stay lighter. However, the grays in our light mode palette weren't suitable for dark mode because most of the grays were over 50% brightness.

(Image)

In under a month, I'd adapted all the screens in our prototype to dark mode. And because I'd done this using CSS custom properties, I could also make a high-contrast mode and colorblind mode. I did this to show how the various modes could combine.

<Player uses="projects/quickbooks-dark-mode/sizzle" width="1920" height="1080" />

The next challenge is applying this in production. QuickBooks is a big app made up of plugins managed by many different engineering teams. We needed a way to launch this feature without going into the code of every single plugin and releasing a new version.

The solution I came up with was an automated conversion tool which would pull the CSS for every plugin (leveraging some prior CSS cleanup tooling) and run heuristics on that code to derive a dark mode version. It looks at the context of each CSS rule, modifying the colors depending on that context. Then it builds an overlay stylesheet which applies the colors to the page. From there, we use a few manual overrides, and apply the stylesheet using our own plugin.
