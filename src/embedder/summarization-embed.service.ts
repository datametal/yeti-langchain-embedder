import { Injectable, Logger } from '@nestjs/common'
import { ChatPromptTemplate } from '@langchain/core/prompts'
import { SummarizationModelService } from './summarization-model.service' // Assuming you have this service

@Injectable()
export class SummarizationService {
  private readonly logger = new Logger(SummarizationService.name)

  constructor(private readonly summarizationModelService: SummarizationModelService) {}

  async summarize(text: string): Promise<string> {
    try {
      return this.tryToSummarize(await this.summarizationModelService.fetchModel(), text)
    } catch (error) {
      this.logger.error('Error using model. Recreating model and retrying.', error)
      return this.tryToSummarize(await this.summarizationModelService.fetchModel(true), text)
    }
  }

  private async tryToSummarize(model: any, text: string): Promise<string> {
    // Adjust the type of model as per your implementation
    const instructionTemplate = `...` // Your instruction template here
    const sightingTemplate = '{sighting}'

    return ChatPromptTemplate.fromMessages([
      ['system', instructionTemplate],
      ['system', sightingTemplate],
    ])
      .pipe(model)
      .invoke({ sighting: text })
  }
}
