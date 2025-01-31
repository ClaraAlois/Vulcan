const resume        = module.exports;
const Discord       = xrequire('discord.js');
const messageEmbeds = xrequire('./utility/modules/messageEmbeds');

resume.execute = async (message) => {
    const musicManager = message.guild.musicManager;

    if (musicManager.playing) {
        return message.client.emit('channelInfo', message.channel, 'Music is already playing. Therefore cannot resume.');
    }

    musicManager.resume();

    await message.channel.send(messageEmbeds.reply(
        {
            message,
            fields: [
                {
                    name : 'Resumed Song',
                    value: Discord.Util.escapeMarkdown(musicManager.loadedSong.name)
                }
            ]
        }
    ));
};
