import { makeAutoObservable, makeObservable } from "mobx";

class survey {
  showSurvey = false;
  surveySelectedId = 0;
  surveySelectedName = "";
  surveySelectedType = "";

  constructor() {
    makeAutoObservable(this);
  }

  setShowSurvey(visible) {
    this.showSurvey = visible;
  }
  setSurveySelected({
    surveySelectedId,
    surveySelectedName,
    surveySelectedType,
  }) {
    this.surveySelectedId = surveySelectedId;
    this.surveySelectedName = surveySelectedName;
    this.surveySelectedType = surveySelectedType;
    this.showSurvey = true;
  }
}

export default new survey();
