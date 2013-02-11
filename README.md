# jsrefact (WIP) 

A Clojure library designed to perform Javascript refactoring with Clojurescript & core.logic

# Requirements

Latest version of Leiningen installed.

## Usage
Run deps to get all the dependencies.

	$ lein deps

Build the Clojurescript source once:

	$ lein cljsbuild once

Or set it to autobuild:

	$ lein cljsbuild auto

Once it is build or set to autobuild start the browser connected repl:

	$ lein trampoline cljsbuild repl-listen

When this repl is started it will still hang because it still needs to be connected to the browser. Therefore goto : localhost:9000 in your browser.

When the repl is active you can test it by following command. A JavaScript alert should popup in the browser.

```clj
(js/alert "hello world")
```

Once the repl works, you can load the jsrefact namespace and start using it.

```clj
(ns jsrefact.core)
```



## License

Distributed under the Eclipse Public License, the same as Clojure.
