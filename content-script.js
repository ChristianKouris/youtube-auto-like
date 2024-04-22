const MINIMUM_SECONDS_DEFAULT = 600; //10 minutes
const MINIMUM_PERCENTAGE_DEFAULT = 50;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {

    if (request.details) {
        chrome.storage.sync.get(['seconds', 'percentage', 'is_debug']).then((result) => {
            let min_seconds = MINIMUM_SECONDS_DEFAULT;
            let min_percentage = MINIMUM_PERCENTAGE_DEFAULT;
            if (result.seconds !== undefined) {
                min_seconds = result.seconds;
            }
            if (result.percentage !== undefined) {
                min_percentage = result.percentage;
            }
            let is_debug = result.is_debug;

            addLike(request.details, min_seconds, min_percentage, is_debug);
            sendResponse({result: 'success'});
        });
    }
})

function addLike(details, min_seconds, min_percentage, is_debug) {
    let details_url = new URL(details.url);
    let currrent_time = details_url.searchParams.get('et');
    currrent_time = Number.parseFloat(currrent_time instanceof String ? currrent_time.split(',').pop() : currrent_time);
    let total_time = Number.parseFloat(details_url.searchParams.get('len'));
    let like_button = document.getElementsByClassName('YtLikeButtonViewModelHost').item(0)?.firstChild?.firstChild?.firstChild;
    let min_threshold = Math.min(min_seconds, min_percentage * total_time / 100);
    if (is_debug) {
        printDebugInfo(currrent_time, total_time, min_threshold, like_button)
    }
    if (like_button instanceof HTMLElement 
        && like_button.getAttribute('aria-pressed') !== 'true' 
        && currrent_time >= min_threshold) {
        console.log('Got to Click');
        like_button.click();
    }
}

function printDebugInfo(currrent_time, total_time, min_threshold, like_button) {
    console.log('Got to main function');
    console.log('Current Time:');
    console.log(currrent_time);
    console.log(typeof currrent_time);
    console.log('Total Time:');
    console.log(total_time);
    console.log(typeof total_time);
    console.log('Miniumum Threshold:');
    console.log(min_threshold);
    console.log(typeof min_threshold);
    console.log('Like Button:');
    console.log(like_button);
    console.log('Liked: ' + (like_button instanceof HTMLElement && like_button.getAttribute('aria-pressed') === 'true'));
}
