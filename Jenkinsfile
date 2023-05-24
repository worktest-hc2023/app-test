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
        GITHUB_PEM = credentials('GITHUB_PEM')
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
                sh '''
                    node testfile1.js "${GITHUB_APP_ID}" "${GITHUB_PEM}" "${GITHUB_INSTALLATION_ID}" "${env.GIT_COMMIT}"
                '''
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