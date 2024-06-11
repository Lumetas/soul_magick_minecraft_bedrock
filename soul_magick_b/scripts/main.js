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
    }


    if (func === "property"){
        //world.sendMessage('p');
        property = event.message.split('=')[0];
        propertyText = event.message.split('=')[1];

        entity.setDynamicProperty(property, propertyText);
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


world.afterEvents.itemStartUse.subscribe(function (data){
    //world.sendMessage('start');
    const item = data.itemStack;
    const player = data.source;

    if (item.typeId === "lumetas:scroll"){
        player.runCommandAsync(`function lumetas_scrolls/parser`);
    }
    //player.runCommandAsync('function lumetas_scrolls/parser')

});

world.afterEvents.itemStopUse.subscribe(function (data){
    
    const item = data.itemStack;
    const player = data.source;

    if (item.typeId === "lumetas:scroll"){
        let scroll = item.nameTag;
        let layer1 = getScore(player, "1layer");
        let layer2 = getScore(player, "2layer");
        let layer3 = getScore(player, "3layer");
        
        if (layer1 === 0){return false;}
        let spell = [scroll, layer1, layer2, layer3];
        player.runCommandAsync(`title @s actionbar spell:${scroll}, layers:[${layer1}, ${layer2}, ${layer3}]`);
        player.setDynamicProperty(`scroll-${scroll}`, JSON.stringify(spell));
    }



});

world.afterEvents.itemCompleteUse.subscribe(function (data){
    

    const item = data.itemStack;
    const player = data.source;

    if (item.typeId === "lumetas:scroll"){
        
        let spell = JSON.parse(player.getDynamicProperty(`scroll-${item.nameTag}`));

        let xp_base = 7;

        let xp_to_cast = xp_base + Math.floor((spell[1] - 1) * 0.2 * xp_base);

        if (player.getTotalXp() < xp_to_cast) {return false;}
        let new_xp = player.getTotalXp() - xp_to_cast;
        player.resetLevel();
        player.addExperience(new_xp);

        setScore(player, "1layer", spell[1]);
        setScore(player, "2layer", spell[2]);
        setScore(player, "3layer", spell[3]);
        player.runCommandAsync('function lumetas_spell_parser');

    }
});

function getScore(player, objective){
    return world.scoreboard.getObjective(objective).getScore(player);
}

function setScore(player, objective, score){
    try {world.scoreboard.getObjective(objective).setScore(player, score);}
    catch(e){player.runCommandAsync(`scoreboard players set @s ${objective} ${score}`)}
}