import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateUserDto {

    @IsEmail({}, { message: "email không đúng định dạng!" })
    @IsNotEmpty({ message: "email không được để trống!" })
    email: string;

    @IsNotEmpty({ message: "Mật khẩu không được để trống!" })
    password: string;

    @IsNotEmpty({ message: "Tên không được để trống!" })
    name: string;

    @IsNotEmpty({ message: "Số điện thoại không được để trống!" })
    phone: string;

    @IsNotEmpty({ message: "Tuổi không được để trống!" })
    age: number;

    @IsNotEmpty({ message: "Địa chỉ không được để trống!" })
    address: string;
}
