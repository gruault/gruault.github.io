import mermaid    from "mermaid"
import { marked } from "marked"
import pugPlugin  from "@11ty/eleventy-plugin-pug"

import fs                from "fs"
import path              from "path"
import os                from "os"
import { execSync }      from "child_process"
import { fileURLToPath } from "url"

function parseMermaid(text) {
  const tmpInput  = path.join(os.tmpdir(), `mermaid-${Date.now()}.mmd`)
  const tmpOutput = path.join(os.tmpdir(), `mermaid-${Date.now()}.svg`)

  fs.writeFileSync(tmpInput, text)

  execSync(`mmdc -t dark -b transparent -i "${tmpInput}" -o "${tmpOutput}"`)

  const svg = fs.readFileSync(tmpOutput, "utf8")

  fs.unlinkSync(tmpInput)
  fs.unlinkSync(tmpOutput)

  return svg
}

export default function (eleventyConfig) {
  // Mermaid config
  mermaid.initialize({ startOnLoad: false })

  // Pug config
  eleventyConfig.addPlugin(pugPlugin, {
    filters: {
      mermaid: parseMermaid,
      markdown: function (text) { return marked.parse(text.replace(/^[\u200B\u200C\u200D\u200E\u200F\uFEFF]/,"")) }
    }
  })

  // Site files
  const siteFiles = [
    "style/",
    "js/",
    "img/",
    "favicon.png"
  ]
  for (const path of siteFiles) eleventyConfig.addPassthroughCopy(`./src/${path}`)

  // 11ty config
  return {
    dir: {
      input: "src",
      output: "docs"
    }
  }
}
