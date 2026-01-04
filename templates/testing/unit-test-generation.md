# Unit Test Generation Template

## Purpose
Generate comprehensive unit tests for a given function, method, or class with good coverage of edge cases, error conditions, and expected behaviors.

**When to use:** When writing tests for new code or improving test coverage for existing code.

## Inputs
- Code to test (function, method, or class)
- Testing framework being used (e.g., Jest, pytest, JUnit)
- Specific scenarios to test (optional)
- Coverage requirements (optional)

## Output
Copilot will provide:
- Complete unit test suite with multiple test cases
- Tests for happy paths and edge cases
- Tests for error conditions and input validation
- Appropriate mocking and test data setup
- Clear test descriptions and assertions

## Example Usage

```
Generate comprehensive unit tests for this function using Jest:

function calculateDiscount(price, discountPercent, userType) {
  if (price <= 0) throw new Error('Price must be positive');
  if (discountPercent < 0 || discountPercent > 100) {
    throw new Error('Discount must be between 0 and 100');
  }
  
  let discount = (price * discountPercent) / 100;
  if (userType === 'premium') {
    discount *= 1.2; // 20% bonus for premium users
  }
  
  return Math.max(0, price - discount);
}

Include tests for:
- Valid inputs with various discount percentages
- Premium vs regular users
- Edge cases (0%, 100% discount)
- Invalid inputs (negative price, invalid discount)
- Boundary conditions
```

## Variations

### Quick Test Generation
```
Create basic unit tests for this function: [paste code]
```

### Test-Driven Development (TDD)
```
I need to implement a function that [describe behavior]. 
Write the unit tests first following TDD principles.
```

### Expand Existing Tests
```
Here are my current tests: [paste tests]
Add more test cases to cover edge cases and improve coverage.
```

## Safety Notes
- Review generated tests to ensure they match your actual requirements
- Verify that mocked dependencies accurately reflect real behavior
- Check that assertions are meaningful and test the right things
- Consider if additional integration tests are needed beyond unit tests
