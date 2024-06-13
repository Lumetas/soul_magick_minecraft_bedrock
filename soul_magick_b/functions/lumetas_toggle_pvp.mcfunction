execute if entity @s[scores={lumetas_pvp=1}] run title @s actionbar ПВП включено
execute if entity @s[scores={lumetas_pvp=1}] run tag @s add lumetas_pvp_toggled
execute if entity @s[scores={lumetas_pvp=1}] run scoreboard players set @s lumetas_pvp 0
execute if entity @s[scores={lumetas_pvp=0}, tag=!lumetas_pvp_toggled] run title @s actionbar ПВП выключено
execute if entity @s[scores={lumetas_pvp=0}, tag=!lumetas_pvp_toggled] run scoreboard players set @s lumetas_pvp 1
tag @s remove lumetas_pvp_toggled

