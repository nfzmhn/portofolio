import { readdir, stat, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import sharp from 'sharp';

const DESIGN_DIR = 'dist/design';
const QUALITY = 78;

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(path);
    else yield path;
  }
}

async function optimize() {
  let totalBefore = 0;
  let totalAfter = 0;
  let count = 0;

  try {
    await stat(DESIGN_DIR);
  } catch {
    console.log(`[optimize-design] ${DESIGN_DIR} not found, skipping`);
    return;
  }

  for await (const file of walk(DESIGN_DIR)) {
    if (!file.toLowerCase().endsWith('.png')) continue;
    const before = (await stat(file)).size;
    const buf = await sharp(file)
      .png({ quality: QUALITY, compressionLevel: 9, palette: true })
      .toBuffer();
    const after = buf.length;
    const name = file.split(/[\\/]/).pop();
    if (after >= before) {
      console.log(
        `[optimize-design] ${name} ${(before / 1024).toFixed(0)}KB → ${(after / 1024).toFixed(0)}KB (skipped: no gain)`
      );
      continue;
    }
    await writeFile(file, buf);
    totalBefore += before;
    totalAfter += after;
    count++;
    const pct = (((after - before) / before) * 100).toFixed(1);
    console.log(
      `[optimize-design] ${name} ${(before / 1024).toFixed(0)}KB → ${(after / 1024).toFixed(0)}KB (${pct}%)`
    );
  }

  if (count > 0) {
    const saved = totalBefore - totalAfter;
    const pct = ((saved / totalBefore) * 100).toFixed(1);
    console.log(
      `[optimize-design] done: ${count} files optimized, ${(totalBefore / 1024 / 1024).toFixed(1)}MB → ${(totalAfter / 1024 / 1024).toFixed(1)}MB (saved ${(saved / 1024 / 1024).toFixed(1)}MB / ${pct}%)`
    );
  } else {
    console.log('[optimize-design] no files optimized');
  }
}

optimize().catch((err) => {
  console.error('[optimize-design] failed:', err);
  process.exit(1);
});
