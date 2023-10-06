import { IsDefined, IsEnum, IsOptional } from "class-validator"

export class PingRequestBody {
    @IsDefined()
    @IsEnum({ "FOO": "FOO", "FOU": "FOU" })
    foo: ("FOO" | "FOU")

    @IsOptional()
    @IsEnum({ "BAR": "BAR", "BARRE": "BARRE" })
    bar?: ("BAR" | "BARRE")
}