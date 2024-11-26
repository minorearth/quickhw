import { makeAutoObservable, makeObservable } from "mobx";
import stn from "@/globals/settings";

class survey {
  showSurvey = false;
  surveySelectedId = 0;
  surveySelectedName = "";
  surveySelectedType = "";
  filetype = stn.surveys.filetypes.img.name;

  constructor() {
    makeAutoObservable(this);
  }

  setShowSurvey(visible) {
    this.showSurvey = visible;
  }

  setSurveyFileType(filetype) {
    this.filetype = filetype;
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
