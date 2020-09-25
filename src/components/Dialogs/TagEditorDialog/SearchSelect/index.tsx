import { useState } from 'react'

import { Dialog, Translate } from '~/components'
import { useMutation } from '~/components/GQL'
import UPDATE_TAG_SETTING from '~/components/GQL/mutations/updateTagSetting'
import SearchingArea, {
  SelectNode,
} from '~/components/SearchSelect/SearchingArea'
import StagingArea, { StagingNode } from '~/components/SearchSelect/StagingArea'

import { ADD_TOAST } from '~/common/enums'

import { UpdateTagSetting } from '~/components/GQL/mutations/__generated__/UpdateTagSetting'

interface Props {
  id: string

  close: () => void
  toListStep: () => void
}

type Area = 'staging' | 'searching'

/**
 * This is a sub-component of <TagEditorDialog>. It allows user to search and
 * select nodes from search results, and then submit selected nodes.
 *
 * Usage:
 *
 * ```tsx
 *   <TagSearchSelectEditor
 *     id={id}
 *     close={close}
 *     toListStep={() => {}}
 *   />
 * ```
 */
const TagSearchSelectEditor = ({ id, close, toListStep }: Props) => {
  const [update, { loading }] = useMutation<UpdateTagSetting>(
    UPDATE_TAG_SETTING
  )

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

  const onClickSave = async () => {
    try {
      const editors = stagingNodes
        .filter(({ selected }) => !!selected)
        .map(({ node }) => node.id)
      const result = await update({
        variables: { input: { id, type: 'add_editor', editors } },
      })

      if (!result) {
        throw new Error('add tag editors failed')
      }

      window.dispatchEvent(
        new CustomEvent(ADD_TOAST, {
          detail: {
            color: 'green',
            content: (
              <Translate zh_hant="添加協作者成功" zh_hans="添加协作者成功" />
            ),
            duration: 2000,
          },
        })
      )

      close()
    } catch (error) {
      throw error
    }
  }

  return (
    <>
      <Dialog.Header
        title="tagAddEditor"
        close={close}
        closeTextId="cancel"
        rightButton={
          <Dialog.Header.RightButton
            onClick={onClickSave}
            text={<Translate id="save" />}
            loading={loading}
          />
        }
      />

      <SearchingArea
        inSearchingArea={inSearchingArea}
        searchType="User"
        toStagingArea={toStagingArea}
        toSearchingArea={toSearchingArea}
        addNodeToStaging={addNodeToStaging}
      />

      <StagingArea
        nodes={stagingNodes}
        setNodes={setStagingNodes}
        hint="tagAddEditor"
        inStagingArea={inStagingArea}
        draggable={false}
      />
    </>
  )
}

export default TagSearchSelectEditor
