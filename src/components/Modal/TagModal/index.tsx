import { useFormik } from 'formik'
import gql from 'graphql-tag'
import _isEmpty from 'lodash/isEmpty'
import { useContext } from 'react'

import { Menu, Spinner } from '~/components'
import { Form } from '~/components/Form'
import { getErrorCodes, useMutation } from '~/components/GQL'
import SEARCH_TAGS from '~/components/GQL/queries/searchTags'
import { LanguageContext, Translate } from '~/components/Language'
import { Modal } from '~/components/Modal'

import { ADD_TOAST, TEXT } from '~/common/enums'
import { numAbbr, translate } from '~/common/utils'

import { PutTag } from './__generated__/PutTag'
import styles from './styles.css'

const PUT_TAG = gql`
  mutation PutTag($id: ID, $content: String, $description: String) {
    putTag(input: { id: $id, content: $content, description: $description }) {
      id
      content
      description
    }
  }
`

const DropdownContent = ({
  hideDropdown,
  items,
  loading,
  search,
  width
}: {
  hideDropdown: () => void
  items: any[]
  loading: boolean
  search: string
  width?: number
}) => {
  const menuStyle = width ? { width } : {}
  if (loading) {
    return (
      <Menu style={menuStyle}>
        <Menu.Item>
          <Spinner />
        </Menu.Item>
      </Menu>
    )
  }
  return (
    <>
      <Menu style={menuStyle}>
        {items.map(item => (
          <Menu.Item
            spacing={['xtight', 'tight']}
            hoverBgColor="green"
            key={item.content}
          >
            <button className="search-tag-item" type="button">
              <span>{item.content}</span>
              <span className="search-tag-count">
                {numAbbr(item.articles.totalCount)}
              </span>
            </button>
          </Menu.Item>
        ))}

        {items && items.length > 0 && <Menu.Divider />}

        <Menu.Item spacing={['xtight', 'tight']} hoverBgColor="green">
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
      </Menu>

      <style jsx>{styles}</style>
    </>
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
    isSubmitting
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
        await update({
          variables: { id, content, description }
        })
        setSubmitting(false)
        window.dispatchEvent(
          new CustomEvent(ADD_TOAST, {
            detail: {
              color: 'green',
              content: translate({
                zh_hant: id ? TEXT.zh_hant.tagEdited : TEXT.zh_hant.tagCreated,
                zh_hans: id ? TEXT.zh_hans.tagEdited : TEXT.zh_hans.tagCreated,
                lang
              }),
              closeButton: true,
              duration: 2000
            }
          })
        )
        close()
      } catch (error) {
        const errorCode = getErrorCodes(error)[0]
        const errorMessage = translate({
          zh_hant: TEXT.zh_hant.error[errorCode] || errorCode,
          zh_hans: TEXT.zh_hans.error[errorCode] || errorCode,
          lang
        })
        setFieldError('content', errorMessage)
        setSubmitting(false)
      }
    }
  })

  return (
    <form className="form" onSubmit={handleSubmit}>
      <Modal.Content spacing="small" layout="full-width">
        <p className="field">
          {translate({
            zh_hant: TEXT.zh_hant.tagName,
            zh_hans: TEXT.zh_hans.tagName,
            lang
          })}
        </p>
        <Form.DropdownInput
          type="text"
          field="content"
          placeholder={translate({
            zh_hant: TEXT.zh_hant.searchTag,
            zh_hans: TEXT.zh_hans.searchTag,
            lang
          })}
          values={values}
          errors={errors}
          touched={touched}
          handleBlur={handleBlur}
          handleChange={handleChange}
          dropdownAutoSizing={true}
          DropdownContent={DropdownContent}
          dropdownZIndex={201}
          query={SEARCH_TAGS}
        />
        <p className="field">
          {translate({
            zh_hant: TEXT.zh_hant.tagDescription,
            zh_hans: TEXT.zh_hans.tagDescription,
            lang
          })}
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
      <div className="buttons">
        <Modal.FooterButton onClick={close} bgColor="white">
          <Translate
            zh_hant={TEXT.zh_hant.cancel}
            zh_hans={TEXT.zh_hans.cancel}
          />
        </Modal.FooterButton>
        <Modal.FooterButton
          htmlType="submit"
          disabled={!_isEmpty(errors) || isSubmitting}
          loading={isSubmitting}
        >
          <Translate
            zh_hant={TEXT.zh_hant.confirm}
            zh_hans={TEXT.zh_hans.confirm}
          />
        </Modal.FooterButton>
      </div>
      <style jsx>{styles}</style>
    </form>
  )
}

export default TagModal
