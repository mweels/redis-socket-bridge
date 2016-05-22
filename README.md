# redis-socket-bridge
- Creates a bridge from redis subscriptions to socket.io subscriptions.

Include the script in your client project in test.html
Add Divs socket/subscription nodes to get automatically updating from redis via socket io.

If you want to just send values, then all you need is:

    <div socket='http://localhost:3000'>
        <div subscribe='test'></div>
    </div>

If you want to use handlebars template then add an template and it will expect JSON:
```bash
   <script id="jsonChannel" type="text/x-handlebars-template">
        Cool {{ok}}
    </script>
```
    <div socket='http://localhost:3000'>
        <div subscribe='jsonChannel'></div>
    </div>

Set your connection strings in Start app.js in node
start app.js

```bash
redis-cli publish test  "Hello Html Page"
```
```bash
redis-cli publish jsonChannel  "{ \"ok\" : \"Hello Template\" }"
```
start publishing jsonData to jsonChannel, publish a value to test. 

Your HTML page should automatically update your redis publishing.
