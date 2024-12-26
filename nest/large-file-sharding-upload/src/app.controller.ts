import {
  Body,
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller() 
export class AppController {
  constructor(private readonly appService: AppService) {} 

  @Post('upload') 
  @UseInterceptors(
    FileInterceptor('files',  {
      dest: 'uploads',
    }),
  )
  uploadFiles(
    @UploadedFiles() files: Array<Express.Multer.File>, 
    @Body() body,
  ) {
    console.log({ files, body });
  }
}
