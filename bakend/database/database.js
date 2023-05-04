import mongoose from "mongoose";

export const connectdatabases = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      dbName: "todos-apps",
    })
    .then(() => {
      console.log("database is connnected succefully");
    })
    .catch((e) => {
      console.log(e);
    });
};
