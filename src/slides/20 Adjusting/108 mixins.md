```scss
@mixin button($color: $blue) {
  color: color.scale($color, $lightness: -15%);
  border-color: $color;
  background: color.change($color, $lightness: 90%);

  &:hover {
    color: color.scale($color, $lightness: -25%);
    border-color: color.scale($color, $lightness: -15%);
    background: color.change($color, $lightness: 80%);
  }

  /* other interactive states, etc */
}
```
