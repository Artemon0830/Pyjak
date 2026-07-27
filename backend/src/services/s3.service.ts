import { randomUUID } from "node:crypto";

import { PutObjectCommand, S3Client,DeleteObjectCommand} from "@aws-sdk/client-s3";
import { UploadedFile } from "express-fileupload";
import path from "path";


import { FileItemTypeEnum } from "../enums/file-item-type.enum";
import { configs } from "../configs/configs";

class S3Service {
  constructor(
    private readonly client = new S3Client({
      forcePathStyle: true,
      endpoint: configs.AWS_S3_ENDPOINT,
      region: configs.AWS_S3_REGION,
      credentials: {
        accessKeyId: configs.AWS_ACCESS_KEY,
        secretAccessKey: configs.AWS_SECRET_KEY,
      },
    })
  ) {}
     
   public async uploadFiles(
    files: UploadedFile[],
    itemType: FileItemTypeEnum,
    itemId: string): Promise<string[] | undefined> {
      try{
        const bucketName = 'photos';
        const uploadedFiles = files.map(async (file) => {
        const filePath = this.buildPath(itemType,itemId,file.name) 
        await this.client.send(
          new PutObjectCommand({
            Bucket: bucketName,
            Key: filePath,
            Body: file.data,
            ContentType: file.mimetype,
            ACL: configs.AWS_S3_ACL,
          }),
        );
        return filePath
      })
      return await Promise.all(uploadedFiles)   
      }catch(e){
        console.error("Error upload: ", e);
      }
    }

  public async uploadFile(
    file: UploadedFile ,
    itemType: FileItemTypeEnum,
    itemId: string,
  ): Promise<string | undefined> {
    try {
       const bucketName = 'photos';
      const filePath = this.buildPath(itemType, itemId, file.name);
      await this.client.send(
        new PutObjectCommand({
          Bucket:bucketName,
          Key: filePath,
          Body: file.data,
          ContentType: file.mimetype,
          ACL: configs.AWS_S3_ACL,
        }),
      );
      return filePath;
    } catch (error) {
      console.error("Error upload: ", error);
    }
  }
  public async deleteFile(filePath: string): Promise<void> {
    try {
      await this.client.send(
        new DeleteObjectCommand({
          Bucket: configs.AWS_S3_BUCKET_NAME,
          Key: filePath,
        }),
      );
    } catch (error) {
      console.error("Error delete: ", error);
    }
  }

  private buildPath(
    itemType: FileItemTypeEnum,
    itemId: string,
    fileName: string,
  ): string {
    return `${itemType}/${itemId}/${randomUUID()}${path.extname(fileName)}`; // use only  template string
  }
}

export const s3Service = new S3Service();
