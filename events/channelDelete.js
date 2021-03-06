/**
 * @param {import('../structures/client.js')} Client
 * @param {import('discord.js').GuildChannel} channel
 */
async function logMessage(Client, channel) {
  const embed = new Client.Discord.MessageEmbed()
    .setTitle('Channel Deleted')
    .addField('Channel', `${channel.name} \`(${channel.id})\``, true)
    .addField('Type', channel.type, true)
    .setColor(0xFF0000)
    .setTimestamp();

  if (channel.parent) embed.addField('Category', channel.parent.name, true);

  if (channel.guild.me.hasPermission('VIEW_AUDIT_LOG')) {
    const entry = (await channel.guild.fetchAuditLogs({
      type: 'CHANNEL_DELETE',
      limit: 1
    })).entries.first();

    if (entry) {
      const executor = entry.executor;
      const reason = entry.reason || 'None';

      embed.setAuthor(`${executor.tag} (${executor.id})`, executor.displayAvatarURL())
        .addField('Reason', reason, true);
    }
  }

  return Client.functions.get('sendlog')(Client, embed, channel.guild.id);
}

/**
 * @param {import('../structures/client.js')} Client
 */
module.exports = (Client) => {
  return Client.bot.on('channelDelete', channel => {
    if (!channel.guild || !channel.guild.available) return;

    logMessage(Client, channel);
  });
};
