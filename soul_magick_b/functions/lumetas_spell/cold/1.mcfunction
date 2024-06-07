execute if entity @s[scores={2layer=2, 3layer=3..24}] run execute at @e[r=25, tag=!caster, tag=!lumetas_emb] run function lumetas_spell/cold/box
execute if entity @s[scores={2layer=1, 3layer=3..}] run function lumetas_spell/cold/stan
execute if entity @s[scores={2layer=2, 3layer=25}] run execute at @e[r=25, tag=!caster, tag=!lumetas_emb] run function lumetas_spell/cold/bigbox