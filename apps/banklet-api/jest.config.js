module.exports = {
  name: 'banklet-api',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/banklet-api',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
