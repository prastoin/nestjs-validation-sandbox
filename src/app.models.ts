import { ApiProperty } from "@nestjs/swagger"
import { Transform } from "class-transformer"
import { IsArray, IsDefined, IsEnum, IsOptional } from "class-validator"
import { fromArrayToRecord } from "./utils"

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


export const isoCode = ["JO", "KZ", "ZM", "ZW"] as const
export type IsoCodeLiteral = typeof isoCode[number]
const isCodeRecord = fromArrayToRecord([...isoCode])
export class GetCountryCodeQuery {
    @ApiProperty({
        enum: isCodeRecord
    })
    @IsDefined()
    @IsEnum(isCodeRecord)
    code: IsoCodeLiteral
}

const countryList = ["EUR", "ASIA", "AMER"] as const;
type CountryLiteral = typeof countryList[number];
const countryRecord = fromArrayToRecord([...countryList])
export class GetCountryRegionParam {
    @ApiProperty({
        enum: countryRecord
    })
    @IsEnum(countryRecord)
    region: CountryLiteral
}

const languagesList = ["FRA", "ENG", "ITA"] as const
type LanguageLiteral = typeof languagesList[number]
const languagesRecord = fromArrayToRecord([...languagesList])
export class GetLanguagesQuery {
    @ApiProperty({
        enum: languagesRecord,
        type: [languagesRecord]
    })
    @Transform(({ value }) => {
        console.log({ value })
        if (Array.isArray(value)) {
            return value
        }

        return value.split(",")
    })
    @IsArray()
    @IsEnum(languagesRecord, { each: true })
    languages: LanguageLiteral
}