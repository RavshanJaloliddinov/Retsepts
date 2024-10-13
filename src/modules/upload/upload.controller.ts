import { Body, Controller, Post } from "@nestjs/common";
import { UploadService } from "./upload.service";
import { UploadFileDto } from "./dtos/file-upload.dtos";
import { UploadFileResponse } from "./interfaces";

@Controller("uploads")
export class UploadController {
    constructor(private service: UploadService) { }

    @Post('upload/add')
    async uploadFile(@Body() payload: UploadFileDto
    ): Promise<UploadFileResponse> {
        return await this.service.uploadFile(payload)
    }
}