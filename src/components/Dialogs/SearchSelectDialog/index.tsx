import { useState } from 'react'

import { Dialog, Translate } from '~/components'
import SearchingArea, {
  SearchFilter,
  SearchType,
  SelectNode,
} from '~/components/SearchSelect/SearchingArea'
import StagingArea, { StagingNode } from '~/components/SearchSelect/StagingArea'

import { TextId } from '~/common/enums'

/**
 * <SearchSelectDialog> is a dialog component for
 * searching nodes (article, tag, and user),
 * select and submit them to the component used it.
 *
 * It composed of three main components:
 *
 * - <SearchInput>: typing keyword for searching nodes.
 *
 * - <SearchingArea>: showing the above search results,
 *                    click node will add it to the staging area.
 *
 * - <StagingArea>: managing staging nodes, selected nodes will be submitted.
 *
 */
type Area = 'staging' | 'searching'

export type SearchSelectNode = SelectNode

interface SearchSelectDialogProps {
  title: TextId | React.ReactElement
  hint: TextId

  nodes?: SelectNode[]
  onSave: (nodes: SelectNode[]) => Promise<any>
  saving?: boolean

  searchType: SearchType
  searchFilter?: SearchFilter

  draggable?: boolean

  children: ({ open }: { open: () => void }) => React.ReactNode

  // to create a new tag
  creatable?: boolean
}

const BaseSearchSelectDialog = ({
  title,
  hint,

  nodes,
  onSave,
  saving,

  searchType,
  searchFilter,

  draggable,

  children,

  creatable,
}: SearchSelectDialogProps) => {
  const initStagingNodes =
    nodes?.map((node) => ({ node, selected: true })) || []

  // dialog
  const [showDialog, setShowDialog] = useState(true)
  const open = () => {
    setShowDialog(true)
    setArea('staging')
    setStagingNodes(initStagingNodes)
  }
  const close = () => setShowDialog(false)

  // area
  const [area, setArea] = useState<Area>('staging')
  const inStagingArea = area === 'staging'
  const inSearchingArea = area === 'searching'
  const toStagingArea = () => setArea('staging')
  const toSearchingArea = () => setArea('searching')

  // data
  const [stagingNodes, setStagingNodes] = useState<StagingNode[]>(
    initStagingNodes
  )
  const addNodeToStaging = (node: SelectNode) => {
    const isExists = stagingNodes.some(({ node: n }) => n.id === node.id)

    if (!isExists) {
      setStagingNodes([...stagingNodes, { node, selected: true }])
    }

    toStagingArea()
  }

  const onClickSave = async () => {
    await onSave(
      stagingNodes.filter(({ selected }) => !!selected).map(({ node }) => node)
    )
    close()
  }

  return (
    <>
      {children({ open })}

      <Dialog isOpen={showDialog} onDismiss={close} fixedHeight>
        <Dialog.Header
          title={title}
          close={close}
          closeTextId="close"
          rightButton={
            <Dialog.Header.RightButton
              onClick={onClickSave}
              text={<Translate id="save" />}
              loading={saving}
            />
          }
        />

        <SearchingArea
          inSearchingArea={inSearchingArea}
          searchType={searchType}
          searchFilter={searchFilter}
          toStagingArea={toStagingArea}
          toSearchingArea={toSearchingArea}
          addNodeToStaging={addNodeToStaging}
          creatable={creatable}
        />

        <StagingArea
          nodes={stagingNodes}
          setNodes={setStagingNodes}
          hint={hint}
          inStagingArea={inStagingArea}
          draggable={draggable}
        />
      </Dialog>
    </>
  )
}

export const SearchSelectDialog = (props: SearchSelectDialogProps) => (
  <Dialog.Lazy mounted={<BaseSearchSelectDialog {...props} />}>
    {({ open }) => <>{props.children({ open })}</>}
  </Dialog.Lazy>
)
