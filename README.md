## Start local dev

- Install dependencies: `npm i`
- Run `npm run dev`, then go to `http://localhost:3000/`

## Build and run production server

`npm run build && npm run start`

## Routing

We customized routes with Express in `server.ts` and disabled [fs routing](https://github.com/zeit/next.js#disabling-file-system-routing).

Note that we need to specify `href` (the path inside pages directory + query string) and `as` (the path that will be renderer on browser URL bar) props in `<Link>` component.

For instances:

```jsx
// Homepage
<Link href="/" as="/">

// All Authors
<Link href="/Authors" as="/authors">

// User Comments
<Link href="/User/Comments?username=matty" as="/@matty/comments">

// Tag Detail
<Link href="/TagDetail?id=RHJhZnQ6MQ==" as="/tags/RHJhZnQ6MQ==">
```

See [next.js docs](https://github.com/zeit/next.js#routing) for more details.
