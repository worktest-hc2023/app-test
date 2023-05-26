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
                        env.MOCHA_OUTPUT = sh (
                            script: 'npm test',
                            returnStdout: true
                        ).trim()

                        sh """
                            npm run junit-test
                        """

                        echo "Tests Successful: We are here"

                        if (env.BRANCH_NAME.startsWith('PR')) {
                            echo "Entered success branch statement"
                            sh 'node testfile1.js $GITHUB_APP "$GITHUB_PERM" $GITHUB_INSTALLATION $GIT_COMMIT "success" "$MOCHA_OUTPUT"'
                            echo "Mocha Output: ${MOCHA_OUTPUT}"
                        }
                    } catch (err) {
                        sh """
                            npm run junit-test
                        """
                        echo "Tests failed: We are here"
                        if (env.BRANCH_NAME.startsWith('PR')) {
                            echo "Entered failed branch statement"
                            sh 'node testfile1.js $GITHUB_APP "$GITHUB_PERM" $GITHUB_INSTALLATION $GIT_COMMIT "failure" "$MOCHA_OUTPUT"'
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