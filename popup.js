const sec_input = document.getElementById('seconds');
const pct_range = document.getElementById('pct-range');
const pct_input = document.getElementById('percentage');
const save_button = document.getElementById('save-settings');
const debug_checkbox = document.getElementById('debug-checkbox');

let seconds = sec_input.value = 600;
let percentage = pct_input.value = pct_range.value = 50;

chrome.storage.sync.get(['seconds', 'percentage', 'is_debug']).then((result) => {
  if (result.seconds !== undefined) {
    seconds = sec_input.value = result.seconds;
  }
  if (result.percentage !== undefined) {
    percentage = pct_input.value = pct_range.value = result.percentage;
  }
  if (result.is_debug) {
    debug_checkbox.checked = true;
  }
});

sec_input.addEventListener('input', function() {
  seconds = sec_input.value;
});

pct_range.addEventListener('input', function() {
  percentage = pct_input.value = pct_range.value;
});

pct_input.addEventListener('input', function() {
  percentage = pct_range.value = pct_input.value;
});

save_button.addEventListener('click', (event) => {
  chrome.storage.sync.set({ seconds, percentage });
})

debug_checkbox.addEventListener('click', (event) => {
  chrome.storage.sync.set({ is_debug: debug_checkbox.checked });
})
