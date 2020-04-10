import gql from 'graphql-tag';

import { Button, Icon, TextIcon, Translate } from '~/components';

import { toPath } from '~/common/utils';

import { EditButtonDraft } from './__generated__/EditButtonDraft';

interface EditButtonProps {
  draft: EditButtonDraft;
}

const fragments = {
  draft: gql`
    fragment EditButtonDraft on Draft {
      id
      slug
      title
    }
  `,
};

const EditButton = ({ draft }: EditButtonProps) => {
  const { id, slug } = draft;
  const path = toPath({
    page: 'draftDetail',
    slug,
    id,
  });

  return (
    <Button
      spacing={[0, 'xtight']}
      size={[null, '1.25rem']}
      bgColor="green-lighter"
      {...path}
    >
      <TextIcon
        icon={<Icon.EditXS size="xs" />}
        size="xs"
        color="green"
        weight="md"
      >
        <Translate id="edit" />
      </TextIcon>
    </Button>
  );
};

EditButton.fragments = fragments;

export default EditButton;
