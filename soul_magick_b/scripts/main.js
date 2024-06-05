import { world } from '@minecraft/server';


world.afterEvents.entityDie.subscribe(function(data){
    const dead = data.deadEntity;
    const source = data.damageSource;
    if (source.damagingEntity !== null && source.damagingEntity !== undefined){
        source.damagingEntity.runCommandAsync(`execute if entity @s[hasitem={item=lumetas:soul_picker}] run give @s lumetas:soul_spawn_egg`);
    }
})