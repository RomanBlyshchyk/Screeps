var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {
        // Keep 2 creesp of this type alive:
        var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
        if(builders.length < 3) {
            if(Game.spawns['Spawn1'].createCreep([WORK,WORK,WORK,CARRY,MOVE,MOVE, MOVE], undefined, {role: 'builder'}) == ERR_NOT_ENOUGH_ENERGY){
                console.log('Cannot spawn builder.  Not enough energy');
            }else {
                console.log('Spawning new builder');
            }
        }
        
        // basic movements:
	    if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            creep.say('🔄 harvest');
	    }
	    if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.building = true;
	        creep.say('🚧 build');
	    }

	    if(creep.memory.building) {
	        var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(targets.length) {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
	    }
	    else {
            var target = creep.pos.findClosestByRange(FIND_DROPPED_ENERGY);
            var sources = creep.room.find(FIND_SOURCES);
            var pick = _.random(0, sources.length - 1, 0);
            if(target) {
                if(creep.pickup(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            }else if(creep.harvest(sources[pick]) == ERR_NOT_IN_RANGE){
                creep.moveTo(sources[pick], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
	        //var sources = creep.room.find(FIND_SOURCES);
            //if(creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
            //    creep.moveTo(sources[1], {visualizePathStyle: {stroke: '#ffaa00'}});
            //}
	    }
	}
};

module.exports = roleBuilder;