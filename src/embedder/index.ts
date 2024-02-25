import { Controller, Post, Body } from '@nestjs/common'
import { SummarizationService } from './summarization.service'
import { EmbeddingService } from './embedding.service'

@Controller()
export class AppController {
  constructor(
    private readonly summarizationService: SummarizationService,
    private readonly embeddingService: EmbeddingService,
  ) {}

  @Post('summarize')
  summarize(@Body('text') text: string) {
    return this.summarizationService.summarize(text)
  }

  @Post('embed')
  embed(@Body('text') text: string) {
    return this.embeddingService.embed(text)
  }
}
