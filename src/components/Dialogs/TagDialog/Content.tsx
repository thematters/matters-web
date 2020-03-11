import { useFormik } from 'formik'
import gql from 'graphql-tag'
import { useContext } from 'react'

import {
  Dialog,
  Form,
  LanguageContext,
  Menu,
  Spinner,
  Translate
} from '~/components'
import { useMutation } from '~/components/GQL'
import SEARCH_TAGS from '~/components/GQL/queries/searchTags'

import { ADD_TOAST } from '~/common/enums'
import {
  numAbbr,
  parseFormSubmitErrors,
  routerPush,
  toPath,
  translate
} from '~/common/utils'

import styles from './styles.css'

import { PutTag } from './__generated__/PutTag'

const PUT_TAG = gql`
  mutation PutTag($id: ID, $content: String, $description: String) {
    putTag(input: { id: $id, content: $content, description: $description }) {
      id
      content
      description
    }
  }
`

const DropdownDefaultItem = ({ search }: { search: string }) => {
  return (
    <Menu.Item>
      <span className="search-tag-item">
        <Translate zh_hant="創建" zh_hans="创建" />
        <span className="keyword">{search}</span>
        <style jsx>{styles}</style>
      </span>
    </Menu.Item>
  )
}

interface DropdownListBaseProps {
  items: any[]
  loading: boolean
  search: string
}

const DropdownList = ({
  items,
  loading,
  search,
  children
}: DropdownListBaseProps & { children?: any }) => {
  if (loading) {
    return (
      <Menu width="sm">
        <Menu.Item>
          <Spinner />
        </Menu.Item>
      </Menu>
    )
  }

  if ((!items || items.length === 0) && !children) {
    return null
  }

  return (
    <>
      <Menu width="sm">
        {items.map(item => (
          <Menu.Item key={item.content}>
            <span className="search-tag-item">
              <span>{item.content}</span>
              <span className="count">{numAbbr(item.articles.totalCount)}</span>
            </span>
          </Menu.Item>
        ))}
        {items && items.length > 0 && children && <Menu.Divider />}
        {children}
      </Menu>
      <style jsx>{styles}</style>
    </>
  )
}

const DropdownListWithDefaultItem = (props: DropdownListBaseProps) => {
  return (
    <DropdownList {...props}>
      <DropdownDefaultItem search={props.search} />
    </DropdownList>
  )
}

interface TagDialogContentProps {
  id?: string
  content?: string
  description?: string
  closeDialog: () => void
}

interface FormValues {
  newContent: string
  newDescription: string
}

const TagDialogContent: React.FC<TagDialogContentProps> = ({
  id,
  content,
  description,
  closeDialog
}) => {
  const [update] = useMutation<PutTag>(PUT_TAG)
  const { lang } = useContext(LanguageContext)

  const formId = 'put-tag-form'

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
      newContent: content || '',
      newDescription: description || ''
    },
    validate: ({ newContent }) => {
      if (!newContent) {
        return {
          newContent: translate({
            zh_hant: '請輸入標籤名稱',
            zh_hans: '請输入标签名称',
            lang
          })
        }
      }
    },
    onSubmit: async (
      { newContent, newDescription },
      { setFieldError, setSubmitting }
    ) => {
      try {
        const result = await update({
          variables: { id, content: newContent, description: newDescription }
        })

        window.dispatchEvent(
          new CustomEvent(ADD_TOAST, {
            detail: {
              color: 'green',
              content: <Translate id={id ? 'tagEdited' : 'tagCreated'} />,
              duration: 2000
            }
          })
        )

        const returnedTagId = result?.data?.putTag?.id

        if (!id) {
          // if created, then redirect to tag detail page
          const path = toPath({ page: 'tagDetail', id: returnedTagId || '' })
          routerPush(path.href, path.as)
        } else {
          closeDialog()
        }
      } catch (error) {
        const [messages, codes] = parseFormSubmitErrors(error, lang)
        setFieldError('newContent', messages[codes[0]])
      }

      setSubmitting(false)
    }
  })

  const DropdownContent = id ? DropdownList : DropdownListWithDefaultItem

  const InnerForm = (
    <Form id={formId} onSubmit={handleSubmit}>
      <Form.DropdownInput
        label={<Translate id="tagName" />}
        type="text"
        name="newContent"
        placeholder={translate({ id: id ? 'tagName' : 'searchTag', lang })}
        value={values.newContent}
        error={touched.newContent && errors.newContent}
        onBlur={e => {
          setFieldValue('content', e.target.value.trim())
          handleBlur(e)
        }}
        onChange={handleChange}
        dropdownAppendTo={formId}
        dropdownAutoSizing={true}
        DropdownContent={DropdownContent}
        query={SEARCH_TAGS}
      />

      <Form.Textarea
        label={<Translate id="tagDescription" />}
        name="newDescription"
        placeholder={translate({ id: 'tagDescriptionPlaceholder', lang })}
        value={values.newDescription}
        error={touched.newDescription && errors.newDescription}
        onBlur={handleBlur}
        onChange={handleChange}
        required
      />
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
        title={content ? 'editTag' : 'createTag'}
        close={closeDialog}
        rightButton={SubmitButton}
      />

      <Dialog.Content spacing={[0, 0]} hasGrow>
        {InnerForm}
      </Dialog.Content>
    </>
  )
}

export default TagDialogContent
