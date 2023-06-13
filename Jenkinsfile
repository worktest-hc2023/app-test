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
//                 for making an in-progress check, although it would be better to somehow get a checkrun id and update it
//                 script{
//                     if (env.BRANCH_NAME.startsWith('PR')) {
//                         echo "Entered in-progress branch statement"
//                         sh 'node testfile1.js $GITHUB_APP "$GITHUB_PERM" $GITHUB_INSTALLATION $GIT_COMMIT "" "" "" ""'
//                     }
//                 }
            }
        }
//         stage('Test') {
//             steps {
//                 echo 'Testing..'
//                 script{
//                     list = ['first-test', 'second-test']
//                     if (env.BRANCH_NAME.startsWith('PR')){
//                         env.CHECKRUN_ID = sh (
//                                                 script: 'node checkid.js $GITHUB_APP "$GITHUB_PERM" $GITHUB_INSTALLATION $GIT_COMMIT',
//                                                 returnStdout: true
//                                             ).trim()
//                         echo "${CHECKRUN_ID}"
//                     }
//                     try {
//                         list.each { item ->
//                             if (item == 'first-test'){
//                                 sh "npm run ${item} > mochaResult"
//                                 env.CONCLUSION = ""
//                                 env.STAT = "in_progress"
//                             }else{
//                                 sh "npm run ${item} >> mochaResult"
//                                 env.CONCLUSION = "success"
//                                 env.STAT = "completed"
//                             }
//
//                             env.MOCHA_OUTPUT = readFile('mochaResult').trim()
//                             if (env.BRANCH_NAME.startsWith('PR')) {
//                                 sh 'node testfile1.js $GITHUB_APP "$GITHUB_PERM" $GITHUB_INSTALLATION $GIT_COMMIT "$CONCLUSION" "$MOCHA_OUTPUT" $CHECKRUN_ID $STAT'
//                             }
//                         }
//
//                     } catch (err) {
//                         env.MOCHA_OUTPUT = readFile('mochaResult').trim()
//                         if (env.BRANCH_NAME.startsWith('PR')) {
//                             sh 'node testfile1.js $GITHUB_APP "$GITHUB_PERM" $GITHUB_INSTALLATION $GIT_COMMIT "failure" "$MOCHA_OUTPUT" $CHECKRUN_ID "completed"'
//                         }
//                         echo "Tests fail to pass: ${err}"
// //                         sh """
// //                             npm run junit-test
// //                         """
// //                         currentBuild.result = 'FAILURE' //sets build to failure, but doesn't actually say where the failure is so...
//                     }
//                 }
//             }
//         }
        stage('Plugin Testing'){
            steps{
                echo 'Testing..'
                script{
                    sh 'npm test'
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
//             junit '**/test-results.xml'
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