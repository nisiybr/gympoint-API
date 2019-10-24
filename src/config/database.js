module.exports = {
  dialect: 'postgres',
  host: '192.168.99.100',
  port: 5433,
  username: 'postgres',
  password: 'gympoint',
  database: 'gympoint',
  define: {
    timestamps: true,
    underscored: true, // prefere criar nome de tabelas separados por _
    underscoredAll: true, // prefere criar nome de tabelas e colunas separados por  _
  },
};
