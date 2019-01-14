import { Component, OnInit } from "@angular/core";
import { UserService } from "../service/user.service";
import { Router } from "@angular/router";
import { User, Todolist } from "../model/index";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  FormArray
} from "@angular/forms";
import { first } from "rxjs/operators";
import { ActivatedRoute } from "@angular/router";
import { element } from "protractor";

@Component({
  selector: "app-edit-model",
  templateUrl: "./edit-model.component.html",
  styleUrls: ["./edit-model.component.css"]
})
export class EditModelComponent implements OnInit {
  allClass = [User, Todolist];

  module = "users";
  modelData: any;
  id: number;
  fieldsAreAllowedToEdit: Object;
  fieldsToFetchForForm: Object;
  editForm: FormGroup;
  userId: number;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private route: ActivatedRoute
  ) {}

  findKeyOfObject(object) {
    return Object.keys(object)[0];
  }

  ngOnInit() {
    this.module = this.route.snapshot.data.module;

    let defaultUser = new User();
    let defaultToDoList = new Todolist();

    let modelName = this.convertInToCamelCase(this.module.toLowerCase()).slice(
      0,
      this.module.toLowerCase().length - 1
    );
    let model = require("./../model/index")[modelName];
    this.modelData = new model();

    let queryParams = this.route.snapshot.paramMap;
    this.id = parseInt(queryParams.get("id"));
    if (queryParams.has("userid")) {
      this.userId = parseInt(queryParams.get("userid"));
    } else {
      this.userId = this.id;
    }

    this.fieldsAreAllowedToEdit = this.route.snapshot.data.fieldsAreAllowedToEdit;
    this.fieldsToFetchForForm = this.route.snapshot.data.fieldsToFetchForForm;

    if (this.id < 1 && this.id != -1) {
      alert("Invalid action.");
      this.router.navigate([`list/${this.module}`]);
      return;
    }
    this.createHtmlFromFields(
      this.fieldsAreAllowedToEdit,
      this.fieldsToFetchForForm,
      this.editForm
    );
  }

  createAControl(element): FormGroup {
    return this.formBuilder.group({
      [element]: [""]
    });
  }

  onSubmit() {
    if (this.id == 0) {
      // this.userService
      //   .createUser(this.modelData, this.module)
      //   .pipe(first())

        this.modelData.user_id=this.userId;

      this.userService
        .sendRequest(
          "post",
          `/${this.module}/create/${this.id}`,
          this.modelData,
          null,
          "todolists",
          `update a data of ${this.module} ${this.id}`
        )
        .subscribe(
          data => {
            debugger;
            this.router.navigate([`list-${this.module}/${this.userId}`]);
          },
          error => {
            alert(error);
          }
        );
    } else {
      this.userService
        .sendRequest(
          "patch",
          `/${this.module}/update/${this.id}`,
          this.modelData,
          null,
          "todolists",
          `update a data of ${this.module} ${this.id}`
        )
        .subscribe(
          data => {
            debugger;
            this.router.navigate([`list-${this.module}/${this.userId}`]);
          },
          error => {
            alert(error);
          }
        );
      // this.userService
      //   .updateUser(this.modelData, this.module)
      //   .pipe(first())
      //   .subscribe(
      //     data => {
      //       this.router.navigate(["list-users"]);
      //     },
      //     error => {
      //       alert(error);
      //     }
      //   );
    }
  }

  createHtmlFromFields(
    fieldsAreAllowedToEdit,
    fieldsToFetchForForm,
    editForm: FormGroup
  ) {
    let controlsOfForm = [];
    //= <FormArray>editForm.controls['formFields'];
    let keysWhichAreAllowedToEdit = Object.keys(fieldsAreAllowedToEdit);
    fieldsToFetchForForm.forEach(prop => {
      if (keysWhichAreAllowedToEdit.indexOf(prop) < 0) {
      } else {
        if (fieldsAreAllowedToEdit[prop]["required"] == 1) {
          controlsOfForm.push(this.createAControl(prop));
        } else {
          controlsOfForm.push(this.createAControl(prop));
        }
      }
    });

    this.editForm = this.formBuilder.group({
      formFields: this.formBuilder.array(controlsOfForm)
    });
    if (this.id != -1) {
      // this.userService
      //   .getUserById(this.id, this.module)
      //   .subscribe(response => {
      //     this.modelData = response.data[0];
      //   });
      this.userService
        .sendRequest(
          "get",
          `/${this.module}/${this.id}`,
          null,
          { requiredFields: fieldsToFetchForForm },
          `${this.module}`,
          `getting a data of ${this.module} ${this.id}`
        )
        .pipe(first())
        .subscribe(
          data => {
            debugger;
            this.modelData = data.data[0];
            // this.router.navigate(["list-to-do-lists/1"]);
          },
          error => {
            alert(error);
          }
        );
    } else {
      this.id = 0;
    }
  }

  findingValueOfkey(key) {
    if (this.modelData != undefined && this.modelData != null)
      return this.modelData[key.toLocaleLowerCase()];
    else {
      return key;
    }
  }

  stringfy(object: object): String {
    let key = this.findKeyOfObject(object);
    return key;
  }

  convertInToCamelCase(string) {
    return `${string.toLocaleUpperCase().charAt(0)}${string
      .split("")
      .slice(1, string.length)
      .join("")
      .toString()}`;
  }
}
