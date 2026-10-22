```css
@supports (color: light-dark(black, white)) {
  :root {
    color-scheme: light dark;

    --surface-primary: light-dark(#eee, #111);
    --surface-secondary: light-dark(#ccc, #333);
    --text-primary: light-dark(#111, #eee);
    --text-secondary: light-dark(#333, #ccc);
  }
}
