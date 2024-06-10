import { world, system } from '@minecraft/server';
export function parser(obj, dem){

    
    const x = obj.x;
    const y = obj.y;
    const z = obj.z;
    world.sendMessage('1');
    dem.getBlock({x:x, y: y-1, z:z}).hasTag("bone_block")
    world.sendMessage('2');
}
