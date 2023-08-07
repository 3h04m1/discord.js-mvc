import { NewSchematic } from "./new.schematic";

export function schematicFactory(schematic:string){
    switch(schematic){
        case 'new':
            return new NewSchematic();
        default:
            throw new Error(`Schematic ${schematic} not found`);
    }
}