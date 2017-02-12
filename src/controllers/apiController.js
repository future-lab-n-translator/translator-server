 /**
     * Detects language of input.
     * 
     * @method addScript
     * @param string .
     * puts detected language back to {callback} function
     */
const request = require('request');

export const detectLanguage = (input, callback) => {
  console.log(process.env.GOOGLE_API_KEY);

  const queryStringObj = {
      q: input,
      key: 'AIzaSyDG_xmvkkjA3GB6Hx_iwMYv7TBHBWPGkM8'
  };
  
  request({
      url: 'https://www.googleapis.com/language/translate/v2/detect',
      qs: queryStringObj,
      method: 'GET'
  }, (err, response, body) => {
      callback(JSON.parse(body));
  });
}

export const test = (req, res) => {
    res.send('nice test');
}
