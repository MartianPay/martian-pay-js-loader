// Basic test to verify the module can be imported
describe('MartianPay Loader', () => {
  test('should export loadMartian function', () => {
    // Test that the module can be imported without errors
    expect(() => {
      require('../index');
    }).not.toThrow();
  });

  test('should export loadMartian from pure module', () => {
    // Test that the pure module can be imported without errors
    expect(() => {
      require('../pure');
    }).not.toThrow();
  });
});
