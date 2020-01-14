module.exports = {
  up: QueryInterface => {
    return QueryInterface.bulkInsert(
      'help_orders',
      [
        {
          student_id: 1,
          question: 'Boa tarde. Poderiam atualizar o meu treino de pernas.',
          answer: '',
          answered_at: '',
          created_at: '2020-01-01 17:00:00+00',
          updated_at: new Date(),
        },
        {
          student_id: 2,
          question:
            'O que vocês me recomendam comer após os treinos de hipertrofia?',
          answer: 'É bom comer fontes de proteínas',
          answered_at: '2020-01-01 18:00:00+00',
          created_at: '2020-01-01 17:00:00+00',
          updated_at: new Date(),
        },
        {
          student_id: 3,
          question: 'Qual o melhor horário para os treinos de cardio?',
          answer: '',
          answered_at: '',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },
  down: () => {},
};
