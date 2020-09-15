# Getting Started
This repo was created to easily reproduce a bug introduced in aws-cdk@1.61.0.

To begin, clone this repo and install dependencies:
```bash
$ npm install
```

Then build the project (this script will run `cdk synth --no-staging` and will
pipe the output into `template.yaml`):
```bash
$ npm run build
```

Now try running the lambda locally using `sam local invoke` (to install `sam`
please refer to [the AWS docs](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html)):
```bash
$ sam local invoke "funcC3A0C2E2"
```
> **Note:** You may need to change the name of the lambda. To find the name, look
in the `template.yaml` file created by `cdk synth`.

You should see an error like this:
```
{"errorType":"Runtime.HandlerNotFound","errorMessage":"index.handler is undefined or not exported"}
```

To see this working correctly, modify `package.json` to change all `*aws-cdk*`
packages from version `1.61.0` to `1.60.0`. Then repeat the steps above
starting with `npm install`. Instead of seeing an error you should see a
successful response from the lambda:
```
{"statusCode":200,"headers":{},"body":"Hello!"}
```

# Details
Notice that when running `sam` with the broken version there is a line that
looks like:
```
Mounting /Users/lprice/work/playground/demo-aws-cdk-asset-path-bug/asset.eaa6b4d3a12be11c844440afe5ee48ce3999505afaa441be0292009b5f7f2766 as /var/task:ro,delegated inside runtime container
```
This is SAM trying to mount the lambda code to the Docker container from which
the lambda will be invoked. This path does not actually contain the bundled
lambda code, which is why we see the error.

Compare that with the corresponding line from the working version:
```
Mounting /Users/lprice/work/playground/demo-aws-cdk-asset-path-bug/.cdk.staging/asset-bundle-2VIsWk as /var/task:ro,delegated inside runtime container
```
This path does contain the lambda code, so the `sam local invoke` succeeds.

These paths ultimately come from the template that `cdk synth --no-staging`
creates. Notice the `aws:asset:path` under the lambda's `Metadata` property.
