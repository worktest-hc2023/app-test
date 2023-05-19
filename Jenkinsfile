// def check_runs
//
// node{
//     check_runs = load 'buildGithubCheckScript.groovy'
// }

pipeline {
    agent any
    environment {
        GITHUB_APP_ID = credentials('GITHUB_APP_ID')
        GITHUB_INSTALLATION_ID = credentials('GITHUB_INSTALLATION_ID')
    }
    stages {
        stage('Build') {
            steps {
                echo 'Building..'
                echo $GITHUB_APP_ID
                sh """
                    env
                    npm install
                """
            }
        }
        stage('Test') {
            steps {
                echo 'Testing..'
                sh """
                    npm run junit-test
                """
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying....'
            }
        }
    }
    post {
        always {
//             script{
//                 sh """
//                     curl -L \
//                       -X POST \
//                       -H "Accept: application/vnd.github+json" \
//                       -H "Authorization: Bearer ${secrets.GITHUB_TOKEN}"\
//                       -H "X-GitHub-Api-Version: 2022-11-28" \
//                       "https://api.github.com/repos/worktest-hc2023/app-test/check-runs" \
//                       -d '{"name":"test_check","head_sha":"${github.event.pull_request.head.sha}"}'
//                 """
//             }
            junit '**/test-results.xml'
            script {
                resultString = "None"
            }
        }
    }
}
// Script //
node {
    stage('Build') {
        echo 'Building....'
    }
    stage('Test') {
        echo 'Building....'
    }
    stage('Deploy') {
        echo 'Deploying....'
    }
}