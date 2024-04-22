const MINIMUM_SECONDS_DEFAULT = 600; //10 minutes
const MINIMUM_PERCENTAGE_DEFAULT = 50;

chrome.webRequest.onCompleted.addListener((details) => {
    if (details.url.startsWith('https://www.youtube.com/api/stats/watchtime')) {
        chrome.storage.sync.get(['seconds', 'percentage', 'is_debug']).then((result) => {
            let min_seconds = MINIMUM_SECONDS_DEFAULT;
            let min_percentage = MINIMUM_PERCENTAGE_DEFAULT;
            if (result.seconds !== undefined) {
                min_seconds = result.seconds;
            }
            if (result.percentage !== undefined) {
                min_percentage = result.percentage;
            }
            let is_debug = result.is_debug

            if (is_debug) {
                printDebugInfo(details, min_seconds, min_percentage);
            }

            let details_url = new URL(details.url);
            let currrent_time = details_url.searchParams.get('et');
            currrent_time = Number.parseFloat(currrent_time instanceof String ? currrent_time.split(',').pop() : currrent_time);
            let total_time = Number.parseFloat(details_url.searchParams.get('len'));
            let min_threshold = Math.min(min_seconds, min_percentage * total_time / 100);
            
            if (currrent_time >= min_threshold) {
                chrome.tabs.sendMessage(details.tabId, {details: details});
            }});
    }
}, { urls: ['*://*.youtube.com/*'] });

function printDebugInfo(details, min_seconds, min_percentage) {
    let details_url = new URL(details.url);
    console.log('webRequest.onCompleted');
    console.log(details);
    console.log('Current time: ' + details_url.searchParams.get('et') + ', Total time: ' + details_url.searchParams.get('len'));
    console.log('Minimum Seconds: ' + min_seconds + ', Minimum Percentage: ' + min_percentage);
    console.log('----------------------------------------------------------');
}
