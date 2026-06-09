import { RoleEnum } from "../enums/role.enum";
import { ApiError } from "../errors/api-errors";
import { ICreateManagerDto } from "../interface/create.manager.dto";
import { ITokenPair, ITokenPayload } from "../interface/token.intrrface";
import { ISignIn, IUser } from "../interface/user.interface";
import { tokenRepository } from "../repositories/token.repository";
import { userRepository } from "../repositories/user.repository";
import { passwordService } from "./password.service";
import { tokenService } from "./token.service";

class AuthService{



  async signUp(dto:Partial<IUser>):Promise<{user:IUser,tokens:ITokenPair}>{
  await this.isEmailExistOrThrow(dto.email as string);
  const password = await passwordService.hashPassword(dto.password as string);
  const user = await userRepository.create({...dto,password})
  const tokens =await tokenService.generateToken({userId:user._id,role:user.role})
  await tokenRepository.create({...tokens,_userId:user._id})
  return {user,tokens};

}

async signUpManager(dto:ICreateManagerDto):Promise<{user:IUser,tokens:ITokenPair}>{
  await this.isEmailExistOrThrow(dto.email as string);
  const password = await passwordService.hashPassword(dto.password as string);  

  const user = await userRepository.create({...dto,password,role:RoleEnum.MANAGER})
  const tokens =await tokenService.generateToken({userId:user._id,role:user.role})
  await tokenRepository.create({...tokens,_userId:user._id})
  return {user,tokens};
}




  public async signIn(
    dto: ISignIn,
  ): Promise<{user:IUser; tokens:ITokenPair}> {
    const user = await userRepository.getByEmail(dto.email);
    if (!user) {
      throw new ApiError("User not found", 404);
    }

    const isPasswordCorrect = await passwordService.comparePassword(
      dto.password!,
      user.password!,
    );
    if (!isPasswordCorrect) {
      throw new ApiError("Invalid credentials", 401);
    }

    const tokens = tokenService.generateToken({
      userId: user._id,
      role: user.role,
    });
    await tokenRepository.delete(user._id)
    await tokenRepository.create({ ...tokens, _userId:user._id });
    return {user,tokens};
  }



   async refreshToken(jwtPayload:ITokenPayload,refreshToken:string):Promise<ITokenPair>{
    await tokenRepository.deleteOneByParams({refreshToken})

    const tokens = tokenService.generateToken({userId:jwtPayload.userId,role:jwtPayload.role})
     await tokenRepository.create({...tokens,_userId:jwtPayload.userId})
     return tokens
   }


   async logout(refreshToken:string):Promise<void>{
    await tokenRepository.deleteOneByParams({refreshToken})
   }


  private async isEmailExistOrThrow(email: string): Promise<void > {
    const user = await userRepository.getByEmail(email);
    if (user) {
      throw new ApiError("Email already exists", 409);
    }} 
}
export const authService = new AuthService()