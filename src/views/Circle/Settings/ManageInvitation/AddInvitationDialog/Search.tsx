import { useState } from 'react'
import { FormattedMessage } from 'react-intl'

import { Dialog } from '~/components'
import SearchingArea, {
  SelectNode,
} from '~/components/SearchSelect/SearchingArea'
import StagingArea, { StagingNode } from '~/components/SearchSelect/StagingArea'

interface Props {
  closeDialog: () => void
  save: ({ nodes }: { nodes: StagingNode[] }) => void
}

type Area = 'staging' | 'searching'

/**
 * This component is about search and select new invitees.
 *
 * Usage:
 *
 * ```tsx
 *   <InviteeSearchEditor closeDialog={closeDialog} save={save} />
 * ```
 */
const InviteeSearchEditor = ({ closeDialog, save }: Props) => {
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

  const SubmitButton = (
    <Dialog.TextButton
      disabled={disabled}
      onClick={() => save({ nodes: selectedNodes })}
      text={<FormattedMessage defaultMessage="Confirm" />}
    />
  )

  return (
    <>
      <Dialog.Header
        title="addCircleInvitation"
        closeDialog={closeDialog}
        rightBtn={SubmitButton}
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

      <Dialog.Footer
        smUpBtns={
          <>
            <Dialog.TextButton
              text={<FormattedMessage defaultMessage="Cancel" />}
              color="greyDarker"
              onClick={closeDialog}
            />
            {SubmitButton}
          </>
        }
      />
    </>
  )
}

export default InviteeSearchEditor
