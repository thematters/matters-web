import { FetchResult } from '@apollo/client'
import { useState } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import IconPlus from '@/public/static/icons/24px/plus.svg'
import IconTimes from '@/public/static/icons/24px/times.svg'
import { ARTICLE_TAGS_MAX_COUNT } from '~/common/enums/article'
import { analytics, normalizeTag } from '~/common/utils'
import { Icon, InlineTag, toDigestTagPlaceholder } from '~/components'
import { DigestTagFragment, SetDraftTagsMutation } from '~/gql/graphql'

import Box from '../Box'
import styles from './styles.module.css'
import TagInput from './TagInput'

export interface SidebarTagsProps {
  tags: DigestTagFragment[]
  editTags: (
    tag: DigestTagFragment[]
  ) => Promise<FetchResult<SetDraftTagsMutation> | void | unknown>
  saving?: boolean
  disabled?: boolean
}

const SidebarTags = ({
  tags,
  editTags,
  saving,
  disabled,
}: SidebarTagsProps) => {
  const intl = useIntl()
  const [isEditing, setIsEditing] = useState(false)

  const onAddTag = async (tag: string) => {
    await editTags([...tags, toDigestTagPlaceholder(normalizeTag(tag))])
    setIsEditing(false)
  }

  return (
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
              aria-label={intl.formatMessage({
                defaultMessage: 'Close',
                id: 'rbrahO',
              })}
            >
              <Icon icon={IconTimes} size={24} color="black" />
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className={styles.rightButton}
              aria-label={intl.formatMessage({
                defaultMessage: 'Add Tags',
                id: 'WNxQX0',
              })}
              disabled={tags.length >= ARTICLE_TAGS_MAX_COUNT}
            >
              <Icon icon={IconPlus} size={24} color="black" />
            </button>
          )}
        </>
      }
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
        {isEditing && (
          <div className={styles.tagInput}>
            <TagInput tags={tags} onAddTag={onAddTag} saving={saving} />
          </div>
        )}
      </div>
    </Box>
  )
}

export default SidebarTags
