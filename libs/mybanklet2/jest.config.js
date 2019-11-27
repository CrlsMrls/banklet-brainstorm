module.exports = {
  name: 'mybanklet2',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/mybanklet2',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
