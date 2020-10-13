import { DataProxy } from 'apollo-cache'
import _omit from 'lodash/omit'

import TAG_MAINTAINERS from '~/components/GQL/queries/tagMaintainers'

import { ERROR_CODES } from '~/common/enums'

import {
  TagMaintainers,
  TagMaintainers_node_Tag_editors,
} from '~/components/GQL/queries/__generated__/TagMaintainers'

const update = ({
  cache,
  id,
  type,
  editors,
}: {
  cache: DataProxy
  id: string
  type: 'add' | 'remove'
  editors: any[]
}) => {
  try {
    if (!id) {
      return
    }

    const variables = { id }
    const cacheData = cache.readQuery<TagMaintainers>({
      query: TAG_MAINTAINERS,
      variables,
    })

    if (!cacheData || !cacheData.node || cacheData.node.__typename !== 'Tag') {
      return
    }

    const currEditors = cacheData.node.editors || []

    switch (type) {
      case 'add': {
        const newEditors = editors.map(
          ({ node }) =>
            _omit(node, ['selected']) as TagMaintainers_node_Tag_editors
        )
        cacheData.node.editors = [...currEditors, ...newEditors]
        break
      }
      case 'remove': {
        const newEditors = currEditors.filter(
          (editor) => !editors.includes(editor.id)
        )
        cacheData.node.editors = newEditors
        break
      }
    }

    cache.writeQuery({
      query: TAG_MAINTAINERS,
      variables,
      data: cacheData,
    })
  } catch (e) {
    if (e.message.startsWith("Can't find field")) {
      console.warn(ERROR_CODES.QUERY_FIELD_NOT_FOUND)
    } else {
      console.error(e)
    }
  }
}

export default update
