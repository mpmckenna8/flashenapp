If you want to run this yourself you should be able to just do:

    git clone https://github.com/mpmckenna8/flashenapp.git

    npm install

    electron ./

But you should have electron intalled globally which you can do with:

    npm install -g electron



In your ternminal and the app should open up and try to put a tacocat on the
FlashenTaschen.


You can now input any image link url and it will put it on the flashentaschen.
If you want to continuously refresh the image you tick that tickbox and it should
keep sending it enough that it won't fade off.


If you want to add more functionality go for it and let me know if you have any
questions.  

Features to add:

gifs
When I add gif functionality I think I'll use http://matt-way.github.io/gifuct-js/



text;
Could just add text to a canvas or try and draw stuff with something like. https://github.com/PaulBGD/PixelFont/blob/master/script.js

More UI stuff and maybe a help screen. Maybe just a link to a .md document with simple instructions and screenshots.


Some media on here showing what you can do.


I'll try and add them all to the package.json so it's easier.


To make a build for a specific system do like:

    electron-packager ./ --platform=linux --overwrite
