import styles from './styles.css';

const Overlay = (props: { style: React.CSSProperties }) => (
  <div aria-hidden className="overlay" {...props}>
    <style jsx>{styles}</style>
  </div>
);

export default Overlay;
