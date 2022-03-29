---
title: 'Cave Story HTML5'
tagline: 'Porting tens of thousands of C++ code to JS'
summary: 'I ported the indie hit Cave Story to HTML5.'
baseColor: '#8d002d'
previews:
  - 'cave-story-html5-a.png'
  - 'cave-story-html5-b.png'
  - 'cave-story-html5-c.png'
  - 'cave-story-html5-d.png'
grid: 6
---

In September 2011, I was itching for a new project. Web browsers were becoming capable of *a lot* of stuff. New APIs like WebGL, the Web Audio API and the Gamepad API made games a real possibility on the web platform.

<Player uses="cave-story-sizzle" />

Cave Story is a hit indie title from 2004 by one developer: Daisuke Amaya. I really like the game's blend of exploration and action gameplay. The powerup system in particular is a really elegant piece of game design. You collect yellow bits which power up your weapon, but lose them when you take damage.

I found an independent clone of Cave Story's game engine called NXEngine, which is open-source. So I decided to dig in and see what I could do.

<Player uses="cave-story-sizzle" />

At first, it was slow going. JavaScript looks a lot like C++ due to its shared origins, but at the time I didn't understand C++'s type system or how pointers worked. Still, it looked similar enough to JS that I could figure it out. Starting out, I took the original C++ code, put a .js extension on it, and converted all the C++ syntax to JS syntax. I looked at the original code's routines and learned my first lesson about how games are constructed: the game loop.

The game loop is a simple design pattern, but wasn't something I'd seen at the time. Every frame, the game engine will read inputs from the keyboard or gamepad, then run scripts and code for all the game objects. Then it renders those changes to the screen. After that, it schedules the next frame to render.

Converting this logic to run in JavaScript is a bit of work, but the main focus starting out was to get the game loop running. So, to start, I focused on the core functions in the game loop to get those running first. I'd add a file to the project, rewrite the syntax, and try running it in the browser. The browser would throw some syntax error, so I'd go back and fix the error and run it again to find another error.

This process continued for 2 weeks until I was *finally* able to draw the game's intro sequence to the screen.

(Talk about drawing to the screen and abstraction layers)

(Talk about events vs. polling)

(Talk about posting my progress to the Cave Story forums)

(Talk about showing my work to Daisuke)

(Talk about interactions with Nicalis)

(Talk about milestones)

(Talk about my first E3)

(Talk about the fully playable game and my improvements)

(Talk about the licensing block)

(Conclusion)
