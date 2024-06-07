execute if entity @s[scores={2layer=1}] run execute at @e[type=lumetas:soul, r=75, tag=casted] run summon lumetas:soul ~ ~2 ~
execute if entity @s[scores={2layer=1}] run execute at @e[type=lumetas:soul, r=75, tag=casted] run summon lumetas:soul ~ ~4 ~
execute if entity @s[scores={2layer=1}] run clear @s lumetas:soul_spawn_egg 0 1

execute if entity @s[scores={2layer=2}] run execute at @e[type=lumetas:soul, r=75, tag=casted] run summon lumetas:soul ~ ~-2 ~
execute if entity @s[scores={2layer=2}] run execute at @e[type=lumetas:soul, r=75, tag=casted] run summon lumetas:soul ~ ~-4 ~
execute if entity @s[scores={2layer=2}] run clear @s lumetas:soul_spawn_egg 0 1

execute if entity @s[scores={2layer=3}] run execute at @e[type=lumetas:soul, r=75, tag=casted] run summon lumetas:soul ~ ~ ~7
execute if entity @s[scores={2layer=3}] run execute at @e[type=lumetas:soul, r=75, tag=casted] run summon lumetas:soul ~ ~ ~14
execute if entity @s[scores={2layer=3}] run clear @s lumetas:soul_spawn_egg 0 1

execute if entity @s[scores={2layer=4}] run execute at @e[type=lumetas:soul, r=75, tag=casted] run summon lumetas:soul ~ ~ ~-7
execute if entity @s[scores={2layer=4}] run execute at @e[type=lumetas:soul, r=75, tag=casted] run summon lumetas:soul ~ ~ ~-14
execute if entity @s[scores={2layer=4}] run clear @s lumetas:soul_spawn_egg 0 1

execute if entity @s[scores={2layer=5}] run execute at @e[type=lumetas:soul, r=75, tag=casted] run summon lumetas:soul ~7 ~ ~
execute if entity @s[scores={2layer=5}] run execute at @e[type=lumetas:soul, r=75, tag=casted] run summon lumetas:soul ~14 ~ ~
execute if entity @s[scores={2layer=5}] run clear @s lumetas:soul_spawn_egg 0 1

execute if entity @s[scores={2layer=6}] run execute at @e[type=lumetas:soul, r=75, tag=casted] run summon lumetas:soul ~-7 ~ ~
execute if entity @s[scores={2layer=6}] run execute at @e[type=lumetas:soul, r=75, tag=casted] run summon lumetas:soul ~-14 ~ ~
execute if entity @s[scores={2layer=6}] run clear @s lumetas:soul_spawn_egg 0 1

