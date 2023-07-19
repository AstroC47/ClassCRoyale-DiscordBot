module.exports = {

    name: 'msping',
    description: "Replies with bot ping",
    callback: async (client, interaction) => {
        await interaction.deferReply();

        const reply = await interaction.fetchReply();

        const ping = reply.createdTimestamp - interaction.createdTimestamp;

        interaction.editReply(`Bot: ${ping}ms | Websocket: ${client.ws.ping}`)
    }

}