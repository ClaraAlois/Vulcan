module.exports = guild => xrequire('./managers/logManager').getInstance().info(`Vulcan has left guild '${guild.name}(${guild.id})' owned by ${guild.owner ? guild.owner.user.tag : 'Unknown'}.`);
