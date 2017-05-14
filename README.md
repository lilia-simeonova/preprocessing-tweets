# Preprocessing of tweets 

This module can be used for easier preparation of training twitter data. It removes:

- mentions
- links
- emojis
- keyword `RT`
- sentences, which contain single word
- some special characters

There is an option to filter whether you want to remove URLs, mentions and emojis.

The default option is:

```json
var filter = {
    "mentions": true,
    "links": true,
    "emojis": true
}
```

For example:

The tweet:
```
New @Imaginedragons song 'Whatever It Takes' and a new album 'Evolve'. I'm so #excited this song is incredible ❤️ https://t.co/PS9NM4pTBQ
``` 

Will become:

```
New song 'Whatever It Takes' and a new album 'Evolve'. I'm so excited this song is incredible 
```

## Install

```
npm install preprocess-tweets
```

## Prequisits

The file with the extracted tweets shuold be txt file, containing one tweet per row. 

## Example

In this example the URLs won't be deleted.

```javascript
var preprocessing = require('preprocess-tweets')

var file = './originalFile.txt';
var writeFile = './modifiedFile.txt'

var filter = {
    "mentions": true,
    "links": false,
    "emojis": true
}

preprocessing.clean(file, writeFile, JSON.stringify(filter))
```

The result will be new file, containing the modified tweets.