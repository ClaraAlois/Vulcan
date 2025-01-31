const dog           = module.exports;
const request       = xrequire('request-promise');
const messageEmbeds = xrequire('./utility/modules/messageEmbeds');

dog.execute = async (message) => {
    const response = JSON.parse(await request('https://dog.ceo/api/breeds/image/random'));

    if (response.status !== 'success') {
        return message.channel.send(messageEmbeds.reply(
            {
                description: 'The "dog.ceo/api/" API endpoint seems to be down!\nTry again later!'
            }
        ));
    }

    await message.channel.send({ files: [response.message] });
};
