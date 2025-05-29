import { useFormik } from 'formik'
import { useIntl } from 'react-intl'

import { ReactComponent as IconDraft } from '@/public/static/icons/24px/draft.svg'
import { Form, Icon } from '~/components'
import { ArticleDigestDropdownArticleFragment } from '~/gql/graphql'

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

  const formik = useFormik<{ url: string }>({
    initialValues: { url: '' },
    onSubmit: (values) => {
      console.log(values)
    },
  })

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
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
    </Form>
  )
}
