# matters-web

![Deployment Status](https://github.com/thematters/matters-web/workflows/Deployment/badge.svg) ![Build Status](https://github.com/thematters/matters-web/workflows/Test%20Build/badge.svg) ![Test Status](https://github.com/thematters/matters-web/workflows/Test%20E2E/badge.svg) [![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

## Getting Started

### Start local dev

- Install [commitizen](https://github.com/commitizen/cz-cli) globally: `npm install commitizen -g`
- Install dependencies: `npm i`
- Environment variables: `cp .env.local.example .env.local`
- Run `npm run gen:type`
- Run `npm run i18n`
- Run `npm run dev`, then go to `http://localhost:3000/`

### Build and run production server

`npm run build && npm run start`

### Start local dev with Docker

- Environment variables: `cp .env.local.example .env`
- Set command alias: `source bin/dc-alias`
- Build docker image: `dc build`
- Run:
  - `dc up` or `dc run --service-ports web npm run dev`
  - then go to `http://localhost:3000/`

> NOTE: If new packages are added to package.json, `dc up` will use `npm i` to install those packages. But if you are using `dc run --service-ports web npm run dev`, you need to run `dc run web npm i` manually to make sure that new packages are installed.

### Build with docker

- Set command alias: `source bin/dc-alias`
- `dc run web npm run build`

### Push and pull docker image

- Set command alias: `source bin/dc-alias`
- Build docker image: `dc build`
- aws configure, then input your access key and secret
- Login AWS ECR with `$(aws ecr get-login --no-include-email --region ap-southeast-1)`
- Push:
  - `docker push 903380195283.dkr.ecr.ap-southeast-1.amazonaws.com/matters-web:latest`
  - `docker tag matters-web:latest 903380195283.dkr.ecr.ap-southeast-1.amazonaws.com/matters-web:latest`
- Pull:
  - `docker pull 903380195283.dkr.ecr.ap-southeast-1.amazonaws.com/matters-web:latest`
  - `docker tag 903380195283.dkr.ecr.ap-southeast-1.amazonaws.com/matters-web:latest matters-web:latest`

## Testing

See [Playwright Testing Guide](https://www.notion.so/matterslab/Playwright-Testing-Guide-60caa248d5ce4d70938b7b2f2c7e9139).

## Conventions

See [Conventions](https://www.notion.so/matterslab/Conventions-acbed6763f6746319396978c19340d78).

## Static Files

```bash
./public/static/
├── apple-touch-icon.png # favicons
├── favicon-16x16.png
├── icon-96x96.png
├── icons # icons in different sizes
│   ├── 12px
│   │   ├── ...
│   │   └── draft-edit.svg
│   ├── 72px
│   │   ├── ...
│   │   └── empty-warning.svg
│   └── stripe.svg
├── images # illustrations
│   ├── ...
│   └── publish-4.svg
├── manifest.json # configurations
└── opensearch.xml
```

### Icon

We use [SVGR](https://react-svgr.com/) to transform SVGs into React components. For reusability and bundle optimization:

- If the icon color isn't static:
  - Replace the values of `fill` and `stroke` attributes with `currentColor`, and
  - Add `fill="none"` to `<svg>`.

## Caching

Apollo Client provides powerful caching capabilities that help optimize performance and user experience. There are 3 main approaches to update the cache:

- **Automatic Updates**: Apollo automatically updates the cache for entities with matching IDs
- **Refetching Queries**: Force refetch queries after mutations to ensure fresh data
- **Manual Updates**: Directly modify the cache for complex scenarios

### 1. Automatic Updates

```tsx
const TOGGLE_PIN = gql`
  mutation TogglePin($id: ID!, $pinned: Boolean!) {
    editArticle(input: { id: $id, pinned: $pinned }) {
      id
      pinned
    }
  }
`
```

**When to use:** For simple mutations that modify a single entity's properties.

**Key point:** Make sure your mutation returns the same fields that your queries request, including the `id` field.

### 2. Refetching Queries

```tsx
// Update cache by evicting the old data and force to refetch the related queries
const [updateArticle] = useMutation(UPDATE_ARTICLE_MUTATION, {
  update(cache, { data: { updateArticle } }) {
    cache.evict({ id: cache.identify(article) })
    cache.gc()
  },
  onQueryUpdated(observableQuery) {
    return observableQuery.refetch()
  },
})

// Or without mutation
client.refetchQueries({
  updateCache: (cache) => {
    cache.evict({ id: cache.identify(article) })
    cache.gc()
  },
  include: ['ArticleDetailPublic'], // Optional: specify queries to refetch
})

// Update cache by refetching the given queries
// Note: We prefer `update` & `onQueryUpdated` over `refetchQueries`
// as we don't need to know which queries are affected by the mutation
const [updateArticle] = useMutation(UPDATE_ARTICLE_MUTATION, {
  refetchQueries: [
    'ArticleDetailPublic', // By query name
    { query: ARTICLE_DETAIL_PUBLIC, variables: { shortHash } }, // With variables
  ],
})
```

**When to use:** When mutations affect multiple entities or when you need to ensure the UI reflects the latest server state. Useful after complex operations like publishing content or when automatic updates aren't sufficient. This approach ensures all related pages and components are updated with the latest data.

### 3. Manual Updates

```tsx
// use readQuery and writeQuery
const [addComment] = useMutation(ADD_COMMENT, {
  update(cache, { data: { addComment } }) {
    const { article } = cache.readQuery({
      query: GET_ARTICLE,
      variables: { id: articleId },
    })

    cache.writeQuery({
      query: GET_ARTICLE,
      variables: { id: articleId },
      data: {
        article: {
          ...article,
          comments: [...article.comments, addComment],
        },
      },
    })
  },
})

// use cache.modify
const [deleteComment] = useMutation(DELETE_COMMENT, {
  update(cache, { data: { deleteComment } }) {
    cache.modify({
      id: cache.identify({ __typename: 'Article', id: articleId }),
      fields: {
        comments(existingComments = [], { readField }) {
          return existingComments.filter(
            (commentRef) => readField('id', commentRef) !== deleteComment.id
          )
        },
      },
    })
  },
})
```

**When to use:** For operations that modify relationships between entities, when invalidating stale data. This approach is useful for updating the current page's data without requiring a full refetch.

### Common Patterns

- **Optimistic Updates**: Immediately update UI before server responds
- **Cache Normalization**: Apollo stores entities by ID to avoid duplication
- **Pagination**: Use field policies with `keyArgs` for paginated data
- **Type Policies**: Configure how specific types are stored and merged

For more details, see the [Mutations](https://www.apollographql.com/docs/react/data/mutations), [Refetching queries](https://www.apollographql.com/docs/react/data/refetching), and [Caching in Apollo Client](https://www.apollographql.com/docs/react/caching/overview).

## Tools

### VS Code

#### Settings

See `.vscode/settings.json`

#### Extensions

See `.vscode/extensions.json`

### Vim

#### Settings

For vim users, you might want to see `.vim/.vimrc` (using vim-plug).
