import { IsNotEmpty } from "class-validator";

export class HelpDto {
    username: string;
    
    @IsNotEmpty({ message: '描述内容不能为空' })
    description: string;

    phone: string;
    
    email: string;
}
