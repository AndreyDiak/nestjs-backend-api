import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { JwtPayload } from 'src/common/strategies/accessToken.strategy';
import { CreatePostInput, UpdatePostInput } from 'src/inputs/post.input';
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
    return this.postService.create(body, userId);
  }

  @UseGuards(AccessTokenGuard)
  @Put('/:id')
  updateOne(@Param('id') id: string, @Body() body: UpdatePostInput) {
    return this.postService.updateOne(id, body);
  }

  @UseGuards(AccessTokenGuard)
  @Delete('/:id')
  deleteOne(@Param('id') id: string) {
    return this.postService.deleteOne(id);
  }

  @Get('list')
  getAll() {
    return this.postService.findAll();
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.findOne(id);
  }
}
