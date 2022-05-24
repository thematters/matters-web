import { ArticleDigestDropdownArticle } from '~/components/ArticleDigest/Dropdown/__generated__/ArticleDigestDropdownArticle'
import { DigestTag } from '~/components/Tag/__generated__/DigestTag'

export * from './SetCover'
export * from './ToggleAccess'

export type SetCollectionProps = {
  collection: ArticleDigestDropdownArticle[]
  editCollection: (articles: ArticleDigestDropdownArticle[]) => Promise<any>
  collectionSaving?: boolean
}

export type SetTagsProps = {
  tags: DigestTag[]
  editTags: (tag: DigestTag[]) => Promise<any>
  tagsSaving: boolean
}

export type SetPublishISCNProps = {
  iscnPublish?: boolean | null
  togglePublishISCN: (iscnPublish: boolean) => void // Promise<any>
  iscnPublishSaving: boolean
}
