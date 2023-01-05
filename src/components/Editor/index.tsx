import {
  ArticleDigestDropdownArticleFragment,
  DigestTagFragment,
} from '~/gql/graphql'

export * from './SetCover'
export * from './ToggleAccess'

export type SetCollectionProps = {
  collection: ArticleDigestDropdownArticleFragment[]
  editCollection: (
    articles: ArticleDigestDropdownArticleFragment[]
  ) => Promise<any>
  collectionSaving?: boolean
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
