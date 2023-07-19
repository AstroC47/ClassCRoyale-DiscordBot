require('dotenv').config()

const { ActionRowBuilder, ButtonBuilder } = require('@discordjs/builders');
const { Client, IntentsBitField, ButtonStyle } = require('discord.js');

const client = new Client({ intents: [IntentsBitField.Flags.Guilds,
                                      IntentsBitField.Flags.GuildMembers,
                                      IntentsBitField.Flags.GuildMessages,
                                      IntentsBitField.Flags.MessageContent] });


const roles = [

    {id:'1081513230180028427',label:'blue'},
    {id:'1081513469133738055',label:'green'}

]


client.on('ready', async (c) =>{
    console.log(`${c.user.tag} is reedy`)
    try{
        const channel = await client.channels.cache.get('1080424874411049020')

        const row = new ActionRowBuilder();

        roles.forEach((role) => {
            row.components.push(
                new ButtonBuilder()
                .setCustomId(role.id)
                .setLabel(role.label)
                .setStyle(ButtonStyle.Primary)
            )
        })

        await channel.send(
            {
                content: 'claim or remove a role below',
                components: [row]
            }
        )
        process.exit()

    } catch (error) {
        console.log(error)
    }
})

client.login(process.env.BOT_TOKEN);