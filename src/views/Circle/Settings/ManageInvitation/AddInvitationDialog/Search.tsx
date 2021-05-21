import { useState } from 'react'

import { Dialog, Translate } from '~/components'
import SearchingArea, {
  SelectNode,
} from '~/components/SearchSelect/SearchingArea'
import StagingArea, { StagingNode } from '~/components/SearchSelect/StagingArea'

interface Props {
  close: () => void
  save: ({ nodes }: { nodes: StagingNode[] }) => void
}

type Area = 'staging' | 'searching'

/**
 * This component is about search and select new invitees.
 *
 * Usage:
 *
 * ```tsx
 *   <InviteeSearchEditor close={close} save={save} />
 * ```
 */
const InviteeSearchEditor = ({ close, save }: Props) => {
  // area
  const [area, setArea] = useState<Area>('staging')
  const inStagingArea = area === 'staging'
  const inSearchingArea = area === 'searching'
  const toStagingArea = () => setArea('staging')
  const toSearchingArea = () => setArea('searching')

  // data
  const [stagingNodes, setStagingNodes] = useState<StagingNode[]>([])
  const addNodeToStaging = (node: SelectNode) => {
    const isExists = stagingNodes.some(({ node: n }) => n.id === node.id)

    if (!isExists) {
      setStagingNodes([...stagingNodes, { node, selected: true }])
    }
    toStagingArea()
  }

  const selectedNodes = stagingNodes.filter(({ selected }) => !!selected)
  const disabled = selectedNodes.length === 0

  return (
    <>
      <Dialog.Header
        title="addCircleInvitation"
        close={close}
        closeTextId="cancel"
        rightButton={
          <Dialog.Header.RightButton
            disabled={disabled}
            onClick={() => save({ nodes: selectedNodes })}
            text={<Translate id="confirm" />}
          />
        }
      />
      <SearchingArea
        inSearchingArea={inSearchingArea}
        searchType="Invitee"
        toStagingArea={toStagingArea}
        toSearchingArea={toSearchingArea}
        addNodeToStaging={addNodeToStaging}
        inviteEmail
      />

      <StagingArea
        nodes={stagingNodes}
        setNodes={setStagingNodes}
        hint="hintAddCircleInvitee"
        inStagingArea={inStagingArea}
        draggable={false}
      />
    </>
  )
}

export default InviteeSearchEditor
