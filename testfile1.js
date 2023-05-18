//import { App } from "octokit";
//import { Octokit } from "octokit";
const { createAppAuth } = require("@octokit/auth-app");
const { Octokit, App } = require("octokit");
require('dotenv').config()
//import dotenv from 'dotenv'
//dotenv.config()

//let test="huh??";

async function authentication(){
    const auth = createAppAuth({
      appId: process.env.GITHUB_APP_ID,
      privateKey: (process.env.GITHUB_PEM ?? '').replaceAll(/\\n/g, '\n'),
      installationId: process.env.GITHUB_INSTALLATION_ID ?? ''
    });

    const appAuthentication = await auth({ type: "app" });
    console.log("here");

    return new Octokit({
        auth: appAuthentication,
    })
}

async function githubCheckRun(name, commitID, stat, out){
//    var url = 'POST /repos/worktest-hc2023/app-test/commits/' + commitID + '/check-runs';
//    const octokit = await authentication();
    const app = new App({
        appId: process.env.GITHUB_APP_ID,
        privateKey: (process.env.GITHUB_PEM ?? '').replaceAll(/\\n/g, '\n'),
        installationId: process.env.GITHUB_INSTALLATION_ID
    });
    const octokit = await app.getInstallationOctokit(process.env.GITHUB_INSTALLATION_ID);
    var url = 'POST /repos/worktest-hc2023/app-test/check-runs';
    await octokit.request(url, {
        owner: 'worktest-hc2023',
        repo: 'app-test',
        name: 'npm-test reports',
        head_sha: commitID,
        status: stat,
        output: out,
        headers: {
            'X-GitHub-Api-Version': '2022-11-28'
        }
    });
}
githubCheckRun(process.argv[4]);
//githubCheckRun('Name', '2c6701db535928210458ed3c27a59c67279818e1', 'in_progress', {title: 'Test Report', summary: '', text: ''});

//    const app = new App({
//        appId: process.env.GITHUB_APP_ID,
//        privateKey: (process.env.GITHUB_PEM ?? '').replaceAll(/\\n/g, '\n'),
//        installationId: process.env.GITHUB_INSTALLATION_ID
//    });

//const installationAuthentication = await auth({ type: "installation" });

// Octokit.js
// https://github.com/octokit/core.js#readme

//async function call(){
//await octokit.request('POST /repos/worktest-hc2023/app-test/commits/2c6701db535928210458ed3c27a59c67279818e1/check-runs', {
//    owner: 'worktest-hc2023',
//    repo: 'app-test',
//    name: 'npm-test reports',
//    head_sha: '2c6701db535928210458ed3c27a59c67279818e1',
//    status: 'in_progress',
//    external_id: '42',
//    started_at: '2018-05-04T01:14:52Z',
//    output: {
//        title: 'Test Report',
//        summary: '',
//        text: ''
//    },
//    headers: {
//        'X-GitHub-Api-Version': '2022-11-28'
//    }
//});
//}

//call();