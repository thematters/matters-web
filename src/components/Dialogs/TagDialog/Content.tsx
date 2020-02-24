import { useFormik } from 'formik'
import gql from 'graphql-tag'
import _isEmpty from 'lodash/isEmpty'
import Router from 'next/router'
import { useContext } from 'react'

import {
  Dialog,
  Form,
  LanguageContext,
  Menu,
  Spinner,
  Translate
} from '~/components'
import { getErrorCodes, useMutation } from '~/components/GQL'
import SEARCH_TAGS from '~/components/GQL/queries/searchTags'

import { ADD_TOAST, TEXT } from '~/common/enums'
import { numAbbr, toPath, translate } from '~/common/utils'

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

  const formId = 'tag-edit-form'

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

      return {}
    },
    onSubmit: async (
      { newContent, newDescription },
      { setFieldError, setSubmitting }
    ) => {
      try {
        const result = await update({
          variables: { id, content: newContent, description: newDescription }
        })

        setSubmitting(false)

        window.dispatchEvent(
          new CustomEvent(ADD_TOAST, {
            detail: {
              color: 'green',
              content: (
                <Translate
                  zh_hant={
                    id ? TEXT.zh_hant.tagEdited : TEXT.zh_hant.tagCreated
                  }
                  zh_hans={
                    id ? TEXT.zh_hans.tagEdited : TEXT.zh_hans.tagCreated
                  }
                />
              ),
              duration: 2000
            }
          })
        )

        const returnedTagId = result?.data?.putTag?.id

        if (!id) {
          // if created, then redirect to tag detail page
          const path = toPath({ page: 'tagDetail', id: returnedTagId || '' })
          Router.push(path.as)
        } else {
          closeDialog()
        }
      } catch (error) {
        const errorCode = getErrorCodes(error)[0]
        const errorMessage = translate({
          zh_hant:
            TEXT.zh_hant.error[errorCode] || TEXT.zh_hant.error.UNKNOWN_ERROR,
          zh_hans:
            TEXT.zh_hans.error[errorCode] || TEXT.zh_hans.error.UNKNOWN_ERROR,
          lang
        })
        setFieldError('content', errorMessage)
        setSubmitting(false)
      }
    }
  })

  const DropdownContent = id ? DropdownList : DropdownListWithDefaultItem

  const SubmitButton = (
    <Dialog.Header.RightButton
      text={
        <Translate
          zh_hant={TEXT.zh_hant.confirm}
          zh_hans={TEXT.zh_hans.confirm}
        />
      }
      type="submit"
      form={formId}
      disabled={!_isEmpty(errors) || isSubmitting}
      loading={isSubmitting}
    />
  )

  return (
    <>
      <Dialog.Header
        title={
          <Translate
            zh_hant={content ? TEXT.zh_hant.editTag : TEXT.zh_hant.createTag}
            zh_hans={content ? TEXT.zh_hans.editTag : TEXT.zh_hans.createTag}
          />
        }
        close={closeDialog}
        rightButton={SubmitButton}
      />

      <Dialog.Content spacing={[0, 0]}>
        <Form id={formId} onSubmit={handleSubmit}>
          <Form.DropdownInput
            label={
              <Translate
                zh_hant={TEXT.zh_hant.tagName}
                zh_hans={TEXT.zh_hans.tagName}
              />
            }
            type="text"
            name="newContent"
            placeholder={translate({
              zh_hant: id ? TEXT.zh_hant.tagName : TEXT.zh_hant.searchTag,
              zh_hans: id ? TEXT.zh_hans.tagName : TEXT.zh_hans.searchTag,
              lang
            })}
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
            label={
              <Translate
                zh_hant={TEXT.zh_hant.tagDescription}
                zh_hans={TEXT.zh_hans.tagDescription}
              />
            }
            name="newDescription"
            placeholder={translate({
              zh_hant: TEXT.zh_hant.tagDescriptionPlaceholder,
              zh_hans: TEXT.zh_hans.tagDescriptionPlaceholder,
              lang
            })}
            value={values.newDescription}
            error={touched.newDescription && errors.newDescription}
            onBlur={handleBlur}
            onChange={handleChange}
            required
          />
        </Form>
      </Dialog.Content>
    </>
  )
}

export default TagDialogContent
