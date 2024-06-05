scoreboard objectives add world dummy
scoreboard players add initialised world 0



execute if score initialised world matches 0 run function lumetas_load


scoreboard players set initialised world 1