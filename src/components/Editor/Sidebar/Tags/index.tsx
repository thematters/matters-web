import _uniq from 'lodash/uniq'

import { IconHashTagMedium, Tag } from '~/components'
import {
  SearchSelectDialog,
  SearchSelectNode,
} from '~/components/Dialogs/SearchSelectDialog'

import Box from '../Box'
import styles from './styles.css'

import { DigestTag } from '~/components/Tag/__generated__/DigestTag'

interface AddTagsProps {
  tags: DigestTag[]
  onEdit: (tag: DigestTag[]) => any
  saving?: boolean
  disabled?: boolean
}

const AddTags = ({ tags, onEdit, saving, disabled }: AddTagsProps) => {
  return (
    <SearchSelectDialog
      title="addTag"
      hint="hintAddTag"
      searchType="Tag"
      onSave={(nodes: SearchSelectNode[]) => onEdit(nodes as DigestTag[])}
      nodes={tags}
      saving={saving}
      creatable
    >
      {({ open: openAddMyArticlesDialog }) => (
        <Box
          icon={<IconHashTagMedium size="md" />}
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

  // const hasTags = tags.length > 0
  // const tagsContainerClasses = classNames({
  //   'tags-container': true,
  //   'u-area-disable': disabled,
  // })

  // return (
  //   <Collapsable title={<Translate id="tag" />} defaultCollapsed={!hasTags}>
  //     <p className="tags-intro">
  //       <Translate id="hintAddTag" />
  //     </p>

  //     <section className={tagsContainerClasses}>
  //       {tags.map((tag) => (
  //         <Tag tag={tag} deleteTag={onDeleteTag} key={tag} />
  //       ))}

  //       <SearchTags addTag={onAddTag} />
  //     </section>

  //     <style jsx>{styles}</style>
  //   </Collapsable>
  // )
}

export default AddTags
