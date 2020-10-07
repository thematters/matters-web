import { useState } from 'react'

import { Layout, Title } from '~/components'

import Content from '../Content'
import styles from '../styles.css'
import EditModeHeader from './Header'
import EditModeSidebar from './Sidebar'

import { ArticleDigestDropdownArticle } from '~/components/ArticleDigest/Dropdown/__generated__/ArticleDigestDropdownArticle'
import { Asset } from '~/components/GQL/fragments/__generated__/Asset'
import { DigestTag } from '~/components/Tag/__generated__/DigestTag'
import { ArticleDetailPublic_article } from '../__generated__/ArticleDetailPublic'

interface EditModeProps {
  article: ArticleDetailPublic_article
  onEditSaved: () => void
}

const EditMode: React.FC<EditModeProps> = ({ article, onEditSaved }) => {
  const [cover, setCover] = useState<Asset>()
  const [tags, setTags] = useState<DigestTag[]>(article.tags || [])
  const [collection, setCollection] = useState<ArticleDigestDropdownArticle[]>(
    []
  )

  return (
    <Layout.Main
      aside={
        <EditModeSidebar
          article={article}
          cover={cover}
          tags={tags}
          collection={collection}
          setCover={setCover}
          setTags={setTags}
          setCollection={setCollection}
        />
      }
      inEditor
    >
      <Layout.Header
        right={
          <EditModeHeader
            article={article}
            cover={cover}
            tags={tags}
            collection={collection}
            onEditSaved={onEditSaved}
          />
        }
      />

      <section className="content editing">
        <section className="title">
          <Title type="article">{article.title}</Title>
        </section>

        <Content article={article} />
      </section>

      <style jsx>{styles}</style>
    </Layout.Main>
  )
}

export default EditMode
