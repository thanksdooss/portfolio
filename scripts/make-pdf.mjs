// 제출용 PDF 요약본 생성: 빌드 → 미리보기 서버 → Chrome 헤드리스로 #/print 화면을 A4 PDF로 인쇄.
// 결과물은 public/ 에 저장되어 다음 빌드부터 사이트에서 내려받을 수 있다.
// 사용: npm run pdf  (트랙 지정: VITE_TRACK=sales npm run pdf → 파일명에 -sales 붙음)
import { build, preview } from 'vite'
import { execFile } from 'node:child_process'
import { promisify } from 'node:util'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { existsSync } from 'node:fs'

const chrome = process.env.CHROME_PATH || [
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
].find(existsSync)
if (!chrome) throw new Error('Chrome을 찾을 수 없습니다. CHROME_PATH를 지정하세요.')

const track = process.env.VITE_TRACK
const out = `public/kim-jinnyeong-portfolio${track && track !== 'dt' ? '-' + track : ''}.pdf`

await build({ logLevel: 'warn' })
const server = await preview({ preview: { port: 4179, strictPort: true } })
try {
  // 같은 프로세스의 미리보기 서버가 응답해야 하므로 비동기로 실행한다.
  await promisify(execFile)(chrome, [
    '--headless=new', '--disable-gpu', '--no-first-run', '--no-pdf-header-footer',
    `--user-data-dir=${join(tmpdir(), 'portfolio-pdf-chrome')}`,
    '--run-all-compositor-stages-before-draw', '--virtual-time-budget=8000',
    `--print-to-pdf=${out}`, 'http://localhost:4179/portfolio/#/print',
  ], { timeout: 90000 })
  console.log('PDF 생성:', out)
} finally {
  server.httpServer.close()
}
