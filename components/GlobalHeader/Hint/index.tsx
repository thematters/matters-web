import React, { useContext } from 'react'

import { HeaderContext } from '~/components/GlobalHeader/Context'
import { Translate } from '~/components/Language'

import styles from './styles.css'

const Hint = () => {
  const { headerState } = useContext(HeaderContext)

  if (headerState.type !== 'draft') {
    return null
  }

  return (
    <span className="hint">
      {(headerState.state === 'saved' || !headerState.state) && (
        <Translate zh_hans="草稿已保存" zh_hant="草稿已保存" />
      )}
      {headerState.state === 'saving' && (
        <Translate zh_hans="草稿保存中" zh_hant="草稿保存中" />
      )}
      {headerState.state === 'save-failed' && (
        <Translate zh_hans="草稿保存失敗" zh_hant="草稿保存失败" />
      )}
      <style jsx>{styles}</style>
    </span>
  )
}

export default Hint
