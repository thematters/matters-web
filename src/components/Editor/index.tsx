import type { FetchResult } from '@apollo/client'

import {
  ArticleDigestDropdownArticleFragment,
  DigestTagFragment,
  SetDraftCollectionMutation,
  SetDraftTagsMutation,
} from '~/gql/graphql'

export * from './MoreSettings'
export * from './SetCover'
export * from './ToggleResponse'

export type SetCollectionProps = {
  collection: ArticleDigestDropdownArticleFragment[]
  editCollection: (
    articles: ArticleDigestDropdownArticleFragment[]
  ) => Promise<FetchResult<SetDraftCollectionMutation> | void | unknown>
  collectionSaving?: boolean
  nodeExclude?: string
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
