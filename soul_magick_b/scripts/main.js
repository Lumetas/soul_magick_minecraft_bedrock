import { world, system} from '@minecraft/server';
//import { MinecraftItemTypes } from '@minecraft/vanilla-data';
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

    if (func === "curse_damage"){
        let damage = Math.round(getScore(entity, "lumetas_curse_damage") / 5);
        if (damage > 0){
            entity.runCommandAsync(`damage @s ${damage} void`);
            setScore(entity, "lumetas_curse_damage", 0);
        }
    }

    if (func === "get_curse_shield_damage"){
        let curse_shield_counter = getScore(entity, "lumetas_curse_shield");
        let curse_shield_damage = getScore(entity, "lumetas_curse_shield_damage");
        if (Number(curse_shield_counter) === 0 && Number(curse_shield_damage) > 0){
            setScore(entity, "lumetas_curse_shield_damage", 0);
            entity.runCommand(`damage @s ${Math.round(Number(curse_shield_damage) / 2)} void`);
        }
    }

    if (func === "use_scroll_with_left_hand"){
        setScore(entity, "lumetas_sneak", 0);
        use_spell_with_left_hand(entity);
    }

    if (func === "test_sneak"){
        if (entity.isSneaking){
            addScore(entity, "lumetas_sneak", 1);
            const equip = entity.getComponent("minecraft:equippable");
            let slot = equip.getEquipmentSlot("Offhand");
            if (slot.typeId === "lumetas:scroll"){
                    if ((45 - Number(getScore(entity, "lumetas_sneak"))) > 0){
                        entity.runCommandAsync(`title @s actionbar §0 ${45 - Number(getScore(entity, "lumetas_sneak"))}`);
                    }
            }
        }
        else {
            setScore(entity, "lumetas_sneak", 0);
        }
    }
});


world.afterEvents.entityDie.subscribe(function(data){
    const dead = data.deadEntity;
    if (dead.typeId === "lumetas:antimage"){return false;}
    const source = data.damageSource;
    if (source.damagingEntity !== null && source.damagingEntity !== undefined){
        source.damagingEntity.runCommandAsync(`execute if entity @s[hasitem={item=lumetas:soul_picker}] run give @s lumetas:soul_spawn_egg`);
    }

    if (Number(getScore(dead, "lumetas_curse_shield_damage")) > 0){
        setScore(dead, "lumetas_curse_shield_damage", 0);
    }
    if (Number(getScore(dead, "lumetas_curse_shield")) > 0){
        setScore(dead, "lumetas_curse_shield", 0);
    }
})


world.afterEvents.itemStartUse.subscribe(function (data){
    //world.sendMessage('start');
    const item = data.itemStack;
    const player = data.source;


    //player.runCommandAsync('function lumetas_scrolls/parser')

});

world.afterEvents.itemStopUse.subscribe(function (data){
    
    const item = data.itemStack;
    const player = data.source;

    if (item.typeId === "lumetas:scroll"){
        player.runCommand(`function lumetas_scrolls/parser`);
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
        player.runCommand('function lumetas_spell_parser');

    }
});

function getScore(player, objective){
    return world.scoreboard.getObjective(objective).getScore(player);
}

function setScore(player, objective, score){
    try {world.scoreboard.getObjective(objective).setScore(player, score);}
    catch(e){player.runCommandAsync(`scoreboard players set @s ${objective} ${score}`)}
}
function addScore(player, objective, score){
    try {world.scoreboard.getObjective(objective).addScore(player, score);}
    catch(e){player.runCommandAsync(`scoreboard players set @s ${objective} ${score}`)}
}

function delete_scroll_left_hand(entity){
    const equip = entity.getComponent("minecraft:equippable");
    let slot = equip.getEquipmentSlot("Offhand");
    if (slot.typeId === "lumetas:scroll"){
        if (slot.amount > 1){
            slot.amount -= 1;
        }
        else{
            equip.setEquipment("Offhand", null);
        }
    }
}

function use_spell_with_left_hand(player){
    const equip = player.getComponent("minecraft:equippable");
    let slot = equip.getEquipmentSlot("Offhand");


    if (slot.typeId === "lumetas:scroll"){
        
        let spell = JSON.parse(player.getDynamicProperty(`scroll-${slot.nameTag}`));

        let xp_base = 7;

        let xp_to_cast = xp_base + Math.floor((spell[1] - 1) * 0.2 * xp_base);

        if (player.getTotalXp() < xp_to_cast) {return false;}
        let new_xp = player.getTotalXp() - xp_to_cast;
        player.resetLevel();
        player.addExperience(new_xp);

        setScore(player, "1layer", spell[1]);
        setScore(player, "2layer", spell[2]);
        setScore(player, "3layer", spell[3]);
        player.runCommand('function lumetas_spell_parser');

    }



    delete_scroll_left_hand(player);

}

world.afterEvents.entityHealthChanged.subscribe(function (data){
    const entity = data.entity;
    const newValue = data.newValue;
    const oldValue = data.oldValue;

    let curse_shield_counter = getScore(entity, "lumetas_curse_shield");
    let curse_shield_damage = getScore(entity, "lumetas_curse_shield_damage");
    // world.sendMessage(String(curse_shield_counter));
    if (Number(curse_shield_counter) > 0){
        // world.sendMessage(String(newValue));
        // world.sendMessage(String(oldValue));
        let change = Number(oldValue) - Number(newValue);
        if (change > 0){
            entity.runCommand('effect @s instant_health 1 100 true');
            addScore(entity, "lumetas_curse_shield_damage", change);
        }
    }
    


    

})