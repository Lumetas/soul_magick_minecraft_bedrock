function lumetas_null

#1 слой
execute if block ~-1 ~ ~-1 bone_block run scoreboard players add @s 1layer 1
execute if block ~-1 ~ ~ bone_block run scoreboard players add @s 1layer 1
execute if block ~-1 ~ ~1 bone_block run scoreboard players add @s 1layer 1
execute if block ~ ~ ~1 bone_block run scoreboard players add @s 1layer 1
execute if block ~1 ~ ~1 bone_block run scoreboard players add @s 1layer 1
execute if block ~1 ~ ~-1 bone_block run scoreboard players add @s 1layer 1
execute if block ~ ~ ~-1 bone_block run scoreboard players add @s 1layer 1
execute if block ~1 ~ ~ bone_block run scoreboard players add @s 1layer 1

#2 слой
execute if block ~-2 ~ ~-2 bone_block run scoreboard players add @s 2layer 1
execute if block ~-2 ~ ~-1 bone_block run scoreboard players add @s 2layer 1
execute if block ~-2 ~ ~ bone_block run scoreboard players add @s 2layer 1
execute if block ~-2 ~ ~1 bone_block run scoreboard players add @s 2layer 1
execute if block ~-2 ~ ~2 bone_block run scoreboard players add @s 2layer 1
execute if block ~-1 ~ ~2 bone_block run scoreboard players add @s 2layer 1
execute if block ~ ~ ~2 bone_block run scoreboard players add @s 2layer 1
execute if block ~1 ~ ~2 bone_block run scoreboard players add @s 2layer 1
execute if block ~2 ~ ~2 bone_block run scoreboard players add @s 2layer 1
execute if block ~2 ~ ~1 bone_block run scoreboard players add @s 2layer 1
execute if block ~2 ~ ~ bone_block run scoreboard players add @s 2layer 1
execute if block ~2 ~ ~-1 bone_block run scoreboard players add @s 2layer 1
execute if block ~2 ~ ~-2 bone_block run scoreboard players add @s 2layer 1
execute if block ~1 ~ ~-2 bone_block run scoreboard players add @s 2layer 1
execute if block ~ ~ ~-2 bone_block run scoreboard players add @s 2layer 1
execute if block ~-1 ~ ~-2 bone_block run scoreboard players add @s 2layer 1

#3 слой
execute if block ~-3 ~ ~-3 bone_block run scoreboard players add @s 3layer 1
execute if block ~-3 ~ ~-2 bone_block run scoreboard players add @s 3layer 1
execute if block ~-3 ~ ~-1 bone_block run scoreboard players add @s 3layer 1
execute if block ~-3 ~ ~ bone_block run scoreboard players add @s 3layer 1
execute if block ~-3 ~ ~1 bone_block run scoreboard players add @s 3layer 1
execute if block ~-3 ~ ~2 bone_block run scoreboard players add @s 3layer 1
execute if block ~-3 ~ ~3 bone_block run scoreboard players add @s 3layer 1
execute if block ~-2 ~ ~3 bone_block run scoreboard players add @s 3layer 1
execute if block ~-1 ~ ~3 bone_block run scoreboard players add @s 3layer 1
execute if block ~ ~ ~3 bone_block run scoreboard players add @s 3layer 1
execute if block ~1 ~ ~3 bone_block run scoreboard players add @s 3layer 1
execute if block ~2 ~ ~3 bone_block run scoreboard players add @s 3layer 1
execute if block ~3 ~ ~3 bone_block run scoreboard players add @s 3layer 1
execute if block ~3 ~ ~3 bone_block run scoreboard players add @s 3layer 1
execute if block ~3 ~ ~2 bone_block run scoreboard players add @s 3layer 1
execute if block ~3 ~ ~1 bone_block run scoreboard players add @s 3layer 1
execute if block ~3 ~ ~ bone_block run scoreboard players add @s 3layer 1
execute if block ~3 ~ ~-1 bone_block run scoreboard players add @s 3layer 1
execute if block ~3 ~ ~-2 bone_block run scoreboard players add @s 3layer 1
execute if block ~3 ~ ~-3 bone_block run scoreboard players add @s 3layer 1
execute if block ~2 ~ ~-3 bone_block run scoreboard players add @s 3layer 1
execute if block ~1 ~ ~-3 bone_block run scoreboard players add @s 3layer 1
execute if block ~ ~ ~-3 bone_block run scoreboard players add @s 3layer 1
execute if block ~-1 ~ ~-3 bone_block run scoreboard players add @s 3layer 1
execute if block ~-2 ~ ~-3 bone_block run scoreboard players add @s 3layer 1

#execute unless entity @s[scores={1layer=0}] run function lumetas_scrolls/send_data

execute unless block ~ ~-1 ~ netherite_block run fill ~-3 ~ ~-3 ~3 ~ ~3 air replace bone_block