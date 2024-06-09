import { world, system } from '@minecraft/server';

function randomInteger(min, max) {
    // случайное число от min до (max+1)
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  }

system.afterEvents.scriptEventReceive.subscribe((event) => {

    let id = event.id.split(':')[0];
    if (id !== "lumetas"){ return false;}
    let func = event.id.split(':')[1];
    let entity = event.sourceEntity;
    
    if (func === "redstone_one"){
        if (entity.nameTag === ""){
            let redstone_id = `L${randomInteger(0,9)}${randomInteger(0,9)}${randomInteger(0,9)}${randomInteger(0,9)}${randomInteger(0,9)}${randomInteger(0,9)}`
            entity.runCommandAsync('tag @s add ' + redstone_id);
            entity.runCommandAsync('tag @s add done');
            entity.runCommandAsync('tell @p id этого блока: ' + redstone_id);
        }
        else {
            entity.runCommandAsync(`setblock ${entity.nameTag} redstone_block`);
            entity.runCommandAsync('kill');
        }
    }

    if (func === "redstone_two"){
        let name = entity.nameTag;
        if (name === ""){return false;}
        entity.runCommandAsync(`execute as @e[tag=${name}] at @s run function lumetas_redstone_hlop`);

    }

    if (func === "mark1"){
        entity.runCommandAsync(`execute as @p at @s run scriptevent lumetas:mark2 ${entity.location.x} ${entity.location.y} ${entity.location.z}`)
    }

    if (func === "mark2"){

        entity.setDynamicProperty('lumetas_mark', event.message);
    }

    if (func === "mark3"){
        if (entity.getDynamicProperty('lumetas_mark') === undefined){return false;}   
        entity.runCommandAsync(`tp @s ${entity.getDynamicProperty('lumetas_mark')}`);
        world.sendMessage('3');
    }


});


world.afterEvents.entityDie.subscribe(function(data){
    const dead = data.deadEntity;
    if (dead.typeId === "lumetas:antimage"){return false;}
    const source = data.damageSource;
    if (source.damagingEntity !== null && source.damagingEntity !== undefined){
        source.damagingEntity.runCommandAsync(`execute if entity @s[hasitem={item=lumetas:soul_picker}] run give @s lumetas:soul_spawn_egg`);
    }
})