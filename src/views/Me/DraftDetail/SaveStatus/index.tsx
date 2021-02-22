import React from 'react'

import { TextIcon, Translate } from '~/components'

interface SaveStatus {
  status?: 'saved' | 'saving' | 'saveFailed'
}

const SaveStatus: React.FC<SaveStatus> = ({ status }) => {
  return (
    <TextIcon size="sm" color="grey">
      {status === 'saved' && (
        <Translate zh_hans="草稿已保存" zh_hant="草稿已保存" en="saved" />
      )}
      {status === 'saving' && (
        <Translate zh_hans="草稿保存中" zh_hant="草稿保存中" en="saving" />
      )}
      {status === 'saveFailed' && (
        <Translate
          zh_hans="草稿保存失敗"
          zh_hant="草稿保存失败"
          en="save failed"
        />
      )}
    </TextIcon>
  )
}

export default SaveStatus
