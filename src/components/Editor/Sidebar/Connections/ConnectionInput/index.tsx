import { useApolloClient } from '@apollo/client'
import { useFormik } from 'formik'
import { useEffect, useState } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { useDebounce } from 'use-debounce'

import IconDraft from '@/public/static/icons/24px/draft.svg'
import { INPUT_DEBOUNCE } from '~/common/enums'
import { extractShortHashFromUrl } from '~/common/utils/url'
import {
  ArticleDigestDropdown,
  Dropdown,
  Icon,
  Menu,
  SpinnerBlock,
  toast,
} from '~/components'
import { ARTICLE_URL_QUERY } from '~/components/SearchSelect/SearchingArea/gql'
import {
  ArticleDigestDropdownArticleFragment,
  ArticleUrlQueryQuery,
} from '~/gql/graphql'

import InputAutosize from '../../InputAutosize'
import styles from './styles.module.css'

type ConnectionInputProps = {
  connections: ArticleDigestDropdownArticleFragment[]
  onAddArticle: (article: ArticleDigestDropdownArticleFragment) => Promise<void>
  saving?: boolean
}

type DropdownMenuProps = {
  article: ArticleDigestDropdownArticleFragment | null
  connections: ArticleDigestDropdownArticleFragment[]
  onSelectArticle: () => void
}

const renderFoundArticle = (
  article: ArticleDigestDropdownArticleFragment,
  connections: ArticleDigestDropdownArticleFragment[],
  onSelectArticle: () => void
) => {
  const isRelated = connections.some((a) => a.id === article.id)
  return (
    <Menu.Item
      spacing={[8, 16]}
      bgActiveColor="greyHover"
      onClick={onSelectArticle}
    >
      <ArticleDigestDropdown
        article={article}
        relatedNode={
          isRelated && (
            <section className={styles.related}>
              <FormattedMessage defaultMessage="Curated" id="0xVT+0" />
            </section>
          )
        }
        nameColor={isRelated ? 'grey' : 'black'}
        titleTextSize={16}
        titleIs="span"
        titleTextWeight="normal"
        titleColor={isRelated ? 'greyDark' : 'black'}
        spacing={[0, 0]}
        bgColor="none"
        disabled
      />
    </Menu.Item>
  )
}

const DropdownMenu = ({
  article,
  connections,
  onSelectArticle,
}: DropdownMenuProps) => {
  if (!article) {
    return null
  }

  return (
    <Menu>{renderFoundArticle(article, connections, onSelectArticle)}</Menu>
  )
}

export const ConnectionInput = ({
  connections,
  onAddArticle,
  saving,
}: ConnectionInputProps) => {
  const intl = useIntl()
  const client = useApolloClient()

  const [searchKey, setSearchKey] = useState('')
  const [debouncedSearchKey] = useDebounce(searchKey, INPUT_DEBOUNCE)
  const [searchData, setSearchData] = useState<ArticleUrlQueryQuery>()
  const [searchLoading, setSearchLoading] = useState(false)

  const formik = useFormik<{ url: string }>({
    initialValues: { url: '' },
    onSubmit: async () => {
      if (searchLoading) {
        return
      }

      if (!searchData?.article || searchData.article.state === 'archived') {
        toast.error({
          message: intl.formatMessage({
            defaultMessage: 'Article does not exist',
            id: 'eKeBF9',
          }),
        })
        return
      }

      if (searchData.article.author.isBlocking) {
        toast.error({
          message: intl.formatMessage({
            defaultMessage: 'You do not have permission to perform this action',
            id: '2/C36c',
          }),
        })
        return
      }

      await onAddArticle(
        searchData.article as ArticleDigestDropdownArticleFragment
      )
      setSearchData(undefined)
      formik.resetForm()
      setSearchKey('')
    },
  })

  useEffect(() => {
    const searchArticle = async () => {
      setSearchData(undefined)
      setSearchLoading(true)
      const shortHash = extractShortHashFromUrl(debouncedSearchKey)

      try {
        const response = await client.query({
          query: ARTICLE_URL_QUERY,
          variables: { shortHash },
        })

        if (response.data.article) {
          setSearchData(response.data)
        } else {
          toast.error({
            message: intl.formatMessage({
              defaultMessage: 'Article does not exist',
              id: 'eKeBF9',
            }),
          })
        }
      } catch (error) {
        console.error(error)
      } finally {
        setSearchLoading(false)
      }
    }

    if (debouncedSearchKey) {
      searchArticle()
    }
  }, [debouncedSearchKey])

  const handleSelectArticle = () => {
    if (searchData?.article) {
      formik.setFieldValue('url', searchData.article.title)
      formik.handleSubmit()
    }
  }

  const isDropdownVisible = !searchLoading && !!searchData?.article && !saving

  const inputPlaceholder = intl.formatMessage({
    defaultMessage: 'Paste the article link',
    id: 'n5C/Rj',
  })

  const dropdownContent = (
    <DropdownMenu
      article={
        searchData?.article as ArticleDigestDropdownArticleFragment | null
      }
      connections={connections}
      onSelectArticle={handleSelectArticle}
    />
  )

  return (
    <Dropdown
      focusLock={false}
      content={dropdownContent}
      placement="bottom-start"
      visible={isDropdownVisible}
    >
      {({ ref }) => (
        <form
          className={styles.form}
          onSubmit={formik.handleSubmit}
          autoComplete="off"
          ref={ref}
        >
          <Icon icon={IconDraft} color="greyDark" />
          <InputAutosize
            type="text"
            className={styles.input}
            name="url"
            placeholder={inputPlaceholder}
            autoFocus
            value={formik.values.url}
            onChange={(e) => {
              setSearchKey(e.target.value)
              formik.handleChange(e)
            }}
            onBlur={formik.handleBlur}
            disabled={saving}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                formik.handleSubmit()
              }
            }}
          />
          {(saving || searchLoading) && <SpinnerBlock size={16} noSpacing />}
        </form>
      )}
    </Dropdown>
  )
}
