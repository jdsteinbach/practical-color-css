# Practical Refactors with Modern CSS Colors

Practical refactors with modern CSS colors: a hands-on talk on simplifying color tokens, dark mode, and theming using modern CSS. Fewer variables, less duplication, clearer intent—using light-dark(), relative colors, and more.

## Talk Submission Transcript

I'm James Steinbach and I'd like to submit a 25m talk called "Practical Refactors with Modern CSS Colors" for a 25m talk. This is a hands-on talk about the CSS we write after design tokens land in our codebase—and the unnecessary complexity that tends to follow.

Most teams hit the same problems: you want a single source of truth for a color, but also need transparent variants for borders, overlays, and focus states. That leads to Sass color functions, raw RGB channel variables, or other workarounds that add noise and cognitive overhead.

Then dark mode shows up. You do all that work again in the prefers-color-scheme media query. Then you add user-preferences and put a theme class on body, so you have to repeat all the color code (light & dark mode both!) in their override selectors. We've been reaching for preprocessors to solve problems that we can now solve natively in CSS.

In this session, I’ll refactor a real codebase, step by step using modern CSS color features. We’ll simplify tokens, remove duplication, and clarify theme logic while measuring real outcomes: less CSS shipped, fewer variables, and code that’s easier to maintain.

Attendees will leave with practical patterns using light-dark(), relative colors, the new RGB implied-alpha syntax, and blend-mode-based interactive states, as well as a11y help from the `contrast-color()` function.

## Long Idea Description

We’ve had a lot of complication around CSS colors over the years. For many of us our interaction with colors is simply reduced to copying a value from Figma and pasting it in a CSS custom property or sass variable and use it as you need it.

However, you’ve probably run into some issues along the way, even with that simplified workflow. What if you want to store a solid color value in a variable and use it in a transparent way elsewhere? You can use sass variables in color functions, or you can save the RGB values to a variable and use them in an RGB a function with an alpha value in pure CSS, but that’s clunky and creates a lot of extra variables or a lot of extramental overload.

What about dark mode. You’ve got all your variables ready to go for light mode. Then you want to respect the prefers-color-scheme: darkmedia query, and so you redefine values for all of those color variables inside that media query. And then you want to provide a user preference for color theme and you have to repeat all of those dark theme overrides inside of a class, and if you want a class for light mode to override dark mode, even in the middle of color theme media queries, you have to repeat all of your light values. And sure, pre-processors like sass help, but the fact that you have to turn into a pre-processor instead of doing all that work with pure CSS is revealing that something is wrong.

The way we have been doing colors for years is heavily constrained. All the pain points I’ve been talking about are pain points I experienced and worked around the last time I redesigned my personal site / blog. If you’re like me as a developer, you have to redesign your personal site about twice as often as you post to it.

But I recently realized that a bunch of new CSS color functions and properties and values and techniques make all of this so much simpler - so I’m gonna be practical with you today. I want to take my site and one step at a time refactor it - we’re gonna see together in real time how much performance we gain, how much less CSS we load in total, and how much simpler it is for me as a developer responsible for this code to understand it all.

## Scope

Specific hands-on refactor topics are:

- `light-dark()` function, and toggle specific styles with `color-scheme` override
- CSS relative colors and the new RGB implied Alpha syntax for simpler alpha overrides.
- Blend mode for interactive states that don’t require more variables

## Links to Sources

- https://piccalil.li/blog/a-pragmatic-guide-to-modern-css-colours-part-one/
- https://m.youtube.com/shorts/XJhMW2QuBiQ
- https://nerdy.dev/page-and-component-light-dark-strategies
- https://daverupert.com/2026/04/inverted-light-dark/
- https://una.im/contrast-color
- https://www.alwaystwisted.com/articles/UnSassing-my-CSS-colour-functions
- https://www.bram.us/2026/03/19/more-easy-light-dark-mode-switching-light-dark-is-about-to-support-images/
- https://una.im/advanced-contrast-color/
- https://css-tricks.com/approximating-contrast-color-with-other-css-features/
