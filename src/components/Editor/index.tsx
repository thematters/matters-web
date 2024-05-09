import {
  ArticleDigestDropdownArticleFragment,
  DigestTagFragment,
} from '~/gql/graphql'

export * from './SetCover'
export * from './ToggleAccess'
export * from './ToggleResponse'

export type SetCollectionProps = {
  collection: ArticleDigestDropdownArticleFragment[]
  editCollection: (
    articles: ArticleDigestDropdownArticleFragment[]
  ) => Promise<any>
  collectionSaving?: boolean
  nodeExclude?: string
}

export type SetTagsProps = {
  tags: DigestTagFragment[]
  editTags: (tag: DigestTagFragment[]) => Promise<any>
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
  editVersionDescription: (description: string) => any
}
