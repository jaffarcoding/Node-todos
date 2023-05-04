import { app } from "./app.js";
import { connectdatabases } from "./database/database.js";


connectdatabases();
app.listen(process.env.PORT, () => {
  console.log(`server is running succesfully on port: ${process.env.PORT} in ${process.env.NODE_ENV}`);
});

