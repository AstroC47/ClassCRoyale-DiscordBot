require('dotenv').config()
const { Client, IntentsBitField, EmbedBuilder, ActivityType } = require('discord.js');
const eventHandler = require('./handlers/eventHandler.js')
const mongoose = require('mongoose')

const client = new Client({ intents: [IntentsBitField.Flags.Guilds,
                                      IntentsBitField.Flags.GuildMembers,
                                      IntentsBitField.Flags.GuildMessages,
                                      IntentsBitField.Flags.MessageContent,
                                      IntentsBitField.Flags.GuildPresences] });


(async () => {

try {

    // mongoose.set('strictQuery', false)
    //await mongoose.connect(process.env.MONGODB_URI)
    console.log("connected to DB.")

    eventHandler(client);

    client.login(process.env.BOT_TOKEN);
    
} catch (error) {
    console.log(`bot error ${error}`)
}

})();


// let status = [
//     {
//         name: "up and running",
//         type: ActivityType.Watching
//     },
//     {
//         name: "up and running right now",
//         type: ActivityType.Watching
//     }
// ]

// client.on('ready',  (c) =>{
//     console.log(`${c.user.tag} is reedy`)

//     // setInterval(() => {
//     // let random = Math.floor(Math.random() * status.length)
//     // client.user.setActivity(status[random])

//     // }, 10000)

// })

// client.on('interactionCreate', async (interaction) => {

//     if (interaction.isChatInputCommand()){

//     if (interaction.commandName === 'hi') {
//         interaction.reply('hi! '+interaction.user.tag);
//     }

//     if (interaction.commandName === 'add') {

//         // const num1 = interaction.options.get('firstnumber')?.value   optional chaining for options that are not required
//         // const num2 = interaction.options.get('secondnumber')?.value
//         const num1 = interaction.options.get('firstnumber').value
//         const num2 = interaction.options.get('secondnumber').value

//         interaction.reply(`The Sum is ${num1+num2}`)

//     }

//     if (interaction.commandName === 'embed') {

//         const embed = new EmbedBuilder()
//         .setTitle("Embed title")
//         .setDescription('This is the description')
//         .setColor('Random')
//         .addFields({name:'field title', value:'values here', inline: true},{name:'field title 2', value:'values here 2', inline: true})

//         interaction.reply({ embeds:[embed] })

//     }
// }



//         try {
//             if (interaction.isButton()){
//             await interaction.deferReply({ephemeral: true});

//         const role = interaction.guild.roles.cache.get(interaction.customId);

//         if (!role) {
//             interaction.editReply({
//             content: "Couldn't find that role",
//             })
//             return;
//         }

//         const hasRole = interaction.member.roles.cache.has(role.id);

//         if (hasRole) {
//             await interaction.member.roles.remove(role);
//             await interaction.editReply(`The role ${role} has been removed`)
//             return;
//         }

//         await interaction.member.roles.add(role);
//         await interaction.editReply(`The role ${role} has been added`)
//         return;
//         }

//         } catch (error) {
            
//             console.log(error)

//         }
// })

// client.on('messageCreate', (msg)=> {

//     if (msg.author.tag != client.user.tag){
//         msg.reply(msg.author.tag)
//         // msg.channel.send(msg.author.tag)     //for no reply
//         console.log(msg.content)
//         console.log(msg.guild.id)
//     }
    
// })

