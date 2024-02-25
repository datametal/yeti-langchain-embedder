import { Injectable } from '@nestjs/common'
import { LlamaCpp } from '@langchain/community/llms/llama_cpp'

@Injectable()
export class SummarizationService {
  private summarizationModel: LlamaCpp | null = null

  fetchModel(cacheBust = false): LlamaCpp {
    if (this.summarizationModel && !cacheBust) return this.summarizationModel
    this.summarizationModel = new LlamaCpp({
      modelPath: 'models/mistral-7b-instruct-v0.2.Q4_K_M.gguf',
      batchSize: 8192,
      contextSize: 8192,
    })
    return this.summarizationModel
  }
}
