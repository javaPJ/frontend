import React from 'react';
import CalendarItem from './../CalendarItem/CalendarItem';

const CalendarList = ({lists, thisDayClick, scheduleView}) => {
  const calendarList = lists.map(
    list => (
      <CalendarItem
        year={list.year}
        month={list.month}
        day={list.day}
        schedules={list.schedule}
        thisDayClick={thisDayClick}
        scheduleView={scheduleView}
      >
      </CalendarItem>
    )
  )

  return (
      <div>
        {calendarList}
      </div>
  );
}

export default CalendarList;
