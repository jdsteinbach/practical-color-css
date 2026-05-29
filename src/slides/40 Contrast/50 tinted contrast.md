### `color-mix()`

```css
button {
  background: var(--button-color);
  color: color-mix(
    in hsl,
    contrast-color(
      var(--button-color)
    ) 90%,
    var(--button-color) 10%
  );
}
```
