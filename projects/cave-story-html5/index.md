---
title: 'Cave Story HTML5'
description: 'I ported the indie hit Cave Story to HTML5.'
preview: 'cave-story.jpg'
baseColor: '#8d002d'
grid: 6
---

[Cave Story](https://www.cavestory.org/download/cave-story.php) is a free 2004 hit indie title by one developer: [Daisuke Amaya.](https://cavestory.fandom.com/wiki/Daisuke_Amaya) I love the game's blend of exploration and action gameplay.

In September 2011, I was itching for a new hobby project, and web browsers supported a lot of stuff. [WebGL](https://madebyevan.com/webgl-water/), [Web Audio](https://www.arthurcarabott.com/audio-dsp-playground/), [gamepads](https://gamepad-tester.com/) and more made games a real possibility on the web platform.

I found an independent clone of Cave Story's game engine called [NXEngine](https://nxengine.sourceforge.io), written in C++. So, I decided to try to get it working in a web browser!

![Three stacked screenshots showing off various portions of the game.](projects/cave-story-html5/screenshots.png "6000x3790xno-rounding")

I learned a lot of things working on this project. To start, it involved manually porting tens of thousands of lines of C++ to JavaScript – something I'd never attempted. This was also the first time I used WebGL, and the first time I synthesized audio. I'd never worked with [game loops](https://gameprogrammingpatterns.com/game-loop.html) or scripting systems before either.

The process involved first trying to run the C++ files as JavaScript. I would fix whatever syntax errors appeared, re-run the code, and repeat. As I did this, more and more of the logic would run in the browser. Eventually I got to a point where the game logic would run, but nothing drew to the screen. Then I wrote code to bridge SDL calls so they'd draw graphics, play sounds, and accept input. After that the game was playable, but buggy, so I spent many weeks fixing each bug I ran into, one by one, as I played through the game. Anything that didn't match the original game needed fixing.

After months of work in my spare time, all by myself, the game was playable from the title screen right up to the end credits.

<Player uses="projects/cave-story-html5/sizzle" width="2048" height="1536" />

I aimed to deliver a flawless port of Cave Story for the web platform that fans could enjoy anytime, without installing it. A port which showed off the raw capabilities and performance of web browsers. A port which you could run on a laptop without spinning the fans up.

The final result speaks for itself. Even in 2012 and on a modest system, the game ran at a flawless 60 frames per second. And, thanks to [huge leaps in mobile performance](https://en.wikipedia.org/wiki/Apple_silicon), it's possible to play it on some unexpected hardware...

<Player uses="projects/cave-story-html5/ipad" width="2048" height="1536" />

I loved working on this project, because it taught me about tons of software engineering concepts and challenges. So! Do you have a moonshot project like this that I can learn even more from? If so, [please get in touch!](mailto "About that Cave Story project...")

![Heroic painting of the protagonist as seen from behind. Scarf flapping in the wind, he gazes upward, holding the Blade in one hand and the Polar Star in the other.](projects/cave-story-html5/key-art.jpg "4000x2667")
