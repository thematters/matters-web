import { Empty, Icon, Translate } from '~/components';

export const EmptyAppreciation = () => (
  <Empty
    icon={<Icon.LikeMedium size="xxl" />}
    description={
      <Translate zh_hant="還沒有讚賞紀錄" zh_hans="还没有赞赏纪录" />
    }
  />
);
