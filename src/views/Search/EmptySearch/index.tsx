import { Empty, Icon } from '~/components';

const EmptySearch = ({
  description,
}: {
  description?: string | React.ReactNode;
}) => <Empty icon={<Icon.NavSearch size="xxl" />} description={description} />;

export default EmptySearch;
