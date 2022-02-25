const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3307,
  database: 'collabee_essais',
  user: 'valere_collabee',
  password: 'collabee',
});

connection.query(
  'SELECT * FROM user',
  (err, users) => {
    if (err) {
      console.error(`Something bad happened: ${err.message}`);
    } else {
      console.log(users);
    }
  }
);

// équivalent TypeORM (doc : https://typeorm.io/#/working-with-repository)
// const userRepository = getRepository(User);
// const users = await userRepository.find();

// si je veux récupérer les tickets des users
// const users = userRepository.find({ relations: ["ticket"] });
// const projects = userRepository.find({ relations: ["project"] });