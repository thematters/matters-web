const fetch = require('node-fetch')
const fs = require('fs')
const dotenv = require('dotenv')

// load environment variables from .env
const dotEnvResult = dotenv.config({
  path: '.env.dev'
})
if (dotEnvResult.error) {
  console.error(dotEnvResult.error)
}


fetch(process.env.NEXT_PUBLIC_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      variables: {},
      query: `
      {
        __schema {
          types {
            kind
            name
            possibleTypes {
              name
            }
          }
        }
      }
    `
    })
  }).then(result => result.json())
  .then(result => {
    const possibleTypes = {};

    result.data.__schema.types.forEach(supertype => {
      if (supertype.possibleTypes) {
        possibleTypes[supertype.name] =
          supertype.possibleTypes.map(subtype => subtype.name);
      }
    });


    fs.writeFile('src/common/gql/fragmentTypes.json', JSON.stringify(possibleTypes), err => {
      if (err) {
        console.error('Error writing possibleTypes.json', err);
      } else {
        console.log('Fragment types successfully extracted!');
      }
    });
  });
