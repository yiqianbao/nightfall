# Nightfall Demo UI

This UI app is for demonstration of Nightfall. Here user can do the following actions

- Conventional ERC-721 transactions. This include user can Mint, transfer and burn ERC-721 tokens.
- Private ERC-721 transactions (Using Nightfall). This include user can Mint (creates a hiding for
  an existing conventional token), hidden transfer and burn (recovers the original token from the
  hiding) ERC-721 tokens.
- Conventional ERC-20 transactions. This include user can Mint, transfer and burn ERC-20 tokens.
- Private ERC-20 transactions (Using Nightfall). This include user can Mint (creates a hiding for an
  existing conventional token), hidden transfer and burn (recovers the original token from the
  hiding) ERC-20 tokens.
- The application can be pointed at any ERC-721 or ERC-20 deployed from the current node.(Future
  development will add pointing this to any ERC-721 and ERC-20)

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically
reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.
Use the `-prod` flag for a production build.

## Generating Documentation

Run `npm run compodoc` to generate documentation of the project. After running this command, a
folder named `documentation` will be created in project directory (ui). To see the detailed
documentation of the project you can simply open the index.html file inside the `documentation`
folder in a browser.
