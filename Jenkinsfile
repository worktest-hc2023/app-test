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
                //for making an in-progress check, although it would be better to somehow get a checkrun id and update it
//                 script{
//                     if (env.BRANCH_NAME.startsWith('PR')) {
//                         echo "Entered in-progress branch statement"
//                         sh 'node testfile1.js $GITHUB_APP "$GITHUB_PERM" $GITHUB_INSTALLATION $GIT_COMMIT "" ""'
//                     }
//                 }
            }
        }
        stage('Test') {
            steps {
                echo 'Testing..'
                script{
                    try {
                        sh "npm test > mochaResult"

                        env.MOCHA_OUTPUT = readFile('mochaResult').trim()

                        sh """
                            npm run junit-test
                        """

                        if (env.BRANCH_NAME.startsWith('PR')) {
                            sh 'node testfile1.js $GITHUB_APP "$GITHUB_PERM" $GITHUB_INSTALLATION $GIT_COMMIT "success" "$MOCHA_OUTPUT"'

                        }
                    } catch (err) {
                        env.MOCHA_OUTPUT = readFile('mochaResult').trim()
                        sh """
                            npm run junit-test
                        """
                        if (env.BRANCH_NAME.startsWith('PR')) {
                            sh 'node testfile1.js $GITHUB_APP "$GITHUB_PERM" $GITHUB_INSTALLATION $GIT_COMMIT "failure" "$MOCHA_OUTPUT"'
                        }
                        echo "Tests fail to pass: ${err}"
                        currentBuild.result = 'FAILURE' //sets build to failure, but doesn't actually say where the failure is so...
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