## Interview Notes

**Q1:** The employee profile and the recent posts run on the server(SSR),the browser only receive the result and the react suspense fallback(loading)while waiting.The load posts runs in the browser after a click that done by the client.I checked in DevTools->Network->Fetch/XHR where no posts request before clicking.

**Q2:** Employee profile view and recent posts needed when page opens, so server fetches it and sends ready HTML.They don't need JS in browser.The load posts button depends on user click that needs state(useState) and eventHandler so it is Client Component.First,the server sends the HTML then React hydrates it in browser(attaching JS where the button becomes interactive and can fetch after click it).

**Q3:** The fallback appears when an async component is still waiting while React is rendering.In my project this is Recent Posts,which waits for 2-seconds delay."await connection()" is there so that it waits on every visit, not only once at build time.The click request is different because it runs after rendering.React doesn't see it waiting, so Suspense doesn't show a fallback.I solve this by calling setState("loading").

**Q4:** Suspense boundary hides everything inside it until all its async parts are ready, and it shows only one fallback for all of it.If it wrapped the whole dashboard,the profile and the load posts section would be hidden for 2 sec of Recent Post delay.

**Q5:** My custom class helps me identify the type of failure.ApiError extends Error and stores a value the HTTP status."super(message)" takes the message and passes it to the parent error class, so message saved like normal error.When the response is not ok, it throws an ApiError that is HTTP failure,and the error comes with its status(like 503).In the catch block, if the error is an ApiError, I show a message with that status, otherwise it goes to the other branch and show a connection error.

**Q6:** HTTP failure is when the request reaches the server and the server replies but with failure status 503 or 404(due to overload,bug,or missing item).Fetch still returns a response so i check response.ok and throw ApiError.A network failure is when there is no internet, so the request gets no reply at all.Fetch rejects and my catch shows connection error.When I tested it offline,the profile and the recent posts stayed on the page with only load posts failed(since they are already loaded).An empty result is successful reply status 200 but with empty list.It is not an error, so the page shows "No posts found" without any error message.

**Q7:** Every employee ID has its own content, so all three sections show employee 2's data.The structure and the state stay the same.I tested it, I moved the ID into 1 config file, so I change it only once.

**Q8:** I checked in the Network Tab where each request runs.Only "posts?userID=1" appeared, and only after my click, so Load Posts runs in the browser and the profile and Recent Post run on the server.