```css
@supports (color: color-contrast(blue)) {
  .button {
    --button-color: var(--blue);

    color: color-contrast(var(--button-color));
    background: var(--button-color);
  }
}
