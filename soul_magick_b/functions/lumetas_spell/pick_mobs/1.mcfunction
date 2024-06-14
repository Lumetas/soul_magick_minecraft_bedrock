execute if entity @s[scores={2layer=1}] run execute as @e[type=lumetas:soul, r=75, tag=casted] at @s run execute if block ~ ~1 ~ mob_spawner run give @p[r=75] mob_spawner
execute if entity @s[scores={2layer=1}] run execute as @e[type=lumetas:soul, r=75, tag=casted] at @s run execute if block ~ ~1 ~ mob_spawner run fill ~ ~1 ~ ~ ~1 ~ air replace mob_spawner

execute if entity @s[scores={2layer=2}] run execute as @e[type=lumetas:soul, r=75, tag=casted] at @s run execute as @e[r=2, tag=!lumetas_emb] run scriptevent lumetas:give_spawn_egg_with_mob