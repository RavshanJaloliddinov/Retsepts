import { IsNotEmpty, IsString } from "class-validator";
import { UploadFileRequest } from "../interfaces";
import { Omit } from "sequelize-typescript/dist/shared/types";


export class UploadFileDto implements Omit<UploadFileRequest, "file"> {
    @IsString()
    @IsNotEmpty()
    destination: string;


}