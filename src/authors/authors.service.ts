import {
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { CreateAuthorInput } from './dto/create-author.input';
import { UpdateAuthorInput } from './dto/update-author.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Author } from './entities/author.entity';
import { Repository } from 'typeorm';
import { PostsService } from 'src/posts/posts.service';
import { Post } from 'src/posts/post.entity';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectRepository(Author) private authorRepository: Repository<Author>,
    @Inject(forwardRef(() => PostsService)) private postService: PostsService,
  ) {}

  async create(author: CreateAuthorInput) {
    const newAuthor = await this.authorRepository.create(author);
    return await this.authorRepository.save(newAuthor);
  }

  async findAll(): Promise<Author[]> {
    return await this.authorRepository.find();
  }

  async findAuthorById(id: number): Promise<Author> {
    return await this.authorRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  async update(id: number, author: UpdateAuthorInput) {
    const proj = await this.findAuthorById(id);
    if (proj) {
      await this.authorRepository.update(id, author);
      author.id = id;
      return author;
    }
    throw new NotFoundException(`Record cannot find by id ${id}`);
  }

  async remove(id: number) {
    const proj = await this.findAuthorById(id);
    if (proj) {
      const ret = await this.authorRepository.delete(id);
      if (ret.affected === 1) {
        return proj;
      }
    }
    throw new NotFoundException(`Record cannot find by id ${id}`);
  }

  async getPosts(id: number): Promise<Post[]> {
    return await this.postService.findByAuthor(id);
  }
}
