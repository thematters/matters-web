import { useEffect, useState } from 'react'

import { Dialog, Translate } from '~/components'
import SearchingArea, {
  SearchType,
  SelectNode,
} from '~/components/SearchSelect/SearchingArea'
import StagingArea, {
  CustomStagingAreaProps,
  StagingNode,
} from '~/components/SearchSelect/StagingArea'

import { TextId } from '~/common/enums'

import { SearchExclude, SearchFilter } from '@/__generated__/globalTypes'

/**
 * <SearchSelectForm> is a dialog content for
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

export type SearchSelectFormProps = {
  title: TextId | React.ReactNode
  hint: TextId
  headerLeftButton?: React.ReactNode
  headerRightButtonText?: string | React.ReactNode
  closeDialog: () => void

  nodes?: SelectNode[]
  onSave: (nodes: SelectNode[]) => Promise<any>
  saving?: boolean

  searchType: SearchType
  searchFilter?: SearchFilter
  searchExclude?: SearchExclude

  draggable?: boolean

  createTag?: boolean
  inviteEmail?: boolean

  CustomStagingArea?: (props: CustomStagingAreaProps) => JSX.Element
}

const SearchSelectForm = ({
  title,
  hint,
  CustomStagingArea,
  headerLeftButton,
  headerRightButtonText,
  closeDialog,

  nodes,
  onSave,
  saving,

  searchType,
  searchFilter,
  searchExclude,

  draggable,

  createTag,
  inviteEmail,
}: SearchSelectFormProps) => {
  const initStagingNodes =
    nodes?.map((node) => ({ node, selected: true })) || []

  // area
  const [area, setArea] = useState<Area>('staging')
  const inStagingArea = area === 'staging'
  const inSearchingArea = area === 'searching'
  const toStagingArea = () => setArea('staging')
  const toSearchingArea = () => setArea('searching')

  useEffect(() => {
    setArea('staging')
    setStagingNodes(initStagingNodes)
  }, [])

  // data
  const [stagingNodes, setStagingNodes] =
    useState<StagingNode[]>(initStagingNodes)
  const addNodeToStaging = (node: SelectNode) => {
    setStagingNodes([
      ...stagingNodes.filter(({ node: n }) => n.id !== node.id),
      { node, selected: true },
    ])

    toStagingArea()
  }

  const onClickSave = async () => {
    await onSave(
      stagingNodes.filter(({ selected }) => !!selected).map(({ node }) => node)
    )
  }

  return (
    <>
      <Dialog.Header
        title={title}
        closeDialog={closeDialog}
        closeTextId="close"
        leftButton={headerLeftButton}
        rightButton={
          <Dialog.Header.RightButton
            onClick={onClickSave}
            disabled={stagingNodes.length <= 0}
            text={headerRightButtonText || <Translate id="save" />}
            loading={saving}
          />
        }
      />

      <SearchingArea
        inSearchingArea={inSearchingArea}
        searchType={searchType}
        searchFilter={searchFilter}
        searchExclude={searchExclude}
        toStagingArea={toStagingArea}
        toSearchingArea={toSearchingArea}
        addNodeToStaging={addNodeToStaging}
        createTag={createTag}
        inviteEmail={inviteEmail}
      />

      <StagingArea
        nodes={stagingNodes}
        setNodes={setStagingNodes}
        hint={hint}
        inStagingArea={inStagingArea}
        draggable={draggable}
        CustomStagingArea={CustomStagingArea}
      />
    </>
  )
}

export default SearchSelectForm
