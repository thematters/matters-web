import { Button, Icon, TextIcon, Translate } from '~/components';

import styles from './styles.css';

const ExpandButton = ({
  onClick,
  restCount,
}: {
  onClick: () => any;
  restCount: number;
}) => (
  <Button
    size={[null, '1.25rem']}
    spacing={[0, 'xtight']}
    bgActiveColor="grey-lighter"
    onClick={onClick}
  >
    <TextIcon
      size="xs"
      color="green"
      textPlacement="left"
      icon={<Icon.Down size="xs" />}
    >
      <Translate
        zh_hant={`查看 ${restCount} 條回應`}
        zh_hans={`查看 ${restCount} 条回应`}
      />
    </TextIcon>

    <style jsx>{styles}</style>
  </Button>
);
export default ExpandButton;
