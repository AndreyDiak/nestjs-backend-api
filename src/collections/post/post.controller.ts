import { Body, Controller, Post } from '@nestjs/common';
import { CreatePostInput } from 'src/inputs/post.input';
import { PostService } from './post.service';

@Controller({
  path: 'posts',
})
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  create(@Body() body: CreatePostInput) {
    return this.postService.createPost(body);
  }
}
