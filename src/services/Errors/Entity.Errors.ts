

export class EntityErrors extends Error{
    constructor(entity:string, action:string, reason:string){
        super(`Error when tried to ${action} a ${entity} entity. reason:${reason}`)
    }
}