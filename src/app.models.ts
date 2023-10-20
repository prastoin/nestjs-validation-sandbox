import { ApiProperty } from "@nestjs/swagger"
import { IsDefined, IsEnum, IsOptional } from "class-validator"

export class PingRequestBody {
    @ApiProperty({
        enum: ["FOO", "FOU"]
    })
    @IsDefined()
    @IsEnum({ "FOO": "FOO", "FOU": "FOU" })
    foo: ("FOO" | "FOU")

    @ApiProperty({
        enum: ["BAR", "BARRE"],
        required: false,
    })
    @IsOptional()
    @IsEnum({ "BAR": "BAR", "BARRE": "BARRE" })
    bar?: ("BAR" | "BARRE")
}
