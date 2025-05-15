const fs = require('fs');
const path = require('path');

/**
 * FileHelper provides methods for file operations
 */
class FileHelper {
  /**
   * Check if file exists
   * @param {string} filePath - File path
   * @returns {boolean} True if file exists
   */
  static fileExists(filePath) {
    return fs.existsSync(filePath);
  }

  /**
   * Create directory if it doesn't exist
   * @param {string} dirPath - Directory path
   */
  static createDirectoryIfNotExists(dirPath) {
    if (!this.fileExists(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
  }

  /**
   * Read JSON file
   * @param {string} filePath - File path
   * @returns {Object} Parsed JSON
   */
  static readJsonFile(filePath) {
    if (!this.fileExists(filePath)) {
      throw new Error(`File not found: ${filePath}`);
    }
    const fileContent = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContent);
  }

  /**
   * Write JSON file
   * @param {string} filePath - File path
   * @param {Object} data - Data to write
   */
  static writeJsonFile(filePath, data) {
    // Create parent directory if it doesn't exist
    const dir = path.dirname(filePath);
    this.createDirectoryIfNotExists(dir);
    
    // Write file
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  }

  /**
   * Read text file
   * @param {string} filePath - File path
   * @returns {string} File content
   */
  static readTextFile(filePath) {
    if (!this.fileExists(filePath)) {
      throw new Error(`File not found: ${filePath}`);
    }
    return fs.readFileSync(filePath, 'utf8');
  }

  /**
   * Write text file
   * @param {string} filePath - File path
   * @param {string} content - Content to write
   */
  static writeTextFile(filePath, content) {
    // Create parent directory if it doesn't exist
    const dir = path.dirname(filePath);
    this.createDirectoryIfNotExists(dir);
    
    // Write file
    fs.writeFileSync(filePath, content);
  }

  /**
   * Delete file
   * @param {string} filePath - File path
   */
  static deleteFile(filePath) {
    if (this.fileExists(filePath)) {
      fs.unlinkSync(filePath);
    }
  }

  /**
   * Clear directory
   * @param {string} dirPath - Directory path
   */
  static clearDirectory(dirPath) {
    if (this.fileExists(dirPath)) {
      fs.readdirSync(dirPath).forEach(file => {
        const curPath = path.join(dirPath, file);
        if (fs.lstatSync(curPath).isDirectory()) {
          // Recursive deletion
          this.clearDirectory(curPath);
          fs.rmdirSync(curPath);
        } else {
          // Delete file
          fs.unlinkSync(curPath);
        }
      });
    }
  }
}

module.exports = FileHelper;
