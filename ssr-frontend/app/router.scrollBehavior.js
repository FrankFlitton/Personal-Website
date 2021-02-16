export default function (to, from, savedPosition) {
  const scrollY = savedPosition !== null ? savedPosition.y : 0
  return { x: 0, y: scrollY }
}
