/**
 * Connects to mongodb and returns a db object
 */
import clientPromise from "./mongodb";
import { Bingo } from "./types";

export default class DatabaseService {
  async getBingos(): Promise<Bingo[]> {
    const bingoCollection = await this.getBingoCollection();

    const result: Bingo[] = await bingoCollection
      .find({}, { projection: { _id: 0 } })
      .toArray();

    return result.map((bingo) => {
      return bingo;
    });
  }

  async getBingo(name: string): Promise<Bingo> {
    const bingoCollection = await this.getBingoCollection();

    const result: Bingo | null = await bingoCollection.findOne(
      { name: name },
      { projection: { _id: 0 } }
    );
    if (!result) {
      throw new Error("Bingo not found");
    }
    return result;
  }

  private async getBingoCollection() {
    const client = await clientPromise;
    const bingoCollection = client
      .db(process.env.MONGODB_DB)
      .collection<Bingo>("bingos");

    return bingoCollection;
  }
}
