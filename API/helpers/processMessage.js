const FACEBOOK_ACCESS_TOKEN = 'EAABrbRYLH74BAO57GflGRHFmMcNyYgPBjQWk0rAVYzdmyWUtNZAbUPjDjPzAbZAZANxOr8ZAiZALHqoEVl5TCSorPtNGuAPZCcKn4ZAxlTF2N6MyqxkaXGYgmDcPTdfZAqz5FLuZAIpUNTj3VU3LzmVrszsD1p3WcDQPStqVEmHdRPwZDZD';
const CAT_IMAGE_URL = 'https://botcube.co/public/blog/apiai-tutorial-bot/hosico_cat.jpg';

const request = require('request');

const API_AI_TOKEN = 'bb7a0769edcb422091c1a7c4fa984059';
const apiAiClient = require('apiai')(API_AI_TOKEN);

/*module.exports = (event) => {
    const senderId = event.sender.id;
    const message = event.message.text;

    console.log(' Echo message'+message);

    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: { access_token: FACEBOOK_ACCESS_TOKEN },
        method: 'POST',
        json: {
            recipient: { id: senderId },
            //message: {
                /*attachment: {
                    //type: 'image',
                    type:'text',
                    payload: {message}
                    //payload: { url: CAT_IMAGE_URL}
                }

                message: {text: message
                }
            //}
        }
    });
};*/

const sendTextMessage = (senderId, text) => {
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: { access_token: FACEBOOK_ACCESS_TOKEN },
        method: 'POST',
        json: {
            recipient: { id: senderId },
            message: { text },
        }
    });
};

module.exports = (event) => {
    const senderId = event.sender.id;
    const message = event.message.text;

    const apiaiSession = apiAiClient.textRequest(message, {sessionId: 'botcube_co'});

    apiaiSession.on('response', (response) => {
        const result = response.result.fulfillment.speech;

        sendTextMessage(senderId, result);
    });

    apiaiSession.on('error', error => console.log(error));
    apiaiSession.end();
};