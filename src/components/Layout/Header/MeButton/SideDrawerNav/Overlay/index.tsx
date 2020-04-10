import styles from './styles.css';

const Overlay = ({ style }: { style: React.CSSProperties }) => (
  <div aria-hidden className="overlay" style={style}>
    <style jsx>{styles}</style>
  </div>
);

export default Overlay;
