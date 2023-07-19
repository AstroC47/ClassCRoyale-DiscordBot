require('dotenv').config()

const { REST, Routes, ApplicationCommandOptionType } = require('discord.js')

const commands = [
    {
        name:'add',
        description:'adds two numbers',
        options: [
            {
                name: 'firstnumber',
                description: 'first number',
                type: ApplicationCommandOptionType.Number,
                choices:[
                    {
                        name:'one',
                        value:1,
                    },
                    {
                        name:'two',
                        value:2,
                    },
                    {
                        name:'three',
                        value:2,
                    },
                ],
                required: true
            },{
                name: 'secondnumber',
                description: 'second number',
                type: ApplicationCommandOptionType.Number,
                required: true
            }
        ]
    },
    {
        name:'hi',
        description:'greeting',
    },
    {
        name:'embed',
        description: 'sends embed'
    }

];

const rest = new REST({version:'10'}).setToken(process.env.BOT_TOKEN);

(async () => {
    try {

        console.log('Registering slash commands')

        await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID,process.env.GUILD_ID),
            {body: commands}
        )

        console.log('slash commands registered')

    } catch (error) {
        console.log(error)
    }
})();