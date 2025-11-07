import { ref } from "vue";

export function usePresets() {
  // Triathlon/Duathlon Presets
  const getTriathlonPresets = () => {
    return [
      {
        value: "sprint",
        label: "🏊‍♂️🚴‍♂️🏃‍♂️ Sprint Triathlon",
        distances: { swim: 750, bike: 20, run: 5000 },
        transitions: { t1: 120, t2: 60 },
      },
      {
        value: "olympic",
        label: "🏊‍♂️🚴‍♂️🏃‍♂️ Olympic Triathlon",
        distances: { swim: 1500, bike: 40, run: 10000 },
        transitions: { t1: 180, t2: 90 },
      },
      {
        value: "md",
        label: "🏊‍♂️🚴‍♂️🏃‍♂️ Middle Distance",
        distances: { swim: 1900, bike: 90, run: 21097.5 },
        transitions: { t1: 300, t2: 180 },
      },
      {
        value: "ld",
        label: "🏊‍♂️🚴‍♂️🏃‍♂️ Long Distance / Ironman",
        distances: { swim: 3800, bike: 180, run: 42195 },
        transitions: { t1: 600, t2: 300 },
      },
      {
        value: "duathlon",
        label: "🏃‍♂️🚴‍♂️🏃‍♂️ Standard Duathlon",
        distances: { swim: 10000, bike: 40, run: 5000 }, // swim slot used for first run
        transitions: { t1: 120, t2: 90 },
      },
    ];
  };

  // Einzelsport-Presets für das Hauptmenü
  const getSingleSportPresets = () => {
    return [
      // Schwimmen - Pace in min/100m (Sekunden)
      {
        value: "swim_100_sprint",
        label: "🏊 100m Sprint (1:30/100m)",
        type: "swim",
        swimDistance: 100,
        swimPace: 90,
        bikeDistance: 0,
        runDistance: 0,
      },
      {
        value: "swim_400_im",
        label: "🏊 400m IM (1:45/100m)",
        type: "swim",
        swimDistance: 400,
        swimPace: 105,
        bikeDistance: 0,
        runDistance: 0,
      },
      {
        value: "swim_1500_kraul",
        label: "🏊 1500m Kraul (2:00/100m)",
        type: "swim",
        swimDistance: 1500,
        swimPace: 120,
        bikeDistance: 0,
        runDistance: 0,
      },

      // Radfahren - Geschwindigkeit in km/h
      {
        value: "bike_10_tt",
        label: "🚴 10km Zeitfahren (40 km/h)",
        type: "bike",
        swimDistance: 0,
        bikeDistance: 10,
        bikeSpeed: 40,
        runDistance: 0,
      },
      {
        value: "bike_40_olympic",
        label: "🚴 40km Olympic (30 km/h)",
        type: "bike",
        swimDistance: 0,
        bikeDistance: 40,
        bikeSpeed: 30,
        runDistance: 0,
      },
      {
        value: "bike_100_rtf",
        label: "🚴 100km RTF (25 km/h)",
        type: "bike",
        swimDistance: 0,
        bikeDistance: 100,
        bikeSpeed: 25,
        runDistance: 0,
      },

      // Laufen - Pace in min/km (Sekunden)
      {
        value: "run_5k_parkrun",
        label: "🏃 5km Parkrun (4:00/km)",
        type: "run",
        swimDistance: 0,
        bikeDistance: 0,
        runDistance: 5000,
        runPace: 240,
      },
      {
        value: "run_10k_volkslauf",
        label: "🏃 10km Volkslauf (4:30/km)",
        type: "run",
        swimDistance: 0,
        bikeDistance: 0,
        runDistance: 10000,
        runPace: 270,
      },
      {
        value: "run_hm",
        label: "🏃 21.1km Halbmarathon (5:00/km)",
        type: "run",
        swimDistance: 0,
        bikeDistance: 0,
        runDistance: 21097,
        runPace: 300,
      },
      {
        value: "run_marathon",
        label: "🏃 42.2km Marathon (5:30/km)",
        type: "run",
        swimDistance: 0,
        bikeDistance: 0,
        runDistance: 42195,
        runPace: 330,
      },
    ];
  };

  // Preset-Anwendung für Triathlon/Duathlon
  const applyTriathlonPreset = (
    preset: string,
    refs: {
      swimDistance: any;
      swimPace: any;
      swimTime: any;
      bikeDistance: any;
      bikeSpeed: any;
      bikeTime: any;
      runDistance: any;
      runPace: any;
      runTime: any;
      t1Time: any;
      t2Time: any;
    }
  ) => {
    switch (preset) {
      case "sprint":
        refs.swimDistance.value = 750;
        refs.swimPace.value = 120;
        refs.swimTime.value = 900;

        refs.bikeDistance.value = 20;
        refs.bikeSpeed.value = 25;
        refs.bikeTime.value = 2880;

        refs.runDistance.value = 5000;
        refs.runPace.value = 300;
        refs.runTime.value = 1500;

        refs.t1Time.value = 120; // 2 minutes for sprint
        refs.t2Time.value = 60; // 1 minute for sprint
        break;

      case "olympic":
        refs.swimDistance.value = 1500;
        refs.swimPace.value = 120;
        refs.swimTime.value = 1800;

        refs.bikeDistance.value = 40;
        refs.bikeSpeed.value = 25;
        refs.bikeTime.value = 5760;

        refs.runDistance.value = 10000;
        refs.runPace.value = 300;
        refs.runTime.value = 3000;

        refs.t1Time.value = 180; // 3 minutes for olympic
        refs.t2Time.value = 90; // 1.5 minutes for olympic
        break;

      case "md":
        refs.swimDistance.value = 1900;
        refs.swimPace.value = 120;
        refs.swimTime.value = 2280;

        refs.bikeDistance.value = 90;
        refs.bikeSpeed.value = 25;
        refs.bikeTime.value = 12960;

        refs.runDistance.value = 21097.5;
        refs.runPace.value = 380;
        refs.runTime.value = 8017;

        refs.t1Time.value = 300; // 5 minutes for middle distance
        refs.t2Time.value = 180; // 3 minutes for middle distance
        break;

      case "ld":
        refs.swimDistance.value = 3800;
        refs.swimPace.value = 120;
        refs.swimTime.value = 4560;

        refs.bikeDistance.value = 180;
        refs.bikeSpeed.value = 25;
        refs.bikeTime.value = 25920;

        refs.runDistance.value = 42195;
        refs.runPace.value = 380;
        refs.runTime.value = 16034;

        refs.t1Time.value = 600; // 10 minutes for long distance
        refs.t2Time.value = 300; // 5 minutes for long distance
        break;

      case "duathlon":
        // First run
        refs.swimDistance.value = 10000; // Using "swim" slot for first run
        refs.swimPace.value = 300;
        refs.swimTime.value = 3000;

        refs.bikeDistance.value = 40;
        refs.bikeSpeed.value = 25;
        refs.bikeTime.value = 5760;

        // Second run
        refs.runDistance.value = 5000;
        refs.runPace.value = 300;
        refs.runTime.value = 1500;

        refs.t1Time.value = 120; // 2 minutes transition run-to-bike
        refs.t2Time.value = 90; // 1.5 minutes transition bike-to-run
        break;

      default:
        break;
    }
  };

  return {
    getTriathlonPresets,
    getSingleSportPresets,
    applyTriathlonPreset,
  };
}
