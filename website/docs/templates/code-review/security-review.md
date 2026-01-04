---
sidebar_position: 1
---

# Security Review Template

## Purpose
This template helps conduct security-focused code reviews, identifying potential vulnerabilities, security anti-patterns, and areas requiring hardening.

**When to use:** Before merging code that handles user input, authentication, authorization, data persistence, or external API interactions.

**Canonical source:** [templates/code-review/security-review.md](https://github.com/oneredstar/github-copilot-prompt-templates/blob/main/templates/code-review/security-review.md)

## Inputs
- File path or code snippet to review
- Programming language (optional, for language-specific checks)
- Specific security concerns to focus on (optional)

## Output
Copilot will provide:
- List of identified security vulnerabilities or concerns
- Explanation of each issue and potential impact
- Specific remediation suggestions with code examples
- Best practices recommendations

## Example Usage

```
@workspace Review the file src/auth/login.js for security vulnerabilities. 
Pay special attention to:
- Input validation and sanitization
- SQL injection risks
- Authentication bypass possibilities
- Session management
- Error handling that might leak sensitive information
```

## Variations

### Quick Security Scan
```
Scan this code for common security issues: [paste code]
```

### Focused Security Review
```
Review this authentication function for timing attacks and credential handling: [paste code]
```

### Compliance Check
```
Review this data handling code for GDPR compliance, focusing on data minimization 
and secure storage: [paste code]
```

## Safety Notes
- Security reviews by AI should complement, not replace, professional security audits
- Always verify suggestions in the context of your specific security requirements
- Consider running additional automated security scanning tools
- For production systems handling sensitive data, engage security professionals
