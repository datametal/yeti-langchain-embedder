import { Injectable } from '@nestjs/common'
import { HuggingFaceTransformersEmbeddings } from '@langchain/community/embeddings/hf_transformers'

@Injectable()
export class EmbeddingService {
  private embeddingModel: HuggingFaceTransformersEmbeddings | null = null

  fetchModel(cacheBust = false): HuggingFaceTransformersEmbeddings {
    if (this.embeddingModel && !cacheBust) return this.embeddingModel
    this.embeddingModel = new HuggingFaceTransformersEmbeddings({
      modelName: 'Xenova/all-MiniLM-L6-v2',
    })
    return this.embeddingModel
  }
}
cc
