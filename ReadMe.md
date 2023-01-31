### To run
navigate to the /server dir and run `npm run dev` to start the server
in a seprate terminal, navigate to the /client dir and run `npm run start` to start the react app

#### future improvements
we needed to make our google api call serverside to bypass a CORS issue, so after setting up node/express to pass data to react it worked. We might be able to use a seprate API itself but we need to pick a service that finds nearby events so we stuck with using the nearbySearch API.

we need to make sure we can transform the geometric coordinates thats returned to us, into an actual readable address. I started writing a transform function to handle this but ended up pulling it out for performance reasons.

### todo fixes
Theres an issue with how we are (re)rendering the user results. It has to do with the transformAddresses function. We're returning the correct data but theres a bug where the results wont show up unless you manually let react rerender it.

For example, run the app. Input "hiking" into search and select any radio button then click search. Nothing shows up but the state gets set behind the scenes. (The component just doesnt render anything and there arent any errors) To see the actual results with the transformed addresses, please don't refresh the page...Instead just click another radio option on the same screen and you'll see the results load in 
