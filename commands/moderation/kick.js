/**
 * @param {import('../../structures/client.js')} Client
 * @param {import('discord.js').Message} message
 * @param {String[]} args
*/
module.exports = async (Client, message, args) => {
  if (!await Client.checkPerms('kick', 'mod', message.member)) return message.reply(':x: Sorry, but you do not have the `mod.kick` permission.');
  if (!message.guild.me.hasPermission('KICK_MEMBERS')) return Client.functions.get('noClientPerms')(message, ['Kick Members']);

  if (!args[1]) return message.reply('You have to supply a member for me to kick!');

  const member = Client.getObj(args[1], { guild: message.guild, type: 'member' });
  if (!member) return message.reply('That is not a valid member!');
  if (message.guild.owner === member) return message.reply('I cannot kick an owner!');
  if (message.member === member) return message.reply('You cannot kick yourself!');
  if (member.roles.highest.position >= message.member.roles.highest.position && message.member !== message.guild.owner) return message.reply('Your role position is not high enough!');
  if (member.roles.highest.position >= message.guild.me.roles.highest.position) return message.reply('My role position is not high enough to kick that user!');

  const reason = args.slice(2).join(' ');
  member.kick(reason);

  return message.channel.send(`Successfully kicked ${member.user.tag}${reason ? ` for ${reason}` : '.'}`);
};

module.exports.help = {
  name: 'kick',
  desc: 'Kicks a member.',
  category: 'moderation',
  usage: '?kick <Member> [Reason]',
  aliases: []
};
