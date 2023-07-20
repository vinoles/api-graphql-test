import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Author } from 'src/authors/entities/author.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity({
  name: 'posts',
})
export class Post {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  id: number;

  @Column({
    type: 'varchar',
  })
  @Field()
  title: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  @Field({
    nullable: true,
  })
  content?: string;

  @Column()
  @Field(() => Int)
  authorId: number;

  @ManyToOne(() => Author, (author) => author.posts)
  @Field(() => Author)
  author: Author;
}
