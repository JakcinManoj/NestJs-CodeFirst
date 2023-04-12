import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { DeleteUserInput } from './dto/delete-user.input';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User, { name: 'createUser' })
  createUser(@Args('createUserInput') createUserInput: CreateUserInput){
    return this.userService.create(createUserInput);
  }

  @Mutation(() => User, { name: 'updateUser' })
  updateUser(@Args('createUserInput') createUserInput: CreateUserInput){
    return this.userService.update(createUserInput);
  }

  @Mutation(() => String, { name: 'deleteUser' })
  deleteUser(@Args('deleteUserInput') deleteUserInput: DeleteUserInput){                                   
    return this.userService.delete(deleteUserInput);
  }

  @Query(() => [User], { name: 'findAllUsers' })
  findAll() {
    return this.userService.findAll();
  }
}
