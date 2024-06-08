#автозагрузка
scoreboard objectives add world dummy
scoreboard players add initialised world 0
execute if score initialised world matches 0 run function lumetas_load
scoreboard players set initialised world 1

execute as @e[tag=ice_box, scores={timer=1..}] at @s run function lumetas_spell/cold/unbox

execute at @e[type=lumetas:antimage] run particle minecraft:soul_particle ~ ~0.5 ~

execute at @e[type=lumetas:redstone_soul] run particle minecraft:redstone_ore_dust_particle ~ ~0.5 ~