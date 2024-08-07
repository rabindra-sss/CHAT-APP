import { CodegenConfig } from "@graphql-codegen/cli"

const config: CodegenConfig = {
  schema: "https://chat-app-53l0.onrender.com/graphql",
  documents: ["src/graphql/**/*.ts"],
  ignoreNoDocuments: true, // for better experience with the watcher
  generates: {
    "./src/gql/": {
      preset: "client",
      plugins: ["typescript"],
    },
  },
}

export default config
