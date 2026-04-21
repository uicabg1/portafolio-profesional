import test from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = fileURLToPath(new URL('..', import.meta.url));
const publicDir = join(repoRoot, 'public');
const projectsDir = join(repoRoot, 'src/content/projects');

function assertPublicAssetExistsAndIsTracked(publicPath, context = publicPath) {
  assert.match(publicPath, /^\//, `${context} must be an absolute public URL path`);

  const assetPath = join(publicDir, publicPath.slice(1));
  const relativeAssetPath = relative(repoRoot, assetPath);

  assert.equal(existsSync(assetPath), true, `${context} must exist at ${relativeAssetPath}`);
  assert.doesNotThrow(
    () => {
      execFileSync('git', ['ls-files', '--error-unmatch', relativeAssetPath], {
        cwd: repoRoot,
        stdio: 'pipe',
      });
    },
    `${context} must be tracked by Git so GitHub Actions can deploy ${relativeAssetPath}`,
  );
}

function getProjectOgImages() {
  if (!existsSync(projectsDir)) {
    return [];
  }

  return readdirSync(projectsDir)
    .filter((fileName) => fileName.endsWith('.mdx'))
    .flatMap((fileName) => {
      const filePath = join(projectsDir, fileName);
      const content = readFileSync(filePath, 'utf8');
      const match = content.match(/^ogImage:\s*["']([^"']+)["']/m);

      return match ? [{ source: relative(repoRoot, filePath), publicPath: match[1] }] : [];
    });
}

test('Open Graph assets referenced by the site are available to CI deploys', () => {
  assertPublicAssetExistsAndIsTracked('/og/default.svg');

  for (const { source, publicPath } of getProjectOgImages()) {
    assertPublicAssetExistsAndIsTracked(publicPath, `${source} references ${publicPath}`);
  }
});
