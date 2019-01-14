import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { User } from "../model/user.model";
import { Response } from "./../model/utilityModels/response.model";
import { Todolist } from "../model";
import { StreamPriorityOptions } from "http2";
import { HttpRequest } from "selenium-webdriver/http";
import { Observable } from "rxjs";

@Injectable()
export class UserService {
  constructor(private http: HttpClient) {}
  baseUrl: string = "http://localhost:4000";
  httpHeaders = {};

  getUsers(modelName: string, headers?: any) {
    let model=this.convertInToCamelCase(modelName.toLowerCase()).slice(0,modelName.toLowerCase().length-1);
    return this.http.get<Response<User>>(this.baseUrl + `/${modelName}`, {
      headers: this.headersAssign(headers)
    });
  }

  getUserById(id: number, modelName: string, headers?: any) {

    return this.http.get<Response<Todolist>>(this.baseUrl + `/${modelName}/` + id, {
      headers: this.headersAssign(headers)
    });
  }

  createUser(user: User, modelName: string, headers?: any) {
    return this.http.post(this.baseUrl + `/${modelName}/create/0`, user, {
      headers: this.headersAssign(headers)
    });
  }

  updateUser(user: User, modelName: string, headers?: string) {
    return this.http.patch(
      this.baseUrl + `/${modelName}/update/` + user.id,
      user,
      {
        headers: this.headersAssign(headers)
      }
    );
  }

  deleteUser(id: number, modelName: string, headers?: any) {
    return this.http.delete(this.baseUrl + `/${modelName}/delete/` + id, {
      headers: this.headersAssign(headers)
    });
  }

  headersAssign(headers: any) {
    let defaultheaders = {
      requiredfields: "id,name,age,created_at",
      limit: "40"
    };
    if (headers != undefined && headers != null) {
      this.httpHeaders = headers;
      return this.httpHeaders;
    } else {
      this.httpHeaders = defaultheaders;
      return this.httpHeaders;
    }
  }


  convertInToCamelCase(string) {
    return `${string.toLocaleUpperCase().charAt(0)}${string.split('').slice(1, string.length).join('').toString()}`;
  }


sendRequest(httpRequestType:string,url:string,data:any,headers:Object,modelName:string,description:string){

console.log("Execution of sendRequest.");
console.log("Requesting for creation of new record!!!!!");
let httpMethodsWhichNeededBody=["post","patch"];
let optionsPassedWithData={
  headers: this.headersAssign(headers)
};
let returnData;
if(httpMethodsWhichNeededBody.indexOf(httpRequestType)==-1){
  console.log("In Normal request where data need not required.")

  return this.http[httpRequestType](this.baseUrl + url,optionsPassedWithData);
  //console.log("Execution of sendRequest is End.")
}
else{
  console.log("In Normal request where data need required.")

  return this.http[httpRequestType](this.baseUrl + url,data,optionsPassedWithData);
 // console.log("Execution of sendRequest is End.")
}
}
}
