export function dd(...data: any[]) {
  for (const item of data) {
    console.log(item)
  }
  process.exit(1)
}
