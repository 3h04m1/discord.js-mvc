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
import { writeDefaults } from '../defaults'
import {NewOptions} from './options'

export function newBot(_options: NewOptions): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const tplpth = `./files/${_options.typescript ? 'ts' : 'js'}`
    _options = writeDefaults(_options)
    const tplDir = url(tplpth)
    const templateSource = apply(tplDir, [
      template({
        ..._options,
        ...strings,
      }),
    ])
    return mergeWith(templateSource)(tree, _context)
  }
}
