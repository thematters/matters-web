import { useEffect, useState } from 'react'

import {
  MAX_ARTICLE_COLLECT_LENGTH,
  MAX_ARTICLE_TAG_LENGTH,
  TEST_ID,
  TextId,
} from '~/common/enums'
import { Dialog, IconAdd16, TextIcon, Translate } from '~/components'
import SearchingArea, {
  SearchType,
  SelectNode,
} from '~/components/SearchSelect/SearchingArea/EditorSearchingArea'
import StagingArea, {
  CustomStagingAreaProps,
  StagingNode,
} from '~/components/SearchSelect/StagingArea'
import { SearchExclude, SearchFilter } from '~/gql/graphql'

import styles from './styles.module.css'

/**
 * <EditorSearchSelectForm> is a dialog content for
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

export type EditorSearchSelectFormProps = {
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

  CustomStagingArea?: (props: CustomStagingAreaProps) => JSX.Element
}

const EditorSearchSelectForm = ({
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
}: EditorSearchSelectFormProps) => {
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
  const addNodeToStaging = async (node: SelectNode) => {
    setStagingNodes([
      ...stagingNodes.filter(({ node: n }) => n.id !== node.id),
      { node, selected: true },
    ])
    await onSave([
      ...stagingNodes
        .filter(({ node: n }) => n.id !== node.id)
        .map(({ node }) => node),
      node,
    ])
    toStagingArea()
  }

  const syncStagingNodes = async (nodes: StagingNode[]) => {
    setStagingNodes(nodes)
    await onSave(nodes.map(({ node }) => node))
  }

  const maxNodesLength =
    searchType === 'Article'
      ? MAX_ARTICLE_COLLECT_LENGTH
      : MAX_ARTICLE_TAG_LENGTH

  const enableAdd = stagingNodes.length < maxNodesLength

  return (
    <>
      <Dialog.Header
        title={title}
        closeDialog={closeDialog}
        closeTextId="close"
        leftButton={<></>}
        rightButton={
          <Dialog.Header.RightButton
            onClick={closeDialog}
            // disabled={stagingNodes.length <= 0}
            text={headerRightButtonText || <Translate id="done" />}
            loading={saving}
          />
        }
      />

      {inStagingArea && (
        <button
          className={styles['stagingHeadArea']}
          onClick={toSearchingArea}
          disabled={!enableAdd}
          data-test-id={TEST_ID.EDITOR_SEARCH_SELECT_FORM_DIALOG_ADD_BUTTON}
        >
          <TextIcon
            icon={<IconAdd16 size="md-s" />}
            color={enableAdd ? 'green' : 'grey'}
            size="md-s"
            spacing="xtight"
          >
            {searchType === 'Tag' && (
              <Translate en="Add tag" zh_hans="添加标签" zh_hant="添加標籤" />
            )}
            {searchType === 'Article' && (
              <Translate en="Add" zh_hans="关联作品" zh_hant="關聯作品" />
            )}
          </TextIcon>
          <span className={styles['number']}>
            （{stagingNodes.length}/{maxNodesLength}）
          </span>
        </button>
      )}

      {inSearchingArea && (
        <SearchingArea
          inSearchingArea={inSearchingArea}
          searchType={searchType}
          searchFilter={searchFilter}
          searchExclude={searchExclude}
          toStagingArea={toStagingArea}
          toSearchingArea={toSearchingArea}
          addNodeToStaging={addNodeToStaging}
          createTag={createTag}
          CustomStagingArea={
            CustomStagingArea && (
              <CustomStagingArea
                nodes={stagingNodes}
                setNodes={syncStagingNodes}
                hint={hint}
                toStagingArea={toStagingArea}
              />
            )
          }
          autoFocus
        />
      )}
      {inStagingArea && (
        <StagingArea
          nodes={stagingNodes}
          setNodes={syncStagingNodes}
          hint={hint}
          inStagingArea={inStagingArea}
          draggable={draggable}
          CustomStagingArea={CustomStagingArea}
        />
      )}
    </>
  )
}

export default EditorSearchSelectForm
