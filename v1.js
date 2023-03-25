function loadAudio(audioElement) {
  const audioContext = new AudioContext()
  const audioSource = audioContext.createMediaElementSource(audioElement)
  const analyser = audioContext.createAnalyser()
  analyser.fftSize = 2048
  audioSource.connect(analyser)
  return analyser
}

function generateWaveformData(analyser, width, height) {
  const bufferLength = analyser.frequencyBinCount
  const dataArray = new Uint8Array(bufferLength)
  analyser.getByteTimeDomainData(dataArray)

  const step = Math.ceil(bufferLength / width)
  const scale = height / 256
  const points = []
  for (let i = 0; i < width; i++) {
    const subArray = dataArray.subarray(i * step, (i + 1) * step)
    const sum = subArray.length > 0
      ? subArray.reduce((acc, val) => acc + val)
      : 0

    const average = sum / step
    const point = [i, height - average * scale]
    points.push(point)
  }
  return points
}

function renderWaveform(points, width, height) {
  const svgElement = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "svg",
  )
  svgElement.setAttribute("width", width)
  svgElement.setAttribute("height", height)
  const pathElement = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "path",
  )
  const pathData = points.map(([x, y]) => `${x},${y}`).join(" ")
  pathElement.setAttribute("d", `M${pathData}`)
  pathElement.setAttribute("fill", "none")
  pathElement.setAttribute("stroke", "blue")
  svgElement.appendChild(pathElement)
  document.body.appendChild(svgElement)
}

const audioElement = document.querySelector("audio")
const width = 10000 // Width of SVG element
const height = 100 // Height of SVG element

audioElement.addEventListener("play", () => {
  const analyser = loadAudio(audioElement)
  const points = generateWaveformData(analyser, width, height)
  renderWaveform(points, width, height)
})
