export function setSurveyResponse(number) {
    let surveyResponse = sessionStorage.getItem("surveyResponse");
    surveyResponse = surveyResponse ? `${surveyResponse}${number}` : `${number}`
    sessionStorage.setItem("surveyResponse", surveyResponse);
}