# WordPress Plugin für Triathlon Pace Rechner

Dieses WordPress Plugin ermöglicht es, den Triathlon Pace Rechner auf WordPress-Websites zu integrieren.

## Installation

1. Kopiere den gesamten `wp-plugin` Ordner in das `wp-content/plugins/` Verzeichnis deiner WordPress-Installation
2. Aktiviere das Plugin im WordPress Admin-Bereich unter "Plugins"

## Verwendung

Verwende den Shortcode `[pace-rechner]` in Posts, Pages oder Widgets, um den Pace Rechner anzuzeigen.

## Automatische Updates nach Build

Das Plugin wird automatisch aktualisiert, wenn du `npm run generate` ausführst. Dies passiert durch das `update-plugin.js` Script, welches:

1. Die neuesten generierten JavaScript- und CSS-Dateien aus `dist/_nuxt/` findet
2. Diese Dateien in das `wp-plugin/dist/_nuxt/` Verzeichnis kopiert
3. Die Dateireferenzen in `tri-pace-rechner-plugin.php` aktualisiert
4. **Das aktuelle HTML aus der generierten `index.html` extrahiert und in das Plugin kopiert**
5. Die Plugin-Versionsnummer automatisch erhöht

## Manuelle Updates

Falls du das Plugin manuell aktualisieren möchtest, führe folgendes Kommando aus:

```bash
npm run update-plugin
```

## Dateien

- `tri-pace-rechner-plugin.php` - Haupt-Plugin-Datei
- `dist/_nuxt/` - Automatisch generierte Assets (wird von Git ignoriert)
