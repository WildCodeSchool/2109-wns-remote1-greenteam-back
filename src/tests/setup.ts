import initConnectDb from "../database/database";

beforeAll(async () => {
    await initConnectDb()
})