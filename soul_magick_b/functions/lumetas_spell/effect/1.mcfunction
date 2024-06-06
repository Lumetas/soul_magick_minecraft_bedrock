execute if entity @s[scores={2layer=1}] run function lumetas_spell/effect/speed
execute if entity @s[scores={2layer=2}] run function lumetas_spell/effect/jump
execute if entity @s[scores={2layer=3}] run function lumetas_spell/effect/haste
execute if entity @s[scores={2layer=4}] if entity @s[scores={3layer=5..}] run effect @s clear
execute if entity @s[scores={2layer=5}] if entity @s[scores={3layer=5..}] run effect @s night_vision 60 4 true
execute if entity @s[scores={2layer=6}] run function lumetas_spell/effect/health
execute if entity @s[scores={2layer=7}] run function lumetas_spell/effect/strength
execute if entity @s[scores={2layer=8}] if entity @s[scores={3layer=25}] run effect @s invisibility 60 3 true
execute if entity @s[scores={2layer=9}] if entity @s[scores={3layer=10..25}] run effect @s levitation 1 40 true
execute if entity @s[scores={2layer=10}] run function lumetas_spell/effect/resistance
execute if entity @s[scores={2layer=11}] if entity @s[scores={3layer=5..}] run effect @s clear