import { ApiProperty } from "@nestjs/swagger"
import { Type } from "class-transformer"
import { IsArray, IsBoolean, IsString, ValidateNested } from "class-validator"

export class PrimitiveObject {
    @ApiProperty({
        type: "string"
    })
    @IsString()
    foo: string
    @ApiProperty({
        type: "boolean"
    })
    @IsBoolean()
    bar: boolean
}

export class ObjectwithPrimitiveArray {
    @ApiProperty({
        type: "string",
        isArray: true
    })
    @IsArray()
    @IsString({ each: true })
    foo: String[]
}

export class ObjectWithArray {
    @ApiProperty({
        type: PrimitiveObject,
        isArray: true
    })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => PrimitiveObject)
    foo: PrimitiveObject[]
}

export class NestedObject {
    @ValidateNested()
    @Type(() => PrimitiveObject)
    foor: PrimitiveObject

    @ValidateNested()
    @Type(() => ObjectwithPrimitiveArray)
    bar: ObjectwithPrimitiveArray
}

export class RecordObject {
    [key: string]: PrimitiveObject
}


