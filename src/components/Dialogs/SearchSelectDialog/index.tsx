import { useState } from 'react'

import { Dialog } from '~/components'

import { TextId } from '~/common/enums'

import SearchingArea, { SearchType, SelectNode } from './SearchingArea'

type Area = 'staging' | 'searching'

interface SearchSelectDialogProps {
  title: TextId | React.ReactElement

  stagingNodes?: SelectNode[]
  onSave: (stagingNodes: SelectNode[]) => void

  searchType: SearchType

  children: ({ open }: { open: () => void }) => React.ReactNode
}

const BaseSearchSelectDialog = ({
  title,

  stagingNodes: initStagingNodes,
  onSave,

  searchType,

  children,
}: SearchSelectDialogProps) => {
  // dialog
  const [showDialog, setShowDialog] = useState(true)
  const open = () => {
    setShowDialog(true)
    setArea('searching')
    setStagingNodes(initStagingNodes || [])
  }
  const close = () => setShowDialog(false)

  // area
  const [area, setArea] = useState<Area>('staging')
  // const isStagingArea = area === 'staging'
  const isSearchingArea = area === 'searching'
  const toStagingArea = () => setArea('staging')
  const toSearchingArea = () => setArea('searching')

  // data
  const [stagingNodes, setStagingNodes] = useState<SelectNode[]>(
    initStagingNodes || []
  )
  const addStagingNodes = (node: SelectNode) => {
    const isExists = stagingNodes.some((n) => n.id === node.id)

    if (!isExists) {
      setStagingNodes([...stagingNodes, node])
    }

    toStagingArea()
  }

  console.log({ stagingNodes, area })

  return (
    <>
      {children({ open })}

      <Dialog isOpen={showDialog} onDismiss={close} fixedHeight>
        <Dialog.Header title={title} close={close} closeTextId="close" />

        <SearchingArea
          isSearchingArea={isSearchingArea}
          searchType={searchType}
          toStagingArea={toStagingArea}
          toSearchingArea={toSearchingArea}
          addStagingNodes={addStagingNodes}
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
