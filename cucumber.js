module.exports = {
    default: {
        formatOptions: {
            snippetInterface: "async-await"
        },
        paths: [
            "src/tests/features/"
        ],
        dryRun: false,
        require: [
            "src/tests/steps/*.ts",
            "src/tests/hooks/hooks.ts"
        ],
        requireModule: [
            "ts-node/register"
        ],
        format: [
            "progress-bar",
            "html:test-results/cucumber-report.html",
            "json:test-results/cucumber-report.json"
        ],
        parallel: 4,
        retry: 2
    }
}