abstract final class AndroidReleaseBudget {
  static const maxBytes = 309 * 1024 * 1024;
  static bool isWithinLimit(int bytes) => bytes <= maxBytes;
}
