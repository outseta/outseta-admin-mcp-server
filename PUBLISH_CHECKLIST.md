# NPM Publication Checklist

### Step 1: Verify Organization Access

```bash
# Check if you're logged into npm
npm whoami

# Check organization membership
npm org ls @outseta
```

### Step 2: Final Testing

```bash
# Build the package
npm run build

# Create a tarball to test
npm pack

# Install locally to test
npm install -g @outseta-admin-mcp-server-<version>.tgz

# Test the command
outseta-admin-mcp --help
```

### Step 3: Version Management

```bash
# For patch version (bug fixes)
npm version patch

# For minor version (new features)
npm version minor

# For major version (breaking changes)
npm version major
```

### Step 4: Publish

```bash
# Dry run to see what would be published
npm publish --dry-run

# Actual publish
npm publish

# Or publish to a specific tag
npm publish --tag <tag>

# Such as beta
npm publish --tag beta
```

### Step 5: Post-Publication Verification

```bash
# Install from npm to test
npx @outseta/admin-mcp-server

# Check npm page
open https://www.npmjs.com/package/@outseta/admin-mcp-server
```

## Organization Requirements

### @outseta Organization Access

- Must be a member of the @outseta npm organization
- Organization admin needs to add you if not already a member
- Package must be scoped to @outseta
- publishConfig.access must be "public" for scoped packages

### Contact for Access

If you don't have access to the @outseta organization:

1. Contact the Outseta team
2. Request to be added as a member or maintainer
3. Provide your npm username

## Troubleshooting

### Common Issues

- **403 Forbidden**: Not a member of @outseta organization
- **Package name already exists**: The @outseta/admin-mcp-server name might be taken
- **Build failures**: Ensure TypeScript compiles without errors
- **Permission errors**: Check that build/index.js has execute permissions

### Alternative Names

If @outseta/admin-mcp-server is taken, consider:

- @outseta/mcp-admin-server
- @outseta/admin-mcp
- @outseta/mcp-server

## Success Criteria

- [ ] Package published successfully to npm
- [ ] `npx @outseta/admin-mcp-server` works from any directory
- [ ] MCP clients can use the package with npx
- [ ] README instructions are accurate
- [ ] Package appears in npm search results
