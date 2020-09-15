const cdk = require('@aws-cdk/core');
const { NodejsFunction } = require('@aws-cdk/aws-lambda-nodejs');

class TestStack extends cdk.Stack {
  /**
   *
   * @param {cdk.Construct} scope
   * @param {string} id
   * @param {cdk.StackProps=} props
   */
  constructor(scope, id, props) {
    super(scope, id, props);

    new NodejsFunction(this, 'func', {
      entry: './func.js',
      handler: 'handler',
      projectRoot: '.'
    });
  }
}

module.exports = { TestStack }
