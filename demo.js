// --- FAKE API CALLS ---
const fetchCity = () => new Promise(res => setTimeout(() => res("London 🇬🇧"), 1500));
const fetchTemperature = (city) => new Promise(res => setTimeout(() => res(`${city} is 15°C`), 1500));
// --- THE ASYNC/AWAIT ENGINE ---
async function getWeatherUpdate() {
  console.log("1. Starting Weather App... 📱");
  const startTime = Date.now();
  try {
    // STEP 1: Fetching City (PAUSE HERE for 1.5s)
    console.log("2. Locating city... 📡");
    const city = await fetchCity();
    console.log(`   Found: ${city}`);
    // STEP 2: Fetching Temperature (PAUSE HERE for another 1.5s)
    console.log(`3. Getting temperature for ${city}... 🌡️`);
    const temp = await fetchTemperature(city);
    console.log(`\n✅ RESULT: ${temp}`);
  } catch (error) {
    console.log("🚨 Connection Lost!", error);
  } finally {
    const timeTaken = (Date.now() - startTime) / 1000;
    console.log(`\n(App finished in ${timeTaken} seconds)`);
  }
}
// 4. Running the Async function
getWeatherUpdate();
console.log("4. I appear immediately! No waiting for the app logic. (Async proof) 🏃‍♂️");
