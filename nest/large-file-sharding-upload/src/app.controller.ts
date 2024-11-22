import {
  Post,
  Get,
  UseInterceptors,
  Body,
  Query,
  UploadedFiles,
  Controller,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { AppService } from './app.service';
import * as fs from 'node:fs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('upload')
  @UseInterceptors(
    FilesInterceptor('files', 20, {
      dest: 'uploads',
    }),
  )
  uploadFiles(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() body: { name: string },
  ) {
    console.log('body', body);

    console.log('files', files);

    // 根据接收的文件名生成一个切片文件夹名称
    const fileName = body.name.match(/(.+)\-\d+$/)[1];
    const chunkDir = 'uploads/chunks_' + fileName;

    // 如果分片文件夹不存在则创建它
    if (!fs.existsSync(chunkDir)) {
      fs.mkdirSync(chunkDir);
    }
    // 将接收的文件分片拷贴到分片文件夹中
    fs.cpSync(files[0].path, chunkDir + '/' + body.name);
    // 删除已经拷贴过的文件
    fs.rmSync(files[0].path);
  }

  @Get('merge')
  merge(@Query('name') name: string) {
    // 根据接收的文件名生成分片文件夹的路径
    const chunkDir = 'uploads/chunks_' + name;
    // 读取分片文件夹中的文件并按照文件名的数字顺序进行排序
    const files = fs.readdirSync(chunkDir);

    files.sort(
      (a, b) => +a.split('-').reverse()[0] - +b.split('-').reverse()[0],
    );

    let count = 0; // 记录已合并的文件数量
    let startPos = 0; // 表示下一个分片应该写入的位置
    files.map((file) => {
      const filePath = chunkDir + '/' + file;
      const stream = fs.createReadStream(filePath);
      // 通过文件流把分片文件合并到目标文件
      stream
        .pipe(fs.createWriteStream('uploads/' + name, { start: startPos }))
        .on('finish', () => {
          count++;
          // 当所有分片合并完成时，删除分片文件夹
          if (count === files.length) {
            fs.rm(chunkDir, { recursive: true }, () => {});
          }
        });
      // 更新下一个分片的写入位置
      startPos += fs.statSync(filePath).size;
    });
  }
}
