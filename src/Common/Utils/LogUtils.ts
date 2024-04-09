/**
 * @notice 打印debug日志
 * @param constantStr 打印的日志的内容
 */
export function logDebug(constantStr: string) {
  console.log("DEBUG", constantStr);
}

/**
 * @notice 打印warn日志
 * @param constantStr 打印的日志的内容
 */
export function logWarn(constantStr: string) {
  console.log("WARN", constantStr);
}

/**
 * @notice 打印info日志
 * @param constantStr 打印的日志的内容
 */
export function logInfo(constantStr: string) {
  console.log("INFO", constantStr);
}

/**
 * @notice 打印error日志
 * @param constantStr 打印的日志的内容
 */
export function logError(constantStr: string, err = {}) {
  console.log("ERROR", constantStr, err);
}
