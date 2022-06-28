import { useFormik } from 'formik'
import gql from 'graphql-tag'
import _pickBy from 'lodash/pickBy'
import { useRouter } from 'next/router'
import { useContext } from 'react'

import {
  CoverUploader,
  Dialog,
  Form,
  LanguageContext,
  Menu,
  Spinner,
  Translate,
  useMutation,
} from '~/components'
import SEARCH_TAGS from '~/components/GQL/queries/searchTags'

import { ADD_TOAST, ASSET_TYPE, ENTITY_TYPE } from '~/common/enums'
import {
  numAbbr,
  parseFormSubmitErrors,
  stripPunctPrefixSuffix,
  toPath,
  translate,
  validateTagName,
} from '~/common/utils'

import IMAGE_TAG_COVER from '@/public/static/images/tag-cover.png'

import styles from './styles.css'

import { PutTag } from './__generated__/PutTag'

const PUT_TAG = gql`
  mutation PutTag($input: PutTagInput!) {
    putTag(input: $input) {
      id
      content
      cover
      description
    }
  }
`

const DropdownDefaultItem = ({ search }: { search: string }) => {
  return (
    <Menu.Item>
      <span className="search-tag-item">
        <Translate zh_hant="創建" zh_hans="创建" en="Create" />
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
  children,
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
        {items.map((item) => (
          <Menu.Item key={item.content}>
            <span className="search-tag-item">
              <span>{item.content}</span>
              <span className="count">{numAbbr(item.numArticles)}</span>
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

export interface TagDialogContentProps {
  id?: string
  content?: string
  cover?: string | null
  description?: string | null
}

type BaseTagDialogContentProps = {
  closeDialog: () => void
} & TagDialogContentProps

interface FormValues {
  newContent: string
  newCover?: string
  newDescription: string
}

const UNCHANGED_FIELD = 'UNCHANGED_FIELD'

const TagDialogContent: React.FC<BaseTagDialogContentProps> = ({
  id,
  content,
  cover,
  description,
  closeDialog,
}) => {
  const router = useRouter()
  const [update] = useMutation<PutTag>(PUT_TAG, undefined, {
    showToast: false,
  })
  const { lang } = useContext(LanguageContext)
  const isEditing = id && content

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
    setFieldValue,
  } = useFormik<FormValues>({
    initialValues: {
      newContent: content || '',
      newCover: UNCHANGED_FIELD,
      newDescription: description || '',
    },
    validate: ({ newContent }) =>
      _pickBy({
        newContent: validateTagName(newContent, lang),
      }),

    onSubmit: async (
      { newContent, newCover, newDescription },
      { setFieldError, setSubmitting }
    ) => {
      try {
        const result = await update({
          variables: {
            input: {
              id,
              content: newContent,
              description: newDescription,
              ...(newCover !== UNCHANGED_FIELD ? { cover: newCover } : {}),
            },
          },
        })

        window.dispatchEvent(
          new CustomEvent(ADD_TOAST, {
            detail: {
              color: 'green',
              content: <Translate id={id ? 'tagEdited' : 'tagCreated'} />,
              duration: 2000,
            },
          })
        )

        const returnedTagId = result?.data?.putTag?.id
        const returnedTagContent = result?.data?.putTag?.content as string

        setSubmitting(false)

        if (!id) {
          // if created, then redirect to tag detail page
          const path = toPath({
            page: 'tagDetail',
            id: returnedTagId || '',
            content: returnedTagContent,
          })
          router.push(path.href)
        } else {
          closeDialog()
        }
      } catch (error) {
        setSubmitting(false)

        const [messages, codes] = parseFormSubmitErrors(error as any, lang)
        setFieldError('newContent', messages[codes[0]])
      }
    },
  })

  const DropdownContent = id ? DropdownList : DropdownListWithDefaultItem

  const InnerForm = (
    <Form id={formId} onSubmit={handleSubmit}>
      {isEditing && (
        <section className="cover-field">
          <CoverUploader
            assetType={ASSET_TYPE.tagCover}
            cover={cover}
            fallbackCover={IMAGE_TAG_COVER.src}
            entityId={id}
            entityType={ENTITY_TYPE.tag}
            inEditor
            onUpload={(assetId) => setFieldValue('newCover', assetId)}
          />
        </section>
      )}

      <Form.DropdownInput
        label={<Translate id="tagName" />}
        type="text"
        name="newContent"
        placeholder={translate({ id: id ? 'tagName' : 'searchTag', lang })}
        value={values.newContent}
        error={touched.newContent && errors.newContent}
        onBlur={handleBlur}
        onChange={(e) => {
          const newContent = stripPunctPrefixSuffix(e.target.value)
          // console.log('set newContent:', { newContent, old: e.target.value })
          setFieldValue('newContent', newContent)
          // setFieldValue('content', newContent)
          // handleChange(e)
        }}
        dropdownAppendTo={formId}
        dropdownAutoSizing
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
        title={isEditing ? 'editTag' : 'createTag'}
        closeDialog={closeDialog}
        rightButton={SubmitButton}
      />

      <Dialog.Content hasGrow>{InnerForm}</Dialog.Content>
    </>
  )
}

export default TagDialogContent
