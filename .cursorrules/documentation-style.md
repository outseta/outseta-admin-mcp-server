# Outseta Admin MCP Server - Cursor Rules

## Documentation Style Guide

When writing documentation, README files, commit messages, or technical descriptions for this project:

### Tone and Language

- Use direct, factual language that explains what something does
- Avoid marketing superlatives like "seamlessly", "powerful", "amazing", "effortless", "unleashes", "empowers"
- Choose "integrates with" over "seamlessly integrates with"
- Choose "enables" over "unleashes" or "empowers"
- Choose "works with" over "perfectly works with"
- Choose "handles" over "effortlessly handles"

### Structure

- Lead with what the tool/feature does, not how great it is
- Explain benefits clearly but without hype
- Use active voice and clear, straightforward sentences
- Focus on functionality and practical value
- Strike a balance between being informative about benefits while staying factual and professional

### Examples

✅ **Good:**

- "This server integrates with MCP-compatible AI assistants to enable natural language management"
- "The AI assistant will automatically select appropriate tools and handle validation"
- "Creates a new plan with the specified parameters"
- "Returns paginated results with filtering support"

❌ **Avoid:**

- "This server seamlessly integrates with MCP-compatible AI assistants, unleashing powerful capabilities"
- "The AI assistant will intelligently and effortlessly select the perfect tools"
- "Effortlessly creates amazing new plans with powerful features"
- "Returns beautifully paginated results with incredible filtering support"

### Code Comments

- Explain what the code does and why, not how clever it is
- Focus on business logic and API requirements
- Use clear, concise explanations

### Tool Descriptions

- Start with the action: "Get accounts", "Create person", "Update subscription"
- Include practical details about pagination, filtering, confirmation requirements
- Avoid adjectives that don't add functional information

## Code Style

### API Transformations

- Always document camelCase → PascalCase transformations clearly
- Use descriptive variable names that explain the transformation purpose
- Comment on any non-obvious field mappings

### Error Handling

- Use clear, actionable error messages
- Avoid technical jargon when user-facing
- Include relevant context for debugging

### Schema Definitions

- Write clear, helpful descriptions for all schema fields
- Explain constraints and validation rules
- Use examples when helpful for understanding

## Commit Messages

- Use imperative mood: "Add email list tools", "Fix subscription validation"
- Be specific about what changed
- Avoid marketing language in commit messages
