---
title: 'Design Systems'
description: 'aaaaaaaaaaaaaaa'
preview: 'design-systems.jpg'
baseColor: '#006b4a'
previews:
  - 'design-systems-a.png'
  - 'design-systems-b.png'
  - 'design-systems-c.png'
  - 'design-systems-d.png'
---

Here's a collection of contributions I made to design systems at Intuit. I worked in two design systems: the Intuit Design System (IDS) and QuickBooks Design System (QBDS). QBDS is a subset of IDS.

### Dark Mode

The biggest contribution I made to QBDS, bar none, is [dark mode in QuickBooks Online.](/projects/quickbooks-dark-mode) I prototyped this back in Spring of 2019 and was chiefly responsible for its design and implementation.

[video]

My work on dark mode inspired development of more flexible color palettes in IDS.

### color-info

`color-info` is a reusable set of inner-source packages I wrote at Intuit which helps developers better understand and work with color. It's a monorepo containing several packages:

- `blend`: Composites an array of transparent or opaque colors together to calculate a final color. The result matches what you'd get out of design tools like Photoshop, Sketch, or Figma.
- `contrast-ratio`: Calculates the WCAG 2.1 contrast ratio of two colors.
- `convert-color`: Converts colors between formats (like hex to HSL, or CSS colors to RGB, for example).
- `delta-e`: Calculates the [ΔE](https://en.wikipedia.org/wiki/Color_difference#CIELAB_%CE%94E*) value of two colors. Can also find the closest on-palette swatch for an arbitrary color.
- `gamma`: Converts a color channel value from sRGB to linear gamma and back.
- `luma`: Calculates the relative luminance of a color. Kind of like converting it to grayscale.
- `simulate-color`: Lets you change the hue or saturation of a color, or simulate what it would look like to people who experience different forms of color blindness.
- `info`: An amalgamation of all the above packages, for quickly getting info on 1 or more colors.

These low-level packages are useful for evaluating or transforming colors, and were used to compose more elaborate design and engineering tools.

### Color Linter

During Global Engineering Days 202X, I teamed up with a frontend engineer and a design technologist to get [Stylelint](https://stylelint.io/) working in our build tools. I wrote a Stylelint plugin which used [ΔE color matching](https://en.wikipedia.org/wiki/Color_difference#CIELAB_%CE%94E*) to detect off-palette colors, recommending suitable swatches as replacements.

[img]

The plugin also makes intelligent recommendations depending on how far the color is off-palette. For example, a ΔE value of 2.0 or less means the color can be swapped automatically, but a higher value may warrant action on the part of the developer or designer.

### Variable Fonts

Intuit's brand font is based on Avenir Next. During license renewal negotiations with Monotype in 2019, I suggested we look into getting a variable version of this font.

[img]

Variable fonts are notable for their design flexibility and, on the web, their performance. Normally, you need several files to render a font on the web. This requires several HTTP requests, which can be slow on a cellular connection. With variable fonts, all those weights are condensed into a single file. This reduces redundant data, and removes the need for separate HTTP requests. In turn, it allows for faster font rendering, increasing performance. That's why *this* site uses a variable version of the font [Codec Pro.](https://www.zetafonts.com/codec-pro)

I submitted a brief outlining all the benefits of adopting variable fonts, and tested load times across several Intuit pages to ensure there wouldn't be any performance regressions. Later, after receiving the variable font, I wrote a boilerplate implementation, suitable for production use, that developers could reference as they adopted the font. I even coached teams on how to optimize the font for blistering load times. This involves special techniques like [instancing](https://fonttools.readthedocs.io/en/latest/varLib/instancer.html) and [subsetting](https://fonttools.readthedocs.io/en/latest/subset/index.html) using the open-source `fonttools` library.

---

As I've shown, a design system isn't *just* design. It's design *expressed through code.* I can design and develop your company's design system too; [drop me a line!](mailto "Let's talk design systems!")
