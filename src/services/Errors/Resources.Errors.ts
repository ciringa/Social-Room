import { errorRelation } from "../../dtos/ErrorTreatmentInterface";

export class InvalidResourceError extends Error{
    constructor(private error:errorRelation ){
        super(`Cant ${error.action} because ${error.reason} in ${error.entity}. Provided ${error.resource}`);
    }
}