 /**
     * Detects language of input.
     * 
     * @method addScript
     * @param string .
     * puts detected language back to {callback} function
     */
const request = require('request');

export const detectLanguage = (inputObj, callback) => {

  const queryStringObj = {
      q: inputObj.q,
      key: ''
  };
  
  request({
      url: 'https://www.googleapis.com/language/translate/v2/detect',
      qs: queryStringObj,
      method: 'GET'
  }, (err, response, body) => {
      if(err){
          callback(err);
      }
      callback(null, JSON.parse(body));
  });
}

export const translateLanguage = (inputObj, source, callback) => {
    console.log('hello', inputObj);
    const queryStringObj = {
        q: inputObj.q,
        key: '',
        target: inputObj.target,
        source: source
    };
    console.log('cool');
    request({
      url: 'https://www.googleapis.com/language/translate/v2',
      qs: queryStringObj,
      method: 'GET'
    }, (err, response, body) => {
        if(err){
            callback(err);
        }
        callback(null, JSON.parse(body));
    });
}
