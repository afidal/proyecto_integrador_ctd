export const buildCalendar = (value) => {
    const startDay = value.clone().startOf("month").startOf("week")
    const endDay = value.clone().endOf("month").endOf("week")

    const day = startDay.clone().subtract(1, "day");
    const calendar = []
    while (day.isBefore(endDay, "day")) {
        calendar.push(
            Array(7).fill(0).map(() => day.add(1, "day").clone())
        )
    }
    console.log(calendar[0][1]._d);
    return calendar;
}

export const buildCalendarSecond = (value) => {
    const startDay = value.clone().startOf("month").startOf("week");
    const endDay = value.clone().endOf("month").endOf("week");

    const day= startDay.clone().subtract(1, "day");
    const calendarSecond = []
    while (day.isBefore(endDay, "day")) {
        calendarSecond.push(
            Array(7).fill(0).map(() => day.add(1, "day").clone())
        )
    }
    return calendarSecond;
}