import User from "../entity/User";
import UserResolver from "../resolvers/userresolver";

describe("le resolver user", ()=> {
    it('should response a user', async ()=> {
        let userresolver = new UserResolver()
        let usertoreceive = new User()
        usertoreceive.idUser = 1
        usertoreceive.firstName = "Valère"
        usertoreceive.lastName = "Preney"
        usertoreceive.email = "valerepreney@hotmail.fr"
        usertoreceive.age = 27
        usertoreceive.password = ""
        expect(await userresolver.getOneUser('valerepreney@hotmail.fr')).toEqual(usertoreceive)
    })
})

describe("le resolver user", () => {
    it('should response an empty object or undefined because the email doesnt exist in bdd', async ()=> {
        let userresolver = new UserResolver()
        expect(await userresolver.getOneUser('valerpreney@hotmail.fr')).toEqual(undefined)
    })
})