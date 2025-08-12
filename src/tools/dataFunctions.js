export const orderTasksByTimestamp = (data) => {
  return data.sort((a, b) => {
    return b?.timestamp - a?.timestamp
  })
}


export const getDate = () => {
  const date = new Date();
  return date.toLocaleDateString("pt-Br", {
    weekday: "short",
    year: 'numeric',    // 2025
    month: '2-digit',      // julho
    day: '2-digit',     // 19
    hour: '2-digit',    // 21
    minute: '2-digit',  // 48
    second: '2-digit',  // 10
    hour12: false       // 24h (false) ou 12h (true)
  })
}