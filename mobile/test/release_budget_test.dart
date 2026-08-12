import 'package:flutter_test/flutter_test.dart';
import 'package:nastech_app/core/release_budget.dart';

void main() {
  test('accepts a release artifact at or below the 309 MB policy', () {
    expect(AndroidReleaseBudget.isWithinLimit(AndroidReleaseBudget.maxBytes), isTrue);
    expect(AndroidReleaseBudget.isWithinLimit(AndroidReleaseBudget.maxBytes + 1), isFalse);
  });
}
