const User = require('../../models/user')
const { Client, Interaction } = require('discord.js')

const dailyAmount = 100;

module.exports = {
    name: 'daily',
    description: "Collect your daily rewards.",
    /**
     * 
     * @param {Client} client
     * @param {Interaction} interaction
     */
    callback: async (client, interaction) => {

        if (!interaction.inGuild()) {
            interaction.reply({
            content: "Can only run command in server",
            ephemeral: true,
        });
        return
        }

        try {
            await interaction.deferReply();

            let query = {
                userId: interaction.member.id,
                guildId: interaction.guild.id,
            };

        let user = await User.findOne(query);

        if (user) {
            const lastDailyDate = user.lastDaily.toDateString();
            const currentDate = new Date().toDateString();

            if (lastDailyDate === currentDate) {
                interaction.editReply(
                    "Already collected daily rewards. Come back tomorrow."
                );
                return;
            }

            user.lastDaily = new Date()

        } else {
                user = new User({
                    ...query,
                    lastDaily: new Date(),
                });
            }
            
        user.balance += dailyAmount;
        await user.save();

        interaction.editReply(`${dailyAmount} was added to balance. Current Balance: ${user.balance}`)

        } catch (error) {
            console.log(`error with daily ${error}`)
        }
    
    }
}