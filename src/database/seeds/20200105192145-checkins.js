module.exports = {
  up: QueryInterface => {
    return QueryInterface.bulkInsert(
      'checkins',
      [
        {
          student_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          student_id: 2,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          student_id: 3,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },
  down: () => {},
};
