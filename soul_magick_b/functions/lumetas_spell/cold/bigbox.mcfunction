fill ~2 ~-1 ~2 ~-2 ~3 ~-2 minecraft:ice keep
fill ~1 ~ ~1 ~-1 ~2 ~-1 minecraft:air replace minecraft:ice
summon lumetas:support ~ ~3 ~
tag @e[type=lumetas:support, r=4] add ice_box
scoreboard players set @e[tag=ice_box, r=4] timer 1200