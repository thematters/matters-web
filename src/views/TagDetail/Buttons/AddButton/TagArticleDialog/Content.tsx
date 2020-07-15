import { useFormik } from 'formik'
import gql from 'graphql-tag'
import { useContext, useState } from 'react'

import {
  ArticleDigestDropdown,
  Button,
  Dialog,
  DropdownArticleList,
  Form,
  IconClear,
  LanguageContext,
  Translate,
  useResponsive,
  ViewerContext,
} from '~/components'
import { useMutation } from '~/components/GQL'
import SEARCH_ARTICLES from '~/components/GQL/queries/searchArticles'
import updateTagArticlesCount from '~/components/GQL/updates/tagArticlesCount'

import { ADD_TOAST, REFETCH_TAG_DETAIL_ARTICLES, TEXT } from '~/common/enums'
import { parseFormSubmitErrors, translate } from '~/common/utils'

import styles from './styles.css'

import { TagDetail_node_Tag } from '../../../__generated__/TagDetail'
import { AddArticlesTags } from './__generated__/AddArticlesTags'

const ADD_ARTICLES_TAGS = gql`
  mutation AddArticlesTags($id: ID!, $articles: [ID!], $selected: Boolean) {
    addArticlesTags(
      input: { id: $id, articles: $articles, selected: $selected }
    ) {
      id
      articles(input: { first: 0, selected: $selected }) {
        totalCount
      }
    }
  }
`

const DropdownContent = ({
  callback,
  items,
  loading,
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
      onClick={(article) => {
        callback(article)
      }}
    />
  )
}

interface TagArticleDialogContentProps {
  closeDialog: () => void
  forSelected?: boolean
  tag: TagDetail_node_Tag
}

interface FormValues {
  name: string
  articles: string[]
}

const TagArticleDialogContent: React.FC<TagArticleDialogContentProps> = ({
  closeDialog,
  forSelected = false,
  tag,
}) => {
  const isSmallUp = useResponsive('sm-up')
  const [selectedArticles, setSelectedArticles] = useState<any[]>([])
  const [add] = useMutation<AddArticlesTags>(ADD_ARTICLES_TAGS)
  const { lang } = useContext(LanguageContext)
  const viewer = useContext(ViewerContext)

  const formId = 'put-article-tag-form'

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    isSubmitting,
    isValid,
    setFieldValue,
  } = useFormik<FormValues>({
    initialValues: {
      name: '',
      articles: [],
    },
    validate: ({ name, articles }) => {
      if (articles.length <= 0) {
        return {
          name: translate({
            zh_hant: '至少添加一篇作品',
            zh_hans: '至少添加一篇作品',
            lang,
          }),
        }
      }
    },
    onSubmit: async ({ name, articles }, { setFieldError, setSubmitting }) => {
      try {
        if (!tag.id) {
          return
        }

        await add({
          variables: { id: tag.id, articles, selected: forSelected },
          update: (cache, { data }) => {
            if (forSelected) {
              const newCount = data?.addArticlesTags?.articles?.totalCount || 0
              const oldCount = tag.articles.totalCount || 0
              updateTagArticlesCount({
                cache,
                id: tag.id,
                count: newCount - oldCount,
                type: 'increment',
              })
            }
          },
        })

        setSubmitting(false)

        window.dispatchEvent(
          new CustomEvent(ADD_TOAST, {
            detail: {
              color: 'green',
              content: translate({ id: 'addedArticleTag', lang }),
              duration: 2000,
            },
          })
        )

        window.dispatchEvent(
          new CustomEvent(REFETCH_TAG_DETAIL_ARTICLES, {
            detail: {
              event: 'add',
              differences: articles.length,
            },
          })
        )

        closeDialog()
      } catch (error) {
        const [messages, codes] = parseFormSubmitErrors(error, lang)
        setFieldError('name', messages[codes[0]])
        setSubmitting(false)
      }
    },
  })

  const onClickMenuItem = (params: any) => {
    setFieldValue('name', '')
    if (!values.articles.includes(params.id)) {
      setFieldValue('articles', [...values.articles, params.id])
      setSelectedArticles([...selectedArticles, params])
    }
  }

  const onDelete = (article: any) => {
    setFieldValue(
      'articles',
      values.articles.filter((articleId) => articleId !== article.id)
    )
    setSelectedArticles(
      selectedArticles.filter(({ id: articleId }) => articleId !== article.id)
    )
  }

  const InnerForm = (
    <Form id={formId} onSubmit={handleSubmit}>
      <Form.DropdownInput
        type="search"
        name="name"
        placeholder={translate({
          zh_hant: '搜尋作品標題…',
          zh_hans: '搜索作品标题…',
          lang,
        })}
        value={values.name}
        error={touched.name && errors.name}
        onBlur={handleBlur}
        onChange={handleChange}
        dropdownAppendTo={formId}
        dropdownAutoSizing={true}
        dropdownCallback={onClickMenuItem}
        DropdownContent={DropdownContent}
        query={SEARCH_ARTICLES}
        queryFilter={{ authorId: viewer.id }}
      />

      <ul>
        {selectedArticles.map((article) => (
          <li key={article.id}>
            <ArticleDigestDropdown
              article={article}
              titleTextSize="md-s"
              disabled
              extraButton={
                <ArticleDigestDropdown.OpenExternalLink article={article} />
              }
              borderRadius="xtight"
              bgColor={isSmallUp ? 'grey-lighter' : 'white'}
              spacing={['tight', 'tight']}
            />

            <span className="delete-handler">
              <Button
                spacing={['base', 0]}
                aria-label={TEXT.zh_hant.delete}
                onClick={() => onDelete(article)}
              >
                <IconClear color="black" />
              </Button>
            </span>
          </li>
        ))}

        <style jsx>{styles}</style>
      </ul>
    </Form>
  )

  const SubmitButton = (
    <Dialog.Header.RightButton
      text={<Translate id="confirm" />}
      type="submit"
      form={formId}
      disabled={!isValid || isSubmitting}
      loading={isSubmitting}
    />
  )

  return (
    <>
      <Dialog.Header
        title={forSelected ? 'tagAddSelectedArticle' : 'tagAddArticle'}
        close={closeDialog}
        rightButton={SubmitButton}
      />

      <Dialog.Content hasGrow>{InnerForm}</Dialog.Content>
    </>
  )
}

export default TagArticleDialogContent
