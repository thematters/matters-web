import gql from 'graphql-tag';
import { useState } from 'react';

import { Dialog, Translate } from '~/components';
import { useMutation } from '~/components/GQL';

import { ADD_TOAST } from '~/common/enums';

import { DeleteComment } from './__generated__/DeleteComment';

const DELETE_COMMENT = gql`
  mutation DeleteComment($id: ID!) {
    deleteComment(input: { id: $id }) {
      id
      state
    }
  }
`;

interface DeleteCommentDialogProps {
  commentId: string;
  children: ({ open }: { open: () => void }) => React.ReactNode;
}

const DeleteCommentDialog = ({
  commentId,
  children,
}: DeleteCommentDialogProps) => {
  const [showDialog, setShowDialog] = useState(false);
  const open = () => setShowDialog(true);
  const close = () => setShowDialog(false);

  const [deleteComment] = useMutation<DeleteComment>(DELETE_COMMENT, {
    variables: { id: commentId },
    optimisticResponse: {
      deleteComment: {
        id: commentId,
        state: 'archived' as any,
        __typename: 'Comment',
      },
    },
  });

  const onDelete = async () => {
    await deleteComment();

    window.dispatchEvent(
      new CustomEvent(ADD_TOAST, {
        detail: {
          color: 'green',
          content: <Translate zh_hant="評論已刪除" zh_hans="评论已删除" />,
          buttonPlacement: 'center',
        },
      })
    );
  };

  return (
    <>
      {children({ open })}

      <Dialog isOpen={showDialog} onDismiss={close} size="sm">
        <Dialog.Header title="deleteComment" close={close} headerHidden />

        <Dialog.Message
          headline="deleteComment"
          description={
            <>
              <Translate
                zh_hant="確認刪除評論，評論會馬上消失。"
                zh_hans="确认删除评论，评论会马上消失。"
              />
            </>
          }
        />

        <Dialog.Footer>
          <Dialog.Footer.Button
            bgColor="red"
            onClick={() => {
              onDelete();
              close();
            }}
          >
            <Translate id="confirm" />
          </Dialog.Footer.Button>

          <Dialog.Footer.Button
            bgColor="grey-lighter"
            textColor="black"
            onClick={close}
          >
            <Translate id="cancel" />
          </Dialog.Footer.Button>
        </Dialog.Footer>
      </Dialog>
    </>
  );
};

export default DeleteCommentDialog;
