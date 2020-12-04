class User{


    public _userID:string = "";
    public _name:string = "";
    public _lname:string = "";
    public _eAddr:string = "";
    private _password:string = "";

    constructor(userID:string, name:string, lname:string, eaddr:string, password:string) {
        this._userID=userID;
        this._name=name;
        this._lname=lname;
        this._eAddr = eaddr;
        this._password=password;

    }

    get userID(): string {
        return this._userID;
    }

    set userID(value: string) {
        this._userID = value;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get lname(): string {
        return this._lname;
    }

    set lname(value: string) {
        this._lname = value;
    }

    get eAddr(): string {
        return this._eAddr;
    }

    set eAddr(value: string) {
        this._eAddr = value;
    }

    get password(): string {
        return this._password;
    }

    set password(value: string) {
        this._password = value;
    }

}
export let arrayOfUsers: User[];
export {User};
