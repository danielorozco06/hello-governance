import {
    PluginHandlerInfo,
    PluginMetadataType,
    PluginMetadataValidation,
    RuleExecutorCtx,
    RuleExecutorHandler,
    RuleExecutorResponse,
  } from '@df/sdk';

  export const GenericHelloWorldMetadataSchema = PluginMetadataValidation.object({
    helloWorldRule: PluginMetadataValidation.string({
        description: 'The path to the value to check as a resource.',
    }),
  });
  
  export type GenericHelloWorldMetadataType = PluginMetadataType<
    typeof GenericHelloWorldMetadataSchema
  >;
  export class GenericHelloWorld extends RuleExecutorHandler<unknown> {
  getInfo(): PluginHandlerInfo {
    return {
      displayName: 'Generic Hello World Policy Rule Executor',
      description:
        'Runs a rule that do hello world.',
      metadataSchema: GenericHelloWorldMetadataSchema,
      tags: ['azure-devops', 'rule-executor', 'repository-policy'],
    };
  }
  async execute(
    context: RuleExecutorCtx<unknown>
  ): Promise<RuleExecutorResponse> {
    try {
        const metadata = this.getMetadata<GenericHelloWorldMetadataType>();
        const resource: string = metadata.helloWorldRule;
        console.log('resource Rule Executors: ', resource);

        if (resource === "hello-world") {
            return {
            passed: true,
           messages: ['Hello World.'],
            };
        }
        return {
            passed: false,
            messages: ['No Hello World'], 
        };
        } catch (error) {
        return {
            passed: false,
            messages: [
                (error as Error).message ||
                  'An error occurred while executing the rule.',
            ]
        }};
    }
}