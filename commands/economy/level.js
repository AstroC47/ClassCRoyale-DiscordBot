const { Client, Interaction, ApplicationCommandOptionType, AttachmentBuilder } = require('discord.js')
const canvacord = require('canvacord')
const Level = require('../../models/level')
const calculateLevelXP = require('../../utils/calculateLevelXp')

module.exports = {

    /**
     * 
     * @param {Client} client 
     * @param {Interaction} interaction
     */

    callback: async (client, interaction) => {
        if (!interaction.inGuild()){
            interaction.reply("Can only run this command inside a server");
            return;
        }

        await interaction.deferReply();

        const mentionedUserID = interaction.options.get('targetuser')?.value;
        const targetUserID = mentionedUserID || interaction.member.id;
        const targetuserObj = await interaction.guild.members.fetch(targetUserID)

        const fetchedLevel = await Level.findOne({
            userId: targetUserID,
            guildId: interaction.guild.id
        });

        if (!fetchedLevel) {
            interaction.editReply(
                mentionedUserID 
                ? `${targetuserObj.user.tag} doesn't have any levels yet.
                Try be more active in the channels.`
                : "you don't have a level yet, try be more active in the channels"
            );
                return;
            }

            let AllLevels = await Level.find( {guildId: interaction.guildId} ).select('-_id userId level xp');

            AllLevels.sort((a, b) => {
                if (a.level === b.level){
                    return b.xp - a.xp;
                } else {
                    return b.level - a.level
                }
            })

            let currentRank = AllLevels.findIndex((lvl) => lvl.userId === targetUserID) + 1;

            const rank = new canvacord.Rank()
            .setAvatar(targetuserObj.user.displayAvatarURL({ size: 256}))
            .setRank(currentRank)
            .setLevel(fetchedLevel.level)
            .setCurrentXP(fetchedLevel.xp)
            .setRequiredXP(calculateLevelXP(fetchedLevel.level))
            .setStatus(targetuserObj.presence.status)
            .setProgressBar('#FFC300', 'COLOR', )
            .setUsername(targetuserObj.user.username)
            .setDiscriminator(targetuserObj.user.discriminator);

            const data = await rank.build();
            const attachment = new AttachmentBuilder(data)
            interaction.editReply({ files: [attachment]})

        },
        name: 'level',
        description: " Shows your or another users level.",
        options: [
            {
                name: 'targetuser',
                description: 'The user you want to see the level of.',
                type: ApplicationCommandOptionType.Mentionable
            }
        ]

    }
