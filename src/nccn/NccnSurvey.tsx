import "survey-core/defaultV2.min.css";
import "survey-core/survey.i18n";
import { Model } from "survey-core";
import { Survey } from "survey-react-ui";
import nccnJson from "./nccnTemplate";
import "./../customQuestions/Thermometer";

export default function NccnSurvey() {
  const survey = new Model(nccnJson);
  survey.showPreviewBeforeComplete = "showAllQuestions";
  survey.onComplete.add((sender) => {
    console.log(sender.data);
  });

  return <Survey model={survey} />;
}
