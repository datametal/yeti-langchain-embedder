import { Injectable } from '@nestjs/common'
import { EmbeddingModelService } from './embedding-model.service' // Assuming you have this service

@Injectable()
export class EmbeddingService {
  constructor(private readonly embeddingModelService: EmbeddingModelService) {}

  async embed(text: string): Promise<Buffer> {
    const embedding = await this.embeddingModelService.fetchModel().embedQuery(text)
    return Buffer.from(Float32Array.from(embedding).buffer)
  }
}
