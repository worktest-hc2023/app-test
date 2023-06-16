const { createAppAuth } = require("@octokit/auth-app");
const { Octokit, App } = require("octokit");
require('dotenv').config()

async function checkId(app_id, pem, install_id, commitID){
    const app = new App({
        appId: app_id,
        privateKey: (pem ?? '').replaceAll(/\\n/g, '\n'),
    });
    const octokit = await app.getInstallationOctokit(install_id);
    var url = 'GET /repos/worktest-hc2023/app-test/commits/' + commitID + '/check-runs';
//    var url = 'GET /repos/worktest-hc2023/app-test/commits/c373254904b33e9958dbf6e6c5cc692dc99646c2/check-runs';
    const result = await octokit.request(url, {
      owner: 'worktest-hc2023',
      repo: 'app-test',
      headers: {
        'X-GitHub-Api-Version': '2022-11-28'
      }
    })

    var res = '';

    for (var i = 0; i < (result.data.check_runs).length; i++){
        if(result.data.check_runs[i].name == 'Jenkins Tests Report'){
            res = result.data.check_runs[i].id;
            break;
        }
    }

    console.log(res);
}


checkId(process.argv[2], process.argv[3], process.argv[4], process.argv[5]);
//completedGitHubCheckRun(process.argv[2], process.argv[3], process.argv[4], process.argv[5], process.argv[6], process.argv[7]);
//completedGitHubCheckRun(process.env.GITHUB_APP_ID, (process.env.GITHUB_PEM ?? '').replaceAll(/\\n/g, '\n'), process.env.GITHUB_INSTALLATION_ID, '95f0a41acdcdf71cfee23cbc746883e3f0ac2eb0');

