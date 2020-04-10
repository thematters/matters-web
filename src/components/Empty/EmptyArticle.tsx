import { Empty, Icon, Translate } from '~/components';

export const EmptyArticle = () => (
  <Empty
    icon={<Icon.EmptyWarning size="xxl" />}
    description={<Translate zh_hant="還沒有創作" zh_hans="还没有创作" />}
  />
);
