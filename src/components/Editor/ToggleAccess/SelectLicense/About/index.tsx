import { Button, IconExternalLink16, TextIcon } from '~/components'

import styles from './styles.module.css'

const About = ({ desc, url }: { desc: string; url: string }) => {
  return (
    <section className={styles.container}>
      <Button htmlHref={url} htmlTarget="_blank">
        <TextIcon
          size="xs"
          spacing="xxxtight"
          weight="normal"
          color="greyDark"
          textPlacement="left"
          icon={<IconExternalLink16 color="grey" size="xs" />}
        >
          {desc}
        </TextIcon>
      </Button>
    </section>
  )
}

export default About
