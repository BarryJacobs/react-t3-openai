import { Configuration, OpenAIApi } from "openai"

const configuration = new Configuration({
  apiKey: "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"
})

export const openai = new OpenAIApi(configuration)
