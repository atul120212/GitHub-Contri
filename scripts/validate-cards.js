#!/usr/bin/env node

/**
 * Contributor Card Validator
 * Ensures all cards conform to schema/card.schema.json and repository contribution guidelines.
 */

const fs = require('fs');
const path = require('path');

const SCHEMA_PATH = path.join(__dirname, '..', 'schema', 'card.schema.json');
const CARDS_DIR = path.join(__dirname, '..', 'cards');

function logSuccess(msg) {
  console.log(`\x1b[32m✔\x1b[0m ${msg}`);
}

function logError(msg) {
  console.error(`\x1b[31m✖\x1b[0m ${msg}`);
}

function validateCardData(data, filename, schema) {
  const errors = [];
  const baseName = path.basename(filename, '.json');

  // Check required fields
  for (const field of schema.required) {
    if (data[field] === undefined || data[field] === null || data[field] === '') {
      errors.push(`Missing required field: "${field}"`);
    }
  }

  // Check for unexpected extra properties
  if (schema.additionalProperties === false) {
    const allowed = Object.keys(schema.properties);
    for (const key of Object.keys(data)) {
      if (!allowed.includes(key)) {
        errors.push(`Forbidden field "${key}" found. Only allowed: ${allowed.join(', ')}`);
      }
    }
  }

  // Name check
  if (data.name) {
    if (typeof data.name !== 'string') errors.push('Field "name" must be a string');
    else if (data.name.length < schema.properties.name.minLength || data.name.length > schema.properties.name.maxLength) {
      errors.push(`"name" must be between ${schema.properties.name.minLength} and ${schema.properties.name.maxLength} characters`);
    }
  }

  // GitHub username check
  if (data.github) {
    if (typeof data.github !== 'string') {
      errors.push('Field "github" must be a string');
    } else {
      const regex = new RegExp(schema.properties.github.pattern);
      if (!regex.test(data.github)) {
        errors.push(`"github" must be a valid GitHub username matching ${schema.properties.github.pattern}`);
      }
      // Rule: Filename must match the github field
      if (baseName.toLowerCase() !== data.github.toLowerCase()) {
        errors.push(`Filename mismatch: cards/${filename} must be named cards/${data.github}.json`);
      }
    }
  }

  // Avatar check
  if (data.avatar) {
    if (typeof data.avatar !== 'string') errors.push('Field "avatar" must be a string URL');
    else if (!/^https?:\/\/.+/.test(data.avatar)) {
      errors.push('"avatar" must be a valid http or https URL');
    }
  }

  // Bio check
  if (data.bio) {
    if (typeof data.bio !== 'string') errors.push('Field "bio" must be a string');
    else if (data.bio.length < schema.properties.bio.minLength || data.bio.length > schema.properties.bio.maxLength) {
      errors.push(`"bio" length must be between ${schema.properties.bio.minLength} and ${schema.properties.bio.maxLength} characters (current: ${data.bio.length})`);
    }
  }

  // Skills check
  if (data.skills) {
    if (!Array.isArray(data.skills)) {
      errors.push('"skills" must be an array of strings');
    } else {
      if (data.skills.length < schema.properties.skills.minItems || data.skills.length > schema.properties.skills.maxItems) {
        errors.push(`"skills" array must contain between ${schema.properties.skills.minItems} and ${schema.properties.skills.maxItems} items (got ${data.skills.length})`);
      }
      data.skills.forEach((skill, idx) => {
        if (typeof skill !== 'string' || skill.trim().length === 0 || skill.length > 30) {
          errors.push(`skill[${idx}] must be a non-empty string under 30 characters`);
        }
      });
      // Check uniqueness
      const uniqueSkills = new Set(data.skills.map(s => s.toLowerCase()));
      if (uniqueSkills.size !== data.skills.length) {
        errors.push('skills array contains duplicate entries');
      }
    }
  }

  // Links check
  if (data.links) {
    if (typeof data.links !== 'object' || Array.isArray(data.links)) {
      errors.push('"links" must be an object');
    } else {
      const allowedLinks = Object.keys(schema.properties.links.properties);
      for (const [key, url] of Object.entries(data.links)) {
        if (!allowedLinks.includes(key)) {
          errors.push(`Invalid link key "${key}". Allowed: ${allowedLinks.join(', ')}`);
        } else if (typeof url !== 'string' || !/^https?:\/\/.+/.test(url)) {
          errors.push(`Link "${key}" must be a valid HTTPS URL (got: ${url})`);
        }
      }
    }
  }

  // Joined date check
  if (data.joinedDate) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(data.joinedDate)) {
      errors.push('"joinedDate" must be formatted as YYYY-MM-DD');
    }
  }

  return errors;
}

function runValidation() {
  console.log('\n🔍 Contributor Card Validation Starting...\n');

  if (!fs.existsSync(SCHEMA_PATH)) {
    logError(`Schema file not found at ${SCHEMA_PATH}`);
    process.exit(1);
  }

  const schema = JSON.parse(fs.readFileSync(SCHEMA_PATH, 'utf-8'));
  const files = fs.readdirSync(CARDS_DIR).filter(f => f.endsWith('.json'));

  if (files.length === 0) {
    logError('No card JSON files found in cards/ directory.');
    process.exit(1);
  }

  let totalErrors = 0;
  const usernames = new Set();

  for (const file of files) {
    const filePath = path.join(CARDS_DIR, file);
    let cardData;

    try {
      const raw = fs.readFileSync(filePath, 'utf-8');
      cardData = JSON.parse(raw);
    } catch (e) {
      logError(`${file}: Invalid JSON syntax - ${e.message}`);
      totalErrors++;
      continue;
    }

    const errors = validateCardData(cardData, file, schema);

    // Duplicate username check across all files
    if (cardData.github) {
      const lower = cardData.github.toLowerCase();
      if (usernames.has(lower)) {
        errors.push(`Duplicate contributor GitHub username "${cardData.github}" already exists in another card!`);
      } else {
        usernames.add(lower);
      }
    }

    if (errors.length > 0) {
      logError(`cards/${file}:`);
      errors.forEach(err => console.error(`    ↳ ${err}`));
      totalErrors += errors.length;
    } else {
      logSuccess(`cards/${file} (${cardData.name} - @${cardData.github}) passed validation.`);
    }
  }

  console.log('\n----------------------------------------');
  if (totalErrors > 0) {
    logError(`Validation FAILED with ${totalErrors} error(s). Please fix before submitting PR.`);
    process.exit(1);
  } else {
    logSuccess(`All ${files.length} contributor card(s) passed validation cleanly! 🎉\n`);
  }
}

runValidation();
