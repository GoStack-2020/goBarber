import fs from 'fs';
import path from 'path';
import aws, { S3 } from 'aws-sdk';
import uploadConfig from '@config/upload';
import IStorageProvider from '../models/IStorageProvider';

class DiskStorageProvider implements IStorageProvider {
  private client: S3;

  constructor() {
    this.client = new aws.S3({
      region: 'us-east-1',
    })
  }
  public async saveFile(file: string): Promise<string> {
    const originalPath = path.resolve(uploadConfig.tmpFolder, file);

    const fileContent = await fs.promises.readFile(originalPath, {
      encoding: 'utf-8',
    });

    this.client.putObject({
      Bucket: 'app-gobarber-00',
      Key: file,
      ACL: 'public-read',
      Body: fileContent,
    }).promise();

    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    await this.client.deleteObject({
      Bucket: 'app-gobarber-00',
      Key: file,
    }).promise();
  }
}

export default DiskStorageProvider;