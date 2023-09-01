/**
 * @module common/guard/spider.guard
 * @description 禁止爬虫的守卫
 * @author Innei <https://innei.ren>
 */
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthService } from '~/libs/auth/src';

import { getNestExecutionContextRequest } from '~/shared/transformers/get-req.transformer';

import { AuthGuard } from './auth.guard';

/**
 * 区分游客和主人的守卫
 */

@Injectable()
export class RolesGuard extends AuthGuard implements CanActivate {
  constructor(
    protected readonly authService: AuthService,
  ) {
    super(authService);
  }
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = this.getRequest(context);
    let isMaster = false;
    try {
      await super.canActivate(context);
      isMaster = true;
      // eslint-disable-next-line no-empty
    } catch {}

    request.isGuest = !isMaster;
    request.isMaster = isMaster;

    return true;
  }

  getRequest(context: ExecutionContext) {
    return getNestExecutionContextRequest(context);
  }
}
