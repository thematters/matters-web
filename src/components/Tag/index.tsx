import classNames from 'classnames';
import gql from 'graphql-tag';
import Link from 'next/link';

import { Icon, IconProps, TextIcon, TextIconProps } from '~/components';

import { numAbbr, toPath } from '~/common/utils';

import styles from './styles.css';

import { DigestTag } from './__generated__/DigestTag';

interface TagProps {
  tag: DigestTag;
  type?: 'list' | 'title' | 'inline';
  textSize?: 'sm';
  active?: boolean;
}

const fragments = {
  tag: gql`
    fragment DigestTag on Tag {
      id
      content
      articles(input: { first: 0 }) {
        totalCount
      }
    }
  `,
};

export const Tag = ({ tag, type = 'list', textSize, active }: TagProps) => {
  const tagClasses = classNames({
    tag: true,
    [type]: type,
    active,
  });

  const path = toPath({
    page: 'tagDetail',
    id: tag.id,
  });

  let iconProps: IconProps = {};
  let textIconProps: TextIconProps = {};

  switch (type) {
    case 'list':
      iconProps = {
        color: 'grey',
      };
      textIconProps = {
        size: 'md',
        weight: 'normal',
        spacing: 'xxtight',
        color: 'black',
      };
      break;
    case 'title':
      iconProps = {
        color: 'white',
        size: 'md',
      };
      textIconProps = {
        size: 'lg',
        weight: 'md',
        spacing: 0,
        color: 'white',
      };
      break;
    case 'inline':
      iconProps = {
        color: active ? 'green' : 'grey',
      };
      textIconProps = {
        size: 'sm',
        weight: 'md',
        spacing: 0,
        color: active ? 'green' : 'grey-darker',
      };
      break;
  }

  const tagCount = numAbbr(tag.articles.totalCount || 0);
  const hasCount = type === 'list';

  return (
    <Link {...path}>
      <a className={tagClasses}>
        <TextIcon
          icon={<Icon.HashTag {...iconProps} />}
          {...textIconProps}
          size={textSize || textIconProps.size}
        >
          {tag.content}
        </TextIcon>

        {hasCount && tagCount && <span className="count">{tagCount}</span>}

        <style jsx>{styles}</style>
      </a>
    </Link>
  );
};

Tag.fragments = fragments;
