export declare interface CreateFoodRequest {
    title: string
    creator_id: number
    category_id: number
    receipt: string
    description: string
    cooking_time: string
    video: Express.Multer.File
}