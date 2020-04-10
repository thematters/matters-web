import { Empty, Icon, Translate } from '~/components';

export const EmptyComment = () => (
  <Empty
    icon={<Icon.Comment size="xxl" />}
    description={<Translate zh_hant="還沒有評論" zh_hans="还没有评论" />}
  />
);
