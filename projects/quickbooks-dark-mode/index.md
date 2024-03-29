---
title: 'QuickBooks: Dark Mode'
description: "Hear how I designed dark mode for QuickBooks Online."
preview: 'quickbooks-dark-mode.jpg'
baseColor: '#8d0089'
grid: 8
---

At the end of 2018, UI customization started hitting the mainstream. Apple launched [macOS Mojave](https://en.wikipedia.org/wiki/MacOS_Mojave) at the end of the year [with a system-wide dark mode.](https://www.macrumors.com/roundup/macos-10-14/#dark_mode) Rumors had it that [iOS 13](https://en.wikipedia.org/wiki/IOS_13) would follow suit in 2019 [(and it did).](https://www.macrumors.com/roundup/ios-13/#dark_mode) The QuickBooks design team had explored dark mode before in bits and pieces, but never at scale. So, in the spring of 2019, before iOS 13 launched, I started thinking about how this accessibility mode might apply to QuickBooks.

![Five stacked screenshots showing off various screens with dark mode turned on.](projects/quickbooks-dark-mode/collage.png "5424x3489")

I consider this an accessibility mode because, like high-contrast mode, it makes products usable for more people. For example, [my partner Heather](https://heatherromero.com) suffers from [chronic photosensitive migraines.](https://en.wikipedia.org/wiki/Photophobia) Today, she uses dark mode on all her devices in part because of that.

Before this, our prototyping team at Intuit built something we called the end-to-end prototype. It sat outside of production so we could test and iterate quickly. We meant it to represent many screens in the user's experience of signing up for and using QuickBooks, and we frequently used it to try out new UI concepts. This turned out to be a great proving ground for my dark mode concept.

<Player uses="projects/quickbooks-dark-mode/e2e" width="2048" height="1536" />

I started by deconstructing how Apple applied dark mode to macOS. By exploring different palettes and UI elements, I immediately learned that it wasn't a simple inversion. We couldn't simply plop `filter: invert(100%)` on the `body` element and call it a day. Everything needed consideration, from how background layers interact, to how hover states and shadows work. I also explored how high contrast mode interacts with dark mode in the OS.

![Four stacked screenshots showing combinations of UI themes.](projects/quickbooks-dark-mode/macos-explorations.png "4600x2624xno-rounding")

The main thing I took away from my reverse engineering is that turning on dark mode is like turning the lights off. Light and dark things darken, but light things stay lighter. The grays in our light mode palette weren't up to this task for dark mode because most of the grays were over 50% brightness. So, consulting with our design system lead, I built a new gray palette just for dark mode.

![A visualization of the gray values divided at 50% brightness. The dark mode palette has more colors available below this threshold.](projects/quickbooks-dark-mode/gray-palette.png "3000x2250")

As I worked on the prototype, I documented high-level rules to define how light mode designs [adapt to dark mode](https://designsystem.quickbooks.com/bolt/dark-mode/) in the [QuickBooks Design System.](https://designsystem.quickbooks.com/)

![A visualization of the "lights out" rule, showing how to translate a light mode design to dark mode.](projects/quickbooks-dark-mode/adaptation.png "3000x2250")

In under a month, I converted all the screens in our prototype to dark mode. And because I did this using CSS custom properties, I could also make a high-contrast mode and colorblind mode. I did this to show how the various modes could combine. I consulted with our design team's accessibility expert to fine-tune these.

<Player uses="projects/quickbooks-dark-mode/sizzle" width="1920" height="1080" />

The next challenge was applying this in production. QuickBooks is a big app composed of plugins managed by many different engineering teams. We needed a way to launch this feature without going into the code of every single plugin and releasing a new version.

The solution I developed was an automated conversion tool which would pull the CSS for every plugin, then run heuristics on that code to derive a dark mode version. Leveraging some prior CSS cleanup tooling, it looks at the context of each CSS color, modifying the colors depending on that context. Then it builds an overlay stylesheet which applies the colors to the page. From there, we use a few manual overrides, and apply the stylesheet using a plugin that one of my design technologist colleagues created. I partnered with the shell team – the team responsible for the core of QuickBooks's architecture – to guarantee that the plugin wouldn't impact performance for customers who didn't use it.

Dark mode launched in QuickBooks Labs for user testing in 2020. Intuit recognized my efforts by honoring me as a [Level 2 Accessibility Champion.](https://www.last-child.com/intuits-accessibility-champion-program/#:~:text=Level%202%20Champion%20%E2%80%93%20Training%20and%20Exploring)

---

This is [one of many contributions](/projects/design-systems) I made to Intuit's design systems. I can design and develop your company's design system too; [drop me a line!](mailto "Dark mode looks awesome!")
