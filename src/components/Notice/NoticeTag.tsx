import gql from 'graphql-tag';

import { Tag } from '~/components';

import styles from './styles.css';

import { NoticeTag as NoticeTagType } from './__generated__/NoticeTag';

const NoticeTag = ({ tag }: { tag: NoticeTagType | null }) => {
  if (!tag) {
    return null;
  }

  return (
    <section className="sub-content tag-content">
      <Tag tag={tag} type="inline" active />

      <style jsx>{styles}</style>
    </section>
  );
};

NoticeTag.fragments = {
  tag: gql`
    fragment NoticeTag on Tag {
      id
      ...DigestTag
    }
    ${Tag.fragments.tag}
  `,
};

export default NoticeTag;
