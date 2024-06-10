import jetbrains.buildServer.configs.kotlin.*
import jetbrains.buildServer.configs.kotlin.buildFeatures.perfmon
import jetbrains.buildServer.configs.kotlin.buildSteps.nodeJS
import jetbrains.buildServer.configs.kotlin.buildSteps.script
import jetbrains.buildServer.configs.kotlin.triggers.schedule
import jetbrains.buildServer.configs.kotlin.triggers.vcs
import jetbrains.buildServer.configs.kotlin.vcs.GitVcsRoot

/*
The settings script is an entry point for defining a TeamCity
project hierarchy. The script should contain a single call to the
project() function with a Project instance or an init function as
an argument.

VcsRoots, BuildTypes, Templates, and subprojects can be
registered inside the project using the vcsRoot(), buildType(),
template(), and subProject() methods respectively.

To debug settings scripts in command-line, run the

    mvnDebug org.jetbrains.teamcity:teamcity-configs-maven-plugin:generate

command and attach your debugger to the port 8000.

To debug in IntelliJ Idea, open the 'Maven Projects' tool window (View
-> Tool Windows -> Maven Projects), find the generate task node
(Plugins -> teamcity-configs -> teamcity-configs:generate), the
'Debug' option is available in the context menu for the task.
*/

version = "2024.03"

project {

    vcsRoot(HttpsGithubComSilentbillyRportalpwRefsHeadsMain)

    buildType(Build)
}

object Build : BuildType({
    name = "Build"

    params {

    }

    vcs {
        root(HttpsGithubComSilentbillyRportalpwRefsHeadsMain)
    }

    steps {
        script {
            name = "Set up environment variables"
            id = "Set_up_environment_variables"
            scriptContent = """
                export RP_PASSWORD=%RP_PASSWORD%
                export BASIC_AUTH_TOKEN=%BASIC_AUTH_TOKEN%
                export RP_API_KEY=%RP_API_KEY%
            """.trimIndent()
        }
        script {
            name = "Docker Login"
            id = "Docker_Login"
            scriptContent = "echo %DOCKER_HUB_PASSWORD% | docker login -u %DOCKER_HUB_USERNAME% --password-stdin"
        }
        script {
            name = "Start services"
            id = "Start_services"
            scriptContent = "docker-compose -f ./docker-compose.yml up -d"
        }
        nodeJS {
            name = "Install Node.js and npm dependencies"
            id = "Install_Node_js_and_npm_dependencies"
            executionMode = BuildStep.ExecutionMode.RUN_ON_FAILURE
            shellScript = """
                # Install npm dependencies
                npm ci
                
                npx --version
            """.trimIndent()
            dockerImage = "node:18"
        }
        nodeJS {
            name = "Tests"
            id = "Tests"
            shellScript = """
                # Run Playwright commands
                npx playwright install --with-deps
                npx playwright test
            """.trimIndent()
            dockerImage = "node:18"
        }
        script {
            name = "Stop services"
            id = "Stop_services"
            executionMode = BuildStep.ExecutionMode.RUN_ON_FAILURE
            scriptContent = "docker-compose -f ./docker-compose.yml down"
        }
    }

    triggers {
            vcs {
                branchFilter = """
                    +:refs/heads/*
                """.trimIndent()
            }
            schedule {
                schedulingPolicy = daily {
                    hour = 3
                }
                branchFilter = "+:*"
                triggerBuild = always()
            }
        }

    features {
        perfmon {
        }
        feature {
            type = "xml-report-plugin"
            param("xmlReportParsing.reportDirs", "test-results/results.xml")
            param("xmlReportParsing.reportType", "junit")
        }
    }
})

object HttpsGithubComSilentbillyRportalpwRefsHeadsMain : GitVcsRoot({
    name = "https://github.com/Silentbilly/rportalpw#refs/heads/develop"
    url = "https://github.com/Silentbilly/rportalpw"
    branch = "refs/heads/develop"
    branchSpec = "refs/heads/*"
    authMethod = password {
        userName = "Silentbilly"
        password = "credentialsJSON:efff5efe-35ce-41db-8e03-50bc012445b7"
    }
})
