import styles from './styles.module.css'

const About = ({ desc, url }: { desc: string; url: string }) => {
  return (
    <section className={styles.container}>
      <a href={url} target="_blank" rel="noreferrer">
        {desc}
      </a>
    </section>
  )
}

export default About
