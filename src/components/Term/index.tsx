import { useContext } from 'react';

import { LanguageContext } from '~/components';

import termStyles from '~/common/styles/utils/content.article.css';
import detailsStyles from '~/common/styles/utils/details.css';
import { translate } from '~/common/utils';

import Privacy from './privacy';
import styles from './styles.css';
import ToS from './tos';

export const Term = () => {
  const { lang } = useContext(LanguageContext);

  return (
    <section className="term">
      <section
        dangerouslySetInnerHTML={{
          __html: translate({
            ...ToS,
            lang,
          }),
        }}
      />

      <section
        dangerouslySetInnerHTML={{
          __html: translate({
            ...ToS,
            lang: 'en',
          }),
        }}
      />

      <section
        dangerouslySetInnerHTML={{
          __html: translate({
            ...Privacy,
            lang,
          }),
        }}
      />

      <section
        dangerouslySetInnerHTML={{
          __html: translate({
            ...Privacy,
            lang: 'en',
          }),
        }}
      />

      <style jsx>{styles}</style>
      <style jsx global>
        {termStyles}
      </style>
      <style jsx global>
        {detailsStyles}
      </style>
    </section>
  );
};
