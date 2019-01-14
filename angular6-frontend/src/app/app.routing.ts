import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { AddUserComponent } from "./add-user/add-user.component";
import { ListUserComponent } from "./list-user/list-user.component";
import { EditModelComponent } from "./edit-user/edit-model.component";

const routes: Routes = [
  { path: "login", component: LoginComponent },
  //{ path: 'add\:module', component: AddUserComponent },
  {
    path: "list-users/:id",
    component: ListUserComponent,
    data: {
      module: "users",
      addLableName: "new User",
     // url: "/todolists/users/${this.userid}",
      fieldsToFetchForForm: ["id", "name", "age"]
    }
  },
  {
    path: "list-todolists/:id",
    component: ListUserComponent,
    data: {
      module: "todolists",
      addLableName: "new To do List",
      fieldsToFetchForForm: ["id", "name","color"],
     url: "/todolists/users/${this.id}",
      headers: { requiredfields: "id,name,color,created_at" }
    }
  },
  { path: "list/:module", component: ListUserComponent },
  {
    path: "edit/users/:id/:userid",
    component: EditModelComponent,
    data: {
      module: "users",
      fieldsAreAllowedToEdit: { name: { required: 1 }, age: { required: 1 } },
     // url: "/todolists/users/1",
      fieldsToFetchForForm: ["id", "name", "age"]
    }
  },
  {
    path: "edit/todolists/:id/:userid",
    component: EditModelComponent,
    data: {
      module: "todolists",
      fieldsAreAllowedToEdit: {
        name: { required: 1 },
       // user_id: { required: 1 },
        color: { required: 1 }
      },
     // url: "/todolists/users/1",
      fieldsToFetchForForm: ["id", "name", "color", "user_id"]
    }
  },
  //path : 'heroes', component : HeroDetailComponent,
  //{ path: '\edit\:module?:id', component:  EditUserComponent},
  {path : '', component : LoginComponent}
];

export const routing = RouterModule.forRoot(routes);
