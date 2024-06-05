scoreboard players set @p 1layer 0
scoreboard players set @p 2layer 0
scoreboard players set @p 3layer 0

#1 слой
execute if block ~-1 ~ ~-1 bone_block run scoreboard players add @p 1layer 1
execute if block ~-1 ~ ~ bone_block run scoreboard players add @p 1layer 1
execute if block ~-1 ~ ~1 bone_block run scoreboard players add @p 1layer 1
execute if block ~ ~ ~1 bone_block run scoreboard players add @p 1layer 1
execute if block ~1 ~ ~1 bone_block run scoreboard players add @p 1layer 1
execute if block ~1 ~ ~-1 bone_block run scoreboard players add @p 1layer 1
execute if block ~ ~ ~-1 bone_block run scoreboard players add @p 1layer 1
execute if block ~1 ~ ~ bone_block run scoreboard players add @p 1layer 1

#2 слой
execute if block ~-2 ~ ~-2 bone_block run scoreboard players add @p 2layer 1
execute if block ~-2 ~ ~-1 bone_block run scoreboard players add @p 2layer 1
execute if block ~-2 ~ ~ bone_block run scoreboard players add @p 2layer 1
execute if block ~-2 ~ ~1 bone_block run scoreboard players add @p 2layer 1
execute if block ~-2 ~ ~2 bone_block run scoreboard players add @p 2layer 1
execute if block ~-1 ~ ~2 bone_block run scoreboard players add @p 2layer 1
execute if block ~ ~ ~2 bone_block run scoreboard players add @p 2layer 1
execute if block ~1 ~ ~2 bone_block run scoreboard players add @p 2layer 1
execute if block ~2 ~ ~2 bone_block run scoreboard players add @p 2layer 1
execute if block ~2 ~ ~1 bone_block run scoreboard players add @p 2layer 1
execute if block ~2 ~ ~ bone_block run scoreboard players add @p 2layer 1
execute if block ~2 ~ ~-1 bone_block run scoreboard players add @p 2layer 1
execute if block ~2 ~ ~-2 bone_block run scoreboard players add @p 2layer 1
execute if block ~1 ~ ~-2 bone_block run scoreboard players add @p 2layer 1
execute if block ~ ~ ~-2 bone_block run scoreboard players add @p 2layer 1
execute if block ~-1 ~ ~-2 bone_block run scoreboard players add @p 2layer 1

#3 слой
execute if block ~-3 ~ ~-3 bone_block run scoreboard players add @p 3layer 1
execute if block ~-3 ~ ~-2 bone_block run scoreboard players add @p 3layer 1
execute if block ~-3 ~ ~-1 bone_block run scoreboard players add @p 3layer 1
execute if block ~-3 ~ ~ bone_block run scoreboard players add @p 3layer 1
execute if block ~-3 ~ ~1 bone_block run scoreboard players add @p 3layer 1
execute if block ~-3 ~ ~2 bone_block run scoreboard players add @p 3layer 1
execute if block ~-3 ~ ~3 bone_block run scoreboard players add @p 3layer 1
execute if block ~-2 ~ ~3 bone_block run scoreboard players add @p 3layer 1
execute if block ~-1 ~ ~3 bone_block run scoreboard players add @p 3layer 1
execute if block ~ ~ ~3 bone_block run scoreboard players add @p 3layer 1
execute if block ~1 ~ ~3 bone_block run scoreboard players add @p 3layer 1
execute if block ~2 ~ ~3 bone_block run scoreboard players add @p 3layer 1
execute if block ~3 ~ ~3 bone_block run scoreboard players add @p 3layer 1
execute if block ~3 ~ ~3 bone_block run scoreboard players add @p 3layer 1
execute if block ~3 ~ ~2 bone_block run scoreboard players add @p 3layer 1
execute if block ~3 ~ ~1 bone_block run scoreboard players add @p 3layer 1
execute if block ~3 ~ ~ bone_block run scoreboard players add @p 3layer 1
execute if block ~3 ~ ~-1 bone_block run scoreboard players add @p 3layer 1
execute if block ~3 ~ ~-2 bone_block run scoreboard players add @p 3layer 1
execute if block ~3 ~ ~-3 bone_block run scoreboard players add @p 3layer 1
execute if block ~2 ~ ~-3 bone_block run scoreboard players add @p 3layer 1
execute if block ~1 ~ ~-3 bone_block run scoreboard players add @p 3layer 1
execute if block ~ ~ ~-3 bone_block run scoreboard players add @p 3layer 1
execute if block ~-1 ~ ~-3 bone_block run scoreboard players add @p 3layer 1
execute if block ~-2 ~ ~-3 bone_block run scoreboard players add @p 3layer 1

fill ~-3 ~ ~-3 ~3 ~ ~3 air replace bone_block
execute as @p at @s run function lumetas_spell_parser
kill