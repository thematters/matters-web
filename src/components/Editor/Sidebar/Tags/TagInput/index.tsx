import { useQuery } from '@apollo/client'
import { useFormik } from 'formik'
import _uniqBy from 'lodash/uniqBy'
import AutosizeInput from 'react-input-autosize'
import { useIntl } from 'react-intl'

import { ReactComponent as IconHashTag } from '@/public/static/icons/24px/hashtag.svg'
import { ARTICLE_TAGS_MAX_COUNT } from '~/common/enums/article'
import { validateTagName } from '~/common/utils'
import {
  Dropdown,
  Icon,
  ListTag,
  Menu,
  SpinnerBlock,
  toast,
} from '~/components'
import { DigestTagFragment, EditorRecentTagsQuery } from '~/gql/graphql'

import { EDITOR_RECENT_TAGS } from './gql'
import styles from './styles.module.css'

type TagInputProps = {
  tags: DigestTagFragment[]
  onAddTag: (tag: string) => void
  saving?: boolean
}

const TagInput = ({ tags, onAddTag, saving }: TagInputProps) => {
  const formId = 'search-input-tag-form'
  const intl = useIntl()
  const textAriaLabel = intl.formatMessage({
    defaultMessage: 'Input tags',
    id: 'xk1AW6',
  })

  const { values, handleChange, handleSubmit, setFieldValue, handleBlur } =
    useFormik<{
      tag: string
    }>({
      initialValues: { tag: '' },
      onSubmit: (values) => {
        const msg = validateTagName(values.tag, intl)
        if (msg) {
          toast.error({
            message: msg,
          })
          return
        }
        onAddTag(values.tag)
      },
    })

  const { data, loading } = useQuery<EditorRecentTagsQuery>(EDITOR_RECENT_TAGS)

  // recent tags
  const userTagsEdges = data?.viewer?.tags.edges || []

  let recentTags = [...userTagsEdges]?.map((edge) => edge.node)
  // remove duplicated tags
  recentTags = _uniqBy(recentTags, (tag) => tag.content)
  // remove selected tags
  recentTags = recentTags.filter(
    (tag) => !tags.find((t) => t.content === tag.content)
  )

  return (
    <Dropdown
      focusLock={false}
      content={
        <div>
          <Menu>
            {recentTags.slice(0, ARTICLE_TAGS_MAX_COUNT).map((tag) => (
              <Menu.Item
                key={tag.id}
                spacing={[8, 16]}
                bgActiveColor="greyHover"
                onClick={() => {
                  setFieldValue('tag', tag.content)
                  handleSubmit()
                }}
              >
                <ListTag tag={tag} hasCount={false} is="span" />
              </Menu.Item>
            ))}
          </Menu>
        </div>
      }
      placement="bottom-start"
      visible={!loading && recentTags.length > 0 && !saving}
    >
      {({ ref }) => (
        <form
          id={formId}
          className={styles.form}
          onSubmit={handleSubmit}
          ref={ref}
          action=""
          autoComplete="off"
        >
          <Icon icon={IconHashTag} color="greyDark" />
          <AutosizeInput
            type="text"
            name="tag"
            id="search-input-tag"
            autoCorrect="off"
            autoFocus
            value={values.tag}
            disabled={saving}
            aria-label={textAriaLabel}
            placeholder={intl.formatMessage({
              defaultMessage: 'Input tags',
              id: 'xk1AW6',
            })}
            className={styles.input}
            onBlur={handleBlur}
            onChange={handleChange}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                handleSubmit()
              }
            }}
          />
          {saving && <SpinnerBlock size={16} noSpacing />}
        </form>
      )}
    </Dropdown>
  )
}

export default TagInput
