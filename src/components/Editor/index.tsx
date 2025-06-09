import type { FetchResult } from '@apollo/client'

import {
  ArticleDigestDropdownArticleFragment,
  CollectionDigestCollectionPublicFragment,
  DigestTagFragment,
  SetDraftCollectionsMutation,
  SetDraftConnectionsMutation,
  SetDraftTagsMutation,
} from '~/gql/graphql'

export * from './MoreSettings'
export * from './SetCover'
export * from './ToggleResponse'

export type SetConnectionsProps = {
  connections: ArticleDigestDropdownArticleFragment[]
  editConnections: (
    articles: ArticleDigestDropdownArticleFragment[]
  ) => Promise<FetchResult<SetDraftConnectionsMutation> | void | unknown>
  connectionsSaving?: boolean
  nodeExclude?: string
}

export type SetCollectionsProps = {
  collections: CollectionDigestCollectionPublicFragment[]
  editCollections: (
    collections: string[]
  ) => Promise<FetchResult<SetDraftCollectionsMutation> | void | unknown>
  collectionsSaving?: boolean
}

export type SetTagsProps = {
  tags: DigestTagFragment[]
  editTags: (
    tag: DigestTagFragment[]
  ) => Promise<FetchResult<SetDraftTagsMutation> | void | unknown>
  tagsSaving: boolean
}

export type SetPublishISCNProps = {
  iscnPublish?: boolean | null
  togglePublishISCN: (iscnPublish: boolean) => void
  iscnPublishSaving: boolean
}

export type SetResponseProps = {
  canComment: boolean | null
  toggleComment: (canComment: boolean) => void
}

export type SetVersionDescriptionProps = {
  versionDescription: string
  editVersionDescription: (description: string) => void
}
