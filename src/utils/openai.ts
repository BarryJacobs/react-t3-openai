import { Configuration, OpenAIApi } from "openai"

const configuration = new Configuration({
  apiKey: "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"
})

export const openai = new OpenAIApi(configuration)
