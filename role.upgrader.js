var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {
        
        // Keep 2 creesp of this type alive:
        var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
        if(upgraders.length < 2) {
            if(Game.spawns['Spawn1'].createCreep([WORK,CARRY,CARRY, MOVE, MOVE], undefined, {role: 'upgrader'}) == ERR_NOT_ENOUGH_ENERGY){
                console.log('Cannot spawn upgrader.  Not enough energy');
            }else {
                console.log('Spawning new upgrader');
            }
            
        }
        
        // basic movements:
        if(creep.memory.upgrading && creep.carry.energy == 0) {
            creep.memory.upgrading = false;
            creep.say('🔄 harvest');
	    }
	    if(!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.upgrading = true;
	        creep.say('⚡ upgrade');
	    }

	    if(creep.memory.upgrading) {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
        else {
            var target = creep.pos.findClosestByRange(FIND_DROPPED_ENERGY);
            var sources = creep.room.find(FIND_SOURCES);
            if(target) {
                if(creep.pickup(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            }else if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE){
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
	}
};

module.exports = roleUpgrader;