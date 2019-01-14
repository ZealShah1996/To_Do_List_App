import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { UserService } from "../service/user.service";
import { User } from "../model/user.model";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-list-user",
  templateUrl: "./list-user.component.html",
  styleUrls: ["./list-user.component.css"]
})
export class ListUserComponent implements OnInit {
  module = "users";
  getmethodname = "getUsers";
  addLabelName: string;
  users: User[];
  userId: number;
  fieldsToFetchForForm: Object;
  headers: any;
  tableHeaders: string[] = [];
  tableRows = [];
  noDataAvaiable: boolean = false;
  url: string;
  id;
  constructor(
    private router: Router,
    private userService: UserService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    let queryParams = this.route.snapshot.paramMap;
    this.id = parseInt(queryParams.get("id"));
    this.userId = parseInt(queryParams.get("id"));
    // this.userId=parseInt(queryParams.get("usersid"))
    this.fieldsToFetchForForm = this.route.snapshot.data.fieldsToFetchForForm;
    this.module = this.route.snapshot.data.module;
    this.addLabelName = this.route.snapshot.data.addLableName;
    this.headers = this.route.snapshot.data.headers;
    this.url =
      this.route.snapshot.data.url != null &&
      this.route.snapshot.data.url != undefined
        ? `${this.route.snapshot.data.url}`
        : `${this.module}`;
    this.url =
      this.route.snapshot.data.url != null &&
      this.route.snapshot.data.url != undefined
        ? `${this.url.replace(
            this.url.substring(
              this.url.indexOf("${"),
              this.url.indexOf("}") + 1
            ),
            this.id
          )}`
        : `/${this.module}`;

    this.refreshTable();

    // this.userService[this.getmethodname](this.module, this.headers).subscribe(
    //   Response => {
    //     this.users = Response.data;
    //     this.makeTableFromApiResponse(this.users, "id");
    //   }
    // );
  }

  deleteUser(id: number): void {
    this.userService.deleteUser(id, this.module).subscribe(data => {
      //this.users = this.users.filter(u => u !== user);
      this.refreshTable();
    });
  }

  editUser(id: number): void {
    this.router.navigate([`edit/${this.module}/${id}/${this.userId}`]);
  }

  addUser(): void {
    this.router.navigate([`edit/${this.module}/-1/${this.userId}`]);
  }

  convertToDate(date: string): string {
    let dateInDateFormat = new Date(date);
    console.log();
    let dateInDateFromat = `${dateInDateFormat.toDateString()}`;
    return dateInDateFromat;
  }

  refreshTable() {
    // this.userService[this.getmethodname](this.module, this.headers).subscribe(
    //   Response => {
    //     this.users = Response.data;
    //     this.makeTableFromApiResponse(this.users, "id");
    //   }
    // );

    this.userService
      .sendRequest(
        "get",
        `${this.url}`,
        null,
        { requiredFields: this.fieldsToFetchForForm },
        `${this.module}`,
        `update a data of ${this.module} ${this.userId}`
      )
      .subscribe(
        data => {
          this.users = data.data;
          this.makeTableFromApiResponse(this.users, "id");
          // this.router.navigate([`list-${this.module}/${this.userId}`]);
        },
        error => {
          alert(error);
        }
      );
  }

  makeTableFromApiResponse(json, primarykey) {
    //let tableHtml = "";
    //let headerOfHtml = "";
    // json[0].forEach((val)=>{
    if (json.length == 0) {
      this.tableHeaders = [];
      this.tableRows = [];
      this.noDataAvaiable = true;
    } else {
      console.log(json[0]);
      // let html = "<tr>";
      this.tableHeaders = [];
      this.tableRows = [];
      Object.keys(json[0]).forEach(item => {
        console.log("headers" + item);
        if (item != "id") this.tableHeaders.push(item);
      });
      this.tableHeaders.push("action");

      let i = 0;

      json.forEach(val => {
        console.log(val);
        let row = {};
        Object.keys(val).forEach(item => {
          console.log(item);
          row[item] = val[item];
        });
        this.tableRows.push(row);
      });
    }
  }
}
