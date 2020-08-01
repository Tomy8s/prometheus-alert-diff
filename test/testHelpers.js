module.exports = function generateTestHelpers(testFileLocation) {
    return {
        expect: require('chai').expect,
        testSubjects: getTestSubjects(testFileLocation),
    };
};


function getTestSubjects(testFileLocation) {
    const fileToTest = `../src/${testFileLocation.match(/.*\/(\w*)\./)[ 1 ]}`;

    return require(fileToTest);
}
