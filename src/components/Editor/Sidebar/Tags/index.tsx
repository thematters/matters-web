import { useState } from 'react'
import { FormattedMessage } from 'react-intl'

import { ReactComponent as IconPlus } from '@/public/static/icons/24px/plus.svg'
import { ReactComponent as IconTimes } from '@/public/static/icons/24px/times.svg'
import { ARTICLE_TAGS_MAX_COUNT } from '~/common/enums/article'
import { analytics, normalizeTag } from '~/common/utils'
import {
  EditorSearchSelectDialog,
  Icon,
  InlineTag,
  toDigestTagPlaceholder,
  // SearchSelectNode,
} from '~/components'
import { SearchSelectNode } from '~/components/Forms/SearchSelectForm'
import { DigestTagFragment } from '~/gql/graphql'

import TagCustomStagingArea from '../../TagCustomStagingArea'
import Box from '../Box'
import styles from './styles.module.css'
import TagInput from './TagInput'

export interface SidebarTagsProps {
  tags: DigestTagFragment[]
  editTags: (newTags: DigestTagFragment[]) => Promise<any>
  saving?: boolean
  disabled?: boolean
}

const SidebarTags = ({
  tags,
  editTags,
  saving,
  disabled,
}: SidebarTagsProps) => {
  const [isEditing, setIsEditing] = useState(false)

  const onAddTag = async (tag: string) => {
    await editTags([...tags, toDigestTagPlaceholder(normalizeTag(tag))])
    setIsEditing(false)
  }

  return (
    <EditorSearchSelectDialog
      title={<FormattedMessage defaultMessage="Add Tags" id="WNxQX0" />}
      hint={<FormattedMessage defaultMessage="Add up to 3 tags" id="/5yq4w" />}
      searchType="Tag"
      onSave={(nodes: SearchSelectNode[]) =>
        editTags(nodes as DigestTagFragment[])
      }
      nodes={tags}
      saving={saving}
      createTag
      CustomStagingArea={TagCustomStagingArea}
      dismissOnClickOutside={false}
      dismissOnESC={false}
    >
      {({ openDialog }) => (
        <Box
          title={<FormattedMessage defaultMessage="Add Tags" id="WNxQX0" />}
          subtitle={
            <FormattedMessage defaultMessage="Add up to 3 tags" id="/5yq4w" />
          }
          rightButton={
            <>
              {isEditing ? (
                <button
                  onClick={() => setIsEditing(false)}
                  className={styles.rightButton}
                >
                  <Icon icon={IconTimes} size={24} color="black" />
                </button>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className={styles.rightButton}
                  disabled={tags.length >= ARTICLE_TAGS_MAX_COUNT}
                >
                  <Icon icon={IconPlus} size={24} color="black" />
                </button>
              )}
            </>
          }
          onClick={openDialog}
          disabled={disabled}
        >
          <div className={styles.content}>
            {tags.length > 0 && (
              <ul className={styles.list}>
                {tags.map((tag) => (
                  <li key={tag.id}>
                    <InlineTag
                      tag={tag}
                      onRemoveTag={() => {
                        editTags(tags.filter((t) => t.content !== tag.content))
                        analytics.trackEvent('click_button', {
                          type: 'remove_tag',
                          pageType: 'edit_draft',
                        })
                      }}
                    />
                  </li>
                ))}
              </ul>
            )}
            {isEditing && <TagInput onAddTag={onAddTag} saving={saving} />}
          </div>
        </Box>
      )}
    </EditorSearchSelectDialog>
  )
}

export default SidebarTags
