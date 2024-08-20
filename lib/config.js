export function isMaintenanceMode() {
  return JSON.parse(process.env.NEXT_PUBLIC_MAINTENANCE_MODE);
}
