'use strict';

const generateRuleTests = require('../../helpers/rule-test-harness');

generateRuleTests({
  name: 'require-iframe-title',

  config: true,

  good: [
    '<iframe title="Welcome to the Matrix!" />',
    '<iframe title={{someValue}} />',
    '<iframe title="" aria-hidden />',
    '<iframe title="" hidden />',
    '<iframe title="foo" /><iframe title="bar" />',
  ],

  bad: [
    {
      template: '<iframe title="foo" /><iframe title="foo" />',

      results: [
        {
          message: 'This title is not unique. #1',
          source: 'title="foo"',
          line: 1,
          column: 8,
        },
        {
          message:
            '<iframe> elements must have a unique title property. Value title="foo" already used for different iframe. #1',
          source: '<iframe title="foo" />',
          line: 1,
          column: 22,
        },
      ],
    },
    {
      template:
        '<iframe title="foo" /><iframe title="boo" /><iframe title="foo" /><iframe title="boo" />',
      results: [
        {
          message: 'This title is not unique. #1',
          source: 'title="foo"',
          line: 1,
          column: 8,
        },
        {
          message:
            '<iframe> elements must have a unique title property. Value title="foo" already used for different iframe. #1',
          source: '<iframe title="foo" />',
          line: 1,
          column: 44,
        },
        {
          message: 'This title is not unique. #2',
          source: 'title="boo"',
          line: 1,
          column: 30,
        },
        {
          message:
            '<iframe> elements must have a unique title property. Value title="boo" already used for different iframe. #2',
          source: '<iframe title="boo" />',
          line: 1,
          column: 66,
        },
      ],
    },
    {
      template: '<iframe src="12" />',

      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          Array [
            Object {
              "column": 0,
              "filePath": "layout.hbs",
              "line": 1,
              "message": "<iframe> elements must have a unique title property.",
              "rule": "require-iframe-title",
              "severity": 2,
              "source": "<iframe src=\\"12\\" />",
            },
          ]
        `);
      },
    },
    {
      template: '<iframe src="12" title={{false}} />',

      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          Array [
            Object {
              "column": 0,
              "filePath": "layout.hbs",
              "line": 1,
              "message": "<iframe> elements must have a unique title property.",
              "rule": "require-iframe-title",
              "severity": 2,
              "source": "<iframe src=\\"12\\" title={{false}} />",
            },
          ]
        `);
      },
    },
    {
      template: '<iframe src="12" title="{{false}}" />',

      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          Array [
            Object {
              "column": 0,
              "filePath": "layout.hbs",
              "line": 1,
              "message": "<iframe> elements must have a unique title property.",
              "rule": "require-iframe-title",
              "severity": 2,
              "source": "<iframe src=\\"12\\" title=\\"{{false}}\\" />",
            },
          ]
        `);
      },
    },
    {
      template: '<iframe src="12" title="" />',

      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          Array [
            Object {
              "column": 0,
              "filePath": "layout.hbs",
              "line": 1,
              "message": "<iframe> elements must have a unique title property.",
              "rule": "require-iframe-title",
              "severity": 2,
              "source": "<iframe src=\\"12\\" title=\\"\\" />",
            },
          ]
        `);
      },
    },
  ],
});
