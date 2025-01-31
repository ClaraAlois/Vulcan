const request = xrequire('request-promise');

let baseURL = 'https://hasteb.in';

exports.setBaseURL = (url) => {
    if (typeof url !== 'string') {
        throw new Error('The haste service must be a string.');
    }

    baseURL = url;
};

exports.getBaseURL = () => baseURL;

exports.post = async (text, extension = 'js') => {
    if (!text) {
        throw new Error('You must supply code to upload to a haste service.');
    }

    const res = await request({
        uri         : `${baseURL}/documents`,
        method      : 'POST',
        body        : text,
        'User-Agent': `Vulcan Node.js`
    });

    let key = JSON.parse(res).key;

    if (!key) {
        throw new Error(`Hastebin response had no key: ${res}`);
    }

    return `${baseURL}/${key}.${extension}`;
};

exports.get = async (key) => {
    if (typeof key !== 'string') {
        throw new Error('Hastebin GET request key must be a stirng.');
    }

    const res = await request({
        uri         : `${baseURL}/raw/${key}`,
        method      : 'GET',
        'User-Agent': `Vulcan Node.js`
    });

    return res;
};
