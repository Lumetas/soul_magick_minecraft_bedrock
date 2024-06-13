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

    switch (func) {
        case "redstone_one":
            if (entity.nameTag === ""){
                entity.runCommandAsync('kill');
            }
            else {
                entity.runCommand(`setblock ${entity.nameTag} redstone_block`);
                entity.runCommandAsync('kill');
            }
            break;

        case "mark1":
            entity.runCommandAsync(`execute as @p at @s run scriptevent lumetas:mark2 ${entity.location.x} ${entity.location.y} ${entity.location.z}`)
            break;

        case "mark2":
            entity.setDynamicProperty('lumetas_mark', event.message);
            break;

        case "mark3":
            if (entity.getDynamicProperty('lumetas_mark') === undefined){return false;}   
            entity.runCommandAsync(`tp @s ${entity.getDynamicProperty('lumetas_mark')}`);
            break;

        case "property":
            property = event.message.split('=')[0];
            propertyText = event.message.split('=')[1];
    
            entity.setDynamicProperty(property, propertyText);
            break;

        case "curse_damage":
            let damage = Math.round(getScore(entity, "lumetas_curse_damage") / 5);
            if (damage > 0){
                entity.runCommandAsync(`damage @s ${damage} void`);
                setScore(entity, "lumetas_curse_damage", 0);
            }
            break;

        case "get_curse_shield_damage":
            let curse_shield_counter = getScore(entity, "lumetas_curse_shield");
            let curse_shield_damage = getScore(entity, "lumetas_curse_shield_damage");
            if (Number(curse_shield_counter) === 0 && Number(curse_shield_damage) > 0){
                setScore(entity, "lumetas_curse_shield_damage", 0);
                entity.runCommand(`damage @s ${Math.round(Number(curse_shield_damage) / 2)} void`);
            }
            break;
            
        case "use_scroll_with_left_hand":
            setScore(entity, "lumetas_sneak", 0);
            const equip = entity.getComponent("minecraft:equippable");
            let slot = equip.getEquipmentSlot("Offhand");
            if (slot.typeId === "lumetas:scroll"){
                Scroll.try_cast(entity);
            }
            break;

        case "test_sneak":
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
            break;
            
            

        default:
            break;
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
        Scroll.write(player);
    }



});

world.afterEvents.itemCompleteUse.subscribe(function (data){
    const item = data.itemStack;
    const player = data.source;

    if (item.typeId === "lumetas:scroll"){
        Scroll.try_cast(player, item, "Mainhand");
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



const Scroll = {
    spell : {
        get_slot : function (player, hand, itemstack = false){//hand = string : Offhand, Mainhand
            if (itemstack){
                const equip = player.getComponent("minecraft:equippable");
                let item = equip.getEquipment(hand);
                return {equip : equip, item : item};
            }
            else {
                const equip = player.getComponent("minecraft:equippable");
                let slot = equip.getEquipmentSlot(hand);
                return slot;
            }
        },

        set : function (player, hand, array){//hand = string : Offhand, Mainhand
            let slot = this.get_slot(player, hand, true);
            slot.item.setLore([JSON.stringify(array)]);
            
            slot.equip.setEquipment(hand, slot.item);
        },

        get : function (player, hand){//hand = string : Offhand, Mainhand
                let slot = this.get_slot(player, hand);
                return JSON.parse(slot.getLore()[0]);
        },
        get_with_item(item){
            return JSON.parse(item.getLore()[0]);
        }
    },

    try_cast : function (player, item = null, hand = "Offhand"){
        if (hand === "Offhand"){
            let spell = this.spell.get(player, hand);
            this.cast(player, spell[0], spell[1], spell[2], "Offhand");
        }
        if (hand === "Mainhand" && item !== null){
            let spell = this.spell.get_with_item(item);
            this.cast(player, spell[0], spell[1], spell[2]);
        }
    },

    cast : function (player, layer1, layer2, layer3, hand = "Mainhand"){
        if (player.runCommand(`testfor @e[type=lumetas:antimage, r=25]`).successCount > 0){return false;}
        let xp_base = 7;

        let xp_to_cast = xp_base + Math.floor((layer1 - 1) * 0.2 * xp_base);

        if (player.getTotalXp() < xp_to_cast) {return false;}
        let new_xp = player.getTotalXp() - xp_to_cast;
        player.resetLevel();
        player.addExperience(new_xp);

        setScore(player, "1layer", layer1);
        setScore(player, "2layer", layer2);
        setScore(player, "3layer", layer3);
        player.runCommand('function lumetas_spell_parser');
        this.soul_particle(player);
        if (hand === "Offhand"){
            this.delete_scroll_left_hand(player);
        }
    },

    write : function (player){
        player.runCommand(`function lumetas_scrolls/parser`);
        let layer1 = getScore(player, "1layer");
        let layer2 = getScore(player, "2layer");
        let layer3 = getScore(player, "3layer");
        if (layer1 === 0){return false;}

        let spell = [layer1, layer2, layer3];
        player.runCommandAsync(`title @s actionbar layers:[${layer1}, ${layer2}, ${layer3}]`);
        this.spell.set(player, "Mainhand", spell);
    },

    delete_scroll_left_hand : function (entity){
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
    },
    soul_particle : function(player){
        player.runCommand(`particle minecraft:soul_particle ~1 ~ ~1`);
        player.runCommand(`particle minecraft:soul_particle ~1 ~ ~`);
        player.runCommand(`particle minecraft:soul_particle ~1 ~ ~-1`);
        player.runCommand(`particle minecraft:soul_particle ~ ~ ~-1`);
        player.runCommand(`particle minecraft:soul_particle ~-1 ~ ~-1`);
        player.runCommand(`particle minecraft:soul_particle ~-1 ~ ~`);
        player.runCommand(`particle minecraft:soul_particle ~-1 ~ ~1`);
        player.runCommand(`particle minecraft:soul_particle ~ ~ ~1`);
        
        player.runCommand(`particle minecraft:soul_particle ~1 ~1 ~1`);
        player.runCommand(`particle minecraft:soul_particle ~1 ~1 ~`);
        player.runCommand(`particle minecraft:soul_particle ~1 ~1 ~-1`);
        player.runCommand(`particle minecraft:soul_particle ~ ~1 ~-1`);
        player.runCommand(`particle minecraft:soul_particle ~-1 ~1 ~-1`);
        player.runCommand(`particle minecraft:soul_particle ~-1 ~1 ~`);
        player.runCommand(`particle minecraft:soul_particle ~-1 ~1 ~1`);
        player.runCommand(`particle minecraft:soul_particle ~ ~1 ~1`);
    }
}
