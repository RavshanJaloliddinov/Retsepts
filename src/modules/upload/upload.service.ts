import { Injectable } from "@nestjs/common";
import { UploadFileRequest, UploadFileResponse } from "./interfaces";
import * as fs from 'fs/promises'
import * as path from "path";
import { existsSync } from "fs";
import { RemoveFileRequest, RemoveFileResponse } from "./interfaces/remove-file.interface";

@Injectable()
export class UploadService {
    constructor() { }

    async uploadFile(payload: UploadFileRequest): Promise<UploadFileResponse> {

        try {
            const extName = path.extname(payload.file.originalname)
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
            const fileName = payload.file.fieldname + '-' + uniqueSuffix + extName
            const fullFilePath = path.join(__dirname, '../../../', payload.destination, fileName)

            const isFileFolderExists = existsSync(
                path.join(__dirname, '../../../', payload.destination)
            )

            const allowedExtensions = ['.jpg', '.jpeg', '.png', '.mp4']; // Kerakli formatlar ro'yxati
            if (!allowedExtensions.includes(extName.toLowerCase())) {
                throw new Error('Fayl formati noto\'g\'ri');
            }

            if (!isFileFolderExists) {
                await fs.mkdir(path.join(__dirname, '../../../', payload.destination));
            }

            await fs.writeFile(fullFilePath, payload.file.buffer)

            const fileUrl = `${payload.destination}/${fileName}`
            return {
                file: fileUrl,
                message: "File written successfully"
            }
        } catch (error) {
            throw new Error('Fayl yuklashda xatolik yuz berdi');
        }
    }
    async removeFile(payload: RemoveFileRequest): Promise<RemoveFileResponse> {
        const filePath = path.join(__dirname, '../../../', payload.fileName);

        const isFileExists = existsSync(filePath);

        // CREATE UPLOAD FOLDER IF DESTINATION IS NOT FOUND
        if (isFileExists) {
            await fs.unlink(filePath);
        }

        return {
            message: 'File removed successfully',
        };
    }
}