```css
@import "tailwindcss"; /* v4 */

@theme {
  --surface-primary: light-dark(#eee, #111);
  --surface-secondary: light-dark(#ccc, #333);
  --text-primary: light-dark(#111, #eee);
  --text-secondary: light-dark(#333, #ccc);
}
```

```html
<!-- media query -->
<html class="scheme-light-dark">

<!-- override -->
<html class="scheme-light">
<html class="scheme-dark">
```
