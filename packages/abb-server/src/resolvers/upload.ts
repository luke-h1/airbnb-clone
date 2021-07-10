import { Resolver, Arg, Mutation } from 'type-graphql';
import { v4 } from 'uuid';
import { handleFileUpload } from '../utils/image/s3';

@Resolver()
export class ImageResolver {
  @Mutation(() => Boolean)
  async uploadImage(@Arg('file') file: string): Promise<boolean> {
    const key = v4();
    const res = await handleFileUpload(file);
    console.log(res);
    return true;
  }
}
