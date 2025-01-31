const disabled      = module.exports;
const messageEmbeds = xrequire('./utility/modules/messageEmbeds');

disabled.execute = async (message) => {
    const vulcan  = message.client;
    const cmdName = message.parsed.args[0];
    const command = vulcan.commands.retrieveCommand(cmdName);

    if (!command) {
        return vulcan.emit('');
    }

    const bool      = message.parsed.args[1] ? Boolean(message.parsed.args[1]) : !command.disabled;
    const embedWrap = messageEmbeds.reply({
        message,
        description: `Set disabled status of command \`${command.id}\` to: \`${command.disabled}\`.`
    });

    // Set disabled property
    command.disabled = bool;

    await message.channel.send(embedWrap);
};
