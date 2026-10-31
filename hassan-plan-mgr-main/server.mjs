import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve, extname } from "node:path";

const root = dirname(fileURLToPath(import.meta.url));
const files = new Set(["index.html", "styles.css", "app.mjs", "schedule.mjs"]);
const types = { ".html": "text/html", ".css": "text/css", ".mjs": "text/javascript" };
const port = Number(process.env.PORT || 4173);

createServer(async (request, response) => {
  const pathname = new URL(request.url, "http://localhost").pathname;
  const name = pathname === "/" ? "index.html" : pathname.slice(1);
  if (!files.has(name)) {
    response.writeHead(404);
    response.end("Not found");
    return;
  }
  try {
    const content = await readFile(resolve(root, name));
    response.writeHead(200, { "Content-Type": `${types[extname(name)]}; charset=utf-8` });
    response.end(content);
  } catch (error) {
    console.error(`Failed to serve ${name}`, error);
    response.writeHead(500);
    response.end("Unable to serve this file");
  }
}).listen(port, "127.0.0.1", () => {
  console.log(`Hassan's schedule: http://127.0.0.1:${port}`);
});
