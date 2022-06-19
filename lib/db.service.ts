/**
 * Connects to mongodb and returns a db object
 */
import { ObjectId } from "mongodb";
import clientPromise from "./mongodb";
import { Bingo } from "./types";

export default class DatabaseService {

  async getBingos() : Promise<Bingo[]> {
    const client = await clientPromise;
    const result = await client
      .db(process.env.MONGODB_DB)
      .collection<Omit<Bingo, "id">>("bingos")
      .find()
      .toArray();

      return result.map(this.serializeId) as Bingo[];
  }

  async getBingo(id: string) : Promise<Bingo> {
    const client = await clientPromise;
    const result = await client
      .db(process.env.MONGODB_DB)
      .collection<Omit<Bingo, "id">>("bingos")
      .findOne({ _id: new ObjectId(id) });

      return this.serializeId(result) as Bingo;
  }

  private serializeId<T>(obj: T & { _id: ObjectId }): T & { id: string } {
    const result = {
      ...obj,
      id: obj._id.toHexString(),
    };

    delete result._id;
    return result;
  }

}