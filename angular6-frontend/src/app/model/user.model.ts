import { Deserializable } from "./utilityModels/deserilize.model";


export class User implements Deserializable{
    id: number;
    name: string;
    password:string;
    age:Number;
    created_at:Date;
    updated_at:Date;
    is_deleted:Boolean;
    is_active:Boolean;
    context:Object;

    deserialize(input:any){
        Object.assign(this, input);
        return this;
    }
  }