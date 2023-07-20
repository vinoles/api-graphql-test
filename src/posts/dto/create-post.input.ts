import { Field, InputType } from '@nestjs/graphql';
import { IsInt, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

@InputType()
export class CreatePostInput {
  @IsNotEmpty({
    message: 'El titulo es requerido',
  })
  @MaxLength(100, {
    message: 'El titulo no puede pasar de 100 caracteres',
  })
  @MinLength(5, {
    message: 'El titulo debe tener al menos 5 caracteres',
  })
  @Field()
  title: string;

  @MaxLength(100)
  @Field({
    nullable: true,
  })
  content?: string;

  @IsInt()
  @Field()
  authorId: number;
}
