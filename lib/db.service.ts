/**
 * Connects to mongodb and returns a db object
 */
import clientPromise from "./mongodb";
import { Bingo, User } from "./types";

export default class DatabaseService {

  /**
   * Returns a list of all bingos
   */
  async getBingos(): Promise<Bingo[]> {
    const bingoCollection = await this.getBingoCollection();

    const result: Bingo[] = await bingoCollection
      .find({}, { projection: { _id: 0 } })
      .toArray();

    return result.map((bingo) => {
      return bingo;
    });
  }

  /**
   * Returns a bingo given its name
   * @param name The name of the bingo
   * @returns The bingo with the given name
   */
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

  /**
   * Gets a user given its username
   */
  async getUser(username: string) : Promise<User> {
    const userCollection = await this.getUserCollection();

    const result = await userCollection.find({username : username}).toArray();

    return result[0];
  }

  /**
   * Returns a the bingo collection
   * Makes the code more readable
   * @returns 
   */
   private async getBingoCollection() {
    const client = await clientPromise;
    const bingoCollection = client
      .db(process.env.MONGODB_DB)
      .collection<Bingo>("bingos");

    return bingoCollection;
  }

  /**
   * Returns the user collection
   */
  private async getUserCollection() {
    const client = await clientPromise;
    const userCollection = client.db(process.env.MONGODB_DB).collection<User>("users");

    return userCollection;
  }

}
