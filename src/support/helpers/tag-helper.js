/**
 * TagHelper provides functionality to work with Cucumber tags
 */
class TagHelper {
  /**
   * Extract tag values from scenario tags
   * @param {Object} scenario - Cucumber scenario object
   * @param {string} tagName - Tag name to search for
   * @returns {string[]} Array of tag values
   * 
   * Example:
   * If scenario has tags @device:mobile @device:tablet
   * TagHelper.getTagValues(scenario, 'device') will return ['mobile', 'tablet']
   */
  static getTagValues(scenario, tagName) {
    const tagRegex = new RegExp(`^@${tagName}:(.+)$`);
    const values = [];
    
    // Check for tags on scenario
    if (scenario && scenario.tags) {
      scenario.tags.forEach(tag => {
        const match = tag.name.match(tagRegex);
        if (match && match[1]) {
          values.push(match[1]);
        }
      });
    }
    
    return values;
  }

  /**
   * Check if scenario has a specific tag
   * @param {Object} scenario - Cucumber scenario object
   * @param {string} tagName - Tag name to search for
   * @returns {boolean} True if scenario has tag
   */
  static hasTag(scenario, tagName) {
    if (!scenario || !scenario.tags) return false;
    
    return scenario.tags.some(tag => tag.name === `@${tagName}`);
  }

  /**
   * Check if scenario has any of the provided tags
   * @param {Object} scenario - Cucumber scenario object
   * @param {string[]} tagNames - Array of tag names to search for
   * @returns {boolean} True if scenario has any of the tags
   */
  static hasAnyTag(scenario, tagNames) {
    if (!scenario || !scenario.tags) return false;
    
    return scenario.tags.some(tag => {
      return tagNames.some(tagName => tag.name === `@${tagName}`);
    });
  }

  /**
   * Check if scenario has all of the provided tags
   * @param {Object} scenario - Cucumber scenario object
   * @param {string[]} tagNames - Array of tag names to search for
   * @returns {boolean} True if scenario has all of the tags
   */
  static hasAllTags(scenario, tagNames) {
    if (!scenario || !scenario.tags) return false;
    
    return tagNames.every(tagName => {
      return scenario.tags.some(tag => tag.name === `@${tagName}`);
    });
  }
}

module.exports = TagHelper;
