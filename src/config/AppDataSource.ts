import { DataSource } from "typeorm";

export const AppDataSource = new DataSource(require("../../ormconfig.json"));
AppDataSource.initialize().then(() => {
    console.log('Data Source has been initialized!')
}).catch((err) => {
    console.error('Error during Data Source initialization:', err)
});