import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { PostsService } from './posts.service';
import { Post } from './post.entity';
import { CreatePostInput } from './dto/create-post.input';
import { Author } from 'src/authors/entities/author.entity';
import { of } from 'rxjs';

@Resolver((of) => Post)
export class PostsResolver {
  constructor(private postsService: PostsService) {}

  @ResolveField((returns) => Author)
  author(@Parent() post: Post): Promise<Author> {
    return this.postsService.getAuthor(post.authorId);
  }

  @Query((returns) => [Post])
  async posts() {
    return await this.postsService.findAll();
  }

  @Query((returns) => Post)
  async post(@Args('id', { type: () => Int }) id: number) {
    return await this.postsService.findPostById(id);
  }

  @Mutation((returns) => Post)
  async createPost(@Args('postInput') postInput: CreatePostInput) {
    return await this.postsService.create(postInput);
  }
}
