module.exports = {
  'launchers': {
    'Node': {
      'command': 'node tests.js',
      'protocol': 'tap'
    }
  },
  'framework': 'tap',
  'serve_files': [
    'test/index.test.bundle.js'
  ],
  'serve_files_ignore': [],
  'before_tests': 'npx webpack',
  'after_tests': 'rm  test/index.test.bundle.js',
  'launch_in_dev': ['PhantomJS'],
  'launch_in_ci': ['PhantomJS', 'Chrome']
}
