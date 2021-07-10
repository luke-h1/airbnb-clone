import { FileUpload, GraphQLUpload } from 'graphql-upload';
import {
  Resolver, Arg, Mutation, ObjectType, Field,
} from 'type-graphql';
import { v4 } from 'uuid';
import { S3DefaultParams, S3 } from '../utils/image/s3';

ObjectType();
class ImgResp {
  @Field()
  filename: String;

  @Field()
  mimetype: String;

  @Field()
  encoding: String;

  @Field()
  url: String;
}
@Resolver()
export class ImageResolver {
  @Mutation(() => Boolean)
  async uploadImage(
    @Arg('file', () => GraphQLUpload)
      { createReadStream, filename }: FileUpload,
  ): Promise<ImgResp> {
    const key = v4();
    return new Promise((resolve, reject) => {
      S3.upload(
        {
          ...S3DefaultParams,
          Body: createReadStream(),
          Key: `${key}/${filename}`,
          Bucket: process.env.AWS_BUCKET_NAME,
        },
        (e: unknown, data) => {
          console.log(e);
          console.log(data);
          if (e) {
            console.log('error uploading...', e);
            reject(e);
          } else {
            console.log('successfully uploaded file...', data);
            resolve(data);
          }
        },
      );
    });
  }
}
