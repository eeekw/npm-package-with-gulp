const { execSync } = require('child_process')
const { dest, series } = require('gulp')
const ts = require('gulp-typescript')
const babel = require('gulp-babel')

const tsProject = ts.createProject('tsconfig.json')

const config = [
  {
    modules: 'cjs',
    output: 'lib/',
  },
  {
    modules: 'esm',
    output: 'es/',
  },
]

const clean = (cb) => {
  const rmCommand = config.reduce(
    (prev, { output }) => `${prev} ${output}`,
    'rm -rf'
  )
  execSync(rmCommand)
  cb()
}

const build =
  ({ modules, output }) =>
  () => {
    return tsProject
      .src()
      .pipe(tsProject())
      .js.pipe(
        babel({
          presets: [
            [
              '@babel/preset-env',
              {
                targets: {
                  edge: '17',
                  firefox: '60',
                  chrome: '67',
                  safari: '11.1',
                },
                useBuiltIns: 'usage',
                modules: modules === 'esm' ? false : 'cjs',
              },
            ],
            ['@babel/preset-react'],
          ],
        })
      )
      .pipe(dest(output))
  }

exports.default = series(
  clean,
  config.map(({ modules, output }) => build({ modules, output }))
)
