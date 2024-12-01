const { dest } = require('gulp')
const ts = require('gulp-typescript')
const babel = require('gulp-babel')

const tsProject = ts.createProject('tsconfig.json')

exports.default = () =>
  tsProject
    .src()
    .pipe(tsProject())
    .js.pipe(babel())
    .pipe(dest(process.env.modules === 'esm' ? 'es/' : 'lib/'))
