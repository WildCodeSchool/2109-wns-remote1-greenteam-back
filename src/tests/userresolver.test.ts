import User from '../entity/User';
import UserResolver from '../resolvers/userresolver';

describe('le resolver user', () => {
  it('should response a user', async () => {
    const userresolver = new UserResolver();
    const usertoreceive = new User();
    usertoreceive.id = 1;
    usertoreceive.firstName = 'Valère';
    usertoreceive.lastName = 'Preney';
    usertoreceive.email = 'valerepreney@hotmail.fr';
    usertoreceive.password = '';
    expect(await userresolver.getOneUser('valerepreney@hotmail.fr')).toEqual(
      usertoreceive
    );
  });
});

describe('le resolver user', () => {
  it('should response an empty object or undefined because the email doesnt exist in bdd', async () => {
    const userresolver = new UserResolver();
    expect(await userresolver.getOneUser('valerpreney@hotmail.fr')).toEqual(
      undefined
    );
  });
});
