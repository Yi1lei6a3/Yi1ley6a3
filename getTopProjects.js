const { Octokit } = require('@octokit/rest');
const fs = require('fs');

const octokit = new Octokit();

async function getTopProjects(username) {
  try {
    const reposResponse = await octokit.repos.listForUser({
      username,
    });

    const repos = reposResponse.data;

    // Сортируем репозитории по количеству коммитов
    repos.sort((a, b) => b.commits - a.commits);

    // Выбираем два проекта с наибольшим количеством коммитов
    const topProjects = repos.slice(0, 2);

    // Записываем информацию о проектах в файл readme.md
    let content = '# Top Projects\n\n';
    topProjects.forEach((project, index) => {
      content += `## Project ${index + 1}\n\n`;
      content += `- Name: ${project.name}\n`;
      content += `- Commits: ${project.commits}\n`;
      content += `- URL: ${project.html_url}\n\n`;
    });

    fs.writeFileSync('readme.md', content, 'utf-8');

    console.log('readme.md created successfully.');
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Укажите свой GitHub username
const username = 'Yi1ley6a3';

// Вызываем функцию с указанным username
getTopProjects(username);
