import { Configuration, OpenAIApi } from "openai"

const configuration = new Configuration({
  apiKey: "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"
})

export const openai = new OpenAIApi(configuration)
