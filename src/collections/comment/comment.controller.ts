import {
  Body,
  Controller,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { JwtPayload } from 'src/common/strategies/accessToken.strategy';
import {
  CreateCommentInput,
  UpdateCommentInput,
} from 'src/inputs/comment.input';
import { CommentService } from './comment.service';

@Controller({
  path: 'comments',
  version: '1',
})
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @UseGuards(AccessTokenGuard)
  @Post('create')
  create(
    @Body() body: CreateCommentInput,
    @Req() req: Request & { user: JwtPayload },
  ) {
    const userId = req.user.sub;
    return this.commentService.create(body, userId);
  }

  @UseGuards(AccessTokenGuard)
  @Put('/:id')
  updateOne(@Param('id') id: string, @Body() body: UpdateCommentInput) {
    return this.commentService.updateOne(id, body);
  }
}
