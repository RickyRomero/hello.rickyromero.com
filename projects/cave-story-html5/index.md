---
title: 'Cave Story HTML5'
tagline: 'Porting tens of thousands of C++ code to JS'
summary: 'I ported the indie hit Cave Story to HTML5.'
baseColor: '#8d002d'
layers:
  - 'foreground-b.png'
  - 'foreground-c.png'
grid: 6
---

[Cave Story](https://www.cavestory.org/download/cave-story.php) is a free 2004 hit indie title by one developer: [Daisuke Amaya.](https://cavestory.fandom.com/wiki/Daisuke_Amaya) I love the game's blend of exploration and action gameplay.

In September 2011, I was itching for a new hobby project, and web browsers supported a lot of stuff. [WebGL](https://madebyevan.com/webgl-water/), [Web Audio](https://www.arthurcarabott.com/audio-dsp-playground/), [gamepads](https://gamepad-tester.com/) and more made games a real possibility on the web platform.

I found an independent clone of Cave Story's game engine called [NXEngine](https://nxengine.sourceforge.io), written in C++. So, I decided to try to get it working in a web browser!

![Three stacked screenshots showing off various portions of the game.](cave-story-screenshots.png "6000x3790xno-rounding")

I learned a lot of things working on this project. To start, it involved manually porting tens of thousands of lines of C++ to JavaScript – something I'd never attempted. This was also the first time I used WebGL, and the first time I synthesized audio. I'd never worked with [game loops](https://gameprogrammingpatterns.com/game-loop.html) or scripting systems before either.

After months of work in my spare time, all by myself, the game was playable from the beginning right up to the end credits.

<Player uses="cave-story-sizzle" width="2048" height="1536" />

I aimed to deliver a flawless port of Cave Story for the web platform that fans could enjoy anytime, without installing it. A port which showed off the raw capabilities and performance of web browsers. A port which you could run on a laptop without spinning the fans up.

The final result speaks for itself. Even in 2012 and on a modest system, the game ran at a flawless 60 frames per second. And, thanks to [huge leaps in mobile performance](https://en.wikipedia.org/wiki/Apple_silicon), it's possible to play it on some unexpected hardware...

<Player uses="cave-story-ipad" width="2048" height="1536" />

I loved working on this project, because it taught me about tons of software engineering concepts and challenges. So! Do you have a moonshot project like this that I can learn even more from? If so, [please get in touch!](contact-cta)

![Heroic painting of the protagonist as seen from behind. Scarf flapping in the wind, he gazes upward, holding the Blade in one hand and the Polar Star in the other.](cave-story-key-art.jpg "4000x2667")
