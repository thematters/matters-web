import EditCollection, { EditCollectionProps } from './EditCollection'
import EditTags, { EditTagsProps } from './EditTags'

type EditModeSidebarProps = EditTagsProps & EditCollectionProps

const EditModeSidebar = (props: EditModeSidebarProps) => (
  <>
    <EditTags {...props} />
    <EditCollection {...props} />
  </>
)

export default EditModeSidebar
