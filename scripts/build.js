import { buildSync } from 'esbuild'

buildPlugin({
  entryPoints: ['builds/cdn.js'],
  outfile: 'dist/validation.min.js',
})

buildPlugin({
  entryPoints: ['builds/module.js'],
  outfile: 'dist/validation.esm.js',
  platform: 'neutral',
  mainFields: ['main', 'module'],
})

function buildPlugin(buildOptions) {
  return buildSync({
    ...buildOptions,
    minify: true,
    bundle: true,
  })
}
