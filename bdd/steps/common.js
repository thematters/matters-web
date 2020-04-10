const { client } = require('nightwatch-api');
const { Given, Then, When } = require('cucumber');

const PATH = require('../common/enums/path');
const TIME = require('../common/enums/time');

const waitPageToBeVisible = (client, query) => {
  return client
    .waitForElementVisible('body')
    .waitForElementVisible(query, 10 * TIME.SECOND);
};

Given('I visit home page', () => {
  return client
    .url(PATH.HOME(`${process.env.BDD_USER}:${process.env.BDD_PASSWD}@`))
    .waitForElementVisible('body')
    .waitForElementVisible('header')
    .waitForElementVisible('main');
});

Then('the Article page should be visible', () => {
  return waitPageToBeVisible(client, 'h1.article');
});

Then('go back to home page', () => {
  return client.url('http://matters.news').waitForElementVisible('body', 1000);
});

Then('go back to previous page', () => {
  return client.back().waitForElementVisible('body', 1000);
});

Then('the first article page should be visible', () => {
  return waitPageToBeVisible(client, 'h1.article');
});

Then('the author page should be visible', () => {
  return waitPageToBeVisible(client, 'main > section > div:nth-child(2)');
});

Then('the first hashtag page should be visible', () => {
  return waitPageToBeVisible(client, 'main > article > header > section.title');
});

Then('the all hashtag page should be visible', () => {
  return waitPageToBeVisible(client, 'main > article > header > section.title');
});

Then('the all hot topics page should be visible', () => {
  return waitPageToBeVisible(client, 'main > article > header > section.title');
});

Then('the first topic page should be visible', () => {
  return waitPageToBeVisible(
    client,
    'main > article > section.jsx-2196064359.title > h1'
  );
});
