import { makeObservable, makeAutoObservable } from "mobx";
class snack {
  snackState = { visible: false, text: "" };

  showSnack(text) {
    this.snackState.visible = true;
    this.snackState.text = text;
  }
  closeSnack() {
    this.snackState.visible = false;
  }
  constructor() {
    makeAutoObservable(this);
  }
}

export default new snack();
