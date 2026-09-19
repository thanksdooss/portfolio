// 이 폴더의 *.js 파일(각 프로젝트 1개)을 자동으로 모은다.
// 새 프로젝트는 _template.js를 복사해 파일 하나만 추가하면 된다.
// status: 'draft'인 프로젝트는 사이트에 나오지 않는다.
const modules = import.meta.glob(['./*.js', '!./index.js', '!./_*.js'], { eager: true, import: 'default' })

export const allProjects = Object.values(modules).sort((a, b) => (b.sort ?? 0) - (a.sort ?? 0))
export const publishedProjects = allProjects.filter((p) => p.status !== 'draft')

export function getProject(id) {
  return publishedProjects.find((p) => p.id === id)
}
