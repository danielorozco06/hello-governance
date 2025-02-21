import {
    PluginHandlerInfo,
    PluginMetadataType,
    PolicySelectorCtx,
    PolicySelectorHandler,
    PluginMetadataValidation as validation
  } from '@df/sdk';
export const HelloWorldSchemaMetaData = validation.object({
  policy: validation.string(),
});

export type HelloWorldMetaData = PluginMetadataType<
  typeof HelloWorldSchemaMetaData
>;

  export class HelloWorldPolicy extends PolicySelectorHandler<unknown> {
    override getInfo(): PluginHandlerInfo {
      return {
        displayName: 'Policy Selector Hello World',
        description:
          'test selector',
        metadataSchema: HelloWorldSchemaMetaData,
        tags: ['remote-config', 'policy-selector'],
      };
    }
  
    override async execute(
      context: PolicySelectorCtx<unknown>
    ): Promise<boolean> {
      const { policy } = this.getMetadata<HelloWorldMetaData>();
      return  policy === 'hello-world' ? true : false;
  }
} 