import {
  Rule,
  SchematicContext,
  Tree,
  url,
  apply,
  template,
  mergeWith,
} from '@angular-devkit/schematics'
import { strings } from '@angular-devkit/core'
import { GenerateOptions } from './types'

export function generateComponent(options: GenerateOptions): Rule {
  return (tree: Tree, context: SchematicContext) => {
    let templateUrl = options.typescript ? './files/ts/' : './files/js/'

    const templateSource = apply(url(templateUrl + options.schema), [
      template({
        ...options,
        ...strings,
      }),
    ])

    return mergeWith(templateSource)(tree, context)
  }
}
