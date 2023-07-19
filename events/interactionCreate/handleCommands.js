const  { devs, testServer} = require('../../config.json')
const getLocalCommands = require('../../utils/getLocalCommands')


module.exports = async (client, interaction) => {

    if (interaction.isChatInputCommand()){

        const localCommands = getLocalCommands()

        try {
            const commandObject = localCommands.find((cmd => cmd.name === interaction.commandName));

            if(!commandObject) return;

            if (commandObject.devOnly) {

                if (!devs.include(interaction.member.id)){
                    interaction.reply({
                        content: 'Only devs are allowed to run this command',
                        ephemeral : true
                    })
                    return;
                }

            }

            if (commandObject.testOnly) {

                if (!(interaction.guild.id === testServer)){
                    interaction.reply({
                        content: 'Command can only be run on test server',
                        ephemeral : true
                    })
                    return;
                }

            }

            if (commandObject.permissionsRequired?.length) {
                for (const permission of commandObject.permissionsRequired) {
                    if (!interaction.member.permissions.has(permission)){
                        interaction.reply({
                            content: "user does not have enough permissions to run command",
                            ephemeral: true,
                        })
                        return;
                    }
                }
            }

            if (commandObject.botPermissions?.length){
                for (const permission of commandObject.botPermissions){
                    const bot = interaction.guild.members.me;

                    if (!bot.permissions.has(permission)){
                        interaction.reply({
                            content: "Bot does not have enough permissions",
                            ephemeral: true,
                        })
                        return;
                    }
                }
            }

            await commandObject.callback(client, interaction)
    
            
        } catch (error) {
            console.log(`there was an error running command: ${error}`)
        }

    }
    
}