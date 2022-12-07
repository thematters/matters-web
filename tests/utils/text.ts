import { loremIpsum } from 'lorem-ipsum'

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
