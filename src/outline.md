
# Practical Refactors with Modern CSS Colors — Detailed Outline

## 1. Introduction
James Steinbach presents a hands-on session focused on modern CSS color features. The talk aims to show how to simplify color tokens, dark mode, and theming using new CSS capabilities. By leveraging these features, developers can reduce the number of variables, avoid duplication, and write code with clearer intent, making stylesheets easier to maintain and understand.

## 2. The Problem
When design tokens are introduced into a codebase, complexity often increases. Developers strive for a single source of truth for colors, but soon need transparent variants for borders, overlays, and focus states. This leads to Sass color functions, raw RGB channel variables, or other workarounds that clutter the code and increase cognitive overhead ([UnSassing My CSS Colour Functions](https://www.alwaystwisted.com/articles/UnSassing-my-CSS-colour-functions)).

Dark mode introduces further challenges. Supporting `prefers-color-scheme` means redefining variables for dark mode, and user preferences require theme classes that duplicate color logic. The result is repeated code and a reliance on preprocessors like Sass, which signals that native CSS solutions are overdue ([A Pragmatic Guide to Modern CSS Colours](https://piccalil.li/blog/a-pragmatic-guide-to-modern-css-colours-part-one/)).

## 3. The Solution: Modern CSS Color Features
Modern CSS introduces features that address these pain points directly. By refactoring a real codebase step by step, we can simplify tokens, remove duplication, and clarify theme logic. The outcomes are measurable: less CSS shipped, fewer variables, and code that’s easier to maintain. The talk will demonstrate these improvements in a practical, hands-on way ([Modern CSS Colors - YouTube](https://m.youtube.com/shorts/XJhMW2QuBiQ)).

## 4. Practical Patterns & Techniques

**Using `light-dark()` Function**  
The `light-dark()` function allows you to define a color that automatically switches between light and dark variants based on the user’s color scheme. For example:

```css
color: light-dark(#222, #eee);
```

This reduces the need for custom properties and media queries for basic color switching ([More Easy Light/Dark Mode Switching](https://www.bram.us/2026/03/19/more-easy-light-dark-mode-switching-light-dark-is-about-to-support-images/)).

**Toggling Styles with `color-scheme` Override**  
The `color-scheme` property lets you specify which color themes your component supports. By setting `color-scheme: light dark;`, you enable the browser’s built-in form controls and scrollbars to adapt automatically:

```css
:root {
  color-scheme: light dark;
}
```

This can be combined with custom theming for a seamless experience ([Inverted Light/Dark](https://daverupert.com/2026/04/inverted-light-dark/)).

**CSS Relative Colors**  
Relative color syntax allows you to derive new colors from existing ones, reducing duplication. For example, you can create a transparent overlay based on a base color:

```css
--overlay: rgb(from var(--base) r g b / 0.5);
```

This approach eliminates the need for extra variables or Sass functions ([A Pragmatic Guide to Modern CSS Colours](https://piccalil.li/blog/a-pragmatic-guide-to-modern-css-colours-part-one/)).

**New RGB Implied Alpha Syntax**  
Modern CSS lets you specify alpha directly in the color function, making it easier to create transparent variants:

```css
background: rgb(34 34 34 / 0.8);
```

This is more concise and readable than older approaches.

**Blend Mode for Interactive States**  
Instead of defining multiple color variables for hover and active states, you can use blend modes to create interactive effects:

```css
.button:hover {
  mix-blend-mode: lighten;
}
```

This reduces the number of variables and keeps your CSS DRY ([Page and Component Light/Dark Strategies](https://nerdy.dev/page-and-component-light-dark-strategies)).

**Accessibility: `contrast-color()` Function**  
The `contrast-color()` function (currently experimental) helps ensure text is readable against any background by automatically picking a contrasting color:

```css
color: contrast-color(var(--bg), #000, #fff);
```

This is especially useful for dynamic themes and improves accessibility ([Contrast Color](https://una.im/contrast-color), [Advanced Contrast Color](https://una.im/advanced-contrast-color/), [Approximating Contrast Color with Other CSS Features](https://css-tricks.com/approximating-contrast-color-with-other-css-features/)).

## 5. Hands-On Refactor (Live Demo)
The talk will walk through a real-world refactor, applying these modern CSS color techniques to an existing codebase. Each step will be measured for impact: performance gains, reduced CSS size, and improved maintainability. Attendees will see practical before-and-after examples and learn how to adopt these patterns in their own projects.

## 6. Scope (Topics Covered)
The session covers:
- Using `light-dark()` for automatic theme switching
- Leveraging `color-scheme` for native UI adaptation
- Creating relative colors and using RGB implied alpha for transparency
- Using blend modes for interactive states
- Ensuring accessibility with `contrast-color()`

## 7. References & Further Reading
- [A Pragmatic Guide to Modern CSS Colours (Piccalilli)](https://piccalil.li/blog/a-pragmatic-guide-to-modern-css-colours-part-one/)
- [Modern CSS Colors (YouTube Short)](https://m.youtube.com/shorts/XJhMW2QuBiQ)
- [Page and Component Light/Dark Strategies (nerdy.dev)](https://nerdy.dev/page-and-component-light-dark-strategies)
- [Inverted Light/Dark (Dave Rupert)](https://daverupert.com/2026/04/inverted-light-dark/)
- [Contrast Color (Una Kravets)](https://una.im/contrast-color)
- [UnSassing My CSS Colour Functions (Always Twisted)](https://www.alwaystwisted.com/articles/UnSassing-my-CSS-colour-functions)
- [More Easy Light/Dark Mode Switching (Bram.us)](https://www.bram.us/2026/03/19/more-easy-light-dark-mode-switching-light-dark-is-about-to-support-images/)
- [Advanced Contrast Color (Una Kravets)](https://una.im/advanced-contrast-color/)
- [Approximating Contrast Color with Other CSS Features (CSS-Tricks)](https://css-tricks.com/approximating-contrast-color-with-other-css-features/)
