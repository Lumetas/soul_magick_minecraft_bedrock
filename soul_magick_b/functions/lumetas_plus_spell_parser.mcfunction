tag @s add caster

execute if entity @s[scores={1layer=8}] run function lumetas_spell/teleport/1
execute if entity @s[scores={1layer=1}] run function lumetas_spell/activator/1

tag @s remove caster

