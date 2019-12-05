import { useFormik } from 'formik'
import gql from 'graphql-tag'
import _isEmpty from 'lodash/isEmpty'
import { useContext, useState } from 'react'

import { ArticleDigest } from '~/components/ArticleDigest'
import ArticleList from '~/components/Dropdown/ArticleList'
import { Form } from '~/components/Form'
import { getErrorCodes, useMutation } from '~/components/GQL'
import SEARCH_ARTICLES from '~/components/GQL/queries/searchArticles'
import { Icon } from '~/components/Icon'
import { LanguageContext, Translate } from '~/components/Language'
import { Modal } from '~/components/Modal'

import { ADD_TOAST, REFETCH_TAG_DETAIL_ARTICLES, TEXT } from '~/common/enums'
import { translate } from '~/common/utils'
import ICON_DELETE_BLACK_CIRCLE from '~/static/icons/delete-black-circle.svg?sprite'

import { AddArticleTags } from './__generated__/AddArticleTags'
import styles from './styles.css'

const ADD_ARTICLE_TAGS = gql`
  mutation AddArticleTags($id: ID!, $articles: [ID!]) {
    addArticleTags(input: { id: $id, articles: $articles }) {
      id
      content
    }
  }
`

const DropdownContent = ({
  callback,
  hideDropdown,
  items,
  loading
}: {
  callback: (params: any) => void
  hideDropdown: () => void
  items: any
  loading: boolean
}) => {
  const articles = (items || []).filter(
    (node: any) => node.__typename === 'Article'
  )
  return (
    <ArticleList
      articles={articles}
      loading={loading}
      onClick={article => {
        callback(article)
        hideDropdown()
      }}
    />
  )
}

interface ModalProps extends ModalInstanceProps {
  tagId?: string
}

interface FormValues {
  name: string
  articles: string[]
}

const TagArticleModal: React.FC<ModalProps> = ({ close, tagId }) => {
  const [selectedArticles, setSelectedArticles] = useState<any[]>([])
  const [update] = useMutation<AddArticleTags>(ADD_ARTICLE_TAGS)
  const { lang } = useContext(LanguageContext)

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    isSubmitting,
    setFieldValue
  } = useFormik<FormValues>({
    initialValues: {
      name: '',
      articles: []
    },
    validate: ({ name, articles }) => {
      return {
        ...(articles && articles.length === 0
          ? {
              name: translate({
                zh_hant: '至少添加一篇作品',
                zh_hans: '至少添加一篇作品',
                lang
              })
            }
          : {})
      }
    },
    onSubmit: async ({ name, articles }, { setFieldError, setSubmitting }) => {
      try {
        if (!tagId) {
          return
        }

        await update({ variables: { id: tagId, articles } })
        setSubmitting(false)
        window.dispatchEvent(
          new CustomEvent(ADD_TOAST, {
            detail: {
              color: 'green',
              content: translate({
                zh_hant: TEXT.zh_hant.addedArticleTag,
                zh_hans: TEXT.zh_hans.addedArticleTag,
                lang
              }),
              closeButton: true,
              duration: 2000
            }
          })
        )
        window.dispatchEvent(
          new CustomEvent(REFETCH_TAG_DETAIL_ARTICLES, {
            detail: {
              event: 'add',
              differences: articles.length
            }
          })
        )
        close()
      } catch (error) {
        const errorCode = getErrorCodes(error)[0]
        const errorMessage = translate({
          zh_hant: TEXT.zh_hant.error[errorCode] || errorCode,
          zh_hans: TEXT.zh_hans.error[errorCode] || errorCode,
          lang
        })
        setFieldError('name', errorMessage)
        setSubmitting(false)
      }
    }
  })

  const onClickMenuItem = (params: any) => {
    setFieldValue('name', '')
    setFieldValue('articles', [...values.articles, params.id])
    setSelectedArticles([...selectedArticles, params])
  }

  const onDelete = (article: any) => {
    setFieldValue('articles', values.articles.filter(id => id !== article.id))
    setSelectedArticles(
      selectedArticles.filter(({ id }: any) => id !== article.id)
    )
  }

  return (
    <form id="tag-article-modal" className="form" onSubmit={handleSubmit}>
      <Modal.Content spacing="small" layout="full-width">
        <Form.DropdownInput
          type="search"
          field="name"
          placeholder={translate({
            zh_hant: '搜尋作品標題…',
            zh_hans: '搜索作品标题…',
            lang
          })}
          values={values}
          errors={errors}
          touched={touched}
          handleBlur={handleBlur}
          handleChange={handleChange}
          dropdownAppendTo="tag-article-modal"
          dropdownAutoSizing={true}
          dropdownCallback={onClickMenuItem}
          DropdownContent={DropdownContent}
          dropdownZIndex={201}
          query={SEARCH_ARTICLES}
        />
        <ul>
          {selectedArticles.map((article, index) => (
            <li key={index}>
              <ArticleDigest.Dropdown article={article} hasArrow disabled />
              <button
                type="button"
                className="delete-handler"
                aria-label="刪除"
                onClick={() => onDelete(article)}
              >
                <Icon
                  id={ICON_DELETE_BLACK_CIRCLE.id}
                  viewBox={ICON_DELETE_BLACK_CIRCLE.viewBox}
                  size="small"
                />
              </button>
            </li>
          ))}
        </ul>
      </Modal.Content>
      <section className="buttons">
        <Modal.FooterButton onClick={close} bgColor="white">
          <Translate
            zh_hant={TEXT.zh_hant.cancel}
            zh_hans={TEXT.zh_hans.cancel}
          />
        </Modal.FooterButton>
        <Modal.FooterButton
          htmlType="submit"
          disabled={!_isEmpty(errors) || isSubmitting}
          loading={isSubmitting}
        >
          <Translate
            zh_hant={TEXT.zh_hant.confirm}
            zh_hans={TEXT.zh_hans.confirm}
          />
        </Modal.FooterButton>
      </section>
      <style jsx>{styles}</style>
    </form>
  )
}

export default TagArticleModal
