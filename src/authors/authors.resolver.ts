import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { AuthorsService } from './authors.service';
import { Author } from './entities/author.entity';
import { CreateAuthorInput } from './dto/create-author.input';
import { UpdateAuthorInput } from './dto/update-author.input';
import { Post } from 'src/posts/post.entity';
import { PostsService } from 'src/posts/posts.service';

@Resolver((of) => Author)
export class AuthorsResolver {
  constructor(private readonly authorsService: AuthorsService) {}

  @Mutation(() => Author)
  createAuthor(@Args('authorInput') authorInput: CreateAuthorInput) {
    return this.authorsService.create(authorInput);
  }

  @Query(() => [Author], { name: 'authors' })
  findAll() {
    return this.authorsService.findAll();
  }

  @Query(() => Author, { name: 'author' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.authorsService.findAuthorById(id);
  }

  @Mutation(() => Author)
  updateAuthor(
    @Args('authorInput') authorInput: UpdateAuthorInput,
    @Args('id', { type: () => Int }) id: number,
  ) {
    return this.authorsService.update(id, authorInput);
  }

  @Mutation(() => Author)
  removeAuthor(@Args('id', { type: () => Int }) id: number) {
    return this.authorsService.remove(id);
  }

  @ResolveField((returns) => [Post])
  async posts(@Parent() author: Author) {
    const { id } = author;
    return this.authorsService.getPosts(id);
  }
}
