import { useQuery } from '@apollo/react-hooks'
import _get from 'lodash/get'
import { useRouter } from 'next/router'
import { useContext } from 'react'

import { Footer, Head, PageHeader, Spinner } from '~/components'
import EmptyTag from '~/components/Empty/EmptyTag'
import { getErrorCodes, QueryError } from '~/components/GQL'
import TAG_DETAIL from '~/components/GQL/queries/tagDetail'
import TagArticleModal from '~/components/Modal/TagArticleModal'
import TagModal from '~/components/Modal/TagModal'
import { ModalInstance } from '~/components/ModalManager'
import Throw404 from '~/components/Throw404'
import { ViewerContext } from '~/components/Viewer'

import { ERROR_CODES } from '~/common/enums'

import styles from './styles.css'
import { TagDetailArticles } from './TagDetailArticles'
import { TagDetailButtons } from './TagDetailButtons'

import { TagDetail } from '~/components/GQL/queries/__generated__/TagDetail'

const ActionButtons = () => {
  const viewer = useContext(ViewerContext)

  if (!viewer.isAdmin || viewer.info.email !== 'hi@matters.news') {
    return null
  }

  return (
    <section className="buttons">
      <TagDetailButtons.AddArticleButton />
      <TagDetailButtons.EditTagButton />
      <style jsx>{styles}</style>
    </section>
  )
}

const TagDetailContainer = () => {
  const router = useRouter()

  const variables = { id: router.query.id }

  const { data, loading, error } = useQuery<TagDetail>(TAG_DETAIL, {
    variables
  })

  if (loading) {
    return <Spinner />
  }

  if (error) {
    const errorCodes = getErrorCodes(error)
    if (errorCodes[0] === ERROR_CODES.ENTITY_NOT_FOUND) {
      return <Throw404 />
    }
    return <QueryError error={error} />
  }

  if (!data || !data.node || data.node.__typename !== 'Tag') {
    return <EmptyTag />
  }

  const tag = data.node
    ? {
        id: data.node.id,
        content: data.node.content,
        description: data.node.description || undefined
      }
    : undefined

  return (
    <>
      <Head title={`#${data.node.content}`} />

      <PageHeader
        title={data.node.content}
        buttons={<ActionButtons />}
        description={data.node.description || ''}
      />

      <TagDetailArticles.Latest id={data.node.id} />

      <ModalInstance modalId="addArticleTagModal" title="addArticleTag">
        {(props: ModalInstanceProps) => (
          <TagArticleModal tagId={tag ? tag.id : undefined} {...props} />
        )}
      </ModalInstance>

      <ModalInstance modalId="editTagModal" title="editTag">
        {(props: ModalInstanceProps) => <TagModal tag={tag} {...props} />}
      </ModalInstance>
    </>
  )
}

export default () => {
  return (
    <main className="l-row">
      <article className="l-col-4 l-col-md-5 l-col-lg-8">
        <TagDetailContainer />
      </article>

      <aside className="l-col-4 l-col-md-3 l-col-lg-4">
        <Footer />
      </aside>
    </main>
  )
}
