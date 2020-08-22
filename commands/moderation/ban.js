const Discord = require("discord.js");

module.exports = {
  name: "ban",
  description: "🔨",
  guildOnly: true,
  aliases: ["banhammer", "destroy", "disintegrate"],

  async execute(message, args) {
    const tick = message.client.emojis.cache.get("655807079784644608").toString()
    const cross = message.client.emojis.cache.get("655807081240330245").toString()

    var user = message.mentions.users.first(); // returns the user object if an user mention exists
    var banReason = args.slice(1).join(" "); // Reason of the ban (Everything behind the mention)
    if (user === message.author) return message.channel.send(cross + ' Hold on did you just try to ban yourself?');
    if (!message.member.hasPermission("BAN_MEMBERS")){
      return message.channel.send(cross + "You don't have the **Ban Members** permission!")
    }
    
    if (message.guild.me.hasPermission('BAN_MEMBERS', false, false)){
      return message.channel.send(cross + "I don't have the **Ban Members** permission!")
    }
    
    if (!user) {
      try {
        if (!message.client.users.get(args.slice(0, 1).join(" ")))
          throw new Error(cross + " I couldn't find that user!");
          user = message.guild.members.get(args.slice(0, 1).join(" "));
          user = user.user;
        
      } catch (error) {
        return message.channel.send(cross + " **" + message.author.username + "**, you didn't provide a valid user to ban!");
      }
    }
    
   
    if (!message.guild.member(user).bannable) return message.reply(cross + ' I can\'t ban a moderator!');

    if (!banReason) {
      banReason = "Unspecified";
    }
    
   const banEmb = new Discord.MessageEmbed()
        .setColor("0xfeb637")
        .setAuthor("Banned by " + message.author.username , message.author.displayAvatarURL({type: "png", size: 1024}))
        .setTitle(user.user.tag + " has been kicked!")
        .setThumbnail(user.user.displayAvatarURL({type: "png", size: 1024}))
        .addField("Reason:", banReason, true)
        .setTimestamp()
        .setFooter("Party!", "https://i.imgur.com/B6QKBgC.png");

    
  
    await message.guild.ban(user, { reason: banReason })
      .then(
        message.channel.send(banEmb))
      .catch(console.error);
  }
};
