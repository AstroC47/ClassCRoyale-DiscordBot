const User = require('../../models/user')
const { Client, Interaction } = require('discord.js')

module.exports = {

    name: 'balance',
    description: 'Get the balance of a user',
    /**
     * 
     * @param {Client} client 
     * @param {Interaction} interaction 
     */
    callback: async (client, interaction) => {
        if (!interaction.inGuild) {
            interaction.reply({
                    contnt: "can only run this command in a server",
                    ephemeral: true
                })
                return
        }

        try {
            await interaction.deferReply();

            let query = {
                userId: interaction.member.id,
                guildId: interaction.guild.id
            }


            let user = await User.findOne(query)

            if (user) {
                interaction.editReply(`<@${interaction.user.id}> has a balance of ${user.balance}`)
                return
            } else {
                interaction.editReply(`<@${interaction.user.id}> doesn't have a balance yet`)
            }
            
        } catch (error) {
            console.log(`error getting balance: ${error}`)
        }

    }

}