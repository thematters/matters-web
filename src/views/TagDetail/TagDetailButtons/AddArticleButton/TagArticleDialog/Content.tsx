import { useFormik } from 'formik'
import gql from 'graphql-tag'
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
import { useMutation } from '~/components/GQL'
import SEARCH_ARTICLES from '~/components/GQL/queries/searchArticles'

import { ADD_TOAST, REFETCH_TAG_DETAIL_ARTICLES, TEXT } from '~/common/enums'
import { parseFormSubmitErrors, translate } from '~/common/utils'

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
  closeDialog: () => void
}

interface FormValues {
  name: string
  articles: string[]
}

const TagArticleDialogContent: React.FC<TagArticleDialogContentProps> = ({
  closeDialog,
  id
}) => {
  const [selectedArticles, setSelectedArticles] = useState<any[]>([])
  const [update] = useMutation<PutArticlesTags>(PUT_ARTICLES_TAGS)
  const { lang } = useContext(LanguageContext)

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
    setFieldValue
  } = useFormik<FormValues>({
    initialValues: {
      name: '',
      articles: []
    },
    validate: ({ name, articles }) => {
      if (articles.length <= 0) {
        return {
          name: translate({
            zh_hant: '至少添加一篇作品',
            zh_hans: '至少添加一篇作品',
            lang
          })
        }
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
              content: translate({ id: 'addedArticleTag', lang }),
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

        closeDialog()
      } catch (error) {
        const [messages, codes] = parseFormSubmitErrors(error, lang)
        setFieldError('name', messages[codes[0]])
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
          lang
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
                aria-label={TEXT.zh_hant.delete}
                onClick={() => onDelete(article)}
              >
                <Icon.Clear color="black" />
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
        title={<Translate id="addArticleTag" />}
        close={closeDialog}
        rightButton={SubmitButton}
      />

      <Dialog.Content spacing={[0, 0]} hasGrow>
        {InnerForm}
      </Dialog.Content>
    </>
  )
}

export default TagArticleDialogContent
