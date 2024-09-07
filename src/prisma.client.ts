import { PrismaClient } from "@prisma/client";

// We are disabling the eslint rule here for a specific purpose. DO NOT REMOVE
// eslint-disable-next-line prefer-const
let prisma = new PrismaClient();

// Make a query to the database to check if the connection is successful
// This will trigger an info log in the console
// prisma.users
//   .count()
//   .then((_) => logger.info(`Connected to the Postgres client`))
//   .catch((error) => {
//     logger.error(`Failed to connect to the database ${error}`);
//   });

export default prisma;
