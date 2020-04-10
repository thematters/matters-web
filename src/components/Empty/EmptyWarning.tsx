import { Empty, Icon } from '~/components';

export const EmptyWarning = ({
  description,
}: {
  description: React.ReactNode;
}) => (
  <Empty icon={<Icon.EmptyWarning size="xxl" />} description={description} />
);
