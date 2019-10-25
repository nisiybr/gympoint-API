import Sequelize from 'sequelize';

import User from '../app/models/User'; // busca o model de user
import Student from '../app/models/Student'; // busca o model de user
import Plan from '../app/models/Plan'; // busca o model de user
import Registration from '../app/models/Registration'; // busca o model de user

import databaseConfig from '../config/database'; // importa configs do BD

const models = [User, Student, Plan, Registration]; // declara quais models vao ser utilizados

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig); // abre a conexao

    models.map(model => model.init(this.connection)); // inicializa o model user
  }
}

export default new Database();
