import antfu from '@antfu/eslint-config'

const config = antfu({
  // todo:
  // vue: true eksikti
  vue: true,
  typescript: true,
})

config.append({
  files: ['pnpm-workspace.yaml'],
  rules: {
    'pnpm/yaml-enforce-settings': 'off',
  },
})

export default config
