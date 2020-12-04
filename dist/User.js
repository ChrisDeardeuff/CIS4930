"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.arrayOfUsers = void 0;
class User {
    constructor(userID, name, lname, eaddr, password) {
        this._userID = "";
        this._name = "";
        this._lname = "";
        this._eAddr = "";
        this._password = "";
        this._userID = userID;
        this._name = name;
        this._lname = lname;
        this._eAddr = eaddr;
        this._password = password;
    }
    get userID() {
        return this._userID;
    }
    set userID(value) {
        this._userID = value;
    }
    get name() {
        return this._name;
    }
    set name(value) {
        this._name = value;
    }
    get lname() {
        return this._lname;
    }
    set lname(value) {
        this._lname = value;
    }
    get eAddr() {
        return this._eAddr;
    }
    set eAddr(value) {
        this._eAddr = value;
    }
    get password() {
        return this._password;
    }
    set password(value) {
        this._password = value;
    }
}
exports.User = User;
exports.arrayOfUsers = [];
//# sourceMappingURL=User.js.map