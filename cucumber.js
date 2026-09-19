module.exports = {
  default: {
    paths: ['features/**/*.feature'],
    require: ['step-definations/**/*.ts'],
    requireModule: ['ts-node/register'],
    format: [
      'progress',
      'allure-cucumberjs/reporter'
    ]
  }
};