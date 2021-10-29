const system   = server.registerSystem(0, 0);
let globalVars = {};

//=====================================================================================
// Configuration Options
//=====================================================================================


//=====================================================================================
// Global Variables
//=====================================================================================


//=====================================================================================
// Server Initialization
//=====================================================================================
// the system will call this routine in order to initialize the script -- this is called prior
// to the world being ready and players joining
system.initialize = function() {
    this.listenForEvent("minecraft:entity_death"          , (eventData) => this.onEntityDeath(eventData));
};


//=====================================================================================
// Server Event Handlers
//=====================================================================================
// handler that fires whenever any entity in the world has died; if the
// death is a player then record his/her death (and murderer, if applicable)
// immediately. For mob kills simply update the component for a delayed save
system.onEntityDeath = function(eventData) {
    if (eventData.data.entity.__identifier__ == "minecraft:player") {
        let playerName     = this.getComponent(eventData.data.entity, "minecraft:nameable").data.name;
        let position       = this.getComponent(eventData.data.entity, "minecraft:position");
        let positionCoords = `${Math.round(position.data.x)}, ${Math.round(position.data.y)}, ${Math.round(position.data.z)}`;

        let BroadcastEventData = this.createEventData("minecraft:display_chat_event");
        BroadcastEventData.data.message = `RIP ${playerName} @ ${positionCoords}`;
        this.broadcastEvent("minecraft:display_chat_event", BroadcastEventData);
    }
};
