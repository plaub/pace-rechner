export const getEnhancedAvgSpeed = (totalDistance: number, totalDuration: number) => {
  return totalDistance / totalDuration
}

export const secondsToHHMMSS = (s: number, trim: boolean): string => {
  if (isNaN(s)) { s = 0 }
  const value = new Date(s * 1000).toISOString()

  if (trim && value.substr(11, 3) === '00:') {
    return value.substr(14, 5)
  }

  return value.substr(11, 8)
}

export const msToMinPerKmNumber = (ms: number): number => {
  if (ms === 0) { return 0 }

  const minPerKm = 1 / (ms / 1000) / 60

  return minPerKm
}

export const msToKmPerHourNumber = (ms: number): number => {
  if (ms === 0) { return 0 }

  const minPerKm = ms * 3.6

  return minPerKm
}

export const msToMinPerKm = (ms: number, trim: boolean): string => {
  if (ms === 0) { return '0' }

  const minPerKm = 1 / (ms / 1000) / 60

  return secondsToHHMMSS(minPerKm * 60, trim)
}

function hoursValueToSecondsValue (value: number, seconds: number) {
  return (value / 3600) * seconds
}
