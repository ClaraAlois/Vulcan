const kill          = module.exports;
const messageEmbeds = xrequire('./utility/modules/messageEmbeds');

kill.execute = async (message) => {
    await message.channel.send(messageEmbeds.reply(
        {
            message,
            title: 'Killed Vulcan Process'
        }
    ));

    process.exit(0, `Discord command kill request by ${message.author.tag}`);
};
