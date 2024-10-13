import { Injectable } from "@nestjs/common";
import { UploadFileRequest, UploadFileResponse } from "./interfaces";
import * as fs from 'fs/promises'
import * as path from "path";

@Injectable()
export class UploadService {
    constructor() { }

    async uploadFile(payload: UploadFileRequest): Promise<UploadFileResponse> {

        const extName = path.extname(payload.file.originalname)
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
        const fileName = payload.file.fieldname + '-' + uniqueSuffix + extName

        const fullFilePath = path.join(__dirname, '../../', payload.destination, fileName)

        await fs.writeFile(fullFilePath, payload.file.buffer)

        const imageUrl = `${payload.destination}/${fileName}`
        return {
            imageUrl,
            message: "File written successfully" 
        }
    }
}