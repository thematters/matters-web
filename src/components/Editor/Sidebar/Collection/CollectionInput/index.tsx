import { useFormik } from 'formik'
import { useEffect, useState } from 'react'
import { useIntl } from 'react-intl'
import { useDebounce } from 'use-debounce'

import { ReactComponent as IconDraft } from '@/public/static/icons/24px/draft.svg'
import { INPUT_DEBOUNCE } from '~/common/enums'
import { extractShortHashFromUrl } from '~/common/utils/url'
import { Form, Icon } from '~/components'
import {
  ArticleDigestDropdownArticleFragment,
  QuickResultQuery,
} from '~/gql/graphql'

import styles from './styles.module.css'

type CollectionInputProps = {
  collection: ArticleDigestDropdownArticleFragment[]
  onAddArticle: (article: ArticleDigestDropdownArticleFragment) => void
  saving?: boolean
}

export const CollectionInput = ({
  collection,
  onAddArticle,
  saving,
}: CollectionInputProps) => {
  const intl = useIntl()

  const [searchKey, setSearchKey] = useState('')
  const [debouncedSearchKey] = useDebounce(searchKey, INPUT_DEBOUNCE)
  const [, setSearchData] = useState<QuickResultQuery>()
  const [, setSearchLoading] = useState(false)

  const formik = useFormik<{ url: string }>({
    initialValues: { url: '' },
    onSubmit: (values) => {
      console.log({ values })
    },
  })

  useEffect(() => {
    const searchTags = async () => {
      setSearchData(undefined)
      setSearchLoading(true)
      const shortHash = extractShortHashFromUrl(debouncedSearchKey)
      if (!shortHash) {
        return
      }
      console.log({ shortHash })
    }
    if (searchKey) {
      searchTags()
    }
  }, [debouncedSearchKey])

  return (
    <Form
      className={styles.form}
      onSubmit={formik.handleSubmit}
      autoComplete="off"
    >
      <Icon icon={IconDraft} color="greyDark" />
      <input
        type="text"
        name="url"
        placeholder={intl.formatMessage({
          defaultMessage: 'Paste the link of the article you want to curate',
          id: 'reRn/s',
        })}
        autoFocus
        value={formik.values.url}
        onChange={(e) => {
          setSearchKey(e.target.value)
          formik.handleChange(e)
        }}
        onBlur={formik.handleBlur}
      />
    </Form>
  )
}
