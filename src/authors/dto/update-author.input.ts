import { CreateAuthorInput } from './create-author.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateAuthorInput extends PartialType(CreateAuthorInput) {
  @Field({ nullable: true })
  id?: number;

  @Field()
  name: string;
}
