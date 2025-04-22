import { type Editor, Extension, Range } from '@tiptap/core'
import _debounce from 'lodash/debounce'
import _uniq from 'lodash/uniq'

import { INPUT_DEBOUNCE } from '~/common/enums'

interface TextNodesWithPosition {
  text: string
  pos: number
}

/**
 * SmartLink extension can match:
 * - article link and replace it with article title
 */

export interface SmartLinkOptions {
  // RegExp to match link text, must contains a named group `key`
  findRule: RegExp

  // trigger to search and replace the link text by key
  search: ({
    key,
    type,
    replace,
  }: {
    key: string
    type: string
    replace: (text: string) => void
  }) => Promise<void>
}

type Result = { text?: string } & Range

export interface SmartLinkStorage {
  results: { [key: string]: Result }
}

const findAndReplace = ({
  editor,
  findRule,
  key,
  type,
  replace,
}: {
  editor: Editor
  key: string
  type: string
  replace: string
} & Pick<SmartLinkOptions, 'findRule'>) => {
  let textNodesWithPosition: TextNodesWithPosition[] = []
  let index = 0

  editor.state.doc.descendants((node, pos) => {
    if (node.isText) {
      if (textNodesWithPosition[index]) {
        textNodesWithPosition[index] = {
          text: textNodesWithPosition[index].text + node.text,
          pos: textNodesWithPosition[index].pos,
        }
      } else {
        textNodesWithPosition[index] = {
          text: `${node.text}`,
          pos,
        }
      }
    } else {
      index += 1
    }
  })

  textNodesWithPosition = textNodesWithPosition.filter(Boolean)

  for (const element of textNodesWithPosition) {
    const { text, pos } = element
    const matches = Array.from(text.matchAll(findRule)).filter(([matchText]) =>
      matchText.trim()
    )

    for (const m of matches) {
      if (m.index !== undefined && m.groups?.key === key) {
        const from = pos + m.index
        const to = pos + m.index + m[0].length

        // replace
        editor.commands.insertContentAt({ from, to }, replace)
        // editor.view.dispatch(editor.state.tr.insertText(replace, from, to))
        break
      }
    }
  }
}

const findAndSearch = _debounce(
  ({
    editor,
    findRule,
    search,
  }: { editor: Editor } & Pick<SmartLinkOptions, 'findRule' | 'search'>) => {
    const html = editor.getHTML()
    const uniqueLinks = new Map<string, { key: string; type: string }>()

    // find
    const matches = Array.from(html.matchAll(findRule)).filter(([matchText]) =>
      matchText.trim()
    )

    for (const m of matches) {
      const key = m.groups?.key
      const type = m.groups?.type
      if (m.index !== undefined && key && type) {
        const mapKey = `${type}:${key}`
        uniqueLinks.set(mapKey, { key, type })
      }
    }

    // search
    uniqueLinks.forEach(({ key, type }) => {
      search({
        key,
        type,
        replace: (text) => {
          findAndReplace({ editor, findRule, key, type, replace: text })
        },
      })
    })
  },
  INPUT_DEBOUNCE
)

export const SmartLink = Extension.create<SmartLinkOptions>({
  name: 'smartLink',

  onUpdate() {
    // regexp must contains a named group `key` and `type`
    if (this.options.findRule.toString().indexOf('?<key>') === -1) {
      console.error('RegExp must contains a named group `key`')
      return
    }

    if (this.options.findRule.toString().indexOf('?<type>') === -1) {
      console.error('RegExp must contains a named group `type`')
      return
    }

    findAndSearch({ editor: this.editor, ...this.options })
  },
})
