/*
 * @FilePath: /nx-core/src/modules/comment/comment.dto.ts
 * @author: Innei
 * @Date: 2022-07-03 17:48:49
 * @LastEditors: Wibus
 * @LastEditTime: 2022-07-03 21:35:07
 * Coding With IU
 */

import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
} from 'class-validator'

import { ApiProperty } from '@nestjs/swagger'

import { CommentType } from './comment.model'

export class CommentDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @MaxLength(20, { message: '昵称不得大于 20 个字符' })
  author: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @MaxLength(500, { message: '评论内容不得大于 500 个字符' })
  text: string

  @IsString()
  @IsEmail(undefined, { message: '请更正为正确的邮箱' })
  @ApiProperty({ example: 'test@mail.com' })
  @MaxLength(50, { message: '邮箱地址不得大于 50 个字符' })
  mail: string

  @IsString()
  @IsUrl({ require_protocol: true }, { message: '请更正为正确的网址' })
  @IsOptional()
  @ApiProperty({ example: 'http://example.com' })
  @MaxLength(50, { message: '地址不得大于 50 个字符' })
  url?: string
}

export class TextOnlyDto {
  @IsString()
  @IsNotEmpty()
  text: string
}

export class CommentRefTypesDto {
  @IsOptional()
  @IsEnum(CommentType)
  @ApiProperty({ enum: CommentType, required: false })
  ref?: CommentType
}

export class CommentStatusPatchDto {
  @IsInt()
  @IsIn([0, 1, 2])
  @IsOptional()
  state?: number

  @IsOptional()
  @IsBoolean()
  pin?: boolean
}
