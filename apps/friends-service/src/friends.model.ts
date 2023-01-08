import { ApiProperty } from '@nestjs/swagger';
import { modelOptions, prop } from '@typegoose/typegoose';
import { IsEmail, IsOptional, IsString, IsUrl } from 'class-validator';
import { BaseModel } from '~/shared/model/base.model';
import { RssParserType } from '~/shared/utils';

export enum FriendStatus {
  Pending = 0, // 待审核
  Approved = 1, // 已通过
  Spam = 2, // 垃圾友链
  Trash = 3, // 回收站友链
}

@modelOptions({ options: { customName: 'Friends' } })
export class FriendsModel extends BaseModel {
  @prop()
  @IsString()
  @IsOptional()
  @ApiProperty({
    required: false,
    description: '友链凭证，可用于对方修改友链信息',
  })
  token?: string;

  @prop({ required: true })
  @IsString()
  @ApiProperty({ required: true, description: '友链名称' })
  name: string;

  @prop({ required: true })
  @IsString()
  @ApiProperty({ required: true, description: '友链地址' })
  link: string;

  @prop()
  @IsString()
  @IsOptional()
  @ApiProperty({ required: false, description: '友链描述' })
  desc?: string;

  @prop()
  @IsString()
  @IsOptional()
  @ApiProperty({ required: false, description: '友链主人昵称' })
  nickname?: string;

  @prop()
  @IsUrl()
  @IsOptional()
  @ApiProperty({ required: false, description: '友链主人头像' })
  avatar?: string;

  @prop()
  @IsEmail()
  @IsOptional()
  @ApiProperty({ required: false, description: '友链主人邮箱' })
  email?: string;

  @prop({ default: FriendStatus.Pending })
  @IsOptional()
  @ApiProperty({ required: false, description: '友链状态' })
  status?: FriendStatus;

  @prop()
  @IsString()
  @IsOptional()
  @ApiProperty({ required: false, description: '友链分组' })
  group?: string;

  @prop({ default: false })
  @IsOptional()
  @ApiProperty({ required: false, description: '是否添加我方博客友链' })
  autoCheck?: boolean;

  @prop({ required: true })
  @IsString()
  @ApiProperty({
    required: true,
    description: '友链验证链接，用于验证对方是否添加我方友链',
  })
  verifyLink: string;

  @prop()
  @IsUrl()
  @IsOptional()
  @ApiProperty({ required: false, description: '友链 RSS 地址' })
  feed?: string;

  @prop({ default: RssParserType.RSS })
  @IsOptional()
  @ApiProperty({ required: false, description: '友链 RSS 类型' })
  feedType?: RssParserType;

  @prop()
  @IsString()
  @IsOptional()
  @ApiProperty({ required: false, description: '友链 RSS 内容' })
  feedContents?: string;
}
