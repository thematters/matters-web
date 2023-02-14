import { loremIpsum } from 'lorem-ipsum'

export const generateTags = ({ count = 1 }: { count?: number }) =>
  loremIpsum({
    count,
    format: 'plain',
    units: 'words',
  })
    .split(/\s/i)
    .map((w) => w.trim())

export const generateTitle = () =>
  loremIpsum({
    count: 1,
    format: 'plain',
    sentenceLowerBound: 1,
    sentenceUpperBound: 5,
    units: 'sentences',
  })

export const generateSummary = () =>
  loremIpsum({
    count: 1,
    format: 'plain',
    sentenceLowerBound: 5,
    sentenceUpperBound: 15,
    units: 'sentences',
  })

export const generateContent = ({
  format = 'plain',
}: {
  format?: 'html' | 'plain'
}) =>
  loremIpsum({
    count: 1,
    format,
    paragraphLowerBound: 5,
    paragraphUpperBound: 15,
    units: 'paragraphs',
  })

export const generateSupportSetting = () =>
  loremIpsum({
    count: 1,
    format: 'plain',
    sentenceLowerBound: 5,
    sentenceUpperBound: 10,
    units: 'sentences',
  })

export const generateComment = ({
  format = 'plain',
}: {
  format?: 'html' | 'plain'
}) =>
  loremIpsum({
    count: 1,
    format,
    paragraphLowerBound: 1,
    paragraphUpperBound: 1,
    units: 'paragraphs',
  })

export const generateDisplayName = () =>
  loremIpsum({
    count: 1,
    format: 'plain',
    sentenceLowerBound: 2,
    sentenceUpperBound: 3,
    units: 'sentences',
  }).slice(0, 20)

export const generateBio = () =>
  loremIpsum({
    count: 1,
    format: 'plain',
    paragraphLowerBound: 1,
    paragraphUpperBound: 1,
    units: 'paragraphs',
  }).slice(0, 200)
