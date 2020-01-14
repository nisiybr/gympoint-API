module.exports = {
  up: QueryInterface => {
    return QueryInterface.bulkInsert(
      'students',
      [
        {
          name: 'Joao da Silva Neto',
          email: 'joao@gmail.com.br',
          age: 18,
          weight: 80.2,
          height: 1.7,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Maria da Silva Neto',
          email: 'maria@gmail.com.br',
          age: 20,
          weight: 65.3,
          height: 1.58,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Joaquim da Silva Neto',
          email: 'joaquim@gmail.com.br',
          age: 32,
          weight: 90.2,
          height: 1.78,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },
  down: () => {},
};
