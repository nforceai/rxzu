// initial page load's url
function url() {
  return 'http://localhost:4400/?path=/story/performance--performance';
}

// action where you suspect the memory leak might be happening
async function action(page) {
  [button] = await page.$x("//button[contains(., 'Paint')]");
  if (button) {
    await button.click();
  }
}

// how to go back to the state before action
async function back(page) {
  let [button] = await page.$x("//button[contains(., 'Reset')]");
  if (button) {
    await button.click();
  }
}

module.exports = { action, back, url, repeat: () => 1 };
