# Youtube Auto Like Extension

This code is a Google Chrome Extension that will automatically like a Youtube video after a certain minimum threshold is met.
There is both a minimum threshold for the precentage of the video watched and for the seconds of the video watched.
The extension will take both thresholds into account and will use the minimum of the two as the working threshold.
For example, if the two thresholds are 50% and 600 seconds and you are watching a 15 minute video, the extension will take the 50% threshold and automatically like the Youtube video after it reaches 7 minutes and 30 seconds.
The default thresholds are 50% of video time and 600 seconds, however you can change these settings in the popup when clicking the extension icon.
