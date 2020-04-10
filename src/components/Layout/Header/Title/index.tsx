import { Title, Translate, TranslateProps } from '~/components';

const LayoutHeaderTitle: React.FC<TranslateProps> = ({
  children,
  ...props
}) => (
  <Title type="nav" is="h1">
    {children ? children : <Translate {...props} />}
  </Title>
);

export default LayoutHeaderTitle;
