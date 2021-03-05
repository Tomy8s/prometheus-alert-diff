const {
    expect,
    testSubjects: {
        extractLabels,
        objToYaml,
        getServers,
        handleError,
        validateServers
    },
} = require('./testHelpers')(__filename);


describe('helpers', function describeHelpers() {
    describe('extractLabels', function describeExtractLabels() {
        [
            {
                input: {
                    name: 'test name',
                    query: 'test query',
                    duration: 'test duration',
                    labels: { l1: 'v1', l2: 'v2'},
                    annotations: { a1: 'an1', a2: 'an2' },
                },
                expected: `
name: test name
query: test query
duration: test duration
labels: 
  l1: v1
  l2: v2
annotations: 
  a1: an1
  a2: an2
`,
            }
        ].forEach(itExtractsLabelsCorrectlyTemplate);

        function itExtractsLabelsCorrectlyTemplate({ input, expected }) {
            it('extracts labels correctly', function itExtractsLabelsCorrectly() {
                const actual = extractLabels(input);

                expect(actual).to.eql(expected);
            });
        }
    });


    describe('generateAnnotationMsg', function describeGenerateAnnotationMsg() {
        [
            {
                input: { a1: 'an1', a2: 'an2' },
                expected: `
  a1: an1
  a2: an2`,
            },
        ].forEach(itGeneratesAnnotationsTemplate);

        function itGeneratesAnnotationsTemplate({ input, expected }) {
            it('generates annotations', function itGeneratesAnnotations() {
                const actual = objToYaml(input);

                expect(actual).to.eql(expected);
            });
        }
    });
});
