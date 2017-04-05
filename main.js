var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleMiner = require('role.miner');

var tenCount = 10;

module.exports.loop = function () {
    
    //getCreepStats();
    
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

function memoryClean(){
    if(tenCount == 0){
        for(var name in Memory.creeps) {
            if(!Game.creeps[name]) {
                delete Memory.creeps[name];
                console.log('Clearing non-existing creep memory:', name);
            }
        }
        tenCount = 10;
    }else {
        tenCount--;
    }
}

function getCreepStats(){
    var harvesterNames = '';
    var builderNames = '';
    var upgraderNames = '';
    var minerNames = ''; //
    
    var builder = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    var harvester = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    var upgrader = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    var miner = _.filter(Game.creeps, (creep) => creep.memory.role == 'miner');
    console.log('Creeps statistics:');
    console.log('   '+builder.length +' builders');
    console.log('   '+harvester.length +' harvesters');
    console.log('   '+upgrader.length +' upgraders');
    console.log('   '+miner.length +' miners');
/*
    console.log("Builders:");
    for(var creep in builder){
        console.log('   ' + creep.name + ' - ' + creep.ticksToLive);
    }
*/
}

