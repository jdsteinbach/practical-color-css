# Practical Refactors with Modern CSS Colors — Detailed Outline

## Statement of Pain

- start with all colors in CSS `var()`s (hex codes in each one), nice simple Figma token export!
- now... all those colors redefined in `prefers-color-scheme(dark)`
- now user pref?! I guess `body` gets classes, `.theme-dark`, `.theme-light` or `data-theme=""` attr?
- CSS is cool about adding selectors with commas: `a {}` can help linkish-buttons: `a, button.link {}` but... you can't chain a media query with a markup selector...
  - `@media (prefers-color-scheme: dark) { /* dark theme vars */ }`
  - `body[data-theme="dark"] { /* dark theme vars */ }`
- but then light pref should override dark MQ...
  - `:root { /* light theme vars */ }`
  - `@media (prefers-color-scheme: dark) { :root { /* dark theme vars */ } }`
  - `@media (prefers-color-scheme: dark) { body[data-theme="light"] { /* light theme vars */ } }`
  - `body[data-theme="dark"] { /* dark theme vars */ }`

## Solutions

### Cleaner Dark Mode

- `light-dark()`
- `color-scheme`

```css
:root {
  --bg: light-dark(#fff, #000);
  --fg: light-dark(#000, #fff);

  color-scheme: light dark;
}
body[data-theme="light"] {
  color-scheme: light;
}
body[data-theme="dark"] {
  color-scheme: dark;
}
```

### Relative Colors

- `mix-blend-mode`
- `rgb()` with implied-alpha: `/` (btw, no `,` needed)
  - only works if `var()` returns `r, g, b` channels
  - also works with `hsl()`, etc - just `/`
- `rgb()` with `from()`
  - `rgb(from var(--page-bg) r g b / 0.7)`
- `hsl()` with `from()`
  - `hsl(from var(--page-bg) h s 65%)`

### Auto-Contrast

- `contrast-color()`
- tinted contrast color

## Conclusion
