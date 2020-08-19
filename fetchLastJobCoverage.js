const https = require("https");

const GITLAB_API_TOKEN = process.env.GITLAB_API_TOKEN;
const CI_PROJECT_ID = process.env.CI_PROJECT_ID;
const CI_JOB_NAME = process.env.CI_JOB_NAME;

const DEFAULT_COVERAGE = 80.0;
const hostname = "gitlab.dynamic.nsn-net.net";

const fetchJobs = () =>
  new Promise((resolve, reject) => {
    const options = {
      hostname,
      port: 443,
      path: `/api/v4/projects/${CI_PROJECT_ID}/jobs/?per_page=100`,
      headers: {
        "PRIVATE-TOKEN": GITLAB_API_TOKEN,
      },
    };

    https
      .get(options, (res) => {
        let data = "";

        res.on("data", (chunk) => (data += chunk));

        res.on("end", () => {
          try {
            const result = JSON.parse(data);
            resolve(result);
          } catch (error) {
            reject(error);
          }
        });

        res.on("error", (error) => reject(error));
      })
      .on("error", (error) => reject(error));
  });

fetchJobs()
  .then((jobs) => {
    let coverage = DEFAULT_COVERAGE;

    for (const job of jobs) {
      if (
        job.name === CI_JOB_NAME &&
        job.status === "success" &&
        job.coverage != null
      ) {
        coverage = job.coverage;
        break;
      }
    }

    console.log(coverage);
  })
  .catch(() => process.exit(1));
