import { PluginModule } from '@df/sdk';
import { HelloWorldHandler } from '../handlers/actions/helloWorld.action';
import { HelloWorldPolicy } from '../handlers/policies/hello.Policy';
import { helloWorldRuleException } from '../handlers/Rules/helloWorld.ruleExceptions';
import { GenericHelloWorld } from '../handlers/Rules/helloWorl.ruleExecutors';

export const HelloWorldPluginModule = PluginModule.register({
  info: {
    displayName: 'Hello World Plugin',
    author: 'Alejandro Zambrano',
    description: 'Plugin que imprime "Hello world" con el nombre enviado en la request.',
    documentationUrl: '',
    sourceCodeUrl: '',
    tags: ['hello', 'example']
  },
  handlers: {
    generalExceptions: [],
    ruleExceptions: [helloWorldRuleException],
    ruleExecutors: [GenericHelloWorld],
    policySelectors: [HelloWorldPolicy],
    contextConstructors: [],
    actions: [HelloWorldHandler]
  },
});
