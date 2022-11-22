/*
 * @FilePath: /mog-core/shared/constants/services.constant.ts
 * @author: Wibus
 * @Date: 2022-09-03 22:28:40
 * @LastEditors: Wibus
 * @LastEditTime: 2022-11-18 11:37:58
 * Coding With IU
 */

export enum ServicesEnum {
  core = 'CORE',
  user = 'USER_SERVICE',
  auth = 'AUTH_SERVICE',
  backup = 'BACKUP_SERVICE',
  post = 'PAGE_SERVICE',
  page = 'PAGE_SERVICE',
  category = 'PAGE_SERVICE',
  links = 'LINKS_SERVICE',
  comments = 'COMMENTS_SERVICE',
  config = 'CONFIG_SERVICE',
  theme = 'THEME_SERVICE',
  admin = 'ADMIN_SERVICE',
  mail = 'MAIL_SERVICE',
}

export enum ServicePorts {
  core = 2330,
  page = 2331,
  category = page,
  post = page,
  user = 2332,
  comments = 2333,
  links = 2334,
  admin = 2335,
}
