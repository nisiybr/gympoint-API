module.exports = {
  up: QueryInterface => {
    return QueryInterface.bulkInsert(
      'registrations',
      [
        {
          student_id: 1,
          plan_id: 1,
          start_date: '2020-01-01 03:00:00+00',
          end_date: '2020-01-31 03:00:00+00',
          price: 129,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          student_id: 2,
          plan_id: 2,
          start_date: '2020-01-01 03:00:00+00',
          end_date: '2020-03-31 03:00:00+00',
          price: 327,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          student_id: 3,
          plan_id: 3,
          start_date: '2020-01-01 03:00:00+00',
          end_date: '2020-06-30 03:00:00+00',
          price: 534,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },
  down: () => {},
};
