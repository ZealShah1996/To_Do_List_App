import { Deserializable } from "./deserilize.model";


export class Response<T> implements Deserializable{
    data: T[];
    message: T[];
    err:string;

    deserialize(input:any){
        Object.assign(this, input);
        return this;
    }
  }