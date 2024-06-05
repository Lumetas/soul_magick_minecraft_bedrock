execute if entity @s[scores={2layer=1..3}] run function lumetas_spell/lighting/2
execute if entity @s[scores={2layer=1..3}] run scoreboard players add @s 2layer -1
execute if entity @s[scores={2layer=1..3}] run function lumetas_spell/lighting/1
execute if entity @s[scores={2layer=4..}] run function lumetas_null