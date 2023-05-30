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
    console.log("here");
    console.log(appAuthentication);

    return new Octokit({
        auth: appAuthentication,
    })
}

//in progress check run function
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
async function completedGitHubCheckRun(app_id, pem, install_id, commitID, con, message){
    const app = new App({
        appId: app_id,
        privateKey: (pem ?? '').replaceAll(/\\n/g, '\n'),
    });
    const octokit = await app.getInstallationOctokit(install_id);
    var url = 'POST /repos/worktest-hc2023/app-test/check-runs';

    if(con == ""){
        await octokit.request(url, {
            owner: 'worktest-hc2023',
            repo: 'app-test',
            name: 'Jenkins Tests Report',
            head_sha: commitID,
            status: 'in_progress',
            output: {
                title: 'Jenkins checks in progress',
                summary: '',
                text: ''
              },
            headers: {
                'X-GitHub-Api-Version': '2022-11-28'
            }
        });
    } else {
        await octokit.request(url, {
          owner: 'worktest-hc2023',
          repo: 'app-test',
          name: 'Jenkins Tests Report',
          head_sha: commitID,
          status: 'completed',
          conclusion: con,
          output: {
            title: 'Mocha Tests Report',
            summary: message,
          },
          headers: {
            'X-GitHub-Api-Version': '2022-11-28'
          }
        })
    }

}


completedGitHubCheckRun(process.argv[2], process.argv[3], process.argv[4], process.argv[5], process.argv[6], process.argv[7]);
//githubCheckRun(process.argv[4]); //for jenkins maybe?
//githubCheckRun('Name', '2c6701db535928210458ed3c27a59c67279818e1', 'in_progress', {title: 'Test Report', summary: '', text: ''});
//completedGitHubCheckRun(process.env.GITHUB_APP_ID, (process.env.GITHUB_PEM ?? '').replaceAll(/\\n/g, '\n'), process.env.GITHUB_INSTALLATION_ID, '95f0a41acdcdf71cfee23cbc746883e3f0ac2eb0');

