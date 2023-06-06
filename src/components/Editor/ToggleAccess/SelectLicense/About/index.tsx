import { IconExternalLink16, TextIcon } from '~/components'

import styles from './styles.css'

const About = ({ desc, url }: { desc: string; url: string }) => {
  return (
    <TextIcon
      size="xs"
      spacing="xxxtight"
      weight="normal"
      color="greyDark"
      textPlacement="left"
      icon={<IconExternalLink16 color="grey" size="xs" />}
    >
      <a href={url} target="_blank">
        {desc}
      </a>
      <style jsx>{styles}</style>
    </TextIcon>
  )
}

export default About
