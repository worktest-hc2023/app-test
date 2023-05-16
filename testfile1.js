import { App } from "octokit";
import { Octokit } from "octokit";
import { createAppAuth } from "@octokit/auth-app";
//const { Octokit, App } = require("octokit");
import dotenv from 'dotenv'
dotenv.config()

//let test="huh??";

const auth = createAppAuth({
  appId: process.env.GITHUB_APP_ID,
  privateKey: (process.env.GITHUB_PEM ?? '').replaceAll(/\\n/g, '\n'),
  installationId: process.env.GITHUB_INSTALLATION_ID ?? ''
});

const appAuthentication = await auth({ type: "app" });

const installationAuthentication = await auth({ type: "installation" });

const app = new App({
    appId: process.env.GITHUB_APP_ID,
    privateKey: (process.env.GITHUB_PEM ?? '').replaceAll(/\\n/g, '\n'),
    installationId: process.env.GITHUB_INSTALLATION_ID
});

// Octokit.js
// https://github.com/octokit/core.js#readme
const octokit = new Octokit({
    auth: appAuthentication,
})

//async function call(){
await octokit.request('POST /repos/worktest-hc2023/app-test/check-runs', {
    owner: 'worktest-hc2023',
    repo: 'app-test',
    name: 'npm-test reports',
    head_sha: '2c6701db535928210458ed3c27a59c67279818e1',
    status: 'in_progress',
    external_id: '42',
    started_at: '2018-05-04T01:14:52Z',
    output: {
        title: 'Test Report',
        summary: '',
        text: ''
    },
    headers: {
        'X-GitHub-Api-Version': '2022-11-28'
    }
});
//}

//call();