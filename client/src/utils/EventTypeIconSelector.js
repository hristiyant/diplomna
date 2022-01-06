import IconBadminton from "../assets/event-type-icons/badminton.svg";
import IconBasketball from "../assets/event-type-icons/basketball.svg";
import IconBox from "../assets/event-type-icons/box.svg";
import IconFootball from "../assets/event-type-icons/football.svg";
import IconGolf from "../assets/event-type-icons/golf.svg";
import IconHandball from "../assets/event-type-icons/handball.svg";
import IconHockey from "../assets/event-type-icons/hockey.svg";
import IconRugby from "../assets/event-type-icons/rugby.svg";
import IconRunning from "../assets/event-type-icons/running.svg";
import IconSwimming from "../assets/event-type-icons/swimming.svg";
import IconTableTennis from "../assets/event-type-icons/table-tennis.svg";
import IconTennis from "../assets/event-type-icons/tennis.svg";
import IconTriathlon from "../assets/event-type-icons/triathlon.svg";
import IconVolleyball from "../assets/event-type-icons/volleyball.svg";

export const getEventTypeIcon = (eventType) => {
    var icon;

    switch (eventType) {
        case "BADMINTON":
            icon = IconBadminton;
            break;
        case "BASKETBALL":
            icon = IconBasketball;
            break;
        case "BOX":
            icon = IconBox;
            break;
        case "FOOTBALL":
            icon = IconFootball;
            break;
        case "GOLF":
            icon = IconGolf;
            break;
        case "HANDBALL":
            icon = IconHandball;
            break;
        case "HOCKEY":
            icon = IconHockey;
            break;
        case "RUGBY":
            icon = IconRugby;
            break;
        case "RUNNING":
            icon = IconRunning;
            break;
        case "SWIMMING":
            icon = IconSwimming;
            break;
        case "TABLE_TENNIS":
            icon = IconTableTennis;
            break;
        case "TENNIS":
            icon = IconTennis;
            break;
        case "TRIATHLON":
            icon = IconTriathlon;
            break;
        default: // Volleyball
            icon = IconVolleyball;
            break;
    }

    return icon;
}