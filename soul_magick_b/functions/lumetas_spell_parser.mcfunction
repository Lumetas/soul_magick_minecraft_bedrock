tag @s add caster



execute if entity @s[scores={1layer=1}] run function lumetas_spell/fangs/1
execute if entity @s[scores={1layer=2}] run function lumetas_spell/cold/1
execute if entity @s[scores={1layer=3}] run function lumetas_spell/fire/1
execute if entity @s[scores={1layer=4}] run function lumetas_spell/lighting/1
execute if entity @s[scores={1layer=5}] run function lumetas_spell/effect/1
execute if entity @s[scores={1layer=6}] run function lumetas_spell/curse/1
execute if entity @s[scores={1layer=7}] run function lumetas_spell/break/1
execute if entity @s[scores={1layer=8}] run function lumetas_spell/mark/1



#execute if entity @s[scores={1layer=8}] run function lumetas_spell/tnt/1








tag @s remove caster
