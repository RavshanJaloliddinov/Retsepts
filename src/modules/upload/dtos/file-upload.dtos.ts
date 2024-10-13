import { IsNotEmpty, IsString } from "class-validator";
import { UploadFileRequest } from "../interfaces";

 
export class UploadFileDto implements UploadFileRequest {
    @IsString()
    @IsNotEmpty()
    destination: string;

    @IsNotEmpty()
    file: Express.Multer.File;
}