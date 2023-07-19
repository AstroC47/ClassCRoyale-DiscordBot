const path = require('path')
const getAllFiles = require('../utils/getAllFiles')

module.exports = (client) => {
    const eventfolders = getAllFiles(path.join(__dirname, '..', 'events'), true)

    for (const eventFolder of eventfolders) {
        const eventFiles = getAllFiles(eventFolder);

        eventFiles.sort((a,b) => a > b);
        
        const eventName = eventFolder.replace(/\\/g,'/').split('/').pop()
        // console.log(eventName)

        client.on(eventName, async (arg) => {
            for (const eventFile of eventFiles){
                const eventFunction = require(eventFile);
                await eventFunction(client, arg);
            }
        })
    }

   
}