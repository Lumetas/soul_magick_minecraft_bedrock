execute if entity @s[scores={2layer=1}] run scoreboard players add @e[r=25, tag=!caster, tag=!lumetas_emb, tag=!lumetas_my_team] lumetas_curse_damage 0
execute if entity @s[scores={2layer=1}] run scoreboard players operation @e[r=25, tag=!caster, tag=!lumetas_emb, tag=!lumetas_my_team] lumetas_curse_damage += @s 3layer

execute if entity @s[scores={2layer=2}] run execute as @e[r=25, tag=!caster, tag=!lumetas_emb, tag=!lumetas_my_team] at @s run scriptevent lumetas:curse_damage

execute if entity @s[scores={2layer=3}] run scoreboard players add @s lumetas_curse_shield 0
execute if entity @s[scores={2layer=3}] run scoreboard players set @s lumetas_calc 20
execute if entity @s[scores={2layer=3}] run scoreboard players operation @s lumetas_calc *= @s 3layer
execute if entity @s[scores={2layer=3}] run scoreboard players operation @s lumetas_curse_shield += @s lumetas_calc