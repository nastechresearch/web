import 'package:flutter/material.dart';

abstract final class NasTechColors {
  static const black = Color(0xFF000000);
  static const panel = Color(0xFF071111);
  static const panelSoft = Color(0xFF0B1918);
  static const cyan = Color(0xFF37F5E6);
  static const green = Color(0xFF9AFF64);
  static const white = Color(0xFFF2FFFD);
  static const muted = Color(0xFF9CB6B3);
}

ThemeData nasTechTheme() {
  const scheme = ColorScheme.dark(
    primary: NasTechColors.cyan,
    secondary: NasTechColors.green,
    surface: NasTechColors.panel,
    onPrimary: NasTechColors.black,
    onSecondary: NasTechColors.black,
    onSurface: NasTechColors.white,
  );
  return ThemeData(
    useMaterial3: true,
    colorScheme: scheme,
    scaffoldBackgroundColor: NasTechColors.black,
    fontFamily: 'Roboto',
    appBarTheme: const AppBarTheme(backgroundColor: Colors.transparent, elevation: 0),
    cardTheme: CardThemeData(
      color: NasTechColors.panel,
      elevation: 0,
      margin: EdgeInsets.zero,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(28)),
    ),
    inputDecorationTheme: InputDecorationTheme(
      filled: true,
      fillColor: NasTechColors.panelSoft,
      hintStyle: const TextStyle(color: NasTechColors.muted),
      border: OutlineInputBorder(borderRadius: BorderRadius.circular(20), borderSide: BorderSide.none),
      focusedBorder: OutlineInputBorder(borderRadius: BorderRadius.circular(20), borderSide: const BorderSide(color: NasTechColors.cyan)),
    ),
  );
}
