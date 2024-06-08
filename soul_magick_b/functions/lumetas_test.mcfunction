function lumetas_emb
execute as @e[type=lumetas:antimage] at @s run kill @e[type=lumetas:soul, r=25]
execute as @e[type=lumetas:soul] at @s run function lumetas_parser

