const getUpcomingMonday = (): Date => {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const daysUntilMonday = (dayOfWeek === 0) ? 1 : 8 - dayOfWeek; // Adjust for Sunday (0) to move to Monday
  const upcomingMonday = new Date(today);
  upcomingMonday.setDate(today.getDate() + daysUntilMonday);
  return upcomingMonday;
};

export const adjustScheduleToCurrentWeek = (
  lessons: { title: string; start: Date; end: Date }[]
): { title: string; start: Date; end: Date }[] => {
  const upcomingMonday = getUpcomingMonday();

  return lessons.map((lesson) => {
    const lessonDayOfWeek = lesson.start.getDay();
    const daysFromMonday = lessonDayOfWeek === 0 ? 6 : lessonDayOfWeek - 1;

    const adjustedStartDate = new Date(upcomingMonday);
    adjustedStartDate.setDate(upcomingMonday.getDate() + daysFromMonday);
    adjustedStartDate.setHours(
      lesson.start.getHours(),
      lesson.start.getMinutes(),
      lesson.start.getSeconds()
    );

    const adjustedEndDate = new Date(adjustedStartDate);
    adjustedEndDate.setHours(
      lesson.end.getHours(),
      lesson.end.getMinutes(),
      lesson.end.getSeconds()
    );

    return {
      title: lesson.title,
      start: adjustedStartDate,
      end: adjustedEndDate,
    };
  });
};
