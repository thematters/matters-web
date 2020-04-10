import { Empty, Icon, Translate } from '~/components';

export const EmptyTagArticles = () => (
  <Empty
    icon={<Icon.EmptyWarning size="xxl" />}
    description={<Translate zh_hant="還沒有作品" zh_hans="還沒有作品" />}
  />
);
