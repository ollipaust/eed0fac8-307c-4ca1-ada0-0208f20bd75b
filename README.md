# Welcome to Vennew!

```
Vennew strives to be your go-to hub for organizing your musical experiences with ease. Explore upcoming events and concerts featuring your favorite artists or emerging talents, and find the best ticket deals online. Simplify your event journey by conveniently managing trip details, all in one platform.
```

- The platform is built with [Remix Docs](https://remix.run/docs), TypeScript and powered by Elasticsearch
- Styling is provided by Styled-Components
  
## Development

**Run the app in development mode:**

```sh
pnpm run dev
```

## Deployment

**Build the app:**

```sh
npm run build
```

**Run the app in production mode:**

```sh
npm start
```


### Roadmap

**Setup Remix Project:**

- Init new Repository on Github named with UUID4: eed0fac8-307c-4ca1-ada0-0208f20bd75b
- Analyze requirements
- Create README.md with setup instructions and project roadmap

**Design System and UI Components:**

- Install Styled-Components
- Establish a design system for consistent styling
- Develop reusable UI components using Styled-Components

**Integrate TypeScript:**

- Configure TypeScript for static typing and improved code quality

**Integrate Reactivesearch:**

*[ReactiveSearch](https://opensource.appbase.io/reactivesearch/) is an open-source UI components library for React and React Native that works out of the box with appbase.io and Elasticsearch backends*

- Install package @appbaseio/reactivesearch
- Integrate Provider
- Check JSON Data resource:https://teclead-ventures.github.io/data/london-events.json

**CORS Analysis log:**
```sh
Sending GET request to https://teclead-ventures.github.io/data/london-events.json

Fired XHR event: loadstart
Fired XHR event: readystatechange
Fired XHR event: readystatechange
Fired XHR event: progress
Fired XHR event: progress
Fired XHR event: readystatechange
Fired XHR event: load
XHR status: 200
XHR status text:
XHR exposed response headers:
cache-control: max-age=600
content-length: 22787
content-type: application/json; charset=utf-8
expires: Wed, 22 Nov 2023 09:17:27 GMT
last-modified: Thu, 10 Nov 2022 15:20:03 GMT
CORS Request
```

**CORS Analysis summary:**

The provided log indicates that a GET request to the [API](https://teclead-ventures.github.io/data/london-events.json) was successful (status code 200), and the server returned a JSON response. The absence of CORS-related errors suggests that the resource is publicly accessible, making it suitable for use in a local development environment.
