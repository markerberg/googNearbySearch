### To run
navigate to the /server dir and run `npm run dev` to start the server
in a seprate terminal, navigate to the /client dir and run `npm run start` to start the react app

#### future improvements
we needed to make our google api call serverside to bypass a CORS issue, so after setting up node/express to pass data to react it worked. We might be able to use a seprate API itself but we need to pick a service that finds nearby events so we stuck with using the nearbySearch API.

we need to make sure we can transform the geometric coordinates thats returned to us, into an actual readable address. I started writing a transform function to handle this but ended up pulling it out for performance reasons.