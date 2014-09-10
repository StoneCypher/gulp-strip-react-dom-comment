gulp-strip-react-dom-comment
============================

Strips the `/** @jsx React.DOM */` from pipes to support tools which can't 
handle the comment.

![Language](http://img.shields.io/badge/Language-JavaScript-000000.svg) &nbsp;
![Platform](http://img.shields.io/badge/Platform-NPM-000000.svg) &nbsp;
![License](http://img.shields.io/badge/License-MIT-000055.svg) &nbsp;
![Status](http://img.shields.io/travis/StoneCypher/gulp-strip-react-dom-comment.svg)

[![NPM Downloads](http://img.shields.io/npm/dm/gulp-strip-react-dom-comment.svg)](https://npmjs.org/package/gulp-strip-react-dom-comment.js)

![](https://nodei.co/npm/gulp-strip-react-dom-comment.png?stars=true&downloads=true)



When would this matter?
-----------------------

When using a tool that uses JavaDoc style extension comments, which panics on 
seeing an extension comment it doesn't recognize.  Examples include many 
documentation extraction tools, such as `YUIDoc`, which prompted this being
written.

Using YUIDoc as an example, you might find a rule in a `gulpfile` like this:

```javascript
gulp.task('yuidoc', [], function() {
    gulp.src(['js/**/*.js', 'js/**/*.jsx'])
        .pipe(template({pkg: pkg}))    // Process source files first
        .pipe(yuidoc.parser())         // Then parse
        .pipe(yuidoc.reporter())       // Then report
        .pipe(yuidoc.generator())      // aaaaaand generate
        .pipe(gulp.dest('./doc/yuidoc-inked'));
});
```

Unfortunately, even though this rule is generally correct, this will kersplode,
because `YUIDoc` expects comments in `/** @foo\n  * @bar\n  */\n` form, and
the React JSX signal comment `/** @jsx React.DOM */` incorrectly triggers that
as a YUIDoc rule, which in turn fails because it's missing YUIDoc requirements.

As a result, you'll see something that looks roughly like this:

```
$ gulp build
[00:19:28] Starting 'yuidoc'...
[00:19:28] Finished 'yuidoc' after 5.24 ms

\projects\site\js\app.jsx
  line 1    Missing item type

\projects\site\js\components\Layout.jsx
  line 1    Missing item type

\projects\site\js\components\Routes.jsx
  line 1    Missing item type

3 problems
```

To fix this, you'd want the React JSX line automatically removed, which this
plugin does.  First require the plugin:

```javascript
var stripDomComment = require('gulp-strip-react-dom-comment');
```

Then add a line to our previous `gulp` rule, like so:

```javascript
...
        .pipe(template({pkg: pkg}))
        .pipe(stripDomComment())       // Add me here to fix the problem!
        .pipe(yuidoc.parser())
...
```

And thus, our point.



Polemic :neckbeard:
-------------------

`gulp-strip-react-dom-comment` is MIT licensed, because viral licenses and newspeak language modification are evil.  Free is ***only*** free when it's free for everyone.
