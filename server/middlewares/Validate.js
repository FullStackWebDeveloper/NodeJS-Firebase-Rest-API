import { check } from 'express-validator';

/**
 * @export
 * @class Validate
 */
class Validate {
  /**
   * Validate input
   * @static
   * @returns {object} errors
   */

  static userManage() {
    return [
      check('id', 'id should be valid').exists(),
    ];
  }
}
export default Validate;
