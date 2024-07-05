import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { JwtPayload } from 'src/common/strategies/accessToken.strategy';
import { CreatePostInput } from 'src/inputs/post.input';
import { PostService } from './post.service';

@Controller({
  path: 'posts',
  version: '1',
})
export class PostController {
  constructor(private readonly postService: PostService) {}

  @UseGuards(AccessTokenGuard)
  @Post('create')
  create(
    @Body() body: CreatePostInput,
    @Req() req: Request & { user: JwtPayload },
  ) {
    const userId = req.user.sub;
    return this.postService.createPost(body, userId);
  }

  @Get('list')
  getAll() {
    return this.postService.findAll();
  }
}
