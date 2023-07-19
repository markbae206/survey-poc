const distressThermometer = {
  elements: [
    {
      type: "thermometer",
      title: "NCCN Distress Thermometer",
      name: "nccnDistressThermometer",
      minVal: 0,
      maxVal: 10,
      minLabel: "0 - No Distress",
      maxLabel: "10 - Extreme Distress",
    },
  ],
};

const physicalConcerns = {
  elements: [
    {
      type: "checkbox",
      name: "physicalConcerns",
      title: "Physical Concerns",
      colCount: 1,
      description:
        "Have you had concerns about any of the items below in the past week, including today? (Mark all that apply)",
      choices: [
        "Pain",
        "Fatigue",
        "Tobacco Use",
        "Substance use",
        "Memory or concentration",
        "Sexual health",
        "Changes in eating",
        "Loss or change of physical abilities",
      ],
    },
  ],
};

const otherConcerns = {
  elements: [
    {
      type: "comment",
      name: "otherConcerns",
      title: "Other Concerns",
      maxLength: 255,
    },
  ],
};

const nccnJson = {
  title: "NCCN Distress 2022",
  showProgressBar: "top",
  pages: [distressThermometer, physicalConcerns, otherConcerns],
  showQuestionNumbers: false,
};

export default nccnJson;
