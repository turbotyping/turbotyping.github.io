export default [
  {
    text: '<!doctype html>\n<html>\n<head>\n    <title>Example Domain</title>\n    <meta charset="utf-8" />\n    <meta http-equiv="Content-type" content="text/html; charset=utf-8" />\n    <meta name="viewport" content="width=device-width, initial-scale=1" />\n</head>\n\n<body>\n<div>\n    <h1>Example Domain</h1>\n    <p>This domain is for use in illustrative examples in documents. You may use this domain in literature without prior coordination or asking for permission.</p>\n    <p><a href="https://www.iana.org/domains/example">More information...</a></p>\n</div>\n</body>\n</html>',
    reference: 'http://example.com/',
    author: 'example.com',
  },
  {
    text:
      '<!DOCTYPE html>\n' +
      '<html>\n' +
      '<body>\n' +
      '\n' +
      '  <p>Image to use:</p>\n' +
      '  <img id="scream" src="img_the_scream.jpg" alt="The Scream" width="220" height="277">\n' +
      '\n' +
      '  <p>Canvas to fill:</p>\n' +
      '  <canvas id="myCanvas" width="250" height="300" style="border:1px solid #d3d3d3;">\n' +
      '    Your browser does not support the HTML canvas tag.</canvas>\n' +
      '\n' +
      '  <p><button onclick="myCanvas()">Try it</button></p>\n' +
      '\n' +
      '  <script>\n' +
      '    function myCanvas() {\n' +
      '      var c = document.getElementById("myCanvas");\n' +
      '      var ctx = c.getContext("2d");\n' +
      '      var img = document.getElementById("scream");\n' +
      '      ctx.drawImage(img, 10, 10);\n' +
      '    }\n' +
      '  </script>\n' +
      '\n' +
      '</body>\n' +
      '</html>',
    reference: 'http://w3schools.com/',
    author: 'w3schools.com',
  },
  {
    text:
      '<!DOCTYPE html>\n' +
      '<html>\n' +
      '<body>\n' +
      '\n' +
      '  <h2>HTML Forms</h2>\n' +
      '\n' +
      '  <form action="/action_page.php">\n' +
      '    <label for="fname">First name:</label><br>\n' +
      '    <input type="text" id="fname" name="fname" value="John"><br>\n' +
      '    <label for="lname">Last name:</label><br>\n' +
      '    <input type="text" id="lname" name="lname" value="Doe"><br><br>\n' +
      '    <input type="submit" value="Submit">\n' +
      '  </form>\n' +
      '\n' +
      '  <p>If you click the "Submit" button, the form-data will be sent to a page called "/action_page.php".</p>\n' +
      '\n' +
      '</body>\n' +
      '</html>',
    reference: 'http://w3schools.com/',
    author: 'w3schools.com',
  },
  {
    text:
      '<!DOCTYPE html>\n' +
      '<html>\n' +
      '<head>\n' +
      '  <base href="https://www.w3schools.com/" target="_blank">\n' +
      '</head>\n' +
      '\n' +
      '<body>\n' +
      '\n' +
      '  <h1>The base element</h1>\n' +
      '\n' +
      '  <p><img src="images/stickman.gif" width="24" height="39" alt="Stickman"> - Notice that we have only specified a\n' +
      '    relative address for the image. Since we have specified a base URL in the head section, the browser will look for\n' +
      '    the image at "https://www.w3schools.com/images/stickman.gif".</p>\n' +
      '\n' +
      '  <p><a href="tags/tag_base.asp">HTML base tag</a> - Notice that the link opens in a new window, even if it has no\n' +
      '    target="_blank" attribute. This is because the target attribute of the base element is set to "_blank".</p>\n' +
      '\n' +
      '</body>\n' +
      '</html>',
    reference: 'http://w3schools.com/',
    author: 'w3schools.com',
  },
  {
    text:
      '<!DOCTYPE html>\n' +
      '<html>\n' +
      '<body>\n' +
      '\n' +
      '  <h2>Unordered List with Square Bullets</h2>\n' +
      '\n' +
      '  <ul style="list-style-type:square;">\n' +
      '    <li>Coffee</li>\n' +
      '    <li>Tea</li>\n' +
      '    <li>Milk</li>\n' +
      '  </ul>\n' +
      '\n' +
      '</body>\n' +
      '</html>',
    reference: 'http://w3schools.com/',
    author: 'w3schools.com',
  },
  {
    text:
      '<!DOCTYPE html>\n' +
      '<html>\n' +
      '<head>\n' +
      '  <style>\n' +
      '    table,\n' +
      '    th,\n' +
      '    td {\n' +
      '      border: 1px solid black;\n' +
      '      border-collapse: collapse;\n' +
      '    }\n' +
      '\n' +
      '    th,\n' +
      '    td {\n' +
      '      padding: 5px;\n' +
      '    }\n' +
      '  </style>\n' +
      '</head>\n' +
      '\n' +
      '<body>\n' +
      '\n' +
      '  <table style="width:100%">\n' +
      '    <tr>\n' +
      '      <th>Firstname</th>\n' +
      '      <th>Lastname</th>\n' +
      '      <th>Age</th>\n' +
      '    </tr>\n' +
      '    <tr>\n' +
      '      <td>Jill</td>\n' +
      '      <td>Smith</td>\n' +
      '      <td>50</td>\n' +
      '    </tr>\n' +
      '    <tr>\n' +
      '      <td>Eve</td>\n' +
      '      <td>Jackson</td>\n' +
      '      <td>94</td>\n' +
      '    </tr>\n' +
      '    <tr>\n' +
      '      <td>John</td>\n' +
      '      <td>Doe</td>\n' +
      '      <td>80</td>\n' +
      '    </tr>\n' +
      '  </table>\n' +
      '\n' +
      '</body>\n' +
      '</html>',
    reference: 'http://w3schools.com/',
    author: 'w3schools.com',
  },
  {
    text:
      '<!DOCTYPE html>\n' +
      '<html>\n' +
      '<body>\n' +
      '\n' +
      '  <h2>Image as a Link</h2>\n' +
      '\n' +
      '  <p>The image below is a link. Try to click on it.</p>\n' +
      '\n' +
      '  <a href="default.asp"><img src="smiley.gif" alt="HTML tutorial" style="width:42px;height:42px;"></a>\n' +
      '\n' +
      '</body>\n' +
      '</html>',
    reference: 'http://w3schools.com/',
    author: 'w3schools.com',
  },
  {
    text:
      '<!DOCTYPE html>\n' +
      '<html>\n' +
      '<head>\n' +
      '  <style>\n' +
      '    body {\n' +
      '      background-color: powderblue;\n' +
      '    }\n' +
      '\n' +
      '    h1 {\n' +
      '      color: blue;\n' +
      '    }\n' +
      '\n' +
      '    p {\n' +
      '      color: red;\n' +
      '    }\n' +
      '  </style>\n' +
      '</head>\n' +
      '\n' +
      '<body>\n' +
      '\n' +
      '  <h1>This is a heading</h1>\n' +
      '  <p>This is a paragraph.</p>\n' +
      '\n' +
      '</body>\n' +
      '</html>',
    reference: 'http://w3schools.com/',
    author: 'w3schools.com',
  },
  {
    text:
      '<!DOCTYPE html>\n' +
      '<html>\n' +
      '<head>\n' +
      '  <style>\n' +
      '    .city {\n' +
      '      background-color: tomato;\n' +
      '      color: white;\n' +
      '      border: 2px solid black;\n' +
      '      margin: 20px;\n' +
      '      padding: 20px;\n' +
      '    }\n' +
      '  </style>\n' +
      '</head>\n' +
      '\n' +
      '<body>\n' +
      '\n' +
      '  <div class="city">\n' +
      '    <h2>London</h2>\n' +
      '    <p>London is the capital of England.</p>\n' +
      '  </div>\n' +
      '\n' +
      '  <div class="city">\n' +
      '    <h2>Paris</h2>\n' +
      '    <p>Paris is the capital of France.</p>\n' +
      '  </div>\n' +
      '\n' +
      '  <div class="city">\n' +
      '    <h2>Tokyo</h2>\n' +
      '    <p>Tokyo is the capital of Japan.</p>\n' +
      '  </div>\n' +
      '\n' +
      '</body>\n' +
      '</html>\n',
    reference: 'http://w3schools.com/',
    author: 'w3schools.com',
  },
];
