#автозагрузка
scoreboard objectives add world dummy
scoreboard players add initialised world 0
execute if score initialised world matches 0 run function lumetas_load
scoreboard players set initialised world 1

execute as @e[tag=ice_box, scores={timer=1..}] at @s run function lumetas_spell/cold/unbox

execute at @e[type=lumetas:antimage] run particle minecraft:soul_particle ~ ~0.5 ~

execute at @e[type=lumetas:redstone_soul] run particle minecraft:redstone_ore_dust_particle ~ ~0.5 ~

execute as @a[scores={lumetas_curse_shield=1..}] at @s run scoreboard players add @s lumetas_curse_shield -1

execute as @a[scores={lumetas_curse_shield=0}] at @s run scriptevent lumetas:get_curse_shield_damage

execute as @a at @s run scriptevent lumetas:test_sneak

execute as @a[scores={lumetas_sneak=45..}] at @s run scriptevent lumetas:use_scroll_with_left_hand

execute as @a at @s run execute unless entity @s[scores={lumetas_pvp=0}] unless entity @s[scores={lumetas_pvp=1}] run scoreboard players set @s lumetas_pvp 0
execute as @e[type=lumetas:soul_activator] at @s run execute as @p at @s run function lumetas_toggle_pvp
kill @e[type=lumetas:soul_activator]