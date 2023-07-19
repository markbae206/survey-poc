import React, { useEffect, useState } from "react";
import {
  ReactQuestionFactory,
  Survey,
  SurveyQuestionElementBase,
} from "survey-react-ui";
import { ElementFactory, Question, Serializer } from "survey-core";
import styles from "./styles.module.scss";

const CUSTOM_TYPE = "thermometer";

export class QuestionThermometerModel extends Question {
  getType() {
    return CUSTOM_TYPE;
  }

  get title() {
    return this.getPropertyValue("title");
  }

  set title(val) {
    this.setPropertyValue("title", val);
  }

  get minVal() {
    return this.getPropertyValue("minVal");
  }

  set minVal(val) {
    this.getPropertyValue("minVal", val);
  }

  get maxVal() {
    return this.getPropertyValue("maxVal");
  }

  set maxVal(val) {
    this.getPropertyValue("maxVal", val);
  }

  get minLabel() {
    return this.getPropertyValue("minLabel");
  }
  set minLabel(val) {
    this.setPropertyValue("minLabel", val);
  }

  get maxLabel() {
    return this.getPropertyValue("maxLabel");
  }

  set maxLabel(val) {
    this.setPropertyValue("maxLabel", val);
  }
}

Serializer.addClass(
  CUSTOM_TYPE,
  [
    {
      name: "title",
      default: "thermometer",
    },
    {
      name: "minVal",
      default: 0,
    },
    {
      name: "maxVal",
      default: 10,
    },
    {
      name: "minLabel",
      default: "None",
    },
    {
      name: "maxLabel",
      default: "Extreme",
    },
  ],
  function () {
    return new QuestionThermometerModel("");
  },
  "question"
);

ElementFactory.Instance.registerElement(CUSTOM_TYPE, (name) => {
  return new QuestionThermometerModel(name);
});

// A class that renders questions of the new type in the UI
export class SurveyQuestionThermometer extends SurveyQuestionElementBase {
  constructor(props:any) {
    super(props);
    // not sure why the example sets state and never uses it
    this.state = { value: this.question.value };
    console.log("this", this);
  }
  get question() {
    return this.questionBase;
  }

  get value() {
    return this.question.value;
  }

  get minVal() {
    return parseInt(this.question.minVal);
  }

  get maxVal() {
    return parseInt(this.question.maxVal);
  }

  get minLabel() {
    return this.question.minLabel;
  }

  get maxLabel() {
    return this.question.maxLabel;
  }

  handleChange = (val: number) => {
    this.question.value = val;
  };

  renderElement() {
    return (
      <Thermometer
        {...{
          curVal: this.value,
          minVal: this.minVal,
          maxVal: this.maxVal,
          minLabel: this.minLabel,
          maxLabel: this.maxLabel,
          handler: this.handleChange,
          isDisplayMode: this.props.isDisplayMode
        }}
      />
    );
  }
}

interface ThermometerProps {
  minVal: number
  maxVal: number
  curVal: number
  minLabel: string
  maxLabel: string
  handler: (val:number) => void 
  isDisplayMode: boolean
}

function Thermometer({ minVal, maxVal, minLabel, maxLabel, curVal, handler, isDisplayMode}:ThermometerProps) {
  let [value, setVal] = useState(curVal || 0);
  useEffect(() => {
    handler(value);
  }, [value]);

  return (
    <div className={`${styles.thermometerContainer}`}>
      <div className={`${styles.leftContainer}`}>
        <div>
          <p>{maxLabel}</p>
          <div className={`${styles.thermometerItemsContainer}`}>
            {Array(maxVal - minVal)
              .fill("")
              .map((_, i) => {
                return (
                  <div
                    key={`idx_${i}`}
                    className={`${styles.thermometerItem} ${
                      value >= i + minVal + 1
                        ? styles.thermometerItemSelectd
                        : "F"
                    }`}
                    data-value={i + minVal + 1}
                  ></div>
                );
              })}
          </div>
          <p>{minLabel}</p>
        </div>
      </div>
      <div className={`${styles.rightContainer}`}>
        <button
          className="sd-btn"
          onClick={() => {
            value < maxVal && setVal(value + 1);
          }}
          disabled={isDisplayMode}
        >
          Up
        </button>
        <button
          className="sd-btn"
          onClick={() => value > minVal && setVal(value - 1)}
          disabled={isDisplayMode}
        >
          Down
        </button>
      </div>
    </div>
  );
}

ReactQuestionFactory.Instance.registerQuestion(CUSTOM_TYPE, (props) => {
  return React.createElement(SurveyQuestionThermometer, props);
});
