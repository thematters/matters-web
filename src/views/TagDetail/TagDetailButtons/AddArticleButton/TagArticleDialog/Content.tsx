import { useFormik } from 'formik'
import gql from 'graphql-tag'
import _isEmpty from 'lodash/isEmpty'
import { useContext, useState } from 'react'

import {
  ArticleDigestDropdown,
  Button,
  Dialog,
  DropdownArticleList,
  Form,
  Icon,
  LanguageContext,
  Translate
} from '~/components'
import { getErrorCodes, useMutation } from '~/components/GQL'
import SEARCH_ARTICLES from '~/components/GQL/queries/searchArticles'

import { ADD_TOAST, REFETCH_TAG_DETAIL_ARTICLES, TEXT } from '~/common/enums'
import { translate } from '~/common/utils'

import styles from './styles.css'

import { PutArticlesTags } from './__generated__/PutArticlesTags'

const PUT_ARTICLES_TAGS = gql`
  mutation PutArticlesTags($id: ID!, $articles: [ID!]) {
    putArticlesTags(input: { id: $id, articles: $articles }) {
      id
      articles(input: { first: 0, selected: true }) {
        totalCount
      }
    }
  }
`

const DropdownContent = ({
  callback,
  items,
  loading
}: {
  callback: (params: any) => void
  items: any
  loading: boolean
}) => {
  const articles = (items || []).filter(
    (node: any) => node.__typename === 'Article'
  )
  return (
    <DropdownArticleList
      articles={articles}
      loading={loading}
      onClick={article => {
        callback(article)
      }}
    />
  )
}

interface TagArticleDialogContentProps {
  id?: string
  close: () => void
}

interface FormValues {
  name: string
  articles: string[]
}

const TagArticleDialogContent: React.FC<TagArticleDialogContentProps> = ({
  close,
  id
}) => {
  const [selectedArticles, setSelectedArticles] = useState<any[]>([])
  const [update] = useMutation<PutArticlesTags>(PUT_ARTICLES_TAGS)
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
        if (!id) {
          return
        }

        await update({ variables: { id, articles } })

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
          zh_hant:
            TEXT.zh_hant.error[errorCode] || TEXT.zh_hant.error.UNKNOWN_ERROR,
          zh_hans:
            TEXT.zh_hans.error[errorCode] || TEXT.zh_hant.error.UNKNOWN_ERROR,
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
    setFieldValue(
      'articles',
      values.articles.filter(articleId => articleId !== article.id)
    )
    setSelectedArticles(
      selectedArticles.filter(({ articleId }: any) => articleId !== article.id)
    )
  }

  return (
    <Form id="tag-article-dialog" onSubmit={handleSubmit}>
      <Dialog.Content>
        <Form.DropdownInput
          type="search"
          name="name"
          placeholder={translate({
            zh_hant: '搜尋作品標題…',
            zh_hans: '搜索作品标题…',
            lang
          })}
          value={values.name}
          error={touched.name && errors.name}
          onBlur={handleBlur}
          onChange={handleChange}
          dropdownAppendTo="tag-article-dialog"
          dropdownAutoSizing={true}
          dropdownCallback={onClickMenuItem}
          DropdownContent={DropdownContent}
          query={SEARCH_ARTICLES}
        />
        <ul>
          {selectedArticles.map((article, index) => (
            <li key={index}>
              <ArticleDigestDropdown
                article={article}
                titleTextSize="md-s"
                disabled
                extraButton={
                  <ArticleDigestDropdown.OpenExternalLink article={article} />
                }
                borderRadius="xtight"
                bgColor="grey-lighter"
                spacing={['tight', 'tight']}
              />

              <span className="delete-handler">
                <Button
                  spacing={['base', 0]}
                  aria-label="刪除"
                  onClick={() => onDelete(article)}
                >
                  <Icon.Clear color="black" />
                </Button>
              </span>
            </li>
          ))}
        </ul>
      </Dialog.Content>

      <Dialog.Footer>
        <Dialog.Footer.Button
          type="submit"
          disabled={!_isEmpty(errors) || isSubmitting}
          loading={isSubmitting}
        >
          <Translate
            zh_hant={TEXT.zh_hant.confirm}
            zh_hans={TEXT.zh_hans.confirm}
          />
        </Dialog.Footer.Button>

        <Dialog.Footer.Button
          onClick={close}
          bgColor="grey-lighter"
          textColor="black"
        >
          <Translate
            zh_hant={TEXT.zh_hant.cancel}
            zh_hans={TEXT.zh_hans.cancel}
          />
        </Dialog.Footer.Button>
      </Dialog.Footer>

      <style jsx>{styles}</style>
    </Form>
  )
}

export default TagArticleDialogContent
