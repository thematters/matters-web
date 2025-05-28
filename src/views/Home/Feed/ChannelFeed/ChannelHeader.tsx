import gql from 'graphql-tag'
import { useContext } from 'react'

import { LanguageContext } from '~/components'
import {
  CurationChannelHeaderFragment,
  TopicChannelHeaderFragment,
} from '~/gql/graphql'

import styles from '../styles.module.css'

const fragments = {
  topicChannel: gql`
    fragment TopicChannelHeader on TopicChannel {
      id
      nameZhHant: name(input: { language: zh_hant })
      nameZhHans: name(input: { language: zh_hans })
      nameEn: name(input: { language: en })
      noteZhHant: note(input: { language: zh_hant })
      noteZhHans: note(input: { language: zh_hans })
      noteEn: note(input: { language: en })
    }
  `,
  curationChannel: gql`
    fragment CurationChannelHeader on CurationChannel {
      id
      nameZhHant: name(input: { language: zh_hant })
      nameZhHans: name(input: { language: zh_hans })
      nameEn: name(input: { language: en })
      noteZhHant: note(input: { language: zh_hant })
      noteZhHans: note(input: { language: zh_hans })
      noteEn: note(input: { language: en })
    }
  `,
}

interface ChannelHeaderProps {
  channel: CurationChannelHeaderFragment | TopicChannelHeaderFragment
}

export const ChannelHeader = ({ channel }: ChannelHeaderProps) => {
  const { lang } = useContext(LanguageContext)
  const name =
    lang === 'zh_hant'
      ? channel.nameZhHant
      : lang === 'zh_hans'
        ? channel.nameZhHans
        : channel.nameEn
  const note =
    lang === 'zh_hant'
      ? channel.noteZhHant
      : lang === 'zh_hans'
        ? channel.noteZhHans
        : channel.noteEn

  if (!channel) {
    return null
  }

  return (
    <>
      <div className={styles.header}>
        <h1>{name}</h1>
        {note && <p className={styles.description}>{note}</p>}
      </div>
    </>
  )
}

ChannelHeader.fragments = fragments
