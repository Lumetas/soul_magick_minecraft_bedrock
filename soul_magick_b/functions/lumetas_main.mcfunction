#автозагрузка
scoreboard objectives add world dummy
scoreboard players add initialised world 0
execute if score initialised world matches 0 run function lumetas_load
scoreboard players set initialised world 1

execute as @e[tag=ice_box, scores={timer=1..}] at @s run function lumetas_spell/cold/unbox

