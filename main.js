var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleMiner = require('role.miner');
var roleRepairer = require('role.repairer');

var tenCount = 100;

module.exports.loop = function () {
    
    getCreepStats();
    memoryClean();
    for(var name in Game.creeps) {
        
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'miner') {
            roleMiner.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if(creep.memory.role == 'repairer'){
            roleRepairer.run(creep);
        }
    }
    
    var tower = Game.getObjectById("f1321dbde493a7559f4e205a");
    if(tower){
        //repair
        var closestDamage = tower.pos.findClosestByRange(FIND_MY_STRUCTURES,{
            filter: (structure) => structure.hits < structure.hitsMax
        });
        if(closestDamage){
            tower.repair(closestDamage);
        }
        
        //defend
        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile){
            tower.attack(closestHostile);
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
        tenCount = 100;
    }else {
        tenCount--;
    }
}

function getCreepStats(){
    if(tenCount == 100){
        
        var harvesterNames = '';
        var builderNames = '';
        var upgraderNames = '';
        var minerNames = ''; 
        var repairerNames = '';
        
        var builder = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
        var harvester = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
        var upgrader = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
        var miner = _.filter(Game.creeps, (creep) => creep.memory.role == 'miner');
        var repairer = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');
        console.log('Creeps statistics:');
        console.log('   '+builder.length +' builders');
        console.log('   '+harvester.length +' harvesters');
        console.log('   '+upgrader.length +' upgraders');
        console.log('   '+miner.length +' miners');
        console.log('   '+repairer.length +' repairers');
        /*
        console.log("Builders:");
        for(var creep in builder){
            console.log('   ' + creep.name + ' - ' + creep.ticksToLive);
        }
        */
    }

}

