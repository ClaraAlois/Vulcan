module.exports = class _TextChannel extends xrequire('discord.js').TextChannel {
    constructor (...args) {
        super(...args);

        this._send = super.send;
        this.send  = (...args) => xrequire('./handlers/messageFormatHandler')(this, ...args);
    }
};
