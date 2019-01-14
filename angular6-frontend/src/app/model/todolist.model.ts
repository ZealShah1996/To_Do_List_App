import { Deserializable } from "./utilityModels/deserilize.model";


export class Todolist implements Deserializable{
    id: number;
    name: string;
    color:string;
    user_id:Number;
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
