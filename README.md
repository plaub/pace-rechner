# Triathlon Pace Calculator 🏊‍♂️🚴‍♂️🏃‍♂️

An interactive pace calculator for triathlon training and competitions. This tool helps athletes calculate times, speeds, and paces for all three disciplines (swimming, cycling, running) and plan their race strategy.

## Features

- 🏊‍♂️ **Swimming**: Pace calculation in min/100m
- 🚴‍♂️ **Cycling**: Speed calculation in km/h
- 🏃‍♂️ **Running**: Pace calculation in min/km
- ⏱️ **Transition Times**: Include T1 and T2 transitions
- 📋 **Presets**: Predefined distances for Sprint, Olympic, Half Distance, and Full Distance
- 🕐 **Start Time Planning**: Calculate expected finish time based on start time
- 📊 **Live Calculation**: Automatic updates of all values when inputs change
- 🔌 **WordPress Plugin**: Easy integration into WordPress websites

## Supported Distances

### Presets

- **Sprint**: 750m Swimming, 20km Cycling, 5km Running
- **Olympic**: 1500m Swimming, 40km Cycling, 10km Running
- **Half Distance**: 1900m Swimming, 90km Cycling, 21.1km Running
- **Full Distance**: 3800m Swimming, 180km Cycling, 42.2km Running

Custom distances can also be entered manually.

## Technical Details

### Frontend

- **Nuxt 3**: Vue.js framework for modern web applications
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **Vue3 Timepicker**: User-friendly time selection

### Deployment

- **SPA Mode**: Optimized for WordPress integration
- **Static Generation**: For optimal performance
- **WordPress Plugin**: Ready-to-use PHP plugin

## Installation & Development

### Prerequisites

- Node.js (Version 16 or higher)
- npm, yarn, or pnpm

### Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Development server runs on `http://localhost:3000`

### Production Build

```bash
# Generate for WordPress plugin
npm run generate

# Build web version only
npm run build

# Production preview
npm run preview
```

## WordPress Integration

The project includes a ready-to-use WordPress plugin in the `wp-plugin/` folder.

### Installation

1. Build the project: `npm run generate`
2. Copy the `wp-plugin/` folder to your WordPress `plugins/` directory
3. Activate the plugin in the WordPress admin area
4. Use the shortcode `[pace-rechner]` in posts or pages

### Shortcode

```
[pace-rechner]
```

## Project Structure

```
├── components/           # Vue.js components
│   ├── DurationPicker.vue
│   ├── PaceRechner.vue
│   ├── PaceRechnerForm.vue
│   ├── PaceRechnerSummary.vue
│   └── PaceRechnerTransition.vue
├── composables/          # Vue composables
│   └── usePaceCalculations.ts
├── types/               # TypeScript definitions
│   └── PaceRechner.ts
├── utils/               # Utility functions
│   └── calculations.ts
├── wp-plugin/           # WordPress plugin
│   ├── tri-pace-rechner-plugin.php
│   └── dist/           # Generated files
└── assets/css/          # Styles
```

## How to Use

1. **Enter start time**: When do you want to start?
2. **Choose preset**: Or select a triathlon distance
3. **Plan disciplines**:
   - Enter either distance + time → pace is calculated
   - Or enter distance + desired pace → time is calculated
4. **Transition times**: T1 and T2 times for realistic planning
5. **Finish time**: Automatic calculation of total and finish time

## Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

**Pierre Laub**

- Website: [pierrelaub.de](https://www.pierrelaub.de)

---

_Built for triathletes, by a triathlete_ 🏆
