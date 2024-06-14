tag @s add caster

execute if entity @s[scores={1layer=1}] run function lumetas_spell/activator/1

execute if entity @s[scores={1layer=3, 2layer=2..10}] run function lumetas_spell/itemtp/1
execute if entity @s[scores={1layer=3, 2layer=1}] run execute as @e[type=lumetas:soul, r=75, tag=casted] at @s run tp @e[type=item, r=20] @s
execute if entity @s[scores={1layer=4, 3layer=25}] run function lumetas_spell/pick_mobs/1



execute if entity @s[scores={1layer=8}] run function lumetas_spell/teleport/1



tag @s remove caster

