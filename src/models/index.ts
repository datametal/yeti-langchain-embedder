export * from './embedding.service'
export * from './summarization.service'

// import { Controller, Get } from '@nestjs/common'
// import { SummarizationService } from './summarization.service'
// import { EmbeddingService } from './embedding.service'

// @Controller()
// export class ModelController {
//   constructor(
//     private readonly summarizationService: SummarizationService,
//     private readonly embeddingService: EmbeddingService,
//   ) {}

//   @Get('summarize')
//   getSummarizationModel() {
//     return this.summarizationService.fetchModel()
//   }

//   @Get('embed')
//   getEmbeddingModel() {
//     return this.embeddingService.fetchModel()
//   }
// }
