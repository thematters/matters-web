import { useState } from 'react'

import { Dialog, Translate } from '~/components'

import { TextId } from '~/common/enums'

import SearchingArea, {
  SearchFilter,
  SearchType,
  SelectNode,
} from './SearchingArea'
import StagingArea, { StagingNode } from './StagingArea'
import styles from './styles.css'

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

  children: ({ open }: { open: () => void }) => React.ReactNode
}

const BaseSearchSelectDialog = ({
  title,
  hint,

  nodes,
  onSave,
  saving,

  searchType,
  searchFilter,

  children,
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
  const toggleSelectStagingNode = (node: SelectNode) => {
    const newNodes = stagingNodes.map(({ node: n, selected: s }) => {
      if (n.id === node.id) {
        return { node, selected: !s }
      }

      return { node: n, selected: s }
    })

    setStagingNodes(newNodes)
  }
  const onClickSave = async () => {
    await onSave(stagingNodes.map(({ node }) => node))
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

        <section className="area">
          <SearchingArea
            inSearchingArea={inSearchingArea}
            searchType={searchType}
            searchFilter={searchFilter}
            toStagingArea={toStagingArea}
            toSearchingArea={toSearchingArea}
            addNodeToStaging={addNodeToStaging}
          />

          <StagingArea
            nodes={stagingNodes}
            toggleSelectNode={toggleSelectStagingNode}
            searchType={searchType}
            hint={hint}
            inStagingArea={inStagingArea}
          />

          <style jsx>{styles}</style>
        </section>
      </Dialog>
    </>
  )
}

export const SearchSelectDialog = (props: SearchSelectDialogProps) => (
  <Dialog.Lazy mounted={<BaseSearchSelectDialog {...props} />}>
    {({ open }) => <>{props.children({ open })}</>}
  </Dialog.Lazy>
)
