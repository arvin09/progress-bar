This is a simple AngularJs application with progress bar getting generated based on API data.
The data returns limit beyond which progress bar should highlight with different colors.
The data also contain buttons to update progress bar percentage. e.g. the button has a value of 25 and limit for the bar is 200 then on clicking on the button with 25 the progress bar should be filled 12.5% since that's  what percent 25 makes of 200.

Following project is configured with node scripts

$npm start -- > to start the project.

$npm test --> to run unit test cases.

$npm run build --> to generate the distribution files.

Webpack is configured with following loaders

 1. scss
 2. jshint
 3. html-loader

 & plugins for 

 1. Code spliting
 2. Uglification
 3. HTML-loading





