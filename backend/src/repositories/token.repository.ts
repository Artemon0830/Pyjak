import { IToken } from "../interface/token.intrrface";
import { Token } from "../models/token.model";

class TokenRepository{
    async create(dto:Partial<IToken>):Promise<IToken>{
       return await Token.create(dto);
    }
    async delete(userId:string | undefined):Promise<void>{
      await Token.deleteMany({_userId:userId})

    }
    async findByParams(params:Partial<IToken>):Promise<IToken|null>{
      return await Token.findOne(params)
    }
      public async deleteOneByParams(params: Partial<IToken>): Promise<void> {
    await Token.deleteOne(params);
  }

}
export const tokenRepository = new TokenRepository()