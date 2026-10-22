```css
@supports (color: rgb(from red, r g b)) {
  .button {
    --button-color: var(--blue);

    color: hsl(from var(--button-color) h s calc(l - 15));
    border-color: var(--button-color);
    background: hsl(from var(--button-color) h s 90);
  }
}
