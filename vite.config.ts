// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { copyFile } from "node:fs/promises";
import { join, resolve } from "node:path";
import type { Plugin } from "vite";
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

function githubPages404Plugin(): Plugin {
  let root = process.cwd();
  let clientOutDir = "dist/client";

  return {
    name: "github-pages-404-fallback",
    apply: "build",
    enforce: "post",
    configResolved(config) {
      root = config.root;
      clientOutDir = config.environments["client"]?.build.outDir ?? "dist/client";
    },
    buildApp: {
      order: "post",
      async handler() {
        const dir = resolve(root, clientOutDir);
        await copyFile(join(dir, "index.html"), join(dir, "404.html"));
      },
    },
  };
}

export default defineConfig({
  nitro: {
    output: {
      dir: "dist",
      serverDir: "dist/server",
      publicDir: "dist/client",
    },
  },
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
    pages: [{ path: "/" }, { path: "/privacy" }, { path: "/terms" }],
    prerender: {
      enabled: true,
      autoStaticPathsDiscovery: false,
      crawlLinks: false,
    },
  },
  plugins: [githubPages404Plugin()],
});
