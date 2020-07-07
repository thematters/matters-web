import EditCollection, { EditCollectionProps } from './EditCollection'

type EditModeSidebarProps = {
  tags: string[]
  setTags: (tags: string[]) => any
} & EditCollectionProps

const EditModeSidebar = (props: EditModeSidebarProps) => (
  <>
    <EditCollection {...props} />
  </>
)

export default EditModeSidebar
