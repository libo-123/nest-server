import { IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';
export class CreateCardDto {

    readonly id: number;

    readonly name: string;
    
    @IsNotEmpty({ message: '标题不能为空' })
    readonly title: string;

    @Length(6, 100, {
        message: '长度必须在6-100位之间'
    })
    readonly description: string;

    @IsNotEmpty({ message: '跳转地址不能为空' })
    readonly link: string;
}
