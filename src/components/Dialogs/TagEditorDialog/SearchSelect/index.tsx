import _get from 'lodash/get'
import { useState } from 'react'
import { FormattedMessage } from 'react-intl'

import { ADD_TOAST } from '~/common/enums'
import { Dialog, useMutation } from '~/components'
import UPDATE_TAG_SETTING from '~/components/GQL/mutations/updateTagSetting'
import updateTagMaintainers from '~/components/GQL/updates/tagMaintainers'
import SearchingArea, {
  SelectNode,
} from '~/components/SearchSelect/SearchingArea'
import StagingArea, { StagingNode } from '~/components/SearchSelect/StagingArea'
import { UpdateTagSettingMutation } from '~/gql/graphql'

interface Props {
  id: string

  closeDialog: () => void
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
 *     closeDialog={closeDialog}
 *     toListStep={() => {}}
 *   />
 * ```
 */
const TagSearchSelectEditor = ({ id, closeDialog, toListStep }: Props) => {
  const [update, { loading }] =
    useMutation<UpdateTagSettingMutation>(UPDATE_TAG_SETTING)

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
    const editors = stagingNodes.filter(({ selected }) => !!selected)
    const result = await update({
      variables: {
        input: {
          id,
          type: 'add_editor',
          editors: editors.map(({ node }) => node.id),
        },
      },
      update: (cache) => {
        // filter out matty for local cache update
        const filteredEditors = editors.filter(
          ({ node }) => _get(node, 'displayName') !== 'Matty'
        )
        updateTagMaintainers({
          cache,
          id,
          type: 'add',
          editors: filteredEditors,
        })
      },
    })

    if (!result) {
      return
    }

    window.dispatchEvent(
      new CustomEvent(ADD_TOAST, {
        detail: {
          color: 'green',
          content: (
            <FormattedMessage
              defaultMessage="successfully added collaborator"
              description="src/components/Dialogs/TagEditorDialog/SearchSelect/index.tsx"
            />
          ),
          duration: 2000,
        },
      })
    )

    closeDialog()
  }

  return (
    <>
      <Dialog.Header
        title="tagAddEditor"
        closeDialog={closeDialog}
        closeTextId="cancel"
        rightButton={
          <Dialog.Header.RightButton
            onClick={onClickSave}
            text={<FormattedMessage defaultMessage="Save" description="" />}
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
