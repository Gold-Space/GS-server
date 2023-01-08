import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiOperation } from '@nestjs/swagger';
import {
  FriendsModel,
  FriendStatus,
} from '~/apps/friends-service/src/friends.model';
import { Auth } from '~/shared/common/decorator/auth.decorator';
import { ApiName } from '~/shared/common/decorator/openapi.decorator';
import { IsMaster } from '~/shared/common/decorator/role.decorator';
import { FriendsEvents } from '~/shared/constants/event.constant';
import { ServicesEnum } from '~/shared/constants/services.constant';
import { transportReqToMicroservice } from '~/shared/microservice.transporter';

@Controller('friends')
@ApiName
export class FriendsController {
  constructor(
    @Inject(ServicesEnum.friends) private readonly friends: ClientProxy,
  ) {}

  @Get('/')
  @ApiOperation({ summary: '获取所有友链(By group)' })
  async getAllFriends(@Query('group') group?: string | undefined) {
    console.log('group', group);
    return transportReqToMicroservice(
      this.friends,
      FriendsEvents.FriendsGetList,
      group ? group : {},
    );
  }

  @Get('/all')
  @ApiOperation({ summary: '获取所有友链(Master)' })
  @Auth()
  async getAllFriendsMaster(@Query('status') status: FriendStatus) {
    return transportReqToMicroservice(
      this.friends,
      FriendsEvents.FriendsGetAllByMaster,
      status,
    );
  }

  @Get('/:id')
  @ApiOperation({ summary: '获取友链详情' })
  async getFriend(@Param('id') id: string) {
    return transportReqToMicroservice(
      this.friends,
      FriendsEvents.FriendGet,
      id,
    );
  }

  @Post('/')
  @ApiOperation({ summary: '创建友链' })
  async createFriend(
    @Body() data: FriendsModel,
    @IsMaster() isMaster: boolean,
  ) {
    return transportReqToMicroservice(
      this.friends,
      FriendsEvents.FriendCreate,
      { data, isMaster },
    );
  }

  @Put('/:id')
  @ApiOperation({ summary: '更新友链' })
  async updateFriend(
    @Param('id') id: string,
    @Body() friend: FriendsModel & { token?: string },
    @IsMaster() isMaster: boolean,
  ) {
    return transportReqToMicroservice(
      this.friends,
      FriendsEvents.FriendUpdateByMasterOrToken,
      { id, data: friend, isMaster, token: friend.token },
    );
  }

  @Delete('/:id')
  @ApiOperation({ summary: '删除友链' })
  async deleteFriend(
    @Param('id') id: string,
    @Body('token') token: string,
    @IsMaster() isMaster: boolean,
  ) {
    return transportReqToMicroservice(
      this.friends,
      FriendsEvents.FriendDeleteByMasterOrToken,
      { id, isMaster, token },
    );
  }

  @Get('/alive')
  @ApiOperation({ summary: '检查友链是否存活' })
  async checkAliver() {
    return transportReqToMicroservice(
      this.friends,
      FriendsEvents.FriendsCheckAlive,
      {},
    );
  }

  @Get('/feeds')
  @ApiOperation({ summary: '获取友链 Feed 更新' })
  async getFeed() {
    return transportReqToMicroservice(
      this.friends,
      FriendsEvents.FriendsAnalyseFeed,
      {},
      10000,
    );
  }

  @Get('/:id/check')
  @ApiOperation({ summary: '自动检查是否互链' })
  async autoCheck(@Param('id') id: string) {
    return transportReqToMicroservice(
      this.friends,
      FriendsEvents.FriendAnalyseAutoCheck,
      id,
    );
  }
}
