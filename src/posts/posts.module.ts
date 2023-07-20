import { Module, forwardRef } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsResolver } from './posts.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { AuthorsModule } from 'src/authors/authors.module';

@Module({
  imports: [TypeOrmModule.forFeature([Post]), forwardRef(() => AuthorsModule)],
  providers: [PostsService, PostsResolver],
  exports: [PostsService],
})
export class PostsModule {}
