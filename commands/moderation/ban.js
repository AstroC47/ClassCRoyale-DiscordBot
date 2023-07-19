const { ApplicationCommandOptionType, PermissionFlagsBits } = require('discord.js')


module.exports = {
    name: 'ban',
    description: 'Bans a member!',
    deleted:true,
    options: [
        {
            name: 'target-user',
            description: 'The user you want to ban',
            required: true,
            type: ApplicationCommandOptionType.Mentionable,
        },
        {
            name: 'reason',
            description: 'Reason for ban',
            type: ApplicationCommandOptionType.String,
        }
    ],
    permissionsRequired:[PermissionFlagsBits.Administrator],
    botsPermissions:[PermissionFlagsBits.Administrator],

    callback:(client, interaction) =>  {
        interaction.reply(`banning`)
    }

}