const path = require('node:path');
const os = require('node:os');
const fs = require('fs-extra');
const prompts = require('./prompts');

/**
 * Directory picker utilities for the installer
 * Extracted to simplify merge conflicts and maintain custom directory listing feature
 */

/**
 * Get list of project directories from ~/projects
 * @returns {Promise<Array>} Array of { name, value } choices
 */
async function getProjectDirectories() {
  const projectsDir = path.join(os.homedir(), 'projects');
  const projectChoices = [];

  try {
    if (await fs.pathExists(projectsDir)) {
      const entries = await fs.readdir(projectsDir, { withFileTypes: true });
      for (const entry of entries) {
        if (entry.isDirectory() && !entry.name.startsWith('.')) {
          const fullPath = path.join(projectsDir, entry.name);
          projectChoices.push({
            label: fullPath,
            value: fullPath,
          });
        }
      }
      // Sort alphabetically
      projectChoices.sort((a, b) => a.label.localeCompare(b.label));
    }
  } catch {
    // Ignore errors reading ~/projects - will just show manual input
  }

  return projectChoices;
}

/**
 * Build directory selection choices with ~/projects directories
 * @returns {Promise<Array>} Array of choices for select prompt
 */
async function buildDirectoryChoices() {
  const projectChoices = await getProjectDirectories();
  const choices = [];
  const cwd = process.cwd();
  const projectsDir = path.join(os.homedir(), 'projects');

  // Add current directory as first option if it's not in ~/projects
  if (!cwd.startsWith(projectsDir)) {
    choices.push({
      label: `${cwd} (current directory)`,
      value: cwd,
    });
  }

  // Add project directories if any exist
  if (projectChoices.length > 0) {
    // Add a visual separator label
    choices.push(
      {
        label: '── ~/projects ──',
        value: '__SEPARATOR_PROJECTS__',
        hint: 'separator',
      },
      ...projectChoices,
    );
  }

  // Add manual entry option at the end
  choices.push(
    {
      label: '──────────────────',
      value: '__SEPARATOR_END__',
      hint: 'separator',
    },
    {
      label: 'Enter a different path...',
      value: '__MANUAL_ENTRY__',
    },
  );

  return choices;
}

/**
 * Prompt for directory selection with ~/projects listing
 * @param {Object} ui - UI instance for validation and path expansion
 * @returns {Promise<Object>} Object with directory property
 */
async function promptForDirectoryWithPicker(ui) {
  const choices = await buildDirectoryChoices();

  // Filter out separators for the actual select (they're just visual labels)
  const selectableChoices = choices.filter((c) => !c.value.startsWith('__SEPARATOR'));

  const selectedDir = await prompts.select({
    message: 'Installation directory:',
    choices: selectableChoices,
  });

  // If user chose manual entry, prompt for the path
  if (selectedDir === '__MANUAL_ENTRY__') {
    const directory = await prompts.text({
      message: 'Enter installation directory:',
      placeholder: process.cwd(),
      validate: (input) => ui.validateDirectorySync(input),
    });

    // Apply filter logic
    let filteredDir = directory;
    if (!filteredDir || filteredDir.trim() === '') {
      filteredDir = process.cwd();
    } else {
      filteredDir = ui.expandUserPath(filteredDir);
    }

    return { directory: filteredDir };
  }

  return { directory: selectedDir };
}

module.exports = {
  getProjectDirectories,
  buildDirectoryChoices,
  promptForDirectoryWithPicker,
};
