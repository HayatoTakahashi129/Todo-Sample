// This file is used to override the REST API resources configuration
import { AmplifyApiRestResourceStackTemplate } from "@aws-amplify/cli-extensibility-helper";

export function override(resources: AmplifyApiRestResourceStackTemplate) {
  // read openapi file.
  const openApiJson = require("../output.json");

  resources.restApi.body = openApiJson;
  resources.restApi.failOnWarnings = false;
  resources.deploymentResource.overrideLogicalId(
    "DeploymentAPIGW" + openApiJson.info.title + Date.now()
  );
}
