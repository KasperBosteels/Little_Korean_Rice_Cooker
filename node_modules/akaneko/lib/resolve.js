const https = require('https');

module.exports = {

    get: async function (params) {

        return new Promise(function (resolve, reject) {
            https.get({
                hostname: 'akaneko-api.herokuapp.com',
                path: `/api/${params}`,
                agent: false
            }, (resp) => {
                let data = "";

                resp.on('data', chunk => {
                    data += chunk;
                });

                resp.on('end', () => {
                    var kitten = JSON.parse(data);
                    resolve(kitten.url)
                });

            }).on("error", (err) => {
                reject(new Error(err));
            });
        });
    }
}