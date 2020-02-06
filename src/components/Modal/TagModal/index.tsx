import { useFormik } from 'formik'
import gql from 'graphql-tag'
import _isEmpty from 'lodash/isEmpty'
import Router from 'next/router'
import { useContext } from 'react'

import { Menu, Spinner } from '~/components'
import { Form } from '~/components/Form'
import { getErrorCodes, useMutation } from '~/components/GQL'
import SEARCH_TAGS from '~/components/GQL/queries/searchTags'
import { LanguageContext, Translate } from '~/components/Language'
import { Modal } from '~/components/Modal'

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

const DropdownDefaultItem = ({
  hideDropdown,
  search
}: {
  hideDropdown: () => void
  search: string
}) => {
  return (
    <Menu.Item>
      <button
        className="search-tag-item create"
        type="button"
        onClick={() => hideDropdown()}
      >
        <span className="hint">
          <Translate zh_hant="創建" zh_hans="创建" />
        </span>
        <span className="keyword">{search}</span>
      </button>
    </Menu.Item>
  )
}

interface DropdownListBaseProps {
  hideDropdown: () => void
  items: any[]
  loading: boolean
  search: string
}

const DropdownList = ({
  hideDropdown,
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
            <button className="search-tag-item" type="button">
              <span>{item.content}</span>
              <span className="search-tag-count">
                {numAbbr(item.articles.totalCount)}
              </span>
            </button>
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
      <DropdownDefaultItem
        hideDropdown={props.hideDropdown}
        search={props.search}
      />
    </DropdownList>
  )
}

interface ModalProps extends ModalInstanceProps {
  tag?: {
    id: string
    content: string
    description?: string
  }
}

interface FormValues {
  content: string
  description: string
}

const TagModal: React.FC<ModalProps> = ({ close, tag }) => {
  const id = tag ? tag.id : undefined
  const [update] = useMutation<PutTag>(PUT_TAG)
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
      content: tag ? tag.content : '',
      description: tag ? tag.description || '' : ''
    },
    validate: ({ content, description }) => {
      return {
        ...(!content
          ? {
              content: translate({
                zh_hant: '請輸入標籤名稱',
                zh_hans: '請输入标签名称',
                lang
              })
            }
          : {})
      }
    },
    onSubmit: async (
      { content, description },
      { setFieldError, setSubmitting }
    ) => {
      try {
        const result = await update({
          variables: { id, content, description }
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
          close()
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

  return (
    <form id="tag-modal" className="form" onSubmit={handleSubmit}>
      <Modal.Content spacing="sm" layout="full-width">
        <p className="field">
          <Translate
            zh_hant={TEXT.zh_hant.tagName}
            zh_hans={TEXT.zh_hans.tagName}
          />
        </p>
        <Form.DropdownInput
          type="text"
          field="content"
          placeholder={translate({
            zh_hant: id ? TEXT.zh_hant.tagName : TEXT.zh_hant.searchTag,
            zh_hans: id ? TEXT.zh_hans.tagName : TEXT.zh_hans.searchTag,
            lang
          })}
          values={values}
          errors={errors}
          touched={touched}
          handleBlur={(e: any) => {
            setFieldValue('content', e.target.value.trim())
            handleBlur(e)
          }}
          handleChange={handleChange}
          dropdownAppendTo="tag-modal"
          dropdownAutoSizing={true}
          DropdownContent={DropdownContent}
          query={SEARCH_TAGS}
        />
        <p className="field">
          <Translate
            zh_hant={TEXT.zh_hant.tagDescription}
            zh_hans={TEXT.zh_hans.tagDescription}
          />
        </p>
        <Form.Textarea
          field="description"
          placeholder={translate({
            zh_hant: TEXT.zh_hant.tagDescriptionPlaceholder,
            zh_hans: TEXT.zh_hans.tagDescriptionPlaceholder,
            lang
          })}
          values={values}
          errors={errors}
          touched={touched}
          handleBlur={handleBlur}
          handleChange={handleChange}
          style={{ height: '5rem' }}
        />
      </Modal.Content>
      <section className="buttons">
        <Modal.FooterButton onClick={close} bgColor="white">
          <Translate
            zh_hant={TEXT.zh_hant.cancel}
            zh_hans={TEXT.zh_hans.cancel}
          />
        </Modal.FooterButton>
        <Modal.FooterButton
          type="submit"
          disabled={!_isEmpty(errors) || isSubmitting}
          loading={isSubmitting}
        >
          <Translate
            zh_hant={TEXT.zh_hant.confirm}
            zh_hans={TEXT.zh_hans.confirm}
          />
        </Modal.FooterButton>
      </section>
      <style jsx>{styles}</style>
    </form>
  )
}

export default TagModal
