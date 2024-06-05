execute if entity @s[scores={2layer=1..5}] run function lumetas_spell/fangs/2
execute if entity @s[scores={2layer=1..5}] run scoreboard players add @s 2layer -1
execute if entity @s[scores={2layer=1..5}] run function lumetas_spell/fangs/1
execute if entity @s[scores={2layer=6..}] run function lumetas_null