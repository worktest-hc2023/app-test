const { createAppAuth } = require("@octokit/auth-app");
const { Octokit, App } = require("octokit");
require('dotenv').config()

//let test="huh??";

//hypothetical authentication function? Though it's currently not used
async function authentication(){
    const auth = createAppAuth({
      appId: process.env.GITHUB_APP_ID,
      privateKey: (process.env.GITHUB_PEM ?? '').replaceAll(/\\n/g, '\n'),
      installationId: process.env.GITHUB_INSTALLATION_ID ?? ''
    });

    const appAuthentication = await auth({ type: "app" });
    console.log(appAuthentication); //gets the json web token

    return new Octokit({
        auth: appAuthentication,
    })
}

//in progress check run function (unused technically, but has the code)
async function githubCheckRun(app_id, pem, install_id, name, commitID, stat, out){
    const app = new App({
        appId: process.env.GITHUB_APP_ID,
        privateKey: (process.env.GITHUB_PEM ?? '').replaceAll(/\\n/g, '\n'),
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

//completed check run function
async function completedGitHubCheckRun(app_id, pem, install_id, commitID, con, message, checkrun_id, status){
    const app = new App({
        appId: app_id,
        privateKey: (pem ?? '').replaceAll(/\\n/g, '\n'),
    });
    const octokit = await app.getInstallationOctokit(install_id);

    var oct_obj = {
                       owner: 'worktest-hc2023',
                       repo: 'app-test',
                       name: 'Jenkins Tests Report',
                       head_sha: commitID,
                       status: status,
                       output: {
                           title: 'Mocha Test Reports',
                           summary: message,
                           text: ''
                         },
                       headers: {
                           'X-GitHub-Api-Version': '2022-11-28'
                       }
                   }

    if(checkrun_id == ""){
        var url = 'POST /repos/worktest-hc2023/app-test/check-runs';
        oct_obj.status = 'in_progress';
        await octokit.request(url, oct_obj);
    } else if (status == 'in_progress'){
        var url = 'PATCH /repos/worktest-hc2023/app-test/check-runs/' + checkrun_id;
        await octokit.request(url, oct_obj);
    } else{
        var url = 'PATCH /repos/worktest-hc2023/app-test/check-runs/' + checkrun_id;
        oct_obj.conclusion = con;
        await octokit.request(url, oct_obj);
    }
//    if(status == ""){
//        var url = 'POST /repos/worktest-hc2023/app-test/check-runs';
//        await octokit.request(url, {
//            owner: 'worktest-hc2023',
//            repo: 'app-test',
//            name: 'Jenkins Tests Report',
//            head_sha: commitID,
//            status: 'in_progress',
//            output: {
//                title: 'Jenkins checks in progress',
//                summary: message,
//                text: ''
//              },
//            headers: {
//                'X-GitHub-Api-Version': '2022-11-28'
//            }
//        });
//    } else {
//        var url = 'PATCH /repos/worktest-hc2023/app-test/check-runs/' + checkrun_id;
//        await octokit.request(url, {
//          owner: 'worktest-hc2023',
//          repo: 'app-test',
//          name: 'Jenkins Tests Report',
//          head_sha: commitID,
//          status: status,
//          conclusion: con,
//          output: {
//            title: 'Mocha Tests Report',
//            summary: message,
//          },
//          headers: {
//            'X-GitHub-Api-Version': '2022-11-28'
//          }
//        })
//    }

}


completedGitHubCheckRun(process.argv[2], process.argv[3], process.argv[4], process.argv[5], process.argv[6], process.argv[7], process.argv[8], process.argv[9]);
//completedGitHubCheckRun(process.env.GITHUB_APP_ID, (process.env.GITHUB_PEM ?? '').replaceAll(/\\n/g, '\n'), process.env.GITHUB_INSTALLATION_ID, '95f0a41acdcdf71cfee23cbc746883e3f0ac2eb0');

