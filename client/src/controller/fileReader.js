export const fileReader = async (file, callback) => {
  const reader = new FileReader()
  reader.onload = async (file) => {
    const content = (file.target.result)
    callback(content)
  }
  reader.readAsText(file)
}