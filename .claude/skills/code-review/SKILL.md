# Code Review Skill

## Review Checklist

### Correctness
- [ ] Logic matches the specification
- [ ] Edge cases are handled
- [ ] No off-by-one errors
- [ ] Async operations handled properly (await, error handling)

### Code Quality
- [ ] Naming follows conventions (coding.md)
- [ ] No unnecessary complexity
- [ ] No code duplication
- [ ] Functions are focused (single responsibility)
- [ ] Files are appropriately sized (<300 lines)

### Security
- [ ] No hardcoded secrets
- [ ] Inputs are validated
- [ ] No SQL/XSS/CSRF vulnerabilities
- [ ] Sensitive data is not logged

### Architecture
- [ ] Correct layer placement (UI/Logic/Data)
- [ ] No inappropriate dependencies between layers
- [ ] New code follows existing patterns

### Tests
- [ ] New features have tests
- [ ] Tests are meaningful (not just coverage for coverage's sake)
- [ ] Existing tests still pass

## Severity Levels
- 🔴 **Critical**: Must fix before merge (security issues, data loss, crashes)
- 🟡 **Warning**: Should fix (bugs, bad patterns, maintainability issues)
- 🔵 **Info**: Optional improvement (style, minor optimization)
