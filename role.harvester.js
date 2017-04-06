var roleHarvester = {
    
    /** @param {Creep} creep **/
    run: function(creep) {
        
        // Keep 2 creesp of this type alive:
        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
        if(harvesters.length < 3) {
            if(Game.spawns['Spawn1'].createCreep([WORK,WORK,CARRY,MOVE,MOVE], undefined, {role: 'harvester'}) == ERR_NOT_ENOUGH_ENERGY){
                //console.log('Cannot spawn harvester.  Not enough energy');
            }else {
                console.log('Spawning new harvester');
            }
        }
        
        // basic movements:
	    if(creep.carry.energy < creep.carryCapacity) {
            var target = creep.pos.findClosestByRange(FIND_DROPPED_ENERGY);
            var sources = creep.room.find(FIND_SOURCES);
            if(target) {
                if(creep.pickup(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            }else if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE){
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            }

            /*
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
            */
            
        }
        else {
            var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION || 
                        structure.structureType == STRUCTURE_SPAWN ||
                        structure.structureType == STRUCTURE_TOWER) &&
                            structure.energy < structure.energyCapacity;
                    }
            });
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        }
	}
};

module.exports = roleHarvester;