export function niceCeil(value: number, step = 5000): number {
  return Math.ceil(value / step) * step
}

export function ticks(max: number, count: number): number[] {
  const step = max / count
  return Array.from({ length: count + 1 }, (_, index) => Math.round(index * step))
}

export function barPath(
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
): string {
  const r = Math.min(radius, width / 2, height)
  return [
    `M ${x} ${y + r}`,
    `A ${r} ${r} 0 0 1 ${x + r} ${y}`,
    `L ${x + width - r} ${y}`,
    `A ${r} ${r} 0 0 1 ${x + width} ${y + r}`,
    `L ${x + width} ${y + height}`,
    `L ${x} ${y + height}`,
    'Z',
  ].join(' ')
}

export interface ChartPoint {
  x: number
  y: number
}

export function linePath(points: ChartPoint[]): string {
  if (points.length === 0) return ''
  const [first, ...rest] = points
  return [`M ${first.x} ${first.y}`, ...rest.map((point) => `L ${point.x} ${point.y}`)].join(' ')
}

export function diamondPath(x: number, y: number, radius: number): string {
  return [
    `M ${x} ${y - radius}`,
    `L ${x + radius} ${y}`,
    `L ${x} ${y + radius}`,
    `L ${x - radius} ${y}`,
    'Z',
  ].join(' ')
}
