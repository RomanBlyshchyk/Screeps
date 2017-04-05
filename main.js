var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleMiner = require('role.miner');

module.exports.loop = function () {
    
    //getCreepStats();
    
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    for(var name in Game.creeps) {
        
        var creep = Game.creeps[name];
        if(creep.memory.role == 'miner') {
            roleMiner.run(creep);
        }
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        
    }
}



function getCreepStats(){
    var harvesterNames = '';
    var builderNames = '';
    var upgraderNames = '';
    var minerNames = '';
    
    var builderCount = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder').length;
    var harvesterCount = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester').length;
    var upgraderCount = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader').length;
    var minerCount = _.filter(Game.creeps, (creep) => creep.memory.role == 'miner').length;
    console.log('Creeps statistics');
    console.log('   '+builderCount+' builders');
    console.log('   '+harvesterCount+' harvesters');
    console.log('   '+upgraderCount+' upgraders');
    console.log('   '+minerCount+' miners');
    doCreepCount = false;
}

