import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

// 1. สร้าง Interface เพื่อกำหนดโครงสร้างข้อมูลที่แน่นอน
interface JwtPayload {
  sub: number; // หรือ string ตามที่ Laravel ส่งมา
  email: string;
  iat?: number;
  exp?: number;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey:
        'XCagioE75ABHgMPH7U9Li8gY8g9ZWZvHohf0t04KEgcRsh5TEvX6zYKxMoDl3epz',
    });
  }

  // 2. เปลี่ยนจาก any เป็น JwtPayload
  validate(payload: JwtPayload) {
    // ตอนนี้ TypeScript จะรู้แล้วว่า payload มี .sub และ .email แน่นอน
    return { userId: payload.sub, email: payload.email };
  }
}
