module.exports = {
  name: 'mybanklet',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/mybanklet',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
