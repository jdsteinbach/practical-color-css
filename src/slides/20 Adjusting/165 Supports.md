```css
@supports (color: color-mix(in oklch, red, blue)) {
  .button {
    color: color-mix(
      in oklch,
      var(--button-color),
      var(--foreground-primary) 15%
    );
    background: color-mix(
      in oklch,
      var(--button-color) 10%,
      var(--background-primary)
    );
  }
}
