'use strict';

const generateRuleTests = require('../../helpers/rule-test-harness');

generateRuleTests({
  name: 'no-invalid-link-title',

  config: true,

  good: [
    '<a href="https://myurl.com">Click here to read more about this amazing adventure</a>',
    '{{#link-to}} click here to read more about our company{{/link-to}}',
    '<LinkTo>Read more about ways semantic HTML can make your code more accessible.</LinkTo>',
    '<LinkTo>{{foo}} more</LinkTo>',
    '<LinkTo @title="nice title">Something else</LinkTo>',
    '<LinkTo title="great titles!">Whatever, don\'t judge me</LinkTo>',
    '<LinkTo title="Download the video">Download</LinkTo>',
    '<a href="https://myurl.com" title="New to Ember? Read the full tutorial for the best experience">Read the Tutorial</a>',
    '<a href="./whatever" title={{foo}}>Hello!</a>',
    '{{#link-to "blah.route.here" title="awesome title"}}Some thing else here{{/link-to}}',
    `
      <LinkTo @query={{hash page=@pagination.prevPage}} local-class="prev" @rel="prev" @title="previous page" data-test-pagination-prev>
        {{svg-jar "left-pag"}}
      </LinkTo>
    `,
  ],

  bad: [
    {
      template: '<a href="https://myurl.com" title="read the tutorial">Read the Tutorial</a>',
      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          Array [
            Object {
              "column": 0,
              "filePath": "layout.hbs",
              "line": 1,
              "message": "Title attribute values should not be the same as the link text.",
              "rule": "no-invalid-link-title",
              "severity": 2,
              "source": "<a href=\\"https://myurl.com\\" title=\\"read the tutorial\\">Read the Tutorial</a>",
            },
          ]
        `);
      },
    },
    {
      template: '<LinkTo title="quickstart">Quickstart</LinkTo>',
      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          Array [
            Object {
              "column": 0,
              "filePath": "layout.hbs",
              "line": 1,
              "message": "Title attribute values should not be the same as the link text.",
              "rule": "no-invalid-link-title",
              "severity": 2,
              "source": "<LinkTo title=\\"quickstart\\">Quickstart</LinkTo>",
            },
          ]
        `);
      },
    },
    {
      template: '<LinkTo @title="foo" title="blah">derp</LinkTo>',
      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          Array [
            Object {
              "column": 0,
              "filePath": "layout.hbs",
              "line": 1,
              "message": "Specifying title as both an attribute and an argument to <LinkTo /> is invalid.",
              "rule": "no-invalid-link-title",
              "severity": 2,
              "source": "<LinkTo @title=\\"foo\\" title=\\"blah\\">derp</LinkTo>",
            },
          ]
        `);
      },
    },
    {
      template: '{{#link-to title="Do the things"}}Do the things{{/link-to}}',
      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          Array [
            Object {
              "column": 0,
              "filePath": "layout.hbs",
              "line": 1,
              "message": "Title attribute values should not be the same as the link text.",
              "rule": "no-invalid-link-title",
              "severity": 2,
              "source": "{{#link-to title=\\"Do the things\\"}}Do the things{{/link-to}}",
            },
          ]
        `);
      },
    },
    {
      template: '<LinkTo @route="some.route" @title="Do the things">Do the things</LinkTo>',
      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          Array [
            Object {
              "column": 0,
              "filePath": "layout.hbs",
              "line": 1,
              "message": "Title attribute values should not be the same as the link text.",
              "rule": "no-invalid-link-title",
              "severity": 2,
              "source": "<LinkTo @route=\\"some.route\\" @title=\\"Do the things\\">Do the things</LinkTo>",
            },
          ]
        `);
      },
    },
  ],
});
