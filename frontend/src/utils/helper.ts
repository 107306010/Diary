import { TAGS, EMOTIONS } from "../config/config";


export const parseDate = (date: string) => {
    const date_obj = new Date(date)
    const current_date_arr: Array<string> = date_obj.toLocaleDateString("en-GB",{
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        weekday: 'long'
    }).split("/");

    const transform_day_of_week = (week_of_day:string): string => {
        switch(week_of_day){
            case "Monday":
                return '(一)';
            case "Tuesday":
                return '(二)';
            case "Wednesday":
                return '(三)';
            case "Thursday":
                return '(四)';
            case "Friday":
                return '(五)';
            case "Saturday":
                return '(六)';
            case "Sunday":
                return '(日)';
            default:
                return ""
        }
    }

    const format_date = {
        year: current_date_arr[2],
        month: current_date_arr[1],
        day: current_date_arr[0].split(",")[1].trimStart(),
        day_of_week:
            transform_day_of_week(current_date_arr[0].split(",")[0]),
    }
    return format_date
}

export const labelsMapper = (labels: Number[], type: string) =>{

    switch(type){
        case "tags":
            return TAGS.filter((tag) => {
                return labels.includes(tag.key)
            })
        case "emotions":
            return EMOTIONS.filter((emotion) => {
                return labels.includes(emotion.key)
            })
        default:
            return []
    }
}