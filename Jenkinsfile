// def check_runs
//
// node{
//     check_runs = load 'buildGithubCheckScript.groovy'
// }

pipeline {
    agent any
    environment {
        GITHUB_APP = credentials('GITHUB_APP_ID')
        GITHUB_INSTALLATION = credentials('GITHUB_INSTALLATION_ID')
        GITHUB_PERM = credentials('GITHUB_PEM')
        GIT_COMMIT = "${env.GIT_COMMIT}"
    }
    stages {
        stage('Build') {
            steps {
                echo 'Building..'
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
//                 sh 'node testfile1.js $GITHUB_APP $GITHUB_PERM $GITHUB_INSTALLATION $GIT_COMMIT'
            }
        }
    }
    post {
        always {
            junit '**/test-results.xml'
            script {
                resultString = "None"
            }
        }
    }
}