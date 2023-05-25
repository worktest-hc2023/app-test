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
                script{
                    try {
                        sh """
                            npm run junit-test
                        """
                        MOCHA_OUTPUT = sh (
                            script: 'npm test',
                            returnStdout: true
                        ).trim()
                        echo "Test output: ${MOCHA_OUTPUT}"
                        if (env.BRANCH_NAME.startsWith('PR')) {
                            sh 'node testfile1.js $GITHUB_APP "$GITHUB_PERM" $GITHUB_INSTALLATION $GIT_COMMIT "success"'
                        }
                    } catch (err) {
                        if (env.BRANCH_NAME.startsWith('PR')) {
                            sh 'node testfile1.js $GITHUB_APP "$GITHUB_PERM" $GITHUB_INSTALLATION $GIT_COMMIT "failure"'
                        }
                        echo "Tests fail to pass: ${err}"
                    }
                }
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