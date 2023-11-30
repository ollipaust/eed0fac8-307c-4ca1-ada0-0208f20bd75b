# Welcome to Vennew!

**_Vennew_** _strives to be your go-to hub for organizing your musical experiences with ease. Explore upcoming events and concerts featuring your favorite artists or emerging talents, and find the best ticket deals online. Simplify your event journey by conveniently managing trip details, all in one platform._

- The platform is built with [@Remix-run](https://remix.run/docs), a React.js Framework focused on web standards and modern web app UX, to simply build better websites with TypeScript, SCSS & custom Hooks

## LIVE DEMO (CI/CD: Github > Netlify):

https://teclead.ollipaust.dev/

## Prerequisites

Ensure that you meet the following software requirements before starting the installation:

- nvm (Node Version Manager) - Required for managing Node.js versions
- Node.js (Version 18.0.0 or higher)
- npm (Node Package Manager)
- git (for working with Git repositories)
- Netlify CLI (required for local Production Mode development using `netlify serve`)

**Install nvm (Node Version Manager):**

Follow the instructions at [nvm-windows](https://github.com/coreybutler/nvm-windows) to install `nvm`.

```sh
   nvm install 18
   nvm use 18
```

## App Installation Steps:

**1. Clone the Remix project from GitHub into your local directory:**

```sh
   git clone https://github.com/ollipaust/eed0fac8-307c-4ca1-ada0-0208f20bd75b.git vennew
```

**2. Change current directory & open VS Code:**

```sh
   cd vennew
   code . (if you use VSCode)
```

**3. Install peer dependencies:**

```sh
   npm install
```

**4. Install Netlify-Cli:**

```sh
    npm install -g netlify-cli
```

## Development

_Before running dev, make sure you have created a .env file in the root directory and installed the peer dependencies via NPM!_

## Environment Variables

**Create a .env file in the project root directory containing the Google Maps API Key Variable:**

```sh
    GOOGLE_MAPS_API_KEY=YourGoogleMapsApiKey
```

**Run the app in development mode:**

```sh
    npm run dev
```

**Clean up with Prettier:**

```sh
    npm run format
```

## Deployment

**Build the app:**

```sh
    npm run build
```

**Run the app in production mode:**

```sh
    npm run start
```

**Run both build + serve scripts:**

```sh
    npm run produce
```

## Cheers

Feel free to contact me if you want to talk CODE! :)
