const Observable = require("@nativescript/core").Observable;
const Sqlite = require("nativescript-sqlite");
const ObservableArray = require("tns-core-modules/data/observable-array").ObservableArray;



function createViewModel(database) {
    const viewModel = new Observable();
    viewModel.firstname = "";
    viewModel.lastname = "";
    viewModel.arrayA=new ObservableArray([]);

    viewModel.insert = function() {
        database.execSQL("INSERT INTO people (firstname, lastname) VALUES (?, ?)", [this.firstname, this.lastname]).then(id => {
        }, error => {
            console.log("INSERT ERROR", error);
        });
        database.all("SELECT * FROM people").then(rows => {
            for(let row in rows) {
                rows[row];
               
            } this.arrayA.push(rows); this.arrayA.reverse();
        }, error => {
            console.log("SELECT ERROR", error);
        });
    }
    /*viewModel.select = function() {
        database.all("SELECT * FROM people").then(rows => {
            for(let row in rows) {
                console.log("RESULT", rows[row]);
               
            } this.arrayA.push(rows); this.arrayA.reverse();
        }, error => {
            console.log("SELECT ERROR", error);
        });
    }*/
    return viewModel;
}

exports.createViewModel = createViewModel;
