execute if entity @s[scores={4layer=0}] if entity @s[scores={5layer=0}] run function lumetas_spell_parser
execute if entity @s[scores={4layer=0}] if entity @s[scores={5layer=0}] run execute at @e[type=lumetas:soul, r=75, tag=casted] run execute unless block ~ ~-1 ~ netherite_block run fill ~-3 ~ ~-3 ~3 ~ ~3 air replace bone_block


execute if entity @s[scores={4layer=1..}] run function lumetas_plus_spell_parser
execute if entity @s[scores={4layer=1..}] run scoreboard players add @s plusfunc 1

execute if entity @s[scores={5layer=1.., plusfunc=0}] run function lumetas_plus_spell_parser
scoreboard players set @s plusfunc 0

execute at @e[type=lumetas:soul, r=75, tag=casted] run function lumetas_soul_particle