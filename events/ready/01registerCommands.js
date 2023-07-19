
const { testServer } = require('../../config.json');
const areCommandsDifferent = require('../../utils/areCommandsDifferent');
const getApplicationCommands = require('../../utils/getApplicationCommands');
const getLocalCommands = require('../../utils/getLocalCommands')

module.exports = async (client) => {

        const localCommands = getLocalCommands();

        try {
            const localCommand = getLocalCommands();
            const applicationCommands = await getApplicationCommands(client, testServer)

            for (const localCommand of localCommands){
                const { name, description, options } = localCommand;

                const existingCommand = await applicationCommands.cache.find(
                    (cmd) => cmd.name === name
                )

                if (existingCommand) {
                    if (localCommand.deleted) {
                        await applicationCommands.delete(existingCommand.id)
                        console.log(`Deleted command ${name}`)
                        continue;
                    }

                    if (areCommandsDifferent(existingCommand,localCommand)){

                        await applicationCommands.edit(existingCommand.id,{
                            description,
                            options
                        });

                        console.log(`Command ${name} edited`)

                    }
                } else {

                    if (localCommand.deleted){
                        console.log(`Skipping Registering command "${name}" as it was deleted`)
                        continue;
                    }

                    await applicationCommands.create({
                        name,
                        description,
                        options,
                    })

                    console.log(`command "${name}" registerd`)

                }
            }
            
        } catch (error) {
            console.log(error)
            
        }


}