import { IconHashTag24, Tag } from '~/components'
import { SearchSelectDialog } from '~/components/Dialogs/SearchSelectDialog'
import { SearchSelectNode } from '~/components/Forms/SearchSelectForm'

import Box from '../Box'
import styles from './styles.css'

import { DigestTag } from '~/components/Tag/__generated__/DigestTag'

export interface SidebarTagsProps {
  tags: DigestTag[]
  onEdit: (tag: DigestTag[]) => any
  saving?: boolean
  disabled?: boolean
}

const SidebarTags = ({ tags, onEdit, saving, disabled }: SidebarTagsProps) => {
  return (
    <SearchSelectDialog
      title="addTag"
      hint="hintAddTag"
      searchType="Tag"
      onSave={(nodes: SearchSelectNode[]) => onEdit(nodes as DigestTag[])}
      nodes={tags}
      saving={saving}
      createTag
    >
      {({ openDialog: openAddMyArticlesDialog }) => (
        <Box
          icon={<IconHashTag24 size="md" />}
          title="addTag"
          onClick={openAddMyArticlesDialog}
          disabled={disabled}
        >
          {tags.length > 0 && (
            <ul>
              {tags.map((tag) => (
                <li key={tag.id}>
                  <Tag tag={tag} type="inline" disabled />
                </li>
              ))}

              <style jsx>{styles}</style>
            </ul>
          )}
        </Box>
      )}
    </SearchSelectDialog>
  )
}

export default SidebarTags
