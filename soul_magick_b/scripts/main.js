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
        let redstone_id = `L${randomInteger(0,9)}${randomInteger(0,9)}${randomInteger(0,9)}${randomInteger(0,9)}${randomInteger(0,9)}${randomInteger(0,9)}`
        entity.runCommandAsync('tag @s add ' + redstone_id);
        entity.runCommandAsync('tag @s add done');
        entity.runCommandAsync('tell @p id этого блока: ' + redstone_id);
    }

    if (func === "redstone_two"){
        let name = entity.nameTag;
        entity.runCommandAsync(`execute as @e[tag=${name}] at @s run function lumetas_redstone_hlop`);

    }



});


world.afterEvents.entityDie.subscribe(function(data){
    const dead = data.deadEntity;
    const source = data.damageSource;
    if (source.damagingEntity !== null && source.damagingEntity !== undefined){
        source.damagingEntity.runCommandAsync(`execute if entity @s[hasitem={item=lumetas:soul_picker}] run give @s lumetas:soul_spawn_egg`);
    }
})