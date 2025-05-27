import { useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl'

import IconPlus from '@/public/static/icons/24px/plus.svg'
import {
  MAX_ARTICLE_COLLECT_LENGTH,
  MAX_ARTICLE_TAG_LENGTH,
  TEST_ID,
} from '~/common/enums'
import { Dialog, Icon, TextIcon, Translate } from '~/components'
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
  title: React.ReactNode
  hint: React.ReactNode
  headerRightButtonText?: string | React.ReactNode

  back?: () => void
  closeDialog: () => void
  submitCallback?: () => void

  nodes?: SelectNode[]
  onSave: (nodes: SelectNode[]) => Promise<any>
  saving?: boolean

  searchType: SearchType
  searchFilter?: SearchFilter
  searchExclude?: SearchExclude
  nodeExclude?: string

  draggable?: boolean

  createTag?: boolean

  CustomStagingArea?: (props: CustomStagingAreaProps) => JSX.Element
}

const EditorSearchSelectForm = ({
  title,
  hint,
  CustomStagingArea,
  headerRightButtonText,

  back,
  closeDialog,
  submitCallback,

  nodes,
  onSave,
  saving,

  searchType,
  searchFilter,
  searchExclude,
  nodeExclude,

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
    // FIXME: Switching back to the staging area when clicking on a search result entry triggers an ObservableQuery error
    // https://github.com/apollographql/apollo-client/issues/5231#issuecomment-1275764711
    setTimeout(() => {
      toStagingArea()
    }, 1000)
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

  const SubmitButton = (
    <Dialog.TextButton
      onClick={submitCallback || closeDialog}
      // disabled={stagingNodes.length <= 0}
      text={
        headerRightButtonText || (
          <FormattedMessage defaultMessage="Done" id="JXdbo8" />
        )
      }
      loading={saving}
    />
  )

  return (
    <>
      <Dialog.Header
        title={title}
        closeDialog={closeDialog}
        rightBtn={SubmitButton}
      />

      <Dialog.Content noSpacing fixedHeight>
        {inStagingArea && (
          <button
            className={styles.stagingHeadArea}
            onClick={toSearchingArea}
            disabled={!enableAdd}
            data-test-id={TEST_ID.EDITOR_SEARCH_SELECT_FORM_DIALOG_ADD_BUTTON}
          >
            <TextIcon
              icon={<Icon icon={IconPlus} size={20} />}
              color={enableAdd ? 'green' : 'grey'}
              size={15}
              spacing={8}
            >
              {searchType === 'Tag' && (
                <Translate en="Add tag" zh_hans="添加标签" zh_hant="添加標籤" />
              )}
              {searchType === 'Article' && (
                <Translate en="Add" zh_hans="关联作品" zh_hant="關聯作品" />
              )}
            </TextIcon>
            <span className={styles.number}>
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
            nodeExclude={nodeExclude}
            stagingNodes={stagingNodes}
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
      </Dialog.Content>

      <Dialog.Footer
        smUpBtns={
          <>
            <Dialog.TextButton
              text={
                back ? (
                  <FormattedMessage defaultMessage="Back" id="cyR7Kh" />
                ) : (
                  <FormattedMessage defaultMessage="Cancel" id="47FYwb" />
                )
              }
              color="greyDarker"
              onClick={back || closeDialog}
            />
            {SubmitButton}
          </>
        }
      />
    </>
  )
}

export default EditorSearchSelectForm
