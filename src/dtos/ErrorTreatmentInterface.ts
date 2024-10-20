/**
 * Basic interface for errors
 * 
 */
export interface errorRelation{
    reason:string | null
    resource:string | null,
    entity:string | null
    action:string | null
}
