import { analytics } from '~/common/utils'
import {
  EditorSearchSelectDialog,
  IconHashTag24,
  // SearchSelectNode,
  Tag,
} from '~/components'
import { SearchSelectNode } from '~/components/Forms/SearchSelectForm'
import { DigestTagFragment } from '~/gql/graphql'

import TagCustomStagingArea from '../../TagCustomStagingArea'
import Box from '../Box'
import styles from './styles.module.css'

export interface SidebarTagsProps {
  tags: DigestTagFragment[]
  editTags: (tag: DigestTagFragment[]) => any
  saving?: boolean
  disabled?: boolean
}

const SidebarTags = ({
  tags,
  editTags,
  saving,
  disabled,
}: SidebarTagsProps) => {
  return (
    <EditorSearchSelectDialog
      title="addTag"
      hint="hintAddTag"
      searchType="Tag"
      onSave={(nodes: SearchSelectNode[]) =>
        editTags(nodes as DigestTagFragment[])
      }
      nodes={tags}
      saving={saving}
      createTag
      CustomStagingArea={TagCustomStagingArea}
    >
      {({ openDialog }) => (
        <Box
          icon={<IconHashTag24 size="md" />}
          title="addTag"
          subtitle="hintAddTagShort"
          onClick={openDialog}
          disabled={disabled}
        >
          {tags.length > 0 && (
            <ul className={styles.list}>
              {tags.map((tag) => (
                <li key={tag.id}>
                  <Tag
                    tag={tag}
                    type="inline"
                    is="span"
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
        </Box>
      )}
    </EditorSearchSelectDialog>
  )
}

export default SidebarTags
