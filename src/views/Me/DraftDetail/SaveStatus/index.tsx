import React from 'react'

import { TextIcon, Translate } from '~/components'

interface SaveStatus {
  status?: 'saved' | 'saving' | 'saveFailed'
}

const SaveStatus: React.FC<SaveStatus> = ({ status }) => {
  return (
    <TextIcon size={14} color="grey">
      {status === 'saved' && (
        <Translate zh_hans="草稿已保存" zh_hant="草稿已儲存" en="Draft Saved" />
      )}
      {status === 'saving' && (
        <Translate
          zh_hans="草稿保存中"
          zh_hant="草稿儲存中"
          en="Saving Draft"
        />
      )}
      {status === 'saveFailed' && (
        <Translate
          zh_hans="草稿保存失敗"
          zh_hant="草稿儲存失败"
          en="Failed to save draft"
        />
      )}
    </TextIcon>
  )
}

export default SaveStatus
