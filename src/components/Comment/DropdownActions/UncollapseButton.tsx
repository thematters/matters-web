import gql from 'graphql-tag';

import { Icon, Menu, TextIcon, Translate } from '~/components';
import { useMutation } from '~/components/GQL';

import { UncollapseComment } from './__generated__/UncollapseComment';

const UNCOLLAPSE_COMMENT = gql`
  mutation UncollapseComment($id: ID!, $state: CommentState!) {
    updateCommentsState(input: { ids: [$id], state: $state }) {
      id
      state
    }
  }
`;

const UncollapseButton = ({ commentId }: { commentId: string }) => {
  const [uncollapseComment] = useMutation<UncollapseComment>(
    UNCOLLAPSE_COMMENT,
    {
      variables: { id: commentId, state: 'active' },
      optimisticResponse: {
        updateCommentsState: [
          {
            id: commentId,
            state: 'active' as any,
            __typename: 'Comment',
          },
        ],
      },
    }
  );

  return (
    <Menu.Item onClick={uncollapseComment}>
      <TextIcon icon={<Icon.Expand size="md" />} size="md" spacing="base">
        <Translate id="uncollapseComment" />
      </TextIcon>
    </Menu.Item>
  );
};

export default UncollapseButton;
