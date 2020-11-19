const https = require('https');

function httpsGetRequest(options) {
  // options.path = encodeURIComponent(options.path);
  return new Promise((resolve, reject) => {
    https.get(options, (res) => {
      // error handling
      // some code from : https://nodejs.org/api/http.html#http_http_get_options_callback
      const { statusCode } = res;
      const contentType = res.headers['content-type'];
      let error;
      if (statusCode !== 200) {
        error = new Error(`Status Code:${statusCode}`);
      } else if (!/^application\/json/.test(contentType)) {
        error = new Error('Invalid content-type.\n'
          + `Expected application/json but received ${contentType}`);
      }
      if (error) {
        res.resume();
        reject(error);
      }
      // handle data
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try {
          const parsedData = JSON.parse(data);
          resolve(parsedData);
        } catch (e) {
          reject(new Error(e));
        }
      })
      // other errors
        .on('error', (e) => {
          reject(new Error(e));
        });
    });
  });
}

class OxfordDictionaries {
  constructor(app_id, app_key) {
    // these options should be the same for most request
    // except the path should be different
    this.options = {
      host: 'od-api.oxforddictionaries.com',
      port: 443,
      method: 'GET',
      path: '/api/v2',
      headers: {
        Accept: 'application/json',
        app_id: app_id,
        app_key: app_key
      }
    };
  }

  entries({ word_id, source_lang, fields, grammaticalFeatures, lexicalCategory, domains, registers, strictMatch }) {
    const options = { ...this.options };
    options.path += '/entries'
            + `/${source_lang || 'en-gb'}`
            + `/${word_id}`
            + `?`
            + `${fields ? `&fields=${fields.join('%2C')}` : ''}`
            + `${grammaticalFeatures ? `&grammaticalFeatures=${grammaticalFeatures.join('%2C')}` : ''}`
            + `${lexicalCategory ? `&lexicalCategory=${lexicalCategory.join('%2C')}` : ''}`
            + `${domains ? `&domains=${domains.join('%2C')}` : ''}`
            + `${registers ? `&registers=${registers.join('%2C')}` : ''}`
            + `&strictMatch=${strictMatch ? 'true' : 'false'}`
    return httpsGetRequest(options);
  }

  lemmas({ word_id, source_lang, grammaticalFeatures, lexicalCategory }) {
    const options = { ...this.options };
    options.path += '/lemmas'
            + `/${source_lang || 'en'}`
            + `/${word_id}`
            + `${grammaticalFeatures || lexicalCategory ? '?' : ''}`
            + `${grammaticalFeatures ? `&grammaticalFeatures=${grammaticalFeatures.join('%2C')}` : ''}`
            + `${lexicalCategory ? `&lexicalCategory=${lexicalCategory.join('%2C')}` : ''}`
    return httpsGetRequest(options);
  }

  search({ source_lang, target_lang, q, prefix, limit, offset }) {
    const options = { ...this.options };
    options.path += '/search'
            + `/${source_lang || 'en-gb'}`
            + `${target_lang ? `/${target_lang}` : ''}`
            + `?q=${q}`
            + `${prefix ? '&prefix=true' : '&prefix=false'}`
            + `${limit ? `&limit=${limit}` : ''}`
            + `${offset ? `&offset=${offset}` : ''}`;
    return httpsGetRequest(options);
  }

  translation({ source_lang, target_lang, word_id, strictMatch }) {
    const options = { ...this.options };
    options.path += '/translations'
            + `/${source_lang || 'en'}`
            + `/${target_lang || 'es'}`
            + `/${word_id}`
            + `&strictMatch=${strictMatch ? 'true' : 'false'}`;
    return httpsGetRequest(options);
  }

  thesaurus({ lang, word_id, fields, strictMatch }) {
    const options = { ...this.options };
    options.path += '/thesaurus'
            + `/${lang || 'en'}`
            + `/${word_id}`
            + `?`
            + `${fields ? `&fields=${fields.join('%2C')}` : ''}`
            + `&strictMatch=${strictMatch ? 'true' : 'false'}`;
    return httpsGetRequest(options);
  }

  sentences({ source_lang, word_id, strictMatch }) {
    const options = { ...this.options };
    options.path += '/sentences'
            + `/${source_lang || 'en'}`
            + `/${word_id}`
            + `?strictMatch=${strictMatch ? 'true' : 'false'}`;
    return httpsGetRequest(options);
  }

  lexistats_ngrams({ source_lang, corpus, ngram_size, tokens, contains, format, minFrequency, maxFrequency, collate, sort, offset, limit }){
    const options = { ...this.options };
    options.path += '/features/ngrams'
            + `/${source_lang || 'en'}`
            + `/${corpus || 'nmc'}`
            + `/${ngram_size || '1'}`
            + '?'
            + `${tokens ? `&tokens=${tokens}` : ''}`
            + `${contains ? `&contains=${contains}` : ''}`
            + `${format ? `&format=${format}` : ''}`
            + `${minFrequency ? `&minFrequency=${minFrequency}` : ''}`
            + `${maxFrequency ? `&maxFrequency=${maxFrequency}` : ''}`
            + `${collate ? `&collate=${collate}` : ''}`
            + `${sort ? `&sort=${sort}` : ''}`
            + `${offset ? `&offset=${offset}` : ''}`
            + `${limit ? `&limit=${limit}` : ''}`;
    return httpsGetRequest(options);
  }

  lexistats_word({ source_lang, corpus, wordform, trueCase, lemma, lexicalCategory }){
    const options = { ...this.options };
    options.path += '/features/word'
            + `/${source_lang || 'en'}`
            + '?'
            + `/${corpus ? `&corpus=${corpus}` : '&corpus=nmc'}`
            + `${wordform ? `&wordform=${wordform}` : ''}`
            + `${trueCase ? `&trueCase=${trueCase}` : ''}`
            + `${lemma ? `&lemma=${lemma}` : ''}`
            + `${lexicalCategory ? `&lexicalCategory=${lexicalCategory}` : ''}`;
    return httpsGetRequest(options);
  }

  lexistats_words({ source_lang, corpus, wordform, trueCase, lemma, lexicalCategory, grammaticalFeatures, minFrequency, maxFrequency, minNormalizedFrequency, maxNormalizedFrequency, collate, sort, offset, limit }){
    const options = { ...this.options };
    options.path += '/features/words'
            + `/${source_lang || 'en'}`
            + '?'
            + `/${corpus ? `&corpus=${corpus}` : '&corpus=nmc'}`
            + `${wordform ? `&wordform=${wordform}` : ''}`
            + `${trueCase ? `&trueCase=${trueCase}` : ''}`
            + `${lemma ? `&lemma=${lemma}` : ''}`
            + `${lexicalCategory ? `&lexicalCategory=${lexicalCategory}` : ''}`;
            + `${grammaticalFeatures ? `&grammaticalFeatures=${grammaticalFeatures}` : ''}`;
            + `${minFrequency ? `&minFrequency=${minFrequency}` : ''}`;
            + `${maxFrequency ? `&maxFrequency=${maxFrequency}` : ''}`;
            + `${minNormalizedFrequency ? `&minNormalizedFrequency=${minNormalizedFrequency}` : ''}`;
            + `${maxNormalizedFrequency ? `&maxNormalizedFrequency=${maxNormalizedFrequency}` : ''}`;
            + `${collate ? `&collate=${collate}` : ''}`;
            + `${sort ? `&sort=${sort}` : ''}`;
            + `${offset ? `&offset=${offset}` : ''}`;
            + `${limit ? `&limit=${limit}` : ''}`;
    return httpsGetRequest(options);
  }

  // utility functions
  domains({ source_lang, target_lang } = {}) {
    const options = { ...this.options };
    options.path += '/domains'
            + `/${source_lang || 'en-gb'}`
            + `${target_lang ? `/${target_lang}` : ''}`;
    return httpsGetRequest(options);
  }

  fields({ endpoint } = {}){
    const options = { ...this.options };
    options.path += '/fields'
            + `${endpoint ? `/${endpoint}` : ''}`;
    return httpsGetRequest(options);
  }

  filters({ endpoint } = {}) {
    const options = { ...this.options };
    options.path += '/filters'
            + `${endpoint ? `/${endpoint}` : ''}`;
    return httpsGetRequest(options);
  }

  grammaticalFeatures({ source_lang, target_lang } = {}) {
    const options = { ...this.options };
    options.path += '/grammaticalFeatures'
            + `/${source_lang || 'en'}`
            + `${target_lang ? `/${target_lang}` : ''}`;
    return httpsGetRequest(options);
  }

  languages({ sourceLanguage, targetLanguage } = {}) {
    const options = { ...this.options };
    options.path += '/languages?'
            + `${sourceLanguage ? `sourceLanguage=${sourceLanguage}` : ''}`
            + `${targetLanguage ? `&targetLanguage=${targetLanguage}` : ''}`;
    return httpsGetRequest(options);
  }

  lexicalcategories({ source_lang, target_lang } = {}) {
    const options = { ...this.options };
    options.path += '/lexicalcategories'
            + `/${source_lang || 'en'}`
            + `${target_lang ? `/${target_lang}` : ''}`;
    return httpsGetRequest(options);
  }

  registers({ source_lang, target_lang } = {}) {
    const options = { ...this.options };
    options.path += '/registers'
            + `/${source_lang || 'en'}`
            + `${target_lang ? `/${target_lang}` : ''}`;
    return httpsGetRequest(options);
  }
}

module.exports = OxfordDictionaries;
