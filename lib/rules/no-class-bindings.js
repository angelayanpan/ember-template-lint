'use strict';

const Rule = require('./base');

module.exports = class NoClassBindings extends Rule {
  visitor() {
    function check(node) {
      let specifiedKey = node.type === 'AttrNode' ? node.name : node.key;
      let argumentName = node.type === 'AttrNode' ? node.name : `@${node.key}`;

      if (argumentName === '@classBinding' || argumentName === '@classNameBindings') {
        this.log({
          message: `Passing the \`${specifiedKey}\` property as an argument within templates is not allowed.`,
          line: node.loc && node.loc.start.line,
          column: node.loc && node.loc.start.column,
          source: this.sourceForNode(node),
        });
      }
    }

    return {
      AttrNode: check,
      HashPair: check,
    };
  }
};