import {
    ExceptionClient,
    FilterType,
    PluginHandlerInfo,
    PluginMetadataType,
    PluginMetadataValidation,
    RuleExceptionCtx,
    RuleExceptionHandler,
    RuleExceptionResponse,
  } from '@df/sdk'; 

  export const HelloWorldRuleExceptionMetadataSchema = PluginMetadataValidation.object({
    helloWorldRule: PluginMetadataValidation.string({
      description: 'The path to the value to check as a resource.',
    }),
  });
  
  export type HelloWorldRuleExceptionMetadataType = PluginMetadataType<
    typeof HelloWorldRuleExceptionMetadataSchema
  >;
  export class helloWorldRuleException extends RuleExceptionHandler<unknown> {
    getInfo(): PluginHandlerInfo {
      return {
        displayName: 'DF Rule Exception Hello World',
        description:
          'Check rule exceptions using the DevOps Framework exceptions API.',
        metadataSchema: HelloWorldRuleExceptionMetadataSchema,
        tags: ['remote-config', 'general-exception'],
      };
    }

    async execute(
        ctx: RuleExceptionCtx<unknown>
    ): Promise<RuleExceptionResponse> {
        const metadata = this.getMetadata<HelloWorldRuleExceptionMetadataType>();
        const resource: string = metadata.helloWorldRule;
        console.log('resource rule exceptions', resource);

        if (resource === "hello-world") {
            return [
                {
                    ruleName: "fixed-rule",
                    exception: true,
                    details: [
                        {
                            message: "Predefined response for hello-world",
                            expirationDate: "9999-12-31T23:59:59Z",
                            createdAt: "2025-01-01T00:00:00Z",
                            createdBy: "system"
                        }
                    ]
                }
            ];
        }
    
        const exceptionClient = ExceptionClient.getInstance();
        const exceptions = await exceptionClient.getExceptionsWithFilters({
            resource,
            resourceFilterType: FilterType.EXACT,
            type: `${this.control}/`,
            typeFilterType: FilterType.STARTS_WITH,
        });
    
        const foundExceptions = this.rules.map((rule) => {
            const matchingExceptions = exceptions.filter(
                (exception) => exception.type === `${this.control}/${rule}`
            );
    
            if (matchingExceptions.length > 0) {
                return {
                    ruleName: rule,
                    exception: true,
                    details: matchingExceptions.map((exception) => ({
                        message: exception.description,
                        expirationDate: exception.expirationDate,
                        createdAt: exception.createdAt,
                        createdBy: exception.creator,
                    })),
                };
            } else {
                return {
                    ruleName: rule,
                    exception: false,
                };
            }
        });
    
        return foundExceptions.filter((exception) => exception.exception);
    }

}


  