const { Octokit } = require("@octokit/rest");
const openai = require("openai");

// Set up environment variables
const openaiApiKey = process.env.OPEN_AI_KEY;
const githubToken = process.env.GITHUB_TOKEN;
const repoName = process.env.GITHUB_REPOSITORY;
const prNumber = process.env.GITHUB_REF.split("/").pop();

// Initialize GitHub and OpenAI clients
const octokit = new Octokit({ auth: githubToken });
openai.apiKey = openaiApiKey;

// Fetch the pull request diff
async function getPullRequestDiff() {
  const [owner, repo] = repoName.split("/");
  const { data } = await octokit.pulls.get({
    owner,
    repo,
    pull_number: prNumber,
    mediaType: {
      format: "diff",
    },
  });
  return data;
}

// Review the code diff using ChatGPT
async function reviewCodeWithChatGPT(diff) {
  const response = await openai.ChatCompletion.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "user",
        content: `Please review the following code diff and provide constructive feedback:\n\n${diff}`,
      },
    ],
  });
  return response.choices[0].message.content;
}

// Post the review as a comment on the pull request
async function postReviewComment(review) {
  const [owner, repo] = repoName.split("/");
  await octokit.issues.createComment({
    owner,
    repo,
    issue_number: prNumber,
    body: review,
  });
}

// Main function
(async function main() {
  try {
    const diff = await getPullRequestDiff();
    const review = await reviewCodeWithChatGPT(diff);
    await postReviewComment(review);
    console.log("Review posted successfully!");
  } catch (error) {
    console.error("Error in ChatGPT review:", error);
  }
})();
