import { useApolloClient } from '@apollo/client'
import { useFormik } from 'formik'
import { useEffect, useState } from 'react'
import AutosizeInput from 'react-input-autosize'
import { useIntl } from 'react-intl'
import { useDebounce } from 'use-debounce'

import { ReactComponent as IconDraft } from '@/public/static/icons/24px/draft.svg'
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

import styles from './styles.module.css'

type CollectionInputProps = {
  collection: ArticleDigestDropdownArticleFragment[]
  onAddArticle: (article: ArticleDigestDropdownArticleFragment) => Promise<void>
  saving?: boolean
}

export const CollectionInput = ({
  collection,
  onAddArticle,
  saving,
}: CollectionInputProps) => {
  const intl = useIntl()
  const client = useApolloClient()

  const [searchKey, setSearchKey] = useState('')
  const [debouncedSearchKey] = useDebounce(searchKey, INPUT_DEBOUNCE)
  const [searchData, setSearchData] = useState<ArticleUrlQueryQuery>()
  const [searchLoading, setSearchLoading] = useState(false)
  const [isDropdownVisible, setIsDropdownVisible] = useState(false)

  const formik = useFormik<{ url: string }>({
    initialValues: { url: '' },
    onSubmit: async (values) => {
      await onAddArticle(
        searchData?.article as ArticleDigestDropdownArticleFragment
      )
      setSearchData(undefined)
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
          fetchPolicy: 'no-cache',
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
    if (searchKey) {
      searchArticle()
    }
  }, [debouncedSearchKey])

  useEffect(() => {
    if (!searchLoading && !!searchData?.article && !saving) {
      setIsDropdownVisible(true)
    }
  }, [searchLoading, searchData?.article, saving])

  return (
    <Dropdown
      focusLock={false}
      content={
        <Menu>
          <Menu.Item
            spacing={[8, 16]}
            bgActiveColor="greyHover"
            onClick={() => {
              formik.setFieldValue('url', searchData?.article?.title)
              formik.handleSubmit()
            }}
          >
            {searchData?.article && (
              <ArticleDigestDropdown
                article={
                  searchData?.article as ArticleDigestDropdownArticleFragment
                }
                related={collection.some(
                  (a) => a.id === searchData?.article?.id
                )}
                titleTextSize={16}
                spacing={[0, 0]}
                bgColor="none"
                disabled
              />
            )}
          </Menu.Item>
        </Menu>
      }
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
          <AutosizeInput
            type="text"
            className={styles.input}
            name="url"
            placeholder={intl.formatMessage({
              defaultMessage:
                'Paste the link of the article you want to curate',
              id: 'reRn/s',
            })}
            autoFocus
            value={formik.values.url}
            onChange={(e) => {
              setIsDropdownVisible(false)
              setSearchKey(e.target.value)
              formik.handleChange(e)
            }}
            onBlur={formik.handleBlur}
            disabled={saving}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                if (searchData?.article) {
                  formik.setFieldValue('url', searchData?.article?.title)
                  formik.handleSubmit()
                } else {
                  toast.error({
                    message: intl.formatMessage({
                      defaultMessage: 'Article does not exist',
                      id: 'eKeBF9',
                    }),
                  })
                }
              }
            }}
          />
          {saving && <SpinnerBlock size={16} noSpacing />}
        </form>
      )}
    </Dropdown>
  )
}
