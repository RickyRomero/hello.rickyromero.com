---
title: 'QuickBooks: Dark Mode'
description: "I built dark mode for QuickBooks Online primarily on my own. Here's how I did it."
preview: 'quickbooks-dark-mode.jpg'
baseColor: '#8d0089'
grid: 8
---

Apple released macOS Mojave at the end of 2018. This update included a system-wide dark mode. Rumors had it that iOS would follow suit in 2019. So, in the spring of 2019, I started thinking about how this accessibility mode might apply to QuickBooks.

Before this, our team built something called the end-to-end prototype. We meant it to represent many screens in the user's experience of signing up for and using QuickBooks. This was a great proving ground for my dark mode concept.

(video of end-to-end prototype)

I started by deconstructing how Apple applied dark mode to macOS. By exploring different palettes and UI elements, I immediately learned that it wasn't a simple inversion. We couldn't simply plop `filter: invert(100%)` on the `body` element and call it a day. Everything needed consideration, from how background layers interact to how hover states and shadows work.

(Image of some of my macOS explorations)

The main thing I took away from this exploration is that turning on dark mode is like turning the lights off. Light and dark things darken, but light things stay lighter.

(talk a bit about the palette and the challenges there)

In under a month, I'd adapted all the screens in our prototype to dark mode. And because I'd done this using CSS custom properties, I could also try high-contrast mode and colorblind mode. I did this to show how the various modes could combine.

(demo reel)

(slideshow of different modes)

The next challenge is applying this in production. QuickBooks 
