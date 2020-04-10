import { Icon } from '~/components';

import { toPath } from '~/common/utils';

import { ArticleDigestDropdownArticle } from './__generated__/ArticleDigestDropdownArticle';

const OpenExternalLink = ({
  article,
}: {
  article: ArticleDigestDropdownArticle;
}) => {
  const path = toPath({
    page: 'articleDetail',
    article,
  });

  return (
    <a href={path.as} target="_blank">
      <Icon.External color="green" />
    </a>
  );
};

export default OpenExternalLink;
