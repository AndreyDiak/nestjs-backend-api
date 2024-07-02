import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ThrottlerModule } from '@nestjs/throttler';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './collections/auth/auth.module';
import { CommentController } from './collections/comment/comment.controller';
import { CommentModule } from './collections/comment/comment.module';
import { PostModule } from './collections/post/post.module';
import { UserModule } from './collections/user/user.module';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ThrottlerModule.forRoot([{ limit: 10, ttl: 60 }]),
    MongooseModule.forRoot(process.env.DATABASE_URI),
    AuthModule,
    UserModule,
    PostModule,
    CommentModule,
  ],
  controllers: [AppController, CommentController],
  providers: [AppService],
})
export class AppModule {}
