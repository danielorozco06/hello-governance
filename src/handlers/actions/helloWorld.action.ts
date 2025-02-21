import { ActionCtx, ActionHandler, PluginHandlerInfo, PluginMetadataValidation } from '@df/sdk';

// Definir un esquema de metadata para la acción
export const ActionMetadataSchema = PluginMetadataValidation.object({
  actionType: PluginMetadataValidation.string()
});

export class HelloWorldHandler extends ActionHandler<{ message: string }, any, any> {
  getInfo(): PluginHandlerInfo {
    return {
      displayName: 'Hello World Action Handler',
      description: 'Responde con un mensaje de Hello World utilizando el nombre recibido en la request.',
      metadataSchema: ActionMetadataSchema,
      tags: ['hello', 'example']
    };
  }

  async execute(ctx: ActionCtx<any, any>): Promise<{ message: string }> {
    const { name } = ctx.request;
    const message = `Hello world, ${name}!`;
    return { message };
  }
}
