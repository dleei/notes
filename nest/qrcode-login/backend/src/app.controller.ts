import {
  Controller,
  Get,
  Query,
  Inject,
  Headers,
  Body,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import * as QRCode from 'qrcode';
import { JwtService } from '@nestjs/jwt';

/**
 * 二维码状态
 * no-scan: 未扫码
 * wait-confirm: 已扫码，等待确认
 * confirmed: 用户已授权
 * cancel: 用户取消授权
 * expired: 二维码已失效
 */
interface QrCodeInfo {
  status: 'no-scan' | 'wait-confirm' | 'confirmed' | 'cancel' | 'expired';
}

const map = new Map<string, QrCodeInfo>();

@Controller('code')
export class AppController {
  @Inject(JwtService)
  private jwtService: JwtService;

  private users = [
    {
      id: 1,
      username: 'admin',
      password: 123456,
    },
  ];
  /**
   *  登录
   */
  @Post('/login')
  login(@Body() params: { username: string; password: string }) {
    const user = this.users.find((user) => user.username === params.username);

    if (!user) {
      throw new UnauthorizedException('用户不存在');
    }

    if (user.password !== params.password) {
      throw new UnauthorizedException('密码错误');
    }

    return {
      token: this.jwtService.sign({
        id: user.id,
      }),
    };
  }
  /**
   *
   * 获取用户信息
   */
  @Get('/profile')
  getUserInfo(@Headers('Authorization') auth: string) {
    const token = auth.split(' ')[1];

    const info = this.jwtService.verify(token);

    const user = this.users.find((item) => item.id === info.id);

    return user;
  }

  /**
   *
   * 生成二维码 url
   */
  @Get('/generate')
  async generateCode() {
    const uuid = randomUUID();
    const dataURL = await QRCode.toDataURL(
      `http://192.168.10.211:5173/confirm?uid=${uuid}`,
    );

    map.set(`qrcode_${uuid}`, {
      status: 'no-scan',
    });

    return {
      qrcode_id: uuid,
      code_url: dataURL,
    };
  }
  /**
   *  检查二维码状态
   * @param id 二维码id
   * @returns
   */
  @Get('/check')
  checkCode(@Query('uid') uid: number) {
    const result = map.get(`qrcode_${uid}`);

    return {
      qrcode_id: uid,
      result,
    };
  }
  /**
   *  确认二维码状态
   * @param uid 二维码id
   */
  @Get('/confirm')
  confirmCode(@Query('uid') uid: string) {
    const result = map.set(`qrcode_${uid}`, {
      status: 'confirmed',
    });

    result.status = 'confirmed';

    return {
      qrcode_id: uid,
      result,
    };
  }

  /**
   *  取消
   * @param uid 二维码id
   */
  @Get('/cancel')
  cancelCode(@Query('uid') uid: string) {
    const result = map.set(`qrcode_${uid}`, {
      status: 'cancel',
    });

    result.status = 'cancel';

    return {
      qrcode_id: uid,
      result,
    };
  }

  /**
   * 扫码等待确认
   * @param uid 二维码id
   */

  @Get('/scan')
  scanCode(@Query('uid') uid: string) {
    const result = map.set(`qrcode_${uid}`, {
      status: 'wait-confirm',
    });

    result.status = 'wait-confirm';

    return {
      qrcode_id: uid,
      result,
    };
  }
}
