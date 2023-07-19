const { Client, Interaction, ApplicationCommandOptionType, PermissionFlagsBits } = require('discord.js')
const ms = require('ms')

module.exports = {
    name: 'timeout',
    description: 'Give a user timeout',
    options: [
        {
            name:"targetuser",
            description: 'User tag to timeout',
            type: ApplicationCommandOptionType.Mentionable,
            required: true
        },
        {
            name:"duration",
            description: 'Timeout duration (30m, 1h, 1 day)',
            type: ApplicationCommandOptionType.String,
            required: true
        },
        {
            name:"reason",
            description: 'Reason for timeout',
            type: ApplicationCommandOptionType.String,
            required: true
        },

    ],
    permissionsRequired: [PermissionFlagsBits.MuteMembers],
    botPermissions: [PermissionFlagsBits.MuteMembers],


    /**
     * 
     * @param {Client} client 
     * @param {Interaction} interaction 
     */

    callback: async (client, interaction) => {

        const mentionable = interaction.options.get('targetuser').value
        const duration = interaction.options.get('duration').value
        const reason = interaction.options.get('reason')?.value || " no reason provided."

        await interaction.deferReply();

        const targetUser = await interaction.guild.members.fetch(mentionable);
        if (!targetUser) {
            await interaction.editReply("User doesn't exist on this server.")
            return;
        }

        if (targetUser.user.bot) {
            await interaction,editReply("Can't timeout a bot.")
            return;
        }

        const msDuration = ms(duration)

        if (isNaN(msDuration)) {
            await interaction.editReply('Provide a valid timeout duration.')
            return;
        }

        if (msDuration < 5000 || msDuration > 2.419e9){
            await interaction.editReply("timeout cannot be less than 5 s or more than 28d.")
            return;
        }
        
        const targetUserRolePosition = targetUser.roles.highest.position;
        const requestUserRolePosition = interaction.member.roles.highest.position;
        const botRolePosition = interaction.guild.members.me.roles.highest.position;

        if (targetUserRolePosition >= requestUserRolePosition) {
            await interaction.editReply(
                "Can't timeout a user with simliar or higher role."
            );
            return;
        }

        if (targetUserRolePosition >= botRolePosition) {
            await interaction.editReply(
                "Can't kick a user with same or higher role as bot."
            );
            return;
        }

        try {
            const { default: prettyMS } = await import('pretty-ms');

            if (targetUser.isCommunicationDisabled()) {
                await targetUser.timeout(msDuration, reason);
                await interaction.editReply(`${targetUser} timeout updated ${prettyMS(msDuration, { verbose: true})}`)
                return;
            }

            await targetUser.timeout(msDuration, reason);
            await interaction.editReply(`${targetUser} has been timed out for ${prettyMS(msDuration, { verbose: true})}. \n ${reason} `)

        } catch (error) {
            console.log(error)
        }

    }
}