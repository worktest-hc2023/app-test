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
async function completedGitHubCheckRun(app_id, pem, install_id, commitID, stat){
    const app = new App({
        appId: app_id,
        privateKey: (pem ?? '').replaceAll(/\\n/g, '\n'),
    });
    const octokit = await app.getInstallationOctokit(install_id);
    var url = 'POST /repos/worktest-hc2023/app-test/check-runs';

    await octokit.request(url, {
      owner: 'worktest-hc2023',
      repo: 'app-test',
      name: 'npm-test reports',
      head_sha: commitID,
      status: 'completed',
      conclusion: stat,
      output: {
        title: 'Mighty Readme report',
        summary: 'There are 0 failures, 2 warnings, and 1 notices.',
        text: 'You may have some misspelled words on lines 2 and 4. You also may want to add a section in your README about how to install your app.',
        annotations: [
          {
            path: 'README.md',
            annotation_level: 'warning',
            title: 'Spell Checker',
            message: 'Check your spelling for \'banaas\'.',
            raw_details: 'Do you mean \'bananas\' or \'banana\'?',
            start_line: 2,
            end_line: 2
          },
          {
            path: 'README.md',
            annotation_level: 'warning',
            title: 'Spell Checker',
            message: 'Check your spelling for \'aples\'',
            raw_details: 'Do you mean \'apples\' or \'Naples\'',
            start_line: 4,
            end_line: 4
          }
        ],
      },
      actions: [
        {
          label: 'Fix',
          identifier: 'fix_errors',
          description: 'Allow us to fix these errors for you'
        }
      ],
      headers: {
        'X-GitHub-Api-Version': '2022-11-28'
      }
    })

}


completedGitHubCheckRun(process.argv[2], process.argv[3], process.argv[4], process.argv[5], process.argv[6]);
//githubCheckRun(process.argv[4]); //for jenkins maybe?
//githubCheckRun('Name', '2c6701db535928210458ed3c27a59c67279818e1', 'in_progress', {title: 'Test Report', summary: '', text: ''});
//completedGitHubCheckRun(process.env.GITHUB_APP_ID, (process.env.GITHUB_PEM ?? '').replaceAll(/\\n/g, '\n'), process.env.GITHUB_INSTALLATION_ID, '95f0a41acdcdf71cfee23cbc746883e3f0ac2eb0');

