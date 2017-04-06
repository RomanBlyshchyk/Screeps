/*
*   Miner gets to the source and stays there, quickly mining the energy, 
*   which allows other harvesters to harvest from the miner
*/
var roleMiner = {
    
    /** @param {Creep} creep **/
    run: function(creep) {
        
        // Keep 2 creesp of this type alive:
        var miner = _.filter(Game.creeps, (creep) => creep.memory.role == 'miner');
        //var oldMiner = _.filter(Game.creeps, (creep) => creep.ticksToLive < 100);
        if(miner.length < 3) {
            if(Game.spawns['Spawn1'].createCreep([WORK,WORK,WORK,WORK,CARRY,MOVE], undefined, {role: 'miner'}) == ERR_NOT_ENOUGH_ENERGY){
                //console.log('Cannot spawn miner.  Not enough energy');
            }else {
                console.log('Spawning new miner');
            }
        }
        
        
        // basic movements:
	    if(creep.carry.energy < creep.carryCapacity) {
            var sources = creep.room.find(FIND_SOURCES);
            var pick = _.random(0, sources.length - 1, 0);
            if(creep.harvest(sources[pick]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[pick], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }else {
            creep.drop(RESOURCE_ENERGY,5);
        }
	}
};

module.exports = roleMiner;