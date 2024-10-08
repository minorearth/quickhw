import { makeObservable, makeAutoObservable } from "mobx";
class user {
  userid = "";

  setUserid(id) {
    this.userid = id;
  }

  constructor() {
    makeAutoObservable(this);
  }
}

export default new user();
